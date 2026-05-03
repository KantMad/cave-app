-- ═══════════════════════════════════════════════════════════════
-- CAVE — Table des domaines viticoles
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.estates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  region text default '',
  sub_region text default '',
  appellation text default '',
  village text default '',
  country text default 'France',
  classification text default '',
  
  -- Domaine info
  founded int,
  owner text default '',
  surface text default '',
  winemaker text default '',
  
  -- Terroir
  terroir jsonb default '{}',
  -- { soil: [], climate: "", altitude: "", exposure: "", vinesAge: "" }
  
  -- Viticulture
  viticulture text default 'Conventionnel',
  -- Bio, Biodynamie, Nature, HVE, Raisonné, Conventionnel
  labels jsonb default '[]',
  
  -- Details
  description text default '',
  history text default '',
  anecdotes jsonb default '[]',
  
  -- Vinification
  vinification jsonb default '{}',
  -- { methods: [], aging: "", barrels: "", fermentation: "" }
  
  -- Visite
  visit jsonb default '{}',
  -- { openToPublic: bool, byAppointment: bool, tours: "", tasting: "", phone: "", website: "" }
  
  -- Coordonnées
  coordinates jsonb default null,
  -- { lat: 44.67, lng: -0.67 }
  
  -- Relations
  wine_refs jsonb default '[]',
  -- ["ref-001", "ref-002"] — IDs from wine_reference_db
  
  -- Prestige
  prestige_score int default 50,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.estates enable row level security;

create policy "Estates viewable by everyone"
  on public.estates for select using (true);

create policy "Authenticated users can insert estates"
  on public.estates for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update estates"
  on public.estates for update
  using (auth.uid() is not null);

-- Indexes
create index if not exists idx_estates_name on public.estates using gin (to_tsvector('french', name || ' ' || coalesce(region,'') || ' ' || coalesce(appellation,'')));
create index if not exists idx_estates_region on public.estates(region);
create index if not exists idx_estates_slug on public.estates(slug);
