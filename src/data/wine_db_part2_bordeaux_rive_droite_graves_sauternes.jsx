// ═══════════════════════════════════════════════════════════════════════════════
//  EXTENSION — BORDEAUX RIVE DROITE + GRAVES + LIQUOREUX
//  Lot 2/7 · 60 vins · IDs ref-160 → ref-219
//  Saint-Émilion (22) · Pomerol (12) · Fronsac/Castillon (6)
//  Pessac-Léognan (12) · Sauternes/Barsac (8)
//  Classement Saint-Émilion 2022 · Classement Graves 1959 · Classement Sauternes 1855
//  À merger : window.WINE_DATABASE = [...WINE_DATABASE, ...WINE_DATABASE_PART2];
// ═══════════════════════════════════════════════════════════════════════════════

const WINE_DATABASE_PART2 = [

  // ─── SAINT-ÉMILION ────────────────────────────────────────────────────────
  {
    "id": "ref-160",
    "name": "Château Cheval Blanc",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC A (ex)",
    "color": "rouge",
    "robe": "#5A1024",
    "cepages": [
      { "name": "Cabernet Franc", "pct": 52 },
      { "name": "Merlot", "pct": 45 },
      { "name": "Cabernet Sauvignon", "pct": 3 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "600-1200",
    "aromas": {
      "fruit": ["cassis", "framboise", "cerise noire"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre", "poivre blanc"],
      "earthy": ["graphite", "truffe"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 80, "Épicé": 75, "Terreux": 72, "Boisé": 72, "Végétal": 30, "Minéral": 70, "Empyreumatique": 55 },
    "pairings": ["Pigeonneau", "Caneton aux cerises", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 50 },
    "labels": [],
    "estate": {
      "founded": 1832,
      "owner": "LVMH (Arnault) et famille Frère",
      "surface": "39 ha",
      "terroir": "Plateau à la limite Pomerol, graviers et argile bleue",
      "soil": ["Graviers", "Argile", "Sables"],
      "climate": "Océanique tempéré",
      "description": "Proportion historique de Cabernet Franc unique en Saint-Émilion. Chai gravitaire signé Christian de Portzamparc. A quitté le classement 2022."
    },
    "vintages": {
      "2022": { "score": 99, "notes": "Monument." },
      "2020": { "score": 98, "notes": "Majestueux." },
      "2019": { "score": 98, "notes": "Historique." },
      "2018": { "score": 98, "notes": "Vibrant." },
      "2016": { "score": 99, "notes": "Sommet." },
      "2010": { "score": 99, "notes": "Légendaire." }
    },
    "tags": ["Culte", "Saint-Émilion", "Cabernet Franc", "Garde longue"]
  },
  {
    "id": "ref-161",
    "name": "Château Ausone",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC A (ex)",
    "color": "rouge",
    "robe": "#5A0F1E",
    "cepages": [
      { "name": "Cabernet Franc", "pct": 55 },
      { "name": "Merlot", "pct": 45 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "800-1500",
    "aromas": {
      "fruit": ["cassis", "cerise noire", "mûre"],
      "floral": ["violette", "pivoine"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "pierre chaude"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 70, "Épicé": 75, "Terreux": 70, "Boisé": 70, "Végétal": 30, "Minéral": 88, "Empyreumatique": 60 },
    "pairings": ["Pigeonneau", "Lièvre à la royale", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 15, "to": 60 },
    "labels": ["Biodynamie"],
    "estate": {
      "founded": 0,
      "owner": "Famille Vauthier (Alain, Pauline)",
      "surface": "7 ha",
      "terroir": "Amphithéâtre calcaire exceptionnel au-dessus de Saint-Émilion",
      "soil": ["Calcaire à astéries", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Sur les pas du poète romain Ausone (IVe siècle). Terroir minéral unique, prétendu origine romaine. A quitté le classement 2022."
    },
    "vintages": {
      "2020": { "score": 98, "notes": "Minéralité sidérale." },
      "2019": { "score": 98, "notes": "Grandissime." },
      "2018": { "score": 97, "notes": "Pur et vertical." },
      "2016": { "score": 99, "notes": "Légendaire." }
    },
    "tags": ["Culte", "Saint-Émilion", "Minéralité", "Garde longue"]
  },
  {
    "id": "ref-162",
    "name": "Château Figeac",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC A (2022)",
    "color": "rouge",
    "robe": "#590F1E",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 35 },
      { "name": "Cabernet Franc", "pct": 35 },
      { "name": "Merlot", "pct": 30 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "250-500",
    "aromas": {
      "fruit": ["cassis", "cerise", "framboise"],
      "floral": ["violette", "iris"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 72, "Épicé": 75, "Terreux": 70, "Boisé": 72, "Végétal": 35, "Minéral": 68, "Empyreumatique": 55 },
    "pairings": ["Gibier à plumes", "Agneau", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 45 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1832,
      "owner": "Famille Manoncourt",
      "surface": "54 ha",
      "terroir": "Trois croupes de graves günziennes (style Médoc atypique en SE)",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Exceptionnel en Saint-Émilion avec 70% de Cabernets. Promu 1er GCC A en 2022. Directeur : Frédéric Faye."
    },
    "vintages": {
      "2022": { "score": 98, "notes": "Promotion couronnée." },
      "2020": { "score": 97, "notes": "Grand Figeac." },
      "2019": { "score": 97, "notes": "Monumental." },
      "2018": { "score": 97, "notes": "Pur." },
      "2016": { "score": 98, "notes": "Légendaire." }
    },
    "tags": ["1er GCC A", "Saint-Émilion", "Culte"]
  },
  {
    "id": "ref-163",
    "name": "Château Pavie",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC A (2022)",
    "color": "rouge",
    "robe": "#560F1E",
    "cepages": [
      { "name": "Merlot", "pct": 60 },
      { "name": "Cabernet Franc", "pct": 25 },
      { "name": "Cabernet Sauvignon", "pct": 15 }
    ],
    "alcoholRange": "14-15",
    "priceRange": "200-450",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune confite"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices douces"],
      "earthy": ["truffe", "cacao"],
      "wood": ["chocolat noir", "moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 65, "Épicé": 78, "Terreux": 72, "Boisé": 80, "Végétal": 30, "Minéral": 75, "Empyreumatique": 70 },
    "pairings": ["Gibier", "Côte de bœuf", "Chocolat noir"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1885,
      "owner": "Gérard Perse",
      "surface": "37 ha",
      "terroir": "Versant sud de la Côte Pavie, calcaire à astéries",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Gérard Perse a racheté en 1998. Style opulent, solaire. Promu 1er GCC A en 2012, maintenu en 2022."
    },
    "vintages": {
      "2022": { "score": 98, "notes": "Intense." },
      "2020": { "score": 97, "notes": "Monument." },
      "2019": { "score": 97, "notes": "Historique." },
      "2018": { "score": 98, "notes": "Somptueux." }
    },
    "tags": ["1er GCC A", "Saint-Émilion", "Opulence"]
  },
  {
    "id": "ref-164",
    "name": "Château Angélus",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC A (ex)",
    "color": "rouge",
    "robe": "#591020",
    "cepages": [
      { "name": "Merlot", "pct": 60 },
      { "name": "Cabernet Franc", "pct": 40 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "300-550",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise noire"],
      "floral": ["violette"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["graphite", "truffe"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 70, "Épicé": 75, "Terreux": 70, "Boisé": 78, "Végétal": 32, "Minéral": 70, "Empyreumatique": 65 },
    "pairings": ["Agneau de 7h", "Magret", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1920,
      "owner": "Famille de Boüard de Laforest",
      "surface": "39 ha",
      "terroir": "Pied-de-côte sud, amphithéâtre calcaire",
      "soil": ["Argile", "Calcaire", "Sable"],
      "climate": "Océanique tempéré",
      "description": "Stéphanie de Boüard-Rivoal. Trois cloches sur l'étiquette. A quitté le classement 2022 pour redéfinir sa stratégie."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Magistral." },
      "2019": { "score": 97, "notes": "Sommet." },
      "2018": { "score": 96, "notes": "Pur." },
      "2016": { "score": 98, "notes": "Légendaire." }
    },
    "tags": ["Culte", "Saint-Émilion", "Cabernet Franc"]
  },
  {
    "id": "ref-165",
    "name": "Château Canon",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#5A0F20",
    "cepages": [
      { "name": "Merlot", "pct": 70 },
      { "name": "Cabernet Franc", "pct": 30 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "130-250",
    "aromas": {
      "fruit": ["cerise", "framboise", "mûre"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "pierre calcaire"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 78, "Épicé": 65, "Terreux": 62, "Boisé": 62, "Végétal": 35, "Minéral": 82, "Empyreumatique": 50 },
    "pairings": ["Pigeonneau", "Agneau", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1760,
      "owner": "Maison Chanel (Wertheimer)",
      "surface": "34 ha",
      "terroir": "Plateau calcaire de Saint-Émilion",
      "soil": ["Calcaire à astéries", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Chanel depuis 1996. Direction : Nicolas Audebert. Renaissance éblouissante. Finesse et minéralité remarquables."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Grand Canon." },
      "2019": { "score": 97, "notes": "Sommet." },
      "2018": { "score": 96, "notes": "Précis." },
      "2016": { "score": 98, "notes": "Mythique." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Chanel", "Minéralité"]
  },
  {
    "id": "ref-166",
    "name": "Château Canon La Gaffelière",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Merlot", "pct": 55 },
      { "name": "Cabernet Franc", "pct": 40 },
      { "name": "Cabernet Sauvignon", "pct": 5 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "80-140",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 87, "Floral": 72, "Épicé": 70, "Terreux": 65, "Boisé": 65, "Végétal": 35, "Minéral": 70, "Empyreumatique": 50 },
    "pairings": ["Canard", "Magret", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["Biodynamie"],
    "estate": {
      "founded": 1861,
      "owner": "Comte Stephan von Neipperg",
      "surface": "20 ha",
      "terroir": "Pied de côte sud, argile sur roche-mère calcaire",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Stephan von Neipperg (également La Mondotte, Aiguilhe). Biodynamie. Proportion élevée de Cabernet Franc."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Biodynamie racée." },
      "2019": { "score": 96, "notes": "Grandeur." },
      "2018": { "score": 95, "notes": "Précis." }
    },
    "tags": ["1er GCC B", "Biodynamie", "Saint-Émilion"]
  },
  {
    "id": "ref-167",
    "name": "Château Clos Fourtet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#591020",
    "cepages": [
      { "name": "Merlot", "pct": 85 },
      { "name": "Cabernet Sauvignon", "pct": 10 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "80-140",
    "aromas": {
      "fruit": ["cerise", "prune", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "truffe"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 65, "Épicé": 65, "Terreux": 70, "Boisé": 65, "Végétal": 35, "Minéral": 75, "Empyreumatique": 50 },
    "pairings": ["Magret", "Canard", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1500,
      "owner": "Famille Cuvelier (Philippe Cuvelier)",
      "surface": "20 ha",
      "terroir": "Plateau calcaire en face du village",
      "soil": ["Calcaire à astéries", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Philippe Cuvelier a racheté en 2001. Consultant historique : Stéphane Derenoncourt. Caves médiévales sous le vignoble."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grand Clos Fourtet." },
      "2019": { "score": 96, "notes": "Précis." },
      "2018": { "score": 95, "notes": "Charmeur." }
    },
    "tags": ["1er GCC B", "Saint-Émilion"]
  },
  {
    "id": "ref-168",
    "name": "Château Troplong Mondot",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580E1D",
    "cepages": [
      { "name": "Merlot", "pct": 85 },
      { "name": "Cabernet Sauvignon", "pct": 10 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "14-15",
    "priceRange": "90-160",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["truffe"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 65, "Épicé": 75, "Terreux": 72, "Boisé": 75, "Végétal": 30, "Minéral": 72, "Empyreumatique": 60 },
    "pairings": ["Gibier", "Côte de bœuf", "Fourme d'Ambert"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1745,
      "owner": "SCOR",
      "surface": "33 ha",
      "terroir": "Plateau culminant de Saint-Émilion (110m)",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Racheté par SCOR en 2017. Aymeric de Gironde directeur (ex-Cos d'Estournel). Style raffiné, moins opulent depuis 2018."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Nouvelle finesse." },
      "2019": { "score": 96, "notes": "Sublime." },
      "2018": { "score": 96, "notes": "Transition réussie." }
    },
    "tags": ["1er GCC B", "Saint-Émilion"]
  },
  {
    "id": "ref-169",
    "name": "Château Pavie Macquin",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580F1F",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 18 },
      { "name": "Cabernet Sauvignon", "pct": 2 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "70-130",
    "aromas": {
      "fruit": ["cerise noire", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 65, "Épicé": 72, "Terreux": 68, "Boisé": 68, "Végétal": 35, "Minéral": 75, "Empyreumatique": 55 },
    "pairings": ["Canard", "Magret", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": [],
    "estate": {
      "founded": 1887,
      "owner": "Famille Corre-Macquin",
      "surface": "15 ha",
      "terroir": "Plateau calcaire, parcelle voisine de Troplong Mondot",
      "soil": ["Calcaire à astéries"],
      "climate": "Océanique tempéré",
      "description": "Nicolas Thienpont directeur. Style structuré, garde longue. Précurseur viticulture raisonnée en Saint-Émilion."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Structure noble." },
      "2019": { "score": 95, "notes": "Grande classe." },
      "2018": { "score": 94, "notes": "Précis." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Garde longue"]
  },
  {
    "id": "ref-170",
    "name": "Château Larcis Ducasse",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Merlot", "pct": 78 },
      { "name": "Cabernet Franc", "pct": 22 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "70-130",
    "aromas": {
      "fruit": ["cerise noire", "mûre"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "truffe"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 87, "Floral": 72, "Épicé": 68, "Terreux": 70, "Boisé": 65, "Végétal": 32, "Minéral": 80, "Empyreumatique": 52 },
    "pairings": ["Pigeonneau", "Magret", "Cantal vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1893,
      "owner": "Famille Attmann-Gratiot",
      "surface": "12 ha",
      "terroir": "Côte sud, mitoyen de Pavie, exposition idéale",
      "soil": ["Calcaire à astéries", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Nicolas Thienpont + David Suire. Spectaculaire montée en puissance depuis 2000. Un des plus beaux terroirs de SE."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Sublime." },
      "2019": { "score": 96, "notes": "Grandiose." },
      "2018": { "score": 95, "notes": "Pur." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Minéralité"]
  },
  {
    "id": "ref-171",
    "name": "Château Beauséjour Duffau-Lagarrosse",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#5A0F1E",
    "cepages": [
      { "name": "Merlot", "pct": 70 },
      { "name": "Cabernet Franc", "pct": 25 },
      { "name": "Cabernet Sauvignon", "pct": 5 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "120-220",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 68, "Épicé": 72, "Terreux": 70, "Boisé": 70, "Végétal": 32, "Minéral": 75, "Empyreumatique": 55 },
    "pairings": ["Gibier", "Agneau", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": [],
    "estate": {
      "founded": 1847,
      "owner": "Joséphine Duffau-Lagarrosse et famille",
      "surface": "7 ha",
      "terroir": "Plateau calcaire ouest, parcelle unique",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Ancienne propriété familiale, vendue en 2021 à la famille Cuvelier (Clos Fourtet). Nicolas Thienpont consultant."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Précision classique." },
      "2019": { "score": 96, "notes": "Grande classe." },
      "2018": { "score": 95, "notes": "Harmonieux." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Rare"]
  },
  {
    "id": "ref-172",
    "name": "Château Beau-Séjour Bécot",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      { "name": "Merlot", "pct": 70 },
      { "name": "Cabernet Franc", "pct": 24 },
      { "name": "Cabernet Sauvignon", "pct": 6 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "60-110",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 65, "Épicé": 65, "Terreux": 65, "Boisé": 65, "Végétal": 35, "Minéral": 75, "Empyreumatique": 50 },
    "pairings": ["Canard", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1787,
      "owner": "Famille Bécot",
      "surface": "23 ha",
      "terroir": "Plateau calcaire ouest",
      "soil": ["Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Julien et Juliette Bécot, quatrième génération. Galeries calcaires sous les vignes utilisées pour l'élevage."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Très beau." },
      "2019": { "score": 95, "notes": "Grand Bécot." },
      "2018": { "score": 94, "notes": "Précis." }
    },
    "tags": ["1er GCC B", "Saint-Émilion"]
  },
  {
    "id": "ref-173",
    "name": "Château Bélair-Monange",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Merlot", "pct": 90 },
      { "name": "Cabernet Franc", "pct": 10 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "130-230",
    "aromas": {
      "fruit": ["cerise", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["truffe", "graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 70, "Épicé": 70, "Terreux": 75, "Boisé": 70, "Végétal": 30, "Minéral": 85, "Empyreumatique": 55 },
    "pairings": ["Gibier", "Agneau", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 0,
      "owner": "Établissements Jean-Pierre Moueix",
      "surface": "24 ha",
      "terroir": "Plateau voisin d'Ausone, amphithéâtre calcaire",
      "soil": ["Calcaire à astéries"],
      "climate": "Océanique tempéré",
      "description": "Moueix (Pomerol). Fusion de Bélair et Magdelaine en 2008. Terroir de très haut niveau."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Minéralité ensorcelante." },
      "2019": { "score": 96, "notes": "Sommet." },
      "2018": { "score": 95, "notes": "Pur." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Moueix"]
  },
  {
    "id": "ref-174",
    "name": "Château La Gaffelière",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#590F1F",
    "cepages": [
      { "name": "Merlot", "pct": 75 },
      { "name": "Cabernet Franc", "pct": 25 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "70-130",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 70, "Épicé": 68, "Terreux": 65, "Boisé": 62, "Végétal": 35, "Minéral": 72, "Empyreumatique": 50 },
    "pairings": ["Canard", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 0,
      "owner": "Famille de Malet Roquefort",
      "surface": "22 ha",
      "terroir": "Pied-de-côte sud",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Propriété familiale depuis 1705 — 14 générations. Nouveau chai par Christophe Ouvrard inauguré en 2020."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Renaissance." },
      "2019": { "score": 95, "notes": "Grand Gaffelière." },
      "2018": { "score": 94, "notes": "Précis." }
    },
    "tags": ["1er GCC B", "Saint-Émilion"]
  },
  {
    "id": "ref-175",
    "name": "Château La Mondotte",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#560E1C",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "180-300",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["truffe", "graphite"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 70, "Épicé": 78, "Terreux": 75, "Boisé": 75, "Végétal": 30, "Minéral": 78, "Empyreumatique": 60 },
    "pairings": ["Gibier", "Côte de bœuf", "Fourme"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": ["Biodynamie"],
    "estate": {
      "founded": 0,
      "owner": "Comte Stephan von Neipperg",
      "surface": "4.5 ha",
      "terroir": "Plateau calcaire, micro-parcelle",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Micro-cuvée mythique, la 'Bourgogne' de Saint-Émilion. Promue 1er GCC B en 2012. Biodynamie."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Concentration et précision." },
      "2019": { "score": 97, "notes": "Mythique." },
      "2018": { "score": 96, "notes": "Dense." }
    },
    "tags": ["1er GCC B", "Culte", "Micro-cuvée", "Biodynamie"]
  },
  {
    "id": "ref-176",
    "name": "Château Valandraud",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Merlot", "pct": 65 },
      { "name": "Cabernet Franc", "pct": 25 },
      { "name": "Cabernet Sauvignon", "pct": 10 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "150-280",
    "aromas": {
      "fruit": ["cerise", "mûre", "prune confite"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices"],
      "earthy": ["graphite", "cacao"],
      "wood": ["vanille", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 65, "Épicé": 75, "Terreux": 70, "Boisé": 80, "Végétal": 30, "Minéral": 65, "Empyreumatique": 65 },
    "pairings": ["Gibier", "Magret", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": [],
    "estate": {
      "founded": 1989,
      "owner": "Jean-Luc Thunevin",
      "surface": "10 ha",
      "terroir": "Plusieurs parcelles (Saint-Étienne-de-Lisse, Saint-Christophe)",
      "soil": ["Argile", "Calcaire", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Le 'garagiste' historique. Jean-Luc Thunevin a inventé le mouvement dans les années 1990. Promu 1er GCC B en 2012."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Équilibre retrouvé." },
      "2019": { "score": 96, "notes": "Grand Valandraud." },
      "2018": { "score": 95, "notes": "Opulent." }
    },
    "tags": ["1er GCC B", "Garagiste", "Saint-Émilion"]
  },
  {
    "id": "ref-177",
    "name": "Château Trotte Vieille",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "1er GCC B (2022)",
    "color": "rouge",
    "robe": "#590F1F",
    "cepages": [
      { "name": "Merlot", "pct": 50 },
      { "name": "Cabernet Franc", "pct": 45 },
      { "name": "Cabernet Sauvignon", "pct": 5 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "60-110",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 72, "Épicé": 65, "Terreux": 65, "Boisé": 62, "Végétal": 35, "Minéral": 75, "Empyreumatique": 48 },
    "pairings": ["Pigeonneau", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1869,
      "owner": "Famille Castéja (Borie-Manoux)",
      "surface": "10 ha",
      "terroir": "Plateau calcaire est",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Propriété Borie-Manoux. Forte proportion de Cabernet Franc rare à ce rang. Style élégant."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Élégant." },
      "2019": { "score": 94, "notes": "Précis." },
      "2018": { "score": 93, "notes": "Bon." }
    },
    "tags": ["1er GCC B", "Saint-Émilion", "Cabernet Franc"]
  },
  {
    "id": "ref-178",
    "name": "Château Tertre Rôteboeuf",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#580E1D",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "200-400",
    "aromas": {
      "fruit": ["cerise noire", "mûre confiturée", "prune"],
      "floral": ["violette", "pivoine"],
      "spicy": ["cèdre", "épices douces"],
      "earthy": ["truffe", "cuir"],
      "wood": ["cacao", "moka", "tabac blond"]
    },
    "aromaWheel": { "Fruit": 95, "Floral": 80, "Épicé": 78, "Terreux": 78, "Boisé": 72, "Végétal": 30, "Minéral": 72, "Empyreumatique": 65 },
    "pairings": ["Gibier à plumes", "Côte de bœuf", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1978,
      "owner": "François Mitjavile",
      "surface": "6 ha",
      "terroir": "Versant sud de Saint-Laurent-des-Combes, microclimat unique",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "François Mitjavile, philosophe du vin. Refuse le classement. Vendanges tardives. Vin mythique, introuvable."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Signature Mitjavile." },
      "2019": { "score": 97, "notes": "Sublime." },
      "2018": { "score": 96, "notes": "Opulence." }
    },
    "tags": ["Culte", "Mythique", "Saint-Émilion", "Hors classement"]
  },
  {
    "id": "ref-179",
    "name": "Château Fleur Cardinale",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "Grand Cru Classé (2022)",
    "color": "rouge",
    "robe": "#5A1021",
    "cepages": [
      { "name": "Merlot", "pct": 75 },
      { "name": "Cabernet Franc", "pct": 15 },
      { "name": "Cabernet Sauvignon", "pct": 10 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 62, "Épicé": 65, "Terreux": 62, "Boisé": 62, "Végétal": 38, "Minéral": 65, "Empyreumatique": 50 },
    "pairings": ["Magret", "Rôti", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1957,
      "owner": "Famille Decoster",
      "surface": "23 ha",
      "terroir": "Saint-Étienne-de-Lisse, plateau argilo-calcaire",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Famille Decoster. Excellent rapport qualité-prix parmi les Grands Crus Classés."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Gourmand." },
      "2019": { "score": 93, "notes": "Précis." },
      "2018": { "score": 92, "notes": "Harmonieux." }
    },
    "tags": ["Grand Cru Classé", "Rapport qualité-prix", "Saint-Émilion"]
  },
  {
    "id": "ref-180",
    "name": "Château La Dominique",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "Grand Cru Classé (2022)",
    "color": "rouge",
    "robe": "#5B1121",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 18 },
      { "name": "Cabernet Sauvignon", "pct": 2 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["cerise", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 62, "Épicé": 65, "Terreux": 62, "Boisé": 65, "Végétal": 38, "Minéral": 68, "Empyreumatique": 50 },
    "pairings": ["Canard", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": [],
    "estate": {
      "founded": 1650,
      "owner": "Clément Fayat",
      "surface": "29 ha",
      "terroir": "Voisin direct de Cheval Blanc et La Conseillante",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Terroir voisin de Cheval Blanc. Château rouge iconique signé Jean Nouvel inauguré en 2014."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Charmeur." },
      "2019": { "score": 94, "notes": "Grand La Dominique." },
      "2018": { "score": 93, "notes": "Souple." }
    },
    "tags": ["Grand Cru Classé", "Saint-Émilion"]
  },
  {
    "id": "ref-181",
    "name": "Château Soutard",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion Grand Cru",
    "classification": "Grand Cru Classé (2022)",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      { "name": "Merlot", "pct": 70 },
      { "name": "Cabernet Franc", "pct": 25 },
      { "name": "Cabernet Sauvignon", "pct": 3 },
      { "name": "Malbec", "pct": 2 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 83, "Floral": 65, "Épicé": 65, "Terreux": 65, "Boisé": 58, "Végétal": 38, "Minéral": 72, "Empyreumatique": 48 },
    "pairings": ["Magret", "Canard", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1513,
      "owner": "La Mondiale",
      "surface": "30 ha",
      "terroir": "Plateau calcaire au nord-est du village",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Un des plus anciens châteaux de Saint-Émilion. Château XVIIIe élégant. Style classique et précis."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Précis." },
      "2019": { "score": 93, "notes": "Grand Soutard." },
      "2018": { "score": 92, "notes": "Classique." }
    },
    "tags": ["Grand Cru Classé", "Saint-Émilion", "Historique"]
  },

  // ─── POMEROL ──────────────────────────────────────────────────────────────
  {
    "id": "ref-182",
    "name": "Château Pétrus",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#550B1C",
    "cepages": [
      { "name": "Merlot", "pct": 100 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "3000-6000",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune confite"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre", "épices douces"],
      "earthy": ["truffe noire", "graphite"],
      "wood": ["cacao", "moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 95, "Floral": 75, "Épicé": 75, "Terreux": 85, "Boisé": 72, "Végétal": 25, "Minéral": 75, "Empyreumatique": 60 },
    "pairings": ["Gibier truffé", "Bœuf Rossini", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 15, "to": 60 },
    "labels": [],
    "estate": {
      "founded": 1750,
      "owner": "Famille Moueix + Alejandro Santo Domingo",
      "surface": "11.5 ha",
      "terroir": "Célèbre 'boutonnière d'argile bleue' unique",
      "soil": ["Argile bleue"],
      "climate": "Océanique tempéré",
      "description": "Le vin le plus cher au monde. 100% Merlot sur argile bleue. Jean-Claude Berrouet puis Olivier Berrouet."
    },
    "vintages": {
      "2022": { "score": 100, "notes": "Légendaire." },
      "2020": { "score": 99, "notes": "Monument." },
      "2019": { "score": 99, "notes": "Historique." },
      "2016": { "score": 100, "notes": "Référence absolue." }
    },
    "tags": ["Mythique", "Pomerol", "Merlot", "Garde longue"]
  },
  {
    "id": "ref-183",
    "name": "Le Pin",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#560C1C",
    "cepages": [
      { "name": "Merlot", "pct": 100 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "3000-5500",
    "aromas": {
      "fruit": ["cerise noire", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["truffe"],
      "wood": ["cacao", "vanille"]
    },
    "aromaWheel": { "Fruit": 95, "Floral": 75, "Épicé": 72, "Terreux": 80, "Boisé": 72, "Végétal": 25, "Minéral": 72, "Empyreumatique": 58 },
    "pairings": ["Bécasse", "Côte de bœuf", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1979,
      "owner": "Famille Thienpont (Jacques)",
      "surface": "2.7 ha",
      "terroir": "Micro-parcelle d'argile et graves",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Micro-domaine mythique, 6000 bouteilles/an. Jacques Thienpont. Précurseur des 'garagistes'."
    },
    "vintages": {
      "2020": { "score": 98, "notes": "Pureté extrême." },
      "2019": { "score": 98, "notes": "Monument." },
      "2018": { "score": 97, "notes": "Sublime." }
    },
    "tags": ["Mythique", "Pomerol", "Rare", "Micro-cuvée"]
  },
  {
    "id": "ref-184",
    "name": "Château Lafleur",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#560D1D",
    "cepages": [
      { "name": "Merlot", "pct": 50 },
      { "name": "Cabernet Franc", "pct": 50 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "1500-2800",
    "aromas": {
      "fruit": ["cerise", "mûre", "framboise"],
      "floral": ["violette", "pivoine"],
      "spicy": ["cèdre", "poivre blanc"],
      "earthy": ["graphite", "truffe"],
      "wood": ["cacao"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 85, "Épicé": 75, "Terreux": 78, "Boisé": 65, "Végétal": 30, "Minéral": 80, "Empyreumatique": 55 },
    "pairings": ["Pigeonneau", "Gibier", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 12, "to": 50 },
    "labels": [],
    "estate": {
      "founded": 1872,
      "owner": "Famille Guinaudeau",
      "surface": "4.5 ha",
      "terroir": "Plateau de Pomerol, micro-parcelles",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Jacques et Sylvie Guinaudeau. Proportion unique 50/50 Merlot-Cabernet Franc. Considéré comme le rival de Pétrus."
    },
    "vintages": {
      "2020": { "score": 98, "notes": "Finesse inouïe." },
      "2019": { "score": 98, "notes": "Grandissime." },
      "2018": { "score": 97, "notes": "Pur." }
    },
    "tags": ["Mythique", "Pomerol", "Rare"]
  },
  {
    "id": "ref-185",
    "name": "Vieux Château Certan",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#570D1D",
    "cepages": [
      { "name": "Merlot", "pct": 60 },
      { "name": "Cabernet Franc", "pct": 30 },
      { "name": "Cabernet Sauvignon", "pct": 10 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "250-500",
    "aromas": {
      "fruit": ["cerise", "mûre", "framboise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "truffe"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 72, "Épicé": 72, "Terreux": 75, "Boisé": 68, "Végétal": 30, "Minéral": 78, "Empyreumatique": 55 },
    "pairings": ["Canard", "Agneau", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 45 },
    "labels": [],
    "estate": {
      "founded": 1744,
      "owner": "Famille Thienpont (Alexandre)",
      "surface": "14 ha",
      "terroir": "Plateau de Pomerol, argile et graves",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "VCC. Alexandre Thienpont. Propriété historique, voisine de Pétrus. Assemblage rare en Pomerol avec Cabernet."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Grand VCC." },
      "2019": { "score": 97, "notes": "Sommet." },
      "2018": { "score": 96, "notes": "Harmonieux." }
    },
    "tags": ["Pomerol", "Garde longue", "Thienpont"]
  },
  {
    "id": "ref-186",
    "name": "Château L'Église-Clinet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#560C1C",
    "cepages": [
      { "name": "Merlot", "pct": 85 },
      { "name": "Cabernet Franc", "pct": 15 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "350-650",
    "aromas": {
      "fruit": ["cerise noire", "mûre confite"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices"],
      "earthy": ["truffe", "graphite"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 93, "Floral": 70, "Épicé": 75, "Terreux": 80, "Boisé": 72, "Végétal": 28, "Minéral": 75, "Empyreumatique": 62 },
    "pairings": ["Gibier truffé", "Côte de bœuf", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 12, "to": 45 },
    "labels": [],
    "estate": {
      "founded": 0,
      "owner": "Constance et Noémie Durantou",
      "surface": "6 ha",
      "terroir": "Plateau près du centre de Pomerol",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Denis Durantou (†2020), référence des Pomerols 'fins'. Ses filles ont repris depuis 2020. Micro-production exceptionnelle."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Premier sous les filles." },
      "2019": { "score": 97, "notes": "Dernier Denis." },
      "2018": { "score": 97, "notes": "Sublime." }
    },
    "tags": ["Pomerol", "Culte", "Rare"]
  },
  {
    "id": "ref-187",
    "name": "Château La Conseillante",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#570D1D",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "200-400",
    "aromas": {
      "fruit": ["cerise", "mûre", "framboise"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["truffe", "graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 80, "Épicé": 70, "Terreux": 75, "Boisé": 68, "Végétal": 30, "Minéral": 75, "Empyreumatique": 55 },
    "pairings": ["Canard", "Agneau", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1871,
      "owner": "Famille Nicolas",
      "surface": "12 ha",
      "terroir": "Plateau de Pomerol, mitoyen de Cheval Blanc",
      "soil": ["Argile", "Graves", "Sables"],
      "climate": "Océanique tempéré",
      "description": "Marielle Cazaux directrice. Famille Nicolas depuis 1871. Style soyeux, très floral, 'féminin'."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Élégance rare." },
      "2019": { "score": 97, "notes": "Sublime." },
      "2018": { "score": 96, "notes": "Velouté." }
    },
    "tags": ["Pomerol", "Élégance", "Garde longue"]
  },
  {
    "id": "ref-188",
    "name": "Château L'Évangile",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#560C1C",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "200-400",
    "aromas": {
      "fruit": ["cerise noire", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices"],
      "earthy": ["truffe", "cuir"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 72, "Épicé": 72, "Terreux": 78, "Boisé": 72, "Végétal": 28, "Minéral": 72, "Empyreumatique": 60 },
    "pairings": ["Gibier", "Bœuf Rossini", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1741,
      "owner": "Domaines Barons de Rothschild (Lafite)",
      "surface": "22 ha",
      "terroir": "Plateau voisin de Pétrus et Cheval Blanc",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Rothschild (Lafite) depuis 1990. Un des plus opulents Pomerol. Direction : Juliette Couderc."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Opulence maîtrisée." },
      "2019": { "score": 96, "notes": "Grand Évangile." },
      "2018": { "score": 95, "notes": "Solaire." }
    },
    "tags": ["Pomerol", "Rothschild"]
  },
  {
    "id": "ref-189",
    "name": "Château Trotanoy",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#560C1C",
    "cepages": [
      { "name": "Merlot", "pct": 90 },
      { "name": "Cabernet Franc", "pct": 10 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "200-400",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["truffe", "graphite"],
      "wood": ["cacao"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 70, "Épicé": 75, "Terreux": 82, "Boisé": 68, "Végétal": 28, "Minéral": 72, "Empyreumatique": 58 },
    "pairings": ["Bécasse", "Côte de bœuf", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 2h", "verre": "Bordeaux XL" },
    "guard": { "from": 12, "to": 45 },
    "labels": [],
    "estate": {
      "founded": 0,
      "owner": "Établissements Jean-Pierre Moueix",
      "surface": "7 ha",
      "terroir": "Plateau de Pomerol, sol argileux profond",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Moueix. Micro-domaine de haute tenue, souvent décrit comme 'petit Pétrus'. Style profond et structuré."
    },
    "vintages": {
      "2020": { "score": 97, "notes": "Profondeur rare." },
      "2019": { "score": 97, "notes": "Sublime." },
      "2018": { "score": 96, "notes": "Dense." }
    },
    "tags": ["Pomerol", "Moueix", "Garde longue"]
  },
  {
    "id": "ref-190",
    "name": "Château La Fleur-Pétrus",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#570D1D",
    "cepages": [
      { "name": "Merlot", "pct": 91 },
      { "name": "Cabernet Franc", "pct": 6 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "150-280",
    "aromas": {
      "fruit": ["cerise", "mûre", "framboise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["truffe", "graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 75, "Épicé": 68, "Terreux": 75, "Boisé": 65, "Végétal": 30, "Minéral": 75, "Empyreumatique": 52 },
    "pairings": ["Canard", "Magret", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1949,
      "owner": "Établissements Jean-Pierre Moueix",
      "surface": "18.7 ha",
      "terroir": "Plateau de Pomerol, voisin de Pétrus",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Le 'petit frère' accessible de Pétrus dans le giron Moueix. Style raffiné et élégant."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grande finesse." },
      "2019": { "score": 96, "notes": "Sublime." },
      "2018": { "score": 95, "notes": "Velouté." }
    },
    "tags": ["Pomerol", "Moueix"]
  },
  {
    "id": "ref-191",
    "name": "Château Clinet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#570D1D",
    "cepages": [
      { "name": "Merlot", "pct": 85 },
      { "name": "Cabernet Sauvignon", "pct": 15 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "100-180",
    "aromas": {
      "fruit": ["cerise noire", "mûre", "prune confite"],
      "floral": ["violette"],
      "spicy": ["cèdre", "épices"],
      "earthy": ["truffe", "graphite"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 68, "Épicé": 75, "Terreux": 75, "Boisé": 72, "Végétal": 28, "Minéral": 70, "Empyreumatique": 60 },
    "pairings": ["Gibier", "Côte de bœuf", "Fourme d'Ambert"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1900,
      "owner": "Famille Laborde",
      "surface": "11.4 ha",
      "terroir": "Plateau de Pomerol, voisin de Pétrus",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Ronan Laborde dirige. Style moderne, opulent. Rare Pomerol avec Cabernet Sauvignon."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Opulence raffinée." },
      "2019": { "score": 95, "notes": "Grand Clinet." },
      "2018": { "score": 94, "notes": "Charmeur." }
    },
    "tags": ["Pomerol", "Opulence"]
  },
  {
    "id": "ref-192",
    "name": "Château Le Bon Pasteur",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#580E1E",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "60-110",
    "aromas": {
      "fruit": ["cerise", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "cannelle"],
      "earthy": ["truffe"],
      "wood": ["cacao", "moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 65, "Épicé": 75, "Terreux": 72, "Boisé": 78, "Végétal": 30, "Minéral": 68, "Empyreumatique": 60 },
    "pairings": ["Magret", "Canard", "Bleu d'Auvergne"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 1920,
      "owner": "Investisseurs chinois (Goldin Group)",
      "surface": "8 ha",
      "terroir": "Limite nord-est de Pomerol",
      "soil": ["Argile", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Ancienne propriété de Michel Rolland, vendue en 2013. Style opulent, consultant Michel Rolland toujours présent."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Opulent." },
      "2019": { "score": 94, "notes": "Gourmand." },
      "2018": { "score": 93, "notes": "Solaire." }
    },
    "tags": ["Pomerol", "Opulence"]
  },
  {
    "id": "ref-193",
    "name": "Château Nénin",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Merlot", "pct": 75 },
      { "name": "Cabernet Franc", "pct": 25 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "55-95",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["truffe"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 68, "Épicé": 65, "Terreux": 72, "Boisé": 62, "Végétal": 32, "Minéral": 72, "Empyreumatique": 50 },
    "pairings": ["Canard", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 0,
      "owner": "Famille Delon (Léoville Las Cases)",
      "surface": "34 ha",
      "terroir": "Plateau sud de Pomerol",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Racheté par les Delon en 1997. Direction et rigueur 'médocaine' appliquée à Pomerol. Progression marquée."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Rigueur Delon." },
      "2019": { "score": 94, "notes": "Précis." },
      "2018": { "score": 93, "notes": "Harmonieux." }
    },
    "tags": ["Pomerol", "Delon"]
  },

  // ─── FRONSAC / CASTILLON ──────────────────────────────────────────────────
  {
    "id": "ref-194",
    "name": "Château La Dauphine",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Fronsac",
    "classification": "",
    "color": "rouge",
    "robe": "#5B1220",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "25-40",
    "aromas": {
      "fruit": ["cerise", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 60, "Épicé": 62, "Terreux": 65, "Boisé": 55, "Végétal": 40, "Minéral": 72, "Empyreumatique": 45 },
    "pairings": ["Magret", "Rôti", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1750,
      "owner": "Famille Labrune (Halley depuis 2015)",
      "surface": "53 ha",
      "terroir": "Coteau calcaire sur plateau de Fronsac",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Référence de Fronsac. Biodynamie certifiée Demeter depuis 2020. Château classé Monuments Historiques."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Précis et frais." },
      "2019": { "score": 91, "notes": "Grand Dauphine." },
      "2018": { "score": 90, "notes": "Pur." }
    },
    "tags": ["Fronsac", "Biodynamie", "Rapport qualité-prix"]
  },
  {
    "id": "ref-195",
    "name": "Château Moulin Haut-Laroque",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Fronsac",
    "classification": "",
    "color": "rouge",
    "robe": "#5B1120",
    "cepages": [
      { "name": "Merlot", "pct": 65 },
      { "name": "Cabernet Franc", "pct": 25 },
      { "name": "Cabernet Sauvignon", "pct": 5 },
      { "name": "Malbec", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "20-35",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 58, "Épicé": 60, "Terreux": 62, "Boisé": 55, "Végétal": 40, "Minéral": 68, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1850,
      "owner": "Famille Hervé",
      "surface": "17 ha",
      "terroir": "Coteau sud du plateau de Fronsac",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Jean-Noël Hervé, référence historique de Fronsac. Vieilles vignes. Vins de garde remarquables."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Typique et précis." },
      "2019": { "score": 91, "notes": "Grand Hervé." },
      "2018": { "score": 89, "notes": "Classique." }
    },
    "tags": ["Fronsac", "Rapport qualité-prix"]
  },
  {
    "id": "ref-196",
    "name": "Château Fontenil",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Fronsac",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1120",
    "cepages": [
      { "name": "Merlot", "pct": 85 },
      { "name": "Cabernet Sauvignon", "pct": 15 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "25-45",
    "aromas": {
      "fruit": ["cerise", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 60, "Épicé": 65, "Terreux": 65, "Boisé": 65, "Végétal": 35, "Minéral": 68, "Empyreumatique": 50 },
    "pairings": ["Magret", "Rôti", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": [],
    "estate": {
      "founded": 1986,
      "owner": "Michel et Dany Rolland",
      "surface": "8 ha",
      "terroir": "Coteau sud de Saillans",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Propriété personnelle de Michel Rolland, œnologue star. Laboratoire de ses idées. Style moderne."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Signature Rolland." },
      "2019": { "score": 92, "notes": "Précis." },
      "2018": { "score": 91, "notes": "Gourmand." }
    },
    "tags": ["Fronsac", "Rolland"]
  },
  {
    "id": "ref-197",
    "name": "Château La Vieille Cure",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Fronsac",
    "classification": "",
    "color": "rouge",
    "robe": "#5B1221",
    "cepages": [
      { "name": "Merlot", "pct": 75 },
      { "name": "Cabernet Franc", "pct": 20 },
      { "name": "Cabernet Sauvignon", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "20-35",
    "aromas": {
      "fruit": ["cerise", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 58, "Épicé": 60, "Terreux": 62, "Boisé": 55, "Végétal": 40, "Minéral": 65, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Magret", "Mimolette"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 15 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1986,
      "owner": "Groupe américain",
      "surface": "20 ha",
      "terroir": "Coteau sud-est de Saillans",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Propriété américaine stable. Consultant : Michel Rolland. Style accessible et soigné."
    },
    "vintages": {
      "2020": { "score": 89, "notes": "Correct." },
      "2019": { "score": 90, "notes": "Bon." },
      "2018": { "score": 89, "notes": "Souple." }
    },
    "tags": ["Fronsac", "Accessible"]
  },
  {
    "id": "ref-198",
    "name": "Château d'Aiguilhe",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Castillon Côtes de Bordeaux",
    "classification": "",
    "color": "rouge",
    "robe": "#5B1221",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "18-35",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 62, "Épicé": 62, "Terreux": 62, "Boisé": 58, "Végétal": 40, "Minéral": 68, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 15 },
    "labels": ["HVE"],
    "estate": {
      "founded": 0,
      "owner": "Comte Stephan von Neipperg",
      "surface": "50 ha",
      "terroir": "Plateau calcaire en continuité de Saint-Émilion",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Neipperg (Canon-La-Gaffelière, La Mondotte). Un des meilleurs Castillon. Rapport qualité-prix exceptionnel."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Précis." },
      "2019": { "score": 91, "notes": "Grand d'Aiguilhe." },
      "2018": { "score": 90, "notes": "Pur." }
    },
    "tags": ["Castillon", "Rapport qualité-prix", "Neipperg"]
  },
  {
    "id": "ref-199",
    "name": "Domaine de l'A",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Castillon Côtes de Bordeaux",
    "classification": "",
    "color": "rouge",
    "robe": "#5A0F1E",
    "cepages": [
      { "name": "Merlot", "pct": 80 },
      { "name": "Cabernet Franc", "pct": 20 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "25-45",
    "aromas": {
      "fruit": ["cerise", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 65, "Épicé": 68, "Terreux": 65, "Boisé": 60, "Végétal": 38, "Minéral": 75, "Empyreumatique": 48 },
    "pairings": ["Canard", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 20 },
    "labels": ["Biodynamie"],
    "estate": {
      "founded": 1999,
      "owner": "Stéphane et Christine Derenoncourt",
      "surface": "10 ha",
      "terroir": "Coteau calcaire de Castillon",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Propriété personnelle du consultant star Stéphane Derenoncourt. Biodynamie. Prix d'ami pour un vin de très haut niveau."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Biodynamie précise." },
      "2019": { "score": 93, "notes": "Grand Domaine de l'A." },
      "2018": { "score": 92, "notes": "Vibrant." }
    },
    "tags": ["Castillon", "Biodynamie", "Derenoncourt"]
  },

  // ─── PESSAC-LÉOGNAN / GRAVES ──────────────────────────────────────────────
  {
    "id": "ref-200",
    "name": "Château Haut-Bailly",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#591120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 32 },
      { "name": "Petit Verdot", "pct": 2 },
      { "name": "Cabernet Franc", "pct": 1 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "120-220",
    "aromas": {
      "fruit": ["cassis", "myrtille", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "fumée"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 65, "Épicé": 72, "Terreux": 72, "Boisé": 68, "Végétal": 35, "Minéral": 78, "Empyreumatique": 70 },
    "pairings": ["Agneau", "Magret", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1530,
      "owner": "Famille Wilmers (depuis 1998)",
      "surface": "30 ha",
      "terroir": "Graves günziennes, voisin de Haut-Brion",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Véronique Sanders directrice. Nouveau chai inauguré en 2021 signé Daniel Romeo. Un des plus 'médocains' des Pessac."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Sublime." },
      "2019": { "score": 97, "notes": "Grand Haut-Bailly." },
      "2018": { "score": 96, "notes": "Élégance." },
      "2016": { "score": 97, "notes": "Historique." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Élégance"]
  },
  {
    "id": "ref-201",
    "name": "Château Pape Clément",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#591120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 45 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "90-160",
    "aromas": {
      "fruit": ["cassis", "cerise noire", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre", "épices"],
      "earthy": ["graphite", "fumée", "terre"],
      "wood": ["moka", "cacao"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 62, "Épicé": 75, "Terreux": 75, "Boisé": 72, "Végétal": 32, "Minéral": 72, "Empyreumatique": 75 },
    "pairings": ["Gigot d'agneau", "Magret", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": [],
    "estate": {
      "founded": 1252,
      "owner": "Bernard Magrez",
      "surface": "60 ha",
      "terroir": "Enclave en pleine ville de Pessac",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Château historique (XIIIe siècle), lié au pape Clément V. Bernard Magrez. Style opulent, très boisé."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grand Pape." },
      "2019": { "score": 95, "notes": "Opulent." },
      "2018": { "score": 94, "notes": "Dense." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Magrez"]
  },
  {
    "id": "ref-202",
    "name": "Château Smith Haut Lafitte",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#591121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Cabernet Franc", "pct": 4 },
      { "name": "Petit Verdot", "pct": 1 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "100-180",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "fumée"],
      "wood": ["moka", "cacao"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 65, "Épicé": 72, "Terreux": 72, "Boisé": 75, "Végétal": 35, "Minéral": 75, "Empyreumatique": 68 },
    "pairings": ["Côte de bœuf", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": ["Bio", "Biodynamie (conversion)"],
    "estate": {
      "founded": 1365,
      "owner": "Daniel et Florence Cathiard",
      "surface": "78 ha",
      "terroir": "Croupe de graves günziennes à Martillac",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Racheté par les Cathiard en 1990. Rénovation spectaculaire. Écotourisme avec Les Sources de Caudalie."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Grand Smith." },
      "2019": { "score": 96, "notes": "Opulent et précis." },
      "2018": { "score": 95, "notes": "Puissant." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Bio"]
  },
  {
    "id": "ref-203",
    "name": "Château Smith Haut Lafitte",
    "cuvee": "Grand Vin Blanc",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "blanc",
    "robe": "#E8D8A0",
    "cepages": [
      { "name": "Sauvignon Blanc", "pct": 85 },
      { "name": "Sémillon", "pct": 10 },
      { "name": "Sauvignon Gris", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "90-160",
    "aromas": {
      "fruit": ["agrumes", "fruit de la passion", "pêche blanche"],
      "floral": ["fleur d'oranger", "acacia"],
      "spicy": ["vanille"],
      "earthy": ["pierre à fusil"],
      "wood": ["noisette grillée"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 75, "Épicé": 30, "Terreux": 40, "Boisé": 60, "Végétal": 55, "Minéral": 85, "Empyreumatique": 50 },
    "pairings": ["Huîtres chaudes", "Saint-pierre", "Ris de veau"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Bourgogne blanc" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["Bio", "Biodynamie (conversion)"],
    "estate": {
      "founded": 1365,
      "owner": "Daniel et Florence Cathiard",
      "surface": "11 ha (blanc)",
      "terroir": "Graves günziennes, parcelles dédiées",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Un des plus grands blancs secs de Bordeaux. Style tendu et complexe, grande garde."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Tension minérale." },
      "2019": { "score": 96, "notes": "Grand blanc." },
      "2018": { "score": 95, "notes": "Pur." }
    },
    "tags": ["Classé Graves", "Blanc sec", "Pessac-Léognan"]
  },
  {
    "id": "ref-204",
    "name": "Domaine de Chevalier",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "70-130",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "fumée"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 62, "Épicé": 70, "Terreux": 72, "Boisé": 65, "Végétal": 35, "Minéral": 78, "Empyreumatique": 65 },
    "pairings": ["Agneau", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1865,
      "owner": "Famille Bernard (Olivier)",
      "surface": "45 ha (rouge)",
      "terroir": "Vignoble forestier atypique",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Olivier Bernard. Un des plus élégants Pessac. Style très 'Burgundy' en finesse. Vignoble cerné de forêt."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grande finesse." },
      "2019": { "score": 95, "notes": "Pur." },
      "2018": { "score": 94, "notes": "Élégant." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Élégance"]
  },
  {
    "id": "ref-205",
    "name": "Domaine de Chevalier",
    "cuvee": "Grand Vin Blanc",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "blanc",
    "robe": "#E8D8A0",
    "cepages": [
      { "name": "Sauvignon Blanc", "pct": 70 },
      { "name": "Sémillon", "pct": 30 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "130-220",
    "aromas": {
      "fruit": ["agrumes", "pêche", "citron confit"],
      "floral": ["fleur blanche", "acacia"],
      "spicy": ["vanille discrète"],
      "earthy": ["pierre à fusil"],
      "wood": ["noisette", "toasté"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 75, "Épicé": 28, "Terreux": 38, "Boisé": 55, "Végétal": 50, "Minéral": 92, "Empyreumatique": 48 },
    "pairings": ["Turbot", "Homard", "Crustacés"],
    "service": { "temp": "11-13°", "carafe": "Non", "verre": "Bourgogne blanc" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1865,
      "owner": "Famille Bernard (Olivier)",
      "surface": "5 ha (blanc)",
      "terroir": "Parcelles de graves exposées nord",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Un des tout plus grands blancs de Bordeaux. Minéralité exceptionnelle. Capacité de vieillissement rare."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Monument." },
      "2019": { "score": 97, "notes": "Sublime." },
      "2018": { "score": 96, "notes": "Tendu." }
    },
    "tags": ["Classé Graves", "Blanc sec", "Garde longue"]
  },
  {
    "id": "ref-206",
    "name": "Château Malartic-Lagravière",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["fumée"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 60, "Épicé": 68, "Terreux": 68, "Boisé": 62, "Végétal": 35, "Minéral": 72, "Empyreumatique": 65 },
    "pairings": ["Magret", "Agneau", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE", "Bio (conversion)"],
    "estate": {
      "founded": 1850,
      "owner": "Famille Bonnie",
      "surface": "46 ha",
      "terroir": "Graves günziennes de Léognan",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Famille belge Bonnie depuis 1997. Rénovation complète. Aussi grands blancs."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Précis." },
      "2019": { "score": 94, "notes": "Grand Malartic." },
      "2018": { "score": 93, "notes": "Harmonieux." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan"]
  },
  {
    "id": "ref-207",
    "name": "Château Carbonnieux",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-65",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["fumée"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 58, "Épicé": 62, "Terreux": 65, "Boisé": 58, "Végétal": 40, "Minéral": 68, "Empyreumatique": 62 },
    "pairings": ["Magret", "Rôti", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1234,
      "owner": "Famille Perrin",
      "surface": "92 ha",
      "terroir": "Graves et graviers",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Un des plus anciens domaines du Bordelais. Famille Perrin depuis 1956. Grand blanc également."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Correct." },
      "2019": { "score": 92, "notes": "Bon." },
      "2018": { "score": 91, "notes": "Souple." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Historique"]
  },
  {
    "id": "ref-208",
    "name": "Château Carbonnieux",
    "cuvee": "Grand Vin Blanc",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "blanc",
    "robe": "#EADCA5",
    "cepages": [
      { "name": "Sauvignon Blanc", "pct": 65 },
      { "name": "Sémillon", "pct": 35 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["agrumes", "pêche"],
      "floral": ["fleur d'acacia"],
      "spicy": ["vanille"],
      "earthy": ["pierre à fusil"],
      "wood": ["noisette"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 70, "Épicé": 30, "Terreux": 40, "Boisé": 50, "Végétal": 55, "Minéral": 80, "Empyreumatique": 45 },
    "pairings": ["Huîtres", "Poisson grillé", "Sushi"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Bourgogne blanc" },
    "guard": { "from": 4, "to": 12 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1234,
      "owner": "Famille Perrin",
      "surface": "45 ha (blanc)",
      "terroir": "Graves günziennes",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Référence accessible des blancs classés. Vif et aromatique."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Frais et précis." },
      "2019": { "score": 92, "notes": "Aromatique." },
      "2018": { "score": 90, "notes": "Classique." }
    },
    "tags": ["Classé Graves", "Blanc sec", "Rapport qualité-prix"]
  },
  {
    "id": "ref-209",
    "name": "Château Les Carmes Haut-Brion",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Cabernet Franc", "pct": 40 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Cabernet Sauvignon", "pct": 25 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "110-200",
    "aromas": {
      "fruit": ["cassis", "cerise", "framboise"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre", "poivre blanc"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 78, "Épicé": 72, "Terreux": 65, "Boisé": 62, "Végétal": 32, "Minéral": 75, "Empyreumatique": 60 },
    "pairings": ["Pigeonneau", "Canard", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1584,
      "owner": "Patrice Pichet",
      "surface": "13 ha",
      "terroir": "En pleine ville de Bordeaux, enclave historique",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Rénovation spectaculaire sous Patrice Pichet depuis 2010. Chai 'vaisseau' signé Philippe Starck. Forte proportion Cabernet Franc rare."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grand Carmes." },
      "2019": { "score": 96, "notes": "Monumental." },
      "2018": { "score": 95, "notes": "Précis." }
    },
    "tags": ["Pessac-Léognan", "Cabernet Franc", "Innovation"]
  },
  {
    "id": "ref-210",
    "name": "Château de Fieuzal",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Petit Verdot", "pct": 3 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "40-75",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "fumée"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 60, "Épicé": 68, "Terreux": 68, "Boisé": 62, "Végétal": 38, "Minéral": 72, "Empyreumatique": 68 },
    "pairings": ["Magret", "Agneau", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1851,
      "owner": "Famille Quinn",
      "surface": "75 ha",
      "terroir": "Graves günziennes à Léognan",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Propriétaires irlandais depuis 2001. Consultant : Éric Boissenot. Montée en puissance."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Solide classique." },
      "2019": { "score": 93, "notes": "Grand Fieuzal." },
      "2018": { "score": 92, "notes": "Harmonieux." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan"]
  },
  {
    "id": "ref-211",
    "name": "Château Olivier",
    "cuvee": "Grand Vin Rouge",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan",
    "classification": "Cru Classé de Graves",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 42 },
      { "name": "Cabernet Franc", "pct": 2 },
      { "name": "Petit Verdot", "pct": 1 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["fumée"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 58, "Épicé": 62, "Terreux": 62, "Boisé": 58, "Végétal": 40, "Minéral": 70, "Empyreumatique": 60 },
    "pairings": ["Rôti", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1199,
      "owner": "Famille de Bethmann",
      "surface": "55 ha",
      "terroir": "Graves à Léognan",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Famille de Bethmann depuis 1886. Château médiéval sur motte féodale. Forte remontée qualitative depuis 2012."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Progression." },
      "2019": { "score": 92, "notes": "Bon." },
      "2018": { "score": 91, "notes": "Correct." }
    },
    "tags": ["Classé Graves", "Pessac-Léognan", "Rapport qualité-prix"]
  },

  // ─── SAUTERNES / BARSAC ───────────────────────────────────────────────────
  {
    "id": "ref-212",
    "name": "Château d'Yquem",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes",
    "classification": "1er Cru Supérieur 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A12B",
    "cepages": [
      { "name": "Sémillon", "pct": 80 },
      { "name": "Sauvignon Blanc", "pct": 20 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "400-800",
    "aromas": {
      "fruit": ["abricot confit", "ananas rôti", "coing", "mangue"],
      "floral": ["fleur d'oranger", "miel d'acacia"],
      "spicy": ["vanille", "safran", "cannelle"],
      "earthy": ["pourriture noble"],
      "wood": ["miel", "cire"]
    },
    "aromaWheel": { "Fruit": 95, "Floral": 85, "Épicé": 70, "Terreux": 50, "Boisé": 55, "Végétal": 35, "Minéral": 80, "Empyreumatique": 60 },
    "pairings": ["Foie gras poêlé", "Roquefort", "Tarte Tatin"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 15, "to": 80 },
    "labels": [],
    "estate": {
      "founded": 1593,
      "owner": "LVMH (Arnault)",
      "surface": "110 ha",
      "terroir": "Plateau surplombant le Ciron, brouillards matinaux",
      "soil": ["Graves", "Argile", "Calcaire"],
      "climate": "Brumes du Ciron favorables au Botrytis",
      "description": "LVMH depuis 1999. Le plus grand vin liquoreux au monde. Tri par tri, rendement dérisoire (9 hl/ha)."
    },
    "vintages": {
      "2020": { "score": 98, "notes": "Monument." },
      "2019": { "score": 98, "notes": "Sublime." },
      "2018": { "score": 97, "notes": "Somptueux." },
      "2017": { "score": 96, "notes": "Grand." },
      "2015": { "score": 99, "notes": "Historique." }
    },
    "tags": ["Mythique", "Sauternes", "Liquoreux", "Garde longue"]
  },
  {
    "id": "ref-213",
    "name": "Château Climens",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Barsac",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A535",
    "cepages": [
      { "name": "Sémillon", "pct": 100 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "80-160",
    "aromas": {
      "fruit": ["abricot", "ananas", "coing"],
      "floral": ["fleur d'oranger", "miel"],
      "spicy": ["vanille", "gingembre"],
      "earthy": ["pourriture noble"],
      "wood": ["cire d'abeille"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 85, "Épicé": 65, "Terreux": 45, "Boisé": 50, "Végétal": 35, "Minéral": 85, "Empyreumatique": 55 },
    "pairings": ["Foie gras", "Fromages bleus", "Desserts fruités"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 10, "to": 50 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1547,
      "owner": "Bérénice Lurton → Jean-Hubert Moitry (depuis 2022)",
      "surface": "30 ha",
      "terroir": "Plateau calcaire de Barsac",
      "soil": ["Calcaire à astéries", "Argile"],
      "climate": "Brumes du Ciron",
      "description": "100% Sémillon unique à ce rang. Biodynamie totale depuis 2010. Pureté et tension exceptionnelles. Rachat en 2022."
    },
    "vintages": {
      "2019": { "score": 96, "notes": "Magistral." },
      "2018": { "score": 95, "notes": "Pur." },
      "2017": { "score": 96, "notes": "Grand Climens." },
      "2015": { "score": 97, "notes": "Monument." }
    },
    "tags": ["1er Cru 1855", "Biodynamie", "Barsac", "Rare"]
  },
  {
    "id": "ref-214",
    "name": "Château Coutet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Barsac",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#DAA83A",
    "cepages": [
      { "name": "Sémillon", "pct": 75 },
      { "name": "Sauvignon Blanc", "pct": 23 },
      { "name": "Muscadelle", "pct": 2 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["abricot", "pêche", "citron confit"],
      "floral": ["fleur blanche", "acacia"],
      "spicy": ["vanille"],
      "earthy": ["pourriture noble"],
      "wood": ["miel"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 82, "Épicé": 60, "Terreux": 45, "Boisé": 50, "Végétal": 38, "Minéral": 82, "Empyreumatique": 50 },
    "pairings": ["Foie gras", "Tarte au citron", "Roquefort"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 8, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1600,
      "owner": "Famille Baly",
      "surface": "38 ha",
      "terroir": "Plateau calcaire de Barsac",
      "soil": ["Calcaire", "Argile"],
      "climate": "Brumes du Ciron",
      "description": "Style 'vertical' typique de Barsac, plus vif que Sauternes. Famille Baly depuis 1977."
    },
    "vintages": {
      "2019": { "score": 94, "notes": "Précis." },
      "2017": { "score": 95, "notes": "Grand Coutet." },
      "2015": { "score": 95, "notes": "Sublime." }
    },
    "tags": ["1er Cru 1855", "Barsac", "Rapport qualité-prix"]
  },
  {
    "id": "ref-215",
    "name": "Château Rieussec",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D8A030",
    "cepages": [
      { "name": "Sémillon", "pct": 90 },
      { "name": "Sauvignon Blanc", "pct": 7 },
      { "name": "Muscadelle", "pct": 3 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "60-110",
    "aromas": {
      "fruit": ["abricot confit", "mangue", "coing"],
      "floral": ["fleur d'oranger"],
      "spicy": ["vanille", "gingembre"],
      "earthy": ["pourriture noble"],
      "wood": ["miel", "caramel"]
    },
    "aromaWheel": { "Fruit": 92, "Floral": 78, "Épicé": 68, "Terreux": 48, "Boisé": 62, "Végétal": 35, "Minéral": 70, "Empyreumatique": 58 },
    "pairings": ["Foie gras", "Desserts aux fruits", "Comté vieux"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 10, "to": 50 },
    "labels": [],
    "estate": {
      "founded": 1750,
      "owner": "Domaines Barons de Rothschild (Lafite)",
      "surface": "93 ha",
      "terroir": "Plateau voisin d'Yquem, brumes du Ciron",
      "soil": ["Graves", "Argile", "Calcaire"],
      "climate": "Brumes du Ciron",
      "description": "Rothschild (Lafite) depuis 1985. Style opulent. Chai moderne signé Jean-Marc Sauboua."
    },
    "vintages": {
      "2019": { "score": 95, "notes": "Grand Rieussec." },
      "2017": { "score": 95, "notes": "Précis." },
      "2015": { "score": 96, "notes": "Sublime." }
    },
    "tags": ["1er Cru 1855", "Sauternes", "Rothschild"]
  },
  {
    "id": "ref-216",
    "name": "Château Suduiraut",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A235",
    "cepages": [
      { "name": "Sémillon", "pct": 90 },
      { "name": "Sauvignon Blanc", "pct": 10 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["abricot", "ananas", "coing"],
      "floral": ["fleur d'oranger"],
      "spicy": ["vanille"],
      "earthy": ["pourriture noble"],
      "wood": ["miel"]
    },
    "aromaWheel": { "Fruit": 90, "Floral": 80, "Épicé": 65, "Terreux": 48, "Boisé": 55, "Végétal": 35, "Minéral": 75, "Empyreumatique": 52 },
    "pairings": ["Foie gras", "Tarte tatin", "Roquefort"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 10, "to": 45 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1580,
      "owner": "AXA Millésimes",
      "surface": "200 ha (87 ha vignes)",
      "terroir": "Plateau élevé de Preignac",
      "soil": ["Graves", "Argile"],
      "climate": "Brumes du Ciron",
      "description": "AXA Millésimes depuis 1992. Château classé Monument Historique. Style opulent et doré."
    },
    "vintages": {
      "2019": { "score": 94, "notes": "Grand Suduiraut." },
      "2017": { "score": 95, "notes": "Sublime." },
      "2015": { "score": 95, "notes": "Pur." }
    },
    "tags": ["1er Cru 1855", "Sauternes", "AXA"]
  },
  {
    "id": "ref-217",
    "name": "Château Guiraud",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A333",
    "cepages": [
      { "name": "Sémillon", "pct": 65 },
      { "name": "Sauvignon Blanc", "pct": 35 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "45-75",
    "aromas": {
      "fruit": ["abricot", "pêche", "citron confit"],
      "floral": ["fleur d'oranger"],
      "spicy": ["vanille"],
      "earthy": ["pourriture noble"],
      "wood": ["miel"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 78, "Épicé": 62, "Terreux": 50, "Boisé": 55, "Végétal": 40, "Minéral": 78, "Empyreumatique": 52 },
    "pairings": ["Foie gras", "Desserts fruités", "Fromages bleus"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 8, "to": 40 },
    "labels": ["Bio"],
    "estate": {
      "founded": 1766,
      "owner": "Consortium (Robert Peugeot, Bernard, Neipperg, Planty)",
      "surface": "128 ha",
      "terroir": "Plateau sud de Sauternes",
      "soil": ["Graves", "Argile"],
      "climate": "Brumes du Ciron",
      "description": "Premier 1er Cru classé de Sauternes certifié bio (2011). Proportion de Sauvignon élevée apporte fraîcheur."
    },
    "vintages": {
      "2019": { "score": 93, "notes": "Précis." },
      "2017": { "score": 94, "notes": "Grand Guiraud." },
      "2015": { "score": 94, "notes": "Sublime." }
    },
    "tags": ["1er Cru 1855", "Bio", "Sauternes"]
  },
  {
    "id": "ref-218",
    "name": "Château Doisy-Daëne",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Barsac",
    "classification": "2e Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A638",
    "cepages": [
      { "name": "Sémillon", "pct": 90 },
      { "name": "Sauvignon Blanc", "pct": 10 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "30-55",
    "aromas": {
      "fruit": ["abricot", "agrumes"],
      "floral": ["fleur blanche"],
      "spicy": ["vanille"],
      "earthy": ["pourriture noble"],
      "wood": ["miel"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 78, "Épicé": 58, "Terreux": 42, "Boisé": 48, "Végétal": 40, "Minéral": 82, "Empyreumatique": 48 },
    "pairings": ["Foie gras", "Tarte au citron", "Comté"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 8, "to": 35 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1900,
      "owner": "Famille Dubourdieu",
      "surface": "16 ha",
      "terroir": "Plateau calcaire de Barsac",
      "soil": ["Calcaire"],
      "climate": "Brumes du Ciron",
      "description": "Famille Dubourdieu (Denis Dubourdieu †2016). Référence moderne de Barsac, style pur et minéral."
    },
    "vintages": {
      "2019": { "score": 93, "notes": "Précis." },
      "2017": { "score": 94, "notes": "Grand Daëne." },
      "2015": { "score": 94, "notes": "Sublime." }
    },
    "tags": ["2e Cru 1855", "Barsac", "Rapport qualité-prix", "Dubourdieu"]
  },
  {
    "id": "ref-219",
    "name": "Château Lafaurie-Peyraguey",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes",
    "classification": "1er Cru Classé 1855",
    "color": "blanc liquoreux",
    "robe": "#D9A333",
    "cepages": [
      { "name": "Sémillon", "pct": 93 },
      { "name": "Sauvignon Blanc", "pct": 6 },
      { "name": "Muscadelle", "pct": 1 }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["abricot", "pêche", "coing"],
      "floral": ["fleur d'oranger"],
      "spicy": ["vanille"],
      "earthy": ["pourriture noble"],
      "wood": ["miel"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 78, "Épicé": 62, "Terreux": 48, "Boisé": 55, "Végétal": 38, "Minéral": 75, "Empyreumatique": 50 },
    "pairings": ["Foie gras", "Desserts aux fruits jaunes", "Roquefort"],
    "service": { "temp": "10-12°", "carafe": "Non", "verre": "Sauternes" },
    "guard": { "from": 8, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1618,
      "owner": "Silvio Denz (Lalique)",
      "surface": "36 ha",
      "terroir": "Plateau de Bommes",
      "soil": ["Graves", "Argile"],
      "climate": "Brumes du Ciron",
      "description": "Rachat par Silvio Denz (Lalique) en 2014. Renaissance éclatante. Bouteilles en cristal Lalique pour cuvées spéciales."
    },
    "vintages": {
      "2019": { "score": 94, "notes": "Grande renaissance." },
      "2017": { "score": 94, "notes": "Précis." },
      "2015": { "score": 95, "notes": "Sublime." }
    },
    "tags": ["1er Cru 1855", "Sauternes", "Lalique"]
  }

];

// Usage :
// window.WINE_DATABASE = [...WINE_DATABASE, ...WINE_DATABASE_PART2];
