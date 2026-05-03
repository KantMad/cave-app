-- ═══════════════════════════════════════════════════════════════
-- CAVE — Fix RLS : dégustations + catalogue partagé
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Tastings : permettre UPDATE et DELETE par le propriétaire
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

-- 2. Wine catalog : permettre à TOUT utilisateur authentifié de mettre à jour
-- (pas seulement le créateur — les enrichissements sont communautaires)
DROP POLICY IF EXISTS "Creator can update catalog entry" ON public.wine_catalog;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update catalog" ON public.wine_catalog
    FOR UPDATE USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
