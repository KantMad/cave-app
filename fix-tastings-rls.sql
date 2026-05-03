-- ═══════════════════════════════════════════════════════════════
-- CAVE — Fix: RLS policies manquantes pour tastings
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Permet aux utilisateurs de modifier leurs propres dégustations
DO $$ BEGIN
  CREATE POLICY "Users can update own tastings" ON public.tastings
    FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Permet aux utilisateurs de supprimer leurs propres dégustations
DO $$ BEGIN
  CREATE POLICY "Users can delete own tastings" ON public.tastings
    FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
