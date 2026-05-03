-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration catalogue v2
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Ajouter les nouvelles colonnes au catalogue
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS aroma_wheel jsonb DEFAULT '{}';
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS barcode text;
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS scan_count int DEFAULT 0;
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS last_scanned_at timestamptz;
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS classification text DEFAULT '';
ALTER TABLE public.wine_catalog ADD COLUMN IF NOT EXISTS sub_region text DEFAULT '';

-- Index pour recherche par barcode (instant lookup)
CREATE INDEX IF NOT EXISTS idx_wine_catalog_barcode ON public.wine_catalog(barcode) WHERE barcode IS NOT NULL;

-- Index pour recherche textuelle améliorée
DROP INDEX IF EXISTS idx_wine_catalog_name;
CREATE INDEX IF NOT EXISTS idx_wine_catalog_search ON public.wine_catalog 
  USING gin (to_tsvector('french', name || ' ' || coalesce(cuvee,'') || ' ' || coalesce(appellation,'')));

-- Permettre l'update par tous les utilisateurs authentifiés (corrections communautaires)
DROP POLICY IF EXISTS "Creator can update catalog entry" ON public.wine_catalog;
CREATE POLICY "Authenticated users can update catalog"
  ON public.wine_catalog FOR UPDATE
  USING (auth.uid() IS NOT NULL);
