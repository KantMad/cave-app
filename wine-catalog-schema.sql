-- ═══════════════════════════════════════════════════════════════
-- CAVE — Catalogue global de vins (partagé entre tous les users)
-- À exécuter dans : Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════

create table public.wine_catalog (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  cuvee text default '',
  region text default '',
  appellation text default '',
  color text default 'rouge' check (color in ('rouge','blanc','rosé','effervescent','liquoreux')),
  robe text default '#6B1E2C',
  cepages jsonb default '[]',
  typical_alcohol numeric(4,1),
  typical_price numeric(10,2),
  peak_from int,
  peak_to int,
  aromas jsonb default '[]',
  pairings jsonb default '[]',
  service jsonb default '{}',
  estate jsonb default '{}',
  added_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  -- Unique on name+cuvee+region to avoid duplicates
  unique(name, cuvee, region)
);

-- RLS: readable by everyone, insertable by authenticated users
alter table public.wine_catalog enable row level security;

create policy "Wine catalog is viewable by everyone"
  on public.wine_catalog for select using (true);

create policy "Authenticated users can add wines"
  on public.wine_catalog for insert
  with check (auth.uid() is not null);

create policy "Creator can update catalog entry"
  on public.wine_catalog for update
  using (auth.uid() = added_by);

-- Index for search
create index idx_wine_catalog_name on public.wine_catalog using gin (to_tsvector('french', name || ' ' || coalesce(cuvee,'') || ' ' || coalesce(region,'') || ' ' || coalesce(appellation,'')));
create index idx_wine_catalog_region on public.wine_catalog(region);
