-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration COMPLÈTE de toutes les tables
-- Exécuter UNE SEULE FOIS dans Supabase → SQL Editor → Run
-- Vérifie et ajoute toutes les colonnes manquantes
-- ═══════════════════════════════════════════════════════════════

-- ┌─────────────────────────────────────┐
-- │  1. PROFILES                        │
-- └─────────────────────────────────────┘
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS public_cave boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bottle_count int DEFAULT 0;

-- ┌─────────────────────────────────────┐
-- │  2. BOTTLES                         │
-- └─────────────────────────────────────┘
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS cuvee text DEFAULT '';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS vintage int;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS region text DEFAULT '';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS appellation text DEFAULT '';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS color text DEFAULT 'rouge';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS robe text DEFAULT '#6B1E2C';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS cepages jsonb DEFAULT '[]';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS alcohol numeric(4,1);
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS price numeric(10,2);
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS quantity int DEFAULT 1;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS score int;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS peak_from int;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS peak_to int;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS aromas jsonb DEFAULT '[]';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS aroma_wheel jsonb DEFAULT '{}';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS pairings jsonb DEFAULT '[]';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS service jsonb DEFAULT '{}';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS estate jsonb DEFAULT '{}';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS notes text DEFAULT '';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]';
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS purchased_at date;
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
-- location : si elle existe en jsonb, on la transforme en text
DO $$
BEGIN
  -- Vérifie si la colonne location existe
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bottles' AND column_name='location' AND table_schema='public') THEN
    -- Si elle est en jsonb, la convertir en text
    IF (SELECT data_type FROM information_schema.columns WHERE table_name='bottles' AND column_name='location' AND table_schema='public') = 'jsonb' THEN
      ALTER TABLE public.bottles ALTER COLUMN location TYPE text USING COALESCE(location::text, '');
      ALTER TABLE public.bottles ALTER COLUMN location SET DEFAULT '';
    END IF;
  ELSE
    ALTER TABLE public.bottles ADD COLUMN location text DEFAULT '';
  END IF;
END $$;

-- ┌─────────────────────────────────────┐
-- │  3. TASTINGS                        │
-- └─────────────────────────────────────┘
-- Rendre bottle_id nullable (dégustations libres)
ALTER TABLE public.tastings ALTER COLUMN bottle_id DROP NOT NULL;
-- Changer la foreign key pour ON DELETE SET NULL
ALTER TABLE public.tastings DROP CONSTRAINT IF EXISTS tastings_bottle_id_fkey;
DO $$ BEGIN
  ALTER TABLE public.tastings ADD CONSTRAINT tastings_bottle_id_fkey
    FOREIGN KEY (bottle_id) REFERENCES public.bottles(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Colonnes de dégustation
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS cuvee text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS vintage int;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS region text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS appellation text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS color text DEFAULT 'rouge';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS score_visual numeric(3,1) DEFAULT 0;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS score_nose numeric(3,1) DEFAULT 0;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS score_palate numeric(3,1) DEFAULT 0;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS score_overall numeric(3,1) DEFAULT 0;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS visual_notes text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS nose_notes text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS palate_notes text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS aromas text[] DEFAULT '{}';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS comments text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS occasion text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS paired_with text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS temperature text DEFAULT '';
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS decanted boolean DEFAULT false;
ALTER TABLE public.tastings ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- ┌─────────────────────────────────────┐
-- │  4. WISHLIST                        │
-- └─────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS public.wishlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT '',
  cuvee text DEFAULT '',
  region text DEFAULT '',
  appellation text DEFAULT '',
  color text DEFAULT 'rouge',
  price_estimate numeric(8,2),
  notes text DEFAULT '',
  source text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can CRUD own wishlist" ON public.wishlist
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ┌─────────────────────────────────────┐
-- │  5. WINE_CATALOG (partagé)          │
-- └─────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS public.wine_catalog (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  cuvee text DEFAULT '',
  region text DEFAULT '',
  appellation text DEFAULT '',
  color text DEFAULT 'rouge',
  robe text DEFAULT '#6B1E2C',
  cepages jsonb DEFAULT '[]',
  typical_alcohol numeric(4,1),
  typical_price numeric(10,2),
  peak_from int,
  peak_to int,
  aromas jsonb DEFAULT '[]',
  pairings jsonb DEFAULT '[]',
  service jsonb DEFAULT '{}',
  estate jsonb DEFAULT '{}',
  added_by uuid REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, cuvee, region)
);
ALTER TABLE public.wine_catalog ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Wine catalog viewable by all" ON public.wine_catalog FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "Authenticated users can add wines" ON public.wine_catalog FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DROP POLICY IF EXISTS "Creator can update catalog entry" ON public.wine_catalog;
DO $$ BEGIN
  CREATE POLICY "Authenticated users can update catalog" ON public.wine_catalog FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Index de recherche
CREATE INDEX IF NOT EXISTS idx_wine_catalog_name ON public.wine_catalog USING gin (to_tsvector('french', name || ' ' || coalesce(cuvee,'') || ' ' || coalesce(region,'') || ' ' || coalesce(appellation,'')));
CREATE INDEX IF NOT EXISTS idx_wine_catalog_region ON public.wine_catalog(region);

-- ┌─────────────────────────────────────┐
-- │  6. FOLLOWS (social)                │
-- └─────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS public.follows (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  followed_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, followed_id)
);
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Follows viewable by all" ON public.follows FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "Users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ┌─────────────────────────────────────┐
-- │  7. PLACES + REVIEWS + PICKS        │
-- └─────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS public.places (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'caviste',
  address text DEFAULT '',
  city text DEFAULT '',
  lat double precision,
  lng double precision,
  phone text DEFAULT '',
  website text DEFAULT '',
  hours text DEFAULT '',
  description text DEFAULT '',
  specialties text[] DEFAULT '{}',
  photo_url text DEFAULT '',
  created_by uuid REFERENCES auth.users(id),
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
-- Safety: add columns that might be missing if table already existed
ALTER TABLE public.places ADD COLUMN IF NOT EXISTS website text DEFAULT '';
ALTER TABLE public.places ADD COLUMN IF NOT EXISTS photo_url text DEFAULT '';
ALTER TABLE public.places ADD COLUMN IF NOT EXISTS description text DEFAULT '';
ALTER TABLE public.places ADD COLUMN IF NOT EXISTS specialties text[] DEFAULT '{}';
ALTER TABLE public.places ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false;
DO $$ BEGIN CREATE POLICY "Places viewable by all" ON public.places FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Auth users can add places" ON public.places FOR INSERT WITH CHECK (auth.uid() IS NOT NULL); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Creator can update places" ON public.places FOR UPDATE USING (auth.uid() = created_by); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.place_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id uuid REFERENCES public.places(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating int CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(place_id, user_id)
);
ALTER TABLE public.place_reviews ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Reviews viewable by all" ON public.place_reviews FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Auth users can review" ON public.place_reviews FOR INSERT WITH CHECK (auth.uid() = user_id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can update own reviews" ON public.place_reviews FOR UPDATE USING (auth.uid() = user_id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.place_picks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id uuid REFERENCES public.places(id) ON DELETE CASCADE NOT NULL,
  wine_name text NOT NULL,
  wine_region text DEFAULT '',
  wine_color text DEFAULT 'rouge',
  wine_price numeric(8,2),
  comment text DEFAULT '',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.place_picks ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Picks viewable by all" ON public.place_picks FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Auth users can add picks" ON public.place_picks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ┌─────────────────────────────────────┐
-- │  8. RLS POLICIES MANQUANTES         │
-- └─────────────────────────────────────┘
-- Tastings
DO $$ BEGIN CREATE POLICY "Tastings viewable by all" ON public.tastings FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert own tastings" ON public.tastings FOR INSERT WITH CHECK (auth.uid() = user_id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can update own tastings" ON public.tastings FOR UPDATE USING (auth.uid() = user_id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can delete own tastings" ON public.tastings FOR DELETE USING (auth.uid() = user_id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Profiles INSERT pour le trigger
DO $$ BEGIN CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ═══════════════════════════════════════════════════════════════
-- TERMINÉ — Toutes les tables sont à jour
-- ═══════════════════════════════════════════════════════════════
