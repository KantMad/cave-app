// ═══════════════════════════════════════════════════════════════════════════════
//  BASE DE DONNÉES RÉFÉRENTIELLE — CATALOGUE VINS
//  109 vins référencés avec données expert complètes
//  Sources : données des salons viticoles (Vignerons Indépendants),
//  guides experts, LWIN (identifiants), Open Food Facts (codes-barres)
//  
//  INTÉGRATION API :
//  • Open Food Facts : lookup par code-barres → auto-fill (intégré dans l'app)
//  • LWIN (Liv-ex) : identifiants universels
//  • Les champs personnels (quantité, emplacement, prix d'achat…) sont
//    ajoutés par l'utilisateur lors de l'ajout en cave.
// ═══════════════════════════════════════════════════════════════════════════════

const WINE_DATABASE = [
  {
    "id": "ref-001",
    "name": "Château Margaux",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Margaux 1er Grand Cru Classé",
    "classification": "1er GCC 1855",
    "color": "rouge",
    "robe": "#5A0E1A",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 87
      },
      {
        "name": "Merlot",
        "pct": 8
      },
      {
        "name": "Petit Verdot",
        "pct": 3
      },
      {
        "name": "Cabernet Franc",
        "pct": 2
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "600-1200",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise noire"
      ],
      "floral": [
        "violette",
        "rose fanée"
      ],
      "spicy": [
        "cèdre",
        "poivre noir"
      ],
      "earthy": [
        "graphite",
        "truffe"
      ],
      "wood": [
        "cacao",
        "vanille",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 60,
      "Épicé": 70,
      "Terreux": 65,
      "Boisé": 75,
      "Végétal": 30,
      "Minéral": 55,
      "Empyreumatique": 50
    },
    "pairings": [
      "Côte de bœuf",
      "Agneau de Pauillac",
      "Saint-nectaire affiné"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1572,
      "owner": "Famille Mentzelopoulos",
      "surface": "87 ha",
      "terroir": "Graves günziennes profondes",
      "soil": [
        "Graves",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Premier Grand Cru Classé en 1855, quintessence du Médoc."
    },
    "vintages": {
      "2020": {
        "score": 98,
        "notes": "Solaire, concentration et fraîcheur."
      },
      "2018": {
        "score": 99,
        "notes": "Historique."
      },
      "2016": {
        "score": 99,
        "notes": "Tanins de soie."
      },
      "2015": {
        "score": 98,
        "notes": "Soyeux, magistral."
      },
      "2010": {
        "score": 99,
        "notes": "Monument."
      }
    },
    "tags": [
      "Grand cru",
      "Prestige",
      "Garde longue"
    ]
  },
  {
    "id": "ref-002",
    "name": "Château Latour",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 1er Grand Cru Classé",
    "classification": "1er GCC 1855",
    "color": "rouge",
    "robe": "#4A0C16",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 77
      },
      {
        "name": "Merlot",
        "pct": 17
      },
      {
        "name": "Cabernet Franc",
        "pct": 4
      },
      {
        "name": "Petit Verdot",
        "pct": 2
      }
    ],
    "alcoholRange": "13-14.5",
    "priceRange": "700-1500",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "menthol"
      ],
      "earthy": [
        "graphite",
        "terre humide",
        "truffe"
      ],
      "wood": [
        "cèdre",
        "tabac",
        "havane"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 45,
      "Épicé": 75,
      "Terreux": 85,
      "Boisé": 70,
      "Végétal": 30,
      "Minéral": 75,
      "Empyreumatique": 55
    },
    "pairings": [
      "Côte de bœuf maturée",
      "Agneau grillé",
      "Cantal vieux"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 15,
      "to": 50
    },
    "labels": [],
    "estate": {
      "founded": 1331,
      "owner": "François Pinault (Artémis)",
      "surface": "90 ha",
      "terroir": "Graves profondes, L'Enclos",
      "soil": [
        "Graves garonnaises",
        "Argile",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Le plus puissant des Premiers Crus. A quitté les primeurs en 2012."
    },
    "vintages": {
      "2020": {
        "score": 98,
        "notes": "Puissance contenue."
      },
      "2018": {
        "score": 99,
        "notes": "Tanins d'anthologie."
      },
      "2016": {
        "score": 100,
        "notes": "Profondeur infinie."
      },
      "2010": {
        "score": 100,
        "notes": "Légende."
      }
    },
    "tags": [
      "Grand cru",
      "Prestige",
      "Garde très longue"
    ]
  },
  {
    "id": "ref-003",
    "name": "Château Lafite Rothschild",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 1er Grand Cru Classé",
    "classification": "1er GCC 1855",
    "color": "rouge",
    "robe": "#580E1A",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 91
      },
      {
        "name": "Merlot",
        "pct": 8.5
      },
      {
        "name": "Petit Verdot",
        "pct": 0.5
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "600-1500",
    "aromas": {
      "fruit": [
        "cassis",
        "groseille",
        "cerise"
      ],
      "floral": [
        "violette",
        "rose"
      ],
      "spicy": [
        "cèdre",
        "mine de crayon"
      ],
      "earthy": [
        "graphite"
      ],
      "wood": [
        "vanille fine",
        "tabac blond"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 65,
      "Épicé": 60,
      "Terreux": 70,
      "Boisé": 60,
      "Végétal": 35,
      "Minéral": 75,
      "Empyreumatique": 45
    },
    "pairings": [
      "Carré d'agneau",
      "Canard rôti",
      "Brie de Meaux"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 12,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1234,
      "owner": "Famille Rothschild",
      "surface": "112 ha",
      "terroir": "Graves fines sur calcaire",
      "soil": [
        "Graves fines",
        "Calcaire",
        "Sable éolien"
      ],
      "climate": "Océanique tempéré",
      "description": "L'élégance bordelaise par excellence."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Racé, élégance rare."
      },
      "2018": {
        "score": 98,
        "notes": "Puissant pour Lafite."
      },
      "2016": {
        "score": 99,
        "notes": "Subtilité et profondeur."
      },
      "2010": {
        "score": 98,
        "notes": "Classique absolu."
      }
    },
    "tags": [
      "Grand cru",
      "Prestige",
      "Élégance"
    ]
  },
  {
    "id": "ref-004",
    "name": "Château Mouton Rothschild",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 1er Grand Cru Classé",
    "classification": "1er GCC 1855 (promu 1973)",
    "color": "rouge",
    "robe": "#500E18",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 82
      },
      {
        "name": "Merlot",
        "pct": 15
      },
      {
        "name": "Cabernet Franc",
        "pct": 3
      }
    ],
    "alcoholRange": "13-14.5",
    "priceRange": "400-900",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise noire"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "cèdre",
        "épices orientales"
      ],
      "earthy": [
        "graphite",
        "encre"
      ],
      "wood": [
        "café torréfié",
        "vanille",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 50,
      "Épicé": 75,
      "Terreux": 60,
      "Boisé": 80,
      "Végétal": 25,
      "Minéral": 55,
      "Empyreumatique": 65
    },
    "pairings": [
      "Entrecôte bordelaise",
      "Gigot d'agneau",
      "Mimolette extra-vieille"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h30",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1853,
      "owner": "Famille Rothschild",
      "surface": "90 ha",
      "terroir": "Graves profondes, plateau de Mouton",
      "soil": [
        "Graves profondes",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Seul château promu Premier Cru Classé (1973). Étiquettes d'artistes."
    },
    "vintages": {
      "2018": {
        "score": 98,
        "notes": "Extraordinaire."
      },
      "2016": {
        "score": 98,
        "notes": "Cabernet Sauvignon triomphant."
      },
      "2015": {
        "score": 96,
        "notes": "Séducteur et charnu."
      }
    },
    "tags": [
      "Grand cru",
      "Prestige",
      "Art"
    ]
  },
  {
    "id": "ref-005",
    "name": "Château Haut-Brion",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan 1er Grand Cru Classé",
    "classification": "1er GCC 1855",
    "color": "rouge",
    "robe": "#5C1020",
    "cepages": [
      {
        "name": "Merlot",
        "pct": 56
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 37
      },
      {
        "name": "Cabernet Franc",
        "pct": 7
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "500-900",
    "aromas": {
      "fruit": [
        "mûre",
        "cassis",
        "cerise burlat"
      ],
      "floral": [
        "pivoine"
      ],
      "spicy": [
        "poivre blanc",
        "tabac blond"
      ],
      "earthy": [
        "graphite",
        "fumée",
        "terre chaude"
      ],
      "wood": [
        "cèdre",
        "havane",
        "torréfaction"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 50,
      "Épicé": 65,
      "Terreux": 85,
      "Boisé": 70,
      "Végétal": 25,
      "Minéral": 70,
      "Empyreumatique": 75
    },
    "pairings": [
      "Canard laqué",
      "Ris de veau",
      "Ossau-Iraty"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 35
    },
    "labels": [],
    "estate": {
      "founded": 1525,
      "owner": "Domaine Clarence Dillon",
      "surface": "51 ha",
      "terroir": "Graves profondes sur calcaire, Pessac",
      "soil": [
        "Graves",
        "Calcaire",
        "Argile"
      ],
      "climate": "Océanique, influence urbaine",
      "description": "Plus ancien des Premiers Crus Classés, classé rouge et blanc. Signature fumée unique."
    },
    "vintages": {
      "2020": {
        "score": 97,
        "notes": "Fumé envoûtant."
      },
      "2018": {
        "score": 98,
        "notes": "Grand millésime."
      },
      "2016": {
        "score": 97,
        "notes": "Précision et élégance."
      },
      "2010": {
        "score": 99,
        "notes": "Immense."
      }
    },
    "tags": [
      "Grand cru",
      "Fumé",
      "Prestige"
    ]
  },
  {
    "id": "ref-006",
    "name": "Château Léoville-Las-Cases",
    "cuvee": "Grand Vin",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2ème GCC",
    "classification": "2ème GCC 1855",
    "color": "rouge",
    "robe": "#520F1B",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 76
      },
      {
        "name": "Merlot",
        "pct": 14
      },
      {
        "name": "Cabernet Franc",
        "pct": 10
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "200-400",
    "aromas": {
      "fruit": [
        "cassis",
        "myrtille"
      ],
      "floral": [
        "iris",
        "violette"
      ],
      "spicy": [
        "cèdre",
        "menthol"
      ],
      "earthy": [
        "graphite",
        "mine de crayon"
      ],
      "wood": [
        "réglisse",
        "tabac fin"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 55,
      "Épicé": 75,
      "Terreux": 70,
      "Boisé": 65,
      "Végétal": 35,
      "Minéral": 75,
      "Empyreumatique": 45
    },
    "pairings": [
      "Carré d'agneau",
      "Pigeon rôti",
      "Cantal entre-deux"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h30",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 35
    },
    "labels": [],
    "estate": {
      "founded": 1638,
      "owner": "Jean-Hubert Delon",
      "surface": "97 ha",
      "terroir": "Graves garonnaises, face à Latour",
      "soil": [
        "Graves",
        "Argile"
      ],
      "climate": "Océanique tempéré",
      "description": "Le « super second » qui rivalise avec les Premiers Crus."
    },
    "vintages": {
      "2018": {
        "score": 97,
        "notes": "Puissant."
      },
      "2016": {
        "score": 98,
        "notes": "Monumental."
      },
      "2015": {
        "score": 96,
        "notes": "Tanins fins."
      }
    },
    "tags": [
      "Super second",
      "Garde longue"
    ]
  },
  {
    "id": "ref-007",
    "name": "Château Ducru-Beaucaillou",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Julien 2ème GCC",
    "classification": "2ème GCC 1855",
    "color": "rouge",
    "robe": "#550F1C",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 85
      },
      {
        "name": "Merlot",
        "pct": 15
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "150-300",
    "aromas": {
      "fruit": [
        "cassis",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "menthol"
      ],
      "earthy": [
        "graphite"
      ],
      "wood": [
        "cèdre",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 55,
      "Épicé": 70,
      "Terreux": 65,
      "Boisé": 60,
      "Végétal": 30,
      "Minéral": 70,
      "Empyreumatique": 45
    },
    "pairings": [
      "Côte de bœuf",
      "Pigeon",
      "Saint-Nectaire"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1720,
      "owner": "Famille Borie",
      "surface": "75 ha",
      "terroir": "Graves profondes, bord d'estuaire",
      "soil": [
        "Graves",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "L'un des plus constants des Seconds Crus. Les « beaux cailloux » de graves."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Classique et fin."
      },
      "2018": {
        "score": 97,
        "notes": "Profond."
      },
      "2016": {
        "score": 98,
        "notes": "Immense."
      }
    },
    "tags": [
      "Super second",
      "Saint-Julien"
    ]
  },
  {
    "id": "ref-008",
    "name": "Château Cos d'Estournel",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Saint-Estèphe 2ème GCC",
    "classification": "2ème GCC 1855",
    "color": "rouge",
    "robe": "#4E0E18",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 60
      },
      {
        "name": "Merlot",
        "pct": 38
      },
      {
        "name": "Cabernet Franc",
        "pct": 2
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "150-250",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "poivre",
        "épices orientales"
      ],
      "earthy": [
        "terre"
      ],
      "wood": [
        "vanille",
        "café",
        "chocolat"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 45,
      "Épicé": 80,
      "Terreux": 60,
      "Boisé": 75,
      "Végétal": 25,
      "Minéral": 55,
      "Empyreumatique": 60
    },
    "pairings": [
      "Agneau aux épices",
      "Canard confit",
      "Comté affiné"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1811,
      "owner": "Michel Reybier",
      "surface": "91 ha",
      "terroir": "Croupe de graves, face à Lafite",
      "soil": [
        "Graves",
        "Argile",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Surnommé le Maharaja de Saint-Estèphe. Pagode orientale iconique."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Épicé et profond."
      },
      "2018": {
        "score": 97,
        "notes": "Opulent."
      },
      "2016": {
        "score": 97,
        "notes": "Grand classique."
      }
    },
    "tags": [
      "Super second",
      "Épicé"
    ]
  },
  {
    "id": "ref-009",
    "name": "Château Pape Clément",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan GCC",
    "classification": "GCC de Graves",
    "color": "rouge",
    "robe": "#55101C",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 52
      },
      {
        "name": "Merlot",
        "pct": 46
      },
      {
        "name": "Petit Verdot",
        "pct": 2
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "70-120",
    "aromas": {
      "fruit": [
        "myrtille",
        "cassis"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "poivre"
      ],
      "earthy": [
        "fumée douce"
      ],
      "wood": [
        "vanille",
        "moka"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 50,
      "Épicé": 60,
      "Terreux": 55,
      "Boisé": 70,
      "Végétal": 30,
      "Minéral": 50,
      "Empyreumatique": 55
    },
    "pairings": [
      "Magret de canard",
      "Entrecôte grillée",
      "Tomme de Savoie"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 30 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1300,
      "owner": "Bernard Magrez",
      "surface": "60 ha",
      "terroir": "Graves sur calcaire, Pessac",
      "soil": [
        "Graves",
        "Calcaire"
      ],
      "climate": "Océanique",
      "description": "Créé par le pape Clément V. L'un des plus anciens vignobles bordelais."
    },
    "vintages": {
      "2019": {
        "score": 93,
        "notes": "Séduisant."
      },
      "2018": {
        "score": 95,
        "notes": "Concentré et soyeux."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Garde moyenne"
    ]
  },
  {
    "id": "ref-010",
    "name": "Château Lynch-Bages",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Médoc",
    "appellation": "Pauillac 5ème GCC",
    "classification": "5ème GCC 1855",
    "color": "rouge",
    "robe": "#520F1B",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 73
      },
      {
        "name": "Merlot",
        "pct": 22
      },
      {
        "name": "Cabernet Franc",
        "pct": 3
      },
      {
        "name": "Petit Verdot",
        "pct": 2
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-140",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "poivre",
        "menthol"
      ],
      "earthy": [
        "graphite"
      ],
      "wood": [
        "cèdre",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 60,
      "Boisé": 65,
      "Végétal": 30,
      "Minéral": 60,
      "Empyreumatique": 50
    },
    "pairings": [
      "Entrecôte",
      "Agneau grillé",
      "Tomme des Pyrénées"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1749,
      "owner": "Famille Cazes",
      "surface": "100 ha",
      "terroir": "Plateau de Bages, graves profondes",
      "soil": [
        "Graves",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Surnommé le « pauvre homme Mouton » pour son rapport qualité-prix exceptionnel parmi les classés."
    },
    "vintages": {
      "2019": {
        "score": 94,
        "notes": "Fruité et charmeur."
      },
      "2018": {
        "score": 96,
        "notes": "Grand Lynch-Bages."
      },
      "2016": {
        "score": 96,
        "notes": "Classique."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Pauillac"
    ]
  },
  {
    "id": "ref-011",
    "name": "Pétrus",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#4E0D18",
    "cepages": [
      {
        "name": "Merlot",
        "pct": 100
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "3000-6000",
    "aromas": {
      "fruit": [
        "cerise noire",
        "prune confite",
        "figue"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "réglisse"
      ],
      "earthy": [
        "truffe noire",
        "argile",
        "fer"
      ],
      "wood": [
        "chocolat noir",
        "café torréfié"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 65,
      "Épicé": 70,
      "Terreux": 90,
      "Boisé": 75,
      "Végétal": 20,
      "Minéral": 80,
      "Empyreumatique": 60
    },
    "pairings": [
      "Truffe noire entière",
      "Filet de bœuf Rossini",
      "Vieux parmesan"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 15,
      "to": 50
    },
    "labels": [],
    "estate": {
      "founded": 1770,
      "owner": "Famille Moueix",
      "surface": "11,5 ha",
      "terroir": "Boutonnière d'argile bleue",
      "soil": [
        "Argile bleue",
        "Fer"
      ],
      "climate": "Océanique continental",
      "description": "Vignoble mythique de Pomerol. Argile bleue unique, 100% Merlot."
    },
    "vintages": {
      "2020": {
        "score": 99,
        "notes": "Velours absolu."
      },
      "2018": {
        "score": 100,
        "notes": "Perfection."
      },
      "2016": {
        "score": 99,
        "notes": "Tellurique."
      },
      "2010": {
        "score": 100,
        "notes": "Éternel."
      }
    },
    "tags": [
      "Collection",
      "Prestige",
      "Merlot"
    ]
  },
  {
    "id": "ref-012",
    "name": "Château Cheval Blanc",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion 1er GCC A",
    "classification": "1er GCC A",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      {
        "name": "Cabernet Franc",
        "pct": 52
      },
      {
        "name": "Merlot",
        "pct": 43
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 5
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "500-1200",
    "aromas": {
      "fruit": [
        "framboise",
        "mûre",
        "cerise confite"
      ],
      "floral": [
        "pivoine",
        "violette"
      ],
      "spicy": [
        "épices douces",
        "menthol"
      ],
      "earthy": [
        "truffe",
        "terre chaude"
      ],
      "wood": [
        "vanille",
        "torréfaction"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 70,
      "Épicé": 60,
      "Terreux": 65,
      "Boisé": 65,
      "Végétal": 35,
      "Minéral": 55,
      "Empyreumatique": 50
    },
    "pairings": [
      "Pigeon en croûte",
      "Veau rôti",
      "Époisses"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1832,
      "owner": "LVMH & Albert Frère",
      "surface": "39 ha",
      "terroir": "Graves, sables, argiles, frontière Pomerol",
      "soil": [
        "Graves",
        "Sable",
        "Argile",
        "Crasse de fer"
      ],
      "climate": "Océanique continental",
      "description": "Premier GCC A à dominante Cabernet Franc. Frontière de Pomerol."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Harmonieux."
      },
      "2018": {
        "score": 98,
        "notes": "Opulent et précis."
      },
      "2016": {
        "score": 99,
        "notes": "Monumental."
      }
    },
    "tags": [
      "Grand cru",
      "Cabernet Franc",
      "Prestige"
    ]
  },
  {
    "id": "ref-013",
    "name": "Château Ausone",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion 1er GCC A",
    "classification": "1er GCC A",
    "color": "rouge",
    "robe": "#520E1A",
    "cepages": [
      {
        "name": "Cabernet Franc",
        "pct": 55
      },
      {
        "name": "Merlot",
        "pct": 45
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "500-1000",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "réglisse",
        "menthol"
      ],
      "earthy": [
        "pierre calcaire",
        "minerai"
      ],
      "wood": [
        "vanille",
        "encens"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 55,
      "Épicé": 65,
      "Terreux": 80,
      "Boisé": 60,
      "Végétal": 30,
      "Minéral": 85,
      "Empyreumatique": 45
    },
    "pairings": [
      "Lièvre à la royale",
      "Filet de bœuf",
      "Parmigiano 36 mois"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h30",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 12,
      "to": 45
    },
    "labels": [],
    "estate": {
      "founded": 350,
      "owner": "Famille Vauthier",
      "surface": "7 ha",
      "terroir": "Calcaire à astéries, coteau sud",
      "soil": [
        "Calcaire à astéries",
        "Argile"
      ],
      "climate": "Océanique continental",
      "description": "Perché sur le plateau calcaire. L'un des plus petits et anciens Premiers Crus A."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Calcaire vibrant."
      },
      "2018": {
        "score": 99,
        "notes": "Immense Ausone."
      },
      "2016": {
        "score": 99,
        "notes": "Précision absolue."
      }
    },
    "tags": [
      "Grand cru",
      "Minéral",
      "Calcaire"
    ]
  },
  {
    "id": "ref-014",
    "name": "Château Le Pin",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#500E1A",
    "cepages": [
      {
        "name": "Merlot",
        "pct": 100
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "2000-4000",
    "aromas": {
      "fruit": [
        "cerise noire",
        "prune",
        "framboise confite"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "cannelle",
        "vanille"
      ],
      "earthy": [
        "truffe",
        "terre"
      ],
      "wood": [
        "chocolat",
        "café"
      ]
    },
    "aromaWheel": {
      "Fruit": 92,
      "Floral": 55,
      "Épicé": 60,
      "Terreux": 75,
      "Boisé": 80,
      "Végétal": 20,
      "Minéral": 55,
      "Empyreumatique": 65
    },
    "pairings": [
      "Truffe fraîche",
      "Veau de lait",
      "Brillat-Savarin"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h30",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1979,
      "owner": "Jacques Thienpont",
      "surface": "2,7 ha",
      "terroir": "Argile et gravier, Pomerol",
      "soil": [
        "Argile",
        "Gravier"
      ],
      "climate": "Océanique continental",
      "description": "Vin de garagiste devenu légende. Micro-production de 500-600 caisses."
    },
    "vintages": {
      "2018": {
        "score": 98,
        "notes": "Soyeux et profond."
      },
      "2016": {
        "score": 97,
        "notes": "Séducteur."
      },
      "2015": {
        "score": 97,
        "notes": "Velours."
      }
    },
    "tags": [
      "Culte",
      "Garagiste",
      "Rare"
    ]
  },
  {
    "id": "ref-015",
    "name": "Château Figeac",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Saint-Émilion 1er GCC A",
    "classification": "1er GCC A (2022)",
    "color": "rouge",
    "robe": "#581220",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 37
      },
      {
        "name": "Cabernet Franc",
        "pct": 33
      },
      {
        "name": "Merlot",
        "pct": 30
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "120-250",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise"
      ],
      "floral": [
        "violette",
        "rose"
      ],
      "spicy": [
        "menthol",
        "réglisse"
      ],
      "earthy": [
        "graphite",
        "terre"
      ],
      "wood": [
        "cèdre",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 60,
      "Épicé": 70,
      "Terreux": 65,
      "Boisé": 60,
      "Végétal": 35,
      "Minéral": 70,
      "Empyreumatique": 45
    },
    "pairings": [
      "Bécasse",
      "Côte de bœuf",
      "Comté 24 mois"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1892,
      "owner": "Famille Manoncourt-Lurton",
      "surface": "54 ha",
      "terroir": "Graves de Figeac, frontière Pomerol",
      "soil": [
        "Graves",
        "Sable",
        "Argile"
      ],
      "climate": "Océanique continental",
      "description": "Promu Premier GCC A en 2022. Assemblage atypique à dominante Cabernet."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Classique et élégant."
      },
      "2018": {
        "score": 98,
        "notes": "Grand Figeac."
      },
      "2016": {
        "score": 97,
        "notes": "Précis."
      }
    },
    "tags": [
      "Grand cru",
      "Cabernets"
    ]
  },
  {
    "id": "ref-016",
    "name": "Château d'Yquem",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes 1er Cru Supérieur",
    "classification": "1er Cru Supérieur 1855",
    "color": "liquoreux",
    "robe": "#D68A1A",
    "cepages": [
      {
        "name": "Sémillon",
        "pct": 80
      },
      {
        "name": "Sauvignon Blanc",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "300-600",
    "aromas": {
      "fruit": [
        "abricot confit",
        "ananas rôti",
        "coing"
      ],
      "floral": [
        "fleur d'oranger",
        "tilleul"
      ],
      "spicy": [
        "safran"
      ],
      "earthy": [],
      "wood": [
        "vanille bourbon",
        "miel d'acacia",
        "caramel blond"
      ]
    },
    "aromaWheel": {
      "Fruit": 95,
      "Floral": 80,
      "Épicé": 55,
      "Terreux": 25,
      "Boisé": 70,
      "Végétal": 15,
      "Minéral": 40,
      "Empyreumatique": 65
    },
    "pairings": [
      "Foie gras poêlé",
      "Roquefort",
      "Tarte Tatin"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 10,
      "to": 100
    },
    "labels": [],
    "estate": {
      "founded": 1593,
      "owner": "LVMH",
      "surface": "113 ha",
      "terroir": "Graves sableuses, vallée du Ciron",
      "soil": [
        "Graves",
        "Sable",
        "Argile"
      ],
      "climate": "Océanique, brouillards du Ciron",
      "description": "Seul Premier Cru Supérieur 1855. Botrytis noble, tris successifs."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Frais et aérien."
      },
      "2015": {
        "score": 96,
        "notes": "Belle acidité."
      },
      "2011": {
        "score": 97,
        "notes": "Botrytis parfait."
      },
      "2001": {
        "score": 100,
        "notes": "Mythique."
      }
    },
    "tags": [
      "Liquoreux",
      "Prestige",
      "Garde centenaire"
    ]
  },
  {
    "id": "ref-017",
    "name": "Château Suduiraut",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Sauternais",
    "appellation": "Sauternes 1er Cru Classé",
    "classification": "1er Cru Classé 1855",
    "color": "liquoreux",
    "robe": "#D08418",
    "cepages": [
      {
        "name": "Sémillon",
        "pct": 90
      },
      {
        "name": "Sauvignon Blanc",
        "pct": 10
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "40-80",
    "aromas": {
      "fruit": [
        "abricot",
        "mangue",
        "ananas"
      ],
      "floral": [
        "acacia",
        "jasmin"
      ],
      "spicy": [
        "vanille"
      ],
      "earthy": [],
      "wood": [
        "miel",
        "caramel",
        "brioche"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 70,
      "Épicé": 40,
      "Terreux": 20,
      "Boisé": 60,
      "Végétal": 15,
      "Minéral": 35,
      "Empyreumatique": 55
    },
    "pairings": [
      "Foie gras mi-cuit",
      "Tarte aux fruits",
      "Bleu d'Auvergne"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 8,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1580,
      "owner": "AXA Millésimes",
      "surface": "90 ha",
      "terroir": "Graves argileuses, Preignac",
      "soil": [
        "Graves",
        "Argile"
      ],
      "climate": "Océanique, brouillards du Ciron",
      "description": "Premier Cru de Sauternes, voisin d'Yquem. Opulence et richesse."
    },
    "vintages": {
      "2019": {
        "score": 95,
        "notes": "Opulent et frais."
      },
      "2015": {
        "score": 94,
        "notes": "Riche et équilibré."
      }
    },
    "tags": [
      "Liquoreux",
      "Rapport qualité-prix",
      "Sauternes"
    ]
  },
  {
    "id": "ref-018",
    "name": "Domaine de Chevalier",
    "cuvee": "Blanc",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan GCC",
    "classification": "GCC de Graves (blanc)",
    "color": "blanc",
    "robe": "#D8C45A",
    "cepages": [
      {
        "name": "Sauvignon Blanc",
        "pct": 70
      },
      {
        "name": "Sémillon",
        "pct": 30
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "100-180",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "citron",
        "pêche blanche"
      ],
      "floral": [
        "acacia",
        "fleur de sureau"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "fumée"
      ],
      "wood": [
        "noisette",
        "beurre",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 65,
      "Épicé": 25,
      "Terreux": 55,
      "Boisé": 60,
      "Végétal": 40,
      "Minéral": 70,
      "Empyreumatique": 50
    },
    "pairings": [
      "Homard grillé",
      "Turbot sauce hollandaise",
      "Beaufort"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage 30 min",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1783,
      "owner": "Famille Bernard",
      "surface": "5 ha (blanc)",
      "terroir": "Graves fines, clairière boisée",
      "soil": [
        "Graves",
        "Sable",
        "Argile"
      ],
      "climate": "Océanique, micro-climat",
      "description": "L'un des plus grands blancs secs de Bordeaux."
    },
    "vintages": {
      "2020": {
        "score": 96,
        "notes": "Pur et cristallin."
      },
      "2018": {
        "score": 96,
        "notes": "Opulent et minéral."
      }
    },
    "tags": [
      "Blanc sec",
      "Graves",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-019",
    "name": "Château Smith Haut Lafitte",
    "cuvee": "Blanc",
    "region": "Bordeaux",
    "subRegion": "Graves",
    "appellation": "Pessac-Léognan GCC",
    "classification": "GCC de Graves",
    "color": "blanc",
    "robe": "#D5C048",
    "cepages": [
      {
        "name": "Sauvignon Blanc",
        "pct": 90
      },
      {
        "name": "Sauvignon Gris",
        "pct": 5
      },
      {
        "name": "Sémillon",
        "pct": 5
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "80-150",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "citron vert",
        "pêche"
      ],
      "floral": [
        "fleur de sureau"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "fumée"
      ],
      "wood": [
        "vanille",
        "noisette grillée"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 60,
      "Épicé": 20,
      "Terreux": 50,
      "Boisé": 55,
      "Végétal": 50,
      "Minéral": 65,
      "Empyreumatique": 45
    },
    "pairings": [
      "Bar grillé",
      "Crevettes",
      "Chabichou du Poitou"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Servir direct",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1365,
      "owner": "Famille Cathiard",
      "surface": "11 ha (blanc)",
      "terroir": "Graves profondes, Martillac",
      "soil": [
        "Graves",
        "Calcaire"
      ],
      "climate": "Océanique",
      "description": "Domaine en bio certifié, spa aux sources de Caudalíe sur le domaine."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Tendu et aromatique."
      },
      "2019": {
        "score": 94,
        "notes": "Frais et complexe."
      }
    },
    "tags": [
      "Bio",
      "Blanc sec",
      "Graves"
    ]
  },
  {
    "id": "ref-020",
    "name": "Domaine de la Romanée-Conti",
    "cuvee": "La Tâche",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "La Tâche Grand Cru Monopole",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#6B1326",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "3000-6000",
    "aromas": {
      "fruit": [
        "framboise",
        "cerise griotte",
        "fraise des bois"
      ],
      "floral": [
        "pivoine",
        "rose"
      ],
      "spicy": [
        "cannelle",
        "clou de girofle"
      ],
      "earthy": [
        "sous-bois",
        "champignon",
        "humus"
      ],
      "wood": [
        "santal",
        "vanille fine"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 85,
      "Épicé": 65,
      "Terreux": 80,
      "Boisé": 55,
      "Végétal": 40,
      "Minéral": 70,
      "Empyreumatique": 35
    },
    "pairings": [
      "Pigeonneau rôti",
      "Bécasse",
      "Comté 36 mois"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Ouvrir 30 min",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1232,
      "owner": "de Villaine & Leroy-Roch",
      "surface": "6,06 ha (monopole)",
      "terroir": "Marno-calcaire du Bajocien",
      "soil": [
        "Marnes",
        "Calcaire du Bajocien"
      ],
      "climate": "Continental",
      "description": "Monopole du DRC. L'un des plus grands climats de la Côte de Nuits."
    },
    "vintages": {
      "2020": {
        "score": 98,
        "notes": "Lumineux."
      },
      "2019": {
        "score": 99,
        "notes": "Énergie et profondeur."
      },
      "2018": {
        "score": 99,
        "notes": "Cristallin."
      },
      "2015": {
        "score": 98,
        "notes": "Puissant pour le DRC."
      }
    },
    "tags": [
      "Grand cru",
      "Monopole",
      "Collection"
    ]
  },
  {
    "id": "ref-021",
    "name": "Domaine de la Romanée-Conti",
    "cuvee": "Romanée-Conti",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "Romanée-Conti Grand Cru Monopole",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#6A1224",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "15000-30000",
    "aromas": {
      "fruit": [
        "cerise griotte",
        "framboise",
        "fraise"
      ],
      "floral": [
        "rose ancienne",
        "pivoine",
        "violette"
      ],
      "spicy": [
        "cannelle",
        "épices fines"
      ],
      "earthy": [
        "sous-bois",
        "truffe",
        "humus",
        "terre sacrée"
      ],
      "wood": [
        "santal",
        "encens"
      ]
    },
    "aromaWheel": {
      "Fruit": 92,
      "Floral": 90,
      "Épicé": 60,
      "Terreux": 85,
      "Boisé": 50,
      "Végétal": 35,
      "Minéral": 80,
      "Empyreumatique": 30
    },
    "pairings": [
      "Bécasse",
      "Caille aux truffes",
      "Époisses affiné"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Ouvrir 1h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 40
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1232,
      "owner": "de Villaine & Leroy-Roch",
      "surface": "1,81 ha (monopole)",
      "terroir": "Calcaire bajocien, mi-coteau",
      "soil": [
        "Calcaire",
        "Marnes",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Le vin le plus mythique du monde. 1,81 ha en monopole. ~5000 bouteilles par an."
    },
    "vintages": {
      "2019": {
        "score": 100,
        "notes": "Transcendant."
      },
      "2018": {
        "score": 99,
        "notes": "Profondeur infinie."
      },
      "2017": {
        "score": 97,
        "notes": "Délicat."
      }
    },
    "tags": [
      "Grand cru",
      "Monopole",
      "Mythique"
    ]
  },
  {
    "id": "ref-022",
    "name": "Domaine Leroy",
    "cuvee": "Chambertin",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "Chambertin Grand Cru",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#701828",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "4000-8000",
    "aromas": {
      "fruit": [
        "framboise",
        "groseille",
        "cerise confite"
      ],
      "floral": [
        "rose ancienne",
        "pivoine"
      ],
      "spicy": [
        "épices douces",
        "réglisse"
      ],
      "earthy": [
        "terre humide",
        "champignon",
        "sous-bois"
      ],
      "wood": [
        "santal",
        "encens"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 80,
      "Épicé": 60,
      "Terreux": 90,
      "Boisé": 50,
      "Végétal": 45,
      "Minéral": 75,
      "Empyreumatique": 40
    },
    "pairings": [
      "Lièvre à la royale",
      "Époisses",
      "Truffe de Bourgogne"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Ouvrir 1h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 35
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1988,
      "owner": "Lalou Bize-Leroy",
      "surface": "22 ha",
      "terroir": "Marno-calcaire, combe de Gevrey",
      "soil": [
        "Marnes",
        "Calcaire",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Biodynamie intégrale, rendements ultra-bas. Pureté sans égale."
    },
    "vintages": {
      "2019": {
        "score": 99,
        "notes": "Monumental."
      },
      "2018": {
        "score": 98,
        "notes": "Puissant et fin."
      },
      "2017": {
        "score": 97,
        "notes": "Grande finesse."
      }
    },
    "tags": [
      "Biodynamie",
      "Collection",
      "Grand cru"
    ]
  },
  {
    "id": "ref-023",
    "name": "Domaine Coche-Dury",
    "cuvee": "Meursault",
    "region": "Bourgogne",
    "subRegion": "Côte de Beaune",
    "appellation": "Meursault",
    "classification": "Village",
    "color": "blanc",
    "robe": "#D6B84E",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "400-700",
    "aromas": {
      "fruit": [
        "citron confit",
        "pêche jaune",
        "amande"
      ],
      "floral": [
        "tilleul"
      ],
      "spicy": [],
      "earthy": [
        "pierre chaude",
        "silex"
      ],
      "wood": [
        "noisette grillée",
        "beurre",
        "pain grillé"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 55,
      "Épicé": 30,
      "Terreux": 60,
      "Boisé": 75,
      "Végétal": 25,
      "Minéral": 90,
      "Empyreumatique": 65
    },
    "pairings": [
      "Homard breton",
      "Poulet de Bresse à la crème",
      "Beaufort d'alpage"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage 30 min",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1920,
      "owner": "Raphaël Coche",
      "surface": "10 ha",
      "terroir": "Calcaire à entroques, argiles",
      "soil": [
        "Calcaire à entroques",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Domaine culte de Meursault. Pureté minérale au sommet."
    },
    "vintages": {
      "2020": {
        "score": 96,
        "notes": "Pur et tendu."
      },
      "2019": {
        "score": 96,
        "notes": "Profondeur rare."
      },
      "2018": {
        "score": 95,
        "notes": "Riche et équilibré."
      }
    },
    "tags": [
      "Culte",
      "Rare",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-024",
    "name": "Domaine Leflaive",
    "cuvee": "Puligny-Montrachet",
    "region": "Bourgogne",
    "subRegion": "Côte de Beaune",
    "appellation": "Puligny-Montrachet",
    "classification": "Village",
    "color": "blanc",
    "robe": "#DBC260",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "120-180",
    "aromas": {
      "fruit": [
        "poire",
        "amande fraîche",
        "pêche blanche"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [
        "cannelle douce"
      ],
      "earthy": [
        "caillou"
      ],
      "wood": [
        "noisette",
        "beurre frais",
        "brioche"
      ]
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 65,
      "Épicé": 35,
      "Terreux": 50,
      "Boisé": 70,
      "Végétal": 30,
      "Minéral": 85,
      "Empyreumatique": 55
    },
    "pairings": [
      "Ris de veau",
      "Saint-Jacques",
      "Comté affiné"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage 30 min",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1717,
      "owner": "Famille Leflaive",
      "surface": "25 ha",
      "terroir": "Calcaires du Bathonien",
      "soil": [
        "Calcaire du Bathonien",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Référence absolue du Chardonnay bourguignon. Biodynamie depuis 1990."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Tension et élégance."
      },
      "2019": {
        "score": 95,
        "notes": "Riche et minéral."
      }
    },
    "tags": [
      "Biodynamie",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-025",
    "name": "Domaine Raveneau",
    "cuvee": "Chablis Les Clos",
    "region": "Bourgogne",
    "subRegion": "Chablis",
    "appellation": "Chablis Grand Cru",
    "classification": "Grand Cru",
    "color": "blanc",
    "robe": "#D9C85A",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "150-250",
    "aromas": {
      "fruit": [
        "citron vert",
        "pomme granny",
        "poire"
      ],
      "floral": [
        "acacia"
      ],
      "spicy": [],
      "earthy": [
        "coquillage fossile",
        "pierre à fusil",
        "craie"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 50,
      "Épicé": 15,
      "Terreux": 60,
      "Boisé": 15,
      "Végétal": 40,
      "Minéral": 98,
      "Empyreumatique": 20
    },
    "pairings": [
      "Huîtres de Cancale",
      "Langoustines",
      "Escargots de Bourgogne"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Chablis"
    },
    "guard": {
      "from": 7,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1948,
      "owner": "Famille Raveneau",
      "surface": "7,5 ha",
      "terroir": "Kimméridgien, marnes à exogyra virgula",
      "soil": [
        "Kimméridgien",
        "Marnes à huîtres fossiles"
      ],
      "climate": "Continental froid",
      "description": "Référence absolue de Chablis. Minéralité kimméridgienne."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Droit et pur."
      },
      "2019": {
        "score": 96,
        "notes": "Tension cristalline."
      }
    },
    "tags": [
      "Rare",
      "Minéral",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-026",
    "name": "Domaine Georges Roumier",
    "cuvee": "Musigny",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "Musigny Grand Cru",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#6F1525",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "4000-10000",
    "aromas": {
      "fruit": [
        "framboise",
        "cerise",
        "fraise"
      ],
      "floral": [
        "rose",
        "violette"
      ],
      "spicy": [
        "épices fines"
      ],
      "earthy": [
        "sous-bois",
        "champignon"
      ],
      "wood": [
        "vanille subtile"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 90,
      "Épicé": 50,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 35,
      "Minéral": 80,
      "Empyreumatique": 30
    },
    "pairings": [
      "Perdreau rôti",
      "Filet de chevreuil",
      "Langres"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Ouvrir 30 min",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1924,
      "owner": "Christophe Roumier",
      "surface": "0,10 ha (Musigny)",
      "terroir": "Calcaire oolithique, mi-coteau",
      "soil": [
        "Calcaire oolithique",
        "Argile rouge"
      ],
      "climate": "Continental",
      "description": "Finesse légendaire. L'un des vignerons les plus respectés de Bourgogne."
    },
    "vintages": {
      "2019": {
        "score": 99,
        "notes": "Éthéré, perfection."
      },
      "2018": {
        "score": 98,
        "notes": "Profond et aérien."
      }
    },
    "tags": [
      "Culte",
      "Rare",
      "Grand cru"
    ]
  },
  {
    "id": "ref-027",
    "name": "Domaine Armand Rousseau",
    "cuvee": "Chambertin",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "Chambertin Grand Cru",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#681525",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "2000-5000",
    "aromas": {
      "fruit": [
        "cerise noire",
        "framboise",
        "cassis"
      ],
      "floral": [
        "rose",
        "pivoine"
      ],
      "spicy": [
        "réglisse",
        "poivre"
      ],
      "earthy": [
        "terre",
        "sous-bois",
        "truffe"
      ],
      "wood": [
        "chêne fin",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 70,
      "Épicé": 65,
      "Terreux": 80,
      "Boisé": 55,
      "Végétal": 35,
      "Minéral": 70,
      "Empyreumatique": 40
    },
    "pairings": [
      "Bœuf bourguignon",
      "Gibier à plumes",
      "Ami du Chambertin"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1902,
      "owner": "Famille Rousseau",
      "surface": "2,15 ha (Chambertin)",
      "terroir": "Marno-calcaire, exposition est",
      "soil": [
        "Marnes",
        "Calcaire",
        "Argile rouge"
      ],
      "climate": "Continental",
      "description": "Référence historique du Chambertin. Style classique et racé."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Puissant et fin."
      },
      "2018": {
        "score": 97,
        "notes": "Belle structure."
      }
    },
    "tags": [
      "Grand cru",
      "Classique",
      "Gevrey"
    ]
  },
  {
    "id": "ref-028",
    "name": "Domaine Comte Georges de Vogüé",
    "cuvee": "Musigny Vieilles Vignes",
    "region": "Bourgogne",
    "subRegion": "Côte de Nuits",
    "appellation": "Musigny Grand Cru",
    "classification": "Grand Cru",
    "color": "rouge",
    "robe": "#6C1424",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "800-1500",
    "aromas": {
      "fruit": [
        "cerise",
        "framboise",
        "fraise des bois"
      ],
      "floral": [
        "rose",
        "pivoine",
        "violette"
      ],
      "spicy": [
        "épices douces"
      ],
      "earthy": [
        "sous-bois",
        "terre fine"
      ],
      "wood": [
        "vanille délicate"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 85,
      "Épicé": 50,
      "Terreux": 70,
      "Boisé": 50,
      "Végétal": 35,
      "Minéral": 75,
      "Empyreumatique": 30
    },
    "pairings": [
      "Canard rôti",
      "Faisan",
      "Époisses"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Ouvrir 30 min",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1450,
      "owner": "Famille de Vogüé",
      "surface": "7,2 ha (Musigny)",
      "terroir": "Calcaire bajocien, mi-coteau",
      "soil": [
        "Calcaire",
        "Marnes"
      ],
      "climate": "Continental",
      "description": "Plus grand propriétaire en Musigny (70% du cru). Vignes centenaires."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Fin et profond."
      },
      "2018": {
        "score": 96,
        "notes": "Élégant."
      },
      "2017": {
        "score": 96,
        "notes": "Subtil."
      }
    },
    "tags": [
      "Grand cru",
      "Vieilles vignes"
    ]
  },
  {
    "id": "ref-029",
    "name": "Domaine des Comtes Lafon",
    "cuvee": "Meursault Charmes",
    "region": "Bourgogne",
    "subRegion": "Côte de Beaune",
    "appellation": "Meursault 1er Cru",
    "classification": "1er Cru",
    "color": "blanc",
    "robe": "#D8BE55",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "120-200",
    "aromas": {
      "fruit": [
        "pêche blanche",
        "poire",
        "amande"
      ],
      "floral": [
        "tilleul",
        "acacia"
      ],
      "spicy": [],
      "earthy": [
        "pierre chaude"
      ],
      "wood": [
        "beurre",
        "noisette",
        "brioche"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 60,
      "Épicé": 25,
      "Terreux": 55,
      "Boisé": 65,
      "Végétal": 30,
      "Minéral": 80,
      "Empyreumatique": 50
    },
    "pairings": [
      "Volaille de Bresse",
      "Homard grillé",
      "Beaufort"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage 30 min",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1894,
      "owner": "Dominique Lafon",
      "surface": "14 ha",
      "terroir": "Calcaire et argile, mi-coteau",
      "soil": [
        "Calcaire",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Dominique Lafon a hissé le domaine au sommet. Biodynamie depuis 1998."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Tension et gras."
      },
      "2019": {
        "score": 95,
        "notes": "Minéral et profond."
      }
    },
    "tags": [
      "Biodynamie",
      "Meursault",
      "1er Cru"
    ]
  },
  {
    "id": "ref-030",
    "name": "E. Guigal",
    "cuvee": "La Mouline",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Côte-Rôtie",
    "classification": "",
    "color": "rouge",
    "robe": "#5E1220",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 89
      },
      {
        "name": "Viognier",
        "pct": 11
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "300-500",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "poivre",
        "olive noire",
        "lard fumé"
      ],
      "earthy": [
        "graphite",
        "fumée"
      ],
      "wood": [
        "réglisse",
        "cacao",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 70,
      "Épicé": 80,
      "Terreux": 65,
      "Boisé": 80,
      "Végétal": 30,
      "Minéral": 60,
      "Empyreumatique": 70
    },
    "pairings": [
      "Chevreuil sauce grand veneur",
      "Pigeon aux épices",
      "Saint-Marcellin"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h30",
      "verre": "Syrah XL"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1946,
      "owner": "Famille Guigal",
      "surface": "60 ha",
      "terroir": "Schistes et gneiss, Côte Blonde",
      "soil": [
        "Schistes",
        "Gneiss"
      ],
      "climate": "Continental méditerranéen",
      "description": "Les mythiques « La La La ». Élevage 42 mois en fûts neufs."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Soyeuse, immense."
      },
      "2017": {
        "score": 99,
        "notes": "Siècle en Côte-Rôtie."
      },
      "2015": {
        "score": 97,
        "notes": "Concentrée."
      }
    },
    "tags": [
      "Iconique",
      "Garde longue",
      "Syrah"
    ]
  },
  {
    "id": "ref-031",
    "name": "E. Guigal",
    "cuvee": "La Landonne",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Côte-Rôtie",
    "classification": "",
    "color": "rouge",
    "robe": "#4E0E1A",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "300-500",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre"
      ],
      "floral": [],
      "spicy": [
        "poivre noir",
        "lard fumé",
        "olive"
      ],
      "earthy": [
        "graphite",
        "encre",
        "terre brûlée"
      ],
      "wood": [
        "réglisse",
        "cacao",
        "café"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 35,
      "Épicé": 85,
      "Terreux": 80,
      "Boisé": 80,
      "Végétal": 25,
      "Minéral": 65,
      "Empyreumatique": 75
    },
    "pairings": [
      "Gibier",
      "Bœuf braisé",
      "Bleu d'Auvergne"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 2h",
      "verre": "Syrah XL"
    },
    "guard": {
      "from": 12,
      "to": 35
    },
    "labels": [],
    "estate": {
      "founded": 1946,
      "owner": "Famille Guigal",
      "surface": "2 ha",
      "terroir": "Schistes ferrugineux, Côte Brune",
      "soil": [
        "Schistes ferrugineux",
        "Mica"
      ],
      "climate": "Continental méditerranéen",
      "description": "La plus austère et puissante des trois « La La La ». Syrah pure, Côte Brune."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Noir et profond."
      },
      "2017": {
        "score": 98,
        "notes": "Monumental."
      }
    },
    "tags": [
      "Iconique",
      "Puissant",
      "Syrah"
    ]
  },
  {
    "id": "ref-032",
    "name": "Domaine Jean-Louis Chave",
    "cuvee": "Hermitage",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Hermitage",
    "classification": "",
    "color": "rouge",
    "robe": "#550F1C",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "250-400",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "olive noire",
        "fumée"
      ],
      "earthy": [
        "graphite",
        "terre",
        "encre"
      ],
      "wood": [
        "réglisse",
        "cuir"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 55,
      "Épicé": 80,
      "Terreux": 80,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 75,
      "Empyreumatique": 50
    },
    "pairings": [
      "Épaule d'agneau confite",
      "Gibier",
      "Saint-Nectaire"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h30",
      "verre": "Syrah XL"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1481,
      "owner": "Jean-Louis Chave",
      "surface": "15 ha",
      "terroir": "Assemblage de 6 lieux-dits",
      "soil": [
        "Granit",
        "Loess",
        "Argile",
        "Calcaire"
      ],
      "climate": "Continental méditerranéen",
      "description": "Famille vigneronne depuis 1481. Assemblage des meilleurs lieux-dits."
    },
    "vintages": {
      "2019": {
        "score": 99,
        "notes": "Pour l'éternité."
      },
      "2017": {
        "score": 98,
        "notes": "Élégance suprême."
      },
      "2015": {
        "score": 98,
        "notes": "Profondeur."
      }
    },
    "tags": [
      "Culte",
      "Hermitage",
      "Syrah"
    ]
  },
  {
    "id": "ref-033",
    "name": "Château de Beaucastel",
    "cuvee": "Hommage à Jacques Perrin",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Châteauneuf-du-Pape",
    "classification": "",
    "color": "rouge",
    "robe": "#601520",
    "cepages": [
      {
        "name": "Mourvèdre",
        "pct": 60
      },
      {
        "name": "Grenache",
        "pct": 20
      },
      {
        "name": "Syrah",
        "pct": 10
      },
      {
        "name": "Counoise",
        "pct": 10
      }
    ],
    "alcoholRange": "14.5-15.5",
    "priceRange": "350-550",
    "aromas": {
      "fruit": [
        "cassis",
        "cerise noire",
        "figue sèche"
      ],
      "floral": [
        "lavande"
      ],
      "spicy": [
        "poivre",
        "thym",
        "romarin"
      ],
      "earthy": [
        "garrigue",
        "cuir",
        "gibier"
      ],
      "wood": [
        "cacao",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 45,
      "Épicé": 85,
      "Terreux": 80,
      "Boisé": 60,
      "Végétal": 55,
      "Minéral": 50,
      "Empyreumatique": 55
    },
    "pairings": [
      "Sanglier en civet",
      "Gigot de 7 heures",
      "Banon affiné"
    ],
    "service": {
      "temp": "16-18°",
      "carafe": "Carafage 2h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1549,
      "owner": "Famille Perrin",
      "surface": "100 ha",
      "terroir": "Galets roulés, safres, grès rouge",
      "soil": [
        "Galets roulés",
        "Safres",
        "Grès rouge"
      ],
      "climate": "Méditerranéen",
      "description": "Cultive les 13 cépages de l'appellation en bio."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Mourvèdre monumental."
      },
      "2017": {
        "score": 97,
        "notes": "Grand millésime."
      }
    },
    "tags": [
      "Bio",
      "Garde longue",
      "Garrigue"
    ]
  },
  {
    "id": "ref-034",
    "name": "Château Rayas",
    "cuvee": "",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Châteauneuf-du-Pape",
    "classification": "",
    "color": "rouge",
    "robe": "#7A2030",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 100
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "500-900",
    "aromas": {
      "fruit": [
        "fraise confite",
        "cerise kirsch",
        "framboise"
      ],
      "floral": [
        "rose",
        "pivoine"
      ],
      "spicy": [
        "cannelle",
        "poivre blanc"
      ],
      "earthy": [
        "sous-bois",
        "terre rouge"
      ],
      "wood": [
        "cuir fin"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 75,
      "Épicé": 55,
      "Terreux": 65,
      "Boisé": 35,
      "Végétal": 40,
      "Minéral": 50,
      "Empyreumatique": 30
    },
    "pairings": [
      "Agneau de Sisteron",
      "Rouget barbet",
      "Picodon"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1880,
      "owner": "Emmanuel Reynaud",
      "surface": "13 ha",
      "terroir": "Sables fins, exposition nord",
      "soil": [
        "Sable fin",
        "Argile"
      ],
      "climate": "Méditerranéen",
      "description": "Anti-conformiste : Grenache pur, exposition nord. Finesse unique."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Aérien et profond."
      },
      "2017": {
        "score": 96,
        "notes": "Finesse bourguignonne."
      }
    },
    "tags": [
      "Culte",
      "Grenache",
      "Rare"
    ]
  },
  {
    "id": "ref-035",
    "name": "M. Chapoutier",
    "cuvee": "Le Méal",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Hermitage",
    "classification": "",
    "color": "rouge",
    "robe": "#580E1C",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "160-280",
    "aromas": {
      "fruit": [
        "mûre",
        "myrtille",
        "olive noire"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre noir",
        "lard fumé"
      ],
      "earthy": [
        "graphite",
        "terre brûlée"
      ],
      "wood": [
        "chocolat",
        "café"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 55,
      "Épicé": 75,
      "Terreux": 70,
      "Boisé": 65,
      "Végétal": 35,
      "Minéral": 65,
      "Empyreumatique": 60
    },
    "pairings": [
      "Bœuf bourguignon",
      "Aligot-saucisse",
      "Fourme d'Ambert"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Syrah"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1808,
      "owner": "Michel Chapoutier",
      "surface": "350 ha",
      "terroir": "Granit et loess, Le Méal",
      "soil": [
        "Granit",
        "Loess"
      ],
      "climate": "Continental méditerranéen",
      "description": "Maison historique. Étiquettes en braille."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Puissant."
      },
      "2017": {
        "score": 97,
        "notes": "Élégant et fin."
      }
    },
    "tags": [
      "Biodynamie",
      "Syrah",
      "Hermitage"
    ]
  },
  {
    "id": "ref-036",
    "name": "Domaine Auguste Clape",
    "cuvee": "Cornas",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Cornas",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "60-100",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "olive noire"
      ],
      "earthy": [
        "graphite",
        "terre",
        "fumée"
      ],
      "wood": [
        "réglisse",
        "cuir"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 50,
      "Épicé": 75,
      "Terreux": 75,
      "Boisé": 50,
      "Végétal": 30,
      "Minéral": 65,
      "Empyreumatique": 45
    },
    "pairings": [
      "Côte de bœuf",
      "Daube",
      "Picodon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Syrah"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1955,
      "owner": "Pierre-Marie Clape",
      "surface": "10 ha",
      "terroir": "Granit décomposé, coteaux abrupts",
      "soil": [
        "Granit",
        "Arène granitique"
      ],
      "climate": "Continental méditerranéen",
      "description": "Référence absolue de Cornas. Style classique, pas de bois neuf."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Concentré et pur."
      },
      "2019": {
        "score": 96,
        "notes": "Grand Cornas."
      },
      "2018": {
        "score": 94,
        "notes": "Solaire et profond."
      }
    },
    "tags": [
      "Classique",
      "Syrah",
      "Cornas"
    ]
  },
  {
    "id": "ref-037",
    "name": "Domaine Jamet",
    "cuvee": "Côte-Rôtie",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Côte-Rôtie",
    "classification": "",
    "color": "rouge",
    "robe": "#5C1020",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 95
      },
      {
        "name": "Viognier",
        "pct": 5
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-130",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "framboise"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "poivre",
        "olive noire"
      ],
      "earthy": [
        "graphite",
        "fumée"
      ],
      "wood": [
        "cuir",
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 65,
      "Épicé": 70,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 30,
      "Minéral": 65,
      "Empyreumatique": 40
    },
    "pairings": [
      "Gibier à plumes",
      "Agneau",
      "Saint-Félicien"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Syrah"
    },
    "guard": {
      "from": 8,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1950,
      "owner": "Jean-Paul & Jean-Luc Jamet",
      "surface": "10 ha",
      "terroir": "Schistes, Côte Brune et Blonde",
      "soil": [
        "Schistes",
        "Gneiss"
      ],
      "climate": "Continental méditerranéen",
      "description": "Assemblage des deux côtes. Style pur et précis, sans bois neuf excessif."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Fin et profond."
      },
      "2019": {
        "score": 96,
        "notes": "Soyeux."
      },
      "2018": {
        "score": 95,
        "notes": "Puissant."
      }
    },
    "tags": [
      "Classique",
      "Syrah",
      "Côte-Rôtie"
    ]
  },
  {
    "id": "ref-038",
    "name": "Krug",
    "cuvee": "Grande Cuvée",
    "region": "Champagne",
    "subRegion": "",
    "appellation": "Champagne",
    "classification": "",
    "color": "effervescent",
    "robe": "#E6C668",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 45
      },
      {
        "name": "Chardonnay",
        "pct": 37
      },
      {
        "name": "Meunier",
        "pct": 18
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "200-300",
    "aromas": {
      "fruit": [
        "abricot sec",
        "pomme mûre",
        "agrumes confits"
      ],
      "floral": [
        "fleur de vigne",
        "chèvrefeuille"
      ],
      "spicy": [
        "gingembre",
        "cardamome"
      ],
      "earthy": [],
      "wood": [
        "brioche",
        "noisette grillée",
        "miel"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 70,
      "Épicé": 55,
      "Terreux": 30,
      "Boisé": 60,
      "Végétal": 25,
      "Minéral": 75,
      "Empyreumatique": 80
    },
    "pairings": [
      "Risotto au parmesan",
      "Homard thermidor",
      "Volaille de Bresse"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe Champagne"
    },
    "guard": {
      "from": 0,
      "to": 12
    },
    "labels": [],
    "estate": {
      "founded": 1843,
      "owner": "LVMH — Famille Krug",
      "surface": "20 ha + achats",
      "terroir": "Crus multiples, réserves perpétuelles",
      "soil": [
        "Craie",
        "Calcaire",
        "Argile"
      ],
      "climate": "Océanique continental froid",
      "description": "Assemblage de 150+ vins de réserve, 10-15 millésimes."
    },
    "vintages": {
      "171e": {
        "score": 96,
        "notes": "Crémosité et précision."
      },
      "170e": {
        "score": 95,
        "notes": "Ample et vibrant."
      }
    },
    "tags": [
      "Prestige",
      "Apéritif",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-039",
    "name": "Dom Pérignon",
    "cuvee": "Vintage",
    "region": "Champagne",
    "subRegion": "",
    "appellation": "Champagne",
    "classification": "",
    "color": "effervescent",
    "robe": "#E0C060",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 52
      },
      {
        "name": "Pinot Noir",
        "pct": 48
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "180-250",
    "aromas": {
      "fruit": [
        "agrumes",
        "pêche blanche",
        "amande"
      ],
      "floral": [
        "fleur d'oranger"
      ],
      "spicy": [
        "poivre blanc"
      ],
      "earthy": [
        "craie"
      ],
      "wood": [
        "brioche",
        "pain grillé",
        "noisette"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 65,
      "Épicé": 40,
      "Terreux": 50,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 70,
      "Empyreumatique": 70
    },
    "pairings": [
      "Sashimi de bar",
      "Caviar",
      "Comté 24 mois"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe Champagne"
    },
    "guard": {
      "from": 0,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1668,
      "owner": "LVMH",
      "surface": "Achats grands crus",
      "terroir": "Côte des Blancs et Montagne de Reims",
      "soil": [
        "Craie à bélemnites"
      ],
      "climate": "Océanique continental froid",
      "description": "Uniquement les grandes années. Chef de cave : Vincent Chaperon."
    },
    "vintages": {
      "2015": {
        "score": 96,
        "notes": "Généreux."
      },
      "2013": {
        "score": 94,
        "notes": "Tendu."
      },
      "2012": {
        "score": 97,
        "notes": "Puissant."
      }
    },
    "tags": [
      "Prestige",
      "Cadeau"
    ]
  },
  {
    "id": "ref-040",
    "name": "Salon",
    "cuvee": "Le Mesnil",
    "region": "Champagne",
    "subRegion": "Côte des Blancs",
    "appellation": "Champagne Grand Cru",
    "classification": "",
    "color": "effervescent",
    "robe": "#DCC450",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "500-800",
    "aromas": {
      "fruit": [
        "citron confit",
        "pomme verte"
      ],
      "floral": [
        "acacia",
        "jasmin"
      ],
      "spicy": [],
      "earthy": [
        "craie",
        "silex",
        "iode"
      ],
      "wood": [
        "pain grillé",
        "noisette"
      ]
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 60,
      "Épicé": 20,
      "Terreux": 55,
      "Boisé": 45,
      "Végétal": 30,
      "Minéral": 95,
      "Empyreumatique": 60
    },
    "pairings": [
      "Oursin",
      "Bar de ligne",
      "Langoustine crue"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe Champagne"
    },
    "guard": {
      "from": 5,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1911,
      "owner": "Laurent-Perrier",
      "surface": "1 ha",
      "terroir": "Craie à bélemnites, Le Mesnil-sur-Oger",
      "soil": [
        "Craie à bélemnites"
      ],
      "climate": "Océanique continental froid",
      "description": "Un seul vin, uniquement les grandes années. 37 millésimes depuis 1905."
    },
    "vintages": {
      "2012": {
        "score": 98,
        "notes": "Tension absolue."
      },
      "2008": {
        "score": 97,
        "notes": "Acide et profond."
      },
      "2006": {
        "score": 97,
        "notes": "Monumental."
      }
    },
    "tags": [
      "Culte",
      "Blanc de blancs",
      "Rare"
    ]
  },
  {
    "id": "ref-041",
    "name": "Bollinger",
    "cuvee": "La Grande Année",
    "region": "Champagne",
    "subRegion": "Montagne de Reims",
    "appellation": "Champagne",
    "classification": "",
    "color": "effervescent",
    "robe": "#DFBE55",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 65
      },
      {
        "name": "Chardonnay",
        "pct": 35
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "90-130",
    "aromas": {
      "fruit": [
        "pomme mûre",
        "poire",
        "agrumes"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [
        "gingembre"
      ],
      "earthy": [
        "craie"
      ],
      "wood": [
        "brioche",
        "noisette",
        "pain d'épices"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 55,
      "Épicé": 45,
      "Terreux": 45,
      "Boisé": 65,
      "Végétal": 25,
      "Minéral": 65,
      "Empyreumatique": 70
    },
    "pairings": [
      "Poulet rôti",
      "Turbot",
      "Comté"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe Champagne"
    },
    "guard": {
      "from": 0,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1829,
      "owner": "Société Jacques Bollinger",
      "surface": "178 ha",
      "terroir": "Grands et Premiers Crus, Aÿ",
      "soil": [
        "Craie",
        "Calcaire",
        "Marne"
      ],
      "climate": "Océanique continental froid",
      "description": "Style puissant, dominé par le Pinot Noir. Fermentation en fût de chêne."
    },
    "vintages": {
      "2015": {
        "score": 95,
        "notes": "Vineux et ample."
      },
      "2012": {
        "score": 96,
        "notes": "Grande année."
      }
    },
    "tags": [
      "Classique",
      "Pinot Noir",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-042",
    "name": "Louis Roederer",
    "cuvee": "Cristal",
    "region": "Champagne",
    "subRegion": "",
    "appellation": "Champagne",
    "classification": "",
    "color": "effervescent",
    "robe": "#E2C450",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 60
      },
      {
        "name": "Chardonnay",
        "pct": 40
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "220-350",
    "aromas": {
      "fruit": [
        "agrumes confits",
        "pêche blanche",
        "pomme golden"
      ],
      "floral": [
        "fleur blanche",
        "jasmin"
      ],
      "spicy": [],
      "earthy": [
        "craie"
      ],
      "wood": [
        "brioche",
        "biscuit",
        "miel"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 65,
      "Épicé": 30,
      "Terreux": 50,
      "Boisé": 55,
      "Végétal": 25,
      "Minéral": 80,
      "Empyreumatique": 65
    },
    "pairings": [
      "Caviar",
      "Langoustine rôtie",
      "Poulet truffé"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe Champagne"
    },
    "guard": {
      "from": 0,
      "to": 20
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1833,
      "owner": "Famille Roederer (Frédéric Rouzaud)",
      "surface": "240 ha",
      "terroir": "Grands crus, sélection parcellaire",
      "soil": [
        "Craie",
        "Calcaire"
      ],
      "climate": "Océanique continental froid",
      "description": "Créé en 1876 pour le Tsar Alexandre II. Conversion biodynamique en cours."
    },
    "vintages": {
      "2015": {
        "score": 97,
        "notes": "Lumineux et profond."
      },
      "2014": {
        "score": 97,
        "notes": "Tendu et pur."
      },
      "2012": {
        "score": 98,
        "notes": "Grand Cristal."
      }
    },
    "tags": [
      "Prestige",
      "Biodynamie",
      "Cadeau"
    ]
  },
  {
    "id": "ref-043",
    "name": "Domaine Zind-Humbrecht",
    "cuvee": "Riesling Clos Windsbuhl",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace Grand Cru",
    "classification": "Grand Cru",
    "color": "blanc",
    "robe": "#D9B84A",
    "cepages": [
      {
        "name": "Riesling",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "50-80",
    "aromas": {
      "fruit": [
        "citron confit",
        "pomme verte",
        "poire williams"
      ],
      "floral": [
        "acacia",
        "fleur de tilleul"
      ],
      "spicy": [],
      "earthy": [
        "pierre à fusil",
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 75,
      "Épicé": 20,
      "Terreux": 40,
      "Boisé": 10,
      "Végétal": 50,
      "Minéral": 95,
      "Empyreumatique": 30
    },
    "pairings": [
      "Sole meunière",
      "Huîtres Gillardeau",
      "Munster jeune"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Alsace tulipe"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1959,
      "owner": "Famille Humbrecht",
      "surface": "41 ha",
      "terroir": "Marno-calcaire du Muschelkalk",
      "soil": [
        "Marno-calcaire",
        "Muschelkalk"
      ],
      "climate": "Continental, abri vosgien",
      "description": "Olivier Humbrecht, premier MW français. Biodynamie exemplaire."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Sec et tendu."
      },
      "2019": {
        "score": 94,
        "notes": "Minéralité tranchante."
      },
      "2017": {
        "score": 95,
        "notes": "Grand millésime."
      }
    },
    "tags": [
      "Biodynamie",
      "Gastronomique",
      "Minéral"
    ]
  },
  {
    "id": "ref-044",
    "name": "Domaine Trimbach",
    "cuvee": "Riesling Clos Sainte Hune",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C04A",
    "cepages": [
      {
        "name": "Riesling",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "120-200",
    "aromas": {
      "fruit": [
        "citron",
        "poire",
        "pêche blanche"
      ],
      "floral": [
        "tilleul",
        "acacia"
      ],
      "spicy": [],
      "earthy": [
        "pierre à fusil",
        "hydrocarbure noble",
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 60,
      "Épicé": 15,
      "Terreux": 55,
      "Boisé": 10,
      "Végétal": 40,
      "Minéral": 95,
      "Empyreumatique": 35
    },
    "pairings": [
      "Sandre au beurre blanc",
      "Choucroute de poissons",
      "Comté 24 mois"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Alsace tulipe"
    },
    "guard": {
      "from": 8,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1626,
      "owner": "Famille Trimbach",
      "surface": "0,3 ha",
      "terroir": "Calcaire coquillier, Grand Cru Rosacker",
      "soil": [
        "Calcaire coquillier",
        "Muschelkalk"
      ],
      "climate": "Continental, abri vosgien",
      "description": "L'un des plus grands Rieslings du monde. Production confidentielle."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Tension et pureté."
      },
      "2017": {
        "score": 97,
        "notes": "Hydrocarbure noble."
      },
      "2015": {
        "score": 95,
        "notes": "Riche et profond."
      }
    },
    "tags": [
      "Culte",
      "Rare",
      "Gastronomique"
    ]
  },
  {
    "id": "ref-045",
    "name": "Domaine Weinbach",
    "cuvee": "Gewurztraminer Altenbourg SGN",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace SGN",
    "classification": "",
    "color": "liquoreux",
    "robe": "#C8951A",
    "cepages": [
      {
        "name": "Gewurztraminer",
        "pct": 100
      }
    ],
    "alcoholRange": "12-13",
    "priceRange": "90-150",
    "aromas": {
      "fruit": [
        "litchi",
        "mangue",
        "fruit de la passion",
        "coing"
      ],
      "floral": [
        "rose turque",
        "jasmin"
      ],
      "spicy": [
        "gingembre",
        "cannelle",
        "cardamome"
      ],
      "earthy": [],
      "wood": [
        "miel",
        "cire d'abeille"
      ]
    },
    "aromaWheel": {
      "Fruit": 95,
      "Floral": 90,
      "Épicé": 75,
      "Terreux": 20,
      "Boisé": 40,
      "Végétal": 15,
      "Minéral": 35,
      "Empyreumatique": 45
    },
    "pairings": [
      "Foie gras mi-cuit",
      "Tarte au citron",
      "Munster affiné"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 5,
      "to": 30
    },
    "labels": [
      "Bio",
      "Biodynamie"
    ],
    "estate": {
      "founded": 1612,
      "owner": "Famille Faller",
      "surface": "30 ha",
      "terroir": "Granit de Turkheim",
      "soil": [
        "Granit",
        "Gneiss"
      ],
      "climate": "Continental, abri vosgien",
      "description": "Ancien domaine des Capucins. Pureté florale unique."
    },
    "vintages": {
      "2019": {
        "score": 95,
        "notes": "Opulente et équilibrée."
      },
      "2017": {
        "score": 95,
        "notes": "Riche et cristalline."
      }
    },
    "tags": [
      "Liquoreux",
      "Bio",
      "Exotique"
    ]
  },
  {
    "id": "ref-046",
    "name": "Domaine Marcel Deiss",
    "cuvee": "Altenberg de Bergheim",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace Grand Cru",
    "classification": "Grand Cru",
    "color": "blanc",
    "robe": "#D8B848",
    "cepages": [
      {
        "name": "Riesling",
        "pct": 40
      },
      {
        "name": "Gewurztraminer",
        "pct": 30
      },
      {
        "name": "Pinot Gris",
        "pct": 20
      },
      {
        "name": "Muscat",
        "pct": 10
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-120",
    "aromas": {
      "fruit": [
        "agrumes confits",
        "coing",
        "abricot"
      ],
      "floral": [
        "rose",
        "tilleul",
        "acacia"
      ],
      "spicy": [
        "épices douces"
      ],
      "earthy": [
        "silex",
        "terre rouge"
      ],
      "wood": [
        "miel"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 75,
      "Épicé": 50,
      "Terreux": 55,
      "Boisé": 25,
      "Végétal": 30,
      "Minéral": 80,
      "Empyreumatique": 35
    },
    "pairings": [
      "Foie gras",
      "Homard breton",
      "Munster"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Carafage léger",
      "verre": "Alsace tulipe"
    },
    "guard": {
      "from": 5,
      "to": 25
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1744,
      "owner": "Jean-Michel Deiss",
      "surface": "27 ha",
      "terroir": "Marno-calcaire, Altenberg",
      "soil": [
        "Marno-calcaire",
        "Grès",
        "Gypse"
      ],
      "climate": "Continental, abri vosgien",
      "description": "Pionnier de la complantation en Alsace. Assemblage de terroir, pas de cépage."
    },
    "vintages": {
      "2019": {
        "score": 95,
        "notes": "Complexe et profond."
      },
      "2018": {
        "score": 94,
        "notes": "Épicé et minéral."
      }
    },
    "tags": [
      "Biodynamie",
      "Complantation",
      "Terroir"
    ]
  },
  {
    "id": "ref-047",
    "name": "Clos Rougeard",
    "cuvee": "Les Poyeux",
    "region": "Loire",
    "subRegion": "Anjou-Saumur",
    "appellation": "Saumur-Champigny",
    "classification": "",
    "color": "rouge",
    "robe": "#6D1A28",
    "cepages": [
      {
        "name": "Cabernet Franc",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "200-350",
    "aromas": {
      "fruit": [
        "framboise",
        "cassis",
        "cerise"
      ],
      "floral": [
        "pivoine"
      ],
      "spicy": [
        "poivron rôti",
        "poivre"
      ],
      "earthy": [
        "tuffeau",
        "graphite"
      ],
      "wood": [
        "vanille fine",
        "toast"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 60,
      "Épicé": 55,
      "Terreux": 70,
      "Boisé": 50,
      "Végétal": 55,
      "Minéral": 75,
      "Empyreumatique": 40
    },
    "pairings": [
      "Rillons de Touraine",
      "Rôti de porc fermier",
      "Sainte-Maure-de-Touraine"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Carafage 30 min",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1908,
      "owner": "Famille Bouygues",
      "surface": "10 ha",
      "terroir": "Tuffeau, caves troglodytes",
      "soil": [
        "Tuffeau",
        "Calcaire"
      ],
      "climate": "Océanique tempéré",
      "description": "Domaine légendaire des frères Foucault. Élevage en caves troglodytes."
    },
    "vintages": {
      "2018": {
        "score": 96,
        "notes": "Profondeur rare."
      },
      "2015": {
        "score": 96,
        "notes": "Cab Franc ultime."
      }
    },
    "tags": [
      "Culte",
      "Rare",
      "Cabernet Franc"
    ]
  },
  {
    "id": "ref-048",
    "name": "Domaine Huet",
    "cuvee": "Le Haut-Lieu Moelleux",
    "region": "Loire",
    "subRegion": "Touraine",
    "appellation": "Vouvray",
    "classification": "",
    "color": "liquoreux",
    "robe": "#D4A832",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "11.5-13",
    "priceRange": "35-60",
    "aromas": {
      "fruit": [
        "coing",
        "abricot",
        "poire confite"
      ],
      "floral": [
        "acacia",
        "tilleul"
      ],
      "spicy": [
        "gingembre"
      ],
      "earthy": [
        "silex",
        "craie"
      ],
      "wood": [
        "miel",
        "cire"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 70,
      "Épicé": 35,
      "Terreux": 45,
      "Boisé": 30,
      "Végétal": 30,
      "Minéral": 80,
      "Empyreumatique": 40
    },
    "pairings": [
      "Tarte Tatin",
      "Bleu de chèvre",
      "Tajine aux abricots"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 5,
      "to": 50
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1928,
      "owner": "Famille Hwang",
      "surface": "35 ha",
      "terroir": "Argilo-siliceux sur tuffeau",
      "soil": [
        "Argilo-siliceux",
        "Tuffeau",
        "Silex"
      ],
      "climate": "Océanique tempéré",
      "description": "Pionnier de la biodynamie en Loire. Trois parcelles mythiques."
    },
    "vintages": {
      "2020": {
        "score": 94,
        "notes": "Pur et lumineux."
      },
      "2018": {
        "score": 93,
        "notes": "Riche, belle acidité."
      }
    },
    "tags": [
      "Biodynamie",
      "Moelleux",
      "Garde longue"
    ]
  },
  {
    "id": "ref-049",
    "name": "Domaine Guiberteau",
    "cuvee": "Le Clos des Carmes",
    "region": "Loire",
    "subRegion": "Anjou-Saumur",
    "appellation": "Saumur",
    "classification": "",
    "color": "blanc",
    "robe": "#E8D680",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "45-70",
    "aromas": {
      "fruit": [
        "coing",
        "poire",
        "citron"
      ],
      "floral": [
        "chèvrefeuille",
        "aubépine"
      ],
      "spicy": [],
      "earthy": [
        "craie",
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 80,
      "Épicé": 25,
      "Terreux": 50,
      "Boisé": 20,
      "Végétal": 55,
      "Minéral": 90,
      "Empyreumatique": 25
    },
    "pairings": [
      "Brochet au beurre blanc",
      "Chèvre de Loire",
      "Volaille crémée"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Carafage léger",
      "verre": "Chardonnay"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1920,
      "owner": "Romain Guiberteau",
      "surface": "14 ha",
      "terroir": "Tuffeau (craie du Turonien)",
      "soil": [
        "Tuffeau",
        "Craie"
      ],
      "climate": "Océanique tempéré",
      "description": "Figure montante de la Loire. Chenins parmi les plus recherchés."
    },
    "vintages": {
      "2021": {
        "score": 93,
        "notes": "Ciselé, profondeur minérale."
      },
      "2020": {
        "score": 94,
        "notes": "Tendu et complexe."
      }
    },
    "tags": [
      "Bio",
      "Chenin",
      "Loire"
    ]
  },
  {
    "id": "ref-050",
    "name": "Domaine Didier Dagueneau",
    "cuvee": "Silex",
    "region": "Loire",
    "subRegion": "Centre-Loire",
    "appellation": "Pouilly-Fumé",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C550",
    "cepages": [
      {
        "name": "Sauvignon Blanc",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "80-120",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "citron",
        "groseille à maquereau"
      ],
      "floral": [
        "genêt",
        "buis"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "pierre à fusil",
        "fumée"
      ],
      "wood": [
        "amande grillée"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 55,
      "Épicé": 15,
      "Terreux": 50,
      "Boisé": 35,
      "Végétal": 60,
      "Minéral": 90,
      "Empyreumatique": 40
    },
    "pairings": [
      "Brochet au beurre blanc",
      "Crottin de Chavignol",
      "Asperges"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Carafage léger",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [],
    "estate": {
      "founded": 1982,
      "owner": "Louis-Benjamin Dagueneau",
      "surface": "12 ha",
      "terroir": "Silex, argilo-calcaire",
      "soil": [
        "Silex",
        "Argilo-calcaire"
      ],
      "climate": "Continental",
      "description": "Didier Dagueneau a révolutionné le Pouilly-Fumé. Exigence absolue."
    },
    "vintages": {
      "2021": {
        "score": 95,
        "notes": "Tension et fumé."
      },
      "2020": {
        "score": 94,
        "notes": "Riche et minéral."
      }
    },
    "tags": [
      "Culte",
      "Sauvignon",
      "Minéral"
    ]
  },
  {
    "id": "ref-051",
    "name": "Nicolas Joly",
    "cuvee": "Coulée de Serrant",
    "region": "Loire",
    "subRegion": "Anjou",
    "appellation": "Savennières-Coulée-de-Serrant",
    "classification": "Monopole",
    "color": "blanc",
    "robe": "#D6B848",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "60-90",
    "aromas": {
      "fruit": [
        "coing",
        "pomme",
        "citron confit"
      ],
      "floral": [
        "tilleul",
        "acacia",
        "chèvrefeuille"
      ],
      "spicy": [
        "épices douces"
      ],
      "earthy": [
        "silex",
        "argile",
        "miel de garrigue"
      ],
      "wood": [
        "cire",
        "miel"
      ]
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 70,
      "Épicé": 40,
      "Terreux": 60,
      "Boisé": 25,
      "Végétal": 45,
      "Minéral": 85,
      "Empyreumatique": 35
    },
    "pairings": [
      "Brochet",
      "Turbot",
      "Fromages de Loire"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage 1h",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 5,
      "to": 30
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1962,
      "owner": "Virginie Joly",
      "surface": "7 ha (monopole)",
      "terroir": "Schistes et quartz, coteau de la Loire",
      "soil": [
        "Schistes",
        "Quartz",
        "Rhyolite"
      ],
      "climate": "Océanique",
      "description": "Monopole mythique. Nicolas Joly, pionnier mondial de la biodynamie."
    },
    "vintages": {
      "2020": {
        "score": 94,
        "notes": "Tendu et complexe."
      },
      "2019": {
        "score": 93,
        "notes": "Minéral et floral."
      }
    },
    "tags": [
      "Biodynamie",
      "Monopole",
      "Chenin"
    ]
  },
  {
    "id": "ref-052",
    "name": "Domaine Tempier",
    "cuvee": "La Migoua",
    "region": "Provence",
    "subRegion": "",
    "appellation": "Bandol",
    "classification": "",
    "color": "rouge",
    "robe": "#6B1A25",
    "cepages": [
      {
        "name": "Mourvèdre",
        "pct": 55
      },
      {
        "name": "Grenache",
        "pct": 25
      },
      {
        "name": "Cinsault",
        "pct": 15
      },
      {
        "name": "Syrah",
        "pct": 5
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "40-60",
    "aromas": {
      "fruit": [
        "cerise noire",
        "prune",
        "mûre sauvage"
      ],
      "floral": [],
      "spicy": [
        "poivre noir",
        "thym",
        "laurier"
      ],
      "earthy": [
        "garrigue",
        "olive noire"
      ],
      "wood": [
        "cuir",
        "sous-bois"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 40,
      "Épicé": 80,
      "Terreux": 75,
      "Boisé": 50,
      "Végétal": 60,
      "Minéral": 55,
      "Empyreumatique": 40
    },
    "pairings": [
      "Daube provençale",
      "Gigot d'agneau",
      "Cassoulet"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1834,
      "owner": "Famille Peyraud",
      "surface": "38 ha",
      "terroir": "Restanques calcaires",
      "soil": [
        "Calcaire",
        "Argile",
        "Grès"
      ],
      "climate": "Méditerranéen",
      "description": "Icône de Bandol. La famille Peyraud a sauvé l'appellation."
    },
    "vintages": {
      "2020": {
        "score": 93,
        "notes": "Garrigue, tanins serrés."
      },
      "2019": {
        "score": 94,
        "notes": "Concentré et frais."
      }
    },
    "tags": [
      "Bio",
      "Garrigue",
      "Mourvèdre"
    ]
  },
  {
    "id": "ref-053",
    "name": "Domaines Ott",
    "cuvee": "Clos Mireille",
    "region": "Provence",
    "subRegion": "",
    "appellation": "Côtes de Provence",
    "classification": "",
    "color": "rosé",
    "robe": "#F2B8A2",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 50
      },
      {
        "name": "Cinsault",
        "pct": 30
      },
      {
        "name": "Syrah",
        "pct": 20
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "30-45",
    "aromas": {
      "fruit": [
        "pamplemousse rose",
        "pêche de vigne",
        "fraise"
      ],
      "floral": [
        "rose",
        "fleur de cerisier"
      ],
      "spicy": [],
      "earthy": [],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 75,
      "Épicé": 15,
      "Terreux": 20,
      "Boisé": 10,
      "Végétal": 35,
      "Minéral": 50,
      "Empyreumatique": 10
    },
    "pairings": [
      "Bouillabaisse",
      "Salade niçoise",
      "Brandade de morue"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe"
    },
    "guard": {
      "from": 0,
      "to": 3
    },
    "labels": [],
    "estate": {
      "founded": 1896,
      "owner": "Famille Ott (Roederer)",
      "surface": "45 ha",
      "terroir": "Schistes et quartzites, bord de mer",
      "soil": [
        "Schistes",
        "Quartzites"
      ],
      "climate": "Méditerranéen maritime",
      "description": "Référence du rosé de Provence. Clos Mireille, pieds dans l'eau."
    },
    "vintages": {
      "2023": {
        "score": 90,
        "notes": "Frais et salin."
      },
      "2022": {
        "score": 90,
        "notes": "Élégant et floral."
      }
    },
    "tags": [
      "Rosé",
      "Été",
      "Classique"
    ]
  },
  {
    "id": "ref-054",
    "name": "Domaine de Trévallon",
    "cuvee": "",
    "region": "Provence",
    "subRegion": "Alpilles",
    "appellation": "IGP Alpilles",
    "classification": "",
    "color": "rouge",
    "robe": "#5E1222",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 50
      },
      {
        "name": "Syrah",
        "pct": 50
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "60-90",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "olive noire"
      ],
      "floral": [
        "violette",
        "lavande"
      ],
      "spicy": [
        "poivre",
        "thym",
        "romarin"
      ],
      "earthy": [
        "garrigue",
        "pierre calcaire"
      ],
      "wood": [
        "cèdre",
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 60,
      "Épicé": 75,
      "Terreux": 80,
      "Boisé": 55,
      "Végétal": 65,
      "Minéral": 60,
      "Empyreumatique": 40
    },
    "pairings": [
      "Taureau des Alpilles",
      "Pieds paquets",
      "Tomme de brebis"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1973,
      "owner": "Antoine Dürrbach",
      "surface": "17 ha",
      "terroir": "Calcaire urgonien, piémont des Alpilles",
      "soil": [
        "Calcaire urgonien",
        "Éboulis"
      ],
      "climate": "Méditerranéen, mistral",
      "description": "Domaine mythique des Alpilles. Assemblage Cabernet-Syrah unique."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Profond et garrigue."
      },
      "2019": {
        "score": 94,
        "notes": "Concentré."
      }
    },
    "tags": [
      "Culte",
      "Bio",
      "Alpilles"
    ]
  },
  {
    "id": "ref-055",
    "name": "Domaine de la Grange des Pères",
    "cuvee": "",
    "region": "Languedoc",
    "subRegion": "Hérault",
    "appellation": "IGP Hérault",
    "classification": "",
    "color": "rouge",
    "robe": "#5C1020",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 40
      },
      {
        "name": "Mourvèdre",
        "pct": 35
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 15
      },
      {
        "name": "Counoise",
        "pct": 10
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "90-150",
    "aromas": {
      "fruit": [
        "mûre",
        "cassis",
        "olive noire"
      ],
      "floral": [
        "violette",
        "lavande"
      ],
      "spicy": [
        "poivre",
        "thym",
        "réglisse"
      ],
      "earthy": [
        "garrigue",
        "pierre chaude"
      ],
      "wood": [
        "cèdre",
        "chocolat noir"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 55,
      "Épicé": 75,
      "Terreux": 80,
      "Boisé": 65,
      "Végétal": 55,
      "Minéral": 60,
      "Empyreumatique": 50
    },
    "pairings": [
      "Taureau de Camargue",
      "Agneau des garrigues",
      "Pélardon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1992,
      "owner": "Laurent Vaillé",
      "surface": "13 ha",
      "terroir": "Calcaire lacustre, terrasses de l'Hérault",
      "soil": [
        "Calcaire lacustre",
        "Galets"
      ],
      "climate": "Méditerranéen",
      "description": "Le plus grand vin du Languedoc. Laurent Vaillé, génie discret."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Concentré et frais."
      },
      "2019": {
        "score": 96,
        "notes": "Puissant et raffiné."
      }
    },
    "tags": [
      "Culte",
      "Garrigue",
      "IGP"
    ]
  },
  {
    "id": "ref-056",
    "name": "Domaine Gauby",
    "cuvee": "Muntada",
    "region": "Languedoc",
    "subRegion": "Roussillon",
    "appellation": "IGP Côtes Catalanes",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1220",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 50
      },
      {
        "name": "Grenache",
        "pct": 30
      },
      {
        "name": "Carignan",
        "pct": 10
      },
      {
        "name": "Mourvèdre",
        "pct": 10
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "60-90",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "romarin"
      ],
      "earthy": [
        "schiste",
        "terre humide"
      ],
      "wood": [
        "cacao",
        "épices douces"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 75,
      "Boisé": 55,
      "Végétal": 50,
      "Minéral": 65,
      "Empyreumatique": 45
    },
    "pairings": [
      "Boles de picolat",
      "Cargolade",
      "Brebis des Pyrénées"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1985,
      "owner": "Gérard et Lionel Gauby",
      "surface": "45 ha",
      "terroir": "Schistes noirs de Calce, 350m",
      "soil": [
        "Schistes noirs",
        "Calcaire"
      ],
      "climate": "Méditerranéen montagnard",
      "description": "Référence du Roussillon sur les schistes de Calce."
    },
    "vintages": {
      "2019": {
        "score": 94,
        "notes": "Profond et frais."
      },
      "2018": {
        "score": 94,
        "notes": "Puissant et épicé."
      }
    },
    "tags": [
      "Biodynamie",
      "Schiste",
      "Roussillon"
    ]
  },
  {
    "id": "ref-057",
    "name": "Mas de Daumas Gassac",
    "cuvee": "",
    "region": "Languedoc",
    "subRegion": "Hérault",
    "appellation": "IGP Haute Vallée du Gassac",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 80
      },
      {
        "name": "Autres cépages",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "30-50",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise"
      ],
      "floral": [
        "violette",
        "lavande"
      ],
      "spicy": [
        "cèdre",
        "poivre"
      ],
      "earthy": [
        "garrigue",
        "terre volcanique"
      ],
      "wood": [
        "vanille",
        "toast"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 55,
      "Épicé": 65,
      "Terreux": 70,
      "Boisé": 60,
      "Végétal": 50,
      "Minéral": 55,
      "Empyreumatique": 45
    },
    "pairings": [
      "Gigot d'agneau",
      "Bœuf braisé",
      "Pélardon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1978,
      "owner": "Famille Guibert de La Vaissière",
      "surface": "40 ha",
      "terroir": "Sols volcaniques glaciaires uniques",
      "soil": [
        "Grézeux glaciaire",
        "Basalte"
      ],
      "climate": "Méditerranéen d'altitude",
      "description": "Surnommé le « Lafite du Languedoc ». Sols glaciaires uniques étudiés par le géologue Henri Enjalbert."
    },
    "vintages": {
      "2019": {
        "score": 93,
        "notes": "Fruité et complexe."
      },
      "2018": {
        "score": 92,
        "notes": "Classique et fin."
      }
    },
    "tags": [
      "Classique",
      "Rapport qualité-prix",
      "Languedoc"
    ]
  },
  {
    "id": "ref-058",
    "name": "Domaine Overnoy-Houillon",
    "cuvee": "Arbois Pupillin",
    "region": "Jura",
    "subRegion": "",
    "appellation": "Arbois Pupillin",
    "classification": "",
    "color": "rouge",
    "robe": "#8B3040",
    "cepages": [
      {
        "name": "Poulsard",
        "pct": 100
      }
    ],
    "alcoholRange": "11.5-12.5",
    "priceRange": "150-250",
    "aromas": {
      "fruit": [
        "cerise",
        "fraise des bois",
        "groseille"
      ],
      "floral": [
        "rose sauvage"
      ],
      "spicy": [
        "poivre rose"
      ],
      "earthy": [
        "sous-bois",
        "champignon"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 65,
      "Épicé": 30,
      "Terreux": 60,
      "Boisé": 15,
      "Végétal": 45,
      "Minéral": 55,
      "Empyreumatique": 20
    },
    "pairings": [
      "Poulet au vin jaune",
      "Morilles",
      "Comté 18 mois"
    ],
    "service": {
      "temp": "14-15°",
      "carafe": "Servir direct",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 2,
      "to": 10
    },
    "labels": [
      "Nature"
    ],
    "estate": {
      "founded": 1960,
      "owner": "Emmanuel Houillon",
      "surface": "5 ha",
      "terroir": "Marnes du Trias, Pupillin",
      "soil": [
        "Marnes du Trias",
        "Argile rouge"
      ],
      "climate": "Continental montagnard",
      "description": "Pierre Overnoy est le père du vin nature. Ni soufre, ni levure, ni filtration."
    },
    "vintages": {
      "2020": {
        "score": 93,
        "notes": "Vibrant et pur."
      },
      "2019": {
        "score": 94,
        "notes": "Complexe et aérien."
      }
    },
    "tags": [
      "Nature",
      "Culte",
      "Poulsard"
    ]
  },
  {
    "id": "ref-059",
    "name": "Domaine Jean-François Ganevat",
    "cuvee": "Les Chalasses Vieilles Vignes",
    "region": "Jura",
    "subRegion": "",
    "appellation": "Côtes du Jura",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C050",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "65-100",
    "aromas": {
      "fruit": [
        "pomme golden",
        "citron",
        "noisette fraîche"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [
        "curry"
      ],
      "earthy": [
        "pierre chaude",
        "craie"
      ],
      "wood": [
        "beurre",
        "pain grillé"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 55,
      "Épicé": 40,
      "Terreux": 60,
      "Boisé": 50,
      "Végétal": 35,
      "Minéral": 85,
      "Empyreumatique": 55
    },
    "pairings": [
      "Truite du Jura",
      "Raclette au lait cru",
      "Morbier"
    ],
    "service": {
      "temp": "11-13°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [
      "Nature"
    ],
    "estate": {
      "founded": 1998,
      "owner": "Jean-François Ganevat",
      "surface": "10 ha",
      "terroir": "Marnes bleues du Lias",
      "soil": [
        "Marnes bleues",
        "Lias"
      ],
      "climate": "Continental montagnard",
      "description": "« Fanfan » a révolutionné les vins jurassiens."
    },
    "vintages": {
      "2020": {
        "score": 94,
        "notes": "Tendu et complexe."
      },
      "2019": {
        "score": 94,
        "notes": "Minéral et profond."
      }
    },
    "tags": [
      "Nature",
      "Jura",
      "Chardonnay"
    ]
  },
  {
    "id": "ref-060",
    "name": "Château Montus",
    "cuvee": "Prestige",
    "region": "Sud-Ouest",
    "subRegion": "Piémont pyrénéen",
    "appellation": "Madiran",
    "classification": "",
    "color": "rouge",
    "robe": "#420C14",
    "cepages": [
      {
        "name": "Tannat",
        "pct": 80
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 20
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "35-55",
    "aromas": {
      "fruit": [
        "mûre",
        "myrtille",
        "prune"
      ],
      "floral": [],
      "spicy": [
        "poivre",
        "réglisse"
      ],
      "earthy": [
        "terre",
        "encre"
      ],
      "wood": [
        "chêne toasté",
        "vanille",
        "café"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 25,
      "Épicé": 65,
      "Terreux": 60,
      "Boisé": 80,
      "Végétal": 25,
      "Minéral": 40,
      "Empyreumatique": 55
    },
    "pairings": [
      "Confit de canard",
      "Magret séché",
      "Ossau-Iraty"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1980,
      "owner": "Alain Brumont",
      "surface": "120 ha",
      "terroir": "Argilo-siliceux, piémont pyrénéen",
      "soil": [
        "Argilo-siliceux",
        "Galets roulés"
      ],
      "climate": "Océanique montagnard",
      "description": "Alain Brumont a ressuscité le Tannat."
    },
    "vintages": {
      "2019": {
        "score": 92,
        "notes": "Charnu et puissant."
      },
      "2018": {
        "score": 91,
        "notes": "Tanins fondus."
      }
    },
    "tags": [
      "Tannat",
      "Puissant",
      "Sud-Ouest"
    ]
  },
  {
    "id": "ref-061",
    "name": "Clos Triguedina",
    "cuvee": "Probus",
    "region": "Sud-Ouest",
    "subRegion": "Cahors",
    "appellation": "Cahors",
    "classification": "",
    "color": "rouge",
    "robe": "#3D0B12",
    "cepages": [
      {
        "name": "Malbec",
        "pct": 100
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "25-40",
    "aromas": {
      "fruit": [
        "cassis",
        "prune noire",
        "cerise griotte"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "réglisse"
      ],
      "earthy": [
        "truffe",
        "sous-bois"
      ],
      "wood": [
        "vanille",
        "torréfaction"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 45,
      "Épicé": 60,
      "Terreux": 65,
      "Boisé": 65,
      "Végétal": 30,
      "Minéral": 45,
      "Empyreumatique": 50
    },
    "pairings": [
      "Cassoulet",
      "Confit de canard",
      "Rocamadour"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [],
    "estate": {
      "founded": 1830,
      "owner": "Jean-Luc Baldès",
      "surface": "60 ha",
      "terroir": "Argilo-calcaire, terrasse du Lot",
      "soil": [
        "Argilo-calcaire",
        "Kimméridgien"
      ],
      "climate": "Océanique continental",
      "description": "Renaissance du Malbec de Cahors. Cuvée nommée d'après l'empereur romain."
    },
    "vintages": {
      "2018": {
        "score": 92,
        "notes": "Velouté et truffé."
      },
      "2016": {
        "score": 92,
        "notes": "Concentré et long."
      }
    },
    "tags": [
      "Malbec",
      "Cahors",
      "Rapport qualité-prix"
    ]
  },
  {
    "id": "ref-062",
    "name": "Domaine Marcel Lapierre",
    "cuvee": "Morgon",
    "region": "Beaujolais",
    "subRegion": "",
    "appellation": "Morgon",
    "classification": "Cru du Beaujolais",
    "color": "rouge",
    "robe": "#8A2535",
    "cepages": [
      {
        "name": "Gamay",
        "pct": 100
      }
    ],
    "alcoholRange": "12-13",
    "priceRange": "22-32",
    "aromas": {
      "fruit": [
        "cerise",
        "framboise",
        "groseille"
      ],
      "floral": [
        "pivoine",
        "iris"
      ],
      "spicy": [
        "poivre"
      ],
      "earthy": [
        "granit",
        "terre"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 75,
      "Épicé": 35,
      "Terreux": 50,
      "Boisé": 10,
      "Végétal": 40,
      "Minéral": 55,
      "Empyreumatique": 15
    },
    "pairings": [
      "Charcuterie lyonnaise",
      "Poulet rôti",
      "Saint-Marcellin"
    ],
    "service": {
      "temp": "13-14°",
      "carafe": "Servir direct",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 1,
      "to": 8
    },
    "labels": [
      "Nature"
    ],
    "estate": {
      "founded": 1973,
      "owner": "Mathieu & Camille Lapierre",
      "surface": "14 ha",
      "terroir": "Granit rose, côte du Py",
      "soil": [
        "Granit rose",
        "Arène granitique"
      ],
      "climate": "Continental",
      "description": "Père fondateur du vin nature. Gamay sans soufre, macération carbonique."
    },
    "vintages": {
      "2022": {
        "score": 92,
        "notes": "Juteux et vibrant."
      },
      "2020": {
        "score": 93,
        "notes": "Profond et soyeux."
      }
    },
    "tags": [
      "Nature",
      "Glou-glou",
      "Beaujolais"
    ]
  },
  {
    "id": "ref-063",
    "name": "Jean Foillard",
    "cuvee": "Morgon Côte du Py",
    "region": "Beaujolais",
    "subRegion": "",
    "appellation": "Morgon",
    "classification": "Cru du Beaujolais",
    "color": "rouge",
    "robe": "#882535",
    "cepages": [
      {
        "name": "Gamay",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "22-35",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "framboise"
      ],
      "floral": [
        "pivoine"
      ],
      "spicy": [
        "poivre",
        "épices douces"
      ],
      "earthy": [
        "granit",
        "pierre chaude"
      ],
      "wood": [
        "cuir fin"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 65,
      "Épicé": 45,
      "Terreux": 60,
      "Boisé": 20,
      "Végétal": 35,
      "Minéral": 65,
      "Empyreumatique": 25
    },
    "pairings": [
      "Andouillette",
      "Quenelle de brochet",
      "Reblochon"
    ],
    "service": {
      "temp": "14-15°",
      "carafe": "Servir direct",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 2,
      "to": 10
    },
    "labels": [
      "Nature"
    ],
    "estate": {
      "founded": 1980,
      "owner": "Jean Foillard",
      "surface": "13 ha",
      "terroir": "Granit bleu, côte du Py",
      "soil": [
        "Granit bleu",
        "Schiste"
      ],
      "climate": "Continental",
      "description": "Gang of Four du Beaujolais nature avec Lapierre, Breton et Thévenet."
    },
    "vintages": {
      "2022": {
        "score": 93,
        "notes": "Structure et fruit."
      },
      "2020": {
        "score": 94,
        "notes": "Quasi bourguignon."
      }
    },
    "tags": [
      "Nature",
      "Beaujolais",
      "Gamay"
    ]
  },
  {
    "id": "ref-064",
    "name": "Clos Canarelli",
    "cuvee": "Amphora",
    "region": "Corse",
    "subRegion": "",
    "appellation": "Corse Figari",
    "classification": "",
    "color": "rouge",
    "robe": "#721C2A",
    "cepages": [
      {
        "name": "Nielluccio",
        "pct": 50
      },
      {
        "name": "Sciaccarellu",
        "pct": 50
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "45-65",
    "aromas": {
      "fruit": [
        "cerise",
        "fraise",
        "grenade"
      ],
      "floral": [
        "maquis en fleur"
      ],
      "spicy": [
        "poivre",
        "myrte"
      ],
      "earthy": [
        "granit",
        "terre sèche"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 60,
      "Épicé": 65,
      "Terreux": 60,
      "Boisé": 20,
      "Végétal": 70,
      "Minéral": 65,
      "Empyreumatique": 25
    },
    "pairings": [
      "Veau corse aux olives",
      "Figatellu",
      "Brocciu"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 2,
      "to": 10
    },
    "labels": [
      "Nature"
    ],
    "estate": {
      "founded": 1993,
      "owner": "Yves Canarelli",
      "surface": "20 ha",
      "terroir": "Granit et arène granitique, Figari",
      "soil": [
        "Granit",
        "Arène granitique"
      ],
      "climate": "Méditerranéen insulaire",
      "description": "Chef de file du renouveau corse. Cépages endémiques, amphore."
    },
    "vintages": {
      "2021": {
        "score": 92,
        "notes": "Frais et maquis."
      },
      "2020": {
        "score": 92,
        "notes": "Pur et épicé."
      }
    },
    "tags": [
      "Amphore",
      "Nature",
      "Corse"
    ]
  },
  {
    "id": "ref-065",
    "name": "Domaine des Ardoisières",
    "cuvee": "Quartz",
    "region": "Savoie",
    "subRegion": "",
    "appellation": "IGP Vin des Allobroges",
    "classification": "",
    "color": "blanc",
    "robe": "#DAC55A",
    "cepages": [
      {
        "name": "Jacquère",
        "pct": 70
      },
      {
        "name": "Roussanne",
        "pct": 30
      }
    ],
    "alcoholRange": "12-13",
    "priceRange": "25-38",
    "aromas": {
      "fruit": [
        "citron",
        "pomme verte",
        "poire"
      ],
      "floral": [
        "fleur blanche",
        "aubépine"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "ardoise"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 60,
      "Épicé": 15,
      "Terreux": 45,
      "Boisé": 10,
      "Végétal": 50,
      "Minéral": 90,
      "Empyreumatique": 15
    },
    "pairings": [
      "Fondue savoyarde",
      "Féra du Léman",
      "Beaufort d'été"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Chablis"
    },
    "guard": {
      "from": 2,
      "to": 8
    },
    "labels": [],
    "estate": {
      "founded": 1998,
      "owner": "Brice Omont",
      "surface": "7 ha",
      "terroir": "Schistes et ardoises, 500-700m",
      "soil": [
        "Schistes",
        "Ardoises"
      ],
      "climate": "Continental montagnard",
      "description": "Vignoble vertigineux en terrasses dans la Combe de Savoie."
    },
    "vintages": {
      "2021": {
        "score": 91,
        "notes": "Frais et alpin."
      },
      "2020": {
        "score": 92,
        "notes": "Tension et minéralité."
      }
    },
    "tags": [
      "Alpin",
      "Minéral",
      "Héroïque"
    ]
  },
  {
    "id": "ref-066",
    "name": "Tenuta San Guido",
    "cuvee": "Sassicaia",
    "region": "Italie",
    "subRegion": "Toscane",
    "appellation": "Bolgheri Sassicaia DOC",
    "classification": "",
    "color": "rouge",
    "robe": "#520F1C",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 85
      },
      {
        "name": "Cabernet Franc",
        "pct": 15
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "180-350",
    "aromas": {
      "fruit": [
        "cassis",
        "cerise noire",
        "mûre"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "cèdre",
        "menthol",
        "réglisse"
      ],
      "earthy": [
        "graphite",
        "terre toscane"
      ],
      "wood": [
        "vanille",
        "tabac",
        "café"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 55,
      "Épicé": 75,
      "Terreux": 65,
      "Boisé": 70,
      "Végétal": 35,
      "Minéral": 60,
      "Empyreumatique": 55
    },
    "pairings": [
      "Bistecca alla fiorentina",
      "Agneau rôti",
      "Pecorino toscano"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1968,
      "owner": "Famille Incisa della Rocchetta",
      "surface": "75 ha",
      "terroir": "Cailloux et calcaire, Bolgheri",
      "soil": [
        "Cailloux",
        "Calcaire",
        "Argile"
      ],
      "climate": "Méditerranéen maritime",
      "description": "Le premier « Super Toscan ». Le marquis Mario Incisa s'inspira du Médoc bordelais."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Classique et profond."
      },
      "2018": {
        "score": 96,
        "notes": "Puissant et élégant."
      },
      "2016": {
        "score": 98,
        "notes": "Monumental."
      }
    },
    "tags": [
      "Super Toscan",
      "Prestige",
      "Italie"
    ]
  },
  {
    "id": "ref-067",
    "name": "Marchesi Antinori",
    "cuvee": "Tignanello",
    "region": "Italie",
    "subRegion": "Toscane",
    "appellation": "Toscana IGT",
    "classification": "",
    "color": "rouge",
    "robe": "#581020",
    "cepages": [
      {
        "name": "Sangiovese",
        "pct": 80
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 15
      },
      {
        "name": "Cabernet Franc",
        "pct": 5
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "80-120",
    "aromas": {
      "fruit": [
        "cerise",
        "prune",
        "mûre"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "épices douces",
        "réglisse"
      ],
      "earthy": [
        "terre",
        "sous-bois"
      ],
      "wood": [
        "vanille",
        "cacao",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 55,
      "Épicé": 65,
      "Terreux": 60,
      "Boisé": 70,
      "Végétal": 35,
      "Minéral": 50,
      "Empyreumatique": 55
    },
    "pairings": [
      "Pappardelle al ragù",
      "Bistecca",
      "Parmigiano Reggiano"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [],
    "estate": {
      "founded": 1385,
      "owner": "Famille Antinori",
      "surface": "57 ha (Tignanello)",
      "terroir": "Calcaire et galestro, Chianti Classico",
      "soil": [
        "Galestro",
        "Calcaire",
        "Argile"
      ],
      "climate": "Méditerranéen",
      "description": "Premier Super Toscan à assembler Sangiovese et Cabernet (1971). Vinifié sans bois blanc."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Fruit pur et tanins fins."
      },
      "2019": {
        "score": 96,
        "notes": "Complexe et élégant."
      },
      "2018": {
        "score": 94,
        "notes": "Concentré."
      }
    },
    "tags": [
      "Super Toscan",
      "Classique",
      "Italie"
    ]
  },
  {
    "id": "ref-068",
    "name": "Giacomo Conterno",
    "cuvee": "Barolo Monfortino Riserva",
    "region": "Italie",
    "subRegion": "Piémont",
    "appellation": "Barolo DOCG",
    "classification": "",
    "color": "rouge",
    "robe": "#6B1828",
    "cepages": [
      {
        "name": "Nebbiolo",
        "pct": 100
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "800-1500",
    "aromas": {
      "fruit": [
        "cerise griotte",
        "framboise séchée",
        "prune"
      ],
      "floral": [
        "rose fanée",
        "violette séchée"
      ],
      "spicy": [
        "réglisse",
        "cannelle",
        "clou de girofle"
      ],
      "earthy": [
        "truffe",
        "goudron",
        "terre"
      ],
      "wood": [
        "cuir",
        "tabac",
        "cèdre"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 65,
      "Épicé": 75,
      "Terreux": 90,
      "Boisé": 60,
      "Végétal": 25,
      "Minéral": 75,
      "Empyreumatique": 55
    },
    "pairings": [
      "Tajarin al tartufo",
      "Brasato al Barolo",
      "Parmigiano 48 mois"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 15,
      "to": 40
    },
    "labels": [],
    "estate": {
      "founded": 1908,
      "owner": "Roberto Conterno",
      "surface": "14 ha",
      "terroir": "Marnes calcaires, Serralunga d'Alba",
      "soil": [
        "Marnes calcaires",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Le plus grand Barolo traditionnel. Élevage en grande botte de chêne de Slavonie, uniquement les grandes années."
    },
    "vintages": {
      "2015": {
        "score": 99,
        "notes": "Monument, goudron et rose."
      },
      "2014": {
        "score": 98,
        "notes": "Profond."
      },
      "2013": {
        "score": 100,
        "notes": "Perfection."
      }
    },
    "tags": [
      "Barolo",
      "Traditionnel",
      "Italie"
    ]
  },
  {
    "id": "ref-069",
    "name": "Angelo Gaja",
    "cuvee": "Barbaresco",
    "region": "Italie",
    "subRegion": "Piémont",
    "appellation": "Barbaresco DOCG",
    "classification": "",
    "color": "rouge",
    "robe": "#681828",
    "cepages": [
      {
        "name": "Nebbiolo",
        "pct": 100
      }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "200-350",
    "aromas": {
      "fruit": [
        "cerise",
        "framboise",
        "fraise"
      ],
      "floral": [
        "rose",
        "violette"
      ],
      "spicy": [
        "cannelle",
        "réglisse",
        "poivre"
      ],
      "earthy": [
        "truffe",
        "goudron",
        "champignon"
      ],
      "wood": [
        "vanille",
        "chêne neuf"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 70,
      "Épicé": 65,
      "Terreux": 80,
      "Boisé": 65,
      "Végétal": 25,
      "Minéral": 70,
      "Empyreumatique": 50
    },
    "pairings": [
      "Vitello tonnato",
      "Bollito misto",
      "Toma piemontese"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1859,
      "owner": "Angelo Gaja",
      "surface": "25 ha",
      "terroir": "Marnes calcaires, Barbaresco",
      "soil": [
        "Marnes calcaires",
        "Argile"
      ],
      "climate": "Continental",
      "description": "Angelo Gaja a révolutionné le Piémont. Introduction du barrique français, vinification moderne."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Élégant et profond."
      },
      "2018": {
        "score": 97,
        "notes": "Puissant et fin."
      },
      "2017": {
        "score": 95,
        "notes": "Classique."
      }
    },
    "tags": [
      "Barbaresco",
      "Nebbiolo",
      "Italie"
    ]
  },
  {
    "id": "ref-070",
    "name": "Vega Sicilia",
    "cuvee": "Único",
    "region": "Espagne",
    "subRegion": "Ribera del Duero",
    "appellation": "Ribera del Duero DO",
    "classification": "",
    "color": "rouge",
    "robe": "#500E18",
    "cepages": [
      {
        "name": "Tempranillo",
        "pct": 80
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "350-600",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "prune confite"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "réglisse",
        "clou de girofle"
      ],
      "earthy": [
        "terre",
        "cuir",
        "fumée"
      ],
      "wood": [
        "vanille",
        "cèdre",
        "tabac"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 75,
      "Boisé": 80,
      "Végétal": 25,
      "Minéral": 60,
      "Empyreumatique": 65
    },
    "pairings": [
      "Cochinillo asado",
      "Agneau de Castille",
      "Manchego affiné"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1864,
      "owner": "Famille Álvarez (Grupo Tempos Vega Sicilia)",
      "surface": "210 ha",
      "terroir": "Calcaire et argile, altitude 700-800m",
      "soil": [
        "Calcaire",
        "Argile",
        "Sable"
      ],
      "climate": "Continental extrême",
      "description": "Le plus grand vin d'Espagne. Élevage de 10 ans avant commercialisation."
    },
    "vintages": {
      "2014": {
        "score": 98,
        "notes": "Monumental."
      },
      "2013": {
        "score": 97,
        "notes": "Élégant et profond."
      },
      "2012": {
        "score": 96,
        "notes": "Classique."
      }
    },
    "tags": [
      "Prestige",
      "Espagne",
      "Garde longue"
    ]
  },
  {
    "id": "ref-071",
    "name": "Bodegas Pingus",
    "cuvee": "Pingus",
    "region": "Espagne",
    "subRegion": "Ribera del Duero",
    "appellation": "Ribera del Duero DO",
    "classification": "",
    "color": "rouge",
    "robe": "#4E0E1A",
    "cepages": [
      {
        "name": "Tempranillo",
        "pct": 100
      }
    ],
    "alcoholRange": "14.5-15.5",
    "priceRange": "800-1500",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "cassis"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "poivre",
        "chocolat"
      ],
      "earthy": [
        "terre",
        "minerai"
      ],
      "wood": [
        "vanille",
        "café torréfié",
        "cèdre"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 55,
      "Épicé": 75,
      "Terreux": 70,
      "Boisé": 85,
      "Végétal": 20,
      "Minéral": 60,
      "Empyreumatique": 70
    },
    "pairings": [
      "Côte de bœuf maturée",
      "Cochon de lait",
      "Idiazábal fumé"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1995,
      "owner": "Peter Sisseck",
      "surface": "5 ha",
      "terroir": "Vieilles vignes, altitude 800m",
      "soil": [
        "Calcaire",
        "Sable",
        "Argile"
      ],
      "climate": "Continental extrême",
      "description": "Vin de garagiste devenu culte. Peter Sisseck, danois installé en Espagne."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Concentré et fin."
      },
      "2018": {
        "score": 97,
        "notes": "Opulent."
      }
    },
    "tags": [
      "Culte",
      "Espagne",
      "Garagiste"
    ]
  },
  {
    "id": "ref-072",
    "name": "Quinta do Noval",
    "cuvee": "Nacional",
    "region": "Portugal",
    "subRegion": "Douro",
    "appellation": "Porto Vintage",
    "classification": "",
    "color": "muté",
    "robe": "#3A0A10",
    "cepages": [
      {
        "name": "Touriga Nacional",
        "pct": 100
      }
    ],
    "alcoholRange": "20-21",
    "priceRange": "500-1000",
    "aromas": {
      "fruit": [
        "figue",
        "cerise confite",
        "prune"
      ],
      "floral": [
        "rose",
        "violette"
      ],
      "spicy": [
        "poivre",
        "cannelle",
        "chocolat"
      ],
      "earthy": [
        "terre",
        "minerai"
      ],
      "wood": [
        "café",
        "vanille",
        "caramel"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 60,
      "Épicé": 70,
      "Terreux": 60,
      "Boisé": 75,
      "Végétal": 15,
      "Minéral": 55,
      "Empyreumatique": 70
    },
    "pairings": [
      "Chocolat noir",
      "Stilton",
      "Noix"
    ],
    "service": {
      "temp": "16-18°",
      "carafe": "Carafage 2h",
      "verre": "Porto"
    },
    "guard": {
      "from": 20,
      "to": 80
    },
    "labels": [],
    "estate": {
      "founded": 1715,
      "owner": "AXA Millésimes",
      "surface": "2,5 ha (non greffé)",
      "terroir": "Schistes, vignes non greffées",
      "soil": [
        "Schistes"
      ],
      "climate": "Continental méditerranéen",
      "description": "L'un des rares vignobles non greffés au monde. Porto vintage d'exception."
    },
    "vintages": {
      "2011": {
        "score": 99,
        "notes": "Monumental."
      },
      "2003": {
        "score": 98,
        "notes": "Concentration absolue."
      }
    },
    "tags": [
      "Porto",
      "Prestige",
      "Non greffé"
    ]
  },
  {
    "id": "ref-073",
    "name": "Egon Müller",
    "cuvee": "Scharzhofberger Riesling Spätlese",
    "region": "Allemagne",
    "subRegion": "Moselle",
    "appellation": "Mosel",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C44A",
    "cepages": [
      {
        "name": "Riesling",
        "pct": 100
      }
    ],
    "alcoholRange": "8-9",
    "priceRange": "150-300",
    "aromas": {
      "fruit": [
        "pêche blanche",
        "abricot",
        "pomme verte"
      ],
      "floral": [
        "fleur d'oranger",
        "tilleul"
      ],
      "spicy": [],
      "earthy": [
        "ardoise",
        "silex",
        "fumée"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 75,
      "Épicé": 10,
      "Terreux": 40,
      "Boisé": 5,
      "Végétal": 35,
      "Minéral": 95,
      "Empyreumatique": 15
    },
    "pairings": [
      "Cuisine asiatique épicée",
      "Homard",
      "Fromage de chèvre frais"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Riesling"
    },
    "guard": {
      "from": 5,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1797,
      "owner": "Egon Müller IV",
      "surface": "12 ha",
      "terroir": "Ardoise bleue, Scharzhofberg",
      "soil": [
        "Ardoise bleue"
      ],
      "climate": "Continental froid",
      "description": "Le plus grand Riesling de Moselle. Vendanges tardives légendaires."
    },
    "vintages": {
      "2020": {
        "score": 96,
        "notes": "Cristallin et pur."
      },
      "2019": {
        "score": 97,
        "notes": "Perfection demi-sec."
      }
    },
    "tags": [
      "Riesling",
      "Allemagne",
      "Moselle"
    ]
  },
  {
    "id": "ref-074",
    "name": "Opus One",
    "cuvee": "",
    "region": "USA",
    "subRegion": "Californie",
    "appellation": "Napa Valley",
    "classification": "",
    "color": "rouge",
    "robe": "#520F1B",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 79
      },
      {
        "name": "Merlot",
        "pct": 7
      },
      {
        "name": "Cabernet Franc",
        "pct": 7
      },
      {
        "name": "Petit Verdot",
        "pct": 5
      },
      {
        "name": "Malbec",
        "pct": 2
      }
    ],
    "alcoholRange": "14.5-15",
    "priceRange": "400-600",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise noire"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "réglisse",
        "cèdre",
        "vanille"
      ],
      "earthy": [
        "terre"
      ],
      "wood": [
        "chêne neuf",
        "café",
        "chocolat"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 55,
      "Boisé": 80,
      "Végétal": 25,
      "Minéral": 50,
      "Empyreumatique": 65
    },
    "pairings": [
      "Côte de bœuf",
      "Filet mignon",
      "Cheddar vieilli"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1979,
      "owner": "Constellation Brands & Famille Rothschild",
      "surface": "60 ha",
      "terroir": "Alluvions profondes, Oakville",
      "soil": [
        "Alluvions",
        "Argile",
        "Graviers"
      ],
      "climate": "Méditerranéen",
      "description": "Joint-venture entre Baron Philippe de Rothschild et Robert Mondavi."
    },
    "vintages": {
      "2019": {
        "score": 96,
        "notes": "Opulent et structuré."
      },
      "2018": {
        "score": 97,
        "notes": "Grand Opus One."
      }
    },
    "tags": [
      "Napa Valley",
      "Prestige",
      "USA"
    ]
  },
  {
    "id": "ref-075",
    "name": "Ridge Vineyards",
    "cuvee": "Monte Bello",
    "region": "USA",
    "subRegion": "Californie",
    "appellation": "Santa Cruz Mountains",
    "classification": "",
    "color": "rouge",
    "robe": "#550F1C",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 77
      },
      {
        "name": "Merlot",
        "pct": 12
      },
      {
        "name": "Petit Verdot",
        "pct": 8
      },
      {
        "name": "Cabernet Franc",
        "pct": 3
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "200-350",
    "aromas": {
      "fruit": [
        "cassis",
        "cerise noire",
        "mûre"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "cèdre",
        "menthol",
        "réglisse"
      ],
      "earthy": [
        "graphite",
        "terre",
        "minerai"
      ],
      "wood": [
        "chêne américain",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 75,
      "Boisé": 60,
      "Végétal": 30,
      "Minéral": 70,
      "Empyreumatique": 50
    },
    "pairings": [
      "Agneau grillé",
      "Bœuf braisé",
      "Gouda vieilli"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 8,
      "to": 25
    },
    "labels": [],
    "estate": {
      "founded": 1885,
      "owner": "Otsuka Holdings",
      "surface": "25 ha",
      "terroir": "Calcaire, altitude 700m",
      "soil": [
        "Calcaire",
        "Argile",
        "Gravier"
      ],
      "climate": "Méditerranéen d'altitude",
      "description": "Paul Draper a créé l'un des plus grands Cabernets américains. Vainqueur du Jugement de Paris 2006."
    },
    "vintages": {
      "2019": {
        "score": 97,
        "notes": "Structure et élégance."
      },
      "2018": {
        "score": 96,
        "notes": "Profond et minéral."
      }
    },
    "tags": [
      "Classique",
      "Californie",
      "USA"
    ]
  },
  {
    "id": "ref-076",
    "name": "Catena Zapata",
    "cuvee": "Adrianna Vineyard Mundus Bacillus Terrae",
    "region": "Argentine",
    "subRegion": "Mendoza",
    "appellation": "Mendoza",
    "classification": "",
    "color": "rouge",
    "robe": "#520E1A",
    "cepages": [
      {
        "name": "Malbec",
        "pct": 100
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "200-350",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise noire",
        "prune"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre noir",
        "réglisse"
      ],
      "earthy": [
        "terre",
        "minerai",
        "graphite"
      ],
      "wood": [
        "cèdre",
        "vanille fine"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 55,
      "Épicé": 70,
      "Terreux": 80,
      "Boisé": 60,
      "Végétal": 25,
      "Minéral": 75,
      "Empyreumatique": 50
    },
    "pairings": [
      "Bœuf argentin",
      "Empanadas",
      "Provolone fumé"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1902,
      "owner": "Famille Catena Zapata",
      "surface": "5 ha (Adrianna)",
      "terroir": "Altitude 1500m, sols calcaires",
      "soil": [
        "Calcaire",
        "Argile",
        "Sable"
      ],
      "climate": "Continental d'altitude",
      "description": "Le vignoble le plus haut de Mendoza. Laura Catena pousse le Malbec vers la haute précision."
    },
    "vintages": {
      "2019": {
        "score": 98,
        "notes": "Minéral et profond."
      },
      "2018": {
        "score": 97,
        "notes": "Précision rare."
      }
    },
    "tags": [
      "Malbec",
      "Argentine",
      "Altitude"
    ]
  },
  {
    "id": "ref-077",
    "name": "Penfolds",
    "cuvee": "Grange",
    "region": "Australie",
    "subRegion": "Australie-Méridionale",
    "appellation": "South Australia",
    "classification": "",
    "color": "rouge",
    "robe": "#4E0E18",
    "cepages": [
      {
        "name": "Shiraz",
        "pct": 96
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 4
      }
    ],
    "alcoholRange": "14.5-15",
    "priceRange": "600-900",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "prune confite"
      ],
      "floral": [],
      "spicy": [
        "poivre noir",
        "réglisse",
        "chocolat"
      ],
      "earthy": [
        "terre",
        "encre"
      ],
      "wood": [
        "vanille",
        "café torréfié",
        "chêne américain"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 30,
      "Épicé": 80,
      "Terreux": 70,
      "Boisé": 85,
      "Végétal": 20,
      "Minéral": 45,
      "Empyreumatique": 75
    },
    "pairings": [
      "Bœuf braisé",
      "Agneau épicé",
      "Cheddar vieilli"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 2h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 10,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1844,
      "owner": "Treasury Wine Estates",
      "surface": "Multi-parcelles",
      "terroir": "Assemblage de régions d'Australie méridionale",
      "soil": [
        "Terra rossa",
        "Argile",
        "Calcaire"
      ],
      "climate": "Méditerranéen",
      "description": "Le plus grand vin australien. Créé en 1951 par Max Schubert, inspiré par Bordeaux."
    },
    "vintages": {
      "2018": {
        "score": 99,
        "notes": "Monumental."
      },
      "2017": {
        "score": 97,
        "notes": "Puissant et élégant."
      },
      "2016": {
        "score": 98,
        "notes": "Grand Grange."
      }
    },
    "tags": [
      "Shiraz",
      "Australie",
      "Prestige"
    ]
  },
  {
    "id": "ref-078",
    "name": "Château Musar",
    "cuvee": "",
    "region": "Liban",
    "subRegion": "Vallée de la Bekaa",
    "appellation": "Bekaa Valley",
    "classification": "",
    "color": "rouge",
    "robe": "#601824",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 40
      },
      {
        "name": "Cinsault",
        "pct": 30
      },
      {
        "name": "Carignan",
        "pct": 30
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "30-50",
    "aromas": {
      "fruit": [
        "cerise confite",
        "figue",
        "prune"
      ],
      "floral": [
        "rose fanée"
      ],
      "spicy": [
        "épices orientales",
        "cannelle",
        "cardamome"
      ],
      "earthy": [
        "cuir",
        "terre",
        "encens"
      ],
      "wood": [
        "cèdre",
        "vanille"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 55,
      "Épicé": 80,
      "Terreux": 75,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 50,
      "Empyreumatique": 60
    },
    "pairings": [
      "Mezzé libanais",
      "Agneau épicé",
      "Fromage de brebis"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1930,
      "owner": "Famille Hochar",
      "surface": "180 ha",
      "terroir": "Calcaire, altitude 1000m, Bekaa",
      "soil": [
        "Calcaire",
        "Argile rouge"
      ],
      "climate": "Méditerranéen d'altitude",
      "description": "Le plus célèbre vin du Liban. Serge Hochar a vinifié pendant la guerre civile."
    },
    "vintages": {
      "2017": {
        "score": 93,
        "notes": "Épicé et complexe."
      },
      "2015": {
        "score": 92,
        "notes": "Élégant et profond."
      }
    },
    "tags": [
      "Liban",
      "Historique",
      "Épicé"
    ]
  },
  {
    "id": "ref-079",
    "name": "Klein Constantia",
    "cuvee": "Vin de Constance",
    "region": "Afrique du Sud",
    "subRegion": "Constantia",
    "appellation": "Constantia",
    "classification": "",
    "color": "liquoreux",
    "robe": "#D0901A",
    "cepages": [
      {
        "name": "Muscat de Frontignan",
        "pct": 100
      }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "60-100",
    "aromas": {
      "fruit": [
        "abricot",
        "mangue",
        "pêche confite",
        "coing"
      ],
      "floral": [
        "fleur d'oranger",
        "jasmin",
        "rose"
      ],
      "spicy": [
        "cannelle",
        "gingembre"
      ],
      "earthy": [],
      "wood": [
        "miel",
        "cire",
        "caramel"
      ]
    },
    "aromaWheel": {
      "Fruit": 92,
      "Floral": 80,
      "Épicé": 50,
      "Terreux": 20,
      "Boisé": 35,
      "Végétal": 15,
      "Minéral": 45,
      "Empyreumatique": 40
    },
    "pairings": [
      "Foie gras",
      "Desserts aux fruits",
      "Bleu de chèvre"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 5,
      "to": 30
    },
    "labels": [],
    "estate": {
      "founded": 1685,
      "owner": "Zdenik Bakala & Charles Harman",
      "surface": "146 ha",
      "terroir": "Granit décomposé, Constantia",
      "soil": [
        "Granit",
        "Sable"
      ],
      "climate": "Méditerranéen maritime",
      "description": "Vin légendaire, favori de Napoléon. Récréé en 1990 après un siècle d'interruption."
    },
    "vintages": {
      "2019": {
        "score": 95,
        "notes": "Opulent et frais."
      },
      "2018": {
        "score": 94,
        "notes": "Exotique et élégant."
      }
    },
    "tags": [
      "Liquoreux",
      "Historique",
      "Afrique du Sud"
    ]
  },
  {
    "id": "ref-080",
    "name": "Concha y Toro",
    "cuvee": "Don Melchor",
    "region": "Chili",
    "subRegion": "Puente Alto",
    "appellation": "Puente Alto",
    "classification": "",
    "color": "rouge",
    "robe": "#520F1C",
    "cepages": [
      {
        "name": "Cabernet Sauvignon",
        "pct": 96
      },
      {
        "name": "Cabernet Franc",
        "pct": 3
      },
      {
        "name": "Merlot",
        "pct": 1
      }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "60-90",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "cerise noire"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "menthol",
        "cèdre"
      ],
      "earthy": [
        "graphite",
        "terre"
      ],
      "wood": [
        "vanille",
        "café",
        "chocolat"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 65,
      "Boisé": 70,
      "Végétal": 30,
      "Minéral": 60,
      "Empyreumatique": 55
    },
    "pairings": [
      "Bœuf grillé",
      "Empanadas",
      "Fromage de montagne"
    ],
    "service": {
      "temp": "17-18°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux XL"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [],
    "estate": {
      "founded": 1883,
      "owner": "Concha y Toro",
      "surface": "127 ha (Puente Alto)",
      "terroir": "Alluvions, piémont andin",
      "soil": [
        "Alluvions",
        "Calcaire",
        "Argile"
      ],
      "climate": "Méditerranéen d'altitude",
      "description": "Le grand vin chilien. Vignoble d'altitude face à la cordillère des Andes."
    },
    "vintages": {
      "2019": {
        "score": 95,
        "notes": "Élégant et profond."
      },
      "2018": {
        "score": 96,
        "notes": "Grand millésime."
      }
    },
    "tags": [
      "Cabernet",
      "Chili",
      "Prestige"
    ]
  },
  {
    "id": "ref-081",
    "name": "Cloudy Bay",
    "cuvee": "Sauvignon Blanc",
    "region": "Nouvelle-Zélande",
    "subRegion": "Marlborough",
    "appellation": "Marlborough",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C24A",
    "cepages": [
      {
        "name": "Sauvignon Blanc",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "18-25",
    "aromas": {
      "fruit": [
        "fruit de la passion",
        "pamplemousse",
        "groseille à maquereau"
      ],
      "floral": [
        "sureau"
      ],
      "spicy": [],
      "earthy": [
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 60,
      "Épicé": 10,
      "Terreux": 25,
      "Boisé": 5,
      "Végétal": 70,
      "Minéral": 55,
      "Empyreumatique": 10
    },
    "pairings": [
      "Saumon fumé",
      "Chèvre frais",
      "Salade de crustacés"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 0,
      "to": 3
    },
    "labels": [],
    "estate": {
      "founded": 1985,
      "owner": "LVMH",
      "surface": "230 ha",
      "terroir": "Alluvions et graviers, Wairau Valley",
      "soil": [
        "Alluvions",
        "Graviers",
        "Argile"
      ],
      "climate": "Maritime frais",
      "description": "A fait connaître le Sauvignon de Marlborough au monde entier."
    },
    "vintages": {
      "2023": {
        "score": 90,
        "notes": "Frais et aromatique."
      },
      "2022": {
        "score": 91,
        "notes": "Pur et expressif."
      }
    },
    "tags": [
      "Sauvignon",
      "Nouvelle-Zélande",
      "Fraîcheur"
    ]
  },
  {
    "id": "ref-082",
    "name": "Domaine Ogereau",
    "cuvee": "Coteaux du Layon Saint Lambert",
    "region": "Loire",
    "subRegion": "Anjou",
    "appellation": "Coteaux du Layon",
    "classification": "",
    "color": "liquoreux",
    "robe": "#D4A530",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "11-13",
    "priceRange": "15-25",
    "aromas": {
      "fruit": [
        "coing",
        "abricot",
        "poire confite"
      ],
      "floral": [
        "acacia",
        "miel"
      ],
      "spicy": [
        "gingembre"
      ],
      "earthy": [
        "ardoise"
      ],
      "wood": [
        "miel",
        "cire"
      ]
    },
    "aromaWheel": {
      "Fruit": 88,
      "Floral": 70,
      "Épicé": 30,
      "Terreux": 40,
      "Boisé": 20,
      "Végétal": 25,
      "Minéral": 75,
      "Empyreumatique": 30
    },
    "pairings": [
      "Foie gras",
      "Tarte aux poires",
      "Fourme d'Ambert"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe étroite"
    },
    "guard": {
      "from": 3,
      "to": 30
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1964,
      "owner": "Emmanuel Ogereau",
      "surface": "22 ha",
      "terroir": "Schistes carbonifères, Saint-Lambert",
      "soil": [
        "Schistes",
        "Carbonifère"
      ],
      "climate": "Océanique tempéré",
      "description": "Vignerons indépendants de référence en Anjou. Liquoreux et Cab Franc d'anthologie."
    },
    "vintages": {
      "2022": {
        "score": 93,
        "notes": "Pur et lumineux."
      },
      "2020": {
        "score": 94,
        "notes": "Riche et frais."
      }
    },
    "tags": [
      "Bio",
      "Liquoreux",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-083",
    "name": "Mas del Périé",
    "cuvee": "Les Pièces Longues",
    "region": "Sud-Ouest",
    "subRegion": "Cahors",
    "appellation": "Cahors",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C44A",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "15-22",
    "aromas": {
      "fruit": [
        "coing",
        "poire",
        "citron"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [],
      "earthy": [
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 65,
      "Épicé": 20,
      "Terreux": 50,
      "Boisé": 15,
      "Végétal": 50,
      "Minéral": 80,
      "Empyreumatique": 20
    },
    "pairings": [
      "Truite",
      "Fromage de chèvre",
      "Salade composée"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Chardonnay"
    },
    "guard": {
      "from": 2,
      "to": 8
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 2006,
      "owner": "Fabien Jouves",
      "surface": "30 ha",
      "terroir": "Argilo-calcaire, Cahors",
      "soil": [
        "Argilo-calcaire"
      ],
      "climate": "Océanique continental",
      "description": "Pépite des salons. Chenin à Cahors ! Vinifie aussi en amphores un vin orange exceptionnel."
    },
    "vintages": {
      "2022": {
        "score": 91,
        "notes": "Frais et minéral."
      },
      "2021": {
        "score": 90,
        "notes": "Tendu et pur."
      }
    },
    "tags": [
      "Bio",
      "Chenin",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-084",
    "name": "Cave du Prieuré",
    "cuvee": "Marestel Tradition",
    "region": "Savoie",
    "subRegion": "",
    "appellation": "Roussette de Savoie Marestel",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C04A",
    "cepages": [
      {
        "name": "Altesse",
        "pct": 100
      }
    ],
    "alcoholRange": "12-13",
    "priceRange": "12-18",
    "aromas": {
      "fruit": [
        "poire",
        "pomme",
        "citron"
      ],
      "floral": [
        "aubépine",
        "acacia"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "caillou"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 65,
      "Épicé": 15,
      "Terreux": 45,
      "Boisé": 10,
      "Végétal": 45,
      "Minéral": 85,
      "Empyreumatique": 15
    },
    "pairings": [
      "Féra du lac du Bourget",
      "Fondue",
      "Beaufort"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Chablis"
    },
    "guard": {
      "from": 2,
      "to": 8
    },
    "labels": [],
    "estate": {
      "founded": 1962,
      "owner": "Famille Barlet",
      "surface": "10 ha",
      "terroir": "Coteau de Jongieux, 30-70% pente, lac du Bourget",
      "soil": [
        "Calcaire",
        "Éboulis"
      ],
      "climate": "Continental lacustre",
      "description": "Appellation Marestel confidentielle. Cépage Altesse ramené de Chypre au XVIe siècle."
    },
    "vintages": {
      "2023": {
        "score": 90,
        "notes": "Intensité magnifique."
      },
      "2022": {
        "score": 89,
        "notes": "Frais et floral."
      }
    },
    "tags": [
      "Savoie",
      "Altesse",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-085",
    "name": "Château Souché",
    "cuvee": "Melon de Bourgogne",
    "region": "Loire",
    "subRegion": "Pays Nantais",
    "appellation": "Muscadet Côtes de Grandlieu",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C84A",
    "cepages": [
      {
        "name": "Melon de Bourgogne",
        "pct": 100
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "8-12",
    "aromas": {
      "fruit": [
        "citron",
        "pomme verte",
        "poire"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [],
      "earthy": [
        "coquillage",
        "iode"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 55,
      "Épicé": 10,
      "Terreux": 35,
      "Boisé": 5,
      "Végétal": 40,
      "Minéral": 85,
      "Empyreumatique": 10
    },
    "pairings": [
      "Huîtres",
      "Moules marinières",
      "Sardines grillées"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 1,
      "to": 5
    },
    "labels": [],
    "estate": {
      "founded": 1975,
      "owner": "Famille Petiteau",
      "surface": "25 ha",
      "terroir": "Entre mer et lac de Grandlieu, salinité",
      "soil": [
        "Gneiss",
        "Schistes"
      ],
      "climate": "Océanique",
      "description": "Muscadet Côtes de Grandlieu avec touche de salinité. Rapport qualité-prix imbattable."
    },
    "vintages": {
      "2023": {
        "score": 88,
        "notes": "Salin et vif."
      },
      "2022": {
        "score": 89,
        "notes": "Intense et frais."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Muscadet",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-086",
    "name": "Domaine Belles-Graves",
    "cuvee": "",
    "region": "Bordeaux",
    "subRegion": "Libournais",
    "appellation": "Lalande-de-Pomerol",
    "classification": "",
    "color": "rouge",
    "robe": "#5E1222",
    "cepages": [
      {
        "name": "Merlot",
        "pct": 80
      },
      {
        "name": "Cabernet Franc",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "15-22",
    "aromas": {
      "fruit": [
        "cerise noire",
        "prune",
        "mûre"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "réglisse"
      ],
      "earthy": [
        "terre",
        "sous-bois"
      ],
      "wood": [
        "vanille douce"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 50,
      "Épicé": 55,
      "Terreux": 60,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 45,
      "Empyreumatique": 40
    },
    "pairings": [
      "Confit de canard",
      "Entrecôte",
      "Tomme de brebis"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 30 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [],
    "estate": {
      "founded": 1985,
      "owner": "Xavier Piton",
      "surface": "18 ha",
      "terroir": "Graves et crasses de fer, Néac",
      "soil": [
        "Graves",
        "Crasse de fer",
        "Argile"
      ],
      "climate": "Océanique continental",
      "description": "Habitué des salons. Lalande-de-Pomerol accessible et gourmand."
    },
    "vintages": {
      "2020": {
        "score": 90,
        "notes": "Fruité et soyeux."
      },
      "2019": {
        "score": 91,
        "notes": "Charnu et équilibré."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Lalande-de-Pomerol",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-087",
    "name": "Domaine de la Janasse",
    "cuvee": "Chaupin",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Châteauneuf-du-Pape",
    "classification": "",
    "color": "rouge",
    "robe": "#621822",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 100
      }
    ],
    "alcoholRange": "15-16",
    "priceRange": "60-90",
    "aromas": {
      "fruit": [
        "fraise confite",
        "cerise",
        "framboise"
      ],
      "floral": [
        "lavande"
      ],
      "spicy": [
        "poivre",
        "thym"
      ],
      "earthy": [
        "garrigue",
        "terre chaude"
      ],
      "wood": [
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 55,
      "Épicé": 70,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 50,
      "Minéral": 45,
      "Empyreumatique": 35
    },
    "pairings": [
      "Gigot d'agneau",
      "Daube",
      "Banon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bourgogne ballon"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [],
    "estate": {
      "founded": 1973,
      "owner": "Famille Sabon",
      "surface": "90 ha",
      "terroir": "Galets roulés, sable, safres",
      "soil": [
        "Galets roulés",
        "Sable",
        "Safres"
      ],
      "climate": "Méditerranéen",
      "description": "Christophe Sabon produit des Châteauneuf concentrés et gourmands. Habitué des récompenses."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Concentré et solaire."
      },
      "2019": {
        "score": 96,
        "notes": "Grand Grenache."
      }
    },
    "tags": [
      "Grenache",
      "Châteauneuf",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-088",
    "name": "Domaine Saint-Préfert",
    "cuvee": "Réserve Auguste Favier",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Châteauneuf-du-Pape",
    "classification": "",
    "color": "rouge",
    "robe": "#601520",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 60
      },
      {
        "name": "Mourvèdre",
        "pct": 20
      },
      {
        "name": "Syrah",
        "pct": 10
      },
      {
        "name": "Cinsault",
        "pct": 10
      }
    ],
    "alcoholRange": "15-15.5",
    "priceRange": "45-65",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "figue"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "thym",
        "réglisse"
      ],
      "earthy": [
        "garrigue",
        "terre"
      ],
      "wood": [
        "cuir",
        "cacao"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 50,
      "Épicé": 75,
      "Terreux": 70,
      "Boisé": 55,
      "Végétal": 50,
      "Minéral": 50,
      "Empyreumatique": 45
    },
    "pairings": [
      "Agneau confit",
      "Taureau",
      "Pélardon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1970,
      "owner": "Isabel Ferrando",
      "surface": "15 ha",
      "terroir": "Galets roulés, sols rouges",
      "soil": [
        "Galets roulés",
        "Argile rouge"
      ],
      "climate": "Méditerranéen",
      "description": "Isabel Ferrando a hissé le domaine parmi les meilleurs de l'appellation."
    },
    "vintages": {
      "2020": {
        "score": 94,
        "notes": "Épicé et profond."
      },
      "2019": {
        "score": 95,
        "notes": "Grand millésime."
      }
    },
    "tags": [
      "Châteauneuf",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-089",
    "name": "Domaine Alain Voge",
    "cuvee": "Les Vieilles Vignes",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Cornas",
    "classification": "",
    "color": "rouge",
    "robe": "#580F1C",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "35-55",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "olive noire"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "réglisse"
      ],
      "earthy": [
        "graphite",
        "terre"
      ],
      "wood": [
        "cuir",
        "fumée"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 30,
      "Minéral": 60,
      "Empyreumatique": 45
    },
    "pairings": [
      "Bœuf braisé",
      "Saucisson",
      "Saint-Nectaire"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Syrah"
    },
    "guard": {
      "from": 5,
      "to": 18
    },
    "labels": [],
    "estate": {
      "founded": 1958,
      "owner": "Albéric Mazoyer (gérant)",
      "surface": "10 ha",
      "terroir": "Granit décomposé, terrasses",
      "soil": [
        "Granit",
        "Arène granitique"
      ],
      "climate": "Continental méditerranéen",
      "description": "Référence de Cornas. Vieilles vignes de 60+ ans sur granit."
    },
    "vintages": {
      "2020": {
        "score": 93,
        "notes": "Pur et profond."
      },
      "2019": {
        "score": 94,
        "notes": "Soyeux et concentré."
      }
    },
    "tags": [
      "Cornas",
      "Syrah",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-090",
    "name": "Domaine Zind-Humbrecht",
    "cuvee": "Pinot Gris Clos Jebsal VT",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace Vendange Tardive",
    "classification": "",
    "color": "liquoreux",
    "robe": "#C89520",
    "cepages": [
      {
        "name": "Pinot Gris",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "40-65",
    "aromas": {
      "fruit": [
        "coing",
        "abricot",
        "mirabelle"
      ],
      "floral": [
        "rose",
        "acacia"
      ],
      "spicy": [
        "épices douces",
        "miel"
      ],
      "earthy": [
        "silex"
      ],
      "wood": [
        "cire"
      ]
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 70,
      "Épicé": 50,
      "Terreux": 35,
      "Boisé": 25,
      "Végétal": 20,
      "Minéral": 70,
      "Empyreumatique": 35
    },
    "pairings": [
      "Foie gras",
      "Munster",
      "Tarte aux mirabelles"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Alsace tulipe"
    },
    "guard": {
      "from": 5,
      "to": 25
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1959,
      "owner": "Famille Humbrecht",
      "surface": "41 ha",
      "terroir": "Marnes gypsifères, Clos Jebsal",
      "soil": [
        "Marnes",
        "Gypse"
      ],
      "climate": "Continental, abri vosgien",
      "description": "Le Clos Jebsal est un monopole sur marnes gypsifères. Vendanges tardives d'exception."
    },
    "vintages": {
      "2020": {
        "score": 96,
        "notes": "Opulent et cristallin."
      },
      "2019": {
        "score": 95,
        "notes": "Riche et pur."
      }
    },
    "tags": [
      "Biodynamie",
      "Vendange Tardive",
      "Alsace"
    ]
  },
  {
    "id": "ref-091",
    "name": "Domaine Josmeyer",
    "cuvee": "Riesling Le Kottabe",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C248",
    "cepages": [
      {
        "name": "Riesling",
        "pct": 100
      }
    ],
    "alcoholRange": "12-13",
    "priceRange": "15-22",
    "aromas": {
      "fruit": [
        "citron",
        "pomme verte",
        "pêche"
      ],
      "floral": [
        "tilleul",
        "sureau"
      ],
      "spicy": [],
      "earthy": [
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 70,
      "Épicé": 15,
      "Terreux": 35,
      "Boisé": 10,
      "Végétal": 45,
      "Minéral": 80,
      "Empyreumatique": 15
    },
    "pairings": [
      "Choucroute garnie",
      "Sandre",
      "Munster jeune"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Alsace tulipe"
    },
    "guard": {
      "from": 2,
      "to": 8
    },
    "labels": [],
    "estate": {
      "founded": 1854,
      "owner": "Famille Meyer",
      "surface": "27 ha",
      "terroir": "Argilo-calcaire, Wintzenheim",
      "soil": [
        "Argilo-calcaire"
      ],
      "climate": "Continental, abri vosgien",
      "description": "Domaine historique de Wintzenheim. Rieslings secs et tendus, style gastronomique."
    },
    "vintages": {
      "2022": {
        "score": 90,
        "notes": "Vif et floral."
      },
      "2021": {
        "score": 89,
        "notes": "Frais et citronné."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Riesling",
      "Alsace"
    ]
  },
  {
    "id": "ref-092",
    "name": "Domaine Albert Mann",
    "cuvee": "Pinot Noir Grand H",
    "region": "Alsace",
    "subRegion": "",
    "appellation": "Alsace",
    "classification": "",
    "color": "rouge",
    "robe": "#781C2A",
    "cepages": [
      {
        "name": "Pinot Noir",
        "pct": 100
      }
    ],
    "alcoholRange": "13-13.5",
    "priceRange": "25-38",
    "aromas": {
      "fruit": [
        "cerise",
        "framboise",
        "fraise"
      ],
      "floral": [
        "rose",
        "pivoine"
      ],
      "spicy": [
        "poivre",
        "épices douces"
      ],
      "earthy": [
        "terre",
        "sous-bois"
      ],
      "wood": [
        "vanille fine"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 70,
      "Épicé": 45,
      "Terreux": 55,
      "Boisé": 40,
      "Végétal": 35,
      "Minéral": 60,
      "Empyreumatique": 30
    },
    "pairings": [
      "Baeckeoffe",
      "Gibier",
      "Munster affiné"
    ],
    "service": {
      "temp": "14-15°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 3,
      "to": 10
    },
    "labels": [
      "Biodynamie"
    ],
    "estate": {
      "founded": 1654,
      "owner": "Famille Barthelmé",
      "surface": "21 ha",
      "terroir": "Granit, Grand Cru Hengst",
      "soil": [
        "Granit",
        "Calcaire"
      ],
      "climate": "Continental",
      "description": "Pinot Noir de classe bourguignonne en Alsace. Biodynamie depuis 2000."
    },
    "vintages": {
      "2021": {
        "score": 92,
        "notes": "Fin et soyeux."
      },
      "2020": {
        "score": 93,
        "notes": "Profond et élégant."
      }
    },
    "tags": [
      "Biodynamie",
      "Pinot Noir",
      "Alsace"
    ]
  },
  {
    "id": "ref-093",
    "name": "Domaine Bunan",
    "cuvee": "Moulin des Costes",
    "region": "Provence",
    "subRegion": "",
    "appellation": "Bandol",
    "classification": "",
    "color": "rouge",
    "robe": "#691822",
    "cepages": [
      {
        "name": "Mourvèdre",
        "pct": 65
      },
      {
        "name": "Grenache",
        "pct": 20
      },
      {
        "name": "Syrah",
        "pct": 15
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "18-28",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "prune"
      ],
      "floral": [],
      "spicy": [
        "poivre",
        "thym",
        "laurier"
      ],
      "earthy": [
        "garrigue",
        "terre chaude"
      ],
      "wood": [
        "cuir",
        "sous-bois"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 35,
      "Épicé": 75,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 55,
      "Minéral": 50,
      "Empyreumatique": 35
    },
    "pairings": [
      "Bouillabaisse",
      "Pieds paquets",
      "Brousse du Rove"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 30 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 4,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1961,
      "owner": "Famille Bunan",
      "surface": "85 ha",
      "terroir": "Restanques argilo-calcaires, Le Castellet",
      "soil": [
        "Argilo-calcaire",
        "Calcaire"
      ],
      "climate": "Méditerranéen",
      "description": "Deux domaines en Bandol. Moulin des Costes est le plus accessible. Habitué des salons."
    },
    "vintages": {
      "2020": {
        "score": 91,
        "notes": "Garrigue et fruit."
      },
      "2019": {
        "score": 92,
        "notes": "Concentré et frais."
      }
    },
    "tags": [
      "Bandol",
      "Rapport qualité-prix",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-094",
    "name": "Domaine de la Mordorée",
    "cuvee": "La Dame Rousse",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Tavel",
    "classification": "",
    "color": "rosé",
    "robe": "#E8A088",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 60
      },
      {
        "name": "Cinsault",
        "pct": 15
      },
      {
        "name": "Mourvèdre",
        "pct": 10
      },
      {
        "name": "Syrah",
        "pct": 10
      },
      {
        "name": "Clairette",
        "pct": 5
      }
    ],
    "alcoholRange": "14-14.5",
    "priceRange": "14-20",
    "aromas": {
      "fruit": [
        "fraise",
        "groseille",
        "pêche de vigne"
      ],
      "floral": [
        "rose"
      ],
      "spicy": [
        "poivre rose"
      ],
      "earthy": [
        "garrigue"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 65,
      "Épicé": 40,
      "Terreux": 30,
      "Boisé": 10,
      "Végétal": 35,
      "Minéral": 45,
      "Empyreumatique": 15
    },
    "pairings": [
      "Cuisine asiatique",
      "Paella",
      "Ratatouille"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Tulipe"
    },
    "guard": {
      "from": 1,
      "to": 4
    },
    "labels": [],
    "estate": {
      "founded": 1986,
      "owner": "Famille Delorme",
      "surface": "60 ha",
      "terroir": "Galets roulés, sables, Tavel",
      "soil": [
        "Galets roulés",
        "Sable",
        "Argile"
      ],
      "climate": "Méditerranéen",
      "description": "Tavel est la seule AOC exclusivement rosé en France. La Mordorée en est la référence."
    },
    "vintages": {
      "2023": {
        "score": 91,
        "notes": "Rosé gastronomique."
      },
      "2022": {
        "score": 90,
        "notes": "Frais et structuré."
      }
    },
    "tags": [
      "Rosé",
      "Tavel",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-095",
    "name": "Château de Pibarnon",
    "cuvee": "",
    "region": "Provence",
    "subRegion": "",
    "appellation": "Bandol",
    "classification": "",
    "color": "rouge",
    "robe": "#681822",
    "cepages": [
      {
        "name": "Mourvèdre",
        "pct": 90
      },
      {
        "name": "Grenache",
        "pct": 10
      }
    ],
    "alcoholRange": "13.5-14.5",
    "priceRange": "30-45",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre sauvage",
        "olive"
      ],
      "floral": [],
      "spicy": [
        "poivre",
        "thym",
        "romarin"
      ],
      "earthy": [
        "garrigue",
        "terre sèche",
        "pierre"
      ],
      "wood": [
        "cuir",
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 35,
      "Épicé": 80,
      "Terreux": 80,
      "Boisé": 50,
      "Végétal": 60,
      "Minéral": 60,
      "Empyreumatique": 40
    },
    "pairings": [
      "Daube provençale",
      "Pieds paquets",
      "Fromage de chèvre sec"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 1h",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 20
    },
    "labels": [],
    "estate": {
      "founded": 1978,
      "owner": "Famille de Saint-Victor",
      "surface": "50 ha",
      "terroir": "Calcaire du Trias, altitude 300m",
      "soil": [
        "Calcaire du Trias",
        "Argile"
      ],
      "climate": "Méditerranéen d'altitude",
      "description": "Le plus haut vignoble de Bandol. 90% Mourvèdre, terroir calcaire unique."
    },
    "vintages": {
      "2020": {
        "score": 94,
        "notes": "Minéral et profond."
      },
      "2019": {
        "score": 95,
        "notes": "Grand Bandol."
      }
    },
    "tags": [
      "Bandol",
      "Mourvèdre",
      "Calcaire"
    ]
  },
  {
    "id": "ref-096",
    "name": "Domaine du Vissoux",
    "cuvee": "Les Griottes",
    "region": "Beaujolais",
    "subRegion": "",
    "appellation": "Fleurie",
    "classification": "Cru du Beaujolais",
    "color": "rouge",
    "robe": "#882838",
    "cepages": [
      {
        "name": "Gamay",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "16-24",
    "aromas": {
      "fruit": [
        "cerise griotte",
        "framboise",
        "fraise"
      ],
      "floral": [
        "rose",
        "iris"
      ],
      "spicy": [
        "poivre rose"
      ],
      "earthy": [
        "granit"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 90,
      "Floral": 80,
      "Épicé": 30,
      "Terreux": 45,
      "Boisé": 10,
      "Végétal": 35,
      "Minéral": 55,
      "Empyreumatique": 10
    },
    "pairings": [
      "Charcuterie",
      "Blanquette de veau",
      "Saint-Félicien"
    ],
    "service": {
      "temp": "13-14°",
      "carafe": "Servir direct",
      "verre": "Bourgogne"
    },
    "guard": {
      "from": 1,
      "to": 6
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1975,
      "owner": "Pierre-Marie Chermette",
      "surface": "32 ha",
      "terroir": "Granit rose, Fleurie",
      "soil": [
        "Granit rose",
        "Arène"
      ],
      "climate": "Continental",
      "description": "Fleurie de référence. Bio certifié, vinifications parcellaires."
    },
    "vintages": {
      "2022": {
        "score": 91,
        "notes": "Juteux et floral."
      },
      "2021": {
        "score": 90,
        "notes": "Frais et croquant."
      }
    },
    "tags": [
      "Bio",
      "Beaujolais",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-097",
    "name": "Domaine Ilarria",
    "cuvee": "",
    "region": "Sud-Ouest",
    "subRegion": "Pays Basque",
    "appellation": "Irouléguy",
    "classification": "",
    "color": "rouge",
    "robe": "#621822",
    "cepages": [
      {
        "name": "Tannat",
        "pct": 50
      },
      {
        "name": "Cabernet Franc",
        "pct": 30
      },
      {
        "name": "Cabernet Sauvignon",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "15-25",
    "aromas": {
      "fruit": [
        "cerise noire",
        "mûre",
        "prune"
      ],
      "floral": [],
      "spicy": [
        "poivre",
        "piment d'Espelette"
      ],
      "earthy": [
        "terre",
        "sous-bois"
      ],
      "wood": [
        "cuir"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 30,
      "Épicé": 70,
      "Terreux": 65,
      "Boisé": 40,
      "Végétal": 45,
      "Minéral": 55,
      "Empyreumatique": 35
    },
    "pairings": [
      "Axoa de veau",
      "Piperade",
      "Ossau-Iraty"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Carafage 30 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [],
    "estate": {
      "founded": 1988,
      "owner": "Peio Espil",
      "surface": "10 ha",
      "terroir": "Grès triasique, terrasses escarpées",
      "soil": [
        "Grès triasique",
        "Schiste"
      ],
      "climate": "Océanique montagnard",
      "description": "Vignoble héroïque basque. Terrasses vertigineuses face aux Pyrénées."
    },
    "vintages": {
      "2021": {
        "score": 91,
        "notes": "Sauvage et frais."
      },
      "2020": {
        "score": 92,
        "notes": "Profond et épicé."
      }
    },
    "tags": [
      "Irouléguy",
      "Basque",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-098",
    "name": "Domaine Combier",
    "cuvee": "Clos des Grives",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Crozes-Hermitage",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1020",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "25-38",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette"
      ],
      "spicy": [
        "poivre",
        "olive"
      ],
      "earthy": [
        "graphite"
      ],
      "wood": [
        "réglisse",
        "cacao"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 55,
      "Épicé": 65,
      "Terreux": 55,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 55,
      "Empyreumatique": 45
    },
    "pairings": [
      "Bœuf braisé",
      "Pigeon",
      "Saint-Marcellin"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Syrah"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1970,
      "owner": "Laurent Combier",
      "surface": "25 ha",
      "terroir": "Galets roulés et loess, Pont-de-l'Isère",
      "soil": [
        "Galets roulés",
        "Loess"
      ],
      "climate": "Continental méditerranéen",
      "description": "Bio pionnier en Crozes. Le Clos des Grives est une parcelle d'exception."
    },
    "vintages": {
      "2020": {
        "score": 93,
        "notes": "Concentré et soyeux."
      },
      "2019": {
        "score": 94,
        "notes": "Grand Crozes."
      }
    },
    "tags": [
      "Bio",
      "Crozes-Hermitage",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-099",
    "name": "Domaine de Villeneuve",
    "cuvee": "Les Vieilles Vignes",
    "region": "Rhône",
    "subRegion": "Rhône Sud",
    "appellation": "Châteauneuf-du-Pape",
    "classification": "",
    "color": "rouge",
    "robe": "#601822",
    "cepages": [
      {
        "name": "Grenache",
        "pct": 65
      },
      {
        "name": "Mourvèdre",
        "pct": 20
      },
      {
        "name": "Syrah",
        "pct": 10
      },
      {
        "name": "Cinsault",
        "pct": 5
      }
    ],
    "alcoholRange": "14.5-15.5",
    "priceRange": "28-40",
    "aromas": {
      "fruit": [
        "cerise confite",
        "framboise",
        "mûre"
      ],
      "floral": [
        "lavande"
      ],
      "spicy": [
        "poivre",
        "thym",
        "romarin"
      ],
      "earthy": [
        "garrigue",
        "terre chaude"
      ],
      "wood": [
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 50,
      "Épicé": 70,
      "Terreux": 70,
      "Boisé": 45,
      "Végétal": 55,
      "Minéral": 45,
      "Empyreumatique": 35
    },
    "pairings": [
      "Daube",
      "Gigot",
      "Picodon"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1994,
      "owner": "Stanislas Wallut",
      "surface": "10 ha",
      "terroir": "Galets roulés, sables et safres",
      "soil": [
        "Galets roulés",
        "Sable"
      ],
      "climate": "Méditerranéen",
      "description": "Petit domaine bio, vinification en grappes entières. Châteauneuf abordable et authentique."
    },
    "vintages": {
      "2020": {
        "score": 92,
        "notes": "Fruité et épicé."
      },
      "2019": {
        "score": 93,
        "notes": "Profond et élégant."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Châteauneuf",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-100",
    "name": "Château Tour des Gendres",
    "cuvee": "Cuvée des Conti",
    "region": "Sud-Ouest",
    "subRegion": "Bergerac",
    "appellation": "Bergerac",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C248",
    "cepages": [
      {
        "name": "Sémillon",
        "pct": 50
      },
      {
        "name": "Sauvignon Blanc",
        "pct": 30
      },
      {
        "name": "Muscadelle",
        "pct": 20
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "10-15",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "pêche",
        "abricot"
      ],
      "floral": [
        "fleur de sureau",
        "acacia"
      ],
      "spicy": [],
      "earthy": [
        "silex"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 82,
      "Floral": 70,
      "Épicé": 15,
      "Terreux": 30,
      "Boisé": 10,
      "Végétal": 50,
      "Minéral": 60,
      "Empyreumatique": 10
    },
    "pairings": [
      "Salade de chèvre",
      "Poisson grillé",
      "Apéritif"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 1,
      "to": 4
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1925,
      "owner": "Famille de Conti",
      "surface": "50 ha",
      "terroir": "Argilo-calcaire, coteaux de Bergerac",
      "soil": [
        "Argilo-calcaire"
      ],
      "climate": "Océanique continental",
      "description": "Référence du Bergerac en bio. La Cuvée des Conti est un best-seller des salons."
    },
    "vintages": {
      "2023": {
        "score": 89,
        "notes": "Frais et aromatique."
      },
      "2022": {
        "score": 90,
        "notes": "Fruité et vif."
      }
    },
    "tags": [
      "Bio",
      "Rapport qualité-prix",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-101",
    "name": "Domaine Berthet-Bondet",
    "cuvee": "Côtes du Jura Tradition",
    "region": "Jura",
    "subRegion": "",
    "appellation": "Côtes du Jura",
    "classification": "",
    "color": "blanc",
    "robe": "#D4B840",
    "cepages": [
      {
        "name": "Chardonnay",
        "pct": 60
      },
      {
        "name": "Savagnin",
        "pct": 40
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "12-18",
    "aromas": {
      "fruit": [
        "pomme",
        "noix fraîche",
        "citron"
      ],
      "floral": [
        "fleur blanche"
      ],
      "spicy": [
        "curry",
        "noix de muscade"
      ],
      "earthy": [
        "pierre"
      ],
      "wood": [
        "noisette",
        "beurre"
      ]
    },
    "aromaWheel": {
      "Fruit": 70,
      "Floral": 50,
      "Épicé": 55,
      "Terreux": 55,
      "Boisé": 45,
      "Végétal": 30,
      "Minéral": 75,
      "Empyreumatique": 45
    },
    "pairings": [
      "Comté 18 mois",
      "Poulet au vin jaune",
      "Morilles"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Servir direct",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [],
    "estate": {
      "founded": 1985,
      "owner": "Jean Berthet-Bondet",
      "surface": "15 ha",
      "terroir": "Marnes grises du Lias, Château-Chalon",
      "soil": [
        "Marnes grises",
        "Lias"
      ],
      "climate": "Continental montagnard",
      "description": "Producteur respecté de Château-Chalon. La cuvée Tradition mêle Chardonnay et Savagnin ouillé."
    },
    "vintages": {
      "2021": {
        "score": 91,
        "notes": "Complexe et typé."
      },
      "2020": {
        "score": 92,
        "notes": "Beau Jura."
      }
    },
    "tags": [
      "Jura",
      "Tradition",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-102",
    "name": "Château d'Oupia",
    "cuvee": "Les Hérétiques",
    "region": "Languedoc",
    "subRegion": "Minervois",
    "appellation": "Minervois",
    "classification": "",
    "color": "rouge",
    "robe": "#601822",
    "cepages": [
      {
        "name": "Carignan",
        "pct": 50
      },
      {
        "name": "Grenache",
        "pct": 30
      },
      {
        "name": "Syrah",
        "pct": 20
      }
    ],
    "alcoholRange": "13.5-14",
    "priceRange": "8-12",
    "aromas": {
      "fruit": [
        "cerise",
        "mûre",
        "prune"
      ],
      "floral": [],
      "spicy": [
        "poivre",
        "thym",
        "laurier"
      ],
      "earthy": [
        "garrigue",
        "terre sèche"
      ],
      "wood": [
        "réglisse"
      ]
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 35,
      "Épicé": 65,
      "Terreux": 65,
      "Boisé": 35,
      "Végétal": 50,
      "Minéral": 45,
      "Empyreumatique": 30
    },
    "pairings": [
      "Cassoulet",
      "Grillades",
      "Pélardon"
    ],
    "service": {
      "temp": "15-16°",
      "carafe": "Servir direct",
      "verre": "Bordeaux"
    },
    "guard": {
      "from": 2,
      "to": 8
    },
    "labels": [],
    "estate": {
      "founded": 1860,
      "owner": "André Iché",
      "surface": "30 ha",
      "terroir": "Argilo-calcaire, garrigue",
      "soil": [
        "Argilo-calcaire",
        "Grès"
      ],
      "climate": "Méditerranéen",
      "description": "Vieux Carignan sur garrigue. Rapport qualité-prix légendaire des salons."
    },
    "vintages": {
      "2022": {
        "score": 88,
        "notes": "Croquant et épicé."
      },
      "2021": {
        "score": 89,
        "notes": "Gourmand."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Minervois",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-103",
    "name": "Domaine de Fontsainte",
    "cuvee": "Gris de Gris",
    "region": "Languedoc",
    "subRegion": "Corbières",
    "appellation": "Corbières",
    "classification": "",
    "color": "rosé",
    "robe": "#F0B098",
    "cepages": [
      {
        "name": "Grenache Gris",
        "pct": 60
      },
      {
        "name": "Grenache Noir",
        "pct": 40
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "8-12",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "pêche",
        "fraise"
      ],
      "floral": [
        "rose"
      ],
      "spicy": [],
      "earthy": [],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 65,
      "Épicé": 10,
      "Terreux": 15,
      "Boisé": 5,
      "Végétal": 30,
      "Minéral": 45,
      "Empyreumatique": 5
    },
    "pairings": [
      "Salade méditerranéenne",
      "Poisson grillé",
      "Apéritif"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Tulipe"
    },
    "guard": {
      "from": 0,
      "to": 2
    },
    "labels": [],
    "estate": {
      "founded": 1971,
      "owner": "Yves Laboucarie",
      "surface": "40 ha",
      "terroir": "Argilo-calcaire, Boutenac",
      "soil": [
        "Argilo-calcaire",
        "Grès"
      ],
      "climate": "Méditerranéen",
      "description": "Le Gris de Gris est un rosé de pressurage direct iconique des Corbières."
    },
    "vintages": {
      "2023": {
        "score": 88,
        "notes": "Frais et croquant."
      }
    },
    "tags": [
      "Rosé",
      "Rapport qualité-prix",
      "Corbières"
    ]
  },
  {
    "id": "ref-104",
    "name": "Domaine Henry Pellé",
    "cuvee": "Menetou-Salon Morogues",
    "region": "Loire",
    "subRegion": "Centre-Loire",
    "appellation": "Menetou-Salon",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C44A",
    "cepages": [
      {
        "name": "Sauvignon Blanc",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13",
    "priceRange": "12-18",
    "aromas": {
      "fruit": [
        "pamplemousse",
        "citron",
        "groseille"
      ],
      "floral": [
        "genêt",
        "buis"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "fumée"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 80,
      "Floral": 60,
      "Épicé": 10,
      "Terreux": 45,
      "Boisé": 10,
      "Végétal": 55,
      "Minéral": 75,
      "Empyreumatique": 20
    },
    "pairings": [
      "Crottin de Chavignol",
      "Poisson de Loire",
      "Asperges"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 1,
      "to": 5
    },
    "labels": [],
    "estate": {
      "founded": 1950,
      "owner": "Anne Pellé",
      "surface": "41 ha",
      "terroir": "Calcaires kimméridgiens, Morogues",
      "soil": [
        "Kimméridgien",
        "Calcaire"
      ],
      "climate": "Continental",
      "description": "Alternative qualitative à Sancerre, souvent à moitié prix. Sols kimméridgiens identiques."
    },
    "vintages": {
      "2023": {
        "score": 90,
        "notes": "Vif et minéral."
      },
      "2022": {
        "score": 91,
        "notes": "Fumé et pur."
      }
    },
    "tags": [
      "Rapport qualité-prix",
      "Sauvignon",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-105",
    "name": "Domaine du Clos des Fées",
    "cuvee": "Grenache Blanc Vieilles Vignes",
    "region": "Languedoc",
    "subRegion": "Roussillon",
    "appellation": "Côtes du Roussillon",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C240",
    "cepages": [
      {
        "name": "Grenache Blanc",
        "pct": 70
      },
      {
        "name": "Grenache Gris",
        "pct": 30
      }
    ],
    "alcoholRange": "14-15",
    "priceRange": "25-40",
    "aromas": {
      "fruit": [
        "poire",
        "abricot",
        "amande"
      ],
      "floral": [
        "fleur de garrigue"
      ],
      "spicy": [
        "anis"
      ],
      "earthy": [
        "schiste",
        "garrigue"
      ],
      "wood": [
        "miel",
        "cire"
      ]
    },
    "aromaWheel": {
      "Fruit": 78,
      "Floral": 55,
      "Épicé": 40,
      "Terreux": 65,
      "Boisé": 40,
      "Végétal": 35,
      "Minéral": 70,
      "Empyreumatique": 35
    },
    "pairings": [
      "Bouillabaisse",
      "Langoustines",
      "Brebis des Pyrénées"
    ],
    "service": {
      "temp": "12-14°",
      "carafe": "Carafage léger",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 3,
      "to": 10
    },
    "labels": [],
    "estate": {
      "founded": 1998,
      "owner": "Hervé Bizeul",
      "surface": "30 ha",
      "terroir": "Schistes noirs et gneiss, Vingrau",
      "soil": [
        "Schistes noirs",
        "Gneiss"
      ],
      "climate": "Méditerranéen",
      "description": "Hervé Bizeul, ancien sommelier, a créé un domaine de référence en Roussillon."
    },
    "vintages": {
      "2021": {
        "score": 93,
        "notes": "Gras et minéral."
      },
      "2020": {
        "score": 94,
        "notes": "Profond et frais."
      }
    },
    "tags": [
      "Roussillon",
      "Grenache Blanc",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-106",
    "name": "Domaine Stéphane Ogier",
    "cuvee": "La Belle Hélène",
    "region": "Rhône",
    "subRegion": "Rhône Nord",
    "appellation": "Côte-Rôtie",
    "classification": "",
    "color": "rouge",
    "robe": "#5A1120",
    "cepages": [
      {
        "name": "Syrah",
        "pct": 92
      },
      {
        "name": "Viognier",
        "pct": 8
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "50-80",
    "aromas": {
      "fruit": [
        "cassis",
        "mûre",
        "myrtille"
      ],
      "floral": [
        "violette",
        "iris"
      ],
      "spicy": [
        "poivre",
        "olive noire"
      ],
      "earthy": [
        "graphite",
        "fumée"
      ],
      "wood": [
        "réglisse",
        "cacao"
      ]
    },
    "aromaWheel": {
      "Fruit": 85,
      "Floral": 65,
      "Épicé": 70,
      "Terreux": 60,
      "Boisé": 55,
      "Végétal": 30,
      "Minéral": 60,
      "Empyreumatique": 50
    },
    "pairings": [
      "Pigeon rôti",
      "Gibier",
      "Saint-Marcellin"
    ],
    "service": {
      "temp": "16-17°",
      "carafe": "Carafage 45 min",
      "verre": "Syrah"
    },
    "guard": {
      "from": 5,
      "to": 15
    },
    "labels": [],
    "estate": {
      "founded": 1997,
      "owner": "Stéphane Ogier",
      "surface": "8 ha",
      "terroir": "Schistes et gneiss, Côte-Rôtie",
      "soil": [
        "Schistes",
        "Gneiss"
      ],
      "climate": "Continental méditerranéen",
      "description": "Nouvelle génération brillante de la Côte-Rôtie. Finesse et précision."
    },
    "vintages": {
      "2020": {
        "score": 95,
        "notes": "Soyeux et profond."
      },
      "2019": {
        "score": 96,
        "notes": "Grand Côte-Rôtie."
      }
    },
    "tags": [
      "Côte-Rôtie",
      "Syrah",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-107",
    "name": "Domaine de la Pépière",
    "cuvee": "Muscadet Clisson",
    "region": "Loire",
    "subRegion": "Pays Nantais",
    "appellation": "Muscadet Sèvre et Maine Clisson",
    "classification": "",
    "color": "blanc",
    "robe": "#D5C640",
    "cepages": [
      {
        "name": "Melon de Bourgogne",
        "pct": 100
      }
    ],
    "alcoholRange": "12-12.5",
    "priceRange": "12-18",
    "aromas": {
      "fruit": [
        "citron",
        "pomme verte",
        "poire"
      ],
      "floral": [
        "aubépine"
      ],
      "spicy": [],
      "earthy": [
        "granit",
        "iode"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 72,
      "Floral": 55,
      "Épicé": 10,
      "Terreux": 45,
      "Boisé": 5,
      "Végétal": 40,
      "Minéral": 90,
      "Empyreumatique": 10
    },
    "pairings": [
      "Huîtres",
      "Poissons grillés",
      "Fromage de chèvre"
    ],
    "service": {
      "temp": "8-10°",
      "carafe": "Servir direct",
      "verre": "Sauvignon"
    },
    "guard": {
      "from": 3,
      "to": 10
    },
    "labels": [],
    "estate": {
      "founded": 1970,
      "owner": "Marc Ollivier et Rémi Branger",
      "surface": "30 ha",
      "terroir": "Granit et gabbro, Clisson",
      "soil": [
        "Granit",
        "Gabbro"
      ],
      "climate": "Océanique",
      "description": "Muscadet cru communal Clisson. Élevage long sur lies sur sols de granit. La renaissance du Muscadet."
    },
    "vintages": {
      "2021": {
        "score": 92,
        "notes": "Tendu et salin."
      },
      "2020": {
        "score": 93,
        "notes": "Profond et minéral."
      }
    },
    "tags": [
      "Muscadet",
      "Minéral",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-108",
    "name": "Domaine François Chidaine",
    "cuvee": "Montlouis-sur-Loire Les Choisilles",
    "region": "Loire",
    "subRegion": "Touraine",
    "appellation": "Montlouis-sur-Loire",
    "classification": "",
    "color": "blanc",
    "robe": "#D8C650",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "12.5-13.5",
    "priceRange": "15-22",
    "aromas": {
      "fruit": [
        "coing",
        "poire",
        "citron confit"
      ],
      "floral": [
        "acacia",
        "tilleul"
      ],
      "spicy": [],
      "earthy": [
        "silex",
        "tuffeau"
      ],
      "wood": []
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 70,
      "Épicé": 15,
      "Terreux": 50,
      "Boisé": 15,
      "Végétal": 45,
      "Minéral": 85,
      "Empyreumatique": 20
    },
    "pairings": [
      "Poisson de Loire",
      "Rillettes de Tours",
      "Sainte-Maure"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Chardonnay"
    },
    "guard": {
      "from": 3,
      "to": 15
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1989,
      "owner": "François Chidaine",
      "surface": "40 ha",
      "terroir": "Silex et tuffeau, Montlouis",
      "soil": [
        "Silex",
        "Tuffeau",
        "Argile à silex"
      ],
      "climate": "Océanique tempéré",
      "description": "Montlouis, face à Vouvray. François Chidaine est l'artisan de la renaissance de l'appellation."
    },
    "vintages": {
      "2022": {
        "score": 92,
        "notes": "Pur et ciselé."
      },
      "2021": {
        "score": 93,
        "notes": "Tendu et profond."
      }
    },
    "tags": [
      "Bio",
      "Chenin",
      "Vignerons Indépendants"
    ]
  },
  {
    "id": "ref-109",
    "name": "Domaine Patrick Baudouin",
    "cuvee": "Anjou Les Bruandières",
    "region": "Loire",
    "subRegion": "Anjou",
    "appellation": "Anjou",
    "classification": "",
    "color": "blanc",
    "robe": "#D6C44A",
    "cepages": [
      {
        "name": "Chenin",
        "pct": 100
      }
    ],
    "alcoholRange": "13-14",
    "priceRange": "14-20",
    "aromas": {
      "fruit": [
        "coing",
        "poire",
        "pomme golden"
      ],
      "floral": [
        "acacia",
        "aubépine"
      ],
      "spicy": [],
      "earthy": [
        "schiste",
        "ardoise"
      ],
      "wood": [
        "miel"
      ]
    },
    "aromaWheel": {
      "Fruit": 75,
      "Floral": 65,
      "Épicé": 20,
      "Terreux": 55,
      "Boisé": 20,
      "Végétal": 40,
      "Minéral": 85,
      "Empyreumatique": 25
    },
    "pairings": [
      "Poisson grillé",
      "Chèvre de Loire",
      "Volaille rôtie"
    ],
    "service": {
      "temp": "10-12°",
      "carafe": "Servir direct",
      "verre": "Bourgogne blanc"
    },
    "guard": {
      "from": 3,
      "to": 12
    },
    "labels": [
      "Bio"
    ],
    "estate": {
      "founded": 1990,
      "owner": "Patrick Baudouin",
      "surface": "12 ha",
      "terroir": "Schistes et grès du Carbonifère",
      "soil": [
        "Schistes",
        "Grès"
      ],
      "climate": "Océanique tempéré",
      "description": "Vigneron passionné, défenseur du Chenin sec d'Anjou. Bio depuis les origines."
    },
    "vintages": {
      "2022": {
        "score": 92,
        "notes": "Minéral et profond."
      },
      "2021": {
        "score": 91,
        "notes": "Tendu et pur."
      }
    },
    "tags": [
      "Bio",
      "Chenin",
      "Vignerons Indépendants"
    ]
  }
];

const WINE_REGIONS = [
  {
    "id": "bordeaux",
    "name": "Bordeaux",
    "color": "#6B1E2C",
    "position": {
      "x": 18,
      "y": 56
    }
  },
  {
    "id": "bourgogne",
    "name": "Bourgogne",
    "color": "#8B3545",
    "position": {
      "x": 48,
      "y": 42
    }
  },
  {
    "id": "champagne",
    "name": "Champagne",
    "color": "#C8A96A",
    "position": {
      "x": 54,
      "y": 24
    }
  },
  {
    "id": "alsace",
    "name": "Alsace",
    "color": "#D68A1A",
    "position": {
      "x": 76,
      "y": 28
    }
  },
  {
    "id": "loire",
    "name": "Loire",
    "color": "#8B9A5B",
    "position": {
      "x": 28,
      "y": 40
    }
  },
  {
    "id": "provence",
    "name": "Provence",
    "color": "#4A1520",
    "position": {
      "x": 64,
      "y": 74
    }
  },
  {
    "id": "rhone",
    "name": "Rhône",
    "color": "#6B3545",
    "position": {
      "x": 56,
      "y": 62
    }
  },
  {
    "id": "languedoc",
    "name": "Languedoc",
    "color": "#7A3040",
    "position": {
      "x": 46,
      "y": 78
    }
  },
  {
    "id": "jura",
    "name": "Jura",
    "color": "#A08840",
    "position": {
      "x": 62,
      "y": 38
    }
  },
  {
    "id": "sud-ouest",
    "name": "Sud-Ouest",
    "color": "#8B5030",
    "position": {
      "x": 22,
      "y": 68
    }
  },
  {
    "id": "corse",
    "name": "Corse",
    "color": "#6B4530",
    "position": {
      "x": 82,
      "y": 80
    }
  },
  {
    "id": "beaujolais",
    "name": "Beaujolais",
    "color": "#8A2535",
    "position": {
      "x": 50,
      "y": 50
    }
  },
  {
    "id": "savoie",
    "name": "Savoie",
    "color": "#5A7A5A",
    "position": {
      "x": 68,
      "y": 42
    }
  },
  {
    "id": "italie",
    "name": "Italie",
    "color": "#7A3030",
    "position": {
      "x": 60,
      "y": 55
    }
  },
  {
    "id": "espagne",
    "name": "Espagne",
    "color": "#8B3030",
    "position": {
      "x": 12,
      "y": 78
    }
  },
  {
    "id": "portugal",
    "name": "Portugal",
    "color": "#5A3020",
    "position": {
      "x": 5,
      "y": 70
    }
  },
  {
    "id": "allemagne",
    "name": "Allemagne",
    "color": "#5A6A3A",
    "position": {
      "x": 60,
      "y": 20
    }
  },
  {
    "id": "usa",
    "name": "USA",
    "color": "#2A4A7A",
    "position": {
      "x": -120,
      "y": 38
    }
  },
  {
    "id": "argentine",
    "name": "Argentine",
    "color": "#4A5A8A",
    "position": {
      "x": -65,
      "y": 80
    }
  },
  {
    "id": "australie",
    "name": "Australie",
    "color": "#8A6A3A",
    "position": {
      "x": 135,
      "y": 80
    }
  },
  {
    "id": "nouvelle-zelande",
    "name": "Nouvelle-Zélande",
    "color": "#3A6A5A",
    "position": {
      "x": 175,
      "y": 85
    }
  },
  {
    "id": "liban",
    "name": "Liban",
    "color": "#7A4030",
    "position": {
      "x": 95,
      "y": 50
    }
  },
  {
    "id": "afrique-du-sud",
    "name": "Afrique du Sud",
    "color": "#5A6A4A",
    "position": {
      "x": 48,
      "y": 90
    }
  },
  {
    "id": "chili",
    "name": "Chili",
    "color": "#6A3A4A",
    "position": {
      "x": -72,
      "y": 78
    }
  }
];

const WINE_VINTAGES = {
  "Bordeaux": {
    "2010": 99,
    "2015": 95,
    "2016": 98,
    "2017": 88,
    "2018": 96,
    "2019": 94,
    "2020": 97,
    "2021": 89,
    "2022": 98,
    "2023": 92
  },
  "Bourgogne": {
    "2010": 95,
    "2015": 96,
    "2016": 89,
    "2017": 93,
    "2018": 95,
    "2019": 97,
    "2020": 98,
    "2021": 86,
    "2022": 96,
    "2023": 94
  },
  "Champagne": {
    "2008": 97,
    "2012": 97,
    "2013": 91,
    "2015": 94,
    "2018": 95,
    "2019": 94,
    "2020": 96
  },
  "Alsace": {
    "2015": 93,
    "2017": 94,
    "2018": 92,
    "2019": 95,
    "2020": 96,
    "2021": 90
  },
  "Loire": {
    "2015": 92,
    "2017": 90,
    "2018": 94,
    "2019": 93,
    "2020": 95,
    "2021": 88,
    "2022": 95
  },
  "Provence": {
    "2016": 93,
    "2017": 91,
    "2018": 92,
    "2019": 94,
    "2020": 93,
    "2021": 89,
    "2023": 91
  },
  "Rhône": {
    "2010": 98,
    "2015": 95,
    "2016": 93,
    "2017": 96,
    "2018": 97,
    "2019": 98,
    "2020": 95,
    "2021": 88,
    "2022": 94
  },
  "Languedoc": {
    "2015": 92,
    "2016": 91,
    "2017": 93,
    "2018": 94,
    "2019": 96,
    "2020": 93,
    "2021": 89
  },
  "Jura": {
    "2015": 90,
    "2017": 92,
    "2018": 94,
    "2019": 95,
    "2020": 93,
    "2021": 88
  },
  "Sud-Ouest": {
    "2015": 91,
    "2016": 93,
    "2017": 90,
    "2018": 92,
    "2019": 94,
    "2020": 91
  },
  "Beaujolais": {
    "2015": 93,
    "2017": 91,
    "2018": 92,
    "2019": 95,
    "2020": 96,
    "2021": 90,
    "2022": 94
  },
  "Savoie": {
    "2018": 91,
    "2019": 93,
    "2020": 94,
    "2021": 88,
    "2022": 92
  },
  "Corse": {
    "2018": 91,
    "2019": 93,
    "2020": 94,
    "2021": 89
  },
  "Italie": {
    "2015": 95,
    "2016": 98,
    "2017": 93,
    "2018": 95,
    "2019": 97,
    "2020": 96
  },
  "Espagne": {
    "2015": 94,
    "2016": 95,
    "2017": 93,
    "2018": 96,
    "2019": 97
  }
};

Object.assign(window, { WINE_DATABASE, WINE_REGIONS, WINE_VINTAGES });
