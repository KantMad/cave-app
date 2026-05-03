-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration complète table tastings
-- Exécuter UNE SEULE FOIS dans Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════

-- 1. Rendre bottle_id nullable (pour les dégustations libres sans bouteille)
ALTER TABLE public.tastings ALTER COLUMN bottle_id DROP NOT NULL;
ALTER TABLE public.tastings DROP CONSTRAINT IF EXISTS tastings_bottle_id_fkey;
ALTER TABLE public.tastings ADD CONSTRAINT tastings_bottle_id_fkey
  FOREIGN KEY (bottle_id) REFERENCES public.bottles(id) ON DELETE SET NULL;

-- 2. Ajouter toutes les colonnes manquantes
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

-- 3. RLS policies (INSERT + UPDATE + DELETE pour le propriétaire)
DO $$ BEGIN
  CREATE POLICY "Users can insert own tastings" ON public.tastings
    FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own tastings" ON public.tastings
    FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can delete own tastings" ON public.tastings
    FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 4. Wine catalog : permettre l'enrichissement communautaire
DROP POLICY IF EXISTS "Creator can update catalog entry" ON public.wine_catalog;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update catalog" ON public.wine_catalog
    FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
