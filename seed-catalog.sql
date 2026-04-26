-- Seed wine_catalog with 109 reference wines
-- Run in Supabase SQL Editor
-- First, update the color constraint to allow 'muté' (fortified wines)
ALTER TABLE wine_catalog DROP CONSTRAINT IF EXISTS wine_catalog_color_check;
ALTER TABLE wine_catalog ADD CONSTRAINT wine_catalog_color_check CHECK (color in ('rouge','blanc','rosé','effervescent','liquoreux','muté'));

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Margaux', 'Grand Vin', 'Bordeaux', 'Margaux 1er Grand Cru Classé', 'rouge', '#5A0E1A', '[{"n": "Cabernet Sauvignon", "p": 87}, {"n": "Merlot", "p": 8}, {"n": "Petit Verdot", "p": 3}, {"n": "Cabernet Franc", "p": 2}]'::jsonb, 13.5, 900.0, 2020 + 10, 2020 + 40, '["cassis", "mûre", "cerise noire", "violette", "rose fanée", "cèdre", "poivre noir", "graphite", "truffe", "cacao", "vanille", "tabac"]'::jsonb, '["Côte de bœuf", "Agneau de Pauillac", "Saint-nectaire affiné"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1572, "owner": "Famille Mentzelopoulos", "surface": "87 ha", "terroir": "Graves günziennes profondes", "soil": ["Graves", "Calcaire"], "climate": "Océanique tempéré", "description": "Premier Grand Cru Classé en 1855, quintessence du Médoc."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Latour', 'Grand Vin', 'Bordeaux', 'Pauillac 1er Grand Cru Classé', 'rouge', '#4A0C16', '[{"n": "Cabernet Sauvignon", "p": 77}, {"n": "Merlot", "p": 17}, {"n": "Cabernet Franc", "p": 4}, {"n": "Petit Verdot", "p": 2}]'::jsonb, 13.8, 1100.0, 2020 + 15, 2020 + 50, '["cassis", "mûre", "violette", "réglisse", "menthol", "graphite", "terre humide", "truffe", "cèdre", "tabac", "havane"]'::jsonb, '["Côte de bœuf maturée", "Agneau grillé", "Cantal vieux"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1331, "owner": "François Pinault (Artémis)", "surface": "90 ha", "terroir": "Graves profondes, L''Enclos", "soil": ["Graves garonnaises", "Argile", "Calcaire"], "climate": "Océanique tempéré", "description": "Le plus puissant des Premiers Crus. A quitté les primeurs en 2012."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Lafite Rothschild', '', 'Bordeaux', 'Pauillac 1er Grand Cru Classé', 'rouge', '#580E1A', '[{"n": "Cabernet Sauvignon", "p": 91}, {"n": "Merlot", "p": 8.5}, {"n": "Petit Verdot", "p": 0.5}]'::jsonb, 13.0, 1050.0, 2020 + 12, 2020 + 40, '["cassis", "groseille", "cerise", "violette", "rose", "cèdre", "mine de crayon", "graphite", "vanille fine", "tabac blond"]'::jsonb, '["Carré d''agneau", "Canard rôti", "Brie de Meaux"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1234, "owner": "Famille Rothschild", "surface": "112 ha", "terroir": "Graves fines sur calcaire", "soil": ["Graves fines", "Calcaire", "Sable éolien"], "climate": "Océanique tempéré", "description": "L''élégance bordelaise par excellence."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Mouton Rothschild', '', 'Bordeaux', 'Pauillac 1er Grand Cru Classé', 'rouge', '#500E18', '[{"n": "Cabernet Sauvignon", "p": 82}, {"n": "Merlot", "p": 15}, {"n": "Cabernet Franc", "p": 3}]'::jsonb, 13.8, 650.0, 2020 + 10, 2020 + 40, '["cassis", "mûre", "cerise noire", "violette", "cèdre", "épices orientales", "graphite", "encre", "café torréfié", "vanille", "tabac"]'::jsonb, '["Entrecôte bordelaise", "Gigot d''agneau", "Mimolette extra-vieille"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1853, "owner": "Famille Rothschild", "surface": "90 ha", "terroir": "Graves profondes, plateau de Mouton", "soil": ["Graves profondes", "Calcaire"], "climate": "Océanique tempéré", "description": "Seul château promu Premier Cru Classé (1973). Étiquettes d''artistes."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Haut-Brion', '', 'Bordeaux', 'Pessac-Léognan 1er Grand Cru Classé', 'rouge', '#5C1020', '[{"n": "Merlot", "p": 56}, {"n": "Cabernet Sauvignon", "p": 37}, {"n": "Cabernet Franc", "p": 7}]'::jsonb, 14.5, 700.0, 2020 + 10, 2020 + 35, '["mûre", "cassis", "cerise burlat", "pivoine", "poivre blanc", "tabac blond", "graphite", "fumée", "terre chaude", "cèdre", "havane", "torréfaction"]'::jsonb, '["Canard laqué", "Ris de veau", "Ossau-Iraty"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1525, "owner": "Domaine Clarence Dillon", "surface": "51 ha", "terroir": "Graves profondes sur calcaire, Pessac", "soil": ["Graves", "Calcaire", "Argile"], "climate": "Océanique, influence urbaine", "description": "Plus ancien des Premiers Crus Classés, classé rouge et blanc. Signature fumée unique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Léoville-Las-Cases', 'Grand Vin', 'Bordeaux', 'Saint-Julien 2ème GCC', 'rouge', '#520F1B', '[{"n": "Cabernet Sauvignon", "p": 76}, {"n": "Merlot", "p": 14}, {"n": "Cabernet Franc", "p": 10}]'::jsonb, 13.8, 300.0, 2020 + 10, 2020 + 35, '["cassis", "myrtille", "iris", "violette", "cèdre", "menthol", "graphite", "mine de crayon", "réglisse", "tabac fin"]'::jsonb, '["Carré d''agneau", "Pigeon rôti", "Cantal entre-deux"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1638, "owner": "Jean-Hubert Delon", "surface": "97 ha", "terroir": "Graves garonnaises, face à Latour", "soil": ["Graves", "Argile"], "climate": "Océanique tempéré", "description": "Le « super second » qui rivalise avec les Premiers Crus."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Ducru-Beaucaillou', '', 'Bordeaux', 'Saint-Julien 2ème GCC', 'rouge', '#550F1C', '[{"n": "Cabernet Sauvignon", "p": 85}, {"n": "Merlot", "p": 15}]'::jsonb, 13.5, 225.0, 2020 + 10, 2020 + 30, '["cassis", "myrtille", "violette", "poivre", "menthol", "graphite", "cèdre", "tabac"]'::jsonb, '["Côte de bœuf", "Pigeon", "Saint-Nectaire"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1720, "owner": "Famille Borie", "surface": "75 ha", "terroir": "Graves profondes, bord d''estuaire", "soil": ["Graves", "Calcaire"], "climate": "Océanique tempéré", "description": "L''un des plus constants des Seconds Crus. Les « beaux cailloux » de graves."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Cos d''Estournel', '', 'Bordeaux', 'Saint-Estèphe 2ème GCC', 'rouge', '#4E0E18', '[{"n": "Cabernet Sauvignon", "p": 60}, {"n": "Merlot", "p": 38}, {"n": "Cabernet Franc", "p": 2}]'::jsonb, 14.0, 200.0, 2020 + 8, 2020 + 30, '["cassis", "mûre", "violette", "réglisse", "poivre", "épices orientales", "terre", "vanille", "café", "chocolat"]'::jsonb, '["Agneau aux épices", "Canard confit", "Comté affiné"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1811, "owner": "Michel Reybier", "surface": "91 ha", "terroir": "Croupe de graves, face à Lafite", "soil": ["Graves", "Argile", "Calcaire"], "climate": "Océanique tempéré", "description": "Surnommé le Maharaja de Saint-Estèphe. Pagode orientale iconique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Pape Clément', '', 'Bordeaux', 'Pessac-Léognan GCC', 'rouge', '#55101C', '[{"n": "Cabernet Sauvignon", "p": 52}, {"n": "Merlot", "p": 46}, {"n": "Petit Verdot", "p": 2}]'::jsonb, 14.0, 95.0, 2020 + 5, 2020 + 20, '["myrtille", "cassis", "violette", "réglisse", "poivre", "fumée douce", "vanille", "moka"]'::jsonb, '["Magret de canard", "Entrecôte grillée", "Tomme de Savoie"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 30 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1300, "owner": "Bernard Magrez", "surface": "60 ha", "terroir": "Graves sur calcaire, Pessac", "soil": ["Graves", "Calcaire"], "climate": "Océanique", "description": "Créé par le pape Clément V. L''un des plus anciens vignobles bordelais."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Lynch-Bages', '', 'Bordeaux', 'Pauillac 5ème GCC', 'rouge', '#520F1B', '[{"n": "Cabernet Sauvignon", "p": 73}, {"n": "Merlot", "p": 22}, {"n": "Cabernet Franc", "p": 3}, {"n": "Petit Verdot", "p": 2}]'::jsonb, 13.5, 110.0, 2020 + 8, 2020 + 25, '["cassis", "mûre", "myrtille", "violette", "réglisse", "poivre", "menthol", "graphite", "cèdre", "vanille"]'::jsonb, '["Entrecôte", "Agneau grillé", "Tomme des Pyrénées"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1749, "owner": "Famille Cazes", "surface": "100 ha", "terroir": "Plateau de Bages, graves profondes", "soil": ["Graves", "Calcaire"], "climate": "Océanique tempéré", "description": "Surnommé le « pauvre homme Mouton » pour son rapport qualité-prix exceptionnel parmi les classés."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Pétrus', '', 'Bordeaux', 'Pomerol', 'rouge', '#4E0D18', '[{"n": "Merlot", "p": 100}]'::jsonb, 14.5, 4500.0, 2020 + 15, 2020 + 50, '["cerise noire", "prune confite", "figue", "violette", "iris", "réglisse", "truffe noire", "argile", "fer", "chocolat noir", "café torréfié"]'::jsonb, '["Truffe noire entière", "Filet de bœuf Rossini", "Vieux parmesan"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1770, "owner": "Famille Moueix", "surface": "11,5 ha", "terroir": "Boutonnière d''argile bleue", "soil": ["Argile bleue", "Fer"], "climate": "Océanique continental", "description": "Vignoble mythique de Pomerol. Argile bleue unique, 100% Merlot."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Cheval Blanc', '', 'Bordeaux', 'Saint-Émilion 1er GCC A', 'rouge', '#5A1020', '[{"n": "Cabernet Franc", "p": 52}, {"n": "Merlot", "p": 43}, {"n": "Cabernet Sauvignon", "p": 5}]'::jsonb, 14.0, 850.0, 2020 + 10, 2020 + 40, '["framboise", "mûre", "cerise confite", "pivoine", "violette", "épices douces", "menthol", "truffe", "terre chaude", "vanille", "torréfaction"]'::jsonb, '["Pigeon en croûte", "Veau rôti", "Époisses"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1832, "owner": "LVMH & Albert Frère", "surface": "39 ha", "terroir": "Graves, sables, argiles, frontière Pomerol", "soil": ["Graves", "Sable", "Argile", "Crasse de fer"], "climate": "Océanique continental", "description": "Premier GCC A à dominante Cabernet Franc. Frontière de Pomerol."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Ausone', '', 'Bordeaux', 'Saint-Émilion 1er GCC A', 'rouge', '#520E1A', '[{"n": "Cabernet Franc", "p": 55}, {"n": "Merlot", "p": 45}]'::jsonb, 14.0, 750.0, 2020 + 12, 2020 + 45, '["cerise noire", "mûre", "myrtille", "violette", "iris", "réglisse", "menthol", "pierre calcaire", "minerai", "vanille", "encens"]'::jsonb, '["Lièvre à la royale", "Filet de bœuf", "Parmigiano 36 mois"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 350, "owner": "Famille Vauthier", "surface": "7 ha", "terroir": "Calcaire à astéries, coteau sud", "soil": ["Calcaire à astéries", "Argile"], "climate": "Océanique continental", "description": "Perché sur le plateau calcaire. L''un des plus petits et anciens Premiers Crus A."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Le Pin', '', 'Bordeaux', 'Pomerol', 'rouge', '#500E1A', '[{"n": "Merlot", "p": 100}]'::jsonb, 14.5, 3000.0, 2020 + 8, 2020 + 30, '["cerise noire", "prune", "framboise confite", "violette", "cannelle", "vanille", "truffe", "terre", "chocolat", "café"]'::jsonb, '["Truffe fraîche", "Veau de lait", "Brillat-Savarin"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1979, "owner": "Jacques Thienpont", "surface": "2,7 ha", "terroir": "Argile et gravier, Pomerol", "soil": ["Argile", "Gravier"], "climate": "Océanique continental", "description": "Vin de garagiste devenu légende. Micro-production de 500-600 caisses."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Figeac', '', 'Bordeaux', 'Saint-Émilion 1er GCC A', 'rouge', '#581220', '[{"n": "Cabernet Sauvignon", "p": 37}, {"n": "Cabernet Franc", "p": 33}, {"n": "Merlot", "p": 30}]'::jsonb, 13.8, 185.0, 2020 + 8, 2020 + 30, '["cassis", "mûre", "cerise", "violette", "rose", "menthol", "réglisse", "graphite", "terre", "cèdre", "tabac"]'::jsonb, '["Bécasse", "Côte de bœuf", "Comté 24 mois"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1892, "owner": "Famille Manoncourt-Lurton", "surface": "54 ha", "terroir": "Graves de Figeac, frontière Pomerol", "soil": ["Graves", "Sable", "Argile"], "climate": "Océanique continental", "description": "Promu Premier GCC A en 2022. Assemblage atypique à dominante Cabernet."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château d''Yquem', '', 'Bordeaux', 'Sauternes 1er Cru Supérieur', 'liquoreux', '#D68A1A', '[{"n": "Sémillon", "p": 80}, {"n": "Sauvignon Blanc", "p": 20}]'::jsonb, 14.0, 450.0, 2020 + 10, 2020 + 100, '["abricot confit", "ananas rôti", "coing", "fleur d''oranger", "tilleul", "safran", "vanille bourbon", "miel d''acacia", "caramel blond"]'::jsonb, '["Foie gras poêlé", "Roquefort", "Tarte Tatin"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1593, "owner": "LVMH", "surface": "113 ha", "terroir": "Graves sableuses, vallée du Ciron", "soil": ["Graves", "Sable", "Argile"], "climate": "Océanique, brouillards du Ciron", "description": "Seul Premier Cru Supérieur 1855. Botrytis noble, tris successifs."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Suduiraut', '', 'Bordeaux', 'Sauternes 1er Cru Classé', 'liquoreux', '#D08418', '[{"n": "Sémillon", "p": 90}, {"n": "Sauvignon Blanc", "p": 10}]'::jsonb, 13.8, 60.0, 2020 + 8, 2020 + 40, '["abricot", "mangue", "ananas", "acacia", "jasmin", "vanille", "miel", "caramel", "brioche"]'::jsonb, '["Foie gras mi-cuit", "Tarte aux fruits", "Bleu d''Auvergne"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1580, "owner": "AXA Millésimes", "surface": "90 ha", "terroir": "Graves argileuses, Preignac", "soil": ["Graves", "Argile"], "climate": "Océanique, brouillards du Ciron", "description": "Premier Cru de Sauternes, voisin d''Yquem. Opulence et richesse."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de Chevalier', 'Blanc', 'Bordeaux', 'Pessac-Léognan GCC', 'blanc', '#D8C45A', '[{"n": "Sauvignon Blanc", "p": 70}, {"n": "Sémillon", "p": 30}]'::jsonb, 13.5, 140.0, 2020 + 5, 2020 + 25, '["pamplemousse", "citron", "pêche blanche", "acacia", "fleur de sureau", "silex", "fumée", "noisette", "beurre", "vanille"]'::jsonb, '["Homard grillé", "Turbot sauce hollandaise", "Beaufort"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage 30 min", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1783, "owner": "Famille Bernard", "surface": "5 ha (blanc)", "terroir": "Graves fines, clairière boisée", "soil": ["Graves", "Sable", "Argile"], "climate": "Océanique, micro-climat", "description": "L''un des plus grands blancs secs de Bordeaux."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Smith Haut Lafitte', 'Blanc', 'Bordeaux', 'Pessac-Léognan GCC', 'blanc', '#D5C048', '[{"n": "Sauvignon Blanc", "p": 90}, {"n": "Sauvignon Gris", "p": 5}, {"n": "Sémillon", "p": 5}]'::jsonb, 13.8, 115.0, 2020 + 5, 2020 + 15, '["pamplemousse", "citron vert", "pêche", "fleur de sureau", "silex", "fumée", "vanille", "noisette grillée"]'::jsonb, '["Bar grillé", "Crevettes", "Chabichou du Poitou"]'::jsonb, '{"temp": "12-14°", "carafe": "Servir direct", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1365, "owner": "Famille Cathiard", "surface": "11 ha (blanc)", "terroir": "Graves profondes, Martillac", "soil": ["Graves", "Calcaire"], "climate": "Océanique", "description": "Domaine en bio certifié, spa aux sources de Caudalíe sur le domaine."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Romanée-Conti', 'La Tâche', 'Bourgogne', 'La Tâche Grand Cru Monopole', 'rouge', '#6B1326', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.0, 4500.0, 2020 + 10, 2020 + 30, '["framboise", "cerise griotte", "fraise des bois", "pivoine", "rose", "cannelle", "clou de girofle", "sous-bois", "champignon", "humus", "santal", "vanille fine"]'::jsonb, '["Pigeonneau rôti", "Bécasse", "Comté 36 mois"]'::jsonb, '{"temp": "15-16°", "carafe": "Ouvrir 30 min", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1232, "owner": "de Villaine & Leroy-Roch", "surface": "6,06 ha (monopole)", "terroir": "Marno-calcaire du Bajocien", "soil": ["Marnes", "Calcaire du Bajocien"], "climate": "Continental", "description": "Monopole du DRC. L''un des plus grands climats de la Côte de Nuits."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Romanée-Conti', 'Romanée-Conti', 'Bourgogne', 'Romanée-Conti Grand Cru Monopole', 'rouge', '#6A1224', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.0, 22500.0, 2020 + 10, 2020 + 40, '["cerise griotte", "framboise", "fraise", "rose ancienne", "pivoine", "violette", "cannelle", "épices fines", "sous-bois", "truffe", "humus", "terre sacrée", "santal", "encens"]'::jsonb, '["Bécasse", "Caille aux truffes", "Époisses affiné"]'::jsonb, '{"temp": "15-16°", "carafe": "Ouvrir 1h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1232, "owner": "de Villaine & Leroy-Roch", "surface": "1,81 ha (monopole)", "terroir": "Calcaire bajocien, mi-coteau", "soil": ["Calcaire", "Marnes", "Argile"], "climate": "Continental", "description": "Le vin le plus mythique du monde. 1,81 ha en monopole. ~5000 bouteilles par an."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Leroy', 'Chambertin', 'Bourgogne', 'Chambertin Grand Cru', 'rouge', '#701828', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.0, 6000.0, 2020 + 10, 2020 + 35, '["framboise", "groseille", "cerise confite", "rose ancienne", "pivoine", "épices douces", "réglisse", "terre humide", "champignon", "sous-bois", "santal", "encens"]'::jsonb, '["Lièvre à la royale", "Époisses", "Truffe de Bourgogne"]'::jsonb, '{"temp": "15-16°", "carafe": "Ouvrir 1h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1988, "owner": "Lalou Bize-Leroy", "surface": "22 ha", "terroir": "Marno-calcaire, combe de Gevrey", "soil": ["Marnes", "Calcaire", "Argile"], "climate": "Continental", "description": "Biodynamie intégrale, rendements ultra-bas. Pureté sans égale."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Coche-Dury', 'Meursault', 'Bourgogne', 'Meursault', 'blanc', '#D6B84E', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 13.2, 550.0, 2020 + 5, 2020 + 15, '["citron confit", "pêche jaune", "amande", "tilleul", "pierre chaude", "silex", "noisette grillée", "beurre", "pain grillé"]'::jsonb, '["Homard breton", "Poulet de Bresse à la crème", "Beaufort d''alpage"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage 30 min", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1920, "owner": "Raphaël Coche", "surface": "10 ha", "terroir": "Calcaire à entroques, argiles", "soil": ["Calcaire à entroques", "Argile"], "climate": "Continental", "description": "Domaine culte de Meursault. Pureté minérale au sommet."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Leflaive', 'Puligny-Montrachet', 'Bourgogne', 'Puligny-Montrachet', 'blanc', '#DBC260', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 13.2, 150.0, 2020 + 5, 2020 + 15, '["poire", "amande fraîche", "pêche blanche", "fleur blanche", "cannelle douce", "caillou", "noisette", "beurre frais", "brioche"]'::jsonb, '["Ris de veau", "Saint-Jacques", "Comté affiné"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage 30 min", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1717, "owner": "Famille Leflaive", "surface": "25 ha", "terroir": "Calcaires du Bathonien", "soil": ["Calcaire du Bathonien", "Argile"], "climate": "Continental", "description": "Référence absolue du Chardonnay bourguignon. Biodynamie depuis 1990."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Raveneau', 'Chablis Les Clos', 'Bourgogne', 'Chablis Grand Cru', 'blanc', '#D9C85A', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 12.8, 200.0, 2020 + 7, 2020 + 20, '["citron vert", "pomme granny", "poire", "acacia", "coquillage fossile", "pierre à fusil", "craie"]'::jsonb, '["Huîtres de Cancale", "Langoustines", "Escargots de Bourgogne"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Chablis"}'::jsonb, '{"founded": 1948, "owner": "Famille Raveneau", "surface": "7,5 ha", "terroir": "Kimméridgien, marnes à exogyra virgula", "soil": ["Kimméridgien", "Marnes à huîtres fossiles"], "climate": "Continental froid", "description": "Référence absolue de Chablis. Minéralité kimméridgienne."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Georges Roumier', 'Musigny', 'Bourgogne', 'Musigny Grand Cru', 'rouge', '#6F1525', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.2, 7000.0, 2020 + 10, 2020 + 30, '["framboise", "cerise", "fraise", "rose", "violette", "épices fines", "sous-bois", "champignon", "vanille subtile"]'::jsonb, '["Perdreau rôti", "Filet de chevreuil", "Langres"]'::jsonb, '{"temp": "15-16°", "carafe": "Ouvrir 30 min", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1924, "owner": "Christophe Roumier", "surface": "0,10 ha (Musigny)", "terroir": "Calcaire oolithique, mi-coteau", "soil": ["Calcaire oolithique", "Argile rouge"], "climate": "Continental", "description": "Finesse légendaire. L''un des vignerons les plus respectés de Bourgogne."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Armand Rousseau', 'Chambertin', 'Bourgogne', 'Chambertin Grand Cru', 'rouge', '#681525', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.2, 3500.0, 2020 + 10, 2020 + 30, '["cerise noire", "framboise", "cassis", "rose", "pivoine", "réglisse", "poivre", "terre", "sous-bois", "truffe", "chêne fin", "vanille"]'::jsonb, '["Bœuf bourguignon", "Gibier à plumes", "Ami du Chambertin"]'::jsonb, '{"temp": "15-16°", "carafe": "Carafage léger", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1902, "owner": "Famille Rousseau", "surface": "2,15 ha (Chambertin)", "terroir": "Marno-calcaire, exposition est", "soil": ["Marnes", "Calcaire", "Argile rouge"], "climate": "Continental", "description": "Référence historique du Chambertin. Style classique et racé."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Comte Georges de Vogüé', 'Musigny Vieilles Vignes', 'Bourgogne', 'Musigny Grand Cru', 'rouge', '#6C1424', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.2, 1150.0, 2020 + 10, 2020 + 30, '["cerise", "framboise", "fraise des bois", "rose", "pivoine", "violette", "épices douces", "sous-bois", "terre fine", "vanille délicate"]'::jsonb, '["Canard rôti", "Faisan", "Époisses"]'::jsonb, '{"temp": "15-16°", "carafe": "Ouvrir 30 min", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1450, "owner": "Famille de Vogüé", "surface": "7,2 ha (Musigny)", "terroir": "Calcaire bajocien, mi-coteau", "soil": ["Calcaire", "Marnes"], "climate": "Continental", "description": "Plus grand propriétaire en Musigny (70% du cru). Vignes centenaires."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine des Comtes Lafon', 'Meursault Charmes', 'Bourgogne', 'Meursault 1er Cru', 'blanc', '#D8BE55', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 13.2, 160.0, 2020 + 5, 2020 + 15, '["pêche blanche", "poire", "amande", "tilleul", "acacia", "pierre chaude", "beurre", "noisette", "brioche"]'::jsonb, '["Volaille de Bresse", "Homard grillé", "Beaufort"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage 30 min", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1894, "owner": "Dominique Lafon", "surface": "14 ha", "terroir": "Calcaire et argile, mi-coteau", "soil": ["Calcaire", "Argile"], "climate": "Continental", "description": "Dominique Lafon a hissé le domaine au sommet. Biodynamie depuis 1998."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('E. Guigal', 'La Mouline', 'Rhône', 'Côte-Rôtie', 'rouge', '#5E1220', '[{"n": "Syrah", "p": 89}, {"n": "Viognier", "p": 11}]'::jsonb, 13.5, 400.0, 2020 + 10, 2020 + 30, '["cassis", "mûre", "myrtille", "violette", "iris", "poivre", "olive noire", "lard fumé", "graphite", "fumée", "réglisse", "cacao", "vanille"]'::jsonb, '["Chevreuil sauce grand veneur", "Pigeon aux épices", "Saint-Marcellin"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h30", "verre": "Syrah XL"}'::jsonb, '{"founded": 1946, "owner": "Famille Guigal", "surface": "60 ha", "terroir": "Schistes et gneiss, Côte Blonde", "soil": ["Schistes", "Gneiss"], "climate": "Continental méditerranéen", "description": "Les mythiques « La La La ». Élevage 42 mois en fûts neufs."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('E. Guigal', 'La Landonne', 'Rhône', 'Côte-Rôtie', 'rouge', '#4E0E1A', '[{"n": "Syrah", "p": 100}]'::jsonb, 13.5, 400.0, 2020 + 12, 2020 + 35, '["cassis", "mûre", "poivre noir", "lard fumé", "olive", "graphite", "encre", "terre brûlée", "réglisse", "cacao", "café"]'::jsonb, '["Gibier", "Bœuf braisé", "Bleu d''Auvergne"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 2h", "verre": "Syrah XL"}'::jsonb, '{"founded": 1946, "owner": "Famille Guigal", "surface": "2 ha", "terroir": "Schistes ferrugineux, Côte Brune", "soil": ["Schistes ferrugineux", "Mica"], "climate": "Continental méditerranéen", "description": "La plus austère et puissante des trois « La La La ». Syrah pure, Côte Brune."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Jean-Louis Chave', 'Hermitage', 'Rhône', 'Hermitage', 'rouge', '#550F1C', '[{"n": "Syrah", "p": 100}]'::jsonb, 13.5, 325.0, 2020 + 10, 2020 + 30, '["cassis", "mûre", "myrtille", "violette", "poivre", "olive noire", "fumée", "graphite", "terre", "encre", "réglisse", "cuir"]'::jsonb, '["Épaule d''agneau confite", "Gibier", "Saint-Nectaire"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h30", "verre": "Syrah XL"}'::jsonb, '{"founded": 1481, "owner": "Jean-Louis Chave", "surface": "15 ha", "terroir": "Assemblage de 6 lieux-dits", "soil": ["Granit", "Loess", "Argile", "Calcaire"], "climate": "Continental méditerranéen", "description": "Famille vigneronne depuis 1481. Assemblage des meilleurs lieux-dits."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château de Beaucastel', 'Hommage à Jacques Perrin', 'Rhône', 'Châteauneuf-du-Pape', 'rouge', '#601520', '[{"n": "Mourvèdre", "p": 60}, {"n": "Grenache", "p": 20}, {"n": "Syrah", "p": 10}, {"n": "Counoise", "p": 10}]'::jsonb, 15.0, 450.0, 2020 + 10, 2020 + 30, '["cassis", "cerise noire", "figue sèche", "lavande", "poivre", "thym", "romarin", "garrigue", "cuir", "gibier", "cacao", "tabac"]'::jsonb, '["Sanglier en civet", "Gigot de 7 heures", "Banon affiné"]'::jsonb, '{"temp": "16-18°", "carafe": "Carafage 2h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1549, "owner": "Famille Perrin", "surface": "100 ha", "terroir": "Galets roulés, safres, grès rouge", "soil": ["Galets roulés", "Safres", "Grès rouge"], "climate": "Méditerranéen", "description": "Cultive les 13 cépages de l''appellation en bio."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Rayas', '', 'Rhône', 'Châteauneuf-du-Pape', 'rouge', '#7A2030', '[{"n": "Grenache", "p": 100}]'::jsonb, 14.5, 700.0, 2020 + 8, 2020 + 25, '["fraise confite", "cerise kirsch", "framboise", "rose", "pivoine", "cannelle", "poivre blanc", "sous-bois", "terre rouge", "cuir fin"]'::jsonb, '["Agneau de Sisteron", "Rouget barbet", "Picodon"]'::jsonb, '{"temp": "15-16°", "carafe": "Carafage léger", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1880, "owner": "Emmanuel Reynaud", "surface": "13 ha", "terroir": "Sables fins, exposition nord", "soil": ["Sable fin", "Argile"], "climate": "Méditerranéen", "description": "Anti-conformiste : Grenache pur, exposition nord. Finesse unique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('M. Chapoutier', 'Le Méal', 'Rhône', 'Hermitage', 'rouge', '#580E1C', '[{"n": "Syrah", "p": 100}]'::jsonb, 14.0, 220.0, 2020 + 8, 2020 + 25, '["mûre", "myrtille", "olive noire", "violette", "poivre noir", "lard fumé", "graphite", "terre brûlée", "chocolat", "café"]'::jsonb, '["Bœuf bourguignon", "Aligot-saucisse", "Fourme d''Ambert"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Syrah"}'::jsonb, '{"founded": 1808, "owner": "Michel Chapoutier", "surface": "350 ha", "terroir": "Granit et loess, Le Méal", "soil": ["Granit", "Loess"], "climate": "Continental méditerranéen", "description": "Maison historique. Étiquettes en braille."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Auguste Clape', 'Cornas', 'Rhône', 'Cornas', 'rouge', '#5A1020', '[{"n": "Syrah", "p": 100}]'::jsonb, 13.5, 80.0, 2020 + 8, 2020 + 25, '["cassis", "mûre", "myrtille", "violette", "poivre", "olive noire", "graphite", "terre", "fumée", "réglisse", "cuir"]'::jsonb, '["Côte de bœuf", "Daube", "Picodon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Syrah"}'::jsonb, '{"founded": 1955, "owner": "Pierre-Marie Clape", "surface": "10 ha", "terroir": "Granit décomposé, coteaux abrupts", "soil": ["Granit", "Arène granitique"], "climate": "Continental méditerranéen", "description": "Référence absolue de Cornas. Style classique, pas de bois neuf."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Jamet', 'Côte-Rôtie', 'Rhône', 'Côte-Rôtie', 'rouge', '#5C1020', '[{"n": "Syrah", "p": 95}, {"n": "Viognier", "p": 5}]'::jsonb, 13.5, 105.0, 2020 + 8, 2020 + 20, '["cassis", "mûre", "framboise", "violette", "iris", "poivre", "olive noire", "graphite", "fumée", "cuir", "réglisse"]'::jsonb, '["Gibier à plumes", "Agneau", "Saint-Félicien"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Syrah"}'::jsonb, '{"founded": 1950, "owner": "Jean-Paul & Jean-Luc Jamet", "surface": "10 ha", "terroir": "Schistes, Côte Brune et Blonde", "soil": ["Schistes", "Gneiss"], "climate": "Continental méditerranéen", "description": "Assemblage des deux côtes. Style pur et précis, sans bois neuf excessif."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Krug', 'Grande Cuvée', 'Champagne', 'Champagne', 'effervescent', '#E6C668', '[{"n": "Pinot Noir", "p": 45}, {"n": "Chardonnay", "p": 37}, {"n": "Meunier", "p": 18}]'::jsonb, 12.2, 250.0, null, 2020 + 12, '["abricot sec", "pomme mûre", "agrumes confits", "fleur de vigne", "chèvrefeuille", "gingembre", "cardamome", "brioche", "noisette grillée", "miel"]'::jsonb, '["Risotto au parmesan", "Homard thermidor", "Volaille de Bresse"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe Champagne"}'::jsonb, '{"founded": 1843, "owner": "LVMH — Famille Krug", "surface": "20 ha + achats", "terroir": "Crus multiples, réserves perpétuelles", "soil": ["Craie", "Calcaire", "Argile"], "climate": "Océanique continental froid", "description": "Assemblage de 150+ vins de réserve, 10-15 millésimes."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Dom Pérignon', 'Vintage', 'Champagne', 'Champagne', 'effervescent', '#E0C060', '[{"n": "Chardonnay", "p": 52}, {"n": "Pinot Noir", "p": 48}]'::jsonb, 12.2, 215.0, null, 2020 + 15, '["agrumes", "pêche blanche", "amande", "fleur d''oranger", "poivre blanc", "craie", "brioche", "pain grillé", "noisette"]'::jsonb, '["Sashimi de bar", "Caviar", "Comté 24 mois"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe Champagne"}'::jsonb, '{"founded": 1668, "owner": "LVMH", "surface": "Achats grands crus", "terroir": "Côte des Blancs et Montagne de Reims", "soil": ["Craie à bélemnites"], "climate": "Océanique continental froid", "description": "Uniquement les grandes années. Chef de cave : Vincent Chaperon."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Salon', 'Le Mesnil', 'Champagne', 'Champagne Grand Cru', 'effervescent', '#DCC450', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 12.2, 650.0, 2020 + 5, 2020 + 30, '["citron confit", "pomme verte", "acacia", "jasmin", "craie", "silex", "iode", "pain grillé", "noisette"]'::jsonb, '["Oursin", "Bar de ligne", "Langoustine crue"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe Champagne"}'::jsonb, '{"founded": 1911, "owner": "Laurent-Perrier", "surface": "1 ha", "terroir": "Craie à bélemnites, Le Mesnil-sur-Oger", "soil": ["Craie à bélemnites"], "climate": "Océanique continental froid", "description": "Un seul vin, uniquement les grandes années. 37 millésimes depuis 1905."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Bollinger', 'La Grande Année', 'Champagne', 'Champagne', 'effervescent', '#DFBE55', '[{"n": "Pinot Noir", "p": 65}, {"n": "Chardonnay", "p": 35}]'::jsonb, 12.2, 110.0, null, 2020 + 15, '["pomme mûre", "poire", "agrumes", "fleur blanche", "gingembre", "craie", "brioche", "noisette", "pain d''épices"]'::jsonb, '["Poulet rôti", "Turbot", "Comté"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe Champagne"}'::jsonb, '{"founded": 1829, "owner": "Société Jacques Bollinger", "surface": "178 ha", "terroir": "Grands et Premiers Crus, Aÿ", "soil": ["Craie", "Calcaire", "Marne"], "climate": "Océanique continental froid", "description": "Style puissant, dominé par le Pinot Noir. Fermentation en fût de chêne."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Louis Roederer', 'Cristal', 'Champagne', 'Champagne', 'effervescent', '#E2C450', '[{"n": "Pinot Noir", "p": 60}, {"n": "Chardonnay", "p": 40}]'::jsonb, 12.2, 285.0, null, 2020 + 20, '["agrumes confits", "pêche blanche", "pomme golden", "fleur blanche", "jasmin", "craie", "brioche", "biscuit", "miel"]'::jsonb, '["Caviar", "Langoustine rôtie", "Poulet truffé"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe Champagne"}'::jsonb, '{"founded": 1833, "owner": "Famille Roederer (Frédéric Rouzaud)", "surface": "240 ha", "terroir": "Grands crus, sélection parcellaire", "soil": ["Craie", "Calcaire"], "climate": "Océanique continental froid", "description": "Créé en 1876 pour le Tsar Alexandre II. Conversion biodynamique en cours."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Zind-Humbrecht', 'Riesling Clos Windsbuhl', 'Alsace', 'Alsace Grand Cru', 'blanc', '#D9B84A', '[{"n": "Riesling", "p": 100}]'::jsonb, 13.0, 65.0, 2020 + 5, 2020 + 20, '["citron confit", "pomme verte", "poire williams", "acacia", "fleur de tilleul", "pierre à fusil", "silex"]'::jsonb, '["Sole meunière", "Huîtres Gillardeau", "Munster jeune"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Alsace tulipe"}'::jsonb, '{"founded": 1959, "owner": "Famille Humbrecht", "surface": "41 ha", "terroir": "Marno-calcaire du Muschelkalk", "soil": ["Marno-calcaire", "Muschelkalk"], "climate": "Continental, abri vosgien", "description": "Olivier Humbrecht, premier MW français. Biodynamie exemplaire."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Trimbach', 'Riesling Clos Sainte Hune', 'Alsace', 'Alsace', 'blanc', '#D5C04A', '[{"n": "Riesling", "p": 100}]'::jsonb, 12.8, 160.0, 2020 + 8, 2020 + 30, '["citron", "poire", "pêche blanche", "tilleul", "acacia", "pierre à fusil", "hydrocarbure noble", "silex"]'::jsonb, '["Sandre au beurre blanc", "Choucroute de poissons", "Comté 24 mois"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Alsace tulipe"}'::jsonb, '{"founded": 1626, "owner": "Famille Trimbach", "surface": "0,3 ha", "terroir": "Calcaire coquillier, Grand Cru Rosacker", "soil": ["Calcaire coquillier", "Muschelkalk"], "climate": "Continental, abri vosgien", "description": "L''un des plus grands Rieslings du monde. Production confidentielle."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Weinbach', 'Gewurztraminer Altenbourg SGN', 'Alsace', 'Alsace SGN', 'liquoreux', '#C8951A', '[{"n": "Gewurztraminer", "p": 100}]'::jsonb, 12.5, 120.0, 2020 + 5, 2020 + 30, '["litchi", "mangue", "fruit de la passion", "coing", "rose turque", "jasmin", "gingembre", "cannelle", "cardamome", "miel", "cire d''abeille"]'::jsonb, '["Foie gras mi-cuit", "Tarte au citron", "Munster affiné"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1612, "owner": "Famille Faller", "surface": "30 ha", "terroir": "Granit de Turkheim", "soil": ["Granit", "Gneiss"], "climate": "Continental, abri vosgien", "description": "Ancien domaine des Capucins. Pureté florale unique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Marcel Deiss', 'Altenberg de Bergheim', 'Alsace', 'Alsace Grand Cru', 'blanc', '#D8B848', '[{"n": "Riesling", "p": 40}, {"n": "Gewurztraminer", "p": 30}, {"n": "Pinot Gris", "p": 20}, {"n": "Muscat", "p": 10}]'::jsonb, 13.5, 100.0, 2020 + 5, 2020 + 25, '["agrumes confits", "coing", "abricot", "rose", "tilleul", "acacia", "épices douces", "silex", "terre rouge", "miel"]'::jsonb, '["Foie gras", "Homard breton", "Munster"]'::jsonb, '{"temp": "10-12°", "carafe": "Carafage léger", "verre": "Alsace tulipe"}'::jsonb, '{"founded": 1744, "owner": "Jean-Michel Deiss", "surface": "27 ha", "terroir": "Marno-calcaire, Altenberg", "soil": ["Marno-calcaire", "Grès", "Gypse"], "climate": "Continental, abri vosgien", "description": "Pionnier de la complantation en Alsace. Assemblage de terroir, pas de cépage."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Clos Rougeard', 'Les Poyeux', 'Loire', 'Saumur-Champigny', 'rouge', '#6D1A28', '[{"n": "Cabernet Franc", "p": 100}]'::jsonb, 13.0, 275.0, 2020 + 8, 2020 + 25, '["framboise", "cassis", "cerise", "pivoine", "poivron rôti", "poivre", "tuffeau", "graphite", "vanille fine", "toast"]'::jsonb, '["Rillons de Touraine", "Rôti de porc fermier", "Sainte-Maure-de-Touraine"]'::jsonb, '{"temp": "15-16°", "carafe": "Carafage 30 min", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1908, "owner": "Famille Bouygues", "surface": "10 ha", "terroir": "Tuffeau, caves troglodytes", "soil": ["Tuffeau", "Calcaire"], "climate": "Océanique tempéré", "description": "Domaine légendaire des frères Foucault. Élevage en caves troglodytes."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Huet', 'Le Haut-Lieu Moelleux', 'Loire', 'Vouvray', 'liquoreux', '#D4A832', '[{"n": "Chenin", "p": 100}]'::jsonb, 12.2, 48.0, 2020 + 5, 2020 + 50, '["coing", "abricot", "poire confite", "acacia", "tilleul", "gingembre", "silex", "craie", "miel", "cire"]'::jsonb, '["Tarte Tatin", "Bleu de chèvre", "Tajine aux abricots"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1928, "owner": "Famille Hwang", "surface": "35 ha", "terroir": "Argilo-siliceux sur tuffeau", "soil": ["Argilo-siliceux", "Tuffeau", "Silex"], "climate": "Océanique tempéré", "description": "Pionnier de la biodynamie en Loire. Trois parcelles mythiques."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Guiberteau', 'Le Clos des Carmes', 'Loire', 'Saumur', 'blanc', '#E8D680', '[{"n": "Chenin", "p": 100}]'::jsonb, 13.0, 58.0, 2020 + 5, 2020 + 18, '["coing", "poire", "citron", "chèvrefeuille", "aubépine", "craie", "silex"]'::jsonb, '["Brochet au beurre blanc", "Chèvre de Loire", "Volaille crémée"]'::jsonb, '{"temp": "10-12°", "carafe": "Carafage léger", "verre": "Chardonnay"}'::jsonb, '{"founded": 1920, "owner": "Romain Guiberteau", "surface": "14 ha", "terroir": "Tuffeau (craie du Turonien)", "soil": ["Tuffeau", "Craie"], "climate": "Océanique tempéré", "description": "Figure montante de la Loire. Chenins parmi les plus recherchés."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Didier Dagueneau', 'Silex', 'Loire', 'Pouilly-Fumé', 'blanc', '#D5C550', '[{"n": "Sauvignon Blanc", "p": 100}]'::jsonb, 13.5, 100.0, 2020 + 3, 2020 + 12, '["pamplemousse", "citron", "groseille à maquereau", "genêt", "buis", "silex", "pierre à fusil", "fumée", "amande grillée"]'::jsonb, '["Brochet au beurre blanc", "Crottin de Chavignol", "Asperges"]'::jsonb, '{"temp": "10-12°", "carafe": "Carafage léger", "verre": "Sauvignon"}'::jsonb, '{"founded": 1982, "owner": "Louis-Benjamin Dagueneau", "surface": "12 ha", "terroir": "Silex, argilo-calcaire", "soil": ["Silex", "Argilo-calcaire"], "climate": "Continental", "description": "Didier Dagueneau a révolutionné le Pouilly-Fumé. Exigence absolue."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Nicolas Joly', 'Coulée de Serrant', 'Loire', 'Savennières-Coulée-de-Serrant', 'blanc', '#D6B848', '[{"n": "Chenin", "p": 100}]'::jsonb, 13.5, 75.0, 2020 + 5, 2020 + 30, '["coing", "pomme", "citron confit", "tilleul", "acacia", "chèvrefeuille", "épices douces", "silex", "argile", "miel de garrigue", "cire", "miel"]'::jsonb, '["Brochet", "Turbot", "Fromages de Loire"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage 1h", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1962, "owner": "Virginie Joly", "surface": "7 ha (monopole)", "terroir": "Schistes et quartz, coteau de la Loire", "soil": ["Schistes", "Quartz", "Rhyolite"], "climate": "Océanique", "description": "Monopole mythique. Nicolas Joly, pionnier mondial de la biodynamie."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Tempier', 'La Migoua', 'Provence', 'Bandol', 'rouge', '#6B1A25', '[{"n": "Mourvèdre", "p": 55}, {"n": "Grenache", "p": 25}, {"n": "Cinsault", "p": 15}, {"n": "Syrah", "p": 5}]'::jsonb, 14.0, 50.0, 2020 + 5, 2020 + 20, '["cerise noire", "prune", "mûre sauvage", "poivre noir", "thym", "laurier", "garrigue", "olive noire", "cuir", "sous-bois"]'::jsonb, '["Daube provençale", "Gigot d''agneau", "Cassoulet"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1834, "owner": "Famille Peyraud", "surface": "38 ha", "terroir": "Restanques calcaires", "soil": ["Calcaire", "Argile", "Grès"], "climate": "Méditerranéen", "description": "Icône de Bandol. La famille Peyraud a sauvé l''appellation."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaines Ott', 'Clos Mireille', 'Provence', 'Côtes de Provence', 'rosé', '#F2B8A2', '[{"n": "Grenache", "p": 50}, {"n": "Cinsault", "p": 30}, {"n": "Syrah", "p": 20}]'::jsonb, 13.0, 38.0, null, 2020 + 3, '["pamplemousse rose", "pêche de vigne", "fraise", "rose", "fleur de cerisier"]'::jsonb, '["Bouillabaisse", "Salade niçoise", "Brandade de morue"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe"}'::jsonb, '{"founded": 1896, "owner": "Famille Ott (Roederer)", "surface": "45 ha", "terroir": "Schistes et quartzites, bord de mer", "soil": ["Schistes", "Quartzites"], "climate": "Méditerranéen maritime", "description": "Référence du rosé de Provence. Clos Mireille, pieds dans l''eau."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de Trévallon', '', 'Provence', 'IGP Alpilles', 'rouge', '#5E1222', '[{"n": "Cabernet Sauvignon", "p": 50}, {"n": "Syrah", "p": 50}]'::jsonb, 14.0, 75.0, 2020 + 5, 2020 + 20, '["cassis", "mûre", "olive noire", "violette", "lavande", "poivre", "thym", "romarin", "garrigue", "pierre calcaire", "cèdre", "réglisse"]'::jsonb, '["Taureau des Alpilles", "Pieds paquets", "Tomme de brebis"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux"}'::jsonb, '{"founded": 1973, "owner": "Antoine Dürrbach", "surface": "17 ha", "terroir": "Calcaire urgonien, piémont des Alpilles", "soil": ["Calcaire urgonien", "Éboulis"], "climate": "Méditerranéen, mistral", "description": "Domaine mythique des Alpilles. Assemblage Cabernet-Syrah unique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Grange des Pères', '', 'Languedoc', 'IGP Hérault', 'rouge', '#5C1020', '[{"n": "Syrah", "p": 40}, {"n": "Mourvèdre", "p": 35}, {"n": "Cabernet Sauvignon", "p": 15}, {"n": "Counoise", "p": 10}]'::jsonb, 14.5, 120.0, 2020 + 5, 2020 + 20, '["mûre", "cassis", "olive noire", "violette", "lavande", "poivre", "thym", "réglisse", "garrigue", "pierre chaude", "cèdre", "chocolat noir"]'::jsonb, '["Taureau de Camargue", "Agneau des garrigues", "Pélardon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1992, "owner": "Laurent Vaillé", "surface": "13 ha", "terroir": "Calcaire lacustre, terrasses de l''Hérault", "soil": ["Calcaire lacustre", "Galets"], "climate": "Méditerranéen", "description": "Le plus grand vin du Languedoc. Laurent Vaillé, génie discret."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Gauby', 'Muntada', 'Languedoc', 'IGP Côtes Catalanes', 'rouge', '#5A1220', '[{"n": "Syrah", "p": 50}, {"n": "Grenache", "p": 30}, {"n": "Carignan", "p": 10}, {"n": "Mourvèdre", "p": 10}]'::jsonb, 14.5, 75.0, 2020 + 5, 2020 + 15, '["cerise noire", "mûre", "myrtille", "violette", "poivre", "romarin", "schiste", "terre humide", "cacao", "épices douces"]'::jsonb, '["Boles de picolat", "Cargolade", "Brebis des Pyrénées"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1985, "owner": "Gérard et Lionel Gauby", "surface": "45 ha", "terroir": "Schistes noirs de Calce, 350m", "soil": ["Schistes noirs", "Calcaire"], "climate": "Méditerranéen montagnard", "description": "Référence du Roussillon sur les schistes de Calce."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Mas de Daumas Gassac', '', 'Languedoc', 'IGP Haute Vallée du Gassac', 'rouge', '#5A1020', '[{"n": "Cabernet Sauvignon", "p": 80}, {"n": "Autres cépages", "p": 20}]'::jsonb, 13.8, 40.0, 2020 + 5, 2020 + 20, '["cassis", "mûre", "cerise", "violette", "lavande", "cèdre", "poivre", "garrigue", "terre volcanique", "vanille", "toast"]'::jsonb, '["Gigot d''agneau", "Bœuf braisé", "Pélardon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1978, "owner": "Famille Guibert de La Vaissière", "surface": "40 ha", "terroir": "Sols volcaniques glaciaires uniques", "soil": ["Grézeux glaciaire", "Basalte"], "climate": "Méditerranéen d''altitude", "description": "Surnommé le « Lafite du Languedoc ». Sols glaciaires uniques étudiés par le géologue Henri Enjalbert."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Overnoy-Houillon', 'Arbois Pupillin', 'Jura', 'Arbois Pupillin', 'rouge', '#8B3040', '[{"n": "Poulsard", "p": 100}]'::jsonb, 12.0, 200.0, 2020 + 2, 2020 + 10, '["cerise", "fraise des bois", "groseille", "rose sauvage", "poivre rose", "sous-bois", "champignon"]'::jsonb, '["Poulet au vin jaune", "Morilles", "Comté 18 mois"]'::jsonb, '{"temp": "14-15°", "carafe": "Servir direct", "verre": "Bourgogne"}'::jsonb, '{"founded": 1960, "owner": "Emmanuel Houillon", "surface": "5 ha", "terroir": "Marnes du Trias, Pupillin", "soil": ["Marnes du Trias", "Argile rouge"], "climate": "Continental montagnard", "description": "Pierre Overnoy est le père du vin nature. Ni soufre, ni levure, ni filtration."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Jean-François Ganevat', 'Les Chalasses Vieilles Vignes', 'Jura', 'Côtes du Jura', 'blanc', '#D8C050', '[{"n": "Chardonnay", "p": 100}]'::jsonb, 13.0, 82.0, 2020 + 3, 2020 + 12, '["pomme golden", "citron", "noisette fraîche", "fleur blanche", "curry", "pierre chaude", "craie", "beurre", "pain grillé"]'::jsonb, '["Truite du Jura", "Raclette au lait cru", "Morbier"]'::jsonb, '{"temp": "11-13°", "carafe": "Carafage léger", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1998, "owner": "Jean-François Ganevat", "surface": "10 ha", "terroir": "Marnes bleues du Lias", "soil": ["Marnes bleues", "Lias"], "climate": "Continental montagnard", "description": "« Fanfan » a révolutionné les vins jurassiens."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Montus', 'Prestige', 'Sud-Ouest', 'Madiran', 'rouge', '#420C14', '[{"n": "Tannat", "p": 80}, {"n": "Cabernet Sauvignon", "p": 20}]'::jsonb, 14.5, 45.0, 2020 + 5, 2020 + 20, '["mûre", "myrtille", "prune", "poivre", "réglisse", "terre", "encre", "chêne toasté", "vanille", "café"]'::jsonb, '["Confit de canard", "Magret séché", "Ossau-Iraty"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1980, "owner": "Alain Brumont", "surface": "120 ha", "terroir": "Argilo-siliceux, piémont pyrénéen", "soil": ["Argilo-siliceux", "Galets roulés"], "climate": "Océanique montagnard", "description": "Alain Brumont a ressuscité le Tannat."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Clos Triguedina', 'Probus', 'Sud-Ouest', 'Cahors', 'rouge', '#3D0B12', '[{"n": "Malbec", "p": 100}]'::jsonb, 14.0, 32.0, 2020 + 5, 2020 + 18, '["cassis", "prune noire", "cerise griotte", "violette", "poivre", "réglisse", "truffe", "sous-bois", "vanille", "torréfaction"]'::jsonb, '["Cassoulet", "Confit de canard", "Rocamadour"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1830, "owner": "Jean-Luc Baldès", "surface": "60 ha", "terroir": "Argilo-calcaire, terrasse du Lot", "soil": ["Argilo-calcaire", "Kimméridgien"], "climate": "Océanique continental", "description": "Renaissance du Malbec de Cahors. Cuvée nommée d''après l''empereur romain."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Marcel Lapierre', 'Morgon', 'Beaujolais', 'Morgon', 'rouge', '#8A2535', '[{"n": "Gamay", "p": 100}]'::jsonb, 12.5, 27.0, 2020 + 1, 2020 + 8, '["cerise", "framboise", "groseille", "pivoine", "iris", "poivre", "granit", "terre"]'::jsonb, '["Charcuterie lyonnaise", "Poulet rôti", "Saint-Marcellin"]'::jsonb, '{"temp": "13-14°", "carafe": "Servir direct", "verre": "Bourgogne"}'::jsonb, '{"founded": 1973, "owner": "Mathieu & Camille Lapierre", "surface": "14 ha", "terroir": "Granit rose, côte du Py", "soil": ["Granit rose", "Arène granitique"], "climate": "Continental", "description": "Père fondateur du vin nature. Gamay sans soufre, macération carbonique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Jean Foillard', 'Morgon Côte du Py', 'Beaujolais', 'Morgon', 'rouge', '#882535', '[{"n": "Gamay", "p": 100}]'::jsonb, 13.0, 28.0, 2020 + 2, 2020 + 10, '["cerise noire", "mûre", "framboise", "pivoine", "poivre", "épices douces", "granit", "pierre chaude", "cuir fin"]'::jsonb, '["Andouillette", "Quenelle de brochet", "Reblochon"]'::jsonb, '{"temp": "14-15°", "carafe": "Servir direct", "verre": "Bourgogne"}'::jsonb, '{"founded": 1980, "owner": "Jean Foillard", "surface": "13 ha", "terroir": "Granit bleu, côte du Py", "soil": ["Granit bleu", "Schiste"], "climate": "Continental", "description": "Gang of Four du Beaujolais nature avec Lapierre, Breton et Thévenet."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Clos Canarelli', 'Amphora', 'Corse', 'Corse Figari', 'rouge', '#721C2A', '[{"n": "Nielluccio", "p": 50}, {"n": "Sciaccarellu", "p": 50}]'::jsonb, 13.5, 55.0, 2020 + 2, 2020 + 10, '["cerise", "fraise", "grenade", "maquis en fleur", "poivre", "myrte", "granit", "terre sèche"]'::jsonb, '["Veau corse aux olives", "Figatellu", "Brocciu"]'::jsonb, '{"temp": "15-16°", "carafe": "Carafage léger", "verre": "Bourgogne"}'::jsonb, '{"founded": 1993, "owner": "Yves Canarelli", "surface": "20 ha", "terroir": "Granit et arène granitique, Figari", "soil": ["Granit", "Arène granitique"], "climate": "Méditerranéen insulaire", "description": "Chef de file du renouveau corse. Cépages endémiques, amphore."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine des Ardoisières', 'Quartz', 'Savoie', 'IGP Vin des Allobroges', 'blanc', '#DAC55A', '[{"n": "Jacquère", "p": 70}, {"n": "Roussanne", "p": 30}]'::jsonb, 12.5, 32.0, 2020 + 2, 2020 + 8, '["citron", "pomme verte", "poire", "fleur blanche", "aubépine", "silex", "ardoise"]'::jsonb, '["Fondue savoyarde", "Féra du Léman", "Beaufort d''été"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Chablis"}'::jsonb, '{"founded": 1998, "owner": "Brice Omont", "surface": "7 ha", "terroir": "Schistes et ardoises, 500-700m", "soil": ["Schistes", "Ardoises"], "climate": "Continental montagnard", "description": "Vignoble vertigineux en terrasses dans la Combe de Savoie."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Tenuta San Guido', 'Sassicaia', 'Italie', 'Bolgheri Sassicaia DOC', 'rouge', '#520F1C', '[{"n": "Cabernet Sauvignon", "p": 85}, {"n": "Cabernet Franc", "p": 15}]'::jsonb, 13.8, 265.0, 2020 + 8, 2020 + 30, '["cassis", "cerise noire", "mûre", "violette", "cèdre", "menthol", "réglisse", "graphite", "terre toscane", "vanille", "tabac", "café"]'::jsonb, '["Bistecca alla fiorentina", "Agneau rôti", "Pecorino toscano"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1968, "owner": "Famille Incisa della Rocchetta", "surface": "75 ha", "terroir": "Cailloux et calcaire, Bolgheri", "soil": ["Cailloux", "Calcaire", "Argile"], "climate": "Méditerranéen maritime", "description": "Le premier « Super Toscan ». Le marquis Mario Incisa s''inspira du Médoc bordelais."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Marchesi Antinori', 'Tignanello', 'Italie', 'Toscana IGT', 'rouge', '#581020', '[{"n": "Sangiovese", "p": 80}, {"n": "Cabernet Sauvignon", "p": 15}, {"n": "Cabernet Franc", "p": 5}]'::jsonb, 13.8, 100.0, 2020 + 5, 2020 + 18, '["cerise", "prune", "mûre", "violette", "iris", "épices douces", "réglisse", "terre", "sous-bois", "vanille", "cacao", "tabac"]'::jsonb, '["Pappardelle al ragù", "Bistecca", "Parmigiano Reggiano"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1385, "owner": "Famille Antinori", "surface": "57 ha (Tignanello)", "terroir": "Calcaire et galestro, Chianti Classico", "soil": ["Galestro", "Calcaire", "Argile"], "climate": "Méditerranéen", "description": "Premier Super Toscan à assembler Sangiovese et Cabernet (1971). Vinifié sans bois blanc."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Giacomo Conterno', 'Barolo Monfortino Riserva', 'Italie', 'Barolo DOCG', 'rouge', '#6B1828', '[{"n": "Nebbiolo", "p": 100}]'::jsonb, 14.5, 1150.0, 2020 + 15, 2020 + 40, '["cerise griotte", "framboise séchée", "prune", "rose fanée", "violette séchée", "réglisse", "cannelle", "clou de girofle", "truffe", "goudron", "terre", "cuir", "tabac", "cèdre"]'::jsonb, '["Tajarin al tartufo", "Brasato al Barolo", "Parmigiano 48 mois"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1908, "owner": "Roberto Conterno", "surface": "14 ha", "terroir": "Marnes calcaires, Serralunga d''Alba", "soil": ["Marnes calcaires", "Argile"], "climate": "Continental", "description": "Le plus grand Barolo traditionnel. Élevage en grande botte de chêne de Slavonie, uniquement les grandes années."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Angelo Gaja', 'Barbaresco', 'Italie', 'Barbaresco DOCG', 'rouge', '#681828', '[{"n": "Nebbiolo", "p": 100}]'::jsonb, 14.2, 275.0, 2020 + 8, 2020 + 25, '["cerise", "framboise", "fraise", "rose", "violette", "cannelle", "réglisse", "poivre", "truffe", "goudron", "champignon", "vanille", "chêne neuf"]'::jsonb, '["Vitello tonnato", "Bollito misto", "Toma piemontese"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1859, "owner": "Angelo Gaja", "surface": "25 ha", "terroir": "Marnes calcaires, Barbaresco", "soil": ["Marnes calcaires", "Argile"], "climate": "Continental", "description": "Angelo Gaja a révolutionné le Piémont. Introduction du barrique français, vinification moderne."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Vega Sicilia', 'Único', 'Espagne', 'Ribera del Duero DO', 'rouge', '#500E18', '[{"n": "Tempranillo", "p": 80}, {"n": "Cabernet Sauvignon", "p": 20}]'::jsonb, 14.0, 475.0, 2020 + 10, 2020 + 30, '["cerise noire", "mûre", "prune confite", "violette", "poivre", "réglisse", "clou de girofle", "terre", "cuir", "fumée", "vanille", "cèdre", "tabac"]'::jsonb, '["Cochinillo asado", "Agneau de Castille", "Manchego affiné"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1864, "owner": "Famille Álvarez (Grupo Tempos Vega Sicilia)", "surface": "210 ha", "terroir": "Calcaire et argile, altitude 700-800m", "soil": ["Calcaire", "Argile", "Sable"], "climate": "Continental extrême", "description": "Le plus grand vin d''Espagne. Élevage de 10 ans avant commercialisation."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Bodegas Pingus', 'Pingus', 'Espagne', 'Ribera del Duero DO', 'rouge', '#4E0E1A', '[{"n": "Tempranillo", "p": 100}]'::jsonb, 15.0, 1150.0, 2020 + 8, 2020 + 25, '["cerise noire", "mûre", "cassis", "violette", "réglisse", "poivre", "chocolat", "terre", "minerai", "vanille", "café torréfié", "cèdre"]'::jsonb, '["Côte de bœuf maturée", "Cochon de lait", "Idiazábal fumé"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1995, "owner": "Peter Sisseck", "surface": "5 ha", "terroir": "Vieilles vignes, altitude 800m", "soil": ["Calcaire", "Sable", "Argile"], "climate": "Continental extrême", "description": "Vin de garagiste devenu culte. Peter Sisseck, danois installé en Espagne."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Quinta do Noval', 'Nacional', 'Portugal', 'Porto Vintage', 'muté', '#3A0A10', '[{"n": "Touriga Nacional", "p": 100}]'::jsonb, 20.5, 750.0, 2020 + 20, 2020 + 80, '["figue", "cerise confite", "prune", "rose", "violette", "poivre", "cannelle", "chocolat", "terre", "minerai", "café", "vanille", "caramel"]'::jsonb, '["Chocolat noir", "Stilton", "Noix"]'::jsonb, '{"temp": "16-18°", "carafe": "Carafage 2h", "verre": "Porto"}'::jsonb, '{"founded": 1715, "owner": "AXA Millésimes", "surface": "2,5 ha (non greffé)", "terroir": "Schistes, vignes non greffées", "soil": ["Schistes"], "climate": "Continental méditerranéen", "description": "L''un des rares vignobles non greffés au monde. Porto vintage d''exception."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Egon Müller', 'Scharzhofberger Riesling Spätlese', 'Allemagne', 'Mosel', 'blanc', '#D8C44A', '[{"n": "Riesling", "p": 100}]'::jsonb, 8.5, 225.0, 2020 + 5, 2020 + 30, '["pêche blanche", "abricot", "pomme verte", "fleur d''oranger", "tilleul", "ardoise", "silex", "fumée"]'::jsonb, '["Cuisine asiatique épicée", "Homard", "Fromage de chèvre frais"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Riesling"}'::jsonb, '{"founded": 1797, "owner": "Egon Müller IV", "surface": "12 ha", "terroir": "Ardoise bleue, Scharzhofberg", "soil": ["Ardoise bleue"], "climate": "Continental froid", "description": "Le plus grand Riesling de Moselle. Vendanges tardives légendaires."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Opus One', '', 'USA', 'Napa Valley', 'rouge', '#520F1B', '[{"n": "Cabernet Sauvignon", "p": 79}, {"n": "Merlot", "p": 7}, {"n": "Cabernet Franc", "p": 7}, {"n": "Petit Verdot", "p": 5}, {"n": "Malbec", "p": 2}]'::jsonb, 14.8, 500.0, 2020 + 5, 2020 + 20, '["cassis", "mûre", "cerise noire", "violette", "réglisse", "cèdre", "vanille", "terre", "chêne neuf", "café", "chocolat"]'::jsonb, '["Côte de bœuf", "Filet mignon", "Cheddar vieilli"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1979, "owner": "Constellation Brands & Famille Rothschild", "surface": "60 ha", "terroir": "Alluvions profondes, Oakville", "soil": ["Alluvions", "Argile", "Graviers"], "climate": "Méditerranéen", "description": "Joint-venture entre Baron Philippe de Rothschild et Robert Mondavi."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Ridge Vineyards', 'Monte Bello', 'USA', 'Santa Cruz Mountains', 'rouge', '#550F1C', '[{"n": "Cabernet Sauvignon", "p": 77}, {"n": "Merlot", "p": 12}, {"n": "Petit Verdot", "p": 8}, {"n": "Cabernet Franc", "p": 3}]'::jsonb, 14.0, 275.0, 2020 + 8, 2020 + 25, '["cassis", "cerise noire", "mûre", "violette", "cèdre", "menthol", "réglisse", "graphite", "terre", "minerai", "chêne américain", "vanille"]'::jsonb, '["Agneau grillé", "Bœuf braisé", "Gouda vieilli"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1885, "owner": "Otsuka Holdings", "surface": "25 ha", "terroir": "Calcaire, altitude 700m", "soil": ["Calcaire", "Argile", "Gravier"], "climate": "Méditerranéen d''altitude", "description": "Paul Draper a créé l''un des plus grands Cabernets américains. Vainqueur du Jugement de Paris 2006."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Catena Zapata', 'Adrianna Vineyard Mundus Bacillus Terrae', 'Argentine', 'Mendoza', 'rouge', '#520E1A', '[{"n": "Malbec", "p": 100}]'::jsonb, 14.5, 275.0, 2020 + 5, 2020 + 20, '["cassis", "mûre", "cerise noire", "prune", "violette", "poivre noir", "réglisse", "terre", "minerai", "graphite", "cèdre", "vanille fine"]'::jsonb, '["Bœuf argentin", "Empanadas", "Provolone fumé"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1902, "owner": "Famille Catena Zapata", "surface": "5 ha (Adrianna)", "terroir": "Altitude 1500m, sols calcaires", "soil": ["Calcaire", "Argile", "Sable"], "climate": "Continental d''altitude", "description": "Le vignoble le plus haut de Mendoza. Laura Catena pousse le Malbec vers la haute précision."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Penfolds', 'Grange', 'Australie', 'South Australia', 'rouge', '#4E0E18', '[{"n": "Shiraz", "p": 96}, {"n": "Cabernet Sauvignon", "p": 4}]'::jsonb, 14.8, 750.0, 2020 + 10, 2020 + 30, '["cassis", "mûre", "prune confite", "poivre noir", "réglisse", "chocolat", "terre", "encre", "vanille", "café torréfié", "chêne américain"]'::jsonb, '["Bœuf braisé", "Agneau épicé", "Cheddar vieilli"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1844, "owner": "Treasury Wine Estates", "surface": "Multi-parcelles", "terroir": "Assemblage de régions d''Australie méridionale", "soil": ["Terra rossa", "Argile", "Calcaire"], "climate": "Méditerranéen", "description": "Le plus grand vin australien. Créé en 1951 par Max Schubert, inspiré par Bordeaux."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Musar', '', 'Liban', 'Bekaa Valley', 'rouge', '#601824', '[{"n": "Cabernet Sauvignon", "p": 40}, {"n": "Cinsault", "p": 30}, {"n": "Carignan", "p": 30}]'::jsonb, 14.0, 40.0, 2020 + 5, 2020 + 20, '["cerise confite", "figue", "prune", "rose fanée", "épices orientales", "cannelle", "cardamome", "cuir", "terre", "encens", "cèdre", "vanille"]'::jsonb, '["Mezzé libanais", "Agneau épicé", "Fromage de brebis"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux"}'::jsonb, '{"founded": 1930, "owner": "Famille Hochar", "surface": "180 ha", "terroir": "Calcaire, altitude 1000m, Bekaa", "soil": ["Calcaire", "Argile rouge"], "climate": "Méditerranéen d''altitude", "description": "Le plus célèbre vin du Liban. Serge Hochar a vinifié pendant la guerre civile."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Klein Constantia', 'Vin de Constance', 'Afrique du Sud', 'Constantia', 'liquoreux', '#D0901A', '[{"n": "Muscat de Frontignan", "p": 100}]'::jsonb, 14.2, 80.0, 2020 + 5, 2020 + 30, '["abricot", "mangue", "pêche confite", "coing", "fleur d''oranger", "jasmin", "rose", "cannelle", "gingembre", "miel", "cire", "caramel"]'::jsonb, '["Foie gras", "Desserts aux fruits", "Bleu de chèvre"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1685, "owner": "Zdenik Bakala & Charles Harman", "surface": "146 ha", "terroir": "Granit décomposé, Constantia", "soil": ["Granit", "Sable"], "climate": "Méditerranéen maritime", "description": "Vin légendaire, favori de Napoléon. Récréé en 1990 après un siècle d''interruption."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Concha y Toro', 'Don Melchor', 'Chili', 'Puente Alto', 'rouge', '#520F1C', '[{"n": "Cabernet Sauvignon", "p": 96}, {"n": "Cabernet Franc", "p": 3}, {"n": "Merlot", "p": 1}]'::jsonb, 14.2, 75.0, 2020 + 5, 2020 + 18, '["cassis", "mûre", "cerise noire", "violette", "poivre", "menthol", "cèdre", "graphite", "terre", "vanille", "café", "chocolat"]'::jsonb, '["Bœuf grillé", "Empanadas", "Fromage de montagne"]'::jsonb, '{"temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL"}'::jsonb, '{"founded": 1883, "owner": "Concha y Toro", "surface": "127 ha (Puente Alto)", "terroir": "Alluvions, piémont andin", "soil": ["Alluvions", "Calcaire", "Argile"], "climate": "Méditerranéen d''altitude", "description": "Le grand vin chilien. Vignoble d''altitude face à la cordillère des Andes."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Cloudy Bay', 'Sauvignon Blanc', 'Nouvelle-Zélande', 'Marlborough', 'blanc', '#D5C24A', '[{"n": "Sauvignon Blanc", "p": 100}]'::jsonb, 13.2, 22.0, null, 2020 + 3, '["fruit de la passion", "pamplemousse", "groseille à maquereau", "sureau", "silex"]'::jsonb, '["Saumon fumé", "Chèvre frais", "Salade de crustacés"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Sauvignon"}'::jsonb, '{"founded": 1985, "owner": "LVMH", "surface": "230 ha", "terroir": "Alluvions et graviers, Wairau Valley", "soil": ["Alluvions", "Graviers", "Argile"], "climate": "Maritime frais", "description": "A fait connaître le Sauvignon de Marlborough au monde entier."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Ogereau', 'Coteaux du Layon Saint Lambert', 'Loire', 'Coteaux du Layon', 'liquoreux', '#D4A530', '[{"n": "Chenin", "p": 100}]'::jsonb, 12.0, 20.0, 2020 + 3, 2020 + 30, '["coing", "abricot", "poire confite", "acacia", "miel", "gingembre", "ardoise", "miel", "cire"]'::jsonb, '["Foie gras", "Tarte aux poires", "Fourme d''Ambert"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe étroite"}'::jsonb, '{"founded": 1964, "owner": "Emmanuel Ogereau", "surface": "22 ha", "terroir": "Schistes carbonifères, Saint-Lambert", "soil": ["Schistes", "Carbonifère"], "climate": "Océanique tempéré", "description": "Vignerons indépendants de référence en Anjou. Liquoreux et Cab Franc d''anthologie."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Mas del Périé', 'Les Pièces Longues', 'Sud-Ouest', 'Cahors', 'blanc', '#D8C44A', '[{"n": "Chenin", "p": 100}]'::jsonb, 13.2, 18.0, 2020 + 2, 2020 + 8, '["coing", "poire", "citron", "fleur blanche", "silex"]'::jsonb, '["Truite", "Fromage de chèvre", "Salade composée"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Chardonnay"}'::jsonb, '{"founded": 2006, "owner": "Fabien Jouves", "surface": "30 ha", "terroir": "Argilo-calcaire, Cahors", "soil": ["Argilo-calcaire"], "climate": "Océanique continental", "description": "Pépite des salons. Chenin à Cahors ! Vinifie aussi en amphores un vin orange exceptionnel."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Cave du Prieuré', 'Marestel Tradition', 'Savoie', 'Roussette de Savoie Marestel', 'blanc', '#D5C04A', '[{"n": "Altesse", "p": 100}]'::jsonb, 12.5, 15.0, 2020 + 2, 2020 + 8, '["poire", "pomme", "citron", "aubépine", "acacia", "silex", "caillou"]'::jsonb, '["Féra du lac du Bourget", "Fondue", "Beaufort"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Chablis"}'::jsonb, '{"founded": 1962, "owner": "Famille Barlet", "surface": "10 ha", "terroir": "Coteau de Jongieux, 30-70% pente, lac du Bourget", "soil": ["Calcaire", "Éboulis"], "climate": "Continental lacustre", "description": "Appellation Marestel confidentielle. Cépage Altesse ramené de Chypre au XVIe siècle."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Souché', 'Melon de Bourgogne', 'Loire', 'Muscadet Côtes de Grandlieu', 'blanc', '#D5C84A', '[{"n": "Melon de Bourgogne", "p": 100}]'::jsonb, 12.2, 10.0, 2020 + 1, 2020 + 5, '["citron", "pomme verte", "poire", "fleur blanche", "coquillage", "iode"]'::jsonb, '["Huîtres", "Moules marinières", "Sardines grillées"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Sauvignon"}'::jsonb, '{"founded": 1975, "owner": "Famille Petiteau", "surface": "25 ha", "terroir": "Entre mer et lac de Grandlieu, salinité", "soil": ["Gneiss", "Schistes"], "climate": "Océanique", "description": "Muscadet Côtes de Grandlieu avec touche de salinité. Rapport qualité-prix imbattable."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Belles-Graves', '', 'Bordeaux', 'Lalande-de-Pomerol', 'rouge', '#5E1222', '[{"n": "Merlot", "p": 80}, {"n": "Cabernet Franc", "p": 20}]'::jsonb, 13.8, 18.0, 2020 + 3, 2020 + 12, '["cerise noire", "prune", "mûre", "violette", "poivre", "réglisse", "terre", "sous-bois", "vanille douce"]'::jsonb, '["Confit de canard", "Entrecôte", "Tomme de brebis"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 30 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1985, "owner": "Xavier Piton", "surface": "18 ha", "terroir": "Graves et crasses de fer, Néac", "soil": ["Graves", "Crasse de fer", "Argile"], "climate": "Océanique continental", "description": "Habitué des salons. Lalande-de-Pomerol accessible et gourmand."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Janasse', 'Chaupin', 'Rhône', 'Châteauneuf-du-Pape', 'rouge', '#621822', '[{"n": "Grenache", "p": 100}]'::jsonb, 15.5, 75.0, 2020 + 5, 2020 + 18, '["fraise confite", "cerise", "framboise", "lavande", "poivre", "thym", "garrigue", "terre chaude", "réglisse"]'::jsonb, '["Gigot d''agneau", "Daube", "Banon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bourgogne ballon"}'::jsonb, '{"founded": 1973, "owner": "Famille Sabon", "surface": "90 ha", "terroir": "Galets roulés, sable, safres", "soil": ["Galets roulés", "Sable", "Safres"], "climate": "Méditerranéen", "description": "Christophe Sabon produit des Châteauneuf concentrés et gourmands. Habitué des récompenses."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Saint-Préfert', 'Réserve Auguste Favier', 'Rhône', 'Châteauneuf-du-Pape', 'rouge', '#601520', '[{"n": "Grenache", "p": 60}, {"n": "Mourvèdre", "p": 20}, {"n": "Syrah", "p": 10}, {"n": "Cinsault", "p": 10}]'::jsonb, 15.2, 55.0, 2020 + 5, 2020 + 15, '["cerise noire", "mûre", "figue", "violette", "poivre", "thym", "réglisse", "garrigue", "terre", "cuir", "cacao"]'::jsonb, '["Agneau confit", "Taureau", "Pélardon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1970, "owner": "Isabel Ferrando", "surface": "15 ha", "terroir": "Galets roulés, sols rouges", "soil": ["Galets roulés", "Argile rouge"], "climate": "Méditerranéen", "description": "Isabel Ferrando a hissé le domaine parmi les meilleurs de l''appellation."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Alain Voge', 'Les Vieilles Vignes', 'Rhône', 'Cornas', 'rouge', '#580F1C', '[{"n": "Syrah", "p": 100}]'::jsonb, 13.5, 45.0, 2020 + 5, 2020 + 18, '["cassis", "mûre", "olive noire", "violette", "poivre", "réglisse", "graphite", "terre", "cuir", "fumée"]'::jsonb, '["Bœuf braisé", "Saucisson", "Saint-Nectaire"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Syrah"}'::jsonb, '{"founded": 1958, "owner": "Albéric Mazoyer (gérant)", "surface": "10 ha", "terroir": "Granit décomposé, terrasses", "soil": ["Granit", "Arène granitique"], "climate": "Continental méditerranéen", "description": "Référence de Cornas. Vieilles vignes de 60+ ans sur granit."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Zind-Humbrecht', 'Pinot Gris Clos Jebsal VT', 'Alsace', 'Alsace Vendange Tardive', 'liquoreux', '#C89520', '[{"n": "Pinot Gris", "p": 100}]'::jsonb, 13.5, 52.0, 2020 + 5, 2020 + 25, '["coing", "abricot", "mirabelle", "rose", "acacia", "épices douces", "miel", "silex", "cire"]'::jsonb, '["Foie gras", "Munster", "Tarte aux mirabelles"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Alsace tulipe"}'::jsonb, '{"founded": 1959, "owner": "Famille Humbrecht", "surface": "41 ha", "terroir": "Marnes gypsifères, Clos Jebsal", "soil": ["Marnes", "Gypse"], "climate": "Continental, abri vosgien", "description": "Le Clos Jebsal est un monopole sur marnes gypsifères. Vendanges tardives d''exception."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Josmeyer', 'Riesling Le Kottabe', 'Alsace', 'Alsace', 'blanc', '#D8C248', '[{"n": "Riesling", "p": 100}]'::jsonb, 12.5, 18.0, 2020 + 2, 2020 + 8, '["citron", "pomme verte", "pêche", "tilleul", "sureau", "silex"]'::jsonb, '["Choucroute garnie", "Sandre", "Munster jeune"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Alsace tulipe"}'::jsonb, '{"founded": 1854, "owner": "Famille Meyer", "surface": "27 ha", "terroir": "Argilo-calcaire, Wintzenheim", "soil": ["Argilo-calcaire"], "climate": "Continental, abri vosgien", "description": "Domaine historique de Wintzenheim. Rieslings secs et tendus, style gastronomique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Albert Mann', 'Pinot Noir Grand H', 'Alsace', 'Alsace', 'rouge', '#781C2A', '[{"n": "Pinot Noir", "p": 100}]'::jsonb, 13.2, 32.0, 2020 + 3, 2020 + 10, '["cerise", "framboise", "fraise", "rose", "pivoine", "poivre", "épices douces", "terre", "sous-bois", "vanille fine"]'::jsonb, '["Baeckeoffe", "Gibier", "Munster affiné"]'::jsonb, '{"temp": "14-15°", "carafe": "Carafage léger", "verre": "Bourgogne"}'::jsonb, '{"founded": 1654, "owner": "Famille Barthelmé", "surface": "21 ha", "terroir": "Granit, Grand Cru Hengst", "soil": ["Granit", "Calcaire"], "climate": "Continental", "description": "Pinot Noir de classe bourguignonne en Alsace. Biodynamie depuis 2000."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Bunan', 'Moulin des Costes', 'Provence', 'Bandol', 'rouge', '#691822', '[{"n": "Mourvèdre", "p": 65}, {"n": "Grenache", "p": 20}, {"n": "Syrah", "p": 15}]'::jsonb, 14.0, 23.0, 2020 + 4, 2020 + 15, '["cerise noire", "mûre", "prune", "poivre", "thym", "laurier", "garrigue", "terre chaude", "cuir", "sous-bois"]'::jsonb, '["Bouillabaisse", "Pieds paquets", "Brousse du Rove"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 30 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1961, "owner": "Famille Bunan", "surface": "85 ha", "terroir": "Restanques argilo-calcaires, Le Castellet", "soil": ["Argilo-calcaire", "Calcaire"], "climate": "Méditerranéen", "description": "Deux domaines en Bandol. Moulin des Costes est le plus accessible. Habitué des salons."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Mordorée', 'La Dame Rousse', 'Rhône', 'Tavel', 'rosé', '#E8A088', '[{"n": "Grenache", "p": 60}, {"n": "Cinsault", "p": 15}, {"n": "Mourvèdre", "p": 10}, {"n": "Syrah", "p": 10}, {"n": "Clairette", "p": 5}]'::jsonb, 14.2, 17.0, 2020 + 1, 2020 + 4, '["fraise", "groseille", "pêche de vigne", "rose", "poivre rose", "garrigue"]'::jsonb, '["Cuisine asiatique", "Paella", "Ratatouille"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Tulipe"}'::jsonb, '{"founded": 1986, "owner": "Famille Delorme", "surface": "60 ha", "terroir": "Galets roulés, sables, Tavel", "soil": ["Galets roulés", "Sable", "Argile"], "climate": "Méditerranéen", "description": "Tavel est la seule AOC exclusivement rosé en France. La Mordorée en est la référence."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château de Pibarnon', '', 'Provence', 'Bandol', 'rouge', '#681822', '[{"n": "Mourvèdre", "p": 90}, {"n": "Grenache", "p": 10}]'::jsonb, 14.0, 38.0, 2020 + 5, 2020 + 20, '["cerise noire", "mûre sauvage", "olive", "poivre", "thym", "romarin", "garrigue", "terre sèche", "pierre", "cuir", "réglisse"]'::jsonb, '["Daube provençale", "Pieds paquets", "Fromage de chèvre sec"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 1h", "verre": "Bordeaux"}'::jsonb, '{"founded": 1978, "owner": "Famille de Saint-Victor", "surface": "50 ha", "terroir": "Calcaire du Trias, altitude 300m", "soil": ["Calcaire du Trias", "Argile"], "climate": "Méditerranéen d''altitude", "description": "Le plus haut vignoble de Bandol. 90% Mourvèdre, terroir calcaire unique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine du Vissoux', 'Les Griottes', 'Beaujolais', 'Fleurie', 'rouge', '#882838', '[{"n": "Gamay", "p": 100}]'::jsonb, 12.8, 20.0, 2020 + 1, 2020 + 6, '["cerise griotte", "framboise", "fraise", "rose", "iris", "poivre rose", "granit"]'::jsonb, '["Charcuterie", "Blanquette de veau", "Saint-Félicien"]'::jsonb, '{"temp": "13-14°", "carafe": "Servir direct", "verre": "Bourgogne"}'::jsonb, '{"founded": 1975, "owner": "Pierre-Marie Chermette", "surface": "32 ha", "terroir": "Granit rose, Fleurie", "soil": ["Granit rose", "Arène"], "climate": "Continental", "description": "Fleurie de référence. Bio certifié, vinifications parcellaires."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Ilarria', '', 'Sud-Ouest', 'Irouléguy', 'rouge', '#621822', '[{"n": "Tannat", "p": 50}, {"n": "Cabernet Franc", "p": 30}, {"n": "Cabernet Sauvignon", "p": 20}]'::jsonb, 13.8, 20.0, 2020 + 3, 2020 + 12, '["cerise noire", "mûre", "prune", "poivre", "piment d''Espelette", "terre", "sous-bois", "cuir"]'::jsonb, '["Axoa de veau", "Piperade", "Ossau-Iraty"]'::jsonb, '{"temp": "15-16°", "carafe": "Carafage 30 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1988, "owner": "Peio Espil", "surface": "10 ha", "terroir": "Grès triasique, terrasses escarpées", "soil": ["Grès triasique", "Schiste"], "climate": "Océanique montagnard", "description": "Vignoble héroïque basque. Terrasses vertigineuses face aux Pyrénées."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Combier', 'Clos des Grives', 'Rhône', 'Crozes-Hermitage', 'rouge', '#5A1020', '[{"n": "Syrah", "p": 100}]'::jsonb, 13.5, 32.0, 2020 + 5, 2020 + 15, '["cassis", "mûre", "myrtille", "violette", "poivre", "olive", "graphite", "réglisse", "cacao"]'::jsonb, '["Bœuf braisé", "Pigeon", "Saint-Marcellin"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Syrah"}'::jsonb, '{"founded": 1970, "owner": "Laurent Combier", "surface": "25 ha", "terroir": "Galets roulés et loess, Pont-de-l''Isère", "soil": ["Galets roulés", "Loess"], "climate": "Continental méditerranéen", "description": "Bio pionnier en Crozes. Le Clos des Grives est une parcelle d''exception."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de Villeneuve', 'Les Vieilles Vignes', 'Rhône', 'Châteauneuf-du-Pape', 'rouge', '#601822', '[{"n": "Grenache", "p": 65}, {"n": "Mourvèdre", "p": 20}, {"n": "Syrah", "p": 10}, {"n": "Cinsault", "p": 5}]'::jsonb, 15.0, 34.0, 2020 + 5, 2020 + 15, '["cerise confite", "framboise", "mûre", "lavande", "poivre", "thym", "romarin", "garrigue", "terre chaude", "réglisse"]'::jsonb, '["Daube", "Gigot", "Picodon"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Bordeaux"}'::jsonb, '{"founded": 1994, "owner": "Stanislas Wallut", "surface": "10 ha", "terroir": "Galets roulés, sables et safres", "soil": ["Galets roulés", "Sable"], "climate": "Méditerranéen", "description": "Petit domaine bio, vinification en grappes entières. Châteauneuf abordable et authentique."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château Tour des Gendres', 'Cuvée des Conti', 'Sud-Ouest', 'Bergerac', 'blanc', '#D5C248', '[{"n": "Sémillon", "p": 50}, {"n": "Sauvignon Blanc", "p": 30}, {"n": "Muscadelle", "p": 20}]'::jsonb, 12.8, 12.0, 2020 + 1, 2020 + 4, '["pamplemousse", "pêche", "abricot", "fleur de sureau", "acacia", "silex"]'::jsonb, '["Salade de chèvre", "Poisson grillé", "Apéritif"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Sauvignon"}'::jsonb, '{"founded": 1925, "owner": "Famille de Conti", "surface": "50 ha", "terroir": "Argilo-calcaire, coteaux de Bergerac", "soil": ["Argilo-calcaire"], "climate": "Océanique continental", "description": "Référence du Bergerac en bio. La Cuvée des Conti est un best-seller des salons."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Berthet-Bondet', 'Côtes du Jura Tradition', 'Jura', 'Côtes du Jura', 'blanc', '#D4B840', '[{"n": "Chardonnay", "p": 60}, {"n": "Savagnin", "p": 40}]'::jsonb, 12.8, 15.0, 2020 + 3, 2020 + 12, '["pomme", "noix fraîche", "citron", "fleur blanche", "curry", "noix de muscade", "pierre", "noisette", "beurre"]'::jsonb, '["Comté 18 mois", "Poulet au vin jaune", "Morilles"]'::jsonb, '{"temp": "12-14°", "carafe": "Servir direct", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1985, "owner": "Jean Berthet-Bondet", "surface": "15 ha", "terroir": "Marnes grises du Lias, Château-Chalon", "soil": ["Marnes grises", "Lias"], "climate": "Continental montagnard", "description": "Producteur respecté de Château-Chalon. La cuvée Tradition mêle Chardonnay et Savagnin ouillé."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Château d''Oupia', 'Les Hérétiques', 'Languedoc', 'Minervois', 'rouge', '#601822', '[{"n": "Carignan", "p": 50}, {"n": "Grenache", "p": 30}, {"n": "Syrah", "p": 20}]'::jsonb, 13.8, 10.0, 2020 + 2, 2020 + 8, '["cerise", "mûre", "prune", "poivre", "thym", "laurier", "garrigue", "terre sèche", "réglisse"]'::jsonb, '["Cassoulet", "Grillades", "Pélardon"]'::jsonb, '{"temp": "15-16°", "carafe": "Servir direct", "verre": "Bordeaux"}'::jsonb, '{"founded": 1860, "owner": "André Iché", "surface": "30 ha", "terroir": "Argilo-calcaire, garrigue", "soil": ["Argilo-calcaire", "Grès"], "climate": "Méditerranéen", "description": "Vieux Carignan sur garrigue. Rapport qualité-prix légendaire des salons."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de Fontsainte', 'Gris de Gris', 'Languedoc', 'Corbières', 'rosé', '#F0B098', '[{"n": "Grenache Gris", "p": 60}, {"n": "Grenache Noir", "p": 40}]'::jsonb, 12.8, 10.0, null, 2020 + 2, '["pamplemousse", "pêche", "fraise", "rose"]'::jsonb, '["Salade méditerranéenne", "Poisson grillé", "Apéritif"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Tulipe"}'::jsonb, '{"founded": 1971, "owner": "Yves Laboucarie", "surface": "40 ha", "terroir": "Argilo-calcaire, Boutenac", "soil": ["Argilo-calcaire", "Grès"], "climate": "Méditerranéen", "description": "Le Gris de Gris est un rosé de pressurage direct iconique des Corbières."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Henry Pellé', 'Menetou-Salon Morogues', 'Loire', 'Menetou-Salon', 'blanc', '#D5C44A', '[{"n": "Sauvignon Blanc", "p": 100}]'::jsonb, 12.8, 15.0, 2020 + 1, 2020 + 5, '["pamplemousse", "citron", "groseille", "genêt", "buis", "silex", "fumée"]'::jsonb, '["Crottin de Chavignol", "Poisson de Loire", "Asperges"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Sauvignon"}'::jsonb, '{"founded": 1950, "owner": "Anne Pellé", "surface": "41 ha", "terroir": "Calcaires kimméridgiens, Morogues", "soil": ["Kimméridgien", "Calcaire"], "climate": "Continental", "description": "Alternative qualitative à Sancerre, souvent à moitié prix. Sols kimméridgiens identiques."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine du Clos des Fées', 'Grenache Blanc Vieilles Vignes', 'Languedoc', 'Côtes du Roussillon', 'blanc', '#D8C240', '[{"n": "Grenache Blanc", "p": 70}, {"n": "Grenache Gris", "p": 30}]'::jsonb, 14.5, 32.0, 2020 + 3, 2020 + 10, '["poire", "abricot", "amande", "fleur de garrigue", "anis", "schiste", "garrigue", "miel", "cire"]'::jsonb, '["Bouillabaisse", "Langoustines", "Brebis des Pyrénées"]'::jsonb, '{"temp": "12-14°", "carafe": "Carafage léger", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1998, "owner": "Hervé Bizeul", "surface": "30 ha", "terroir": "Schistes noirs et gneiss, Vingrau", "soil": ["Schistes noirs", "Gneiss"], "climate": "Méditerranéen", "description": "Hervé Bizeul, ancien sommelier, a créé un domaine de référence en Roussillon."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Stéphane Ogier', 'La Belle Hélène', 'Rhône', 'Côte-Rôtie', 'rouge', '#5A1120', '[{"n": "Syrah", "p": 92}, {"n": "Viognier", "p": 8}]'::jsonb, 13.5, 65.0, 2020 + 5, 2020 + 15, '["cassis", "mûre", "myrtille", "violette", "iris", "poivre", "olive noire", "graphite", "fumée", "réglisse", "cacao"]'::jsonb, '["Pigeon rôti", "Gibier", "Saint-Marcellin"]'::jsonb, '{"temp": "16-17°", "carafe": "Carafage 45 min", "verre": "Syrah"}'::jsonb, '{"founded": 1997, "owner": "Stéphane Ogier", "surface": "8 ha", "terroir": "Schistes et gneiss, Côte-Rôtie", "soil": ["Schistes", "Gneiss"], "climate": "Continental méditerranéen", "description": "Nouvelle génération brillante de la Côte-Rôtie. Finesse et précision."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine de la Pépière', 'Muscadet Clisson', 'Loire', 'Muscadet Sèvre et Maine Clisson', 'blanc', '#D5C640', '[{"n": "Melon de Bourgogne", "p": 100}]'::jsonb, 12.2, 15.0, 2020 + 3, 2020 + 10, '["citron", "pomme verte", "poire", "aubépine", "granit", "iode"]'::jsonb, '["Huîtres", "Poissons grillés", "Fromage de chèvre"]'::jsonb, '{"temp": "8-10°", "carafe": "Servir direct", "verre": "Sauvignon"}'::jsonb, '{"founded": 1970, "owner": "Marc Ollivier et Rémi Branger", "surface": "30 ha", "terroir": "Granit et gabbro, Clisson", "soil": ["Granit", "Gabbro"], "climate": "Océanique", "description": "Muscadet cru communal Clisson. Élevage long sur lies sur sols de granit. La renaissance du Muscadet."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine François Chidaine', 'Montlouis-sur-Loire Les Choisilles', 'Loire', 'Montlouis-sur-Loire', 'blanc', '#D8C650', '[{"n": "Chenin", "p": 100}]'::jsonb, 13.0, 18.0, 2020 + 3, 2020 + 15, '["coing", "poire", "citron confit", "acacia", "tilleul", "silex", "tuffeau"]'::jsonb, '["Poisson de Loire", "Rillettes de Tours", "Sainte-Maure"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Chardonnay"}'::jsonb, '{"founded": 1989, "owner": "François Chidaine", "surface": "40 ha", "terroir": "Silex et tuffeau, Montlouis", "soil": ["Silex", "Tuffeau", "Argile à silex"], "climate": "Océanique tempéré", "description": "Montlouis, face à Vouvray. François Chidaine est l''artisan de la renaissance de l''appellation."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;

INSERT INTO wine_catalog (name, cuvee, region, appellation, color, robe, cepages, typical_alcohol, typical_price, peak_from, peak_to, aromas, pairings, service, estate)
VALUES ('Domaine Patrick Baudouin', 'Anjou Les Bruandières', 'Loire', 'Anjou', 'blanc', '#D6C44A', '[{"n": "Chenin", "p": 100}]'::jsonb, 13.5, 17.0, 2020 + 3, 2020 + 12, '["coing", "poire", "pomme golden", "acacia", "aubépine", "schiste", "ardoise", "miel"]'::jsonb, '["Poisson grillé", "Chèvre de Loire", "Volaille rôtie"]'::jsonb, '{"temp": "10-12°", "carafe": "Servir direct", "verre": "Bourgogne blanc"}'::jsonb, '{"founded": 1990, "owner": "Patrick Baudouin", "surface": "12 ha", "terroir": "Schistes et grès du Carbonifère", "soil": ["Schistes", "Grès"], "climate": "Océanique tempéré", "description": "Vigneron passionné, défenseur du Chenin sec d''Anjou. Bio depuis les origines."}'::jsonb)
ON CONFLICT (name, cuvee, region) DO UPDATE SET
  appellation = EXCLUDED.appellation, color = EXCLUDED.color, robe = EXCLUDED.robe,
  cepages = EXCLUDED.cepages, typical_alcohol = EXCLUDED.typical_alcohol, typical_price = EXCLUDED.typical_price,
  peak_from = EXCLUDED.peak_from, peak_to = EXCLUDED.peak_to, aromas = EXCLUDED.aromas,
  pairings = EXCLUDED.pairings, service = EXCLUDED.service, estate = EXCLUDED.estate;
