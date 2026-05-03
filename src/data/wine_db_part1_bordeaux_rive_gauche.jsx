// ═══════════════════════════════════════════════════════════════════════════════
//  EXTENSION — BORDEAUX RIVE GAUCHE (Médoc + Haut-Médoc)
//  Lot 1/7 · 50 vins · IDs ref-110 → ref-159
//  Gamme : 30-300€ (cave premium)
//  Sources : INAO, Classement 1855, Crus Bourgeois 2020-2024,
//            Guide Hachette, RVF, Bettane-Desseauve, données domaines.
//  À merger : window.WINE_DATABASE = [...WINE_DATABASE, ...WINE_DATABASE_PART1];
// ═══════════════════════════════════════════════════════════════════════════════

const WINE_DATABASE_PART1 = [

  // ─── PAUILLAC ─────────────────────────────────────────────────────────────
  {
    "id": "ref-110",
    "name": "Château Pichon Baron",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5C1020",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 78 },
      { "name": "Merlot", "pct": 20 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "120-200",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise noire"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["cacao", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 55, "Épicé": 70, "Terreux": 65, "Boisé": 72, "Végétal": 35, "Minéral": 55, "Empyreumatique": 55 },
    "pairings": ["Agneau de Pauillac", "Magret de canard", "Stilton"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 35 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1694,
      "owner": "AXA Millésimes",
      "surface": "73 ha",
      "terroir": "Graves günziennes profondes sur sous-sol calcaire",
      "soil": ["Graves", "Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "Pointe Sud de Pauillac. Dirigé par Christian Seely. Chai contemporain de Jean-Michel Wilmotte inauguré en 2007."
    },
    "vintages": {
      "2022": { "score": 96, "notes": "Concentration et fraîcheur rare." },
      "2020": { "score": 95, "notes": "Solaire mais équilibré." },
      "2019": { "score": 96, "notes": "Trilogie réussie avec 2018 et 2020." },
      "2018": { "score": 96, "notes": "Puissant, tanins ciselés." },
      "2016": { "score": 97, "notes": "Grand classique." },
      "2015": { "score": 95, "notes": "Velouté." },
      "2010": { "score": 97, "notes": "Monument." }
    },
    "tags": ["Classé", "Garde longue", "Pauillac"]
  },
  {
    "id": "ref-111",
    "name": "Château Pichon Comtesse",
    "cuvee": "Pichon-Longueville Comtesse de Lalande",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5E1324",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "130-220",
    "aromas": {
      "fruit": ["cassis", "framboise", "prune"],
      "floral": ["violette", "iris"],
      "spicy": ["cèdre", "cannelle"],
      "earthy": ["graphite", "tabac blond"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 70, "Épicé": 65, "Terreux": 60, "Boisé": 70, "Végétal": 35, "Minéral": 60, "Empyreumatique": 50 },
    "pairings": ["Bécasse", "Côte de bœuf", "Comté 36 mois"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1689,
      "owner": "Famille Rouzaud (Champagne Roederer)",
      "surface": "89 ha",
      "terroir": "Graves günziennes sur sous-sol argilo-calcaire",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Racheté par la famille Rouzaud (Roederer) en 2007. Le plus 'féminin' des Pauillac, signature soyeuse et aromatique remarquable."
    },
    "vintages": {
      "2022": { "score": 98, "notes": "Sommet du millésime." },
      "2020": { "score": 97, "notes": "Magistral." },
      "2019": { "score": 97, "notes": "Quintessence de l'élégance." },
      "2018": { "score": 96, "notes": "Dense et raffiné." },
      "2016": { "score": 98, "notes": "Légendaire." },
      "2010": { "score": 98, "notes": "Monument." }
    },
    "tags": ["Classé", "Garde longue", "Élégance", "Pauillac"]
  },
  {
    "id": "ref-112",
    "name": "Château Lynch-Bages",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 75 },
      { "name": "Merlot", "pct": 18 },
      { "name": "Cabernet Franc", "pct": 4 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-150",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "clou de girofle"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka", "cacao"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 50, "Épicé": 70, "Terreux": 65, "Boisé": 70, "Végétal": 40, "Minéral": 55, "Empyreumatique": 60 },
    "pairings": ["Pièce de bœuf", "Agneau", "Cantal vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1749,
      "owner": "Famille Cazes",
      "surface": "100 ha",
      "terroir": "Graves garonnaises profondes sur argile",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Dynastie Cazes. 'Cinquième cru qui boit comme un deuxième', selon la formule consacrée. Nouveau chai signé Chien Chung Pei inauguré en 2020."
    },
    "vintages": {
      "2022": { "score": 95, "notes": "Grand Lynch-Bages." },
      "2020": { "score": 94, "notes": "Solaire et gourmand." },
      "2019": { "score": 95, "notes": "Puissant et pur." },
      "2018": { "score": 94, "notes": "Opulent." },
      "2016": { "score": 95, "notes": "Classique magistral." }
    },
    "tags": ["Classé", "Référence", "Pauillac"]
  },
  {
    "id": "ref-113",
    "name": "Château Pontet-Canet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#581020",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 62 },
      { "name": "Merlot", "pct": 32 },
      { "name": "Cabernet Franc", "pct": 4 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-160",
    "aromas": {
      "fruit": ["cassis", "myrtille", "cerise noire"],
      "floral": ["violette", "pivoine"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["graphite", "terre humide"],
      "wood": ["vanille discrète"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 65, "Épicé": 72, "Terreux": 70, "Boisé": 55, "Végétal": 35, "Minéral": 75, "Empyreumatique": 50 },
    "pairings": ["Pigeonneau", "Gigot d'agneau", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 35 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1725,
      "owner": "Famille Tesseron",
      "surface": "81 ha",
      "terroir": "Plateau de Pontet en continuité avec Mouton",
      "soil": ["Graves", "Argile", "Calcaire à astéries"],
      "climate": "Océanique tempéré",
      "description": "Pionnier de la biodynamie en Médoc (depuis 2004). Vinification en amphores et foudres. Alfred Tesseron à la tête du domaine."
    },
    "vintages": {
      "2022": { "score": 96, "notes": "Biodynamie au sommet." },
      "2020": { "score": 95, "notes": "Vibration extraordinaire." },
      "2019": { "score": 96, "notes": "Pur et vertical." },
      "2018": { "score": 95, "notes": "Solaire et précis." },
      "2016": { "score": 97, "notes": "Légendaire." },
      "2010": { "score": 98, "notes": "100 Parker." }
    },
    "tags": ["Classé", "Biodynamie", "Pauillac", "Culte"]
  },
  {
    "id": "ref-114",
    "name": "Château Grand-Puy-Lacoste",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#581224",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 75 },
      { "name": "Merlot", "pct": 25 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "60-100",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 50, "Épicé": 65, "Terreux": 62, "Boisé": 62, "Végétal": 40, "Minéral": 55, "Empyreumatique": 50 },
    "pairings": ["Rôti de bœuf", "Canard", "Tomme noire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1750,
      "owner": "Famille Borie",
      "surface": "60 ha",
      "terroir": "Plateau de Bages",
      "soil": ["Graves", "Sables", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Classicisme pauillacais, famille Borie. 'Rapport qualité-prestige' parmi les plus réguliers du Médoc."
    },
    "vintages": {
      "2022": { "score": 94, "notes": "Classique de haut vol." },
      "2020": { "score": 93, "notes": "Élégant et typé." },
      "2019": { "score": 94, "notes": "Grand GPL." },
      "2016": { "score": 95, "notes": "Référence." }
    },
    "tags": ["Classé", "Rapport qualité-prix", "Pauillac"]
  },
  {
    "id": "ref-115",
    "name": "Château d'Armailhac",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5B1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 54 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Cabernet Franc", "pct": 9 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "cerise", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 60, "Terreux": 55, "Boisé": 60, "Végétal": 40, "Minéral": 50, "Empyreumatique": 45 },
    "pairings": ["Entrecôte bordelaise", "Canard", "Époisses"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": [],
    "estate": {
      "founded": 1680,
      "owner": "Baronne Philippine de Rothschild (héritiers)",
      "surface": "74 ha",
      "terroir": "Graves profondes sur socle calcaire",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Propriété des Rothschild de Mouton depuis 1933. Second vin officieux du groupe avec Clerc Milon. Style charmeur, accessible jeune."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Gourmand." },
      "2019": { "score": 93, "notes": "Équilibre." },
      "2018": { "score": 92, "notes": "Fruité mûr." },
      "2016": { "score": 93, "notes": "Fin et précis." }
    },
    "tags": ["Classé", "Pauillac", "Accessible"]
  },
  {
    "id": "ref-116",
    "name": "Château Clerc Milon",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#591220",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 56 },
      { "name": "Merlot", "pct": 33 },
      { "name": "Cabernet Franc", "pct": 8 },
      { "name": "Petit Verdot", "pct": 2 },
      { "name": "Carmenère", "pct": 1 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "70-120",
    "aromas": {
      "fruit": ["cassis", "myrtille"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 62, "Épicé": 65, "Terreux": 58, "Boisé": 65, "Végétal": 38, "Minéral": 55, "Empyreumatique": 48 },
    "pairings": ["Magret", "Selle d'agneau", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 1830,
      "owner": "Héritiers de la Baronne Philippine de Rothschild",
      "surface": "41 ha",
      "terroir": "Mosaïque de graves fines sur sous-sol calcaire",
      "soil": ["Graves", "Sables"],
      "climate": "Océanique tempéré",
      "description": "Voisin de Mouton Rothschild. Rare exemple de Pauillac avec Carmenère. Chai inauguré en 2011."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Précision remarquable." },
      "2019": { "score": 94, "notes": "Harmonieux." },
      "2018": { "score": 93, "notes": "Charme et profondeur." },
      "2016": { "score": 94, "notes": "Classicisme." }
    },
    "tags": ["Classé", "Pauillac", "Rothschild"]
  },
  {
    "id": "ref-117",
    "name": "Château Batailley",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5B1424",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 70 },
      { "name": "Merlot", "pct": 24 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 50, "Épicé": 60, "Terreux": 55, "Boisé": 55, "Végétal": 42, "Minéral": 50, "Empyreumatique": 45 },
    "pairings": ["Rôti de bœuf", "Canard rôti", "Mimolette vieille"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1791,
      "owner": "Famille Castéja",
      "surface": "60 ha",
      "terroir": "Graves profondes au sud de Pauillac",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Cru fiable, souvent cité comme le meilleur rapport qualité-prix des classés de 1855. Style classique et charpenté."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Classique fiable." },
      "2019": { "score": 93, "notes": "Grand Batailley." },
      "2018": { "score": 92, "notes": "Droit et pur." },
      "2016": { "score": 93, "notes": "Référence." }
    },
    "tags": ["Classé", "Rapport qualité-prix", "Pauillac"]
  },
  {
    "id": "ref-118",
    "name": "Château Duhart-Milon",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#591120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 72 },
      { "name": "Merlot", "pct": 28 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "60-100",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 65, "Terreux": 60, "Boisé": 62, "Végétal": 38, "Minéral": 58, "Empyreumatique": 48 },
    "pairings": ["Tournedos", "Pigeonneau", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 1815,
      "owner": "Domaines Barons de Rothschild (Lafite)",
      "surface": "76 ha",
      "terroir": "Plateau mitoyen de Lafite",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Propriété des Rothschild (Lafite) depuis 1962. Seul 4ème cru classé de Pauillac. Style raffiné et élégant."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Énergie et classe." },
      "2019": { "score": 94, "notes": "Élégance Lafite." },
      "2018": { "score": 93, "notes": "Précis et racé." },
      "2016": { "score": 94, "notes": "Millésime de référence." }
    },
    "tags": ["Classé", "Pauillac", "Rothschild"]
  },
  {
    "id": "ref-119",
    "name": "Château Haut-Bages Libéral",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 80 },
      { "name": "Merlot", "pct": 20 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["poivre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 68, "Terreux": 65, "Boisé": 55, "Végétal": 40, "Minéral": 62, "Empyreumatique": 45 },
    "pairings": ["Agneau", "Magret", "Tomme"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["Biodynamie"],
    "estate": {
      "founded": 1855,
      "owner": "Claire Villars-Lurton",
      "surface": "30 ha",
      "terroir": "Plateau de Bages, voisin de Latour",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Conversion biodynamique sous Claire Villars-Lurton. Voisin direct de Château Latour. Grand potentiel méconnu."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Biodynamie vibrante." },
      "2019": { "score": 93, "notes": "Pur et précis." },
      "2018": { "score": 92, "notes": "Dynamique." }
    },
    "tags": ["Classé", "Biodynamie", "Pauillac"]
  },

  // ─── SAINT-JULIEN ─────────────────────────────────────────────────────────
  {
    "id": "ref-120",
    "name": "Château Léoville Las Cases",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A1021",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 75 },
      { "name": "Merlot", "pct": 15 },
      { "name": "Cabernet Franc", "pct": 10 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "150-280",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise noire"],
      "floral": ["violette", "iris"],
      "spicy": ["cèdre", "poivre noir"],
      "earthy": ["graphite", "truffe"],
      "wood": ["cacao", "vanille"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 60, "Épicé": 75, "Terreux": 72, "Boisé": 75, "Végétal": 35, "Minéral": 65, "Empyreumatique": 55 },
    "pairings": ["Pigeonneau", "Agneau de lait", "Comté âgé"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1638,
      "owner": "Famille Delon",
      "surface": "98 ha (Grand Enclos)",
      "terroir": "Grand Enclos en bordure de Gironde, mitoyen de Latour",
      "soil": ["Graves profondes", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Dirigé par Jean-Hubert Delon. 'Super-second' historique, souvent comparé aux Premiers crus. Prix en conséquence."
    },
    "vintages": {
      "2022": { "score": 97, "notes": "Monumental." },
      "2020": { "score": 97, "notes": "Trilogie au sommet." },
      "2019": { "score": 97, "notes": "Majestueux." },
      "2018": { "score": 97, "notes": "Historique." },
      "2016": { "score": 98, "notes": "Légendaire." },
      "2010": { "score": 99, "notes": "Monument." }
    },
    "tags": ["Classé", "Super-second", "Garde longue", "Saint-Julien"]
  },
  {
    "id": "ref-121",
    "name": "Château Léoville Poyferré",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 61 },
      { "name": "Merlot", "pct": 27 },
      { "name": "Petit Verdot", "pct": 8 },
      { "name": "Cabernet Franc", "pct": 4 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "90-150",
    "aromas": {
      "fruit": ["cassis", "prune", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "vanille"],
      "earthy": ["graphite"],
      "wood": ["moka", "cacao"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 58, "Épicé": 68, "Terreux": 62, "Boisé": 72, "Végétal": 38, "Minéral": 60, "Empyreumatique": 55 },
    "pairings": ["Magret", "Carré d'agneau", "Cheddar affiné"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1840,
      "owner": "Famille Cuvelier",
      "surface": "80 ha",
      "terroir": "Graves profondes sur sous-sol argileux",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Signature généreuse et veloutée sous Didier Cuvelier puis Sara Lecompte Cuvelier. Consultant : Michel Rolland."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Opulent et ciselé." },
      "2019": { "score": 95, "notes": "Grande harmonie." },
      "2018": { "score": 95, "notes": "Solaire." },
      "2016": { "score": 96, "notes": "Référence." }
    },
    "tags": ["Classé", "Saint-Julien", "Opulence"]
  },
  {
    "id": "ref-122",
    "name": "Château Léoville Barton",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A1120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 74 },
      { "name": "Merlot", "pct": 23 },
      { "name": "Cabernet Franc", "pct": 3 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-140",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["tabac", "graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 55, "Épicé": 70, "Terreux": 68, "Boisé": 65, "Végétal": 40, "Minéral": 62, "Empyreumatique": 52 },
    "pairings": ["Côte de bœuf", "Agneau", "Stilton"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 10, "to": 35 },
    "labels": [],
    "estate": {
      "founded": 1826,
      "owner": "Famille Barton (Anthony & Lilian)",
      "surface": "50 ha",
      "terroir": "Graves profondes de Saint-Julien",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Famille Barton depuis 1826 — une des dynasties les plus anciennes du Médoc. Style classique, droit, très 'British'."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Pur classique." },
      "2019": { "score": 95, "notes": "Grand Barton." },
      "2018": { "score": 94, "notes": "Structure noble." },
      "2016": { "score": 95, "notes": "Référence." }
    },
    "tags": ["Classé", "Saint-Julien", "Classicisme"]
  },
  {
    "id": "ref-123",
    "name": "Château Ducru-Beaucaillou",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 85 },
      { "name": "Merlot", "pct": 15 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "150-250",
    "aromas": {
      "fruit": ["cassis", "myrtille", "cerise noire"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "terre"],
      "wood": ["cacao", "moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 87, "Floral": 58, "Épicé": 72, "Terreux": 68, "Boisé": 75, "Végétal": 32, "Minéral": 62, "Empyreumatique": 60 },
    "pairings": ["Côte de bœuf", "Gibier à plumes", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1720,
      "owner": "Famille Borie (Bruno Borie)",
      "surface": "75 ha",
      "terroir": "'Beaux cailloux' — terrasses de graves en bordure d'estuaire",
      "soil": ["Graves günziennes"],
      "climate": "Océanique tempéré",
      "description": "Bruno Borie. 'Super-second' très coté. Signature très 'Cabernet', droiture, longévité exceptionnelle."
    },
    "vintages": {
      "2022": { "score": 97, "notes": "Monument." },
      "2020": { "score": 96, "notes": "Majestueux." },
      "2019": { "score": 97, "notes": "Pur et grand." },
      "2018": { "score": 96, "notes": "Historique." },
      "2016": { "score": 97, "notes": "Légendaire." }
    },
    "tags": ["Classé", "Super-second", "Saint-Julien", "Garde longue"]
  },
  {
    "id": "ref-124",
    "name": "Château Gruaud Larose",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#591121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 63 },
      { "name": "Merlot", "pct": 27 },
      { "name": "Cabernet Franc", "pct": 7 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "70-120",
    "aromas": {
      "fruit": ["cassis", "prune", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "réglisse"],
      "earthy": ["graphite", "humus"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 83, "Floral": 55, "Épicé": 68, "Terreux": 72, "Boisé": 65, "Végétal": 42, "Minéral": 60, "Empyreumatique": 55 },
    "pairings": ["Gigot d'agneau", "Faisan", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 35 },
    "labels": ["HVE", "Bio (conversion)"],
    "estate": {
      "founded": 1725,
      "owner": "Famille Merlaut",
      "surface": "82 ha",
      "terroir": "Plateau continu, très homogène",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "'Le roi des vins, le vin des rois' — devise historique. Conversion bio en cours. Style structuré avec belle trame tannique."
    },
    "vintages": {
      "2020": { "score": 94, "notes": "Classicisme profond." },
      "2019": { "score": 95, "notes": "Grand Gruaud." },
      "2018": { "score": 94, "notes": "Ample." },
      "2016": { "score": 95, "notes": "Magistral." }
    },
    "tags": ["Classé", "Saint-Julien", "Garde longue"]
  },
  {
    "id": "ref-125",
    "name": "Château Beychevelle",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5B1323",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Petit Verdot", "pct": 3 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "70-130",
    "aromas": {
      "fruit": ["cassis", "cerise", "prune"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 65, "Épicé": 60, "Terreux": 55, "Boisé": 68, "Végétal": 38, "Minéral": 55, "Empyreumatique": 50 },
    "pairings": ["Canard", "Bœuf braisé", "Mimolette"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1565,
      "owner": "Castel + Suntory",
      "surface": "90 ha",
      "terroir": "Graves günziennes en bordure d'estuaire",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Le 'Versailles du Médoc'. Propriété emblématique avec château du XVIIe. Nouveau chai inauguré 2016."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Soyeux." },
      "2019": { "score": 94, "notes": "Charmeur." },
      "2018": { "score": 93, "notes": "Suave." },
      "2016": { "score": 94, "notes": "Référence." }
    },
    "tags": ["Classé", "Saint-Julien", "Charme"]
  },
  {
    "id": "ref-126",
    "name": "Château Talbot",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5A1121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 66 },
      { "name": "Merlot", "pct": 26 },
      { "name": "Petit Verdot", "pct": 5 },
      { "name": "Cabernet Franc", "pct": 3 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 52, "Épicé": 65, "Terreux": 60, "Boisé": 60, "Végétal": 40, "Minéral": 55, "Empyreumatique": 50 },
    "pairings": ["Entrecôte", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1707,
      "owner": "Famille Cordier-Bignon",
      "surface": "110 ha",
      "terroir": "Plateau central de Saint-Julien",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Une des plus grandes propriétés du Médoc, 110 ha d'un seul tenant. Produit aussi un blanc réputé, le Caillou Blanc."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Droit et précis." },
      "2019": { "score": 93, "notes": "Grand Talbot." },
      "2018": { "score": 92, "notes": "Harmonieux." },
      "2016": { "score": 93, "notes": "Équilibré." }
    },
    "tags": ["Classé", "Saint-Julien", "Grand vignoble"]
  },
  {
    "id": "ref-127",
    "name": "Château Branaire-Ducru",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 28 },
      { "name": "Petit Verdot", "pct": 4 },
      { "name": "Cabernet Franc", "pct": 3 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-80",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 55, "Épicé": 62, "Terreux": 58, "Boisé": 58, "Végétal": 42, "Minéral": 55, "Empyreumatique": 45 },
    "pairings": ["Bœuf bourguignon", "Canard", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1680,
      "owner": "Famille Maroteaux",
      "surface": "60 ha",
      "terroir": "Graves günziennes, plateau sud",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "François-Xavier Maroteaux. Style classique, fraîcheur, digestibilité. Rapport qualité-prix souvent cité comme un des meilleurs du classement."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Précision classique." },
      "2019": { "score": 94, "notes": "Grand Branaire." },
      "2018": { "score": 92, "notes": "Harmonie." },
      "2016": { "score": 94, "notes": "Élégance." }
    },
    "tags": ["Classé", "Rapport qualité-prix", "Saint-Julien"]
  },
  {
    "id": "ref-128",
    "name": "Château Saint-Pierre",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5A1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 75 },
      { "name": "Merlot", "pct": 15 },
      { "name": "Cabernet Franc", "pct": 10 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 55, "Épicé": 68, "Terreux": 62, "Boisé": 62, "Végétal": 40, "Minéral": 58, "Empyreumatique": 48 },
    "pairings": ["Gigot", "Magret", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 1693,
      "owner": "Famille Triaud",
      "surface": "17 ha",
      "terroir": "Petit domaine aux vignes très bien placées",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Un des plus petits classés. Style dense et racé, souvent sous-estimé. Propriétaire aussi de Gloria."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Structure noble." },
      "2019": { "score": 94, "notes": "Dense et pur." },
      "2018": { "score": 93, "notes": "Velouté." }
    },
    "tags": ["Classé", "Saint-Julien", "Discret"]
  },
  {
    "id": "ref-129",
    "name": "Château Lagrange",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#591121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 28 },
      { "name": "Petit Verdot", "pct": 7 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 50, "Épicé": 62, "Terreux": 58, "Boisé": 60, "Végétal": 40, "Minéral": 55, "Empyreumatique": 45 },
    "pairings": ["Bœuf grillé", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1855,
      "owner": "Suntory (Japon)",
      "surface": "113 ha",
      "terroir": "Plateau intérieur, sols variés",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Racheté par Suntory en 1983 — référence d'une gestion japonaise méticuleuse. Progression qualitative spectaculaire."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Précision nippone." },
      "2019": { "score": 93, "notes": "Grand Lagrange." },
      "2018": { "score": 92, "notes": "Dense." },
      "2016": { "score": 93, "notes": "Référence." }
    },
    "tags": ["Classé", "Rapport qualité-prix", "Saint-Julien"]
  },

  // ─── SAINT-ESTÈPHE ────────────────────────────────────────────────────────
  {
    "id": "ref-130",
    "name": "Château Cos d'Estournel",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A0F1E",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 62 },
      { "name": "Merlot", "pct": 36 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "150-280",
    "aromas": {
      "fruit": ["cassis", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "gingembre", "épices orientales"],
      "earthy": ["graphite", "tabac", "cuir"],
      "wood": ["cacao", "moka"]
    },
    "aromaWheel": { "Fruit": 87, "Floral": 60, "Épicé": 80, "Terreux": 72, "Boisé": 75, "Végétal": 32, "Minéral": 62, "Empyreumatique": 65 },
    "pairings": ["Magret laqué", "Canard pékinois", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 40 },
    "labels": [],
    "estate": {
      "founded": 1811,
      "owner": "Michel Reybier",
      "surface": "91 ha",
      "terroir": "Plateau de Cos, face à Lafite Rothschild",
      "soil": ["Graves günziennes", "Argile"],
      "climate": "Océanique tempéré",
      "description": "'Château des Pagodes', signature orientaliste. Chai gravitaire ultra-moderne. Dirigé par Aymeric de Gironde puis Dominique Arangoits."
    },
    "vintages": {
      "2022": { "score": 97, "notes": "Intense et racé." },
      "2020": { "score": 97, "notes": "Exceptionnel." },
      "2019": { "score": 97, "notes": "Monument." },
      "2018": { "score": 97, "notes": "Historique." },
      "2016": { "score": 98, "notes": "Sommet." }
    },
    "tags": ["Classé", "Super-second", "Saint-Estèphe"]
  },
  {
    "id": "ref-131",
    "name": "Château Montrose",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 66 },
      { "name": "Merlot", "pct": 28 },
      { "name": "Cabernet Franc", "pct": 4 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "120-220",
    "aromas": {
      "fruit": ["cassis", "mûre", "cerise"],
      "floral": ["violette", "iris"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "truffe"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 60, "Épicé": 72, "Terreux": 75, "Boisé": 70, "Végétal": 35, "Minéral": 72, "Empyreumatique": 60 },
    "pairings": ["Côte de bœuf", "Agneau", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 12, "to": 40 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1815,
      "owner": "Famille Bouygues",
      "surface": "95 ha",
      "terroir": "Plateau en bordure de Gironde",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Rachat par Martin et Olivier Bouygues en 2006. 'Le Latour de Saint-Estèphe'. Puissance et longévité exceptionnelles."
    },
    "vintages": {
      "2020": { "score": 96, "notes": "Monumental." },
      "2019": { "score": 97, "notes": "Grande classe." },
      "2018": { "score": 96, "notes": "Solaire." },
      "2016": { "score": 97, "notes": "Légendaire." },
      "2010": { "score": 98, "notes": "Monument." }
    },
    "tags": ["Classé", "Super-second", "Garde longue", "Saint-Estèphe"]
  },
  {
    "id": "ref-132",
    "name": "Château Calon Ségur",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 20 },
      { "name": "Cabernet Franc", "pct": 12 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-140",
    "aromas": {
      "fruit": ["cassis", "cerise", "mûre"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 70, "Épicé": 62, "Terreux": 68, "Boisé": 62, "Végétal": 38, "Minéral": 62, "Empyreumatique": 50 },
    "pairings": ["Agneau", "Canard", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1718,
      "owner": "Suravenir Assurances (Crédit Mutuel Arkéa)",
      "surface": "93 ha",
      "terroir": "Nord de Saint-Estèphe, plateau argilo-calcaire",
      "soil": ["Graves", "Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "'Mon cœur est à Calon' — Marquis de Ségur. Cœur sur étiquette. Vinification rénovée depuis 2012. Laurent Dufau directeur."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grand Calon." },
      "2019": { "score": 95, "notes": "Précision rare." },
      "2018": { "score": 94, "notes": "Dense." },
      "2016": { "score": 96, "notes": "Historique." }
    },
    "tags": ["Classé", "Saint-Estèphe", "Cœur"]
  },
  {
    "id": "ref-133",
    "name": "Château Lafon-Rochet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5A1120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Cabernet Franc", "pct": 3 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 52, "Épicé": 60, "Terreux": 60, "Boisé": 55, "Végétal": 45, "Minéral": 55, "Empyreumatique": 45 },
    "pairings": ["Pot-au-feu", "Confit de canard", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["Bio"],
    "estate": {
      "founded": 1960,
      "owner": "Famille Lorenzetti",
      "surface": "45 ha",
      "terroir": "Voisin de Cos d'Estournel et Lafite",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Château jaune emblématique. Repris par la famille Lorenzetti en 2021. Conversion bio en cours."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Franc et direct." },
      "2019": { "score": 92, "notes": "Gourmand." },
      "2018": { "score": 91, "notes": "Solaire." }
    },
    "tags": ["Classé", "Saint-Estèphe", "Bio"]
  },
  {
    "id": "ref-134",
    "name": "Château Cos Labory",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5B1323",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 75, "Floral": 50, "Épicé": 58, "Terreux": 58, "Boisé": 52, "Végétal": 42, "Minéral": 55, "Empyreumatique": 42 },
    "pairings": ["Bœuf grillé", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 30 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": [],
    "estate": {
      "founded": 1855,
      "owner": "Audoy puis famille Lorenzetti (2022)",
      "surface": "18 ha",
      "terroir": "Voisin de Cos d'Estournel",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Petit classé discret. Rachat récent par les Lorenzetti (Lafon-Rochet). Montée en puissance attendue."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Classique." },
      "2019": { "score": 91, "notes": "Franc." },
      "2018": { "score": 90, "notes": "Correct." }
    },
    "tags": ["Classé", "Saint-Estèphe", "Accessible"]
  },
  {
    "id": "ref-135",
    "name": "Château Meyney",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Petit Verdot", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "25-45",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 50, "Épicé": 60, "Terreux": 65, "Boisé": 55, "Végétal": 40, "Minéral": 60, "Empyreumatique": 45 },
    "pairings": ["Magret", "Bœuf braisé", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1662,
      "owner": "CA Grands Crus (Crédit Agricole)",
      "surface": "51 ha",
      "terroir": "Plateau face à l'estuaire, voisin de Montrose",
      "soil": ["Argile bleue", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Terroir d'argile bleue unique en Médoc. 'Le plus sous-coté des Saint-Estèphe' selon nombre de critiques."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Belle pureté." },
      "2019": { "score": 93, "notes": "Excellent Meyney." },
      "2018": { "score": 92, "notes": "Classique." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Rapport qualité-prix", "Saint-Estèphe"]
  },
  {
    "id": "ref-136",
    "name": "Château Phélan Ségur",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 42 },
      { "name": "Petit Verdot", "pct": 3 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 62, "Terreux": 60, "Boisé": 58, "Végétal": 40, "Minéral": 58, "Empyreumatique": 48 },
    "pairings": ["Gigot", "Canard", "Cantal vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1805,
      "owner": "Famille Gardinier",
      "surface": "70 ha",
      "terroir": "Graves günziennes face à l'estuaire",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Étonnamment absent du classement 1855 malgré son rang historique. Niveau de classé assumé."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Excellente tenue." },
      "2019": { "score": 93, "notes": "Grand Phélan." },
      "2018": { "score": 92, "notes": "Précis." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Rapport qualité-prix", "Saint-Estèphe"]
  },
  {
    "id": "ref-137",
    "name": "Château Ormes de Pez",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe",
    "classification": "",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 52 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Cabernet Franc", "pct": 6 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "28-45",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 50, "Épicé": 58, "Terreux": 58, "Boisé": 55, "Végétal": 40, "Minéral": 55, "Empyreumatique": 45 },
    "pairings": ["Bœuf bourguignon", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 30 min", "verre": "Bordeaux" },
    "guard": { "from": 4, "to": 15 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1937,
      "owner": "Famille Cazes",
      "surface": "40 ha",
      "terroir": "Commune de Saint-Estèphe, hameau de Pez",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Petit frère de Lynch-Bages, famille Cazes. Vin de bistrot chic par excellence."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Accessible." },
      "2019": { "score": 91, "notes": "Gourmand." },
      "2018": { "score": 90, "notes": "Souple." }
    },
    "tags": ["Rapport qualité-prix", "Saint-Estèphe", "Cazes"]
  },
  {
    "id": "ref-138",
    "name": "Château Haut-Marbuzet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 50 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Cabernet Franc", "pct": 10 }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "40-70",
    "aromas": {
      "fruit": ["cassis", "mûre", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre", "vanille"],
      "earthy": ["tabac", "cuir"],
      "wood": ["moka", "cacao"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 55, "Épicé": 70, "Terreux": 62, "Boisé": 75, "Végétal": 35, "Minéral": 55, "Empyreumatique": 60 },
    "pairings": ["Gibier", "Confit", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": [],
    "estate": {
      "founded": 1952,
      "owner": "Famille Duboscq",
      "surface": "65 ha",
      "terroir": "Plateau de Marbuzet",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Style opulent, élevage 100% fûts neufs. Vin culte des années 1980-90, toujours coté."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Opulent." },
      "2019": { "score": 93, "notes": "Grand Marbuzet." },
      "2018": { "score": 93, "notes": "Solaire." }
    },
    "tags": ["Saint-Estèphe", "Opulence", "Cultissime"]
  },

  // ─── MARGAUX ──────────────────────────────────────────────────────────────
  {
    "id": "ref-139",
    "name": "Château Palmer",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5A0F1E",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 46 },
      { "name": "Merlot", "pct": 47 },
      { "name": "Petit Verdot", "pct": 7 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "250-450",
    "aromas": {
      "fruit": ["cassis", "cerise noire", "mûre"],
      "floral": ["violette", "iris", "rose"],
      "spicy": ["cèdre", "cardamome", "safran"],
      "earthy": ["graphite", "terre humide"],
      "wood": ["cacao", "moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 88, "Floral": 82, "Épicé": 78, "Terreux": 68, "Boisé": 75, "Végétal": 30, "Minéral": 65, "Empyreumatique": 55 },
    "pairings": ["Pigeonneau truffé", "Selle d'agneau", "Brebis Ossau-Iraty"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 10, "to": 45 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1814,
      "owner": "Familles Mähler-Besse et Sichel",
      "surface": "66 ha",
      "terroir": "Plateau de Cantenac-Margaux",
      "soil": ["Graves günziennes", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Considéré comme un Premier cru officieux. Biodynamie totale depuis 2008. Thomas Duroux directeur."
    },
    "vintages": {
      "2022": { "score": 98, "notes": "Sommet absolu." },
      "2020": { "score": 98, "notes": "Magistral." },
      "2019": { "score": 98, "notes": "Monument." },
      "2018": { "score": 97, "notes": "Légendaire." },
      "2016": { "score": 99, "notes": "Historique." }
    },
    "tags": ["Classé", "Biodynamie", "Culte", "Margaux"]
  },
  {
    "id": "ref-140",
    "name": "Château Rauzan-Ségla",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5B1323",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 36 },
      { "name": "Petit Verdot", "pct": 3 },
      { "name": "Cabernet Franc", "pct": 1 }
    ],
    "alcoholRange": "13-14",
    "priceRange": "100-180",
    "aromas": {
      "fruit": ["cassis", "cerise", "myrtille"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka", "vanille"]
    },
    "aromaWheel": { "Fruit": 85, "Floral": 75, "Épicé": 65, "Terreux": 60, "Boisé": 68, "Végétal": 35, "Minéral": 62, "Empyreumatique": 50 },
    "pairings": ["Agneau de lait", "Pigeonneau", "Comté vieux"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 30 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1661,
      "owner": "Maison Chanel (Wertheimer)",
      "surface": "70 ha",
      "terroir": "Plateau de Margaux",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Chanel depuis 1994. John Kolasa puis Nicolas Audebert à la direction. Renaissance spectaculaire."
    },
    "vintages": {
      "2020": { "score": 95, "notes": "Grande élégance." },
      "2019": { "score": 96, "notes": "Sublime." },
      "2018": { "score": 95, "notes": "Précision." },
      "2016": { "score": 97, "notes": "Historique." }
    },
    "tags": ["Classé", "Margaux", "Élégance"]
  },
  {
    "id": "ref-141",
    "name": "Château Brane-Cantenac",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 70 },
      { "name": "Merlot", "pct": 25 },
      { "name": "Cabernet Franc", "pct": 4 },
      { "name": "Carmenère", "pct": 1 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "70-120",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 70, "Épicé": 62, "Terreux": 58, "Boisé": 62, "Végétal": 40, "Minéral": 60, "Empyreumatique": 48 },
    "pairings": ["Carré d'agneau", "Canard", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": [],
    "estate": {
      "founded": 1833,
      "owner": "Famille Lurton (Henri Lurton)",
      "surface": "90 ha",
      "terroir": "Plateau de Brane-Cantenac",
      "soil": ["Graves günziennes"],
      "climate": "Océanique tempéré",
      "description": "Henri Lurton. Terroir privilégié avec des sables et graves très drainants. Style classique, digeste."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Précis et racé." },
      "2019": { "score": 94, "notes": "Grand Brane." },
      "2018": { "score": 93, "notes": "Typé." },
      "2016": { "score": 94, "notes": "Référence." }
    },
    "tags": ["Classé", "Margaux", "Classicisme"]
  },
  {
    "id": "ref-142",
    "name": "Château Giscours",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#591121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Petit Verdot", "pct": 3 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 65, "Épicé": 60, "Terreux": 58, "Boisé": 60, "Végétal": 40, "Minéral": 58, "Empyreumatique": 48 },
    "pairings": ["Magret", "Rôti", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["HVE", "Bio (partiel)"],
    "estate": {
      "founded": 1552,
      "owner": "Famille Albada Jelgersma",
      "surface": "90 ha",
      "terroir": "Sud-Margaux, propriété classée Monument Historique",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Château médiéval restauré. Alexander Van Beek. Conversion bio partielle en cours."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Équilibré et gourmand." },
      "2019": { "score": 94, "notes": "Grand Giscours." },
      "2018": { "score": 93, "notes": "Harmonieux." }
    },
    "tags": ["Classé", "Margaux"]
  },
  {
    "id": "ref-143",
    "name": "Château d'Issan",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 40 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "60-100",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 75, "Épicé": 62, "Terreux": 58, "Boisé": 60, "Végétal": 38, "Minéral": 62, "Empyreumatique": 48 },
    "pairings": ["Agneau", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1152,
      "owner": "Famille Cruse",
      "surface": "53 ha",
      "terroir": "Graves profondes en bordure de Gironde",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Un des plus anciens châteaux du Médoc (XIIe siècle). Style floral et raffiné, très typé Margaux."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Fin et pur." },
      "2019": { "score": 94, "notes": "Grand Issan." },
      "2018": { "score": 93, "notes": "Élégance." }
    },
    "tags": ["Classé", "Margaux", "Historique"]
  },
  {
    "id": "ref-144",
    "name": "Château Kirwan",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 56 },
      { "name": "Merlot", "pct": 34 },
      { "name": "Petit Verdot", "pct": 7 },
      { "name": "Cabernet Franc", "pct": 3 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "45-75",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 65, "Épicé": 60, "Terreux": 55, "Boisé": 60, "Végétal": 40, "Minéral": 58, "Empyreumatique": 45 },
    "pairings": ["Rôti de bœuf", "Magret", "Mimolette"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": [],
    "estate": {
      "founded": 1710,
      "owner": "Famille Schÿler",
      "surface": "37 ha",
      "terroir": "Plateau de Cantenac",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Famille Schÿler (négoce Schröder & Schÿler). Consultant : Éric Boissenot."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Franc et précis." },
      "2019": { "score": 93, "notes": "Équilibre." },
      "2018": { "score": 92, "notes": "Classique." }
    },
    "tags": ["Classé", "Margaux"]
  },
  {
    "id": "ref-145",
    "name": "Château Cantenac Brown",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 65 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 60, "Épicé": 65, "Terreux": 58, "Boisé": 62, "Végétal": 40, "Minéral": 60, "Empyreumatique": 48 },
    "pairings": ["Pièce de bœuf", "Canard", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["Bio (conversion)", "Chai en terre crue"],
    "estate": {
      "founded": 1806,
      "owner": "Famille Le Lous",
      "surface": "48 ha",
      "terroir": "Plateau de Cantenac",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Racheté par Tristan Le Lous en 2019. Chai en terre crue inauguré en 2023 — première mondiale en Médoc."
    },
    "vintages": {
      "2022": { "score": 93, "notes": "Nouvelle ère." },
      "2020": { "score": 92, "notes": "En progrès." },
      "2019": { "score": 93, "notes": "Bon." }
    },
    "tags": ["Classé", "Margaux", "Innovation"]
  },
  {
    "id": "ref-146",
    "name": "Château Ferrière",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#591120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 32 },
      { "name": "Petit Verdot", "pct": 8 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "45-80",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 65, "Épicé": 65, "Terreux": 62, "Boisé": 55, "Végétal": 38, "Minéral": 68, "Empyreumatique": 45 },
    "pairings": ["Agneau", "Magret", "Ossau-Iraty"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1777,
      "owner": "Claire Villars-Lurton",
      "surface": "24 ha",
      "terroir": "Plateau de Margaux",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Le plus petit des classés. Biodynamie depuis 2015. Claire Villars-Lurton (également Haut-Bages Libéral)."
    },
    "vintages": {
      "2020": { "score": 92, "notes": "Vibration biodynamique." },
      "2019": { "score": 93, "notes": "Pur et vibrant." },
      "2018": { "score": 92, "notes": "Précis." }
    },
    "tags": ["Classé", "Biodynamie", "Margaux"]
  },
  {
    "id": "ref-147",
    "name": "Château Durfort-Vivens",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 2e Grand Cru Classé",
    "classification": "2e GCC 1855",
    "color": "rouge",
    "robe": "#5A1120",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 82 },
      { "name": "Merlot", "pct": 14 },
      { "name": "Cabernet Franc", "pct": 4 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-85",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 65, "Épicé": 62, "Terreux": 62, "Boisé": 55, "Végétal": 40, "Minéral": 68, "Empyreumatique": 45 },
    "pairings": ["Agneau", "Canard", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1824,
      "owner": "Famille Lurton (Gonzague Lurton)",
      "surface": "55 ha",
      "terroir": "Plateau de Margaux, très bien exposé",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Premier cru classé certifié Demeter depuis 2016. Approche biodynamique totale sous Gonzague Lurton."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Énergie biodynamique." },
      "2019": { "score": 94, "notes": "Vibrant." },
      "2018": { "score": 92, "notes": "Précis." }
    },
    "tags": ["Classé", "Biodynamie", "Margaux"]
  },
  {
    "id": "ref-148",
    "name": "Château Malescot Saint-Exupéry",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5A1121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Cabernet Franc", "pct": 6 },
      { "name": "Petit Verdot", "pct": 4 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "50-90",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 65, "Épicé": 62, "Terreux": 60, "Boisé": 65, "Végétal": 38, "Minéral": 62, "Empyreumatique": 48 },
    "pairings": ["Carré d'agneau", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 7, "to": 25 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1697,
      "owner": "Famille Zuger",
      "surface": "28 ha",
      "terroir": "Margaux central",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Jean-Luc Zuger. Consultant : Michel Rolland. Style ample, moderne, très coloré."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Grand Malescot." },
      "2019": { "score": 94, "notes": "Puissant et précis." },
      "2018": { "score": 93, "notes": "Opulent." }
    },
    "tags": ["Classé", "Margaux"]
  },
  {
    "id": "ref-149",
    "name": "Château Prieuré-Lichine",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Petit Verdot", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 60, "Épicé": 58, "Terreux": 55, "Boisé": 58, "Végétal": 40, "Minéral": 58, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 20 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1756,
      "owner": "Ballande Group",
      "surface": "78 ha",
      "terroir": "Sud-Margaux",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Ancienne propriété d'Alexis Lichine, critique et écrivain du vin. Style classique et gourmand."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Charmeur." },
      "2019": { "score": 92, "notes": "Bel équilibre." },
      "2018": { "score": 91, "notes": "Harmonieux." }
    },
    "tags": ["Classé", "Margaux", "Rapport qualité-prix"]
  },
  {
    "id": "ref-150",
    "name": "Château Marquis de Terme",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 4e Grand Cru Classé",
    "classification": "4e GCC 1855",
    "color": "rouge",
    "robe": "#5A1121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 35 },
      { "name": "Petit Verdot", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 58, "Épicé": 60, "Terreux": 58, "Boisé": 58, "Végétal": 40, "Minéral": 55, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Canard", "Mimolette"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1762,
      "owner": "Famille Sénéclauze",
      "surface": "40 ha",
      "terroir": "Cœur de Margaux",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Propriété familiale discrète. Style classique et fidèle au terroir margalais."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Honnête classique." },
      "2019": { "score": 92, "notes": "Précis." },
      "2018": { "score": 91, "notes": "Bon." }
    },
    "tags": ["Classé", "Margaux"]
  },

  // ─── HAUT-MÉDOC / LISTRAC / MOULIS ────────────────────────────────────────
  {
    "id": "ref-151",
    "name": "Château La Lagune",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Haut-Médoc 3e Grand Cru Classé",
    "classification": "3e GCC 1855",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 30 },
      { "name": "Petit Verdot", "pct": 10 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "55-95",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 60, "Épicé": 65, "Terreux": 60, "Boisé": 60, "Végétal": 40, "Minéral": 62, "Empyreumatique": 50 },
    "pairings": ["Magret", "Bœuf", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h", "verre": "Bordeaux" },
    "guard": { "from": 6, "to": 22 },
    "labels": ["Biodynamie", "Demeter"],
    "estate": {
      "founded": 1724,
      "owner": "Famille Frey",
      "surface": "80 ha",
      "terroir": "Graves günziennes à Ludon",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Le plus méridional des classés 1855. Caroline Frey. Biodynamie certifiée. Aussi Champagne Billecart-Salmon."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Biodynamie racée." },
      "2019": { "score": 94, "notes": "Grand La Lagune." },
      "2018": { "score": 93, "notes": "Pur et précis." }
    },
    "tags": ["Classé", "Biodynamie", "Haut-Médoc"]
  },
  {
    "id": "ref-152",
    "name": "Château Cantemerle",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Haut-Médoc 5e Grand Cru Classé",
    "classification": "5e GCC 1855",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 60 },
      { "name": "Merlot", "pct": 32 },
      { "name": "Cabernet Franc", "pct": 6 },
      { "name": "Petit Verdot", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-60",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 55, "Épicé": 58, "Terreux": 55, "Boisé": 55, "Végétal": 42, "Minéral": 55, "Empyreumatique": 42 },
    "pairings": ["Rôti", "Magret", "Comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1147,
      "owner": "SMABTP (mutuelle)",
      "surface": "90 ha",
      "terroir": "Graves günziennes fines",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Un des plus anciens crus du Médoc, sur des terres monastiques. Style classique et accessible."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Correct." },
      "2019": { "score": 92, "notes": "Bel équilibre." },
      "2018": { "score": 91, "notes": "Honnête." }
    },
    "tags": ["Classé", "Haut-Médoc", "Accessible"]
  },
  {
    "id": "ref-153",
    "name": "Château Sociando-Mallet",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Haut-Médoc",
    "classification": "",
    "color": "rouge",
    "robe": "#580F1E",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "35-70",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre", "poivre"],
      "earthy": ["graphite", "tabac"],
      "wood": ["moka"]
    },
    "aromaWheel": { "Fruit": 82, "Floral": 50, "Épicé": 68, "Terreux": 70, "Boisé": 65, "Végétal": 40, "Minéral": 68, "Empyreumatique": 55 },
    "pairings": ["Côte de bœuf", "Gibier", "Vieux comté"],
    "service": { "temp": "17-18°", "carafe": "Carafage 1h30", "verre": "Bordeaux XL" },
    "guard": { "from": 8, "to": 35 },
    "labels": [],
    "estate": {
      "founded": 1969,
      "owner": "Famille Gautreau",
      "surface": "85 ha",
      "terroir": "Coteau gravelo-argileux face à l'estuaire",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Jean Gautreau a hissé Sociando au niveau des classés. Boude volontairement tout classement. 'Plus classé que les classés'."
    },
    "vintages": {
      "2020": { "score": 93, "notes": "Grand Sociando." },
      "2019": { "score": 94, "notes": "Profondeur rare." },
      "2018": { "score": 93, "notes": "Structure noble." },
      "2016": { "score": 95, "notes": "Légendaire." }
    },
    "tags": ["Haut-Médoc", "Garde longue", "Culte"]
  },
  {
    "id": "ref-154",
    "name": "Château Chasse-Spleen",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Moulis-en-Médoc",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1121",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 55 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Petit Verdot", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "30-55",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 62, "Terreux": 60, "Boisé": 55, "Végétal": 40, "Minéral": 58, "Empyreumatique": 45 },
    "pairings": ["Rôti", "Canard", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1821,
      "owner": "Céline Villars-Foubet",
      "surface": "110 ha",
      "terroir": "Graves pyrénéennes",
      "soil": ["Graves", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Nom poétique emprunté à Baudelaire. Référence des Crus Bourgeois, aurait mérité le classement 1855."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Grand Chasse-Spleen." },
      "2019": { "score": 92, "notes": "Précis." },
      "2018": { "score": 91, "notes": "Gourmand." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Rapport qualité-prix", "Moulis"]
  },
  {
    "id": "ref-155",
    "name": "Château Poujeaux",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Moulis-en-Médoc",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 50 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Cabernet Franc", "pct": 5 },
      { "name": "Petit Verdot", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "25-45",
    "aromas": {
      "fruit": ["cassis", "mûre"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 52, "Épicé": 60, "Terreux": 60, "Boisé": 55, "Végétal": 40, "Minéral": 58, "Empyreumatique": 42 },
    "pairings": ["Rôti", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 30 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": [],
    "estate": {
      "founded": 1806,
      "owner": "Famille Cuvelier (Clos Fourtet)",
      "surface": "68 ha",
      "terroir": "Graves anciennes de Moulis",
      "soil": ["Graves"],
      "climate": "Océanique tempéré",
      "description": "Repris par les Cuvelier (Clos Fourtet) en 2008. Remontée qualitative nette. Un des sommets de Moulis."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Solide." },
      "2019": { "score": 91, "notes": "Précis." },
      "2018": { "score": 90, "notes": "Gourmand." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Rapport qualité-prix", "Moulis"]
  },
  {
    "id": "ref-156",
    "name": "Château Clarke",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Listrac-Médoc",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1222",
    "cepages": [
      { "name": "Merlot", "pct": 70 },
      { "name": "Cabernet Sauvignon", "pct": 28 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "25-45",
    "aromas": {
      "fruit": ["prune", "cerise"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 55, "Épicé": 58, "Terreux": 62, "Boisé": 58, "Végétal": 40, "Minéral": 62, "Empyreumatique": 45 },
    "pairings": ["Bœuf braisé", "Magret", "Mimolette"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": ["Bio (conversion)"],
    "estate": {
      "founded": 1973,
      "owner": "Baron Benjamin de Rothschild",
      "surface": "55 ha",
      "terroir": "Calcaire listracais (rare en Médoc)",
      "soil": ["Calcaire", "Argile"],
      "climate": "Océanique tempéré",
      "description": "Propriété Rothschild (branche Edmond de Rothschild). Listrac = terroir calcaire atypique. Style élégant."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Élégant." },
      "2019": { "score": 91, "notes": "Harmonieux." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Listrac", "Rothschild"]
  },
  {
    "id": "ref-157",
    "name": "Château Potensac",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Médoc",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 40 },
      { "name": "Merlot", "pct": 45 },
      { "name": "Cabernet Franc", "pct": 15 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "20-35",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 52, "Épicé": 58, "Terreux": 58, "Boisé": 52, "Végétal": 42, "Minéral": 60, "Empyreumatique": 42 },
    "pairings": ["Bœuf bourguignon", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 30 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 15 },
    "labels": ["HVE"],
    "estate": {
      "founded": 1800,
      "owner": "Famille Delon (Léoville Las Cases)",
      "surface": "80 ha",
      "terroir": "Argilo-calcaire au nord du Médoc",
      "soil": ["Argile", "Calcaire"],
      "climate": "Océanique tempéré",
      "description": "La 'démocratisation' du savoir-faire Delon (Las Cases). Rapport qualité-prix exceptionnel."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Excellent rapport." },
      "2019": { "score": 91, "notes": "Grand Potensac." },
      "2018": { "score": 90, "notes": "Précis." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Rapport qualité-prix", "Médoc", "Delon"]
  },
  {
    "id": "ref-158",
    "name": "Château Siran",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux",
    "classification": "Cru Bourgeois Exceptionnel",
    "color": "rouge",
    "robe": "#5A1221",
    "cepages": [
      { "name": "Cabernet Sauvignon", "pct": 48 },
      { "name": "Merlot", "pct": 40 },
      { "name": "Petit Verdot", "pct": 10 },
      { "name": "Cabernet Franc", "pct": 2 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "30-50",
    "aromas": {
      "fruit": ["cassis", "cerise"],
      "floral": ["violette", "rose"],
      "spicy": ["cèdre"],
      "earthy": ["tabac"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 80, "Floral": 65, "Épicé": 60, "Terreux": 58, "Boisé": 55, "Végétal": 40, "Minéral": 60, "Empyreumatique": 45 },
    "pairings": ["Agneau", "Magret", "Saint-nectaire"],
    "service": { "temp": "17-18°", "carafe": "Carafage 45 min", "verre": "Bordeaux" },
    "guard": { "from": 5, "to": 18 },
    "labels": [],
    "estate": {
      "founded": 1859,
      "owner": "Famille Miailhe",
      "surface": "25 ha",
      "terroir": "Graves et sables de Labarde",
      "soil": ["Graves", "Sable"],
      "climate": "Océanique tempéré",
      "description": "Seul Cru Bourgeois Exceptionnel de l'appellation Margaux. Style très féminin, floral."
    },
    "vintages": {
      "2020": { "score": 91, "notes": "Floral et précis." },
      "2019": { "score": 92, "notes": "Grand Siran." },
      "2018": { "score": 91, "notes": "Harmonieux." }
    },
    "tags": ["Cru Bourgeois Exceptionnel", "Margaux", "Élégance"]
  },
  {
    "id": "ref-159",
    "name": "Château Fourcas Hosten",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Listrac-Médoc",
    "classification": "Cru Bourgeois Supérieur",
    "color": "rouge",
    "robe": "#5B1322",
    "cepages": [
      { "name": "Merlot", "pct": 50 },
      { "name": "Cabernet Sauvignon", "pct": 45 },
      { "name": "Cabernet Franc", "pct": 5 }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "20-35",
    "aromas": {
      "fruit": ["cassis", "prune"],
      "floral": ["violette"],
      "spicy": ["cèdre"],
      "earthy": ["graphite"],
      "wood": ["vanille"]
    },
    "aromaWheel": { "Fruit": 78, "Floral": 55, "Épicé": 58, "Terreux": 60, "Boisé": 55, "Végétal": 40, "Minéral": 65, "Empyreumatique": 42 },
    "pairings": ["Rôti", "Magret", "Cantal"],
    "service": { "temp": "17-18°", "carafe": "Carafage 30 min", "verre": "Bordeaux" },
    "guard": { "from": 4, "to": 15 },
    "labels": ["Bio"],
    "estate": {
      "founded": 1810,
      "owner": "Famille Momméja (Hermès)",
      "surface": "47 ha",
      "terroir": "Calcaire listracais et graves",
      "soil": ["Calcaire", "Graves"],
      "climate": "Océanique tempéré",
      "description": "Racheté en 2006 par la famille Momméja (dirigeants d'Hermès). Certifié bio. Renaissance qualitative nette."
    },
    "vintages": {
      "2020": { "score": 90, "notes": "Bio précis." },
      "2019": { "score": 91, "notes": "Pur." }
    },
    "tags": ["Cru Bourgeois Supérieur", "Bio", "Listrac", "Hermès"]
  }

];

// Usage :
// window.WINE_DATABASE = [...WINE_DATABASE, ...WINE_DATABASE_PART1];
