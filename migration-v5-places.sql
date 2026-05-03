-- ═══════════════════════════════════════════════════════════════
-- CAVE — Migration v5 : Places (cavistes, bars à vin)
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Table des lieux
CREATE TABLE IF NOT EXISTS public.places (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'caviste', -- caviste, bar, domaine, restaurant
  address text DEFAULT '',
  city text DEFAULT '',
  lat double precision,
  lng double precision,
  phone text DEFAULT '',
  website text DEFAULT '',
  hours text DEFAULT '', -- texte libre "Lun-Sam 10h-19h"
  description text DEFAULT '',
  specialties text[] DEFAULT '{}', -- ["Bordeaux","Bourgogne","Bio"]
  photo_url text DEFAULT '',
  created_by uuid REFERENCES auth.users(id),
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Places viewable by all" ON public.places FOR SELECT USING (true);
CREATE POLICY "Auth users can add places" ON public.places FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Creator can update" ON public.places FOR UPDATE USING (auth.uid() = created_by);

CREATE INDEX IF NOT EXISTS idx_places_geo ON public.places(lat, lng);
CREATE INDEX IF NOT EXISTS idx_places_type ON public.places(type);
CREATE INDEX IF NOT EXISTS idx_places_city ON public.places(city);

-- 2. Avis utilisateurs sur les lieux
CREATE TABLE IF NOT EXISTS public.place_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id uuid REFERENCES public.places(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating int CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(place_id, user_id) -- 1 avis par user par lieu
);

ALTER TABLE public.place_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews viewable by all" ON public.place_reviews FOR SELECT USING (true);
CREATE POLICY "Auth users can review" ON public.place_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own review" ON public.place_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own review" ON public.place_reviews FOR DELETE USING (auth.uid() = user_id);

-- 3. Recommandations du caviste (coups de cœur du pro)
CREATE TABLE IF NOT EXISTS public.place_picks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id uuid REFERENCES public.places(id) ON DELETE CASCADE NOT NULL,
  wine_name text NOT NULL,
  wine_region text DEFAULT '',
  wine_color text DEFAULT 'rouge',
  wine_price numeric(8,2),
  comment text DEFAULT '',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.place_picks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Picks viewable by all" ON public.place_picks FOR SELECT USING (true);
CREATE POLICY "Auth users can add picks" ON public.place_picks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 4. Quelques lieux de démo à Paris
INSERT INTO public.places (name, type, address, city, lat, lng, phone, hours, description, specialties) VALUES
  ('La Cave du Panthéon', 'caviste', '174 Rue Saint-Jacques, 75005', 'Paris', 48.8472, 2.3456, '01 46 33 90 35', 'Mar-Sam 10h-20h, Dim 10h-13h', 'Cave de quartier emblématique du 5e arrondissement. Sélection pointue de vignerons indépendants, spécialiste des vins naturels et biodynamiques. Conseil personnalisé et dégustations régulières.', '{"Vins naturels","Bourgogne","Loire","Biodynamie"}'),
  ('Lavinia', 'caviste', '3 Boulevard de la Madeleine, 75001', 'Paris', 48.8694, 2.3253, '01 42 97 20 20', 'Lun-Sam 10h-20h', 'La plus grande cave d''Europe. 3 étages, 6500 références de 40 pays. Espace dégustation au dernier étage avec vue. Bar à vin sur place.', '{"International","Grands crus","Champagne","Bar à vin"}'),
  ('Le Baron Rouge', 'bar', '1 Rue Théophile Roussel, 75012', 'Paris', 48.8494, 2.3783, '01 43 43 14 32', 'Mar-Sam 10h-14h / 17h-22h, Dim 10h-15h', 'Institution parisienne près du marché d''Aligre. Vins au verre ou en bouteille dans une ambiance conviviale. Huîtres le dimanche. Cave remplie jusqu''au plafond.', '{"Vins nature","Bordeaux","Huîtres","Ambiance"}'),
  ('Ô Chateau', 'bar', '68 Rue Jean-Jacques Rousseau, 75001', 'Paris', 48.8627, 2.3443, '01 44 73 97 80', 'Lun-Sam 12h-00h', 'Bar à vin et école de dégustation. 40 vins au verre servis au Enomatic. Cours de dégustation en français et anglais. Voûtes du XVIIe siècle.', '{"Cours dégustation","Vins au verre","International","Cave voûtée"}'),
  ('La Cave des Abbesses', 'caviste', '43 Rue des Abbesses, 75018', 'Paris', 48.8845, 2.3383, '01 42 52 81 54', 'Mar-Sam 10h30-13h30 / 15h30-20h30', 'Petite cave de Montmartre avec une sélection soignée de vignerons artisanaux. Forte représentation Rhône et Sud-Ouest. Accueil chaleureux.', '{"Rhône","Sud-Ouest","Vignerons artisanaux","Bio"}'),
  ('Le Verre Volé', 'bar', '67 Rue de Lancry, 75010', 'Paris', 48.8714, 2.3628, '01 48 03 17 34', 'Tlj 12h30-14h30 / 18h30-23h', 'Cave-restaurant culte du canal Saint-Martin. Carte des vins 100% nature, cuisine bistronomique. Réservation indispensable. Épicerie-cave juste à côté.', '{"Vins nature","Bistronomie","Canal Saint-Martin"}'),
  ('Wine by One', 'bar', '7 Rue de la Michodière, 75002', 'Paris', 48.8707, 2.3349, '01 40 26 12 21', 'Lun-Sam 12h-00h', 'Bar à vin connecté avec 100 vins en libre-service (système Enomatic). Carte RFID rechargeable pour se servir soi-même. Idéal pour découvrir.', '{"High-tech","Libre-service","100 références","Afterwork"}')
ON CONFLICT DO NOTHING;
