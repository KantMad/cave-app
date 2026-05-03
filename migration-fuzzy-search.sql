-- ═══════════════════════════════════════════════════════════════
-- CAVE — Recherche floue (fuzzy) pour wine_catalog
-- Exécuter dans Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════

-- Activer l'extension pg_trgm pour la recherche floue
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Index trigram pour la recherche rapide
CREATE INDEX IF NOT EXISTS idx_wine_catalog_name_trgm ON public.wine_catalog USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_wine_catalog_cuvee_trgm ON public.wine_catalog USING gin (cuvee gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_wine_catalog_appellation_trgm ON public.wine_catalog USING gin (appellation gin_trgm_ops);

-- Fonction de recherche floue
CREATE OR REPLACE FUNCTION search_wines_fuzzy(search_query text, max_results int DEFAULT 12)
RETURNS SETOF wine_catalog
LANGUAGE sql STABLE
AS $$
  SELECT *
  FROM wine_catalog
  WHERE
    -- Correspondance trigram (tolérance aux fautes de frappe)
    name % search_query
    OR cuvee % search_query
    OR appellation % search_query
    -- Fallback ILIKE pour les termes courts
    OR name ILIKE '%' || search_query || '%'
    OR cuvee ILIKE '%' || search_query || '%'
    OR appellation ILIKE '%' || search_query || '%'
  ORDER BY
    -- Prioriser les correspondances exactes, puis par similarité
    CASE WHEN name ILIKE search_query || '%' THEN 0
         WHEN name ILIKE '%' || search_query || '%' THEN 1
         ELSE 2 END,
    GREATEST(
      similarity(name, search_query),
      similarity(coalesce(cuvee,''), search_query),
      similarity(coalesce(appellation,''), search_query)
    ) DESC
  LIMIT max_results;
$$;
