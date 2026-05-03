-- ═══════════════════════════════════════════════════════════════
-- CAVE — Recherche floue améliorée v2
-- Exécuter dans Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════

-- Extension trigram (idempotent)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Baisser le seuil de similarité pour attraper plus de candidats
-- (le scoring fin se fait côté JS)
SELECT set_limit(0.15);

-- Index trigram
CREATE INDEX IF NOT EXISTS idx_wine_catalog_name_trgm ON public.wine_catalog USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_wine_catalog_cuvee_trgm ON public.wine_catalog USING gin (cuvee gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_wine_catalog_appellation_trgm ON public.wine_catalog USING gin (appellation gin_trgm_ops);

-- Supprimer l'ancienne version
DROP FUNCTION IF EXISTS search_wines_fuzzy(text, integer);

-- Nouvelle version : trigram + ilike + full-text, résultats plus larges
CREATE OR REPLACE FUNCTION search_wines_fuzzy(search_query text, max_results int DEFAULT 12)
RETURNS SETOF wine_catalog
LANGUAGE sql STABLE
AS $$
  SELECT DISTINCT ON (id) *
  FROM (
    -- Trigram similarity (handles typos, accents, partial matches)
    SELECT *, GREATEST(
      similarity(name, search_query),
      similarity(coalesce(cuvee,''), search_query),
      similarity(coalesce(appellation,''), search_query)
    ) AS _sim
    FROM wine_catalog
    WHERE name % search_query
       OR cuvee % search_query
       OR appellation % search_query

    UNION ALL

    -- ILIKE fallback (catches exact substrings that trigram might miss)
    SELECT *, 0.5 AS _sim
    FROM wine_catalog
    WHERE name ILIKE '%' || search_query || '%'
       OR cuvee ILIKE '%' || search_query || '%'
       OR appellation ILIKE '%' || search_query || '%'

    UNION ALL

    -- Word-by-word: if query has multiple words, match each
    SELECT *, 0.4 AS _sim
    FROM wine_catalog
    WHERE search_query LIKE '% %'
      AND (
        name ILIKE '%' || split_part(search_query, ' ', 1) || '%'
        AND (
          name ILIKE '%' || split_part(search_query, ' ', 2) || '%'
          OR cuvee ILIKE '%' || split_part(search_query, ' ', 2) || '%'
          OR appellation ILIKE '%' || split_part(search_query, ' ', 2) || '%'
        )
      )
  ) sub
  ORDER BY id, _sim DESC
  LIMIT max_results;
$$;
