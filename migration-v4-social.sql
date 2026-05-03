-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration v4 : Social (follows, profils publics)
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Enrichir les profils
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS public_cave boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bottle_count int DEFAULT 0;

-- Index pour recherche par username
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- 2. Table follows (modèle Instagram : pas de confirmation mutuelle)
CREATE TABLE IF NOT EXISTS public.follows (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  followed_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, followed_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les follows (pour compter followers)
CREATE POLICY "Follows are viewable by everyone" ON public.follows FOR SELECT USING (true);
-- Seul le follower peut follow/unfollow
CREATE POLICY "Users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_followed ON public.follows(followed_id);

-- 3. Rendre les tastings lisibles par les followers
-- Les tastings sont déjà RLS "user can CRUD own"
-- On ajoute une policy SELECT pour les followers
CREATE POLICY "Followers can view tastings" ON public.tastings
  FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.follows
      WHERE follower_id = auth.uid() AND followed_id = public.tastings.user_id
    )
  );

-- 4. Rendre les bouteilles visibles si cave publique
CREATE POLICY "Public cave viewable" ON public.bottles
  FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = public.bottles.user_id AND public_cave = true
    )
  );
