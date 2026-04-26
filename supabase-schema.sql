-- ═══════════════════════════════════════════════════════════════
-- CAVE — Schéma de base de données Supabase
-- À exécuter dans : Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════

-- 1. PROFILS UTILISATEURS
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default '',
  avatar_url text,
  city text default '',
  bio text default '',
  created_at timestamptz default now()
);

-- Créer automatiquement un profil quand un user s'inscrit
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. BOUTEILLES (cave)
create table public.bottles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  cuvee text default '',
  vintage int,
  region text default '',
  appellation text default '',
  color text default 'rouge' check (color in ('rouge','blanc','rosé','effervescent','liquoreux')),
  robe text default '#6B1E2C',
  cepages jsonb default '[]',
  alcohol numeric(4,1),
  price numeric(10,2),
  quantity int default 1,
  score int,
  peak_from int,
  peak_to int,
  aromas jsonb default '[]',
  aroma_wheel jsonb default '{}',
  pairings jsonb default '[]',
  service jsonb default '{}',
  estate jsonb default '{}',
  notes text default '',
  tags jsonb default '[]',
  location jsonb default '{}',
  purchased_at date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. AMIS
create table public.friendships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  friend_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending','accepted','declined')),
  created_at timestamptz default now(),
  unique(user_id, friend_id)
);

-- 4. DÉGUSTATIONS / AVIS
create table public.tastings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  bottle_id uuid references public.bottles(id) on delete cascade not null,
  rating int check (rating between 1 and 5),
  comment text default '',
  tasted_at timestamptz default now()
);

-- 5. ACTIVITÉ (fil d'actualité)
create table public.activity (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  action text not null check (action in ('added','tasted','rated','shared')),
  bottle_id uuid references public.bottles(id) on delete set null,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

alter table public.profiles enable row level security;
alter table public.bottles enable row level security;
alter table public.friendships enable row level security;
alter table public.tastings enable row level security;
alter table public.activity enable row level security;

-- Profils : lecture publique, modification par le propriétaire
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Bouteilles : lecture publique, CRUD par le propriétaire
create policy "Bottles are viewable by everyone" on public.bottles for select using (true);
create policy "Users can insert own bottles" on public.bottles for insert with check (auth.uid() = user_id);
create policy "Users can update own bottles" on public.bottles for update using (auth.uid() = user_id);
create policy "Users can delete own bottles" on public.bottles for delete using (auth.uid() = user_id);

-- Amitiés : visibles par les deux parties
create policy "Friendships viewable by parties" on public.friendships for select using (auth.uid() = user_id or auth.uid() = friend_id);
create policy "Users can request friendships" on public.friendships for insert with check (auth.uid() = user_id);
create policy "Users can update friendship status" on public.friendships for update using (auth.uid() = friend_id);

-- Dégustations : lecture publique, écriture par le propriétaire
create policy "Tastings are viewable by everyone" on public.tastings for select using (true);
create policy "Users can insert own tastings" on public.tastings for insert with check (auth.uid() = user_id);

-- Activité : lecture publique
create policy "Activity is viewable by everyone" on public.activity for select using (true);
create policy "Users can insert own activity" on public.activity for insert with check (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- INDEX pour performance
-- ═══════════════════════════════════════════════════════════════
create index idx_bottles_user on public.bottles(user_id);
create index idx_bottles_region on public.bottles(region);
create index idx_tastings_bottle on public.tastings(bottle_id);
create index idx_activity_user on public.activity(user_id);
create index idx_activity_created on public.activity(created_at desc);
