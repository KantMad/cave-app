-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration v3 : Dégustations, Wishlist, Localisation
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Table des dégustations
CREATE TABLE IF NOT EXISTS public.tastings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bottle_id uuid REFERENCES public.bottles(id) ON DELETE SET NULL,
  name text NOT NULL DEFAULT '',
  cuvee text DEFAULT '',
  vintage int,
  region text DEFAULT '',
  appellation text DEFAULT '',
  color text DEFAULT 'rouge',
  -- Notes de dégustation
  score_visual numeric(3,1) DEFAULT 0,
  score_nose numeric(3,1) DEFAULT 0,
  score_palate numeric(3,1) DEFAULT 0,
  score_overall numeric(3,1) DEFAULT 0,
  visual_notes text DEFAULT '',
  nose_notes text DEFAULT '',
  palate_notes text DEFAULT '',
  aromas text[] DEFAULT '{}',
  comments text DEFAULT '',
  -- Contexte
  occasion text DEFAULT '',
  paired_with text DEFAULT '',
  temperature text DEFAULT '',
  decanted boolean DEFAULT false,
  -- Meta
  tasted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.tastings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own tastings" ON public.tastings
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_tastings_user ON public.tastings(user_id);
CREATE INDEX IF NOT EXISTS idx_tastings_date ON public.tastings(tasted_at DESC);

-- 2. Wishlist column on bottles (or separate table)
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
CREATE POLICY "Users can CRUD own wishlist" ON public.wishlist
  FOR ALL USING (auth.uid() = user_id);

-- 3. Location field on bottles
ALTER TABLE public.bottles ADD COLUMN IF NOT EXISTS location text DEFAULT '';

-- 4. Index for faster bottle queries
CREATE INDEX IF NOT EXISTS idx_bottles_user ON public.bottles(user_id);
CREATE INDEX IF NOT EXISTS idx_bottles_region ON public.bottles(region);

-- Missing RLS policies for tastings (add these if not already present)
CREATE POLICY IF NOT EXISTS "Users can update own tastings" ON public.tastings
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can delete own tastings" ON public.tastings
  FOR DELETE USING (auth.uid() = user_id);
