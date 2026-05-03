# CAVE — Votre sommelier de poche 🍷

Application de gestion de cave à vin avec carte viticole IGN, fiche bouteille complète, statistiques, accords mets-vins, et profil sommelier.

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement (http://localhost:3000)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Déployer

### Firebase Hosting (recommandé)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting  # choisir "dist" comme répertoire public
npm run build
firebase deploy
```

### Vercel (le plus simple)
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Netlify
```bash
# Glisser-déposer le dossier `dist/` sur app.netlify.com
# Ou connecter le repo GitHub pour le déploiement automatique
```

## Structure du projet

```
cave-app/
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances
├── vite.config.js          # Configuration Vite
├── src/
│   ├── main.jsx            # Bootstrap React
│   ├── App.jsx             # App complète (écrans, composants)
│   ├── data/
│   │   ├── cellar.js       # Données cave (10 bouteilles)
│   │   └── mapData.js      # Tracés IGN des régions
│   └── styles/
│       └── theme.css       # Design system
└── dist/                   # Build de production
```

## Écrans

1. **Cave** — liste des bouteilles, filtres, stats
2. **Carte IGN** — 13 régions, 9 zones viticoles interactives
3. **Fiche bouteille** — dégustation, domaine, accords, avis
4. **Statistiques** — KPIs, donut, barres, courbe de maturité
5. **Accords** — mets & vins par catégorie
6. **Amis** — fil d'activité, cercle
7. **Profil** — stats, préférences, répartition

## Prochaines étapes

- [ ] Supabase (auth + base de données)
- [ ] PWA (manifest, service worker)
- [ ] Capacitor (iOS / Android natif)
- [ ] Scan d'étiquettes (caméra + IA)
- [ ] Open Food Facts (recherche)
