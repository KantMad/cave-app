import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from './lib/auth';
import ScreenAuth from './screens/ScreenAuth';
import { CELLAR, FRIENDS, VINTAGES } from './data/cellar';
import { MAP_REGIONS, MAP_CITIES } from './data/mapData';
import { REGION_DETAILS } from './data/regionData';
import { fetchBottles, seedDemoData, addBottle, updateBottle, deleteBottle, searchWines, fetchEstate, seedReferenceCatalog, scanLabel, scanBarcode, matchCatalogFromScan, catalogHit, enrichWine, searchByBarcode, upsertToCatalog, ensureCatalogSeeded, fetchTastings, addTasting, openBottle, updateTasting, deleteTasting, fetchWishlist, addToWishlist, removeFromWishlist, wishlistToCave, searchUsers, getProfile, updateProfile, followUser, unfollowUser, getFollowing, getFollowers, isFollowing, fetchSocialFeed, getPublicBottles, fetchNearbyPlaces, fetchAllPlaces, fetchPlace, addPlace, updatePlace, fetchPlaceReviews, addPlaceReview, fetchPlacePicks, addPlacePick } from './lib/api';
// Unused: searchOFF, searchByBarcode, Html5Qrcode removed

const COLORS=[{id:'rouge',label:'Rouge',robe:'#6B1E2C'},{id:'blanc',label:'Blanc',robe:'#D9B84A'},{id:'rosé',label:'Rosé',robe:'#E8A0B5'},{id:'effervescent',label:'Effervescent',robe:'#D4B896'},{id:'liquoreux',label:'Liquoreux',robe:'#D68A1A'}];
const REGIONS=['Bordeaux','Bourgogne','Champagne','Rhône','Loire','Alsace','Languedoc','Provence','Jura','Savoie','Sud-Ouest','Corse','Beaujolais'];
// Deduction: appellation → region, typical aromas, service
const APPELLATION_MAP={
  'Pauillac':{r:'Bordeaux',a:['Cassis','Cèdre','Tabac','Graphite'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
  'Margaux':{r:'Bordeaux',a:['Violette','Cassis','Réglisse','Vanille'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
  'Saint-Émilion':{r:'Bordeaux',a:['Prune','Cerise','Chocolat','Truffe'],t:'16-18°C',v:'Bordeaux',c:'1h'},
  'Pomerol':{r:'Bordeaux',a:['Prune','Truffe','Vanille','Cerise noire'],t:'16-17°C',v:'Bordeaux',c:'30min-1h'},
  'Saint-Julien':{r:'Bordeaux',a:['Cassis','Cèdre','Épices','Cuir'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
  'Pessac-Léognan':{r:'Bordeaux',a:['Cassis','Fumée','Tabac','Graphite'],t:'16-18°C',v:'Bordeaux',c:'1h'},
  'Sauternes':{r:'Bordeaux',a:['Abricot','Miel','Fruits confits','Safran'],t:'8-10°C',v:'Petit blanc',c:'Non'},
  'Gevrey-Chambertin':{r:'Bourgogne',a:['Cerise noire','Réglisse','Cuir','Sous-bois'],t:'15-17°C',v:'Bourgogne',c:'30min'},
  'Chambolle-Musigny':{r:'Bourgogne',a:['Rose','Framboise','Violette','Épices'],t:'15-16°C',v:'Bourgogne',c:'Non'},
  'Meursault':{r:'Bourgogne',a:['Beurre','Noisette','Miel','Brioche'],t:'12-14°C',v:'Bourgogne',c:'Non'},
  'Chablis':{r:'Bourgogne',a:['Citron','Craie','Iode','Silex'],t:'10-12°C',v:'Flûte',c:'Non'},
  'Puligny-Montrachet':{r:'Bourgogne',a:['Amande','Beurre','Fleurs blanches','Agrumes'],t:'12-14°C',v:'Bourgogne',c:'Non'},
  'Nuits-Saint-Georges':{r:'Bourgogne',a:['Cassis','Cerise','Cuir','Réglisse'],t:'15-17°C',v:'Bourgogne',c:'30min'},
  'Châteauneuf-du-Pape':{r:'Rhône',a:['Garrigue','Réglisse','Cerise','Poivre'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
  'Côte-Rôtie':{r:'Rhône',a:['Violette','Poivre','Olive noire','Lard fumé'],t:'16-17°C',v:'Bordeaux',c:'1h'},
  'Hermitage':{r:'Rhône',a:['Poivre noir','Cassis','Cuir','Violette'],t:'16-18°C',v:'Bordeaux',c:'2h'},
  'Crozes-Hermitage':{r:'Rhône',a:['Poivre','Cerise','Violette','Thym'],t:'15-17°C',v:'Bordeaux',c:'30min'},
  'Sancerre':{r:'Loire',a:['Pamplemousse','Buis','Silex','Agrumes'],t:'8-10°C',v:'Flûte',c:'Non'},
  'Chinon':{r:'Loire',a:['Framboise','Poivron','Violette','Réglisse'],t:'14-16°C',v:'Bordeaux',c:'30min'},
  'Vouvray':{r:'Loire',a:['Coing','Acacia','Miel','Pomme'],t:'10-12°C',v:'Petit blanc',c:'Non'},
  'Champagne':{r:'Champagne',a:['Brioche','Agrumes','Amande','Poire'],t:'6-8°C',v:'Flûte',c:'Non'},
  'Riesling':{r:'Alsace',a:['Citron vert','Pétrole','Fleurs blanches','Silex'],t:'8-10°C',v:'Flûte',c:'Non'},
  'Gewurztraminer':{r:'Alsace',a:['Litchi','Rose','Épices','Gingembre'],t:'10-12°C',v:'Flûte',c:'Non'},
  'Morgon':{r:'Beaujolais',a:['Cerise','Pêche de vigne','Iris','Terre'],t:'14-15°C',v:'Bourgogne',c:'Non'},
  'Fleurie':{r:'Beaujolais',a:['Rose','Framboise','Pivoine','Iris'],t:'13-15°C',v:'Bourgogne',c:'Non'},
  'Bandol':{r:'Provence',a:['Garrigue','Cuir','Mûre','Épices'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
  'Pic Saint-Loup':{r:'Languedoc',a:['Garrigue','Mûre','Épices','Olive'],t:'16-17°C',v:'Bordeaux',c:'30min'},
  'Cahors':{r:'Sud-Ouest',a:['Mûre','Truffe','Réglisse','Cacao'],t:'16-18°C',v:'Bordeaux',c:'1-2h'},
};
const AROMA_FAMILIES=[
  {f:'🍒 Fruité',c:'#C0392B',a:['Cassis','Cerise','Framboise','Mûre','Fraise','Prune','Pomme','Poire','Pêche','Abricot','Agrumes','Fruits exotiques','Litchi','Mangue','Confiture','Fruits secs']},
  {f:'🌹 Floral',c:'#E74C8B',a:['Rose','Violette','Acacia','Jasmin','Tilleul','Pivoine','Iris','Sureau']},
  {f:'🌶️ Épicé',c:'#D4880F',a:['Poivre noir','Poivre blanc','Vanille','Cannelle','Réglisse','Clou de girofle','Muscade','Gingembre','Safran']},
  {f:'🪵 Boisé',c:'#8B4513',a:['Chêne','Cèdre','Tabac','Café','Cacao','Chocolat','Toast','Noisette','Amande','Brioche','Caramel']},
  {f:'🪨 Minéral',c:'#7F8C8D',a:['Silex','Craie','Iode','Graphite','Pierre à fusil','Pétrole','Ardoise']},
  {f:'🌿 Végétal',c:'#27AE60',a:['Sous-bois','Champignon','Truffe','Garrigue','Thym','Buis','Herbe','Menthe','Poivron','Fougère']},
  {f:'🐴 Animal',c:'#5D4037',a:['Cuir','Gibier','Musc','Lard fumé','Cire','Fourrure']},
  {f:'🔥 Grillé',c:'#6B3A2E',a:['Fumée','Grillé','Moka','Pain grillé','Torréfaction']},
];
const ALL_AROMAS=AROMA_FAMILIES.flatMap(f=>f.a);
const ALL_PAIRINGS=['Bœuf','Agneau','Canard','Gibier','Porc','Poulet','Veau','Poisson grillé','Poisson cru','Crustacés','Huîtres','Fromages affinés','Fromages frais','Charcuterie','Foie gras','Pâtes','Risotto','Pizza','Légumes grillés','Salade','Cuisine asiatique','Cuisine épicée','Chocolat','Fruits','Tarte','Dessert crémeux'];
const TEMPS=['6-8°C','8-10°C','10-12°C','12-14°C','14-16°C','16-18°C'];
const GLASSES=['Bordeaux','Bourgogne','Flûte','INAO','Petit blanc','Universel'];
const CARAFES=['Non','15 min','30 min','1h','1-2h','2h+'];
// ═══════════════════════════════════════════════════════════════
// CAVE — Application complète · Tous écrans
// Carte IGN · Fiche bouteille · Stats · Accords · Amis · Profil
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// ICONS (inline SVG)
// ═══════════════════════════════════════════════════════════════
const I = ({d,sz=22,c="currentColor",sw=1.1,...p}) => <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}><path d={d}/></svg>;
// ─── Luxe French Wine Icons ─── trait ultra-fin 1.0, détails vignerons
const IcHome=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V10.5L12 3l8 7.5V21H15.5v-7a1.5 1.5 0 00-1.5-1.5h-4A1.5 1.5 0 008.5 14v7H4z"/><path d="M10 18c.6-.4 1.3-.5 2-.5s1.4.1 2 .5" opacity=".3"/></svg>;
const IcMap=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><path d="M8 2v16M16 6v16"/><circle cx="12" cy="10" r="1.2" opacity=".3" fill={p.c||"currentColor"} stroke="none"/></svg>;
const IcFork=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round"><path d="M3 2v6a3 3 0 003 3h2a3 3 0 003-3V2"/><path d="M7 2v20"/><path d="M21 2c0 0-1 2-1 5s1 4 1 4v11"/><path d="M19 7c.5.4.8 1 1 1.8" opacity=".3"/></svg>;
const IcChart=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/><path d="M3 20h18" opacity=".2"/></svg>;
const IcBook=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M12 6c-1 1.5-1 3.2 0 4.5" opacity=".3" strokeWidth=".9"/><path d="M12 10.5c1 1.3 1 3 0 4.5" opacity=".2" strokeWidth=".9"/></svg>;
const IcScan=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.1" strokeLinecap="round"><path d="M4 8V5a1 1 0 011-1h3M4 16v3a1 1 0 001 1h3M16 4h3a1 1 0 011 1v3M16 20h3a1 1 0 001-1v-3"/><line x1="5" y1="12" x2="19" y2="12" opacity=".5"/></svg>;
const IcUser=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>;
const IcBack=p=><I {...p} d="M15 18l-6-6 6-6"/>;
const IcSearch=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.1" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>;
const IcPin=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="1.8" opacity=".35" fill={p.c||"currentColor"} stroke="none"/></svg>;
const IcArrow=p=><I {...p} d="M9 18l6-6-6-6"/>;
const IcCompass=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r=".7" fill={p.c||"currentColor"} stroke="none"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" fill={p.c||"currentColor"} opacity=".18" stroke="none"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" strokeWidth="1.0"/><path d="M12 2.5v1M12 20.5v1M2.5 12h1M20.5 12h1" opacity=".2" strokeWidth=".7"/></svg>;
const IcFeed=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IcExport=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.1" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>;
// ─── Wine-specific ───
const IcWineGlass=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2h10"/><path d="M7.2 2l.6 7c.3 2.8 2.7 5 5.5 5h-.6c2.8 0 5.2-2.2 5.5-5l.6-7"/><path d="M8.8 7c.8-.4 2-.7 3.2-.7s2.4.3 3.2.7" opacity=".25" fill={p.c||"currentColor"} stroke="none"/><line x1="12" y1="14" x2="12" y2="20"/><path d="M8 22h8"/><path d="M8 22c0-.8.5-1.5 1.2-1.8M16 22c0-.8-.5-1.5-1.2-1.8" opacity=".25"/></svg>;
const IcBottle=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><rect x="10.5" y="1" width="3" height="2.5" rx=".4"/><path d="M10.5 3.5c-.3.5-1.5 2.5-2 4-.3.8-.5 1.8-.5 2.8V21a1.5 1.5 0 001.5 1.5h5A1.5 1.5 0 0016 21V10.3c0-1-.2-2-.5-2.8-.5-1.5-1.7-3.5-2-4"/><rect x="8.5" y="12" width="7" height="5.5" rx=".5" opacity=".12" fill={p.c||"currentColor"} stroke="none"/><path d="M9 14.5h6" opacity=".25"/></svg>;
const IcGrape=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0"><circle cx="10" cy="11.5" r="2"/><circle cx="14" cy="11.5" r="2"/><circle cx="8" cy="15" r="2"/><circle cx="12" cy="15.5" r="2"/><circle cx="16" cy="15" r="2"/><circle cx="10" cy="18.8" r="2"/><circle cx="14" cy="18.8" r="2"/><path d="M12 3v6" strokeWidth="1.0" strokeLinecap="round"/><path d="M12 5c2-.8 3.5-.5 5 .3" strokeWidth=".8" opacity=".4" strokeLinecap="round"/><path d="M14 4c1 .8 1.5 2 1.2 3.2" strokeWidth=".7" opacity=".25" strokeLinecap="round"/></svg>;
const IcCellar=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M4 21V9.5C4 4.8 7.6 1.5 12 1.5S20 4.8 20 9.5V21"/><path d="M8 21v-4.5c0-2.2 1.8-4 4-4s4 1.8 4 4V21"/><ellipse cx="12" cy="11" rx="2.5" ry="1" opacity=".2" fill={p.c||"currentColor"} stroke="none"/><path d="M7 10h10" opacity=".1"/></svg>;
const IcHeart=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill={p.fill||"none"} stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>;
const IcStar=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill={p.fill||"none"} stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcShop=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7l1.5-4h13L20 7"/><path d="M4 7v13a1 1 0 001 1h14a1 1 0 001-1V7"/><path d="M4 7c0 1.7 1.3 3 3 3s3-1.3 3-3M10 7c0 1.7 1.3 3 3 3s3-1.3 3-3M16 7c0 1.7 1.3 3 3 3"/><path d="M4 7c.3 1.7 1.5 3 3 3"/><path d="M9.5 21v-6a1 1 0 011-1h3a1 1 0 011 1v6"/></svg>;
const IcCamera=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h3.5L9 5h6l1.5 2H20a2 2 0 012 2z"/><circle cx="12" cy="13.5" r="3.5"/><circle cx="12" cy="13.5" r="1" opacity=".2" fill={p.c||"currentColor"} stroke="none"/></svg>;
const IcDiamond=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 7-10 12L2 10z"/><path d="M2 10h20"/><path d="M6 3l4 7M18 3l-4 7" opacity=".25"/><path d="M12 22l-2-12M12 22l2-12" opacity=".12"/></svg>;
const IcTasting=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12l-1.5 9c-.4 2.5-2.5 4.5-5 4.5h-1c-2.5 0-4.6-2-5-4.5L4 2"/><path d="M7.5 5.5c1.3.7 2.8 1 4.5 1s3.2-.3 4.5-1" opacity=".25" fill={p.c||"currentColor"} stroke="none"/><line x1="12" y1="15.5" x2="12" y2="19.5"/><path d="M7 22h10"/><line x1="7" y1="22" x2="9.5" y2="19.5" opacity=".2"/><line x1="17" y1="22" x2="14.5" y2="19.5" opacity=".2"/></svg>;
const IcDecanter=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M11 1h2v4c0 1 2 3 4 5.5C18.3 12.3 19 14.5 19 16v4.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 20.5V16c0-1.5.7-3.7 2-5.5C9 8 11 6 11 5V1z"/><path d="M6 16h12" opacity=".15"/><ellipse cx="12" cy="18.5" rx="4" ry=".8" opacity=".1" fill={p.c||"currentColor"} stroke="none"/></svg>;
const IcBarrel=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.0"><ellipse cx="12" cy="4" rx="7" ry="2.5"/><ellipse cx="12" cy="20" rx="7" ry="2.5"/><path d="M5 4c-.3 2.7-.5 5.3-.5 8s.2 5.3.5 8"/><path d="M19 4c.3 2.7.5 5.3.5 8s-.2 5.3-.5 8"/><path d="M5.8 12c1.5.8 3.8 1.3 6.2 1.3s4.7-.5 6.2-1.3" opacity=".18"/><path d="M5.5 8h13" opacity=".1"/><path d="M5.5 16h13" opacity=".1"/></svg>;
const IcSettings=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.1" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function txtNorm(s){return(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
const PH = ({ey,title,action}) => <div style={{padding:'14px 24px 10px',display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}><div>{ey&&<div style={{textTransform:'uppercase',letterSpacing:'0.18em',fontSize:14,fontWeight:500,color:'var(--bx)',opacity:0.7,marginBottom:6}}>{ey}</div>}<h1 className="sf" style={{margin:0,fontSize:36,lineHeight:1,fontWeight:500,letterSpacing:'-0.005em'}}>{title}</h1></div>{action}</div>;
const SC = ({title,ey,children}) => <div style={{background:'var(--sr)',borderRadius:22,padding:20,marginTop:16,boxShadow:'var(--sh)',overflow:'hidden'}}>{ey&&<div style={{textTransform:'uppercase',letterSpacing:'0.18em',fontSize:13,fontWeight:500,color:'var(--bx)',opacity:0.7}}>{ey}</div>}<h3 className="sf" style={{fontSize:22,fontWeight:500,margin:'2px 0 14px'}}>{title}</h3>{children}</div>;
const IB = ({icon,onClick,bg='var(--pm)',c='var(--bx)'}) => <button onClick={onClick} style={{width:40,height:40,border:0,background:bg,color:c,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'var(--sh)'}}>{icon}</button>;

// Maturity bar
function MB({pf,pt,cur=2026}) {
  const s=pf-5,e=pt+5,sp=e-s;
  const ps=((pf-s)/sp)*100,pe=((pt-s)/sp)*100,np=Math.max(0,Math.min(100,((cur-s)/sp)*100));
  const inP=cur>=pf&&cur<=pt;
  return <div><div style={{position:'relative',height:10,borderRadius:5,background:'var(--pm)',overflow:'visible'}}>
    <div style={{position:'absolute',left:`${ps}%`,width:`${pe-ps}%`,top:0,bottom:0,background:'linear-gradient(90deg,var(--gs) 0%,var(--g) 50%,var(--gs) 100%)',borderRadius:5}}/>
    <div style={{position:'absolute',left:`calc(${np}% - 1px)`,top:-4,bottom:-4,width:2,borderRadius:1,background:'var(--bx)',boxShadow:'0 0 0 3px rgba(107,30,44,0.15)'}}/>
  </div>
  <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:13,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
    <span>{s}</span><span style={{color:inP?'var(--bx)':'var(--is)'}}>{inP?'À boire':cur<pf?'À garder':'Déclin'} — {cur}</span><span>{e}</span>
  </div></div>;
}

// Aroma wheel
function AW({data,size=240}) {
  const keys=Object.keys(data||{}),n=keys.length;
  if(n<2)return <div style={{width:size,height:size*.6,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--im)',fontSize:14,fontStyle:'italic'}}>Pas assez de données pour la roue</div>;
  const pad=46,r=size/2-pad,cx=size/2,cy=size/2;
  const pts=keys.map((k,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2,v=data[k]/100;return[cx+Math.cos(a)*r*v,cy+Math.sin(a)*r*v];});
  const axP=keys.map((_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r];});
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    {[.25,.5,.75,1].map((rr,i)=><circle key={i} cx={cx} cy={cy} r={r*rr} fill="none" stroke="var(--ls)" strokeWidth=".5" strokeDasharray={i===3?'':'2 3'}/>)}
    {axP.map(([x,y],i)=><line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--ls)" strokeWidth=".5"/>)}
    <polygon points={pts.map(p=>p.join(',')).join(' ')} fill="var(--bx)" fillOpacity=".22" stroke="var(--bx)" strokeWidth="1.5" strokeLinejoin="round"/>
    {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="var(--bx)"/>)}
    {keys.map((k,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;const lx=cx+Math.cos(a)*(r+18),ly=cy+Math.sin(a)*(r+18);return <text key={k} x={lx} y={ly} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle" dominantBaseline="middle" fill="var(--is)">{k.toUpperCase()}</text>;})}
  </svg>;
}

// Star rating
function SR({v=0,max=5,sz=14,c='var(--g)'}) {
  return <div style={{display:'inline-flex',gap:1}}>{Array.from({length:max}).map((_,i)=>{
    const f=Math.max(0,Math.min(1,v-i));
    return <span key={i} style={{position:'relative',width:sz,height:sz,display:'inline-block'}}>
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      {f>0&&<span style={{position:'absolute',top:0,left:0,width:`${f*100}%`,height:sz,overflow:'hidden'}}>
        <svg width={sz} height={sz} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1.4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </span>}
    </span>;
  })}</div>;
}

// ═══════════════════════════════════════════════════════════════
// WINE MAP (IGN)
// ═══════════════════════════════════════════════════════════════
function WineMap({sel,onSel,bottles=[]}) {
  const [hov,setHov]=useState(null);
  const cts=useMemo(()=>{const c={};MAP_REGIONS.forEach(r=>c[r.id]=0);bottles.forEach(b=>{const nm=(b.region||'').toLowerCase();MAP_REGIONS.forEach(r=>{if(!r.w)return;if(r.w.toLowerCase().split(/[&·,]/).map(s=>s.trim()).some(w=>nm.includes(w)||w.includes(nm)))c[r.id]++;});});return c;},[bottles]);
  return <svg viewBox="10 -5 610 600" style={{width:'100%',display:'block'}}>
    <defs><filter id="fs" x="-3%" y="-3%" width="106%" height="106%"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity=".08"/></filter>
    <filter id="gl" x="-8%" y="-8%" width="116%" height="116%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x="0" y="-10" width="630" height="620" fill="#E6EEF5"/>
    {MAP_REGIONS.map(r=>{const iS=sel===r.id,iH=hov===r.id,hw=!!r.w,ct=cts[r.id]||0;
      const fl=hw?(iS?r.ac:r.c):r.c,op=hw?(ct>0?(iS?.92:iH?.78:.6):(iS?.55:iH?.4:.28)):1;
      return <g key={r.id} style={{cursor:hw?'pointer':'default'}} onClick={()=>hw&&onSel?.(r.id)} onMouseEnter={()=>hw&&setHov(r.id)} onMouseLeave={()=>setHov(null)}>
        {iS&&hw&&<path d={r.d} fill={r.ac} fillOpacity=".18" stroke={r.ac} strokeWidth="4" strokeOpacity=".25" filter="url(#gl)"/>}
        <path d={r.d} fill={fl} fillOpacity={op} stroke={iS?'#fff':iH?'#fff':'rgba(255,255,255,.6)'} strokeWidth={iS?2.2:iH?1.5:.6} strokeLinejoin="round" filter={!hw?'url(#fs)':undefined} style={{transition:'all .2s'}}/>
      </g>;})}
    {MAP_REGIONS.filter(r=>r.w&&r.l).map(r=>{const[lx,ly]=r.l,iS=sel===r.id,ct=cts[r.id]||0,hb=ct>0;
      const ls=r.w.split(' & ');
      return <g key={r.id+'-l'} style={{pointerEvents:'none'}}>
        {ls.map((l,i)=><text key={i} x={lx} y={ly-6+i*14} textAnchor="middle" fontSize={iS?'11':'10'} fontFamily="-apple-system,sans-serif" fontWeight={iS?'700':'600'} fill={hb||iS?'#fff':'#666'} style={{textShadow:hb||iS?'0 1px 4px rgba(0,0,0,.5)':'0 .5px 1px rgba(255,255,255,.9)'}}>{l}</text>)}
        {hb&&<g transform={`translate(${lx},${ly+(ls.length>1?12:6)})`}><rect x="-12" y="-7" width="24" height="16" rx="8" fill="rgba(255,255,255,.92)" stroke={r.ac} strokeWidth=".8"/><text x="0" y="5" textAnchor="middle" fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="700" fill={r.ac}>{ct}</text></g>}
      </g>;})}
    {MAP_CITIES.map(c=><g key={c.n} style={{pointerEvents:'none'}}>{c.m?<><circle cx={c.x} cy={c.y} r="4.5" fill="#fff" stroke="#333" strokeWidth="1.2"/><circle cx={c.x} cy={c.y} r="1.8" fill="#333"/><text x={c.x+8} y={c.y+1.5} fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="600" fill="#333">{c.n}</text></>:<><circle cx={c.x} cy={c.y} r="2" fill="#888"/><text x={c.x+5} y={c.y+1.5} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="400" fill="#888">{c.n}</text></>}</g>)}
  </svg>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: HOME
// ═══════════════════════════════════════════════════════════════
function ScreenHome({onSel,onNav,bottles,profile,onSeed,tastings,wishlist,setWishlist,user,caveTab,setCaveTab,openAdd}) {
  const [f,setF]=useState('tous');
  const [seeding,setSeeding]=useState(false);
  const [search,setSearch]=useState('');
  const [viewWish,setViewWish]=useState(null);
  const fs=['tous','rouge','blanc','effervescent','liquoreux'];
  const year=new Date().getFullYear();
  // "À boire maintenant" — bottles at peak
  const readyNow=useMemo(()=>bottles.filter(b=>{
    const pf=b.peakFrom||b.peak_from,pt=b.peakTo||b.peak_to;
    return pf&&pt&&year>=pf&&year<=pt&&b.quantity>0;
  }),[bottles,year]);
  // Past peak warning
  const pastPeak=useMemo(()=>bottles.filter(b=>{
    const pt=b.peakTo||b.peak_to;
    return pt&&year>pt&&b.quantity>0;
  }),[bottles,year]);
  // Insights
  const insights=useMemo(()=>{
    if(bottles.length<3)return[];
    const tips=[];
    const colors={};bottles.forEach(b=>{colors[b.color]=(colors[b.color]||0)+(b.quantity||1);});
    const total=Object.values(colors).reduce((a,b)=>a+b,0);
    const maxColor=Object.entries(colors).sort((a,b)=>b[1]-a[1])[0];
    if(maxColor&&maxColor[1]/total>0.7)tips.push(`Votre cave est à ${Math.round(maxColor[1]/total*100)}% de ${maxColor[0]}s. Pensez à diversifier !`);
    if(pastPeak.length>0)tips.push(`${pastPeak.length} bouteille${pastPeak.length>1?'s sont passées':'est passée'} de leur apogée — ouvrez-les bientôt.`);
    const regions={};bottles.forEach(b=>{if(b.region)regions[b.region]=(regions[b.region]||0)+1;});
    const topRegion=Object.entries(regions).sort((a,b)=>b[1]-a[1])[0];
    if(topRegion)tips.push(`Votre région préférée : ${topRegion[0]} (${topRegion[1]} réf.)`);
    return tips;
  },[bottles,pastPeak]);
  // Filter + search
  const vis=useMemo(()=>{
    let r=f==='tous'?bottles:bottles.filter(b=>b.color===f);
    r=r.filter(b=>b.quantity>0); // Only show in-cave bottles
    if(search.trim()){const q=search.toLowerCase();r=r.filter(b=>(b.name||'').toLowerCase().includes(q)||(b.appellation||'').toLowerCase().includes(q)||(b.region||'').toLowerCase().includes(q)||(b.cuvee||'').toLowerCase().includes(q));}
    return r;
  },[f,bottles,search]);
  const inCave=bottles.filter(b=>b.quantity>0);
  const tb=inCave.reduce((s,b)=>s+(b.quantity||1),0);
  const tv=inCave.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const nm=profile?.name||'Ami';
  const doSeed=async()=>{setSeeding(true);await onSeed();setSeeding(false);};
  return <div style={{paddingBottom:120,background:'var(--cr)',minHeight:'100%'}}>
    <div style={{padding:'48px 24px 18px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <img src="/logo.png" alt="" style={{width:44,height:44}}/>
          <div><div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:4}}>Ma cave</div>
            <h1 className="sf" style={{margin:0,fontSize:38,lineHeight:1.05,fontWeight:500}}>Bonsoir,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>{nm}</span></h1></div>
        </div>
        <button onClick={()=>onNav('profile')} style={{width:44,height:44,borderRadius:22,border:0,cursor:'pointer',background:'linear-gradient(135deg,var(--bx) 0%,var(--bs) 100%)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,boxShadow:'0 4px 12px rgba(107,30,44,.25)'}}>{(nm[0]||'?').toUpperCase()}</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'var(--ls)',borderRadius:18,overflow:'hidden',marginTop:20,border:'0.5px solid var(--ls)'}}>
        {[{l:'Bouteilles',v:tb},{l:'Références',v:bottles.length},{l:'Valeur',v:tv>=1000?Math.round(tv/1000)+'k€':tv+'€'}].map(s=><div key={s.l} style={{background:'var(--sr)',padding:'14px 12px',textAlign:'center'}}><div className="sf" style={{fontSize:22,fontWeight:600}}>{s.v}</div><div className="sc" style={{fontSize:12,marginTop:2}}>{s.l}</div></div>)}
      </div>
      {/* Cave sub-tabs */}
      <div style={{display:'flex',gap:0,marginTop:16,background:'var(--pm)',borderRadius:14,padding:3}}>
        {[{id:'vins',l:'Mes vins'},{id:'historique',l:'Historique'},{id:'wishlist',l:'Wishlist'},{id:'stats',l:'Stats'}].map(t=><button key={t.id} onClick={()=>setCaveTab(t.id)} style={{flex:1,padding:'10px 0',border:0,borderRadius:12,fontSize:13,fontWeight:caveTab===t.id?600:400,cursor:'pointer',background:caveTab===t.id?'var(--sr)':'transparent',color:caveTab===t.id?'var(--bx)':'var(--im)',boxShadow:caveTab===t.id?'var(--sh)':'none',transition:'all .2s'}}>{t.l}</button>)}
      </div>
    </div>
    {/* Historique tab — bottles with qty 0 + tastings */}
    {caveTab==='historique'&&<div style={{padding:'12px 20px 0'}}>
      {(()=>{
        const drunk=bottles.filter(b=>b.quantity===0);
        const unmatched=(tastings||[]).filter(t=>!t.bottle_id);
        const all=[...drunk.map(b=>({type:'bottle',date:b.updated_at||b.created_at,...b})),...unmatched.map(t=>({type:'tasting',date:t.tasted_at,...t}))].sort((a,b)=>new Date(b.date)-new Date(a.date));
        if(all.length===0)return <div style={{textAlign:'center',padding:'40px 0'}}>
          <div style={{fontSize:40,marginBottom:10}}>🍾</div>
          <p className="sf" style={{fontSize:17,color:'var(--im)'}}>Aucune bouteille ouverte pour l'instant.</p>
        </div>;
        return all.map((item,i)=><div key={item.id||i} style={{display:'flex',gap:12,alignItems:'center',padding:'12px 14px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)',marginBottom:10}}>
          <div style={{width:6,height:32,borderRadius:3,background:COLORS.find(c=>c.id===item.color)?.robe||'var(--bx)',flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div className="sf" style={{fontSize:16,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{str(item.name)}</div>
            <div style={{fontSize:13,color:'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.vintage||''} · {item.region||item.appellation||''}</div>
            <div style={{fontSize:12,color:'var(--im)',marginTop:2}}>{new Date(item.date).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}{item.occasion?' · '+item.occasion:''}</div>
          </div>
          {item.score_overall>0&&<div style={{textAlign:'center',flexShrink:0}}>
            <div className="sf" style={{fontSize:20,fontWeight:600,color:'var(--bx)',lineHeight:1}}>{item.score_overall}</div>
            <div style={{fontSize:10,color:'var(--im)'}}>/20</div>
          </div>}
        </div>);
      })()}
    </div>}
    {/* Wishlist tab */}
    {caveTab==='wishlist'&&<div style={{padding:'12px 20px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div className="sc" style={{color:'var(--bx)',opacity:.7}}>{(wishlist||[]).length} vin{(wishlist||[]).length!==1?'s':''} à acheter</div>
        <button onClick={()=>openAdd('wishlist')} style={{padding:'8px 14px',borderRadius:999,border:0,background:'var(--bx)',color:'var(--cr)',fontSize:13,fontWeight:600,cursor:'pointer'}}>+ Ajouter</button>
      </div>
        {(wishlist||[]).map(w=><div key={w.id} onClick={()=>setViewWish(w)} style={{display:'flex',alignItems:'center',gap:12,marginBottom:10,padding:'12px 14px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)',cursor:'pointer'}}>
          <div style={{width:6,height:28,borderRadius:3,background:COLORS.find(c=>c.id===w.color)?.robe||'var(--g)',flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div className="sf" style={{fontSize:16,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{w.name}</div>
            <div style={{fontSize:13,color:'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{w.vintage||''}{w.region?' · '+w.region:''}{w.appellation?' · '+w.appellation:''}</div>
          </div>
          <button onClick={e=>{e.stopPropagation();if(user){removeFromWishlist(w.id).then(()=>fetchWishlist(user.id).then(({data})=>setWishlist(data||[])));}}} style={{border:0,background:'none',cursor:'pointer',fontSize:18,color:'var(--im)',padding:4}}>✕</button>
        </div>)}
        {(wishlist||[]).length===0&&<div style={{textAlign:'center',padding:'40px 0'}}>
          <IcHeart sz={40} c="var(--im)"/>
          <p className="sf" style={{fontSize:17,color:'var(--im)',marginTop:12}}>Votre wishlist est vide.</p>
          <p style={{fontSize:14,color:'var(--im)',marginTop:4}}>Scannez ou cherchez un vin pour l'ajouter.</p>
        </div>}
    </div>}
    {/* Wishlist detail modal */}
    {viewWish&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:60,display:'flex',alignItems:'flex-end'}} onClick={()=>setViewWish(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--cr)',borderRadius:'24px 24px 0 0',width:'100%',maxHeight:'80vh',overflow:'auto',padding:'6px 0 32px'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'8px 0 6px'}}><div style={{width:40,height:4,borderRadius:2,background:'var(--ln)'}}></div></div>
        <div style={{padding:'0 20px'}}>
          <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:16}}>
            <div style={{width:8,height:48,borderRadius:4,background:COLORS.find(c=>c.id===viewWish.color)?.robe||'var(--bx)',flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div className="sf" style={{fontSize:22,fontWeight:600}}>{viewWish.name}</div>
              <div style={{fontSize:15,color:'var(--im)'}}>{viewWish.cuvee||''}{viewWish.region?' · '+viewWish.region:''}{viewWish.appellation?' · '+viewWish.appellation:''}</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
            {[{l:'Couleur',v:(viewWish.color||'rouge')},{l:'Prix estimé',v:viewWish.price_estimate?viewWish.price_estimate+'€':'—'},{l:'Région',v:viewWish.region||'—'},{l:'Appellation',v:viewWish.appellation||'—'}].map(s=><div key={s.l} style={{padding:'12px',borderRadius:14,background:'var(--pm)'}}>
              <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>{s.l}</div>
              <div className="sf" style={{fontSize:15,fontWeight:500,textTransform:'capitalize'}}>{s.v}</div>
            </div>)}
          </div>
          {viewWish.notes&&<div style={{padding:'12px 14px',background:'var(--pm)',borderRadius:14,marginBottom:16}}>
            <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:4}}>Notes</div>
            <p style={{fontSize:15,color:'var(--is)',margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{viewWish.notes}</p>
          </div>}
          <div style={{fontSize:13,color:'var(--im)',textAlign:'center',marginBottom:16}}>Ajouté le {new Date(viewWish.created_at).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</div>
          <div style={{display:'flex',gap:10}}>
            <button onClick={()=>{setViewWish(null);if(user){removeFromWishlist(viewWish.id).then(()=>fetchWishlist(user.id).then(({data})=>setWishlist(data||[])));}}} style={{flex:1,padding:'14px',border:'1px solid var(--ln)',borderRadius:14,background:'var(--cr)',color:'var(--im)',fontSize:15,cursor:'pointer'}}>Supprimer</button>
            <button onClick={()=>setViewWish(null)} style={{flex:1,padding:'14px',border:0,borderRadius:14,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:'pointer'}}>Fermer</button>
          </div>
        </div>
      </div>
    </div>}
    {/* Stats tab */}
    {caveTab==='stats'&&<ScreenStats bottles={bottles} tastings={tastings} embedded/>}
    {/* Vins tab — main content */}
    {caveTab==='vins'&&<>
    {/* À boire maintenant */}
    {readyNow.length>0&&<div style={{padding:'8px 20px 0'}}>
      <SC title={`À boire maintenant`} ey={`${readyNow.length} bouteille${readyNow.length>1?'s à':'à'} leur apogée`}>
        <div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:4}}>
          {readyNow.slice(0,6).map(b=><div key={b.id} onClick={()=>onSel(b)} style={{minWidth:130,padding:'12px',background:'var(--pm)',borderRadius:16,cursor:'pointer',flexShrink:0,border:'.5px solid var(--ln)'}}>
            <div style={{width:8,height:8,borderRadius:4,background:COLORS.find(c=>c.id===b.color)?.robe||'var(--bx)',marginBottom:6}}/>
            <div className="sf" style={{fontSize:14,fontWeight:600,lineHeight:1.2,marginBottom:2}}>{b.name}</div>
            <div style={{fontSize:12,color:'var(--im)'}}>{b.vintage} · {b.appellation}</div>
            <div style={{fontSize:11,color:'#27ae60',marginTop:4,fontWeight:500}}>Prêt à boire</div>
          </div>)}
        </div>
      </SC>
    </div>}
    {/* Insights */}
    {insights.length>0&&<div style={{padding:'4px 20px 0'}}>
      {insights.map((tip,i)=><div key={i} style={{display:'flex',gap:10,padding:'10px 14px',background:'var(--pm)',borderRadius:14,marginTop:8,alignItems:'center'}}>
        <span style={{fontSize:16}}>💡</span>
        <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',flex:1}}>{tip}</p>
      </div>)}
    </div>}
    {/* Search */}
    {bottles.length>3&&<div style={{padding:'12px 20px 0'}}>
      <input type="text" placeholder="Rechercher un vin, une région..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'100%',padding:'12px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:16,background:'var(--sr)',outline:'none',color:'var(--ink)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',boxSizing:'border-box'}}/>
    </div>}
    <div style={{display:'flex',gap:8,padding:'12px 24px',overflowX:'auto'}}>
      {fs.map(x=><button key={x} onClick={()=>setF(x)} style={{padding:'8px 16px',borderRadius:999,border:0,fontSize:15,fontWeight:500,cursor:'pointer',whiteSpace:'nowrap',background:f===x?'var(--bx)':'var(--pm)',color:f===x?'var(--cr)':'var(--is)',transition:'all .15s'}}>{x==='tous'?'Tous':x[0].toUpperCase()+x.slice(1)}</button>)}
    </div>
    <div style={{padding:'4px 20px 0',display:'flex',flexDirection:'column',gap:12}}>
      {bottles.length===0?<div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:56,marginBottom:12}}>🍷</div>
        <h2 className="sf" style={{fontSize:22,fontWeight:500,margin:'0 0 8px'}}>Votre cave est vide</h2>
        <p style={{fontSize:16,color:'var(--im)',margin:'0 0 20px',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Commencez par ajouter quelques bouteilles</p>
        <button onClick={doSeed} disabled={seeding} style={{padding:'14px 28px',borderRadius:999,border:0,background:'var(--bx)',color:'var(--cr)',fontSize:17,fontWeight:600,cursor:seeding?'wait':'pointer',boxShadow:'0 4px 14px rgba(107,30,44,.28)'}}>
          {seeding?'Ajout en cours...':'Ajouter 3 bouteilles de démo'}
        </button>
      </div>:vis.map(b=><div key={b.id} onClick={()=>onSel(b)} style={{display:'flex',gap:14,alignItems:'center',padding:'14px 16px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)',cursor:'pointer'}}>
        <div style={{width:8,height:44,borderRadius:4,background:b.robe,flexShrink:0}}/>
        <div style={{flex:1}}><div className="sf" style={{fontSize:17,fontWeight:500,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:14,color:'var(--im)',marginTop:2}}>{b.region} · {b.vintage}</div></div>
        <div style={{textAlign:'right'}}><div className="sf" style={{fontSize:17,fontWeight:600,color:'var(--bx)'}}>×{b.quantity}</div><div style={{fontSize:13,color:'var(--im)'}}>{b.price}€</div></div>
      </div>)}
    </div>
    {/* Smart recommendation — at the end */}
    {(()=>{
      if(inCave.length<3)return null;
      const month=new Date().getMonth();
      const summer=month>=5&&month<=8;
      const scored=inCave.map(b=>{
        let s=0;const pf=b.peakFrom,pt=b.peakTo;
        if(pf&&pt&&year>=pf&&year<=pt)s+=30;
        if(summer&&(b.color==='blanc'||b.color==='rosé'||b.color==='effervescent'))s+=20;
        if(!summer&&b.color==='rouge')s+=15;
        if(b.score>85)s+=10;
        return{...b,_rec:s};
      }).filter(b=>b._rec>10).sort((a,b)=>b._rec-a._rec);
      if(scored.length===0)return null;
      const pick=scored[0];
      const reason=summer?(pick.color==='blanc'||pick.color==='rosé'?'Parfait pour la saison':'Un rouge de saison'):(pick.peakFrom&&year>=pick.peakFrom?'À son apogée':'Prêt à déguster');
      return <div style={{padding:'12px 20px 0'}}>
        <div onClick={()=>onSel(pick)} style={{background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',borderRadius:18,padding:'16px 18px',cursor:'pointer',display:'flex',gap:14,alignItems:'center'}}>
          <div style={{width:44,height:44,borderRadius:14,background:'rgba(245,237,224,.12)',display:'flex',alignItems:'center',justifyContent:'center'}}><IcStar sz={22} c="var(--gs)" fill="var(--gs)"/></div>
          <div style={{flex:1,color:'var(--cr)',minWidth:0}}>
            <div style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',opacity:.7,marginBottom:2}}>Ce soir, ouvrez</div>
            <div className="sf" style={{fontSize:17,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{str(pick.name)} {pick.vintage||''}</div>
            <div style={{fontSize:13,opacity:.8,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:2}}>{reason}</div>
          </div>
          <IcArrow sz={18} c="rgba(255,255,255,.5)"/>
        </div>
      </div>;
    })()}
    </>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: BOTTLE DETAIL
// ═══════════════════════════════════════════════════════════════
// Error boundary for screens
class ErrorBoundary extends React.Component{
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(err){return{err};}
  render(){
    if(this.state.err)return <div style={{padding:40,textAlign:'center'}}>
      <div style={{fontSize:40,marginBottom:12}}>⚠️</div>
      <h2 style={{fontSize:18,margin:'0 0 8px'}}>Une erreur est survenue</h2>
      <p style={{fontSize:14,color:'#888',margin:'0 0 16px'}}>{this.state.err?.message||'Erreur inconnue'}</p>
      <button onClick={()=>{this.setState({err:null});this.props.onReset?.();}} style={{padding:'10px 20px',border:0,borderRadius:999,background:'#6B1E2C',color:'#fff',fontSize:14,cursor:'pointer'}}>Retour</button>
    </div>;
    return this.props.children;
  }
}

function ScreenBottle({bottle:b,onBack,onEdit,onDelete,onOpen}) {
  const [tab,setTab]=useState('dégustation');
  const [confirmDel,setConfirmDel]=useState(false);
  const [estate,setEstate]=useState(null);
  const [estateLoading,setEstateLoading]=useState(false);
  const tabs=['dégustation','domaine','accords','amis'];
  const robe=b.robe||COLORS.find(c=>c.id===b.color)?.robe||'#6B1E2C';

  // Fetch full estate data when domaine tab is selected
  useEffect(()=>{
    if(tab==='domaine'&&!estate&&!estateLoading){
      setEstateLoading(true);
      fetchEstate(b.name).then(e=>{
        setEstate(e);setEstateLoading(false);
      }).catch(()=>setEstateLoading(false));
    }
  },[tab]);

  if(!b)return <div style={{padding:40,textAlign:'center'}}><button onClick={onBack}>Retour</button></div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {/* Hero */}
    <div style={{position:'relative',height:280,overflow:'hidden',background:`radial-gradient(120% 80% at 50% 30%,${robe} 0%,${robe}dd 40%,#3A0F18 100%)`}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(60% 50% at 50% 100%,rgba(0,0,0,.4) 0%,transparent 70%)'}}/>
      <div style={{position:'relative',padding:'62px 16px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack} bg="rgba(245,237,224,.2)" c="var(--cr)"/>
        <div style={{display:'flex',gap:8}}>
          {onEdit&&<button onClick={()=>onEdit(b)} style={{padding:'8px 16px',borderRadius:999,border:0,background:'rgba(245,237,224,.2)',backdropFilter:'blur(8px)',color:'var(--cr)',fontSize:15,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Modifier
          </button>}
          {onDelete&&<button onClick={()=>setConfirmDel(true)} style={{width:36,height:36,borderRadius:'50%',border:0,background:'rgba(192,57,43,.3)',backdropFilter:'blur(8px)',color:'var(--cr)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>}
        </div>
      </div>
      <div style={{position:'absolute',bottom:16,left:24,right:24,color:'var(--cr)'}}>
        <div className="sc" style={{opacity:.75,marginBottom:4}}>{str(b.appellation)}</div>
      </div>
    </div>
    {/* Confirm delete modal */}
    {confirmDel&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setConfirmDel(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--sr)',borderRadius:24,padding:28,maxWidth:320,width:'100%',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,.3)'}}>
        <div style={{fontSize:40,marginBottom:12}}>🗑️</div>
        <h3 className="sf" style={{fontSize:22,margin:'0 0 8px'}}>Supprimer cette bouteille ?</h3>
        <p style={{fontSize:16,color:'var(--im)',margin:'0 0 20px',lineHeight:1.4}}>{str(b.name)}{b.vintage?' · '+b.vintage:''}</p>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>setConfirmDel(false)} style={{flex:1,padding:'12px 0',borderRadius:999,border:'1px solid var(--ls)',background:'transparent',fontSize:16,fontWeight:500,cursor:'pointer',color:'var(--is)'}}>Annuler</button>
          <button onClick={()=>{setConfirmDel(false);onDelete(b.id);}} style={{flex:1,padding:'12px 0',borderRadius:999,border:0,background:'#C0392B',color:'#fff',fontSize:16,fontWeight:600,cursor:'pointer'}}>Supprimer</button>
        </div>
      </div>
    </div>}
    {/* Name + score */}
    <div style={{padding:'20px 24px 0',textAlign:'center'}}>
      <h1 className="sf" style={{margin:0,fontSize:28,fontWeight:500,lineHeight:1.1}}>{str(b.name)}</h1>
      <div style={{fontSize:18,color:'var(--bx)',marginTop:4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
        {str(b.cuvee)?str(b.cuvee)+' · ':''}{b.vintage||''}
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:20,marginTop:16}}>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:28,color:'var(--bx)',fontWeight:500,lineHeight:1}}>{typeof b.score==='number'&&b.score?b.score:'—'}<span style={{fontSize:16,color:'var(--im)'}}>/100</span></div><div className="sc" style={{fontSize:11,color:'var(--im)',marginTop:4}}>Note</div></div>
        <div style={{width:1,height:32,background:'var(--ls)'}}></div>
        <div style={{textAlign:'center'}}><SR v={typeof b.communityRating==='number'?b.communityRating:0} sz={14}/><div className="sc" style={{fontSize:11,color:'var(--im)',marginTop:4}}>{typeof b.communityCount==='number'?b.communityCount:0} avis</div></div>
        <div style={{width:1,height:32,background:'var(--ls)'}}></div>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:28,color:'var(--bx)',fontWeight:500,lineHeight:1}}>×{typeof b.quantity==='number'?b.quantity:1}</div><div className="sc" style={{fontSize:11,color:'var(--im)',marginTop:4}}>En cave</div></div>
      </div>
      {/* Location + Open button */}
      {typeof b.location==='string'&&b.location&&<div style={{textAlign:'center',marginTop:8,fontSize:14,color:'var(--im)'}}>📍 {b.location}</div>}
      {b.quantity>0&&onOpen&&<div style={{padding:'12px 24px 0'}}>
        <button onClick={()=>onOpen(b)} style={{width:'100%',padding:'14px 0',border:0,borderRadius:999,background:'linear-gradient(180deg,#27ae60 0%,#1e8449 100%)',color:'#fff',fontSize:17,fontWeight:600,cursor:'pointer',boxShadow:'0 4px 14px rgba(39,174,96,.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          🍾 Ouvrir cette bouteille
        </button>
      </div>}
    </div>
    {/* Tabs */}
    <div style={{padding:'24px 16px 0'}}><div style={{display:'flex',background:'var(--pm)',borderRadius:999,padding:3,gap:2}}>
      {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,border:0,padding:'9px 6px',borderRadius:999,background:tab===t?'var(--sr)':'transparent',color:tab===t?'var(--bx)':'var(--im)',fontSize:14,fontWeight:500,textTransform:'capitalize',cursor:'pointer',boxShadow:tab===t?'var(--sh)':'none',transition:'all .2s'}}>{t}</button>)}
    </div></div>
    {/* Tab content */}
    <div style={{padding:'0 20px'}}>
      {tab==='dégustation'&&<>
        <SC title="Fenêtre de dégustation" ey="Maturité"><MB pf={b.peakFrom} pt={b.peakTo}/></SC>
        <SC title="Nez — roue des arômes" ey="Olfactif">
          <div style={{display:'flex',justifyContent:'center',padding:'4px 0 12px'}}><AW data={b.aromaW} size={240}/></div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{(b.aromas||[]).slice(0,8).map(a=><span key={a} style={{padding:'6px 12px',borderRadius:999,fontSize:14,fontWeight:500,background:'var(--pm)',color:'var(--is)',border:'0.5px solid var(--ln)'}}>{a}</span>)}</div>
        </SC>
        <SC title="Assemblage" ey="Cépages">
          {(b.cepages||[]).map(c=><div key={c.n} style={{marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:17,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c.n}</span>
              <span className="sf" style={{fontSize:16,color:'var(--bx)',fontWeight:600}}>{c.p}%</span>
            </div>
            <div style={{height:4,background:'var(--pm)',borderRadius:2,overflow:'hidden'}}><div style={{width:`${c.p}%`,height:'100%',background:'linear-gradient(90deg,var(--bs),var(--bx))'}}/></div>
          </div>)}
        </SC>
        <SC title="Service" ey="Conseils">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
            {[{l:'Température',v:b.service?.temp||'—'},{l:'Verre',v:b.service?.glass||b.service?.verre||'—'},{l:'Carafage',v:b.service?.carafe||'—'}].map(s=><div key={s.l} style={{background:'var(--pm)',borderRadius:16,padding:12,textAlign:'center'}}>
              <div className="sc" style={{fontSize:10,color:'var(--im)'}}>{s.l}</div>
              <div className="sf" style={{fontSize:15,fontWeight:500,marginTop:4}}>{s.v}</div>
            </div>)}
          </div>
        </SC>
        <SC title="Notes personnelles" ey="Impressions">
          <p style={{fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)',lineHeight:1.5,margin:0}}>« {typeof b.notes==='string'?b.notes:'Aucune note.'} »</p>
        </SC>
      </>}
      {tab==='domaine'&&<>
        {estateLoading&&<div style={{textAlign:'center',padding:'40px 0',color:'var(--im)'}}>Chargement du domaine...</div>}
        <SC title={estate?.name||b.name} ey="Histoire">
          <div style={{display:'flex',alignItems:'flex-end',gap:16,marginBottom:14,padding:'16px',borderRadius:16,background:'linear-gradient(140deg,var(--pm),var(--cr))'}}>
            <div><div className="sc" style={{fontSize:11,color:'var(--bx)'}}>Fondé en</div><div className="sf" style={{fontSize:32,fontWeight:500,color:'var(--bx)',lineHeight:1}}>{estate?.founded||b.estate?.founded||'—'}</div></div>
            {estate?.classification&&<div style={{padding:'6px 12px',background:'var(--bx)',borderRadius:999,marginLeft:'auto'}}><span style={{fontSize:13,fontWeight:600,color:'var(--cr)'}}>{estate.classification}</span></div>}
          </div>
          <p className="sf" style={{fontSize:17,color:'var(--is)',lineHeight:1.55,margin:'0 0 14px'}}>{estate?.history||b.estate?.desc||b.estate?.description||'Informations à venir.'}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[
              {l:'Propriétaire',v:estate?.owner||b.estate?.owner||'—'},
              {l:'Surface',v:estate?.vineyard?.surfaceRaw||b.estate?.surface||'—'},
              {l:'Région',v:estate?.subRegion||b.region},
              {l:'Terroir',v:estate?.terroir?.summary||b.estate?.terroir||'—'},
              ...(estate?.terroir?.climate?[{l:'Climat',v:estate.terroir.climate}]:[]),
              ...(estate?.terroir?.soils?.length?[{l:'Sols',v:estate.terroir.soils.join(', ')}]:[]),
            ].map(i=><div key={i.l} style={{padding:'10px 12px',background:'var(--pm)',borderRadius:12}}>
              <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>{i.l}</div>
              <div className="sf" style={{fontSize:15,fontWeight:500}}>{i.v}</div>
            </div>)}
          </div>
        </SC>
        {estate?.viticulture?.method&&<SC title="Viticulture" ey="Méthode">
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span style={{padding:'6px 14px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:14,fontWeight:500}}>{estate.viticulture.method}</span>
            {(estate.viticulture.certifications||[]).map(c=><span key={c} style={{padding:'6px 14px',borderRadius:999,background:'var(--bx)',color:'var(--cr)',fontSize:14,fontWeight:500}}>{c}</span>)}
          </div>
          {estate.philosophy&&<p style={{fontSize:15,color:'var(--is)',margin:'12px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{estate.philosophy}</p>}
        </SC>}
        {estate?.anecdotes?.length>0&&<SC title="Le saviez-vous ?" ey="Anecdotes">
          {estate.anecdotes.map((a,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:i<estate.anecdotes.length-1?12:0}}>
            <div style={{width:4,borderRadius:2,background:'var(--g)',flexShrink:0,marginTop:4}}/>
            <p style={{fontSize:15,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</p>
          </div>)}
        </SC>}
        {VINTAGES[b.region]&&<SC title={`Millésime ${b.vintage}`} ey="Note de l'année">
          <div style={{display:'flex',gap:4,alignItems:'flex-end',height:80}}>
            {Object.entries(VINTAGES[b.region]).map(([y,s])=><div key={y} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:'100%',background:parseInt(y)===b.vintage?'var(--bx)':'var(--pm)',borderRadius:3,height:`${(s/100)*70}px`,transition:'all .2s'}}/>
              <span style={{fontSize:10,color:parseInt(y)===b.vintage?'var(--bx)':'var(--im)',fontWeight:parseInt(y)===b.vintage?700:400}}>{y.slice(2)}</span>
            </div>)}
          </div>
        </SC>}
      </>}
      {tab==='accords'&&<>
        <SC title="Accords recommandés" ey="Mets & vin">
          {(b.pairings||[]).map(p=><div key={p} style={{display:'flex',gap:14,alignItems:'center',padding:'12px 14px',background:'var(--pm)',borderRadius:14,marginBottom:8}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--bx)'}}><IcFork sz={18}/></div>
            <span className="sf" style={{fontSize:17,fontWeight:500,flex:1}}>{p}</span>
            <IcArrow sz={16} c="var(--im)"/>
          </div>)}
        </SC>
        <SC title="À éviter" ey="Désaccords">
          <p style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--im)',margin:0,lineHeight:1.5}}>
            {b.color==='rouge'?'Poissons gras, plats trop épicés ou très vinaigrés.':b.color==='blanc'?'Viandes rouges saignantes, gibiers à plumes.':b.color==='liquoreux'?'Plats salés-acides. Servir en apéritif ou accord sucré-salé maîtrisé.':'Plats très corsés qui écraseraient la délicatesse des bulles.'}
          </p>
        </SC>
      </>}
      {tab==='amis'&&<>
        <SC title="Avis de vos proches" ey={`${(b.friends||[]).length} commentaire${(b.friends||[]).length!==1?'s':''}`}>
          {(!b.friends||b.friends.length===0)?<p style={{fontSize:17,color:'var(--im)',textAlign:'center',padding:'20px 0',margin:0,fontStyle:'italic'}}>Aucun avis pour cette bouteille.</p>:
          b.friends.map((f,i)=><div key={i} style={{display:'flex',gap:12,marginBottom:i<b.friends.length-1?16:0}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontWeight:500,fontSize:18,flexShrink:0}}>{f.n[0]}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:16}}><span className="sf" style={{fontWeight:600}}>{f.n}</span></div>
              <SR v={f.r} sz={12}/>
              {f.c&&<p style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)',margin:'4px 0 0',lineHeight:1.4}}>« {f.c} »</p>}
              <div style={{fontSize:13,color:'var(--im)',marginTop:4}}>{f.d}</div>
            </div>
          </div>)}
        </SC>
      </>}
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: REGION DETAIL — Carte détaillée d'une région viticole
// ═══════════════════════════════════════════════════════════════
function ScreenRegionDetail({region,onBack,bottles,onSel}) {
  const rd=REGION_DETAILS[region];
  const [selAppellation,setSelAppellation]=useState(null);
  const mapRef=React.useRef(null);
  const mapInstance=React.useRef(null);
  if(!rd)return <div style={{padding:40,textAlign:'center'}}>Région non disponible.<button onClick={onBack}>Retour</button></div>;

  const apps=rd.appellations||[];

  // Get estates for this region
  const [estates,setEstates]=useState([]);
  useEffect(()=>{
    fetch(`/api/estate?q=${encodeURIComponent(region)}`)
      .then(r=>r.json()).then(d=>setEstates(Array.isArray(d)?d:[]))
      .catch(()=>{});
  },[region]);

  // Initialize Leaflet map
  useEffect(()=>{
    if(!mapRef.current||mapInstance.current)return;
    import('leaflet').then(L=>{
      // Import CSS
      if(!document.getElementById('leaflet-css')){
        const link=document.createElement('link');
        link.id='leaflet-css';link.rel='stylesheet';
        link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const map=L.map(mapRef.current,{
        center:rd.center,zoom:9,
        zoomControl:false,attributionControl:false,
      });
      L.control.zoom({position:'bottomright'}).addTo(map);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
        maxZoom:15,minZoom:7,
        attribution:'&copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      // Fit bounds
      if(rd.bounds){
        map.fitBounds([rd.bounds[0],rd.bounds[1]],{padding:[20,20]});
      }

      // Appellation markers (large touch targets for mobile)
      apps.forEach(a=>{
        // Invisible large touch target
        const touch=L.circleMarker([a.lat,a.lng],{
          radius:22,fillColor:'transparent',color:'transparent',weight:0,fillOpacity:0,
        }).addTo(map);
        // Visible marker
        const marker=L.circleMarker([a.lat,a.lng],{
          radius:10,fillColor:a.color,color:'#fff',weight:2.5,fillOpacity:0.85,
        }).addTo(map);
        // Label
        const tooltip=marker.bindTooltip(a.name,{permanent:true,direction:'top',offset:[0,-14],className:'app-tooltip',interactive:true});
        // Click on touch target, marker, or tooltip → select appellation
        const handleClick=()=>setSelAppellation(prev=>prev===a.name?null:a.name);
        touch.on('click',handleClick);
        marker.on('click',handleClick);
      });

      // Style for tooltips
      if(!document.getElementById('map-styles')){
        const style=document.createElement('style');
        style.id='map-styles';
        style.textContent=`.app-tooltip{background:rgba(107,30,44,.92)!important;color:#F5EDE0!important;border:0!important;font-family:'Cormorant Garamond',serif!important;font-style:italic;font-size:13px!important;padding:4px 10px!important;border-radius:10px!important;box-shadow:0 3px 10px rgba(0,0,0,.2)!important;}.app-tooltip::before{border-top-color:rgba(107,30,44,.92)!important;}.estate-tooltip{background:rgba(45,30,20,.85)!important;color:#F5EDE0!important;border:0!important;font-family:'Cormorant Garamond',serif!important;font-style:italic;font-size:12px!important;padding:3px 8px!important;border-radius:8px!important;}.estate-tooltip::before{border-top-color:rgba(45,30,20,.85)!important;}.leaflet-popup-content-wrapper{border-radius:16px!important;box-shadow:0 8px 24px rgba(0,0,0,.15)!important;border:1px solid rgba(107,30,44,.1)!important;}.leaflet-popup-tip{box-shadow:none!important;}.leaflet-control-zoom a{background:rgba(245,237,224,.9)!important;color:#6B1E2C!important;border-color:rgba(107,30,44,.15)!important;border-radius:8px!important;}`;
        document.head.appendChild(style);
      }

      mapInstance.current=map;
    });

    return()=>{
      if(mapInstance.current){mapInstance.current.remove();mapInstance.current=null;}
    };
  },[]);

  // Add estate markers when data loads
  useEffect(()=>{
    if(!mapInstance.current||!estates.length)return;
    import('leaflet').then(L=>{
      estates.forEach(e=>{
        if(!e.coordinates?.lat)return;
        const m=L.circleMarker([e.coordinates.lat,e.coordinates.lng],{
          radius:5,fillColor:'#D4A030',color:'#fff',weight:1.5,fillOpacity:0.9,
        }).addTo(mapInstance.current);
        m.bindTooltip(e.name,{direction:'top',offset:[0,-8],className:'estate-tooltip'});
        m.bindPopup(`<div style="font-family:'Cormorant Garamond',serif;min-width:170px;padding:4px">
          <div style="font-size:16px;font-weight:600;color:#6B1E2C;margin-bottom:4px">${e.name}</div>
          <div style="font-size:12px;color:#888;margin-bottom:6px">${e.subRegion||''} ${e.appellations?'· '+e.appellations[0]:''}</div>
          ${e.terroir?.soils?'<div style="font-size:12px;margin-bottom:3px"><span style="color:#6B1E2C;font-weight:600">Sol</span> — '+e.terroir.soils.join(', ')+'</div>':''}
          ${e.terroir?.climate?'<div style="font-size:12px;margin-bottom:3px"><span style="color:#6B1E2C;font-weight:600">Climat</span> — '+e.terroir.climate+'</div>':''}
          ${e.founded?'<div style="font-size:12px;margin-bottom:3px"><span style="color:#6B1E2C;font-weight:600">Fondé</span> — '+e.founded+'</div>':''}
          ${e.classification?'<div style="margin-top:6px"><span style="font-size:9px;background:#6B1E2C;color:#F5EDE0;padding:2px 8px;border-radius:6px;font-weight:600;letter-spacing:.5px">'+e.classification+'</span></div>':''}
        </div>`,{maxWidth:240});
      });
    });
  },[estates]);

  const [selEstate,setSelEstate]=useState(null);
  const regionBottles=bottles.filter(b=>(b.region||'').toLowerCase()===region.toLowerCase());
  const selApp=apps.find(a=>a.name===selAppellation);

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {/* Estate detail modal */}
    {selEstate&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:60,display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={()=>setSelEstate(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--cr)',borderRadius:'24px 24px 0 0',width:'100%',maxWidth:430,maxHeight:'85vh',overflow:'auto',padding:'6px 0 32px',boxShadow:'0 -8px 40px rgba(0,0,0,.2)'}}>
        {/* Drag handle */}
        <div style={{display:'flex',justifyContent:'center',padding:'8px 0 12px'}}><div style={{width:40,height:4,borderRadius:2,background:'var(--ln)'}}></div></div>
        <div style={{padding:'0 20px'}}>
          {/* Header */}
          <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:16}}>
            <div style={{width:48,height:48,borderRadius:16,background:selEstate.color||'var(--bx)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>🏛️</div>
            <div style={{flex:1}}>
              <h2 className="sf" style={{margin:0,fontSize:22,fontWeight:600,color:'var(--bx)'}}>{selEstate.name}</h2>
              <div style={{fontSize:14,color:'var(--im)',marginTop:2}}>{selEstate.subRegion||selEstate.region}{selEstate.appellations?.length?' · '+selEstate.appellations[0]:''}</div>
              {selEstate.classification&&<span style={{display:'inline-block',marginTop:4,fontSize:12,padding:'3px 10px',borderRadius:999,background:'var(--bx)',color:'var(--cr)',fontWeight:600}}>{selEstate.classification}</span>}
            </div>
          </div>

          {/* History */}
          {selEstate.history&&<div style={{marginBottom:16}}>
            <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Histoire</div>
            <p style={{fontSize:16,color:'var(--is)',margin:0,lineHeight:1.6,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{selEstate.history}</p>
          </div>}

          {/* Key info grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
            {[
              {l:'Fondé',v:selEstate.founded},
              {l:'Propriétaire',v:selEstate.owner},
              {l:'Maître de chai',v:selEstate.winemaker},
              {l:'Surface',v:selEstate.vineyard?.surfaceRaw||selEstate.vineyard?.surface},
            ].filter(k=>k.v).map(k=><div key={k.l} style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
              <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>{k.l}</div>
              <div style={{fontSize:15,fontWeight:500,color:'var(--ink)'}}>{k.v}</div>
            </div>)}
          </div>

          {/* Terroir */}
          {selEstate.terroir&&<div style={{marginBottom:16}}>
            <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Terroir</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {selEstate.terroir.soils?.length>0&&<div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--bx)',marginBottom:4}}>🌍 Sols</div>
                <div style={{fontSize:14,color:'var(--is)',lineHeight:1.4}}>{selEstate.terroir.soils.join(', ')}</div>
              </div>}
              {selEstate.terroir.climate&&<div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--bx)',marginBottom:4}}>☀️ Climat</div>
                <div style={{fontSize:14,color:'var(--is)',lineHeight:1.4}}>{selEstate.terroir.climate}</div>
              </div>}
            </div>
            {selEstate.terroir.summary&&<p style={{fontSize:14,color:'var(--im)',margin:'8px 0 0',lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{selEstate.terroir.summary}</p>}
          </div>}

          {/* Viticulture */}
          {selEstate.viticulture&&<div style={{marginBottom:16}}>
            <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Viticulture</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {selEstate.viticulture.method&&<span style={{padding:'5px 12px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:14,fontWeight:500}}>{selEstate.viticulture.method}</span>}
              {(selEstate.viticulture.certifications||[]).map(c=><span key={c} style={{padding:'5px 12px',borderRadius:999,background:'#27ae6015',color:'#27ae60',fontSize:14,fontWeight:500,border:'1px solid #27ae6030'}}>{c}</span>)}
            </div>
          </div>}

          {/* Philosophy */}
          {selEstate.philosophy&&<div style={{marginBottom:16,padding:14,borderRadius:14,background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',color:'var(--cr)'}}>
            <div style={{fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--gs)',opacity:.7,marginBottom:6}}>Philosophie</div>
            <p style={{fontSize:15,margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--gs)'}}>{selEstate.philosophy}</p>
          </div>}

          {/* Anecdotes */}
          {selEstate.anecdotes?.length>0&&<div style={{marginBottom:16}}>
            <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Le saviez-vous ?</div>
            {selEstate.anecdotes.map((a,i)=><div key={i} style={{display:'flex',gap:8,marginBottom:8}}>
              <div style={{width:4,borderRadius:2,background:'var(--g)',flexShrink:0,marginTop:4}}/>
              <p style={{fontSize:15,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</p>
            </div>)}
          </div>}

          {/* Tags */}
          {selEstate.tags?.length>0&&<div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {selEstate.tags.map(t=><span key={t} style={{padding:'3px 10px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:12,color:'var(--im)'}}>{t}</span>)}
          </div>}
        </div>
      </div>
    </div>}
    {/* Header */}
    <div style={{padding:'52px 20px 14px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack}/>
        <div style={{flex:1}}>
          <div className="sc" style={{color:'var(--bx)',opacity:.7}}>Carte détaillée</div>
          <h1 className="sf" style={{margin:0,fontSize:28,fontWeight:500}}>{region}</h1>
        </div>
      </div>
    </div>

    <div style={{padding:'0 16px'}}>
      {/* Overview */}
      <div style={{background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',borderRadius:20,padding:18,color:'var(--cr)',marginBottom:14}}>
        <p style={{fontSize:16,margin:'0 0 10px',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--gs)'}}>{rd.overview}</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[{l:'Surface',v:rd.surface},{l:'Climat',v:rd.climate?.split('.')[0]},{l:'Appellations',v:`${apps.length} cartographiées`},{l:'Domaines',v:`${estates.length} référencés`}].map(k=>k.v?<div key={k.l} style={{padding:'8px 10px',borderRadius:10,background:'rgba(245,237,224,0.08)'}}>
            <div style={{fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,237,224,0.5)',marginBottom:2}}>{k.l}</div>
            <div style={{fontSize:15,fontWeight:500}}>{k.v}</div>
          </div>:null)}
        </div>
      </div>

      {/* Leaflet Map */}
      <SC title="Carte des appellations" ey="Cliquez les points pour explorer">
        <div ref={mapRef} style={{width:'100%',height:340,borderRadius:16,overflow:'hidden',border:'1px solid var(--ln)',filter:'sepia(15%) saturate(90%) brightness(102%)'}}/>
        <div style={{display:'flex',alignItems:'center',gap:12,marginTop:10,justifyContent:'center',fontSize:12,color:'var(--im)'}}>
          <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{display:'inline-block',width:10,height:10,borderRadius:5,background:'var(--bx)',border:'1.5px solid #fff',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>Appellations</span>
          <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{display:'inline-block',width:7,height:7,borderRadius:4,background:'#D4A030',border:'1px solid #fff'}}/>Domaines</span>
        </div>
      </SC>

      {/* Appellation detail panel */}
      {selApp&&<SC title={selApp.name} ey="Détail appellation">
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
          {(selApp.cepages||[]).map(c=><span key={c} style={{padding:'5px 12px',borderRadius:999,background:selApp.color+'15',color:selApp.color,fontSize:14,fontWeight:500,border:`1px solid ${selApp.color}30`}}>{c}</span>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
          <div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
            <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>Sols</div>
            <div style={{fontSize:14,color:'var(--ink)',lineHeight:1.4}}>{(selApp.soils||[]).join(', ')}</div>
          </div>
          <div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
            <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>Climat</div>
            <div style={{fontSize:14,color:'var(--ink)',lineHeight:1.4}}>{selApp.climate}</div>
          </div>
        </div>
        <div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)',marginBottom:12}}>
          <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:2}}>Style</div>
          <div style={{fontSize:15,color:'var(--ink)',lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{selApp.style}</div>
        </div>
        <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Arômes typiques</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {(selApp.aromas||[]).map(a=><span key={a} style={{padding:'4px 10px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:13,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</span>)}
        </div>
      </SC>}

      {/* Estates list */}
      {estates.length>0&&<SC title={`Domaines de ${region}`} ey={`${estates.length} référencés`}>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {estates.slice(0,20).map(e=><div key={e.id} onClick={()=>setSelEstate(e)} style={{display:'flex',gap:10,alignItems:'center',padding:'10px 12px',borderRadius:14,background:'var(--pm)',border:'.5px solid var(--ln)',cursor:'pointer'}}>
            <div style={{width:8,height:8,borderRadius:4,background:e.color||'var(--bx)',flexShrink:0}}/>
            <div style={{flex:1}}>
              <div className="sf" style={{fontSize:16,fontWeight:500}}>{e.name}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>
                {e.subRegion||''}{e.appellations?.length?' · '+e.appellations[0]:''}
                {e.terroir?.soils?.length?' — '+e.terroir.soils[0]:''}
              </div>
            </div>
            {e.classification&&<span style={{fontSize:10,padding:'2px 6px',borderRadius:999,background:'var(--bx)',color:'var(--cr)',fontWeight:600}}>{e.classification.slice(0,12)}</span>}
            <IcArrow sz={14} c="var(--im)"/>
          </div>)}
        </div>
      </SC>}

      {/* Bottles in cave from this region */}
      {regionBottles.length>0&&<SC title="Dans votre cave" ey={`${regionBottles.length} bouteille${regionBottles.length>1?'s':''}`}>
        {regionBottles.map(b=><div key={b.id} onClick={()=>onSel(b)} style={{display:'flex',gap:10,alignItems:'center',padding:'10px 12px',borderRadius:14,background:'var(--pm)',cursor:'pointer',marginBottom:6}}>
          <div style={{width:6,height:30,borderRadius:3,background:b.robe,flexShrink:0}}/>
          <div style={{flex:1}}><div className="sf" style={{fontSize:16,fontWeight:500}}>{b.name}</div><div style={{fontSize:13,color:'var(--im)'}}>{b.appellation} · {b.vintage}</div></div>
          <span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>×{b.quantity}</span>
        </div>)}
      </SC>}

      {/* All appellations quick list */}
      <SC title="Toutes les appellations" ey="Référence rapide">
        {apps.map(a=><button key={a.name} onClick={()=>{setSelAppellation(a.name);window.scrollTo({top:0,behavior:'smooth'});}} style={{width:'100%',border:0,padding:'10px 12px',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,textAlign:'left',borderBottom:'0.5px solid var(--ln)'}}>
          <div style={{width:10,height:10,borderRadius:5,background:a.color,flexShrink:0}}/>
          <div style={{flex:1}}>
            <div className="sf" style={{fontSize:16,fontWeight:500}}>{a.name}</div>
            <div style={{fontSize:12,color:'var(--im)'}}>{(a.cepages||[]).slice(0,2).join(', ')}</div>
          </div>
          <div style={{fontSize:12,color:'var(--im)'}}>{(a.soils||[])[0]||''}</div>
        </button>)}
      </SC>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: MAP
// ═══════════════════════════════════════════════════════════════
function ScreenMapFull({onSel,bottles,onBack}) {
  const [sel,setSel]=useState('naq');
  const [regionDetail,setRegionDetail]=useState(null);
  const r=MAP_REGIONS.find(x=>x.id===sel);
  const rb=useMemo(()=>{if(!r?.w)return[];const ws=r.w.toLowerCase().split(/[&·,]/).map(s=>s.trim());return bottles.filter(b=>{const n=(b.region||'').toLowerCase();return ws.some(w=>n.includes(w)||w.includes(n));});},[r,bottles]);

  // Map combined region names to REGION_DETAILS keys
  const getDetailRegions=(name)=>{
    if(!name)return[];
    const n=name.toLowerCase();
    const matches=[];
    for(const k of Object.keys(REGION_DETAILS)){
      const kl=k.toLowerCase();
      if(n.includes(kl)||kl.includes(n.replace(/\s*\(.*\)/,''))||
        (kl==='loire'&&n.includes('loire'))||
        (kl==='languedoc'&&n.includes('languedoc')))
        matches.push(k);
    }
    return matches;
  };
  const detailRegions=getDetailRegions(r?.w);

  if(regionDetail) return <ScreenRegionDetail region={regionDetail} onBack={()=>setRegionDetail(null)} bottles={bottles} onSel={onSel}/>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {onBack&&<div style={{padding:'52px 20px 0'}}><IB icon={<IcBack sz={18}/>} onClick={onBack}/></div>}
    {!onBack&&<PH ey="Terroir" title={<span>Ma France<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>du vin</span></span>}/>}
    {onBack&&<div style={{padding:'0 24px 10px'}}><h1 className="sf" style={{margin:0,fontSize:34,fontWeight:500}}>Carte des <span style={{fontStyle:'italic',color:'var(--bx)'}}>régions</span></h1></div>}
    <div style={{margin:'8px 16px 0',borderRadius:20,overflow:'hidden',background:'var(--pm)',boxShadow:'var(--sh)'}}>
      <WineMap sel={sel} onSel={setSel} bottles={bottles}/>
    </div>
    {r?.w&&<div style={{padding:'14px 16px 0'}}><div style={{background:'var(--sr)',borderRadius:22,padding:20,boxShadow:'var(--sh)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><div className="sc" style={{color:'var(--bx)',opacity:.7}}>{rb.length} référence{rb.length!==1?'s':''}</div>
          <h2 className="sf" style={{margin:'2px 0 0',fontSize:24,fontWeight:500}}>{r.w}</h2>
          <div style={{fontSize:14,color:'var(--im)',marginTop:2,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{r.s}</div></div>
        <div style={{width:44,height:44,borderRadius:22,background:r.ac,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 12px ${r.ac}40`}}><IcPin sz={20} c="#fff"/></div>
      </div>
      {/* Explorer buttons */}
      {detailRegions.length>0&&<div style={{display:'flex',gap:8,marginTop:14}}>
        {detailRegions.map(dr=><button key={dr} onClick={()=>setRegionDetail(dr)} style={{flex:1,padding:'14px',border:0,borderRadius:16,background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',color:'var(--cr)',fontSize:15,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,boxShadow:'0 4px 16px rgba(107,30,44,.25)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          {dr}
        </button>)}
      </div>}
      {rb.length>0?<div style={{marginTop:14,display:'flex',flexDirection:'column',gap:8}}>
        {rb.map(b=><div key={b.id} onClick={()=>onSel(b)} style={{display:'flex',gap:12,alignItems:'center',padding:'10px 12px',borderRadius:14,background:'var(--pm)',cursor:'pointer'}}>
          <div style={{width:6,height:30,borderRadius:3,background:b.robe,flexShrink:0}}/>
          <div style={{flex:1}}><div className="sf" style={{fontSize:17,fontWeight:500,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:13,color:'var(--im)'}}>{b.appellation} · {b.vintage}</div></div>
          <span style={{padding:'4px 10px',borderRadius:999,fontSize:14,fontWeight:600,background:'var(--cr)',color:'var(--bx)',border:'0.5px solid var(--ln)'}}>×{b.quantity}</span>
        </div>)}
      </div>:<p style={{fontSize:17,color:'var(--im)',marginTop:14,fontStyle:'italic'}}>Aucune bouteille.</p>}
      {r.t&&<div style={{marginTop:14,padding:'12px 14px',borderRadius:14,background:'var(--pm)',display:'flex',gap:10,alignItems:'flex-start'}}>
        <span style={{fontSize:18,lineHeight:1,marginTop:2}}>🍷</span>
        <div><div className="sc" style={{fontSize:10,color:'var(--bx)',opacity:.7,marginBottom:2}}>Conseil sommelier</div>
          <p style={{fontSize:15,color:'var(--is)',margin:0,lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{r.t}</p></div>
      </div>}
    </div></div>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: STATS
// ═══════════════════════════════════════════════════════════════
function ScreenStats({bottles,tastings,embedded}) {
  const tb=bottles.reduce((s,b)=>s+(b.quantity||1),0);
  const tv=bottles.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const byC={};bottles.forEach(b=>byC[b.color]=(byC[b.color]||0)+(b.quantity||1));
  const byR={};bottles.forEach(b=>{if(b.region)byR[b.region]=(byR[b.region]||0)+(b.quantity||1);});
  const byP={};bottles.forEach(b=>(b.cepages||[]).forEach(c=>byP[c.n]=(byP[c.n]||0)+(b.quantity||1)*(c.p/100)));
  const topP=Object.entries(byP).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const clr={rouge:'#6B1E2C',blanc:'#D9B84A',rosé:'#E8A0B5',effervescent:'#E6C668',liquoreux:'#D68A1A'};
  // Computed stats
  const yr=new Date().getFullYear();
  const atPeak=bottles.filter(b=>{const pf=b.peakFrom,pt=b.peakTo;return pf&&pt&&yr>=pf&&yr<=pt&&b.quantity>0;}).length;
  const avgGuard=bottles.filter(b=>b.peakTo).length>0?Math.round(bottles.filter(b=>b.peakTo).reduce((s,b)=>s+(b.peakTo-yr),0)/bottles.filter(b=>b.peakTo).length):0;
  // Price brackets
  const priceBrackets=[{l:'0-10€',min:0,max:10},{l:'10-20€',min:10,max:20},{l:'20-50€',min:20,max:50},{l:'50-100€',min:50,max:100},{l:'100€+',min:100,max:99999}];
  const byPrice=priceBrackets.map(p=>({...p,count:bottles.filter(b=>b.price>=p.min&&b.price<p.max).reduce((s,b)=>s+(b.quantity||1),0)}));
  const maxPrice=Math.max(...byPrice.map(p=>p.count))||1;
  // Donut
  const entries=Object.entries(byC);let cum=0;const R=40,CX=64,CY=64,circ=2*Math.PI*R;
  // Maturity curve
  const yrs=Array.from({length:22},(_,i)=>yr+i-2);
  const vals=yrs.map(y=>{let v=0;bottles.forEach(b=>{const pf=b.peakFrom,pt=b.peakTo;if(!pf||!pt)return;const c=(pf+pt)/2,w=(pt-pf)/2||1;v+=(b.quantity||1)*Math.exp(-Math.pow((y-c)/w,2));});return v;});
  const mx=Math.max(...vals)||1,W=320,H=110,pd=4,xS=(W-pd*2)/(yrs.length-1);
  const pts=vals.map((v,i)=>[pd+i*xS,H-pd-(v/mx)*(H-pd-4)]);
  const peakYear=yrs[vals.indexOf(Math.max(...vals))];

  if(bottles.length===0) return <div style={{background:embedded?'transparent':'var(--cr)',minHeight:embedded?'auto':'100%',paddingBottom:embedded?20:120}}>
    {!embedded&&<PH ey="Tendances" title={<span>Ma cave,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>en chiffres</span></span>}/>}
    <div style={{padding:'60px 40px',textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>📊</div><div className="sf" style={{fontSize:20,color:'var(--is)'}}>Ajoutez des bouteilles pour voir vos statistiques</div></div>
  </div>;

  return <div style={{background:embedded?'transparent':'var(--cr)',minHeight:embedded?'auto':'100%',paddingBottom:embedded?20:120}}>
    {!embedded&&<PH ey="Tendances" title={<span>Ma cave,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>en chiffres</span></span>}/>}    <div style={{padding:'8px 20px 0'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
        {[{l:'Bouteilles',v:tb,s:`${bottles.length} réf.`},{l:'Valeur',v:tv>=1000?`${(tv/1000).toFixed(1)}k€`:`${tv}€`,s:tb>0?`${Math.round(tv/tb)}€/bout.`:'—'},{l:'Garde moy.',v:avgGuard>0?`${avgGuard} ans`:'—',s:avgGuard>0?`→ ${yr+avgGuard}`:''},{l:'À boire',v:String(atPeak),s:'Cette année',a:atPeak>0}].map(k=><div key={k.l} style={{background:k.a?'var(--bx)':'var(--sr)',color:k.a?'var(--cr)':'var(--ink)',borderRadius:22,padding:16,boxShadow:'var(--sh)'}}>
          <div className="sc" style={{color:k.a?'var(--gs)':'var(--bx)',opacity:k.a?.9:.7,fontSize:11}}>{k.l}</div>
          <div className="sf" style={{fontSize:32,fontWeight:500,lineHeight:1.1,marginTop:4}}>{k.v}</div>
          <div style={{fontSize:13,color:k.a?'var(--gs)':'var(--im)',marginTop:2}}>{k.s}</div>
        </div>)}
      </div>
      {/* Donut */}
      <SC title="Par couleur" ey="Répartition">
        <div style={{display:'flex',gap:20,alignItems:'center'}}>
          <svg width="128" height="128" viewBox="0 0 128 128">
            {entries.map(([c,ct])=>{const p=ct/tb,len=p*circ,off=-cum*circ;cum+=p;
              return <circle key={c} cx={CX} cy={CY} r={R} fill="none" stroke={clr[c]||'var(--im)'} strokeWidth="22" strokeDasharray={`${len} ${circ}`} strokeDashoffset={off} transform={`rotate(-90 ${CX} ${CY})`}/>;})}
            <text x={CX} y={CY-2} textAnchor="middle" fontSize="28" fontFamily="'Cormorant Garamond',serif" fontWeight="500" fill="var(--ink)">{tb}</text>
            <text x={CX} y={CY+14} textAnchor="middle" fontSize="8" fill="var(--im)" letterSpacing="1.5">BOUT.</text>
          </svg>
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}>
            {entries.map(([c,ct])=><div key={c} style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:10,height:10,borderRadius:5,background:clr[c]||'var(--im)'}}/>
              <span style={{fontSize:16,textTransform:'capitalize',flex:1,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c}</span>
              <span className="sf" style={{fontSize:16,color:'var(--bx)',fontWeight:600}}>{ct}</span>
            </div>)}
          </div>
        </div>
      </SC>
      {/* Price distribution */}
      <SC title="Par budget" ey="Répartition prix">
        {byPrice.map(p=><div key={p.l} style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:14}}>{p.l}</span><span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>{p.count}</span></div>
          <div style={{height:6,background:'var(--pm)',borderRadius:3}}><div style={{width:`${(p.count/maxPrice)*100}%`,height:'100%',background:'var(--g)',borderRadius:3,transition:'width .3s'}}/></div>
        </div>)}
      </SC>
      {/* Regions */}
      <SC title="Par région" ey="Géographie">
        {Object.entries(byR).sort((a,b)=>b[1]-a[1]).map(([rg,ct])=>{const mx2=Math.max(...Object.values(byR));return <div key={rg} style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{rg}</span><span className="sf" style={{fontSize:16,color:'var(--bx)',fontWeight:600}}>{ct}</span></div>
          <div style={{height:6,background:'var(--pm)',borderRadius:3}}><div style={{width:`${(ct/mx2)*100}%`,height:'100%',background:'var(--bx)',borderRadius:3}}/></div>
        </div>;})}
      </SC>
      {/* Top cepages */}
      {topP.length>0&&<SC title="Cépages dominants" ey="Assemblage global">
        {topP.map(([c,v])=>{const mx3=topP[0][1];return <div key={c} style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c}</span><span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>{Math.round(v)}</span></div>
          <div style={{height:6,background:'var(--pm)',borderRadius:3}}><div style={{width:`${(v/mx3)*100}%`,height:'100%',background:'var(--bs)',borderRadius:3}}/></div>
        </div>;})}
      </SC>}
      {/* Maturity curve */}
      <SC title="Tendance d'apogée" ey="Prévision">
        <svg width="100%" viewBox={`0 0 ${W} ${H+16}`}>
          <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--bx)" stopOpacity=".25"/><stop offset="1" stopColor="var(--bx)" stopOpacity="0"/></linearGradient></defs>
          <path d={'M '+pts.map(p=>p.join(',')).join(' L ')+` L ${pts[pts.length-1][0]},${H-pd} L ${pts[0][0]},${H-pd} Z`} fill="url(#mg)"/>
          <path d={'M '+pts.map(p=>p.join(',')).join(' L ')} fill="none" stroke="var(--bx)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          {(()=>{const ni=2,[x,y]=pts[ni];return<><line x1={x} y1="0" x2={x} y2={H-pd} stroke="var(--g)" strokeWidth=".5" strokeDasharray="2 2"/><circle cx={x} cy={y} r="3" fill="var(--g)"/></>;})()}
          {[0,5,10,15,20].map(i=><text key={i} x={pd+i*xS} y={H+10} textAnchor="middle" fontSize="9" fill="var(--im)" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">{yrs[i]}</text>)}
        </svg>
        <p style={{fontSize:15,color:'var(--is)',margin:'12px 0 0',textAlign:'center',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Pic de maturité prévu autour de {peakYear}.</p>
      </SC>
      {/* Tasting stats */}
      {tastings&&tastings.length>0&&<SC title="Dégustations" ey={`${tastings.length} bouteille${tastings.length>1?'s':''} ouvertes`}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
          <div style={{padding:'14px',borderRadius:14,background:'var(--pm)',textAlign:'center'}}>
            <div className="sf" style={{fontSize:24,fontWeight:600,color:'var(--bx)'}}>{tastings.length}</div>
            <div style={{fontSize:13,color:'var(--im)'}}>Ouvertes</div>
          </div>
          <div style={{padding:'14px',borderRadius:14,background:'var(--pm)',textAlign:'center'}}>
            <div className="sf" style={{fontSize:24,fontWeight:600,color:'var(--bx)'}}>{tastings.filter(t=>t.score_overall>0).length>0?(tastings.filter(t=>t.score_overall>0).reduce((s,t)=>s+t.score_overall,0)/tastings.filter(t=>t.score_overall>0).length).toFixed(1):'—'}</div>
            <div style={{fontSize:13,color:'var(--im)'}}>Note moy. /20</div>
          </div>
        </div>
        {tastings.slice(0,5).map(t=><div key={t.id} style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
          <div style={{width:6,height:24,borderRadius:3,background:COLORS.find(c=>c.id===t.color)?.robe||'var(--bx)',flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:500}}>{str(t.name)}</div>
            <div style={{fontSize:13,color:'var(--im)'}}>{new Date(t.tasted_at).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}{t.occasion?' · '+t.occasion:''}</div>
          </div>
          {t.score_overall>0&&<span className="sf" style={{fontSize:17,fontWeight:600,color:'var(--bx)'}}>{t.score_overall}/20</span>}
        </div>)}
      </SC>}
    </div>
  </div>;
}
// ═══════════════════════════════════════════════════════════════
// SCREEN: GUIDE — Encyclopédie interactive du vin (13 chapitres)
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// SCREEN: GUIDE — 3 familles + Accords interactifs
// ═══════════════════════════════════════════════════════════════

// --- Pairing recommendation engine ---
const PAIRING_DATA={
  'Viande rouge':{
    subs:['Grillée','En sauce','Rôtie','Tartare','Gibier'],
    colors:['rouge'],
    byIntensity:{
      light:{regions:['Beaujolais','Loire'],cepages:['Gamay','Pinot Noir','Cabernet Franc'],examples:['Fleurie','Chinon','Bourgueil']},
      medium:{regions:['Bourgogne','Rhône Nord'],cepages:['Pinot Noir','Syrah'],examples:['Gevrey-Chambertin','Crozes-Hermitage','Volnay']},
      strong:{regions:['Bordeaux','Rhône Sud','Sud-Ouest'],cepages:['Cabernet Sauvignon','Merlot','Malbec','Tannat'],examples:['Pauillac','Châteauneuf-du-Pape','Cahors','Madiran']},
    },
    tip:'La sauce guide l\'accord plus que la viande. Sauce au poivre → Syrah. Sauce bordelaise → Merlot.',
  },
  'Viande blanche':{
    subs:['Rôtie','En sauce crémée','Grillée','Farcie','Braisée'],
    colors:['blanc','rouge'],
    byIntensity:{
      light:{regions:['Loire','Alsace','Bourgogne'],cepages:['Chenin','Chardonnay','Riesling'],examples:['Vouvray sec','Chablis','Riesling']},
      medium:{regions:['Bourgogne','Rhône Nord'],cepages:['Chardonnay','Pinot Noir','Viognier'],examples:['Meursault','Volnay','Condrieu']},
      strong:{regions:['Bourgogne','Rhône'],cepages:['Chardonnay boisé','Grenache'],examples:['Puligny-Montrachet','Hermitage blanc','Lirac']},
    },
    tip:'Un poulet rôti classique aime un Bourgogne blanc (Chardonnay). Volaille à la crème → Viognier.',
  },
  'Poisson':{
    subs:['Grillé','En papillote','Fumé','Cru / Sushi','En sauce'],
    colors:['blanc','effervescent'],
    byIntensity:{
      light:{regions:['Loire','Alsace','Champagne'],cepages:['Muscadet','Sauvignon','Riesling'],examples:['Muscadet sur Lie','Sancerre','Champagne Brut']},
      medium:{regions:['Bourgogne','Loire','Alsace'],cepages:['Chardonnay','Chenin','Pinot Gris'],examples:['Chablis 1er Cru','Savennières','Pinot Gris']},
      strong:{regions:['Bourgogne','Rhône'],cepages:['Chardonnay','Marsanne','Roussanne'],examples:['Meursault','Hermitage blanc','Châteauneuf blanc']},
    },
    tip:'Poisson cru → Muscadet ou Champagne. Poisson en sauce beurre → Chardonnay. Saumon fumé → Riesling.',
  },
  'Fromage':{
    subs:['Pâte molle (Brie, Camembert)','Pâte pressée (Comté, Gruyère)','Chèvre','Bleu (Roquefort)','Affiné'],
    colors:['blanc','rouge'],
    byIntensity:{
      light:{regions:['Loire','Alsace'],cepages:['Sauvignon','Chenin','Gewurztraminer'],examples:['Sancerre','Vouvray','Gewurztraminer']},
      medium:{regions:['Bourgogne','Jura','Alsace'],cepages:['Chardonnay','Savagnin','Pinot Gris'],examples:['Arbois','Meursault','Pinot Gris VT']},
      strong:{regions:['Bordeaux','Rhône','Sud-Ouest'],cepages:['Sémillon','Grenache','Petit Manseng'],examples:['Sauternes + Roquefort','Rivesaltes','Jurançon moelleux']},
    },
    tip:'Le mythe « vin rouge + fromage » est souvent faux. Les blancs s\'accordent mieux avec la plupart des fromages.',
  },
  'Végétarien':{
    subs:['Légumes grillés','Salade composée','Risotto','Curry / Épicé','Champignons'],
    colors:['blanc','rosé','rouge'],
    byIntensity:{
      light:{regions:['Provence','Loire'],cepages:['Rolle','Sauvignon','Grenache (rosé)'],examples:['Côtes de Provence rosé','Sancerre','Muscadet']},
      medium:{regions:['Rhône','Languedoc','Bourgogne'],cepages:['Viognier','Syrah','Chardonnay'],examples:['Condrieu','Saint-Joseph','Mâcon']},
      strong:{regions:['Rhône Sud','Languedoc'],cepages:['Grenache','Syrah','Mourvèdre'],examples:['Gigondas','Pic Saint-Loup','Minervois']},
    },
    tip:'Champignons → Pinot Noir. Curry → Gewurztraminer. Risotto → Chardonnay boisé.',
  },
  'Dessert':{
    subs:['Chocolat','Fruits','Tarte / Pâtisserie','Glace','Crème'],
    colors:['liquoreux','effervescent'],
    byIntensity:{
      light:{regions:['Champagne','Loire'],cepages:['Chardonnay','Chenin'],examples:['Champagne demi-sec','Vouvray moelleux','Crémant']},
      medium:{regions:['Alsace','Loire','Bordeaux'],cepages:['Gewurztraminer','Chenin','Sémillon'],examples:['Gewurztraminer VT','Coteaux du Layon','Sainte-Croix-du-Mont']},
      strong:{regions:['Bordeaux','Sud-Ouest','Languedoc'],cepages:['Sémillon','Petit Manseng','Muscat'],examples:['Sauternes','Jurançon','Muscat de Rivesaltes','Banyuls']},
    },
    tip:'Chocolat noir → Banyuls ou Maury. Tarte aux fruits → Vouvray moelleux. Crème brûlée → Sauternes.',
  },
};

const INTENSITY_LABELS={light:'Léger & délicat',medium:'Équilibré',strong:'Puissant & corsé'};
const INTENSITY_COLORS={light:'#7EA35A',medium:'#D4880F',strong:'#6B1E2C'};

// --- Guide sub-components (compact) ---
function AromaWheelFull(){
  const F=[{n:'Fruité',c:'#C0392B',s:['Cassis','Cerise','Framboise','Pomme','Agrumes','Fruits exotiques','Fruits secs','Confiture']},{n:'Floral',c:'#E74C8B',s:['Rose','Violette','Acacia','Jasmin','Tilleul','Pivoine']},{n:'Épicé',c:'#D4880F',s:['Poivre','Cannelle','Vanille','Réglisse','Clou de girofle','Muscade']},{n:'Boisé',c:'#8B4513',s:['Chêne','Cèdre','Tabac','Café','Cacao','Grillé']},{n:'Minéral',c:'#7F8C8D',s:['Silex','Craie','Pierre à fusil','Iode','Graphite']},{n:'Végétal',c:'#27AE60',s:['Herbe','Fougère','Sous-bois','Mousse','Champignon','Truffe']},{n:'Empyreumatique',c:'#6B4226',s:['Fumée','Torréfaction','Caramel','Pain grillé','Cuir']},{n:'Animal',c:'#5D4037',s:['Cuir','Gibier','Fourrure','Musc']}];
  const n=F.length,cx=160,cy=160,R=145,r1=65,r2=95;
  return <svg viewBox="0 0 320 320" style={{width:'100%',maxWidth:280}}>
    {F.map((f,i)=>{const a1=(i/n)*Math.PI*2-Math.PI/2,a2=((i+1)/n)*Math.PI*2-Math.PI/2,mid=(a1+a2)/2;const x1i=cx+Math.cos(a1)*r1,y1i=cy+Math.sin(a1)*r1,x2i=cx+Math.cos(a2)*r1,y2i=cy+Math.sin(a2)*r1,x1o=cx+Math.cos(a1)*r2,y1o=cy+Math.sin(a1)*r2,x2o=cx+Math.cos(a2)*r2,y2o=cy+Math.sin(a2)*r2,lx=cx+Math.cos(mid)*((r1+r2)/2),ly=cy+Math.sin(mid)*((r1+r2)/2);
    return <g key={f.n}><path d={`M${x1i},${y1i} A${r1},${r1} 0 0,1 ${x2i},${y2i} L${x2o},${y2o} A${r2},${r2} 0 0,0 ${x1o},${y1o} Z`} fill={f.c} opacity=".85"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8" fontWeight="600" fontFamily="Inter">{f.n}</text>
    {f.s.map((s,j)=>{const sa1=a1+(a2-a1)*(j/f.s.length),sa2=a1+(a2-a1)*((j+1)/f.s.length),smid=(sa1+sa2)/2,sx1=cx+Math.cos(sa1)*r2,sy1=cy+Math.sin(sa1)*r2,sx2=cx+Math.cos(sa2)*r2,sy2=cy+Math.sin(sa2)*r2,sx3=cx+Math.cos(sa2)*R,sy3=cy+Math.sin(sa2)*R,sx4=cx+Math.cos(sa1)*R,sy4=cy+Math.sin(sa1)*R,slx=cx+Math.cos(smid)*((r2+R)/2),sly=cy+Math.sin(smid)*((r2+R)/2),rot=smid*180/Math.PI;
    return <g key={s}><path d={`M${sx1},${sy1} A${r2},${r2} 0 0,1 ${sx2},${sy2} L${sx3},${sy3} A${R},${R} 0 0,0 ${sx4},${sy4} Z`} fill={f.c} opacity=".55" stroke="#fff" strokeWidth=".3"/><text x={slx} y={sly} textAnchor="middle" dominantBaseline="central" fill="var(--ink)" fontSize="5.5" fontFamily="Inter" transform={`rotate(${rot>90&&rot<270?rot+180:rot},${slx},${sly})`}>{s}</text></g>})}</g>})}
    <circle cx={cx} cy={cy} r={r1-2} fill="var(--cr)"/>
    <text x={cx} y={cy-6} textAnchor="middle" fill="var(--bx)" fontSize="11" fontWeight="600" fontFamily="Cormorant Garamond">Roue des</text>
    <text x={cx} y={cy+8} textAnchor="middle" fill="var(--bx)" fontSize="11" fontWeight="600" fontFamily="Cormorant Garamond" fontStyle="italic">arômes</text>
  </svg>;
}

// Collapsible section for guide
function GS({title,children,defaultOpen}){
  const [open,setOpen]=useState(!!defaultOpen);
  return <div style={{marginBottom:10}}>
    <button onClick={()=>setOpen(!open)} style={{width:'100%',border:0,padding:'16px 18px',background:'var(--sr)',borderRadius:open?'16px 16px 0 0':'16px',boxShadow:'var(--sh)',cursor:'pointer',display:'flex',alignItems:'center',gap:10,textAlign:'left'}}>
      <span className="sf" style={{flex:1,fontSize:18,fontWeight:500}}>{title}</span>
      <span style={{fontSize:18,color:'var(--im)',transform:open?'rotate(90deg)':'none',transition:'transform .2s'}}>›</span>
    </button>
    {open&&<div style={{padding:'14px 18px',background:'var(--sr)',borderRadius:'0 0 16px 16px',borderTop:'0.5px solid var(--ln)'}}>{children}</div>}
  </div>;
}


function ScreenGuide({bottles,resetKey,onBack}) {
  const [view,setView]=useState('home');
  const [sub,setSub]=useState(null); // sub-screen inside a theme
  const [pCat,setPCat]=useState(null);
  const [pSub,setPSub]=useState(null);
  const [pInt,setPInt]=useState('medium');
  const [chatQ,setChatQ]=useState('');
  const [chatHistory,setChatHistory]=useState([]);
  const [chatLoading,setChatLoading]=useState(false);

  // Reset to home when guide tab is clicked again
  useEffect(()=>{setView('home');setSub(null);setPCat(null);},[resetKey]);

  const askSommelier=async()=>{
    if(!chatQ.trim()||chatLoading)return;
    const q=chatQ.trim();setChatQ('');
    setChatHistory(h=>[...h,{role:'user',text:q}]);
    setChatLoading(true);
    try{
      const cave=(bottles||[]).map(b=>({name:b.name,cuvee:b.cuvee,vintage:b.vintage,region:b.region,color:b.color,quantity:b.quantity,peakFrom:b.peakFrom,peakTo:b.peakTo,appellation:b.appellation}));
      const res=await fetch('/api/sommelier',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,cave})});
      const data=await res.json();
      setChatHistory(h=>[...h,{role:'sommelier',text:data.answer||data.error||'Erreur'}]);
    }catch(err){setChatHistory(h=>[...h,{role:'sommelier',text:'Erreur de connexion.'}]);}
    setChatLoading(false);
  };

  const pairingResult=useMemo(()=>{
    if(!pCat)return null;
    const d=PAIRING_DATA[pCat];if(!d)return null;
    return {colors:d.colors,regions:d.byIntensity[pInt].regions,cepages:d.byIntensity[pInt].cepages,examples:d.byIntensity[pInt].examples,tip:d.tip};
  },[pCat,pInt]);

  // --- Big themed button ---
  const TB=({icon,title,desc,gradient,onClick})=><button onClick={onClick} style={{width:'100%',border:0,borderRadius:20,background:gradient,padding:'20px',cursor:'pointer',display:'flex',alignItems:'center',gap:14,textAlign:'left',boxShadow:'0 6px 20px rgba(0,0,0,.15)',marginBottom:12}}>
    <div style={{width:48,height:48,borderRadius:16,background:'rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{typeof icon==='string'?<span style={{fontSize:24}}>{icon}</span>:icon}</div>
    <div style={{flex:1}}>
      <div style={{color:'#fff',fontSize:18,fontWeight:600,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>{title}</div>
      <div style={{color:'rgba(255,255,255,.7)',fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:3}}>{desc}</div>
    </div>
    <IcArrow sz={18} c="rgba(255,255,255,.4)"/>
  </button>;

  // --- Sub-screen header ---
  const SH=({title,ey})=><div style={{padding:'52px 20px 14px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <IB icon={<IcBack sz={18}/>} onClick={()=>{if(sub)setSub(null);else if(view!=='home')setView('home');else if(onBack)onBack();}}/>
      <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>{ey}</div>
        <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>{title}</h1></div>
    </div>
  </div>;

  // ═════════════════════════════════════
  // PAIRING TOOL
  // ═════════════════════════════════════
  if(view==='pairings') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>Accords <span style={{fontStyle:'italic',color:'var(--bx)'}}>mets & vins</span></span>} ey="Sommelier"/>
    <div style={{padding:'0 16px'}}>
      <SC title="Que mangez-vous ?" ey="Étape 1">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
          {Object.keys(PAIRING_DATA).map(cat=><button key={cat} onClick={()=>{setPCat(cat);setPSub(null);}} style={{padding:'14px 8px',border:pCat===cat?'2px solid var(--bx)':'1.5px solid var(--ln)',borderRadius:14,background:pCat===cat?'var(--pm)':'var(--cr)',cursor:'pointer',textAlign:'center'}}>
            <div style={{fontSize:22,marginBottom:4}}>{{'Viande rouge':'🥩','Viande blanche':'🍗','Poisson':'🐟','Fromage':'🧀','Végétarien':'🥗','Dessert':'🍰'}[cat]}</div>
            <div style={{fontSize:13,fontWeight:pCat===cat?600:400,color:pCat===cat?'var(--bx)':'var(--is)'}}>{cat}</div>
          </button>)}
        </div>
      </SC>
      {pCat&&<SC title="Préparation ?" ey="Étape 2">
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {PAIRING_DATA[pCat].subs.map(s=><button key={s} onClick={()=>setPSub(s)} style={{padding:'8px 14px',borderRadius:999,border:pSub===s?'2px solid var(--bx)':'1px solid var(--ln)',background:pSub===s?'var(--pm)':'var(--cr)',cursor:'pointer',fontSize:14,color:pSub===s?'var(--bx)':'var(--is)',fontWeight:pSub===s?600:400}}>{s}</button>)}
        </div>
      </SC>}
      {pCat&&<SC title="Quelle intensité ?" ey="Étape 3">
        <div style={{display:'flex',gap:8}}>
          {['light','medium','strong'].map(i=><button key={i} onClick={()=>setPInt(i)} style={{flex:1,padding:'12px 8px',border:pInt===i?'2px solid '+INTENSITY_COLORS[i]:'1.5px solid var(--ln)',borderRadius:14,background:pInt===i?INTENSITY_COLORS[i]+'15':'var(--cr)',cursor:'pointer',textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:pInt===i?600:400,color:pInt===i?INTENSITY_COLORS[i]:'var(--is)'}}>{INTENSITY_LABELS[i]}</div>
          </button>)}
        </div>
      </SC>}
      {pairingResult&&<>
        <div style={{background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',borderRadius:20,padding:18,color:'var(--cr)',marginBottom:14}}>
          <div className="sc" style={{color:'var(--gs)',opacity:.8,marginBottom:10}}>Recommandation du sommelier</div>
          <div style={{display:'flex',gap:8,marginBottom:14}}>
            {pairingResult.colors.map(c=><span key={c} style={{padding:'5px 14px',borderRadius:999,background:'rgba(245,237,224,0.15)',fontSize:14,fontWeight:500,display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:10,height:10,borderRadius:5,background:{rouge:'#6B1E2C',blanc:'#D9B84A',rosé:'#E8A0B5',effervescent:'#D4B896',liquoreux:'#D68A1A'}[c]}}/>
              {c.charAt(0).toUpperCase()+c.slice(1)}
            </span>)}
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,237,224,0.5)',marginBottom:4}}>Régions</div>
            <div style={{fontSize:16}}>{pairingResult.regions.join(' · ')}</div>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,237,224,0.5)',marginBottom:4}}>Cépages</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{pairingResult.cepages.map(c=><span key={c} style={{padding:'4px 10px',borderRadius:999,background:'rgba(245,237,224,0.1)',fontSize:13}}>{c}</span>)}</div>
          </div>
          <div>
            <div style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,237,224,0.5)',marginBottom:6}}>Bouteilles</div>
            {pairingResult.examples.map(e=><div key={e} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',background:'rgba(245,237,224,0.06)',borderRadius:10,marginBottom:4}}>
              <div style={{width:5,height:20,borderRadius:3,background:'var(--g)',flexShrink:0}}/>
              <span style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{e}</span>
            </div>)}
          </div>
        </div>
        <div style={{display:'flex',gap:10,padding:14,background:'var(--pm)',borderRadius:14,marginBottom:14}}>
          <span style={{fontSize:18}}>💡</span>
          <p style={{fontSize:15,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{pairingResult.tip}</p>
        </div>
        {(()=>{
          const caveMatches=(bottles||[]).filter(b=>{
            if(b.quantity<1)return false;
            return pairingResult.colors.includes(b.color)&&pairingResult.regions.some(r=>(b.region||'').includes(r));
          });
          if(caveMatches.length===0)return null;
          return <SC title="Dans votre cave" ey={`${caveMatches.length} accord${caveMatches.length>1?'s':''}`}>
            {caveMatches.slice(0,5).map(b=><div key={b.id} style={{display:'flex',gap:12,alignItems:'center',padding:'10px 12px',background:'var(--pm)',borderRadius:14,marginBottom:8}}>
              <div style={{width:6,height:30,borderRadius:3,background:COLORS.find(c=>c.id===b.color)?.robe||'var(--bx)',flexShrink:0}}/>
              <div style={{flex:1}}>
                <div className="sf" style={{fontSize:16,fontWeight:500}}>{str(b.name)}</div>
                <div style={{fontSize:14,color:'var(--im)'}}>{b.vintage} · {b.appellation||b.region}</div>
              </div>
              <span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>×{b.quantity}</span>
            </div>)}
          </SC>;
        })()}
      </>}
    </div>
  </div>;

  // ═════════════════════════════════════
  // SOMMELIER CHAT
  // ═════════════════════════════════════
  if(view==='sommelier') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>Demandez <span style={{fontStyle:'italic',color:'var(--bx)'}}>au sommelier</span></span>} ey="IA Sommelier"/>
    <div style={{padding:'0 16px'}}>
      {chatHistory.length===0&&<div style={{display:'flex',flexDirection:'column',gap:8,marginTop:12}}>
        <p style={{fontSize:16,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',margin:'0 0 8px'}}>Posez n'importe quelle question. Le sommelier connaît votre cave.</p>
        {['Quelle bouteille ouvrir ce soir avec un poulet rôti ?','Quelle différence entre Pomerol et Saint-Émilion ?','J\'ai 30€, quel vin offrir ?','Comment reconnaître un vin bouchonné ?','Quelles bouteilles de ma cave boire rapidement ?'].map(q=><button key={q} onClick={()=>{
          setChatHistory(h=>[...h,{role:'user',text:q}]);setChatLoading(true);
          const cave=(bottles||[]).map(b=>({name:b.name,cuvee:b.cuvee,vintage:b.vintage,region:b.region,color:b.color,quantity:b.quantity,peakFrom:b.peakFrom,peakTo:b.peakTo,appellation:b.appellation}));
          fetch('/api/sommelier',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,cave})}).then(r=>r.json()).then(data=>{setChatHistory(h=>[...h,{role:'sommelier',text:data.answer||'Erreur'}]);}).catch(()=>{setChatHistory(h=>[...h,{role:'sommelier',text:'Erreur de connexion.'}]);}).finally(()=>setChatLoading(false));
        }} style={{border:'1px solid var(--ln)',borderRadius:14,padding:'12px 16px',background:'var(--sr)',cursor:'pointer',textAlign:'left',fontSize:15,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{q}</button>)}
      </div>}
      <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:12}}>
        {chatHistory.map((msg,i)=><div key={i} style={{display:'flex',justifyContent:msg.role==='user'?'flex-end':'flex-start'}}>
          <div style={{maxWidth:'85%',padding:'12px 16px',borderRadius:msg.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px',background:msg.role==='user'?'var(--bx)':'var(--sr)',color:msg.role==='user'?'var(--cr)':'var(--ink)',fontSize:15,lineHeight:1.5,whiteSpace:'pre-wrap'}}>
            {msg.role==='sommelier'&&<div style={{fontSize:12,fontWeight:600,color:'var(--bx)',marginBottom:4}}>🍷 Sommelier</div>}
            {msg.text}
          </div>
        </div>)}
        {chatLoading&&<div style={{display:'flex',justifyContent:'flex-start'}}><div style={{padding:'12px 20px',borderRadius:'18px 18px 18px 4px',background:'var(--sr)',display:'flex',gap:4}}><span style={{width:8,height:8,borderRadius:4,background:'var(--bx)',animation:'pulse 1s infinite',opacity:.6}}/><span style={{width:8,height:8,borderRadius:4,background:'var(--bx)',animation:'pulse 1s infinite .2s',opacity:.4}}/><span style={{width:8,height:8,borderRadius:4,background:'var(--bx)',animation:'pulse 1s infinite .4s',opacity:.2}}/></div></div>}
      </div>
    </div>
    <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'min(100%,430px)',padding:'8px 12px 96px',background:'linear-gradient(transparent 0%,var(--cr) 15%)',zIndex:40}}>
      <div style={{display:'flex',gap:8}}>
        <input type="text" value={chatQ} onChange={e=>setChatQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')askSommelier();}} placeholder="Posez votre question..." disabled={chatLoading} style={{flex:1,padding:'14px 18px',border:'1px solid var(--ln)',borderRadius:999,fontSize:16,background:'var(--sr)',outline:'none',color:'var(--ink)',boxSizing:'border-box',boxShadow:'var(--sh)'}}/>
        <button onClick={askSommelier} disabled={chatLoading||!chatQ.trim()} style={{width:48,height:48,borderRadius:'50%',border:0,background:chatLoading||!chatQ.trim()?'var(--pm)':'var(--bx)',color:'var(--cr)',cursor:chatLoading?'wait':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
    <style>{`@keyframes pulse{0%,100%{opacity:.2}50%{opacity:.8}}`}</style>
  </div>;

  // ═════════════════════════════════════
  // THEMED SUB-SCREENS
  // ═════════════════════════════════════
  if(view==='decouvrir') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>Découvrir <span style={{fontStyle:'italic',color:'var(--bx)'}}>le vin</span></span>} ey="🍇 Encyclopédie"/>
    <div style={{padding:'0 16px'}}>
      <GS title="Les cépages rouges" defaultOpen>
        {[
          {n:'Cabernet Sauvignon',o:'Bordeaux (Médoc)',a:'Cassis, mûre, poivron vert, cèdre, graphite',d:'Roi des rouges. Tanins puissants qui fondent avec l\'âge. Fait pour le vieillissement. Le cassis est sa signature — plus le vin est jeune, plus il est présent. En vieillissant : cèdre, tabac, boîte à cigares. S\'assemble souvent avec du Merlot pour l\'arrondir.',g:'Médoc, Napa Valley, Australie. 15-50 ans de garde.'},
          {n:'Merlot',o:'Bordeaux (Rive droite)',a:'Prune, cerise noire, chocolat, vanille, truffe',d:'La rondeur incarnée. Fruité, charnu, accessible jeune. Les prunes et cerises dominent en jeunesse. En élevage chêne : vanille, cacao. À Pomerol et Saint-Émilion, il produit des vins parmi les plus chers du monde (Pétrus = 100% Merlot).',g:'Saint-Émilion, Pomerol, Chili. 5-30 ans.'},
          {n:'Pinot Noir',o:'Bourgogne',a:'Cerise, framboise, rose, sous-bois, champignon, fumée',d:'Le plus difficile à cultiver, le plus subtil à déguster. Sa peau fine donne des vins pâles mais d\'une complexité infinie. En jeunesse : cerise, framboise vive. En vieillissant : sous-bois, champignon, truffe, gibier. Chaque parcelle de Bourgogne donne un vin différent — c\'est la magie du terroir.',g:'Bourgogne, Oregon, Nouvelle-Zélande. 5-25 ans.'},
          {n:'Syrah / Shiraz',o:'Rhône Nord',a:'Poivre noir, violette, olive noire, lard fumé, mûre',d:'Épicé et intense. Le poivre noir est sa signature absolue — si vous sentez du poivre, pensez Syrah. La violette arrive sur les grands crus (Côte-Rôtie). Le lard fumé et l\'olive noire marquent les vins de Cornas et Hermitage. En Australie (Shiraz) : plus mûr, fruit noir, chocolat.',g:'Côte-Rôtie, Hermitage, Barossa Valley. 10-40 ans.'},
          {n:'Grenache',o:'Espagne / Rhône Sud',a:'Fraise, framboise, garrigue, thym, réglisse, poivre blanc',d:'Le cépage du soleil. Donne des vins généreux, chaleureux, à l\'alcool souvent élevé (14-15°). La garrigue (thym, romarin, lavande) est typique du Grenache méditerranéen. Cépage roi de Châteauneuf-du-Pape (assemblé avec Syrah et Mourvèdre). Seul, il peut manquer d\'acidité.',g:'Châteauneuf-du-Pape, Priorat, Sardaigne.'},
          {n:'Gamay',o:'Beaujolais',a:'Cerise, framboise, banane, pivoine, iris, poivre',d:'Fruité croquant, faible en tanins. La vinification en macération carbonique (Beaujolais Nouveau) donne des notes de banane et bonbon anglais. Les 10 crus du Beaujolais (Morgon, Moulin-à-Vent, Fleurie) montrent qu\'il peut aussi être sérieux et de garde.',g:'Beaujolais crus. 3-10 ans.'},
          {n:'Malbec',o:'Cahors / Argentine',a:'Fruits noirs, violette, cacao, réglisse, cuir',d:'Le « vin noir » de Cahors. Encre, densité, tanins fermes. L\'Argentine (Mendoza, 800-1500m d\'altitude) en a fait un cépage star mondial — plus fruité, plus souple qu\'en France. La violette est sa note florale signature.',g:'Cahors, Mendoza. 5-20 ans.'},
        ].map(c=><div key={c.n} style={{marginBottom:18,paddingBottom:18,borderBottom:'.5px solid var(--ln)'}}>
          <div style={{display:'flex',gap:10,marginBottom:6}}>
            <div style={{width:6,borderRadius:3,background:'#6B1E2C',flexShrink:0}}/>
            <div><div className="sf" style={{fontSize:18,fontWeight:600}}>{c.n}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>{c.o}</div></div>
          </div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:8}}>{c.a.split(', ').map(a=><span key={a} style={{padding:'3px 10px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:12}}>{a}</span>)}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:'0 0 4px',lineHeight:1.6}}>{c.d}</p>
          <p style={{fontSize:13,color:'var(--im)',margin:0,fontStyle:'italic'}}>{c.g}</p>
        </div>)}
      </GS>
      <GS title="Les cépages blancs">
        {[
          {n:'Chardonnay',o:'Bourgogne',a:'Pomme, beurre, noisette, brioche, citron, silex',d:'Le caméléon. À Chablis (pas de fût) : citron, craie, iode, tranchant. À Meursault (fût de chêne) : beurre, noisette, miel, gras. L\'élevage sur lies (levures mortes) lui donne cette texture crémeuse. Le cépage blanc le plus planté au monde.',g:'Chablis, Meursault, Napa, Australie.'},
          {n:'Sauvignon Blanc',o:'Loire / Bordeaux',a:'Pamplemousse, buis, herbe coupée, silex, fruits de la passion',d:'Fraîcheur et vivacité. Le buis est sa note signature en Loire. La pierre à fusil (silex) marque les Sancerre et Pouilly-Fumé. En Nouvelle-Zélande (Marlborough) : explosion de fruits exotiques, passion, mangue. Ne vieillit généralement pas longtemps.',g:'Sancerre, Pouilly-Fumé, Marlborough. 1-5 ans.'},
          {n:'Riesling',o:'Alsace / Allemagne',a:'Citron vert, pétrole, miel, fleurs blanches, silex, hydrocarbure',d:'Pureté cristalline. L\'acidité vive est sa force — elle lui permet de vieillir des décennies. La note de pétrole (hydrocarbure) apparaît après 5-10 ans et divise : certains adorent, d\'autres détestent. C\'est un signe de grand Riesling. Sec à liquoreux selon le producteur.',g:'Alsace Grand Cru, Moselle. 5-30 ans.'},
          {n:'Chenin Blanc',o:'Loire',a:'Coing, acacia, miel, pomme, cire d\'abeille, poire',d:'Le plus versatile des blancs : sec (Savennières), demi-sec (Vouvray), moelleux (Coteaux du Layon), effervescent (Crémant de Loire). Le coing est sa note emblématique. En vieillissant : cire, miel, fruits confits. Les meilleurs Chenin rivalisent avec les grands Bourgognes.',g:'Vouvray, Savennières, Afrique du Sud. 5-50 ans.'},
          {n:'Gewurztraminer',o:'Alsace',a:'Litchi, rose, épices, fruits exotiques, gingembre',d:'Le plus aromatique de tous. Son nom signifie « raisin épicé ». On le reconnaît les yeux fermés : litchi + rose = Gewurz. Robe jaune dorée, souvent légèrement sucré même en « sec ». Parfait avec la cuisine asiatique épicée — l\'un des rares blancs à tenir face au curry.',g:'Alsace, Jura. 3-15 ans.'},
          {n:'Viognier',o:'Rhône Nord',a:'Abricot, pêche, violette, amande, miel',d:'Opulent et parfumé. L\'abricot frais est sa signature. À Condrieu, il produit des blancs parmi les plus sensuels au monde. Parfois ajouté à la Syrah en Côte-Rôtie (jusqu\'à 20%) pour apporter du parfum floral. Boire jeune — il s\'oxyde assez vite.',g:'Condrieu, Languedoc. 1-5 ans.'},
        ].map(c=><div key={c.n} style={{marginBottom:18,paddingBottom:18,borderBottom:'.5px solid var(--ln)'}}>
          <div style={{display:'flex',gap:10,marginBottom:6}}>
            <div style={{width:6,borderRadius:3,background:'#D4B040',flexShrink:0}}/>
            <div><div className="sf" style={{fontSize:18,fontWeight:600}}>{c.n}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>{c.o}</div></div>
          </div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:8}}>{c.a.split(', ').map(a=><span key={a} style={{padding:'3px 10px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:12}}>{a}</span>)}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:'0 0 4px',lineHeight:1.6}}>{c.d}</p>
          <p style={{fontSize:13,color:'var(--im)',margin:0,fontStyle:'italic'}}>{c.g}</p>
        </div>)}
      </GS>
      <GS title="Comprendre le terroir">
        <p style={{fontSize:14,color:'var(--is)',margin:'0 0 14px',lineHeight:1.6}}>Le terroir, c'est l'alchimie entre le sol, le climat, l'exposition et le savoir-faire humain. Un même cépage planté sur deux sols différents donnera deux vins radicalement différents.</p>
        {[{n:'Calcaire',i:'🤍',e:'Drainage naturel, racines en profondeur. Donne de la minéralité et de l\'acidité. Les meilleurs blancs du monde poussent sur calcaire.',r:'Bourgogne, Champagne, Chablis, Loire',v:'Chablis Grand Cru : goût de craie, Champagne : bulles fines et élégantes'},
          {n:'Argile',i:'🟤',e:'Retient l\'eau. Sols frais, vignes résistantes à la sécheresse. Donne des vins ronds, généreux, avec du corps.',r:'Pomerol, Saint-Émilion, Cahors',v:'Pétrus pousse sur une bulle d\'argile bleue unique de 11 hectares'},
          {n:'Graves & galets',i:'⚪',e:'Les galets stockent la chaleur du soleil le jour et la restituent la nuit. Drainage parfait. Concentration des raisins.',r:'Médoc, Châteauneuf-du-Pape, Graves',v:'Les galets roulés de Châteauneuf chauffent les grappes par en dessous'},
          {n:'Schiste',i:'📐',e:'Roche feuilletée en profondeur. Les racines s\'infiltrent entre les couches. Vins intenses, profonds, avec une minéralité tranchante.',r:'Banyuls, Côte-Rôtie, Faugères, Priorat',v:'Les vignes de Côte-Rôtie s\'accrochent à des pentes de schiste à 60°'},
          {n:'Granite',i:'🪨',e:'Sols acides, pauvres, drainants. Finesse aromatique, floral, élégance. Les vignes souffrent et concentrent.',r:'Beaujolais (Moulin-à-Vent), Alsace, Côte-Rôtie',v:'Le granite rose de Moulin-à-Vent donne au Gamay une noblesse inattendue'},
          {n:'Silex',i:'🔥',e:'Pierre à fusil. Minéralité fumée, tensión, notes de poudre à canon. Terroirs de blancs vibrants.',r:'Sancerre, Pouilly-Fumé, Touraine',v:'Frappez deux silex : l\'odeur est exactement celle du vin'},
        ].map(s=><div key={s.n} style={{marginBottom:16,paddingBottom:16,borderBottom:'.5px solid var(--ln)'}}>
          <div style={{display:'flex',gap:10,marginBottom:6}}>
            <span style={{fontSize:22}}>{s.i}</span>
            <div><div className="sf" style={{fontSize:17,fontWeight:600}}>{s.n}</div><div style={{fontSize:13,color:'var(--im)'}}>{s.r}</div></div>
          </div>
          <p style={{fontSize:14,color:'var(--is)',margin:'0 0 6px',lineHeight:1.5}}>{s.e}</p>
          <p style={{fontSize:13,color:'var(--bx)',margin:0,fontStyle:'italic'}}>💡 {s.v}</p>
        </div>)}
      </GS>
      <GS title="Du raisin à la bouteille">
        {[{s:'✂️ Vendanges',d:'Le moment crucial. Trop tôt : acidité excessive, arômes verts. Trop tard : trop de sucre, manque de fraîcheur. Le vigneron goûte les raisins chaque jour. Vendanges manuelles = tri parcelle par parcelle. Vendanges mécaniques = plus rapide, moins précis.'},
          {s:'🫧 Éraflage & foulage',d:'On sépare les grains de la rafle (la tige). Certains vignerons gardent un pourcentage de rafles pour apporter des tanins et de la fraîcheur (vendange entière, courant en Bourgogne). Le foulage éclate les baies sans les écraser.'},
          {s:'🧪 Fermentation alcoolique',d:'Les levures (naturelles ou ajoutées) transforment le sucre en alcool + CO2. Dure 1 à 4 semaines. La température est contrôlée : froid (15-18°) pour les blancs aromatiques, chaud (25-30°) pour les rouges qui extraient couleur et tanins.'},
          {s:'🔴 Macération (rouges)',d:'Le jus reste en contact avec les peaux pendant 2 à 6 semaines. Plus longtemps = plus de couleur, tanins, structure. Les remontages (pomper le jus du bas vers le haut) et pigeages (enfoncer le chapeau de peaux) favorisent l\'extraction.'},
          {s:'🔧 Pressurage',d:'On sépare le vin du marc (peaux, pépins). Le vin de presse (extrait sous pression) est plus tannique et coloré que le vin de goutte (qui coule naturellement). Le vigneron décide combien de vin de presse incorporer.'},
          {s:'🧬 Fermentation malolactique',d:'Les bactéries transforment l\'acide malique (pomme verte) en acide lactique (crème). Adoucit le vin. Systématique en rouge, optionnelle en blanc (Chablis la bloque souvent pour garder la vivacité).'},
          {s:'🪵 Élevage',d:'Cuve inox : préserve le fruit pur. Fût de chêne neuf : apporte vanille, toast, épices, tanins. Fût usagé : texture sans arômes boisés. Amphore : micro-oxygénation naturelle, pureté. La durée va de 6 mois (Beaujolais) à 24 mois (Grand Cru classé).'},
          {s:'🎼 Assemblage',d:'Le maître de chai compose le vin final : différentes cuves, parcelles, cépages. C\'est un art — un Château Margaux assemble Cabernet Sauvignon, Merlot, Petit Verdot, Cabernet Franc dans des proportions qui changent chaque année.'},
          {s:'🍾 Mise en bouteille',d:'Filtration ou non (les vins non filtrés gardent plus de matière). Le vin continue d\'évoluer en bouteille : les tanins se fondent, les arômes se complexifient. Un Grand Cru a besoin de 10-20 ans de bouteille pour s\'exprimer pleinement.'},
        ].map(s=><div key={s.s} style={{marginBottom:14}}>
          <div className="sf" style={{fontSize:16,fontWeight:600,marginBottom:4}}>{s.s}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.6}}>{s.d}</p>
        </div>)}
      </GS>
    </div>
  </div>;

  if(view==='deguster') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>L'art de la <span style={{fontStyle:'italic',color:'var(--bx)'}}>dégustation</span></span>} ey="👃 Technique"/>
    <div style={{padding:'0 16px'}}>
      <GS title="L'Œil — analyse visuelle" defaultOpen>
        <p style={{fontSize:14,color:'var(--is)',margin:'0 0 12px',lineHeight:1.6,fontWeight:500}}>Tenez votre verre par le pied, au-dessus d'une surface blanche (nappe, feuille). Inclinez-le à 45° et observez.</p>
        {[{l:'Limpidité',d:'Le vin est-il clair ou trouble ? Un vin trouble n\'est pas forcément défectueux (vins naturels non filtrés). Mais un vin conventionnel trouble = suspect.'},
          {l:'Intensité',d:'Regardez à travers le verre. Pouvez-vous lire un texte ? Vin pâle = léger (Pinot Noir, Gamay). Vin opaque = concentré (Cahors, Syrah). L\'intensité donne un indice sur la puissance en bouche.'},
          {l:'Couleur',d:'Rouge : rubis (jeune), grenat (mature), tuilé (vieux). Blanc : vert pâle (jeune, vif), doré (mûr ou boisé), ambré (vieux ou oxydé). Le bord du disque (la lisière) est le meilleur indicateur d\'âge.'},
          {l:'Viscosité',d:'Faites tourner le verre. Les « larmes » ou « jambes » qui coulent le long sont liées à l\'alcool et au sucre. Des larmes épaisses et lentes = vin riche, alcoolisé. Des larmes fines et rapides = vin léger.'},
          {l:'Bulles',d:'Pour les effervescents : fines et persistantes = qualité (Champagne). Grosses et rapides = basique (mousseux). Le cordon (la ligne de bulles au bord du verre) doit être fin et régulier.'},
        ].map(i=><div key={i.l} style={{marginBottom:12}}>
          <div style={{fontSize:15,fontWeight:600,color:'var(--bx)',marginBottom:3}}>{i.l}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{i.d}</p>
        </div>)}
      </GS>
      <GS title="Le Nez — analyse olfactive">
        <p style={{fontSize:14,color:'var(--is)',margin:'0 0 12px',lineHeight:1.6,fontWeight:500}}>Le nez se fait en deux temps. Ne tournez pas le verre tout de suite.</p>
        {[{l:'Premier nez (sans agiter)',d:'Approchez votre nez du verre immobile. Les arômes les plus volatils s\'échappent d\'abord : notes florales, fruits frais, défauts éventuels (bouchon, réduction). Si ça sent le carton mouillé → bouchonné. Si ça sent l\'œuf → réduction (carafez).'},
          {l:'Deuxième nez (après agitation)',d:'Faites tourner le verre pour aérer le vin. Les arômes plus lourds se libèrent : épices, bois, fruits mûrs, notes animales. Plongez le nez profondément dans le verre. Inspirez doucement, bouche légèrement ouverte.'},
          {l:'Les 3 types d\'arômes',d:'Primaires = du cépage (fruits, fleurs). Secondaires = de la fermentation (brioche, beurre, levure). Tertiaires = de l\'élevage et du vieillissement (vanille, cuir, sous-bois, truffe). Un grand vin a les trois.'},
        ].map(i=><div key={i.l} style={{marginBottom:12}}>
          <div style={{fontSize:15,fontWeight:600,color:'var(--bx)',marginBottom:3}}>{i.l}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{i.d}</p>
        </div>)}
      </GS>
      <GS title="Roue des arômes — ce que chaque famille signifie">
        <div style={{display:'flex',justifyContent:'center',marginBottom:14}}><AromaWheelFull/></div>
        {[{f:'🍒 Fruité',c:'#C0392B',items:[{a:'Cassis, mûre',s:'Cabernet Sauvignon jeune, Syrah. Plus le fruit noir est intense, plus le vin est concentré.'},
            {a:'Cerise, framboise',s:'Pinot Noir, Gamay. Fruits rouges = vin plus léger et élégant.'},
            {a:'Agrumes (citron, pamplemousse)',s:'Sauvignon Blanc, Riesling. Signe d\'acidité vive et de fraîcheur.'},
            {a:'Fruits exotiques (litchi, mangue)',s:'Gewurztraminer, Viognier, Sauvignon NZ. Vins aromatiques et solaires.'},
            {a:'Fruits confits, compotés',s:'Vins mûrs ou liquoreux. Sauternes, Vendanges Tardives.'}]},
          {f:'🌹 Floral',c:'#E74C8B',items:[{a:'Rose',s:'Gewurztraminer, Nebbiolo (Barolo). Note caractéristique de ces cépages.'},
            {a:'Violette',s:'Syrah, Malbec. Souvent associée aux vins jeunes et intenses.'},
            {a:'Acacia, tilleul',s:'Chenin Blanc, Viognier. Notes délicates des grands blancs.'}]},
          {f:'🌶️ Épicé',c:'#D4880F',items:[{a:'Poivre noir',s:'Syrah — sa signature absolue. Un Hermitage sent toujours le poivre.'},
            {a:'Vanille',s:'Élevage en fût de chêne neuf. Plus le fût est neuf, plus la vanille est marquée.'},
            {a:'Réglisse',s:'Grenache, vins du Languedoc. Note de garrigue et de soleil.'},
            {a:'Cannelle, clou de girofle',s:'Élevage en chêne. Souvent dans les vins espagnols (Rioja) et les Châteauneuf.'}]},
          {f:'🪵 Boisé',c:'#8B4513',items:[{a:'Chêne, cèdre',s:'Élevage en barrique. Le cèdre est typique des grands Médocs vieillis.'},
            {a:'Café, cacao, toast',s:'Fût de chêne neuf très toasté. Fréquent en Napa Valley et Rioja Gran Reserva.'},
            {a:'Noisette, amande',s:'Chardonnay élevé sur lies. Meursault, Champagne vieux millésime.'}]},
          {f:'🪨 Minéral',c:'#7F8C8D',items:[{a:'Silex, pierre à fusil',s:'Sancerre, Pouilly-Fumé. Sols de silex = arômes de silex dans le vin.'},
            {a:'Craie, iode',s:'Chablis, Muscadet. Sols calcaires, proximité maritime.'},
            {a:'Pétrole, hydrocarbure',s:'Riesling âgé — signe de grand terroir. Divise les dégustateurs.'}]},
          {f:'🌿 Végétal',c:'#27AE60',items:[{a:'Sous-bois, champignon, truffe',s:'Pinot Noir vieux, Nebbiolo. Arômes tertiaires de grande noblesse.'},
            {a:'Garrigue (thym, romarin)',s:'Grenache, vins du sud. Le terroir méditerranéen dans le verre.'},
            {a:'Buis, herbe coupée',s:'Sauvignon Blanc jeune. Si trop marqué : possible manque de maturité.'}]},
          {f:'🐴 Animal / Empyreumatique',c:'#5D4037',items:[{a:'Cuir, gibier, musc',s:'Vins vieux (15+ ans). Mourvèdre âgé, Pinot Noir vieux. Noble et complexe.'},
            {a:'Fumée, torréfaction',s:'Syrah (fumée), élevage barrique (torréfaction). Poulsard du Jura.'},
            {a:'Lard fumé',s:'Côte-Rôtie, Cornas. Signature de la Syrah septentrionale.'}]},
        ].map(f=><div key={f.f} style={{marginBottom:16}}>
          <div className="sf" style={{fontSize:17,fontWeight:600,color:f.c,marginBottom:8}}>{f.f}</div>
          {f.items.map(i=><div key={i.a} style={{marginBottom:8,paddingLeft:12,borderLeft:`3px solid ${f.c}30`}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{i.a}</div>
            <p style={{fontSize:13,color:'var(--im)',margin:'2px 0 0',lineHeight:1.4}}>{i.s}</p>
          </div>)}
        </div>)}
      </GS>
      <GS title="La Bouche — analyse gustative">
        <p style={{fontSize:14,color:'var(--is)',margin:'0 0 12px',lineHeight:1.6,fontWeight:500}}>Prenez une petite gorgée. Faites-la circuler dans toute la bouche. Aspirez un peu d'air (le « grumage ») pour libérer les arômes rétro-nasaux.</p>
        {[{l:'L\'attaque (premières secondes)',d:'La première impression en bouche. Souple et ronde ? Vive et acide ? Sucrée ? Tannique ? L\'attaque annonce le style du vin.'},
          {l:'Le milieu de bouche',d:'Le cœur du vin se déploie. C\'est là qu\'on juge l\'équilibre entre acidité, tanins, alcool et fruit. Un grand vin est harmonieux — aucun élément ne domine.'},
          {l:'Les tanins (rouges)',d:'Sensation d\'assèchement sur les gencives et la langue. Tanins verts = raisin pas mûr. Tanins soyeux = Merlot, Pinot Noir. Tanins puissants = Cabernet, Tannat. Les tanins fondent avec le temps.'},
          {l:'L\'acidité',d:'La « colonne vertébrale » du vin. Fait saliver. Les blancs vifs (Riesling, Sancerre) ont une forte acidité. Sans acidité, le vin est mou et ennuyeux. L\'acidité permet le vieillissement.'},
          {l:'La finale (la longueur)',d:'Combien de temps le goût persiste après avoir avalé. On mesure en caudalies (1 caudalie = 1 seconde). Un vin de table : 3-4 caudalies. Un bon vin : 6-8. Un grand cru : 10-15+. La longueur est le meilleur indicateur de qualité.'},
          {l:'La rétro-olfaction',d:'Après avoir avalé, expirez par le nez. De nouveaux arômes apparaissent — souvent les plus intéressants. C\'est la « mémoire » du vin.'},
        ].map(i=><div key={i.l} style={{marginBottom:12}}>
          <div style={{fontSize:15,fontWeight:600,color:'var(--bx)',marginBottom:3}}>{i.l}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{i.d}</p>
        </div>)}
      </GS>
      <GS title="Vocabulaire du dégustateur">
        {[['Tannique','Sensation d\'assèchement. Comme mordre dans une peau de raisin ou boire du thé trop infusé. Normal pour les rouges jeunes.'],
          ['Charpenté','Costaud, riche en alcool et tanins. Comme une maison avec une structure solide. Bordeaux, Châteauneuf.'],
          ['Minéral','Notes de pierre, silex, craie. Fraîcheur profonde qui n\'est ni fruitée ni florale. Chablis, Sancerre.'],
          ['Long','Persistance en bouche. 1 caudalie = 1 seconde. Un vin « long » reste en bouche 10+ secondes. Marque de qualité.'],
          ['Rond','Souple, gras, sans aspérité. Tanins fondus, texture veloutée. Merlot, Viognier.'],
          ['Vif','Bonne acidité, nettoie le palais. Donne envie de remanger. Essentiell pour les accords mets-vins.'],
          ['Ample','Remplit toute la bouche. Sensation de volume et de richesse. Grands Bourgognes blancs.'],
          ['Austère','Fermé, peu expressif. Pas encore prêt. Souvent signe d\'un grand vin qui a besoin de temps.'],
          ['Complexe','Multiples arômes qui évoluent dans le verre et en bouche. Le contraire de \"simple\". Le Graal de la dégustation.'],
        ].map(([t,d])=><div key={t} style={{marginBottom:10}}>
          <div className="sf" style={{fontSize:16,fontWeight:600,color:'var(--bx)'}}>{t}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5}}>{d}</p>
        </div>)}
      </GS>
    </div>
  </div>;

  if(view==='choisir') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>Choisir & <span style={{fontStyle:'italic',color:'var(--bx)'}}>servir</span></span>} ey="🎯 Pratique"/>
    <div style={{padding:'0 16px'}}>
      <GS title="Lire une étiquette" defaultOpen>
        {[{l:'AOP / AOC',d:'Le plus haut niveau. Garantit l\'origine, les cépages autorisés, les rendements, les méthodes. Ex : Pauillac, Chablis, Châteauneuf-du-Pape.',c:'var(--bx)'},
          {l:'IGP',d:'Indication Géographique Protégée. Moins strict, plus de liberté sur les cépages. Bons rapports qualité-prix. Ex : Pays d\'Oc, Côtes de Gascogne.',c:'var(--g)'},
          {l:'Vin de France',d:'Pas de contrainte géographique. Peut être excellent (vins de garage, vignerons rebelles) ou basique.',c:'var(--im)'},
        ].map(a=><div key={a.l} style={{display:'flex',gap:10,marginBottom:12}}>
          <div style={{width:6,borderRadius:3,background:a.c,flexShrink:0}}/>
          <div><div className="sf" style={{fontSize:15,fontWeight:600}}>{a.l}</div>
            <p style={{fontSize:14,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5}}>{a.d}</p></div>
        </div>)}
        <div style={{marginTop:14}}>
          {[['Mis en bouteille au château/domaine','Le producteur a tout fait. Traçabilité maximale.'],
            ['Récoltant (RM en Champagne)','Cultive et vinifie lui-même. Identité forte.'],
            ['Négociant (NM en Champagne)','Achète le raisin. Pas péjoratif — Louis Jadot, Krug, Moët sont des négociants.'],
            ['Vieilles vignes','Vignes de 35-40+ ans. Rendements faibles, concentration supérieure. Pas de définition légale.'],
            ['Élevé en fût de chêne','Vanille, toast, complexité. Attention : trop de bois neuf peut masquer le fruit.'],
          ].map(([t,d])=><div key={t} style={{marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:600}}>{t}</div>
            <p style={{fontSize:13,color:'var(--im)',margin:'1px 0 0'}}>{d}</p>
          </div>)}
        </div>
      </GS>
      <GS title="Classifications françaises">
        {[{t:'Bordeaux 1855',d:'61 crus classés en 5 niveaux. Premiers Crus : Lafite, Latour, Margaux, Haut-Brion, Mouton. Inchangé depuis 170 ans (sauf Mouton en 1973).',c:'#6B1E2C'},
          {t:'Saint-Émilion',d:'Révisée tous les 10 ans. Premiers Grands Crus Classés A (Cheval Blanc, Ausone, Figeac, Pavie) et B, puis Grands Crus Classés.',c:'#8B2252'},
          {t:'Bourgogne',d:'Grand Cru (33 climats, le sommet) → 1er Cru (600+ parcelles) → Village (nom de commune) → Régionale (Bourgogne générique). Le prix peut varier de 1 à 100 entre Régionale et Grand Cru.',c:'#891A31'},
          {t:'Beaujolais',d:'10 Crus : Moulin-à-Vent (le plus puissant), Morgon (le plus terroir), Fleurie (le plus floral), Brouilly (le plus accessible).',c:'#772133'},
          {t:'Alsace',d:'51 Grands Crus. VT (Vendanges Tardives) : moelleux. SGN (Sélection de Grains Nobles) : liquoreux d\'exception, grains botrytisés un par un.',c:'#4A7030'},
        ].map(c=><div key={c.t} style={{display:'flex',gap:10,marginBottom:14}}>
          <div style={{width:6,borderRadius:3,background:c.c,flexShrink:0}}/>
          <div><div className="sf" style={{fontSize:16,fontWeight:600}}>{c.t}</div>
            <p style={{fontSize:14,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5}}>{c.d}</p></div>
        </div>)}
      </GS>
      <GS title="Températures & verres">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
          {[{l:'Effervescents',t:'6-8°C',c:'#89CFF0'},{l:'Blancs légers',t:'8-10°C',c:'#B4D7A8'},{l:'Blancs corsés',t:'10-12°C',c:'#D4B896'},{l:'Rosés',t:'8-10°C',c:'#F4B4C0'},{l:'Rouges légers',t:'14-16°C',c:'#D4848F'},{l:'Rouges corsés',t:'16-18°C',c:'#8B3545'}].map(t=><div key={t.l} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
            <div style={{width:10,height:10,borderRadius:5,background:t.c}}/>
            <div><div style={{fontSize:13,color:'var(--im)'}}>{t.l}</div><div className="sf" style={{fontSize:16,fontWeight:500}}>{t.t}</div></div>
          </div>)}
        </div>
        <div className="sf" style={{fontSize:16,fontWeight:600,marginBottom:8}}>Les verres</div>
        {[{v:'Bordeaux (tulipe haute)',d:'Concentre les arômes des vins tanniques. Pour Cabernet, Merlot, Syrah.'},
          {v:'Bourgogne (ballon)',d:'Large ouverture, le Pinot Noir et le Chardonnay ont besoin d\'espace.'},
          {v:'Flûte à champagne',d:'Préserve les bulles et la fraîcheur. Mais un verre plus large révèle mieux les arômes.'},
          {v:'Verre INAO',d:'Le verre universel de dégustation pro. Parfait pour comparer.'},
        ].map(g=><div key={g.v} style={{marginBottom:8}}>
          <div style={{fontSize:14,fontWeight:600}}>{g.v}</div>
          <p style={{fontSize:13,color:'var(--im)',margin:'1px 0 0'}}>{g.d}</p>
        </div>)}
        <p style={{fontSize:14,color:'var(--is)',margin:'12px 0 0',lineHeight:1.5}}>Ordre de service : Bulles → blancs secs → blancs corsés → rosés → rouges légers → rouges puissants → liquoreux.</p>
      </GS>
      <GS title="Budget — que trouver à chaque prix">
        {[{p:'5-8€',d:'Côtes du Rhône, Languedoc (Corbières, Minervois), IGP Pays d\'Oc, Beaujolais villages. Plaisir quotidien.',c:'#27ae60'},
          {p:'10-15€',d:'Crozes-Hermitage, Chinon, Pic Saint-Loup, Bourgogne régional, Alsace Riesling. Le sweet spot.',c:'#D4880F'},
          {p:'20-35€',d:'Crus du Beaujolais, Saint-Émilion, Gigondas, Chablis 1er Cru, Savennières. Vins de garde.',c:'#8B4513'},
          {p:'50-100€',d:'Pauillac, Hermitage, Meursault, Châteauneuf top cuvées. Expériences marquantes.',c:'#6B1E2C'},
          {p:'100€+',d:'Premiers Crus 1855, DRC, Pétrus, Dom Pérignon. La rareté fait le prix.',c:'#3A0F18'},
        ].map(b=><div key={b.p} style={{display:'flex',gap:12,marginBottom:14}}>
          <div style={{minWidth:55}}><div className="sf" style={{fontSize:18,fontWeight:600,color:b.c}}>{b.p}</div></div>
          <div style={{flex:1,paddingLeft:10,borderLeft:`2px solid ${b.c}`}}>
            <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{b.d}</p>
          </div>
        </div>)}
      </GS>
      <GS title="Les grands millésimes">
        {[{r:'Bordeaux',m:'2022★★★ 2020★★★ 2019★★★ 2018★★★ 2016★★★ 2015★★★ 2010★★★ 2009★★★ 2005★★★',c:'#6B1E2C'},
          {r:'Bourgogne',m:'2020★★★ 2019★★★ 2018★★ 2017★★ 2015★★★ 2010★★★ 2005★★★',c:'#891A31'},
          {r:'Rhône',m:'2020★★★ 2019★★★ 2017★★★ 2016★★★ 2015★★★ 2010★★★ 2009★★★',c:'#5A1020'},
          {r:'Champagne',m:'2019★★★ 2016★★★ 2012★★★ 2008★★★ 2002★★★',c:'#C8A96A'},
        ].map(r=><div key={r.r} style={{marginBottom:12}}>
          <div className="sf" style={{fontSize:16,fontWeight:600,display:'flex',alignItems:'center',gap:6}}><div style={{width:8,height:8,borderRadius:4,background:r.c}}/>{r.r}</div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:4}}>
            {r.m.split(' ').map(m=>{const [y,s]=m.split('★★★').length>1?[m.replace('★★★',''),'★★★']:m.split('★★').length>1?[m.replace('★★',''),'★★']:[m.replace('★',''),'★'];
              return <span key={m} style={{padding:'3px 8px',borderRadius:8,background:s==='★★★'?r.c+'18':'var(--pm)',fontSize:13,border:s==='★★★'?`1px solid ${r.c}30`:'.5px solid var(--ln)'}}>
                <span style={{fontWeight:600}}>{y}</span> <span style={{fontSize:10}}>{s}</span>
              </span>;})}
          </div>
        </div>)}
      </GS>
    </div>
  </div>;

  if(view==='approfondir') return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <SH title={<span>Aller <span style={{fontStyle:'italic',color:'var(--bx)'}}>plus loin</span></span>} ey="🔬 Expert"/>
    <div style={{padding:'0 16px'}}>
      <GS title="Les défauts du vin" defaultOpen>
        {[{n:'🔴 Bouchonné (TCA)',d:'Odeur de carton mouillé, cave humide. Molécule TCA dans le liège. 3-5% des bouteilles. Irréversible. Renvoyez-le au restaurant sans hésiter.'},
          {n:'🟠 Oxydé',d:'Couleur brune, odeur de pomme blette. Trop exposé à l\'air. Blanc → madérisé. Rouge → tuilé prématurément.'},
          {n:'🟡 Réduit',d:'Odeur d\'œuf, d\'allumette. Souvent temporaire : carafez 30 min. Si ça persiste, le vin est défectueux.'},
          {n:'⚪ Volatile (piqûre)',d:'Odeur de vinaigre. Acidité acétique excessive. Léger = acceptable (vins naturels). Fort = défaut.'},
          {n:'🟢 Brett',d:'Odeur d\'écurie, sueur, pansement. Levure Brettanomyces. Léger = \"typicité\" (débat). Fort = défaut.'},
        ].map(d=><div key={d.n} style={{marginBottom:14}}>
          <div className="sf" style={{fontSize:16,fontWeight:600}}>{d.n}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:'3px 0 0',lineHeight:1.5}}>{d.d}</p>
        </div>)}
      </GS>
      <GS title="Conservation">
        {[['🌡️ Température','12-14°C constant. Les variations tuent le vin — un garage qui passe de 5° à 30° est pire qu\'une pièce à 18° stable.'],
          ['💧 Humidité','70-75%. Trop sec : bouchon sèche, air entre. Trop humide : étiquettes perdues (pas grave pour le vin).'],
          ['🔦 Lumière','Obscurité totale. Les UV dégradent les arômes. Les bouteilles teintées protègent partiellement.'],
          ['📐 Position','Couché pour le liège. Capsule à vis : debout OK.'],
          ['⏰ Durée','90% des vins se boivent dans les 2-3 ans. Seuls les grands crus gagnent à vieillir 10-30 ans.'],
        ].map(([t,d])=><div key={t} style={{marginBottom:10}}>
          <div style={{fontSize:15,fontWeight:600}}>{t}</div>
          <p style={{fontSize:14,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5}}>{d}</p>
        </div>)}
      </GS>
      <GS title="Carafer ou décanter ?">
        {[['Carafer (aérer)','Pour les vins jeunes. La carafe large expose le vin à l\'air. 30 min pour un blanc, 1-2h pour un rouge puissant.'],
          ['Décanter (séparer)','Pour les vins vieux avec dépôt. Verser doucement, laisser le dépôt dans la bouteille. Ne pas aérer longtemps.'],
          ['Ni l\'un ni l\'autre','Vieux Bourgognes, vins fragiles. Ouvrir 30 min avant et servir de la bouteille.'],
        ].map(([t,d])=><div key={t} style={{marginBottom:10}}>
          <div style={{fontSize:14,fontWeight:600}}>{t}</div>
          <p style={{fontSize:13,color:'var(--im)',margin:'1px 0 0',lineHeight:1.5}}>{d}</p>
        </div>)}
      </GS>
      <GS title="Vins du monde">
        {[{p:'🇮🇹 Italie',r:['Toscane — Chianti (Sangiovese), Brunello, Super Toscans (Sassicaia)','Piémont — Barolo, Barbaresco (Nebbiolo : rose, goudron, truffe)','Vénétie — Amarone (raisins séchés, 16°), Prosecco, Soave'],s:'3e producteur mondial. DOCG = le meilleur.'},
          {p:'🇪🇸 Espagne',r:['Rioja — Tempranillo vieilli en barrique (Crianza, Reserva, Gran Reserva)','Priorat — Grenache + Carignan sur schiste, vins de montagne','Ribera del Duero — Tempranillo puissant (Vega Sicilia)'],s:'Rapport qualité-prix imbattable.'},
          {p:'🇺🇸 USA',r:['Napa Valley — Cabernet Sauvignon opulent, puissant, boisé','Oregon — Pinot Noir style bourguignon','Sonoma — Chardonnay, Zinfandel'],s:'Vins puissants et mûrs.'},
          {p:'🇦🇷 Argentine',r:['Mendoza — Malbec à 800-1500m, violette et fruit noir','Uco Valley — Malbec fin et frais (altitude)'],s:'Le Malbec argentin = référence mondiale.'},
          {p:'🇳🇿 Nouvelle-Zélande',r:['Marlborough — Sauvignon Blanc (passion, buis, pamplemousse)','Central Otago — Pinot Noir austral'],s:'Pureté aromatique unique.'},
        ].map(w=><div key={w.p} style={{marginBottom:16}}>
          <div className="sf" style={{fontSize:17,fontWeight:600}}>{w.p}</div>
          <p style={{fontSize:13,color:'var(--bx)',margin:'2px 0 6px',fontWeight:500}}>{w.s}</p>
          {w.r.map(r=><p key={r} style={{fontSize:14,color:'var(--is)',margin:'0 0 4px',lineHeight:1.4}}>• {r}</p>)}
        </div>)}
      </GS>
      <GS title="Bio, nature & biodynamie">
        {[{l:'🌱 Bio (AB)',d:'Pas de pesticides chimiques. Soufre limité. Certifié Ecocert. Le minimum responsable.',c:'#27ae60'},
          {l:'🌙 Biodynamie',d:'Calendrier lunaire, bouse de corne, silice. Labels : Demeter, Biodyvin. Résultats souvent bluffants.',c:'#3A6040'},
          {l:'🍇 Vin Nature',d:'Zéro soufre ajouté, levures indigènes. Imprévisible mais passionnant. Pas de charte officielle.',c:'#8B4513'},
          {l:'🏅 HVE',d:'Label gouvernemental Haute Valeur Environnementale. Niveau 3 = le plus exigeant.',c:'#2B7050'},
        ].map(l=><div key={l.l} style={{display:'flex',gap:10,marginBottom:12}}>
          <div style={{width:6,borderRadius:3,background:l.c,flexShrink:0}}/>
          <div><div style={{fontSize:15,fontWeight:600}}>{l.l}</div>
            <p style={{fontSize:14,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5}}>{l.d}</p></div>
        </div>)}
      </GS>
      <GS title="Quantités à prévoir">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[{l:'Apéro',v:'1 bout. / 6 pers.',i:'🥂'},{l:'Repas',v:'1 bout. / 3 pers.',i:'🍽️'},{l:'Soirée',v:'1 bout. / 2 pers.',i:'🎉'},{l:'Dégustation',v:'1 bout. / 8 pers.',i:'🍷'}].map(q=><div key={q.l} style={{padding:'12px',borderRadius:14,background:'var(--pm)',textAlign:'center'}}>
            <div style={{fontSize:20}}>{q.i}</div>
            <div className="sf" style={{fontSize:16,fontWeight:600,marginTop:4}}>{q.v}</div>
            <div style={{fontSize:12,color:'var(--im)'}}>{q.l}</div>
          </div>)}
        </div>
      </GS>
    </div>
  </div>;

  // ═════════════════════════════════════
  // GUIDE HOME
  // ═════════════════════════════════════
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {onBack?<div style={{padding:'52px 20px 14px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack}/>
        <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>Apprendre</div>
          <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>Guide du <span style={{fontStyle:'italic',color:'var(--bx)'}}>vin</span></h1></div>
      </div>
    </div>:<PH ey="Apprendre" title={<span>Guide du<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>vin</span></span>}/>}
    <div style={{padding:'8px 16px 0'}}>
      <TB icon={<IcFork sz={24} c="#fff"/>} title="Accords mets & vins" desc="Trouvez le vin parfait pour votre plat" gradient="linear-gradient(140deg,#6B1E2C,#3A0F18)" onClick={()=>setView('pairings')}/>
      <TB icon={<IcWineGlass sz={24} c="#fff"/>} title="Sommelier IA" desc="Posez toutes vos questions sur le vin" gradient="linear-gradient(140deg,#2B4570,#0F1A30)" onClick={()=>setView('sommelier')}/>
      <TB icon={<IcGrape sz={24} c="#fff"/>} title="Découvrir le vin" desc="Cépages, terroirs, vinification" gradient="linear-gradient(140deg,#5A3040,#2A1020)" onClick={()=>setView('decouvrir')}/>
      <TB icon={<IcSearch sz={24} c="#fff"/>} title="L'art de la dégustation" desc="Œil, nez, bouche — la méthode complète" gradient="linear-gradient(140deg,#4A3060,#1A1030)" onClick={()=>setView('deguster')}/>
      <TB icon={<IcSettings sz={24} c="#fff"/>} title="Choisir & servir" desc="Étiquettes, verres, budget, millésimes" gradient="linear-gradient(140deg,#3A5040,#1A2820)" onClick={()=>setView('choisir')}/>
      <TB icon={<IcBook sz={24} c="#fff"/>} title="Aller plus loin" desc="Défauts, conservation, vins du monde" gradient="linear-gradient(140deg,#504030,#282010)" onClick={()=>setView('approfondir')}/>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: PLACES — Cavistes & bars à vin autour de moi
// ═══════════════════════════════════════════════════════════════
function ScreenPlaces({user,onBack}) {
  const [places,setPlaces]=useState([]);
  const [loading,setLoading]=useState(true);
  const [selPlace,setSelPlace]=useState(null);
  const [reviews,setReviews]=useState([]);
  const [picks,setPicks]=useState([]);
  const [myReview,setMyReview]=useState({rating:4,comment:''});
  const [showReviewForm,setShowReviewForm]=useState(false);
  const [showAddPlace,setShowAddPlace]=useState(false);
  const [editingPlace,setEditingPlace]=useState(null); // null = add, object = edit
  const [addForm,setAddForm]=useState({name:'',type:'caviste',address:'',city:'',description:'',phone:'',website:'',photo_url:'',specialties:''});
  const [addHours,setAddHours]=useState({lun:'',mar:'',mer:'',jeu:'',ven:'',sam:'',dim:''});
  const [submitting,setSubmitting]=useState(false);
  const [filter,setFilter]=useState('tous');
  const [userLoc,setUserLoc]=useState(null);
  const mapRef=React.useRef(null);
  const mapInstance=React.useRef(null);
  const markersRef=React.useRef([]);
  const typeLabels={caviste:'Caviste',bar:'Bar à vin',domaine:'Domaine',restaurant:'Restaurant'};

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        pos=>{setUserLoc({lat:pos.coords.latitude,lng:pos.coords.longitude});
          fetchNearbyPlaces(pos.coords.latitude,pos.coords.longitude,30).then(({data})=>{setPlaces(data||[]);setLoading(false);});},
        ()=>{fetchAllPlaces().then(({data})=>{setPlaces(data||[]);setLoading(false);});},
        {enableHighAccuracy:false,timeout:5000}
      );
    }else{fetchAllPlaces().then(({data})=>{setPlaces(data||[]);setLoading(false);});}
  },[]);

  useEffect(()=>{
    if(!mapRef.current||mapInstance.current||loading)return;
    import('leaflet').then(L=>{
      if(!document.getElementById('leaflet-css')){const lk=document.createElement('link');lk.id='leaflet-css';lk.rel='stylesheet';lk.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(lk);}
      const center=userLoc?[userLoc.lat,userLoc.lng]:[48.8566,2.3522];
      const map=L.map(mapRef.current,{center,zoom:13,zoomControl:false,attributionControl:false});
      L.control.zoom({position:'bottomright'}).addTo(map);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:18,minZoom:5}).addTo(map);
      if(userLoc)L.circleMarker([userLoc.lat,userLoc.lng],{radius:8,fillColor:'#4A90D9',color:'#fff',weight:3,fillOpacity:1}).addTo(map);
      mapInstance.current=map;
    });
    return()=>{if(mapInstance.current){mapInstance.current.remove();mapInstance.current=null;}};
  },[loading]);

  useEffect(()=>{
    if(!mapInstance.current)return;
    import('leaflet').then(L=>{
      markersRef.current.forEach(m=>m.remove());markersRef.current=[];
      const tc={caviste:'#6B1E2C',bar:'#C8A96A',domaine:'#27ae60',restaurant:'#D4880F'};
      const ti={caviste:'🍷',bar:'🍸',domaine:'🏛️',restaurant:'🍽️'};
      const vis=filter==='tous'?places:places.filter(p=>p.type===filter);
      vis.forEach(p=>{
        if(!p.lat||!p.lng)return;
        const m=L.circleMarker([p.lat,p.lng],{radius:10,fillColor:tc[p.type]||'#6B1E2C',color:'#fff',weight:2.5,fillOpacity:0.85}).addTo(mapInstance.current);
        m.bindTooltip(`${ti[p.type]||''} ${p.name}`,{direction:'top',offset:[0,-12],className:'app-tooltip'});
        m.on('click',()=>openPlace(p));
        markersRef.current.push(m);
      });
    });
  },[places,filter]);

  const openAddForm=(place)=>{
    if(place){
      setEditingPlace(place);
      setAddForm({name:place.name,type:place.type,address:place.address||'',city:place.city||'',description:place.description||'',phone:place.phone||'',website:place.website||'',photo_url:place.photo_url||'',specialties:(place.specialties||[]).join(', ')});
      // Parse hours string back to structured
      const h={lun:'',mar:'',mer:'',jeu:'',ven:'',sam:'',dim:''};
      if(place.hours){const parts=place.hours.split(/[,;]/);parts.forEach(p=>{const t=p.trim().toLowerCase();for(const d of Object.keys(h)){if(t.startsWith(d))h[d]=t.replace(/^[a-z]+\s*:?\s*/i,'');}});}
      setAddHours(h);
    }else{
      setEditingPlace(null);
      setAddForm({name:'',type:'caviste',address:'',city:'',description:'',phone:'',website:'',photo_url:'',specialties:''});
      setAddHours({lun:'',mar:'',mer:'',jeu:'',ven:'',sam:'',dim:''});
    }
    setShowAddPlace(true);
  };

  const submitPlace=async()=>{
    if(!user||!addForm.name.trim())return;
    setSubmitting(true);
    const specs=addForm.specialties?addForm.specialties.split(',').map(s=>s.trim()).filter(Boolean):[];
    // Build hours string from structured data
    const dayNames={lun:'Lun',mar:'Mar',mer:'Mer',jeu:'Jeu',ven:'Ven',sam:'Sam',dim:'Dim'};
    const hoursStr=Object.entries(addHours).filter(([,v])=>v.trim()).map(([d,v])=>`${dayNames[d]}: ${v.trim()}`).join(', ')||'';
    // Geocode address via Nominatim (free)
    let lat=editingPlace?.lat||userLoc?.lat||48.85;
    let lng=editingPlace?.lng||userLoc?.lng||2.35;
    const addr=`${addForm.address} ${addForm.city}`.trim();
    if(addr.length>3){
      try{
        const geo=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1`).then(r=>r.json());
        if(geo.length>0){lat=parseFloat(geo[0].lat);lng=parseFloat(geo[0].lon);}
      }catch(e){}
    }
    const placeData={...addForm,specialties:specs,hours:hoursStr,lat,lng};
    if(editingPlace){
      await updatePlace(editingPlace.id,placeData);
    }else{
      await addPlace(user.id,placeData);
    }
    if(userLoc)fetchNearbyPlaces(userLoc.lat,userLoc.lng,30).then(({data})=>setPlaces(data||[]));
    else fetchAllPlaces().then(({data})=>setPlaces(data||[]));
    setShowAddPlace(false);setSubmitting(false);setEditingPlace(null);
  };

  const openPlace=async(p)=>{setSelPlace(p);fetchPlaceReviews(p.id).then(({data})=>setReviews(data||[]));fetchPlacePicks(p.id).then(({data})=>setPicks(data||[]));};
  const submitReview=async()=>{if(!user||!selPlace)return;await addPlaceReview(user.id,selPlace.id,myReview.rating,myReview.comment);fetchPlaceReviews(selPlace.id).then(({data})=>setReviews(data||[]));setShowReviewForm(false);setMyReview({rating:4,comment:''});};
  const avgRating=reviews.length>0?Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length*10)/10:null;

  if(selPlace) return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {/* Hero header */}
    <div style={{position:'relative',padding:'52px 20px 20px',background:`linear-gradient(160deg, ${({caviste:'#6B1E2C',bar:'#2C1A0E',domaine:'#1A3A1A',restaurant:'#3A2A0E'})[selPlace.type]||'#3A0F18'} 0%, var(--pm) 100%)`}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
        <IB icon={<IcBack sz={18} c="var(--cr)"/>} onClick={()=>setSelPlace(null)} style={{background:'rgba(255,255,255,.12)'}}/>
        <div style={{flex:1}}/>
        {user&&selPlace.created_by===user.id&&<button onClick={()=>{setSelPlace(null);openAddForm(selPlace);}} style={{padding:'6px 12px',borderRadius:999,border:'1px solid rgba(255,255,255,.2)',background:'transparent',color:'var(--cr)',fontSize:12,cursor:'pointer'}}>Modifier</button>}
      </div>
      <div style={{display:'flex',alignItems:'flex-end',gap:16}}>
        <div style={{width:60,height:60,borderRadius:18,background:'rgba(255,255,255,.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,flexShrink:0}}>
          {{caviste:'🍷',bar:'🍸',domaine:'🏛️',restaurant:'🍽️'}[selPlace.type]}
        </div>
        <div style={{flex:1,minWidth:0,color:'var(--cr)'}}>
          <div className="sc" style={{fontSize:10,opacity:.6,marginBottom:4}}>{typeLabels[selPlace.type]||'Lieu'}</div>
          <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:600,lineHeight:1.15}}>{selPlace.name}</h1>
        </div>
        {avgRating&&<div style={{textAlign:'center',background:'rgba(255,255,255,.1)',padding:'10px 14px',borderRadius:14,flexShrink:0}}>
          <div className="sf" style={{fontSize:26,fontWeight:600,color:'var(--gs)',lineHeight:1}}>{avgRating}</div>
          <div style={{display:'flex',gap:1,justifyContent:'center',marginTop:3}}>{[1,2,3,4,5].map(v=><span key={v} style={{fontSize:10,color:v<=Math.round(avgRating)?'var(--gs)':'rgba(255,255,255,.2)'}}>★</span>)}</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)',marginTop:2}}>{reviews.length} avis</div>
        </div>}
      </div>
    </div>
    <div style={{padding:'0 16px'}}>
      {/* Description */}
      {selPlace.description&&<div style={{padding:'16px 18px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)',marginTop:-10,marginBottom:14,position:'relative',zIndex:1}}>
        <p style={{fontSize:16,margin:0,lineHeight:1.6,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)'}}>{selPlace.description}</p>
      </div>}
      {/* Info cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
        {selPlace.address&&<div style={{padding:'12px 14px',borderRadius:14,background:'var(--sr)',boxShadow:'var(--sh)'}}>
          <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:4}}>📍 Adresse</div>
          <div style={{fontSize:14,color:'var(--ink)',lineHeight:1.4}}>{selPlace.address}{selPlace.city?', '+selPlace.city:''}</div>
        </div>}
        {selPlace.phone&&<a href={`tel:${selPlace.phone}`} style={{padding:'12px 14px',borderRadius:14,background:'var(--sr)',boxShadow:'var(--sh)',textDecoration:'none'}}>
          <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:4}}>📞 Téléphone</div>
          <div style={{fontSize:14,color:'var(--bx)',fontWeight:500}}>{selPlace.phone}</div>
        </a>}
      </div>
      {/* Hours */}
      {selPlace.hours&&<div style={{padding:'14px 16px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)',marginBottom:14}}>
        <div className="sc" style={{fontSize:10,color:'var(--im)',marginBottom:8}}>🕐 Horaires</div>
        <div style={{display:'grid',gridTemplateColumns:'50px 1fr',gap:'4px 10px'}}>
          {selPlace.hours.split(/[,;]/).filter(Boolean).map((h,i)=>{
            const parts=h.trim().split(/:\s*/,2);
            return<React.Fragment key={i}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>{parts[0]}</span>
              <span style={{fontSize:14,color:'var(--is)'}}>{parts[1]||parts[0]}</span>
            </React.Fragment>;
          })}
        </div>
      </div>}
      {/* Specialties */}
      {(selPlace.specialties||[]).length>0&&<div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
        {selPlace.specialties.map(s=><span key={s} style={{padding:'6px 14px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:13,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{s}</span>)}
      </div>}
      {/* Photo */}
      {selPlace.photo_url&&<div style={{marginBottom:14,borderRadius:16,overflow:'hidden',boxShadow:'var(--sh)'}}>
        <img src={selPlace.photo_url} alt={selPlace.name} style={{width:'100%',height:180,objectFit:'cover',display:'block'}}/>
      </div>}
      {/* Coups de cœur */}
      {picks.length>0&&<SC title="Coups de cœur" ey={`${picks.length} vin${picks.length>1?'s':''} recommandé${picks.length>1?'s':''}`}>
        {picks.map(p=><div key={p.id} style={{display:'flex',gap:12,alignItems:'center',padding:'12px 14px',background:'var(--pm)',borderRadius:14,marginBottom:8,border:'.5px solid var(--ln)'}}>
          <div style={{width:6,height:34,borderRadius:3,background:COLORS.find(c=>c.id===p.wine_color)?.robe||'var(--bx)',flexShrink:0}}/>
          <div style={{flex:1}}>
            <div className="sf" style={{fontSize:16,fontWeight:600}}>{p.wine_name}</div>
            <div style={{fontSize:13,color:'var(--im)'}}>{p.wine_region}{p.wine_price?' · '+p.wine_price+'€':''}</div>
            {p.comment&&<p style={{fontSize:13,color:'var(--is)',margin:'4px 0 0',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>« {p.comment} »</p>}
          </div>
        </div>)}
      </SC>}
      {/* Avis */}
      <SC title="Avis" ey={`${reviews.length} avis d'utilisateurs`}>
        {reviews.length===0&&<p style={{fontSize:15,color:'var(--im)',textAlign:'center',padding:'16px 0',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Aucun avis encore. Soyez le premier !</p>}
        {reviews.map(r=><div key={r.id} style={{padding:'14px',background:'var(--pm)',borderRadius:14,marginBottom:10}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <div style={{width:32,height:32,borderRadius:16,background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:600}}>{(r.profiles?.name||'?')[0].toUpperCase()}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{r.profiles?.name||'Anonyme'}</div>
              <div style={{display:'flex',gap:1}}>{[1,2,3,4,5].map(v=><span key={v} style={{fontSize:12,color:v<=r.rating?'var(--gs)':'var(--ln)'}}>★</span>)}</div>
            </div>
            <div style={{fontSize:12,color:'var(--im)'}}>{new Date(r.created_at).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</div>
          </div>
          {r.comment&&<p style={{fontSize:15,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>« {r.comment} »</p>}
        </div>)}
        {!showReviewForm?<button onClick={()=>setShowReviewForm(true)} style={{width:'100%',padding:'14px',border:'1.5px dashed var(--ln)',borderRadius:14,background:'transparent',color:'var(--bx)',fontSize:15,fontWeight:500,cursor:'pointer',marginTop:4}}>✍️ Donner mon avis</button>
        :<div style={{padding:16,background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)',marginTop:8}}>
          <div style={{fontSize:14,fontWeight:500,marginBottom:8}}>Votre note</div>
          <div style={{display:'flex',gap:6,marginBottom:12}}>
            {[1,2,3,4,5].map(v=><button key={v} onClick={()=>setMyReview(r=>({...r,rating:v}))} style={{fontSize:28,border:0,background:'transparent',cursor:'pointer',color:v<=myReview.rating?'var(--gs)':'var(--ln)',transition:'color .15s'}}>★</button>)}
          </div>
          <textarea value={myReview.comment} onChange={e=>setMyReview(r=>({...r,comment:e.target.value}))} placeholder="Votre avis sur cet établissement..." rows={3} style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:15,background:'var(--cr)',outline:'none',color:'var(--ink)',resize:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:10}}/>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setShowReviewForm(false)} style={{flex:1,padding:'12px',border:'1px solid var(--ln)',borderRadius:12,background:'var(--cr)',fontSize:14,cursor:'pointer',color:'var(--is)'}}>Annuler</button>
            <button onClick={submitReview} style={{flex:1,padding:'12px',border:0,borderRadius:12,background:'var(--bx)',color:'var(--cr)',fontSize:14,fontWeight:600,cursor:'pointer'}}>Publier</button>
          </div>
        </div>}
      </SC>
    </div>
  </div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'52px 20px 14px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack}/>
        <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>Explorer</div>
          <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>Autour <span style={{fontStyle:'italic',color:'var(--bx)'}}>de moi</span></h1></div>
        <button onClick={()=>openAddForm(null)} style={{padding:'8px 14px',borderRadius:999,border:0,background:'var(--bx)',color:'var(--cr)',fontSize:13,fontWeight:600,cursor:'pointer'}}>+ Lieu</button>
      </div>
    </div>
    <div style={{padding:'0 16px'}}>
      <div ref={mapRef} style={{width:'100%',height:260,borderRadius:16,overflow:'hidden',border:'1px solid var(--ln)',filter:'sepia(15%) saturate(90%) brightness(102%)',marginBottom:12}}/>
      <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto'}}>
        {[{id:'tous',l:'Tous'},{id:'caviste',l:'🍷 Cavistes'},{id:'bar',l:'🍸 Bars'},{id:'domaine',l:'🏛️ Domaines'},{id:'restaurant',l:'🍽️ Restos'}].map(t=><button key={t.id} onClick={()=>setFilter(t.id)} style={{padding:'8px 14px',borderRadius:999,border:0,fontSize:14,fontWeight:filter===t.id?600:400,cursor:'pointer',whiteSpace:'nowrap',background:filter===t.id?'var(--bx)':'var(--pm)',color:filter===t.id?'var(--cr)':'var(--is)'}}>{t.l}</button>)}
      </div>
      {loading?<div style={{textAlign:'center',padding:'32px',color:'var(--im)'}}>Recherche autour de vous...</div>:
      (filter==='tous'?places:places.filter(p=>p.type===filter)).map(p=><div key={p.id} onClick={()=>openPlace(p)} style={{display:'flex',gap:14,alignItems:'center',padding:'14px 16px',background:'var(--sr)',borderRadius:18,boxShadow:'var(--sh)',cursor:'pointer',marginBottom:10}}>
        <div style={{width:44,height:44,borderRadius:14,background:{caviste:'#6B1E2C15',bar:'#C8A96A15',domaine:'#27ae6015',restaurant:'#D4880F15'}[p.type],display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
          {{caviste:'🍷',bar:'🍸',domaine:'🏛️',restaurant:'🍽️'}[p.type]}
        </div>
        <div style={{flex:1}}>
          <div className="sf" style={{fontSize:17,fontWeight:600}}>{p.name}</div>
          <div style={{fontSize:13,color:'var(--im)'}}>{p.address||p.city||typeLabels[p.type]}</div>
          {(p.specialties||[]).length>0&&<div style={{display:'flex',gap:4,marginTop:4,flexWrap:'wrap'}}>
            {p.specialties.slice(0,3).map(s=><span key={s} style={{padding:'2px 8px',borderRadius:999,background:'var(--pm)',fontSize:11,color:'var(--is)'}}>{s}</span>)}
          </div>}
        </div>
        <IcArrow sz={16} c="var(--im)"/>
      </div>)}
      {!loading&&places.length===0&&<div style={{textAlign:'center',padding:'32px 0'}}>
        <div style={{fontSize:40,marginBottom:10}}>🏪</div>
        <p style={{fontSize:16,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Aucun lieu trouvé. Ajoutez votre caviste préféré !</p>
      </div>}
    </div>
    {showAddPlace&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:60,display:'flex',alignItems:'flex-end'}} onClick={()=>{setShowAddPlace(false);setEditingPlace(null);}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--cr)',borderRadius:'24px 24px 0 0',width:'100%',maxHeight:'88vh',overflow:'auto',padding:'6px 0 32px'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'8px 0 6px'}}><div style={{width:40,height:4,borderRadius:2,background:'var(--ln)'}}></div></div>
        <div style={{padding:'0 20px'}}>
          <h2 className="sf" style={{fontSize:24,fontWeight:500,margin:'0 0 16px'}}>{editingPlace?'Modifier':'Ajouter'} <span style={{fontStyle:'italic',color:'var(--bx)'}}>un lieu</span></h2>
          <div style={{display:'flex',gap:6,marginBottom:14}}>
            {['caviste','bar','domaine','restaurant'].map(t=><button key={t} onClick={()=>setAddForm(f=>({...f,type:t}))} style={{flex:1,padding:'10px 4px',borderRadius:12,border:addForm.type===t?'2px solid var(--bx)':'1px solid var(--ln)',background:addForm.type===t?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',fontWeight:addForm.type===t?600:400,color:addForm.type===t?'var(--bx)':'var(--is)'}}>{typeLabels[t]}</button>)}
          </div>
          {[{k:'name',l:'Nom *',p:'La Cave du Coin'},{k:'address',l:'Adresse *',p:'12 Rue de la Paix'},{k:'city',l:'Ville *',p:'Paris'},{k:'phone',l:'Téléphone',p:'01 23 45 67 89'},{k:'website',l:'Site web',p:'https://...'},{k:'photo_url',l:'Photo (URL)',p:'https://...'},{k:'specialties',l:'Spécialités',p:'Bio, Bourgogne, Nature'}].map(f=><div key={f.k} style={{marginBottom:10}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:4}}>{f.l}</label>
            <input type="text" value={addForm[f.k]} onChange={e=>setAddForm(a=>({...a,[f.k]:e.target.value}))} placeholder={f.p} style={{width:'100%',padding:'11px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:15,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
          </div>)}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:6}}>Horaires</label>
            <div style={{display:'grid',gridTemplateColumns:'48px 1fr',gap:6,alignItems:'center'}}>
              {[['lun','Lun'],['mar','Mar'],['mer','Mer'],['jeu','Jeu'],['ven','Ven'],['sam','Sam'],['dim','Dim']].map(([k,l])=><React.Fragment key={k}>
                <span style={{fontSize:14,fontWeight:500,color:addHours[k]?'var(--ink)':'var(--im)'}}>{l}</span>
                <input type="text" value={addHours[k]} onChange={e=>setAddHours(h=>({...h,[k]:e.target.value}))} placeholder="Fermé" style={{padding:'8px 12px',border:'1px solid var(--ln)',borderRadius:10,fontSize:14,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
              </React.Fragment>)}
            </div>
            <div style={{fontSize:12,color:'var(--im)',marginTop:4}}>Ex: 10h-13h / 15h-19h · Vide = fermé</div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:500,display:'block',marginBottom:4}}>Description</label>
            <textarea value={addForm.description} onChange={e=>setAddForm(a=>({...a,description:e.target.value}))} placeholder="Décrivez ce lieu..." rows={3} style={{width:'100%',padding:'11px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:15,background:'var(--cr)',outline:'none',color:'var(--ink)',resize:'none',fontFamily:'inherit',boxSizing:'border-box'}}/>
          </div>
          <button onClick={submitPlace} disabled={submitting||!addForm.name.trim()||!addForm.address.trim()} style={{width:'100%',padding:'14px',border:0,borderRadius:14,background:submitting?'var(--pm)':'var(--bx)',color:submitting?'var(--is)':'var(--cr)',fontSize:16,fontWeight:600,cursor:submitting?'wait':'pointer'}}>
            {submitting?'Géolocalisation en cours...':(editingPlace?'Enregistrer':'Ajouter ce lieu')}
          </button>
        </div>
      </div>
    </div>}
  </div>;
}

function ScreenFriends({tastings,user,onEditTasting,onViewBottle}) {
  const [feedTab,setFeedTab]=useState('moi');
  const [viewTasting,setViewTasting]=useState(null); // moi, feed, rechercher
  const [searchQ,setSearchQ]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [searching,setSearching]=useState(false);
  const [following,setFollowing]=useState([]);
  const [socialFeed,setSocialFeed]=useState([]);
  const [followingIds,setFollowingIds]=useState(new Set());
  const [viewProfile,setViewProfile]=useState(null);
  const [viewBottles,setViewBottles]=useState([]);

  // Load following + social feed
  useEffect(()=>{
    if(!user)return;
    getFollowing(user.id).then(({data})=>{
      setFollowing(data||[]);
      setFollowingIds(new Set((data||[]).map(u=>u.id)));
    });
    fetchSocialFeed(user.id).then(({data})=>setSocialFeed(data||[]));
  },[user]);

  const doSearch=async()=>{
    if(!searchQ.trim())return;
    setSearching(true);
    const {data}=await searchUsers(searchQ.trim());
    setSearchResults((data||[]).filter(u=>u.id!==user?.id));
    setSearching(false);
  };

  const doFollow=async(uid)=>{
    await followUser(user.id,uid);
    setFollowingIds(s=>new Set([...s,uid]));
    const {data}=await getFollowing(user.id);
    setFollowing(data||[]);
    fetchSocialFeed(user.id).then(({data})=>setSocialFeed(data||[]));
  };

  const doUnfollow=async(uid)=>{
    await unfollowUser(user.id,uid);
    setFollowingIds(s=>{const n=new Set(s);n.delete(uid);return n;});
    const {data}=await getFollowing(user.id);
    setFollowing(data||[]);
  };

  const openProfile=async(u)=>{
    setViewProfile(u);
    const {data}=await getPublicBottles(u.id);
    setViewBottles((data||[]).map(normB));
  };

  // Tasting card component
  const TCard=({t,showUser})=><div style={{marginBottom:14}}>
    {showUser&&t.profiles&&<div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
      <div style={{width:28,height:28,borderRadius:14,background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600}}>{(t.profiles.name||'?')[0].toUpperCase()}</div>
      <span style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{t.profiles.name||t.profiles.username}</span>
      <span style={{fontSize:13,color:'var(--im)',flex:1}}>{new Date(t.tasted_at).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</span>
    </div>}
    <div style={{padding:'14px 16px',background:'var(--sr)',borderRadius:18,boxShadow:'var(--sh)'}}>
      <div style={{display:'flex',gap:12}}>
        <div style={{width:6,borderRadius:3,background:COLORS.find(c=>c.id===t.color)?.robe||'var(--bx)',flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div><div className="sf" style={{fontSize:17,fontWeight:600}}>{str(t.name)}</div>
              <div style={{fontSize:14,color:'var(--im)'}}>{t.vintage||''} · {t.appellation||t.region||''}</div></div>
            {t.score_overall>0&&<div style={{textAlign:'center'}}><div className="sf" style={{fontSize:22,fontWeight:600,color:'var(--bx)',lineHeight:1}}>{t.score_overall}</div><div style={{fontSize:10,color:'var(--im)'}}>/20</div></div>}
          </div>
          {/* Detail notes */}
          {(t.visual_notes||t.nose_notes||t.palate_notes)&&<div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
            {t.visual_notes&&<span style={{fontSize:12,padding:'3px 8px',borderRadius:8,background:'var(--pm)',color:'var(--is)'}}>👁 {t.visual_notes.split(',')[0]}</span>}
            {t.nose_notes&&<span style={{fontSize:12,padding:'3px 8px',borderRadius:8,background:'var(--pm)',color:'var(--is)'}}>👃 {t.nose_notes.split('.')[0]}</span>}
            {t.palate_notes&&<span style={{fontSize:12,padding:'3px 8px',borderRadius:8,background:'var(--pm)',color:'var(--is)'}}>👅 {t.palate_notes.split(',')[0]}</span>}
          </div>}
          {t.comments&&<p style={{fontSize:14,color:'var(--is)',margin:'8px 0 0',lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>« {t.comments} »</p>}
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
            {!showUser&&<span style={{fontSize:13,color:'var(--im)',flex:1}}>{new Date(t.tasted_at).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}{t.occasion?' · '+t.occasion:''}</span>}
            {showUser&&<span style={{flex:1}}/>}
            {!showUser&&onEditTasting&&<button onClick={()=>onEditTasting(t)} style={{border:0,background:'transparent',cursor:'pointer',padding:'4px 8px',fontSize:13,color:'var(--bx)',fontWeight:500}}>Modifier</button>}
          </div>
        </div>
      </div>
    </div>
  </div>;

  // User profile modal
  if(viewProfile) return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'52px 20px 14px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <IB icon={<IcBack sz={18}/>} onClick={()=>setViewProfile(null)}/>
        <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>Profil</div>
          <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>{viewProfile.name||viewProfile.username}</h1></div>
        <button onClick={()=>followingIds.has(viewProfile.id)?doUnfollow(viewProfile.id):doFollow(viewProfile.id)} style={{padding:'8px 16px',borderRadius:999,border:followingIds.has(viewProfile.id)?'1.5px solid var(--ln)':'0',background:followingIds.has(viewProfile.id)?'var(--cr)':'var(--bx)',color:followingIds.has(viewProfile.id)?'var(--is)':'var(--cr)',fontSize:14,fontWeight:600,cursor:'pointer'}}>
          {followingIds.has(viewProfile.id)?'Suivi ✓':'Suivre'}
        </button>
      </div>
    </div>
    <div style={{padding:'0 20px'}}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
        <div style={{width:64,height:64,borderRadius:32,background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{(viewProfile.name||'?')[0].toUpperCase()}</div>
        <div>
          {viewProfile.username&&<div style={{fontSize:14,color:'var(--im)'}}>@{viewProfile.username}</div>}
          {viewProfile.city&&<div style={{fontSize:14,color:'var(--im)'}}>📍 {viewProfile.city}</div>}
          {viewProfile.bio&&<p style={{fontSize:14,color:'var(--is)',margin:'4px 0 0',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{viewProfile.bio}</p>}
        </div>
      </div>
      {viewBottles.length>0?<SC title="Sa cave" ey={`${viewBottles.length} références`}>
        {viewBottles.slice(0,20).map(b=><div key={b.id} style={{display:'flex',gap:12,alignItems:'center',padding:'10px 12px',marginBottom:6,background:'var(--pm)',borderRadius:14}}>
          <div style={{width:6,height:28,borderRadius:3,background:b.robe||'var(--bx)',flexShrink:0}}/>
          <div style={{flex:1}}><div className="sf" style={{fontSize:15,fontWeight:500}}>{str(b.name)}</div><div style={{fontSize:13,color:'var(--im)'}}>{b.vintage} · {b.region}</div></div>
          <span style={{fontSize:14,fontWeight:600,color:'var(--bx)'}}>×{b.quantity}</span>
        </div>)}
      </SC>:<div style={{textAlign:'center',padding:'24px',color:'var(--im)'}}>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Cave privée ou vide.</p>
      </div>}
    </div>
  </div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Social" title={<span>Mon<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>feed</span></span>}/>
    <div style={{padding:'0 20px'}}>
      {/* Feed sub-tabs */}
      <div style={{display:'flex',gap:0,marginBottom:16,background:'var(--pm)',borderRadius:14,padding:3}}>
        {[{id:'moi',l:'Moi'},{id:'feed',l:'Feed'},{id:'rechercher',l:'Amis'}].map(t=><button key={t.id} onClick={()=>setFeedTab(t.id)} style={{flex:1,padding:'10px 0',border:0,borderRadius:12,fontSize:14,fontWeight:feedTab===t.id?600:400,cursor:'pointer',background:feedTab===t.id?'var(--sr)':'transparent',color:feedTab===t.id?'var(--bx)':'var(--im)',boxShadow:feedTab===t.id?'var(--sh)':'none',transition:'all .2s'}}>{t.l}</button>)}
      </div>

      {/* Mon historique */}
      {feedTab==='moi'&&<>
        {tastings&&tastings.length>0?tastings.map(t=><div key={t.id} onClick={()=>setViewTasting(t)} style={{cursor:'pointer'}}><TCard t={t}/></div>):<div style={{textAlign:'center',padding:'32px 0'}}>
          <div style={{fontSize:40,marginBottom:10}}>🍾</div>
          <p style={{fontSize:16,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Ouvrez votre première bouteille pour commencer votre historique.</p>
        </div>}
      </>}

      {/* Feed social */}
      {feedTab==='feed'&&<>
        {socialFeed.length>0?socialFeed.map(t=><TCard key={t.id} t={t} showUser/>):<div style={{textAlign:'center',padding:'32px 0'}}>
          <div style={{fontSize:40,marginBottom:10}}>👥</div>
          <p style={{fontSize:16,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Suivez des amis pour voir leurs dégustations ici.</p>
          <button onClick={()=>setFeedTab('rechercher')} style={{marginTop:12,padding:'12px 24px',border:0,borderRadius:999,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:'pointer'}}>Trouver des amis</button>
        </div>}
      </>}

      {/* Rechercher + following */}
      {feedTab==='rechercher'&&<>
        {/* Search bar */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          <input type="text" value={searchQ} onChange={e=>setSearchQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')doSearch();}} placeholder="Chercher par nom ou @username..." style={{flex:1,padding:'12px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:16,background:'var(--sr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
          <button onClick={doSearch} disabled={searching} style={{padding:'12px 16px',border:0,borderRadius:14,background:'var(--bx)',color:'var(--cr)',fontSize:16,cursor:'pointer'}}><IcSearch sz={18} c="var(--cr)"/></button>
        </div>
        {/* Search results */}
        {searchResults.length>0&&<SC title="Résultats" ey={`${searchResults.length} trouvé${searchResults.length>1?'s':''}`}>
          {searchResults.map(u=><div key={u.id} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div onClick={()=>openProfile(u)} style={{width:44,height:44,borderRadius:22,background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,cursor:'pointer',flexShrink:0}}>{(u.name||'?')[0].toUpperCase()}</div>
            <div style={{flex:1,cursor:'pointer'}} onClick={()=>openProfile(u)}>
              <div className="sf" style={{fontSize:16,fontWeight:500}}>{u.name}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>{u.username?'@'+u.username:''}  {u.city||''}</div>
            </div>
            <button onClick={()=>followingIds.has(u.id)?doUnfollow(u.id):doFollow(u.id)} style={{padding:'6px 14px',borderRadius:999,border:followingIds.has(u.id)?'1.5px solid var(--ln)':'0',background:followingIds.has(u.id)?'var(--cr)':'var(--bx)',color:followingIds.has(u.id)?'var(--is)':'var(--cr)',fontSize:13,fontWeight:600,cursor:'pointer'}}>
              {followingIds.has(u.id)?'Suivi':'Suivre'}
            </button>
          </div>)}
        </SC>}
        {/* Following list */}
        {following.length>0&&<SC title="Je suis" ey={`${following.length} personne${following.length>1?'s':''}`}>
          {following.map(u=><div key={u.id} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div onClick={()=>openProfile(u)} style={{width:44,height:44,borderRadius:22,background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,cursor:'pointer',flexShrink:0}}>{(u.name||'?')[0].toUpperCase()}</div>
            <div style={{flex:1,cursor:'pointer'}} onClick={()=>openProfile(u)}>
              <div className="sf" style={{fontSize:16,fontWeight:500}}>{u.name}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>{u.username?'@'+u.username:''} · {u.bottle_count||0} bouteilles</div>
            </div>
            <button onClick={()=>doUnfollow(u.id)} style={{padding:'6px 14px',borderRadius:999,border:'1.5px solid var(--ln)',background:'var(--cr)',color:'var(--im)',fontSize:13,cursor:'pointer'}}>Suivi ✓</button>
          </div>)}
        </SC>}
        {following.length===0&&searchResults.length===0&&<div style={{textAlign:'center',padding:'24px 0'}}>
          <p style={{fontSize:15,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Cherchez vos amis par leur nom ou @username pour les suivre et voir leurs dégustations.</p>
        </div>}
      </>}
    </div>
    {/* Tasting detail modal */}
    {viewTasting&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:60}} onClick={()=>setViewTasting(null)}>
      <div onClick={e=>e.stopPropagation()} style={{position:'absolute',bottom:0,left:0,right:0,background:'var(--cr)',borderRadius:'28px 28px 0 0',maxHeight:'90vh',overflow:'auto',WebkitOverflowScrolling:'touch'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'10px 0 0'}}><div style={{width:40,height:4,borderRadius:2,background:'var(--ln)'}}></div></div>
        {/* Gradient header with score */}
        <div style={{padding:'16px 24px 20px',background:`linear-gradient(140deg, ${COLORS.find(c=>c.id===viewTasting.color)?.robe||'var(--bx)'}22, var(--cr) 70%)`}}>
          <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
            <div style={{width:6,height:56,borderRadius:3,background:COLORS.find(c=>c.id===viewTasting.color)?.robe||'var(--bx)',flexShrink:0,marginTop:2}}/>
            <div style={{flex:1,minWidth:0}}>
              <button onClick={()=>{if(onViewBottle){setViewTasting(null);onViewBottle(viewTasting);}}} style={{border:0,background:'none',padding:0,cursor:onViewBottle?'pointer':'default',textAlign:'left',width:'100%'}}>
                <div className="sf" style={{fontSize:24,fontWeight:600,lineHeight:1.15,color:'var(--ink)'}}>{str(viewTasting.name)}</div>
                <div style={{fontSize:15,color:'var(--im)',marginTop:3}}>{viewTasting.vintage||''}{viewTasting.region?' · '+viewTasting.region:''}</div>
                {viewTasting.appellation&&<div style={{fontSize:13,color:'var(--bx)',fontWeight:500,marginTop:2}}>{viewTasting.appellation}</div>}
              </button>
            </div>
            {viewTasting.score_overall>0&&<div style={{background:'var(--bx)',borderRadius:16,padding:'12px 14px',textAlign:'center',flexShrink:0}}>
              <div className="sf" style={{fontSize:28,fontWeight:600,color:'var(--cr)',lineHeight:1}}>{viewTasting.score_overall}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.6)',marginTop:1}}>/20</div>
            </div>}
          </div>
        </div>
        <div style={{padding:'0 24px 32px'}}>
          {/* Score bars */}
          {viewTasting.score_overall>0&&<div style={{display:'flex',gap:6,marginBottom:20}}>
            {[{l:'Œil',v:viewTasting.score_visual,ic:'👁'},{l:'Nez',v:viewTasting.score_nose,ic:'👃'},{l:'Bouche',v:viewTasting.score_palate,ic:'👅'}].map(s=><div key={s.l} style={{flex:1,padding:'14px 10px',borderRadius:16,background:'var(--sr)',boxShadow:'var(--sh)',textAlign:'center'}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.ic}</div>
              <div className="sf" style={{fontSize:22,fontWeight:600,color:'var(--bx)'}}>{s.v||'—'}</div>
              <div style={{fontSize:11,color:'var(--im)',marginTop:2}}>{s.l}</div>
            </div>)}
          </div>}
          {/* Tasting notes sections */}
          {viewTasting.visual_notes&&<div style={{marginBottom:14,padding:'14px 16px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span style={{fontSize:16}}>👁️</span>
              <span className="sc" style={{fontSize:10,color:'var(--bx)',opacity:.7}}>L'œil</span>
            </div>
            <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{viewTasting.visual_notes}</p>
          </div>}
          {viewTasting.nose_notes&&<div style={{marginBottom:14,padding:'14px 16px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span style={{fontSize:16}}>👃</span>
              <span className="sc" style={{fontSize:10,color:'var(--bx)',opacity:.7}}>Le nez</span>
            </div>
            <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{viewTasting.nose_notes}</p>
            {(viewTasting.aromas||[]).length>0&&<div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:8}}>{viewTasting.aromas.map(a=><span key={a} style={{padding:'4px 10px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:12,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</span>)}</div>}
          </div>}
          {viewTasting.palate_notes&&<div style={{marginBottom:14,padding:'14px 16px',background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span style={{fontSize:16}}>👅</span>
              <span className="sc" style={{fontSize:10,color:'var(--bx)',opacity:.7}}>La bouche</span>
            </div>
            <p style={{fontSize:14,color:'var(--is)',margin:0,lineHeight:1.5}}>{viewTasting.palate_notes}</p>
          </div>}
          {/* Comment */}
          {viewTasting.comments&&<div style={{marginBottom:14,padding:'16px',background:'linear-gradient(140deg,var(--bx)08,var(--pm))',borderRadius:16,borderLeft:'3px solid var(--bx)'}}>
            <p style={{fontSize:16,color:'var(--is)',margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5}}>« {viewTasting.comments} »</p>
          </div>}
          {/* Context */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
            <span style={{fontSize:13,color:'var(--im)',padding:'4px 10px',background:'var(--pm)',borderRadius:999}}>📅 {new Date(viewTasting.tasted_at).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</span>
            {viewTasting.occasion&&<span style={{fontSize:13,color:'var(--im)',padding:'4px 10px',background:'var(--pm)',borderRadius:999}}>🎯 {viewTasting.occasion}</span>}
            {viewTasting.paired_with&&<span style={{fontSize:13,color:'var(--im)',padding:'4px 10px',background:'var(--pm)',borderRadius:999}}>🍽 {viewTasting.paired_with}</span>}
          </div>
          {/* Actions */}
          <div style={{display:'flex',gap:10}}>
            {onViewBottle&&<button onClick={()=>{setViewTasting(null);onViewBottle(viewTasting);}} style={{flex:1,padding:'14px',border:'1px solid var(--ln)',borderRadius:14,background:'var(--cr)',color:'var(--is)',fontSize:14,fontWeight:500,cursor:'pointer'}}>🍷 Voir la bouteille</button>}
            {onEditTasting&&<button onClick={()=>{setViewTasting(null);onEditTasting(viewTasting);}} style={{flex:1,padding:'14px',border:'1px solid var(--ln)',borderRadius:14,background:'var(--cr)',color:'var(--bx)',fontSize:14,fontWeight:500,cursor:'pointer'}}>Modifier</button>}
          </div>
        </div>
      </div>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: PROFILE
// ═══════════════════════════════════════════════════════════════
function ScreenProfile({onNav,bottles,profile,onLogout,user,dark,toggleDark,tastings}) {
  const nm=profile?.name||'Ami';
  const [username,setUsername]=useState(profile?.username||'');
  const [publicCave,setPublicCave]=useState(profile?.public_cave||false);
  const [saving,setSaving]=useState(false);
  const [followers,setFollowers]=useState([]);
  const [followingCount,setFollowingCount]=useState(0);

  useEffect(()=>{
    if(!user)return;
    setUsername(profile?.username||'');
    setPublicCave(profile?.public_cave||false);
    getFollowers(user.id).then(({data})=>setFollowers(data||[]));
    getFollowing(user.id).then(({data})=>setFollowingCount((data||[]).length));
  },[user,profile]);

  const saveProfile=async()=>{
    if(!user)return;
    setSaving(true);
    await updateProfile(user.id,{username:username.trim().toLowerCase()||null,public_cave:publicCave,bottle_count:bottles.length});
    setSaving(false);
  };

  // Export cave as shareable text
  const exportCave=()=>{
    const headers='Nom,Cuvée,Millésime,Région,Appellation,Couleur,Quantité,Prix,Alcool,Emplacement,Apogée début,Apogée fin,Notes';
    const rows=bottles.map(b=>[b.name,b.cuvee||'',b.vintage||'',b.region||'',b.appellation||'',b.color||'',b.quantity||1,b.price||'',b.alcohol||'',b.location||'',b.peakFrom||b.peak_from||'',b.peakTo||b.peak_to||'',`"${(b.notes||'').replace(/"/g,'""')}"`].join(','));
    const csv='\uFEFF'+headers+'\n'+rows.join('\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=`cave-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  };
  const tb=bottles.reduce((s,b)=>s+(b.quantity||1),0),tv=bottles.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const regs=[...new Set(bottles.map(b=>b.region).filter(Boolean))];
  const oldest=bottles.length?Math.min(...bottles.map(b=>b.vintage).filter(Boolean)):'—';
  const avg=bottles.length?Math.round(bottles.reduce((s,b)=>s+(b.score||0),0)/bottles.length):0;
  const types={};bottles.forEach(b=>types[b.color]=(types[b.color]||0)+(b.quantity||1));
  const tc={rouge:'#6B1E2C',blanc:'#D9B84A',effervescent:'#C8A96A',liquoreux:'#D68A1A'};
  const rc={};bottles.forEach(b=>b.region&&(rc[b.region]=(rc[b.region]||0)+(b.quantity||1)));
  const fav=Object.entries(rc).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'48px 24px 20px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)',textAlign:'center'}}>
      <div style={{width:80,height:80,borderRadius:'50%',margin:'0 auto 12px',background:'linear-gradient(135deg,var(--bx) 0%,var(--bs) 100%)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,boxShadow:'0 8px 24px rgba(107,30,44,.25)',border:'3px solid var(--cr)'}}>{(nm[0]||'?').toUpperCase()}</div>
      <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>{nm}</h1>
      {profile?.username&&<div style={{fontSize:15,color:'var(--im)',marginTop:2}}>@{profile.username}</div>}
      <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:12}}>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:18,fontWeight:600}}>{followingCount}</div><div style={{fontSize:12,color:'var(--im)'}}>Abonnements</div></div>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:18,fontWeight:600}}>{followers.length}</div><div style={{fontSize:12,color:'var(--im)'}}>Abonnés</div></div>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:18,fontWeight:600}}>{(tastings||[]).length}</div><div style={{fontSize:12,color:'var(--im)'}}>Dégustations</div></div>
      </div>
    </div>
    <div style={{padding:'0 20px'}}>
      {/* Social settings */}
      <SC title="Mon profil social" ey="Visibilité">
        <div style={{marginBottom:12}}>
          <label style={{fontSize:14,fontWeight:500,display:'block',marginBottom:6}}>Nom d'utilisateur</label>
          <input type="text" value={username} onChange={e=>setUsername(e.target.value.replace(/[^a-z0-9_]/g,''))} placeholder="mon_pseudo" style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:14,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
          <div style={{fontSize:12,color:'var(--im)',marginTop:4}}>Lettres, chiffres, underscore. Visible par les autres.</div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',borderTop:'.5px solid var(--ln)'}}>
          <div><div style={{fontSize:15,fontWeight:500}}>Cave publique</div><div style={{fontSize:13,color:'var(--im)'}}>Les abonnés peuvent voir vos bouteilles</div></div>
          <button onClick={()=>setPublicCave(!publicCave)} style={{width:50,height:28,borderRadius:14,border:0,background:publicCave?'var(--bx)':'var(--pm)',cursor:'pointer',position:'relative',transition:'background .2s'}}>
            <div style={{width:24,height:24,borderRadius:12,background:'var(--sr)',position:'absolute',top:2,left:publicCave?24:2,transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.15)'}}/>
          </button>
        </div>
        <button onClick={saveProfile} disabled={saving} style={{width:'100%',padding:'12px',border:0,borderRadius:14,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:'pointer',marginTop:8}}>
          {saving?'Enregistrement...':'Enregistrer'}
        </button>
      </SC>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:4}}>
        {[{l:'Bouteilles',v:tb,Ic:IcBottle},{l:'Valeur cave',v:tv.toLocaleString('fr')+'\u00A0€',Ic:IcDiamond},{l:'Régions',v:regs.length,Ic:IcMap},{l:'Score moyen',v:avg?avg+'/100':'—',Ic:IcStar}].map(s=><div key={s.l} style={{background:'var(--sr)',borderRadius:18,padding:'16px 18px',boxShadow:'var(--sh)',color:'var(--ink)'}}>
          <s.Ic sz={20} c="var(--bx)"/>
          <div className="sf" style={{fontSize:22,fontWeight:600,marginTop:6,color:'var(--ink)'}}>{s.v}</div>
          <div style={{fontSize:13,color:'var(--im)',marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
      {bottles.length>0&&<SC title="Mon profil de goût" ey="Préférences">
        {[['Région favorite',fav],['Plus ancien millésime',oldest],['Style dominant','Vins de garde']].map(([l,v],i)=><div key={l}>{i>0&&<div style={{height:.5,background:'var(--ln)',margin:'14px 0'}}/>}<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:16,color:'var(--is)'}}>{l}</span>
          <span className="sf" style={{fontSize:17,fontWeight:600,color:i===0?'var(--bx)':'var(--ink)'}}>{v}</span>
        </div></div>)}
      </SC>}
      {Object.keys(types).length>0&&<SC title="Répartition" ey="Par type">
        <div style={{display:'flex',gap:6,height:10,borderRadius:5,overflow:'hidden',marginBottom:14}}>
          {Object.entries(types).map(([t,c])=><div key={t} style={{flex:c,background:tc[t],borderRadius:5}}/>)}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {Object.entries(types).map(([t,c])=><div key={t} style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:8,height:8,borderRadius:4,background:tc[t]}}/>
            <span style={{fontSize:14,color:'var(--is)',textTransform:'capitalize'}}>{t} ({c})</span>
          </div>)}
        </div>
      </SC>}
      <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
        {/* Dark mode + Export CSV */}
        <div style={{display:'flex',gap:10}}>
          <button onClick={toggleDark} style={{flex:1,padding:'14px',border:'1px solid var(--ln)',borderRadius:16,background:'var(--sr)',cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
            {dark?<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.3"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.3"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>}
            <span style={{fontSize:14,fontWeight:500,color:'var(--ink)'}}>{dark?'Clair':'Sombre'}</span>
          </button>
          <button onClick={exportCave} style={{flex:1,padding:'14px',border:'1px solid var(--ln)',borderRadius:16,background:'var(--sr)',cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
            <IcExport sz={20} c="var(--ink)"/>
            <span style={{fontSize:14,fontWeight:500,color:'var(--ink)'}}>Export CSV</span>
          </button>
        </div>

        <button onClick={onLogout} style={{width:'100%',border:'1px solid var(--ls)',padding:16,background:'transparent',borderRadius:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:6}}>
          <span style={{fontSize:16,color:'var(--bx)',fontWeight:500}}>Se déconnecter</span>
        </button>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: ADD BOTTLE
// ═══════════════════════════════════════════════════════════════

function ScreenAdd({onBack,onSave,editBottle,addMode,onTasting,onWishlist,user,onSaveTasting}) {
  const isEdit=!!editBottle;
  const mode=addMode||'cave';
  const [tastingStep,setTastingStep]=useState(1); // 1=select wine, 2=fill tasting
  const [tForm,setTForm]=useState({robeColor:'',robeIntensity:'moyenne',limpidity:'limpide',tears:'moyennes',noseIntensity:'moyen',noseAromas:[],specificAromas:[],noseDefects:'',attack:'franche',acidity:'fraîche',tannins:'soyeux',body:'moyen',lengthCaudalies:'moyenne',visual:3,nose:3,palate:3,balance:3,complexity:3,overall:12,occasion:'',paired:'',comments:'',potential:'à boire'});
  const [pendingWine,setPendingWine]=useState(null); // wine awaiting confirmation
  const [confirmed,setConfirmed]=useState(isEdit); // true when identity is locked in
  const savedForm=(()=>{if(isEdit)return null;try{const s=sessionStorage.getItem('cave_addForm');if(!s)return null;const p=JSON.parse(s);return(p&&typeof p.name==='string')?s:null;}catch(e){sessionStorage.removeItem('cave_addForm');return null;}})();
  const savedRich=!isEdit&&sessionStorage.getItem('cave_addRich');
  const init=isEdit?{
    name:editBottle.name||'',cuvee:editBottle.cuvee||'',vintage:editBottle.vintage||2023,
    region:editBottle.region||'Bordeaux',appellation:editBottle.appellation||'',
    color:editBottle.color||'rouge',price:editBottle.price||'',quantity:editBottle.quantity||1,
    alcohol:editBottle.alcohol||'',score:editBottle.score||'',
    peakFrom:editBottle.peakFrom||editBottle.peak_from||'',peakTo:editBottle.peakTo||editBottle.peak_to||'',
    notes:editBottle.notes||'',location:editBottle.location||''
  }:savedForm?JSON.parse(savedForm):{name:'',cuvee:'',vintage:2023,region:'Bordeaux',appellation:'',color:'rouge',price:'',quantity:1,alcohol:'',score:'',peakFrom:'',peakTo:'',notes:'',location:''};
  const [form,setForm]=useState(init);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [search,setSearch]=useState('');
  const [results,setResults]=useState([]);
  const [searching,setSearching]=useState(false);
  const initRich=isEdit?{
    cepages:editBottle.cepages||[],aromas:editBottle.aromas||[],
    aromaW:editBottle.aromaW||editBottle.aroma_wheel||{},
    pairings:editBottle.pairings||[],service:editBottle.service||{},
    estate:editBottle.estate||{},tags:editBottle.tags||[],robe:editBottle.robe||'#6B1E2C'
  }:savedRich?JSON.parse(savedRich):{};
  const [richData,setRichData]=useState(initRich);
  const [scanning,setScanning]=useState(false);
  const [scanMsg,setScanMsg]=useState(()=>!isEdit&&sessionStorage.getItem('cave_scanMsg')||'');
  const [scanPreview,setScanPreview]=useState(null);
  const [scanMatches,setScanMatches]=useState([]);
  const [showCamera,setShowCamera]=useState(false);
  const videoRef=React.useRef(null);
  const streamRef=React.useRef(null);

  // Persist form + richData to sessionStorage (survives Android kills)
  useEffect(()=>{if(!isEdit){sessionStorage.setItem('cave_addForm',JSON.stringify(form));}},[form]);
  useEffect(()=>{if(!isEdit&&Object.keys(richData).length>0){sessionStorage.setItem('cave_addRich',JSON.stringify(richData));}},[richData]);
  useEffect(()=>{if(!isEdit&&scanMsg){sessionStorage.setItem('cave_scanMsg',scanMsg);}},[scanMsg]);

  // Clear saved state on successful save or cancel
  const clearSavedState=()=>{sessionStorage.removeItem('cave_addForm');sessionStorage.removeItem('cave_addRich');sessionStorage.removeItem('cave_scanMsg');sessionStorage.removeItem('cave_showAdd');};

  // --- Integrated camera ---
  const openCamera=async()=>{
    setScanMsg('');setScanPreview(null);setScanMatches([]);setShowCamera(true);
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1920},height:{ideal:1080}}});
      streamRef.current=stream;
      // Wait for ref to be available after render
      setTimeout(()=>{if(videoRef.current){videoRef.current.srcObject=stream;videoRef.current.play();}},100);
    }catch(err){
      setScanMsg('Caméra refusée : '+(err.message||'Autorisez l\'accès dans les paramètres'));
      setShowCamera(false);
    }
  };
  const stopCamera=()=>{
    if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());streamRef.current=null;}
    setShowCamera(false);
  };
  const capturePhoto=()=>{
    const video=videoRef.current;
    if(!video||!video.videoWidth)return;
    const canvas=document.createElement('canvas');
    canvas.width=video.videoWidth;canvas.height=video.videoHeight;
    canvas.getContext('2d').drawImage(video,0,0);
    stopCamera();
    canvas.toBlob(blob=>{
      if(blob)processScan(new File([blob],'scan.png',{type:'image/png'}));
      else setScanMsg('Erreur de capture.');
    },'image/png');
  };

  // --- Process scan: AI reads → catalog match → display ---
  // --- Process scan: Vision reads → catalog match → auto-enrich if needed ---
  const processScan=async(file)=>{
    if(!file){setScanMsg('Erreur : aucun fichier');return;}
    setScanPreview(URL.createObjectURL(file));setScanning(true);setScanMatches([]);
    setScanMsg(`Photo (${Math.round(file.size/1024)}KB) — lecture étiquette...`);
    try{
      // Step 1: Vision reads the label (name, cuvée, vintage, appellation)
      const aiResult=await scanLabel(file);
      if(!aiResult.name){setScanMsg('Étiquette non lisible. Réessayez avec plus de lumière.');setScanning(false);return;}

      // Fill form with what Vision read (basic fields only)
      setForm(f=>({...f,name:aiResult.name||f.name,cuvee:aiResult.cuvee||f.cuvee,vintage:aiResult.vintage||f.vintage,region:aiResult.region||f.region,appellation:aiResult.appellation||f.appellation,color:aiResult.color||f.color,alcohol:aiResult.alcohol||f.alcohol,notes:aiResult.notes||f.notes}));

      // Step 2: Search catalog with fuzzy matching
      setScanMsg(`✓ "${aiResult.name}" lu — recherche dans le catalogue...`);
      const matches=await matchCatalogFromScan(aiResult);

      if(matches.length>0&&matches[0]._matchScore>=55){
        // Strong match → show confirmation card
        const best=matches[0];
        setPendingWine(best);
        setScanMsg(`✓ ${best.name}${best.cuvee?' — '+best.cuvee:''} — trouvé !`);
        if(matches.length>1)setScanMatches(matches.slice(1));

      }else if(matches.length>0){
        // Weak matches → show suggestions
        setScanMsg(`✓ "${aiResult.name}" — ${matches.length} suggestion${matches.length>1?'s':''} :`);
        setScanMatches(matches);

      }else{
        // No match → auto-enrich via Claude
        setScanMsg(`✓ "${aiResult.name}" — enrichissement de la fiche...`);
        try{
          const enriched=await enrichWine({name:aiResult.name,cuvee:aiResult.cuvee||'',vintage:aiResult.vintage,region:aiResult.region||'',appellation:aiResult.appellation||'',color:aiResult.color||'rouge'});
          setForm(f=>({...f,alcohol:enriched.alcohol||f.alcohol,peakFrom:enriched.peak_from||f.peakFrom,peakTo:enriched.peak_to||f.peakTo,price:enriched.typical_price||f.price}));
          const ars=Array.isArray(enriched.aromas)?enriched.aromas:[].concat(enriched.aromas?.fruit||[],enriched.aromas?.floral||[],enriched.aromas?.spicy||[],enriched.aromas?.earthy||[],enriched.aromas?.wood||[]);
          setRichData({cepages:(enriched.cepages||[]).map(c=>typeof c==='string'?c:c.n||c.name),aromas:ars,aromaW:enriched.aroma_wheel||{},pairings:enriched.pairings||[],service:enriched.service||{},estate:enriched.estate||{},tags:[...(enriched.tags||[]),...(enriched.labels||[])],robe:enriched.robe||COLORS.find(c=>c.id===(aiResult.color||'rouge'))?.robe||'#6B1E2C'});
          setScanMsg(`✓ "${aiResult.name}" — fiche enrichie automatiquement.`);
          setConfirmed(true);
        }catch(enrichErr){
          console.warn('Auto-enrich failed:',enrichErr);
          setScanMsg(`✓ "${aiResult.name}" lu. Complétez les détails manuellement.`);
        }
      }
    }catch(err){console.error(err);setScanMsg('Erreur : '+(err.message||'Connexion'));}
    setScanning(false);
  };

  // --- File picker ---
  const scanGuard=React.useRef(false);
  const handleFileInput=async(e)=>{
    if(scanGuard.current)return;
    const file=e.target.files?.[0];e.target.value='';
    if(file){scanGuard.current=true;await processScan(file);scanGuard.current=false;}
  };

  // --- Catalog match ---
  const pickScanMatch=(w)=>{
    setScanMatches([]);setScanMsg(`✓ ${String(w.name||'')} trouvé`);
    setPendingWine(w);
  };

  // --- Code-barres ---
  const barcodeGuard=React.useRef(false);
  const handleBarcode=async(e)=>{
    if(barcodeGuard.current)return;
    const file=e.target.files?.[0];e.target.value='';
    if(!file)return;barcodeGuard.current=true;
    setScanPreview(URL.createObjectURL(file));setScanning(true);setScanMsg('Détection...');setScanMatches([]);
    try{
      if('BarcodeDetector' in window){
        const img=await createImageBitmap(file);
        const barcodes=await new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e']}).detect(img);
        if(barcodes.length>0){
          const code=barcodes[0].rawValue;setScanMsg(`Code ${code} — recherche...`);
          // 1. Check catalog by barcode first
          const catalogMatch=await searchByBarcode(code);
          if(catalogMatch){
            setPendingWine(catalogMatch);
            setScanMsg(`✓ ${catalogMatch.name} — trouvé dans le catalogue !`);
          }else{
            // 2. Fallback: Open Food Facts
            const result=await scanBarcode(code);
            if(result?.name){
              // 3. Search catalog by name for rich data
              const matches=await matchCatalogFromScan(result);
              if(matches.length>0&&matches[0]._matchScore>=55){
                setPendingWine(matches[0]);
                setScanMsg(`✓ ${matches[0].name} — trouvé !`);
              }else{
                setForm(f=>({...f,name:result.name,cuvee:result.cuvee||'',color:result.color||'rouge',alcohol:result.alcohol||''}));
                setConfirmed(true);
                setScanMsg(`✓ ${result.name} (Open Food Facts)`);
              }
            }else setScanMsg(`Code ${code} non trouvé.`);
          }
        }else setScanMsg('Aucun code-barres détecté.');
      }else setScanMsg('Non supporté sur ce navigateur.');
    }catch(err){setScanMsg('Erreur : '+(err.message||'Réessayez'));}
    setScanning(false);barcodeGuard.current=false;
  };
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  const robe=COLORS.find(c=>c.id===form.color)?.robe||'#6B1E2C';

  // Search reference DB + catalog + Open Food Facts
  useEffect(()=>{
    if(isEdit||search.length<2){setResults([]);return;}
    const t=setTimeout(async()=>{
      setSearching(true);
      const merged=await searchWines(search);
      setResults(merged.slice(0,12));
      setSearching(false);
    },350);
    return()=>clearTimeout(t);
  },[search]);

  const pickCatalog=(w)=>{
    setSearch('');setResults([]);
    setPendingWine(w);
  };

  // Actually fill form from a wine object (used after confirmation)
  const confirmWine=(w)=>{
    try{
      const s=v=>(v==null?'':typeof v==='object'?JSON.stringify(v):String(v));
      const n=v=>{const x=parseFloat(v);return isNaN(x)?'':x;};
      const pf=w.peak_from||(w.guard?.from?new Date().getFullYear()+(w.guard.from||0):'');
      const pt=w.peak_to||(w.guard?.to?new Date().getFullYear()+(w.guard.to||0):'');
      const app=s(w.appellation)||s(w.name);
      const deduced=Object.entries(APPELLATION_MAP).find(([k])=>app.toLowerCase().includes(k.toLowerCase()));
      const region=s(w.region)||(deduced?deduced[1].r:'')||'';
      const deducedAromas=deduced?deduced[1].a:[];
      const deducedService=deduced?{temp:deduced[1].t,glass:deduced[1].v,carafe:deduced[1].c}:{};
      setForm(f=>({
        name:s(w.name)||s(f.name),cuvee:s(w.cuvee),vintage:f.vintage||2023,
        region:region||s(f.region)||'Bordeaux',appellation:s(w.appellation),
        color:s(w.color)||'rouge',
        price:n(w.price||w.typical_price)||f.price||'',
        quantity:f.quantity||1,
        alcohol:n(w.alcohol||w.typical_alcohol)||f.alcohol||'',
        score:f.score||'',
        peakFrom:pf||f.peakFrom||'',peakTo:pt||f.peakTo||'',
        notes:s(f.notes),location:s(f.location)
      }));
      const existingAromas=Array.isArray(w.aromas)?w.aromas:[];
      const mergedAromas=existingAromas.length>0?existingAromas:deducedAromas;
      const existingService=(w.service&&typeof w.service==='object')?w.service:deducedService;
      setRichData({
        cepages:Array.isArray(w.cepages)?w.cepages:[],
        aromas:mergedAromas,
        aromaW:(w.aroma_wheel&&typeof w.aroma_wheel==='object')?w.aroma_wheel:{},
        pairings:Array.isArray(w.pairings)?w.pairings:[],
        service:existingService.temp?existingService:deducedService,
        estate:(w.estate&&typeof w.estate==='object')?w.estate:{},
        tags:Array.isArray(w.tags)?w.tags:Array.isArray(w.labels)?w.labels:[],
        robe:s(w.robe)||COLORS.find(c=>c.id===(w.color||'rouge'))?.robe||'#6B1E2C',
      });
      setPendingWine(null);setConfirmed(true);
    }catch(e){console.error('confirmWine error:',e);setPendingWine(null);}
  };

  const rejectWine=()=>{
    setPendingWine(null);setConfirmed(false);
    setForm(f=>({...f,name:'',cuvee:'',region:'Bordeaux',appellation:'',color:'rouge',price:'',alcohol:'',peakFrom:'',peakTo:''}));
    setRichData({cepages:[],aromas:[],aromaW:{},pairings:[],service:{},estate:{},tags:[],robe:'#6B1E2C'});
    setScanMsg('');setScanMatches([]);
  };

  const changeWine=()=>{
    setConfirmed(false);setPendingWine(null);
    setForm(f=>({...f,name:'',cuvee:'',region:'Bordeaux',appellation:'',color:'rouge'}));
    setRichData({cepages:[],aromas:[],aromaW:{},pairings:[],service:{},estate:{},tags:[],robe:'#6B1E2C'});
    setScanMsg('');
  };

  const srcLabel=(w)=>w.source==='openfoodfacts'?'OFF':w.source==='reference'?'Réf':w.source==='catalog'?'Cave':'';
  const srcColor=(w)=>w.source==='openfoodfacts'?'#27ae60':w.source==='reference'?'var(--g)':'var(--bx)';

  const handleSave=async()=>{
    const s=v=>(v==null?'':String(v));
    if(!s(form.name).trim()){setError('Le nom du domaine est requis.');return;}
    setSaving(true);setError('');
    const bottle={
      name:s(form.name).trim(),cuvee:s(form.cuvee).trim(),vintage:parseInt(form.vintage)||2023,
      region:s(form.region),appellation:s(form.appellation).trim(),color:s(form.color)||'rouge',
      robe:richData.robe||robe,
      price:parseFloat(form.price)||0,quantity:parseInt(form.quantity)||1,
      alcohol:parseFloat(form.alcohol)||null,score:parseInt(form.score)||null,
      peakFrom:parseInt(form.peakFrom)||null,peakTo:parseInt(form.peakTo)||null,
      notes:s(form.notes).trim(),
      location:s(form.location).trim(),
      // Rich data from catalog
      cepages:richData.cepages||[],
      aromas:richData.aromas||[],
      aromaW:richData.aromaW||{},
      pairings:richData.pairings||[],
      service:richData.service||{},
      estate:richData.estate||{},
      tags:richData.tags||[],
    };
    // Upsert to wine_catalog for everyone (enrich shared catalog)
    if(bottle.name&&!isEdit){
      try{await upsertToCatalog(user?.id,{
        name:bottle.name,cuvee:bottle.cuvee,region:bottle.region,appellation:bottle.appellation,
        color:bottle.color,robe:bottle.robe,typical_price:bottle.price||null,typical_alcohol:bottle.alcohol||null,
        peak_from:bottle.peakFrom,peak_to:bottle.peakTo,
        cepages:bottle.cepages||[],aromas:bottle.aromas||[],pairings:bottle.pairings||[],
        service:bottle.service||{},estate:bottle.estate||{},
      });}catch(e){}
    }
    if(mode==='tasting'){
      // Step 1 → 2: switch to tasting form inside ScreenAdd
      setSaving(false);
      setTastingStep(2);
      return;
    }
    const ok=mode==='wishlist'?await onWishlist(bottle):await onSave(bottle,isEdit?editBottle.id:null);
    setSaving(false);
    if(ok&&mode!=='tasting'){clearSavedState();onBack();}
    else if(mode==='tasting'){clearSavedState();}
    else setError('Erreur lors de l\'enregistrement.');
  };

  const handleTastingSave=async()=>{
    setSaving(true);setError('');
    const s=v=>(v==null?'':String(v));
    const tastingData={
      name:s(form.name).trim()||'Vin inconnu',vintage:parseInt(form.vintage)||null,
      region:s(form.region),appellation:s(form.appellation).trim(),color:s(form.color)||'rouge',
      score_visual:tForm.visual||0,score_nose:tForm.nose||0,score_palate:tForm.palate||0,
      score_overall:tForm.overall||0,comments:tForm.comments||'',
      occasion:tForm.occasion||'',paired_with:tForm.paired||'',
      visual_notes:`Robe: ${tForm.robeColor||'—'}, Intensité: ${tForm.robeIntensity}, Limpidité: ${tForm.limpidity}, Larmes: ${tForm.tears}`,
      nose_notes:`Intensité: ${tForm.noseIntensity}. Arômes: ${(tForm.specificAromas||[]).join(', ')||'—'}${tForm.noseDefects&&tForm.noseDefects!=='Aucun'?' — Défaut: '+tForm.noseDefects:''}`,
      palate_notes:`Attaque: ${tForm.attack}, Acidité: ${tForm.acidity}${tForm.tannins&&tForm.tannins!=='—'?', Tanins: '+tForm.tannins:''}, Corps: ${tForm.body}, Longueur: ${tForm.lengthCaudalies}`,
      aromas:tForm.specificAromas||[],
    };
    try{
      const ok=await onSaveTasting(tastingData);
      setSaving(false);
      if(!ok)setError('Erreur — vérifiez que fix-rls-all.sql a été exécuté dans Supabase.');
    }catch(e){setSaving(false);setError('Erreur: '+e.message);console.error('handleTastingSave:',e);}
  };

  const inp=(label,key,type='text',placeholder='')=>
    <div style={{marginBottom:14}}>
      <label className="sc" style={{display:'block',fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>{label}</label>
      <input type={type} value={form[key]} onChange={e=>up(key,e.target.value)} placeholder={placeholder}
        style={{width:'100%',padding:'13px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:17,background:'var(--cr)',outline:'none',color:'var(--ink)',fontFamily:"'Inter',sans-serif",boxSizing:'border-box'}}/>
    </div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'52px 24px 10px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack}/>
        <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>{isEdit?'Modification':mode==='tasting'?'Dégustation':mode==='wishlist'?'Wishlist':'Nouvelle entrée'}</div>
          <h1 className="sf" style={{margin:0,fontSize:26,fontWeight:500}}>{isEdit?'Modifier':mode==='tasting'?'Déguster':mode==='wishlist'?'Ajouter à la':'Ajouter une'} <span style={{fontStyle:'italic',color:'var(--bx)'}}>{mode==='wishlist'?'wishlist':'bouteille'}</span></h1></div>
      </div>
    </div>
    <div style={{padding:'0 20px'}}>
      {/* TASTING STEP 2: Fill tasting form */}
      {mode==='tasting'&&tastingStep===2?<>
        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:16,padding:'14px 16px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)'}}>
          <div style={{width:8,height:48,borderRadius:4,background:robe,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div className="sf" style={{fontSize:18,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{form.name||'Vin'}</div>
            <div style={{fontSize:14,color:'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{form.vintage} · {form.region}{form.appellation?' · '+form.appellation:''}</div>
          </div>
          <button onClick={()=>setTastingStep(1)} style={{fontSize:13,border:0,background:'var(--pm)',padding:'6px 12px',borderRadius:999,cursor:'pointer',color:'var(--bx)'}}>Changer</button>
        </div>
        {/* Inline tasting form — same as the modal but inside ScreenAdd */}
        <SC title="L'œil" ey="Analyse visuelle">
          {[{k:'robeIntensity',l:'Intensité',opts:['pâle','moyenne','soutenue','profonde']},{k:'limpidity',l:'Limpidité',opts:['brillante','limpide','voilée','trouble']},{k:'tears',l:'Larmes',opts:['fines','moyennes','épaisses','grasses']}].map(r=><div key={r.k} style={{marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{r.l}</div>
            <div style={{display:'flex',gap:4}}>{r.opts.map(o=><button key={o} onClick={()=>setTForm(f=>({...f,[r.k]:o}))} style={{flex:1,padding:'7px 4px',borderRadius:10,border:tForm[r.k]===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm[r.k]===o?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',color:tForm[r.k]===o?'var(--bx)':'var(--is)',fontWeight:tForm[r.k]===o?600:400}}>{o}</button>)}</div>
          </div>)}
        </SC>
        <SC title="Le nez" ey="Analyse olfactive">
          <div style={{marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Intensité</div>
            <div style={{display:'flex',gap:4}}>{['fermé','discret','moyen','ouvert','expressif'].map(o=><button key={o} onClick={()=>setTForm(f=>({...f,noseIntensity:o}))} style={{flex:1,padding:'7px 2px',borderRadius:10,border:tForm.noseIntensity===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.noseIntensity===o?'var(--pm)':'var(--cr)',fontSize:11,cursor:'pointer',color:tForm.noseIntensity===o?'var(--bx)':'var(--is)',fontWeight:tForm.noseIntensity===o?600:400}}>{o}</button>)}</div>
          </div>
          <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Arômes</div>
          {AROMA_FAMILIES.map(fam=><div key={fam.f} style={{marginBottom:6}}>
            <div style={{fontSize:12,color:fam.c,fontWeight:600,marginBottom:3}}>{fam.f}</div>
            <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>{fam.a.map(a=>{const sel=(tForm.specificAromas||[]).includes(a);return<button key={a} onClick={()=>setTForm(f=>{const sa=f.specificAromas||[];return{...f,specificAromas:sel?sa.filter(x=>x!==a):[...sa,a]};})} style={{padding:'3px 8px',borderRadius:999,border:sel?`1.5px solid ${fam.c}`:'1px solid var(--ln)',background:sel?fam.c+'15':'var(--cr)',fontSize:11,cursor:'pointer',color:sel?fam.c:'var(--is)',fontWeight:sel?600:400}}>{a}</button>;})}</div>
          </div>)}
        </SC>
        <SC title="La bouche" ey="Analyse gustative">
          {[{k:'attack',l:'Attaque',opts:['molle','souple','franche','vive']},{k:'acidity',l:'Acidité',opts:['plate','fraîche','vive','mordante']},{k:'tannins',l:'Tanins',opts:['fondus','soyeux','fermes','âpres']},{k:'body',l:'Corps',opts:['léger','moyen','charpenté','puissant']},{k:'lengthCaudalies',l:'Longueur',opts:['courte','moyenne','longue','très longue']}].map(r=><div key={r.k} style={{marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{r.l}</div>
            <div style={{display:'flex',gap:4}}>{r.opts.map(o=><button key={o} onClick={()=>setTForm(f=>({...f,[r.k]:o}))} style={{flex:1,padding:'7px 4px',borderRadius:10,border:tForm[r.k]===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm[r.k]===o?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',color:tForm[r.k]===o?'var(--bx)':'var(--is)',fontWeight:tForm[r.k]===o?600:400}}>{o}</button>)}</div>
          </div>)}
        </SC>
        <SC title="Notation" ey="Votre évaluation">
          {[{k:'visual',l:'Œil'},{k:'nose',l:'Nez'},{k:'palate',l:'Bouche'},{k:'balance',l:'Équilibre'},{k:'complexity',l:'Complexité'}].map(sc=><div key={sc.k} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <span style={{fontSize:14,fontWeight:500,width:80}}>{sc.l}</span>
            <div style={{display:'flex',gap:3,flex:1}}>{[1,2,3,4,5].map(v=><button key={v} onClick={()=>{const nf={...tForm,[sc.k]:v};nf.overall=Math.round((nf.visual+nf.nose+nf.palate+nf.balance+nf.complexity)*4/5*10)/10;setTForm(nf);}} style={{flex:1,height:8,borderRadius:4,border:0,cursor:'pointer',background:v<=tForm[sc.k]?'var(--bx)':'var(--pm)'}}/>)}</div>
            <span className="sf" style={{fontSize:16,fontWeight:600,color:'var(--bx)',width:28,textAlign:'right'}}>{tForm[sc.k]}</span>
          </div>)}
          <div style={{textAlign:'center',padding:'4px 0'}}><div className="sf" style={{fontSize:36,fontWeight:600,color:'var(--bx)'}}>{tForm.overall}<span style={{fontSize:18,color:'var(--im)'}}>/20</span></div></div>
        </SC>
        <SC title="Contexte" ey="Circonstances">
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
            {['Apéritif','Dîner','Soirée','Dégustation','Restaurant','Cadeau'].map(o=><button key={o} onClick={()=>setTForm(f=>({...f,occasion:f.occasion===o?'':o}))} style={{padding:'7px 14px',borderRadius:999,border:tForm.occasion===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.occasion===o?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:tForm.occasion===o?'var(--bx)':'var(--is)',fontWeight:tForm.occasion===o?600:400}}>{o}</button>)}
          </div>
          <input type="text" value={tForm.paired} onChange={e=>setTForm(f=>({...f,paired:e.target.value}))} placeholder="Accompagné de..." style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box',marginBottom:8}}/>
          <textarea value={tForm.comments} onChange={e=>setTForm(f=>({...f,comments:e.target.value}))} placeholder="Vos impressions..." rows={3} style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',resize:'none',fontFamily:'inherit',boxSizing:'border-box'}}/>
        </SC>
        {error&&<div style={{fontSize:14,color:'#C0392B',textAlign:'center',padding:'10px',background:'#FDEDEC',borderRadius:12,marginTop:12}}>{error}</div>}
        <button onClick={handleTastingSave} disabled={saving} style={{width:'100%',padding:'16px 0',border:0,borderRadius:999,background:saving?'var(--pm)':'linear-gradient(180deg,#27ae60 0%,#1e8449 100%)',color:saving?'var(--is)':'#fff',fontSize:17,fontWeight:600,cursor:saving?'wait':'pointer',boxShadow:'0 4px 14px rgba(39,174,96,.3)',marginTop:16}}>
          {saving?'Enregistrement...':'Enregistrer la dégustation'}
        </button>
      </>:
      <>
      {!isEdit&&<>
        {/* Fullscreen camera overlay */}
        {showCamera&&<div style={{position:'fixed',inset:0,zIndex:100,background:'#000',display:'flex',flexDirection:'column'}}>
          <video ref={videoRef} playsInline autoPlay muted style={{flex:1,objectFit:'cover',width:'100%'}}/>
          <div style={{position:'absolute',top:16,left:16,right:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <button onClick={stopCamera} style={{width:40,height:40,borderRadius:'50%',border:0,background:'rgba(0,0,0,.5)',color:'#fff',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
            <div style={{color:'#fff',fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',background:'rgba(0,0,0,.4)',padding:'6px 14px',borderRadius:999}}>Cadrez l'étiquette</div>
          </div>
          {/* Viewfinder frame */}
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'70%',maxWidth:280,aspectRatio:'3/4',border:'2px solid rgba(255,255,255,.6)',borderRadius:16,pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px 0 40px',display:'flex',justifyContent:'center',background:'linear-gradient(transparent,rgba(0,0,0,.7))'}}>
            <button onClick={capturePhoto} style={{width:72,height:72,borderRadius:'50%',border:'4px solid #fff',background:'rgba(255,255,255,.2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'#fff'}}/>
            </button>
          </div>
        </div>}

        {/* Scan result panel */}
        {(scanPreview||scanMsg)&&!showCamera&&<div style={{background:'var(--sr)',borderRadius:18,padding:14,marginBottom:14,boxShadow:'var(--sh)',border:'0.5px solid var(--ln)'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            {scanPreview&&<img src={scanPreview} alt="" style={{width:56,height:56,borderRadius:10,objectFit:'cover',border:'1px solid var(--ln)'}}/>}
            <div style={{flex:1,fontSize:16,color:scanMsg.startsWith('✓')?'#27ae60':scanMsg.startsWith('Erreur')||scanMsg.startsWith('Caméra')?'#C0392B':'var(--bx)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.4,display:'flex',alignItems:'center',gap:8}}>
              {scanning&&<span style={{display:'inline-block',width:14,height:14,border:'2px solid var(--bx)',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',flexShrink:0}}/>}
              {scanMsg}
            </div>
            {!scanning&&scanMsg&&<button onClick={()=>{setScanPreview(null);setScanMsg('');setScanMatches([]);}} style={{width:28,height:28,borderRadius:'50%',border:'1px solid var(--ln)',background:'var(--cr)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'var(--im)',flexShrink:0}}>✕</button>}
          </div>
          {scanMatches.length>0&&<div style={{marginTop:12}}>
            <div className="sc" style={{fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Enrichir depuis le catalogue ?</div>
            {scanMatches.map((w,i)=><button key={w.id||i} onClick={()=>pickScanMatch(w)} style={{width:'100%',border:0,padding:'10px 12px',background:i===0?'var(--pm)':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,textAlign:'left',borderBottom:'0.5px solid var(--ln)',borderRadius:i===0?12:0}}>
              <div style={{width:5,height:28,borderRadius:3,background:COLORS.find(c=>c.id===w.color)?.robe||'#6B1E2C',flexShrink:0}}/>
              <div style={{flex:1}}><div className="sf" style={{fontSize:15,fontWeight:i===0?600:400}}>{w.name}</div><div style={{fontSize:12,color:'var(--im)'}}>{w.region}{w.appellation?' · '+w.appellation:''}</div></div>
              <span style={{fontSize:12,color:'var(--g)',fontWeight:500}}>Enrichir</span>
            </button>)}
          </div>}
        </div>}

        {/* 3 scan buttons */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
          <button onClick={openCamera} disabled={scanning} style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',color:scanning?'var(--is)':'var(--cr)',fontSize:13,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:scanning?'none':'0 4px 12px rgba(107,30,44,.2)',display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            Photo
          </button>
          <label style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'var(--sr)',color:scanning?'var(--im)':'var(--bx)',fontSize:13,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:'var(--sh)',border:'1px solid var(--ln)',display:'flex',flexDirection:'column',alignItems:'center',gap:5,position:'relative',overflow:'hidden'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            Galerie
            <input type="file" accept="image/*" onChange={handleFileInput} onInput={handleFileInput} disabled={scanning} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}}/>
          </label>
          <label style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'var(--sr)',color:scanning?'var(--im)':'var(--bx)',fontSize:13,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:'var(--sh)',border:'1px solid var(--ln)',display:'flex',flexDirection:'column',alignItems:'center',gap:5,position:'relative',overflow:'hidden'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 5v-2h4M17 3h4v2M3 19v2h4M17 21h4v-2"/><path d="M4 7v10M8 7v10M11 7v10M15 7v10M19 7v10" strokeWidth="1.5"/></svg>
            Code-barres
            <input type="file" accept="image/*" onChange={handleBarcode} onInput={handleBarcode} disabled={scanning} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}}/>
          </label>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </>}
      {/* Catalog search (add mode only) */}
      {!isEdit&&<div style={{position:'relative',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'13px 16px',borderRadius:999,background:'var(--sr)',boxShadow:'var(--sh)'}}>
          <IcSearch sz={16} c="var(--im)"/>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher dans le catalogue..."
            style={{flex:1,border:0,background:'transparent',outline:'none',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:17,color:'var(--ink)'}}/>
          {searching&&<span style={{fontSize:14,color:'var(--im)'}}>...</span>}
        </div>
        {results.length>0&&<div style={{position:'absolute',top:'100%',left:0,right:0,zIndex:10,background:'var(--sr)',borderRadius:18,boxShadow:'0 8px 24px rgba(0,0,0,.15)',marginTop:6,maxHeight:240,overflow:'auto'}}>
          {results.map((w,i)=><button key={w.id||w.barcode||i} onClick={()=>pickCatalog(w)} style={{width:'100%',border:0,padding:'12px 16px',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:12,textAlign:'left',borderBottom:'0.5px solid var(--ln)'}}>
            <div style={{width:6,height:36,borderRadius:3,background:COLORS.find(c=>c.id===w.color)?.robe||'#6B1E2C',flexShrink:0}}/>
            <div style={{flex:1}}>
              <div className="sf" style={{fontSize:17,fontWeight:500}}>{w.name}</div>
              <div style={{fontSize:13,color:'var(--im)'}}>
                {w.region}{w.subRegion?' — '+w.subRegion:''}{w.cuvee?' · '+w.cuvee:''}{w.appellation?' · '+w.appellation:''}
              </div>
              {w.classification&&<div style={{fontSize:11,color:'var(--bx)',fontWeight:600,marginTop:2}}>{w.classification}</div>}
            </div>
            {srcLabel(w)&&<span style={{fontSize:11,padding:'3px 7px',borderRadius:999,background:srcColor(w)+'18',color:srcColor(w),fontWeight:600,letterSpacing:'.05em',flexShrink:0}}>{srcLabel(w)}</span>}
          </button>)}
        </div>}
      </div>}
      {/* Confirmation card when wine is pending */}
      {pendingWine&&<div style={{padding:'16px 18px',background:'linear-gradient(140deg,var(--bx)08,var(--pm))',borderRadius:20,boxShadow:'var(--sh)',marginBottom:16,border:'1.5px solid var(--bx)22'}}>
        <div className="sc" style={{fontSize:10,color:'var(--bx)',opacity:.7,marginBottom:10}}>Est-ce bien ce vin ?</div>
        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:14}}>
          <div style={{width:8,height:48,borderRadius:4,background:COLORS.find(c=>c.id===(pendingWine.color||'rouge'))?.robe||'var(--bx)',flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div className="sf" style={{fontSize:18,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{pendingWine.name||'—'}</div>
            <div style={{fontSize:14,color:'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{pendingWine.region||''}{pendingWine.appellation?' · '+pendingWine.appellation:''}</div>
            {pendingWine.cuvee&&<div style={{fontSize:13,color:'var(--is)',marginTop:2}}>{pendingWine.cuvee}</div>}
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={rejectWine} style={{flex:1,padding:'12px',border:'1px solid var(--ln)',borderRadius:14,background:'var(--cr)',color:'var(--im)',fontSize:15,fontWeight:500,cursor:'pointer'}}>✕ Non, changer</button>
          <button onClick={()=>confirmWine(pendingWine)} style={{flex:1,padding:'12px',border:0,borderRadius:14,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:'pointer'}}>✓ Oui, c'est lui</button>
        </div>
      </div>}
      {/* Preview — only when confirmed or manual entry */}
      {!pendingWine&&<div style={{display:'flex',alignItems:'center',gap:14,padding:'16px 18px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)',marginBottom:16}}>
        <div style={{width:8,height:48,borderRadius:4,background:robe,flexShrink:0}}/>
        <div style={{flex:1,minWidth:0}}>
          <div className="sf" style={{fontSize:18,fontWeight:500,lineHeight:1.2,color:form.name?'var(--ink)':'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{form.name||'Nom du domaine'}</div>
          <div style={{fontSize:14,color:'var(--im)',marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{form.region} · {form.vintage}{form.cuvee?' · '+form.cuvee:''}</div>
        </div>
        {confirmed&&<button onClick={changeWine} style={{padding:'6px 12px',borderRadius:999,border:'1px solid var(--ln)',background:'var(--cr)',fontSize:12,color:'var(--bx)',fontWeight:500,cursor:'pointer',flexShrink:0}}>Changer</button>}
        {!confirmed&&<div className="sf" style={{fontSize:18,fontWeight:600,color:'var(--bx)'}}>×{form.quantity}</div>}
      </div>}

      <SC title="Identité" ey="Le vin">
        {inp('Domaine / Château *','name','text','Ex: Château Margaux')}
        {inp('Cuvée','cuvee','text','Ex: Grand Vin')}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('Millésime','vintage','number','2023')}
          {inp('Appellation','appellation','text','Ex: Pauillac')}
        </div>
      </SC>

      <SC title="Couleur" ey="Type">
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {COLORS.map(c=><button key={c.id} onClick={()=>up('color',c.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',borderRadius:999,border:form.color===c.id?'2px solid var(--bx)':'1.5px solid var(--ln)',background:form.color===c.id?'var(--pm)':'var(--cr)',cursor:'pointer',transition:'all .15s'}}>
            <div style={{width:12,height:12,borderRadius:6,background:c.robe}}/>
            <span style={{fontSize:15,fontWeight:form.color===c.id?600:400,color:form.color===c.id?'var(--bx)':'var(--is)'}}>{c.label}</span>
          </button>)}
        </div>
      </SC>

      <SC title="Origine" ey="Région">
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {REGIONS.map(r=><button key={r} onClick={()=>up('region',r)} style={{padding:'7px 12px',borderRadius:999,border:form.region===r?'2px solid var(--bx)':'1.5px solid var(--ln)',background:form.region===r?'var(--pm)':'var(--cr)',cursor:'pointer',fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontWeight:form.region===r?600:400,color:form.region===r?'var(--bx)':'var(--is)'}}>{r}</button>)}
        </div>
      </SC>

      <SC title="Détails" ey="Caractéristiques">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('Prix (€)','price','number','35')}
          <div style={{marginBottom:14}}>
            <label className="sc" style={{display:'block',fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Quantité</label>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <button onClick={()=>up('quantity',Math.max(1,form.quantity-1))} style={{width:40,height:42,borderRadius:12,border:'1px solid var(--ln)',background:'var(--cr)',fontSize:20,cursor:'pointer',color:'var(--bx)'}}>−</button>
              <span className="sf" style={{fontSize:22,fontWeight:600,minWidth:28,textAlign:'center'}}>{form.quantity}</span>
              <button onClick={()=>up('quantity',form.quantity+1)} style={{width:40,height:42,borderRadius:12,border:'1px solid var(--ln)',background:'var(--cr)',fontSize:20,cursor:'pointer',color:'var(--bx)'}}>+</button>
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('Alcool (%)','alcohol','number','13.5')}
          {inp('Score (/100)','score','number','92')}
        </div>
      </SC>

      <SC title="Emplacement en cave" ey="Localisation">
        <input type="text" value={form.location||''} onChange={e=>up('location',e.target.value)} placeholder="Ex : Rangée 3, étagère B, position 12"
          style={{width:'100%',padding:'12px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',boxSizing:'border-box'}}/>
      </SC>

      <SC title="Fenêtre de garde" ey="Apogée">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('À partir de','peakFrom','number','2028')}
          {inp('Jusqu\'à','peakTo','number','2040')}
        </div>
      </SC>

      <SC title="Arômes" ey="Nez — sélectionnez les arômes">
        {AROMA_FAMILIES.map(fam=><div key={fam.f} style={{marginBottom:10}}>
          <div style={{fontSize:13,color:fam.c,fontWeight:600,marginBottom:4}}>{fam.f}</div>
          <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
            {fam.a.map(a=>{const sel=(richData.aromas||[]).includes(a);return<button key={a} onClick={()=>setRichData(rd=>({...rd,aromas:sel?(rd.aromas||[]).filter(x=>x!==a):[...(rd.aromas||[]),a]}))} style={{padding:'4px 9px',borderRadius:999,border:sel?`1.5px solid ${fam.c}`:'1px solid var(--ln)',background:sel?fam.c+'15':'var(--cr)',fontSize:12,cursor:'pointer',color:sel?fam.c:'var(--is)',fontWeight:sel?600:400}}>{a}</button>;})}
          </div>
        </div>)}
        {(richData.aromas||[]).length>0&&<div style={{marginTop:8,padding:'10px 14px',background:'var(--pm)',borderRadius:12,fontSize:14,color:'var(--bx)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
          Nez : {(richData.aromas||[]).join(', ')}
        </div>}
      </SC>

      <SC title="Accords mets & vins" ey="À table — sélectionnez les accords">
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {ALL_PAIRINGS.map(p=>{const sel=(richData.pairings||[]).includes(p);return<button key={p} onClick={()=>setRichData(rd=>({...rd,pairings:sel?(rd.pairings||[]).filter(x=>x!==p):[...(rd.pairings||[]),p]}))} style={{padding:'5px 10px',borderRadius:999,border:sel?'1.5px solid var(--bx)':'1px solid var(--ln)',background:sel?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:sel?'var(--bx)':'var(--is)',fontWeight:sel?600:400}}>{p}</button>;})}
        </div>
      </SC>

      <SC title="Service" ey="Conseils de dégustation">
        <div style={{marginBottom:14}}>
          <label className="sc" style={{display:'block',fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Température</label>
          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
            {TEMPS.map(t=>{const sel=(richData.service?.temp||'')===t;return<button key={t} onClick={()=>setRichData(rd=>({...rd,service:{...(rd.service||{}),temp:t}}))} style={{padding:'7px 12px',borderRadius:999,border:sel?'1.5px solid var(--bx)':'1px solid var(--ln)',background:sel?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:sel?'var(--bx)':'var(--is)',fontWeight:sel?600:400}}>{t}</button>;})}
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label className="sc" style={{display:'block',fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Type de verre</label>
          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
            {GLASSES.map(g=>{const sel=(richData.service?.glass||richData.service?.verre||'')===g;return<button key={g} onClick={()=>setRichData(rd=>({...rd,service:{...(rd.service||{}),glass:g}}))} style={{padding:'7px 12px',borderRadius:999,border:sel?'1.5px solid var(--bx)':'1px solid var(--ln)',background:sel?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:sel?'var(--bx)':'var(--is)',fontWeight:sel?600:400}}>{g}</button>;})}
          </div>
        </div>
        <div>
          <label className="sc" style={{display:'block',fontSize:11,color:'var(--bx)',opacity:.7,marginBottom:6}}>Carafage</label>
          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
            {CARAFES.map(c=>{const sel=(richData.service?.carafe||'')===c;return<button key={c} onClick={()=>setRichData(rd=>({...rd,service:{...(rd.service||{}),carafe:c}}))} style={{padding:'7px 12px',borderRadius:999,border:sel?'1.5px solid var(--bx)':'1px solid var(--ln)',background:sel?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:sel?'var(--bx)':'var(--is)',fontWeight:sel?600:400}}>{c}</button>;})}
          </div>
        </div>
      </SC>

      <SC title="Notes personnelles" ey="Impressions">
        <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} placeholder="Vos impressions, le contexte de dégustation..."
          style={{width:'100%',minHeight:80,padding:'13px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:17,background:'var(--cr)',outline:'none',color:'var(--ink)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',resize:'vertical',boxSizing:'border-box'}}/>
      </SC>

      {error&&<div style={{fontSize:15,color:'#C0392B',textAlign:'center',padding:'12px',background:'#FDEDEC',borderRadius:14,marginTop:16}}>{error}</div>}

      <button onClick={handleSave} disabled={saving} style={{width:'100%',padding:'16px 0',border:0,borderRadius:999,background:saving?'var(--im)':'linear-gradient(180deg,var(--bs) 0%,var(--bx) 100%)',color:'var(--cr)',fontSize:17,fontWeight:600,cursor:saving?'wait':'pointer',boxShadow:'0 6px 20px rgba(107,30,44,.35)',marginTop:20,marginBottom:20}}>
        {saving?'Enregistrement...':isEdit?'Enregistrer les modifications':mode==='tasting'?'Commencer la dégustation':mode==='wishlist'?'Ajouter à la wishlist':'Ajouter à ma cave'}
      </button>
      </>}
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// NORMALIZE: Supabase snake_case → frontend camelCase
// ═══════════════════════════════════════════════════════════════
const str=(v)=>typeof v==='object'?'':v||'';
const num=(v)=>typeof v==='object'?0:Number(v)||0;

// Map individual aromas to wheel families
const AROMA_WHEEL_MAP={
  Fruit:['cassis','cerise','framboise','pomme','agrumes','fruits','poire','pêche','abricot','mûre','fraise','groseille','prune','figue','mangue','ananas','litchi','coing','pomme verte','citron','pamplemousse','orange','fruit de la passion','confiture','fruits rouges','fruits noirs','fruits exotiques','fruits secs'],
  Floral:['rose','violette','acacia','jasmin','tilleul','pivoine','fleur blanche','fleur','iris','genêt','sureau','aubépine','chèvrefeuille','lavande'],
  Épicé:['poivre','cannelle','vanille','réglisse','clou de girofle','muscade','épices','anis','safran','gingembre','cardamome','poivre noir','poivre blanc','épices douces'],
  Boisé:['chêne','cèdre','tabac','café','cacao','grillé','toast','boisé','chocolat','pain grillé','caramel','noisette','amande','noix','brioche'],
  Minéral:['silex','craie','pierre','iode','graphite','minéralité','ardoise','pierre à fusil','caillou','sel','fumée','minéral','pétrole'],
  Végétal:['herbe','fougère','sous-bois','mousse','champignon','truffe','buis','foin','menthe','eucalyptus','poivron','poivron vert','garrigue','thym','romarin','laurier','maquis'],
  Animal:['cuir','gibier','fourrure','musc','viande','lard','fumé','lard fumé'],
};

function aromasToWheel(aromas){
  if(!Array.isArray(aromas)||aromas.length===0)return{};
  const scores={};
  for(const[family,keywords]of Object.entries(AROMA_WHEEL_MAP)){
    const matches=aromas.filter(a=>keywords.some(k=>a.toLowerCase().includes(k)||k.includes(a.toLowerCase())));
    if(matches.length>0)scores[family]=Math.min(100,Math.round((matches.length/aromas.length)*150+30));
  }
  // Ensure at least 3 families for a nice wheel
  if(Object.keys(scores).length<3){
    for(const fam of['Fruit','Floral','Minéral']){
      if(!scores[fam])scores[fam]=20;
    }
  }
  return scores;
}

function normB(b){
  const aromas=Array.isArray(b.aromas)?b.aromas:[];
  let aromaW=typeof b.aroma_wheel==='object'&&b.aroma_wheel&&Object.keys(b.aroma_wheel).length>0?b.aroma_wheel:typeof b.aromaW==='object'&&b.aromaW&&Object.keys(b.aromaW).length>0?b.aromaW:null;
  if(!aromaW&&aromas.length>0)aromaW=aromasToWheel(aromas);
  return{...b,peakFrom:num(b.peak_from||b.peakFrom),peakTo:num(b.peak_to||b.peakTo),aromaW:aromaW||{},aromas,cepages:Array.isArray(b.cepages)?b.cepages:[],pairings:Array.isArray(b.pairings)?b.pairings:[],service:typeof b.service==='object'&&b.service?b.service:{},estate:typeof b.estate==='object'&&b.estate?b.estate:{},friends:Array.isArray(b.friends)?b.friends:[],tags:Array.isArray(b.tags)?b.tags:[],quantity:num(b.quantity)||1,price:num(b.price),score:num(b.score),communityRating:num(b.communityRating)||4.2,communityCount:num(b.communityCount),notes:str(b.notes),location:str(b.location),robe:str(b.robe)||'#6B1E2C',name:str(b.name),cuvee:str(b.cuvee),region:str(b.region),appellation:str(b.appellation),color:str(b.color)||'rouge',alcohol:num(b.alcohol)};
}

// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
const CSS_LIGHT = {'--bx':'#6B1E2C','--bd':'#4A1520','--bs':'#8B3545','--cr':'#FAF6EE','--pm':'#EFE4D2','--bg':'#F5EDE0','--g':'#C8A96A','--gs':'#D4B896','--ink':'#2A1F1F','--is':'#5A4A4A','--im':'#8B7A7A','--ln':'rgba(42,31,31,.08)','--ls':'rgba(42,31,31,.14)','--sr':'#FFFFFF','--sh':'0 1px 2px rgba(74,21,32,.04),0 2px 6px rgba(74,21,32,.04)'};
const CSS_DARK = {'--bx':'#D4A0A8','--bd':'#E8C0C8','--bs':'#C08090','--cr':'#1A1215','--pm':'#261C20','--bg':'#221820','--g':'#D4B896','--gs':'#C8A06A','--ink':'#F0E8E0','--is':'#D0C0B8','--im':'#A09088','--ln':'rgba(245,237,224,.1)','--ls':'rgba(245,237,224,.14)','--sr':'#302428','--sh':'0 1px 3px rgba(0,0,0,.3),0 2px 8px rgba(0,0,0,.2)'};

export default function App() {
  const { user, profile, loading, signOut } = useAuth();
  const [tab,setTab]=useState(()=>sessionStorage.getItem('cave_tab')||'cave');
  const [bottle,setBottle]=useState(null);
  const [bottles,setBottles]=useState(()=>{
    try{const c=localStorage.getItem('cave_bottles');return c?JSON.parse(c).map(normB):[];}catch(e){return[];}
  });
  const [loadingB,setLoadingB]=useState(true);
  const [showAdd,setShowAdd]=useState(()=>sessionStorage.getItem('cave_showAdd')==='1');
  const [editBottle,setEditBottle]=useState(null);
  const [tastings,setTastings]=useState([]);
  const [wishlist,setWishlist]=useState([]);
  const [caveTab,setCaveTab]=useState('vins');
  const [showActionMenu,setShowActionMenu]=useState(false);
  const [addMode,setAddMode]=useState('cave'); // cave, tasting, wishlist
  const [exploreView,setExploreView]=useState('home'); // home, map, guide
  const [dark,setDark]=useState(()=>localStorage.getItem('cave_dark')==='1');
  const CSS_VARS=dark?CSS_DARK:CSS_LIGHT;
  const toggleDark=()=>{setDark(d=>{localStorage.setItem('cave_dark',d?'0':'1');return!d;});};
  const [tastingBottle,setTastingBottle]=useState(null); // open from cave
  const [freeTasting,setFreeTasting]=useState(false); // free tasting mode
  const [editTasting,setEditTasting]=useState(null); // editing existing tasting
  const initTF=()=>({
    wineName:'',wineVintage:'',wineRegion:'',wineColor:'rouge',
    robeColor:'',robeIntensity:'moyenne',limpidity:'limpide',tears:'moyennes',
    noseIntensity:'moyen',noseAromas:[],specificAromas:[],noseDefects:'',
    attack:'franche',acidity:'fraîche',tannins:'soyeux',body:'moyen',
    lengthCaudalies:'moyenne',
    visual:3,nose:3,palate:3,balance:3,complexity:3,overall:12,
    occasion:'',paired:'',comments:'',potential:'à boire',
  });
  const [tForm,setTForm]=useState(initTF());
  const [tSaving,setTSaving]=useState(false);
  const [confirmClose,setConfirmClose]=useState(false);
  const [tastingSearch,setTastingSearch]=useState('');
  const [tastingResults,setTastingResults]=useState([]);
  const [pendingTasting,setPendingTasting]=useState(null); // bottle data waiting for tasting form

  // When pendingTasting is set, open tasting modal (deferred to avoid unmount race)
  useEffect(()=>{
    if(pendingTasting){
      setFreeTasting(true);
      setTForm({...initTF(),
        wineName:pendingTasting.name||'',
        wineVintage:pendingTasting.vintage||'',
        wineRegion:pendingTasting.region||'',
        wineColor:pendingTasting.color||'rouge',
      });
      setPendingTasting(null);
    }
  },[pendingTasting]);
  const closeTasting=()=>{
    if(tForm.comments||tForm.specificAromas?.length>0||tForm.robeColor){setConfirmClose(true);}
    else{setTastingBottle(null);setFreeTasting(false);setEditTasting(null);setTForm(initTF());setTastingSearch('');setTastingResults([]);}
  };
  const forceCloseTasting=()=>{setConfirmClose(false);setTastingBottle(null);setFreeTasting(false);setEditTasting(null);setTForm(initTF());setTastingSearch('');setTastingResults([]);};
  // Keep localStorage cache in sync
  const updateBottles=(data)=>{
    const b=(data||[]).map(normB);
    setBottles(b);
    try{localStorage.setItem('cave_bottles',JSON.stringify(data||[]));}catch(e){}
    return b;
  };
  const [guideKey,setGuideKey]=useState(0);

  // Navigation with history API (back button support)
  const nav=s=>{
    setBottle(null);setShowAdd(false);setEditBottle(null);setShowActionMenu(false);
    if(s===tab){
      setGuideKey(k=>k+1);
      if(s==='cave')setCaveTab('vins');
      if(s==='explore')setExploreView('home');
    }
    setTab(s);
    sessionStorage.setItem('cave_tab',s);
    window.history.pushState({tab:s},'');
  };
  const openBottleDetail=(b)=>{setBottle(b);window.history.pushState({tab,bottle:true},'');};
  const openAdd=(mode)=>{setAddMode(mode||'cave');setShowAdd(true);setShowActionMenu(false);window.history.pushState({tab,add:true},'');};

  // Handle hardware/swipe back button
  useEffect(()=>{
    window.history.replaceState({tab},'');
    const onPop=(e)=>{
      const state=e.state;
      if(state?.tab){
        setTab(state.tab);setBottle(null);setShowAdd(false);setEditBottle(null);
      }else if(bottle){
        setBottle(null);
      }else if(showAdd){
        setShowAdd(false);setEditBottle(null);
      }else{
        // Push state again to prevent app close
        window.history.pushState({tab},'');
      }
    };
    window.addEventListener('popstate',onPop);
    return()=>window.removeEventListener('popstate',onPop);
  },[tab,bottle,showAdd]);

  // Persist showAdd
  useEffect(()=>{sessionStorage.setItem('cave_showAdd',showAdd?'1':'0');},[showAdd]);

  // Hide splash screen when data is ready
  useEffect(()=>{if(!loading&&!loadingB&&window.__hideSplash)window.__hideSplash();},[loading,loadingB]);

  // Persist tab to sessionStorage
  useEffect(()=>{sessionStorage.setItem('cave_tab',tab);},[tab]);

  // Fetch bottles + auto-seed catalog on login
  useEffect(()=>{
    if(!user){setBottles([]);setLoadingB(false);return;}
    setLoadingB(true);
    // Show cached bottles instantly, fetch fresh in background
    const cached=localStorage.getItem('cave_bottles');
    if(cached){try{setBottles(JSON.parse(cached).map(normB));setLoadingB(false);}catch(e){}}
    fetchBottles(user.id).then(({data})=>{
      const b=(data||[]).map(normB);
      setBottles(b);
      setLoadingB(false);
      try{localStorage.setItem('cave_bottles',JSON.stringify(data||[]));}catch(e){}
    });
    // Fetch tastings + wishlist + seed catalog in background
    fetchTastings(user.id).then(({data})=>setTastings(data||[])).catch(()=>{});
    fetchWishlist(user.id).then(({data})=>setWishlist(data||[])).catch(()=>{});
    ensureCatalogSeeded().catch(()=>{});
  },[user]);

  // Loading
  if (loading||loadingB) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:dark?'#1A1215':'#FAF6EE',color:dark?'#F0E8E0':'#2A1F1F',...CSS_VARS}}>
    <div style={{textAlign:'center'}}>
      <img src="/logo.png" alt="" style={{width:64,height:64,marginBottom:10,opacity:.8}}/>
      <div className="sf" style={{fontSize:36,color:'var(--bx)',letterSpacing:'.08em'}}>CAVE</div>
    </div>
  </div>;

  // Not logged in
  if (!user) {
    if(window.__hideSplash)window.__hideSplash();
    return <div style={{...CSS_VARS,color:'var(--ink)'}}><style>{`
    .sf{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;letter-spacing:.01em}
    .sc{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:500}
    input::placeholder{color:var(--im)}
  `}</style><ScreenAuth/></div>;
  }

  // Seed demo bottles and refresh
  const handleSeed=async()=>{
    if(!user)return;
    await seedDemoData(user.id);
    const {data}=await fetchBottles(user.id);
    updateBottles(data);
  };

  // Add or update a bottle
  const handleAdd=async(bottle,bottleId)=>{
    if(!user)return false;
    let result;
    if(bottleId){
      result=await updateBottle(bottleId,bottle);
      const{notes:_n,location:_l,...catalogData}=bottle;
      await upsertToCatalog(user.id,catalogData);
    }else{
      // Check if this bottle already exists in the user's cave (same name + vintage)
      const existing=bottles.find(b=>b.name===bottle.name&&b.vintage===bottle.vintage&&b.cuvee===(bottle.cuvee||''));
      if(existing){
        // Update existing bottle instead of creating duplicate
        result=await updateBottle(existing.id,{...bottle,quantity:(existing.quantity||0)+(bottle.quantity||1)});
      }else{
        result=await addBottle(user.id,bottle);
      }
      const{notes:_n,location:_l,...catalogData}=bottle;
      await upsertToCatalog(user.id,catalogData);
    }
    if(result.error)return false;
    const res=await fetchBottles(user.id);
    updateBottles(res.data);const updated=(res.data||[]).map(normB);
    setBottle(null);setEditBottle(null);
    return true;
  };

  // Edit: open form pre-filled
  const handleEdit=(b)=>{
    setBottle(null);
    setEditBottle(b);
    setShowAdd(true);
    window.history.pushState({tab,add:true},'');
  };

  // Delete a bottle
  const handleDelete=async(bottleId)=>{
    if(!user)return;
    await deleteBottle(bottleId);
    const res=await fetchBottles(user.id);
    updateBottles(res.data);
    setBottle(null);
  };

  // Open a bottle → create tasting + decrement qty
  const handleOpen=async(b,tData)=>{
    if(tData){
      if(!user)return;
      setTSaving(true);
      const wasFree=!b&&!editTasting;
      const tastingData={
        score_visual:tData.visual||0,score_nose:tData.nose||0,score_palate:tData.palate||0,
        score_overall:tData.overall||0,comments:tData.comments||'',
        occasion:tData.occasion||'',paired_with:tData.paired||'',
        visual_notes:`Robe: ${tData.robeColor||'—'}, Intensité: ${tData.robeIntensity}, Limpidité: ${tData.limpidity}, Larmes: ${tData.tears}`,
        nose_notes:`Intensité: ${tData.noseIntensity}. Familles: ${(tData.noseAromas||[]).join(', ')||'—'}. Arômes: ${(tData.specificAromas||[]).join(', ')||'—'}${tData.noseDefects&&tData.noseDefects!=='Aucun'?' — Défaut: '+tData.noseDefects:''}`,
        palate_notes:`Attaque: ${tData.attack}, Acidité: ${tData.acidity}${tData.tannins&&tData.tannins!=='—'?', Tanins: '+tData.tannins:''}, Corps: ${tData.body}, Longueur: ${tData.lengthCaudalies}. Potentiel: ${tData.potential||'—'}`,
        aromas:tData.specificAromas||[],
      };
      try{
        if(editTasting){
          const {error}=await updateTasting(editTasting.id,tastingData);
          if(error)console.error('updateTasting error:',error);
        }else if(b){
          const {data,newQty}=await openBottle(user.id,b);
          if(data?.id){const {error}=await updateTasting(data.id,tastingData);if(error)console.error('updateTasting error:',error);}
          const res=await fetchBottles(user.id);
          updateBottles(res.data);
          setBottle(prev=>prev?{...prev,quantity:newQty}:null);
        }else{
          // Free tasting — always save (freeTasting or not)
          const {data,error}=await addTasting(user.id,{
            name:tData.wineName||'Vin inconnu',vintage:parseInt(tData.wineVintage)||null,
            region:tData.wineRegion||'',color:tData.wineColor||'rouge',
            ...tastingData,
          });
          if(error){console.error('addTasting error:',error);alert('Erreur: '+error.message);}
          else console.log('Tasting saved:',data);
        }
      }catch(e){console.error('handleOpen error:',e);}
      const tres=await fetchTastings(user.id);
      setTastings(tres.data||[]);
      setTSaving(false);setTastingBottle(null);setFreeTasting(false);setEditTasting(null);
      setTForm(initTF());setTastingSearch('');setTastingResults([]);
      // Navigate to feed to show the new tasting
      if(wasFree){setTab('feed');sessionStorage.setItem('cave_tab','feed');}
    }else{
      setTastingBottle(b);
    }
  };

  // Open free tasting form
  // Edit existing tasting
  const openEditTasting=(t)=>{
    setEditTasting(t);
    setTForm({
      wineName:t.name||'',wineVintage:t.vintage||'',wineRegion:t.region||'',wineColor:t.color||'rouge',
      robeIntensity:'moyenne',limpidity:'limpide',tears:'moyennes',
      noseIntensity:'moyen',noseAromas:(t.aromas||[]),noseDefects:'',
      attack:'franche',acidity:'fraîche',tannins:'soyeux',body:'moyen',lengthCaudalies:'moyenne',
      visual:t.score_visual||3,nose:t.score_nose||3,palate:t.score_palate||3,
      balance:3,complexity:3,overall:t.score_overall||12,
      occasion:t.occasion||'',paired:t.paired_with||'',comments:t.comments||'',potential:'à boire',
    });
  };

  return <div style={{maxWidth:430,margin:'0 auto',fontFamily:"'Inter',-apple-system,sans-serif",WebkitFontSmoothing:'antialiased',minHeight:'100vh',background:'var(--cr)',color:'var(--ink)',overflowX:'hidden',...CSS_VARS}}>
    <style>{`
      .sf{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;letter-spacing:.01em}
      .sc{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:500}
      ::-webkit-scrollbar{width:0;height:0}
      input::placeholder{color:var(--im)}
      html,body{overflow-x:hidden;-webkit-text-size-adjust:100%}
      *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
    `}</style>
    {showAdd?<ErrorBoundary onReset={()=>{setShowAdd(false);setEditBottle(null);setAddMode('cave');}}><ScreenAdd onBack={()=>{setShowAdd(false);setEditBottle(null);setAddMode('cave');sessionStorage.removeItem('cave_addForm');sessionStorage.removeItem('cave_addRich');sessionStorage.removeItem('cave_scanMsg');sessionStorage.removeItem('cave_showAdd');window.history.back();}} onSave={handleAdd} editBottle={editBottle} addMode={addMode} user={user} onTasting={(b)=>{setShowAdd(false);setPendingTasting(b);}} onWishlist={async(bottle)=>{if(user){await addToWishlist(user.id,{name:bottle.name,cuvee:bottle.cuvee||'',region:bottle.region||'',appellation:bottle.appellation||'',color:bottle.color||'rouge',price_estimate:bottle.price||null,notes:bottle.notes||''});const r=await fetchWishlist(user.id);setWishlist(r.data||[]);setShowAdd(false);setAddMode('cave');window.history.back();return true;}return false;}} onSaveTasting={async(td)=>{if(!user)return false;const{data,error}=await addTasting(user.id,td);if(error){alert('Erreur: '+error.message);return false;}const tres=await fetchTastings(user.id);setTastings(tres.data||[]);setShowAdd(false);setAddMode('cave');setTab('feed');sessionStorage.setItem('cave_tab','feed');window.history.back();return true;}}/></ErrorBoundary>:
    bottle?<ErrorBoundary onReset={()=>setBottle(null)}><ScreenBottle bottle={bottle} onBack={()=>{setBottle(null);window.history.back();}} onEdit={handleEdit} onDelete={handleDelete} onOpen={handleOpen}/></ErrorBoundary>:<>
      {tab==='cave'&&<ScreenHome onSel={openBottleDetail} onNav={nav} bottles={bottles} profile={profile} onSeed={handleSeed} tastings={tastings} wishlist={wishlist} setWishlist={setWishlist} user={user} caveTab={caveTab} setCaveTab={setCaveTab} openAdd={openAdd}/>}
      {tab==='explore'&&(exploreView==='map'?<ScreenMapFull onSel={openBottleDetail} bottles={bottles} onBack={()=>setExploreView('home')}/>:exploreView==='guide'?<ScreenGuide bottles={bottles} resetKey={guideKey} onBack={()=>setExploreView('home')}/>:exploreView==='places'?<ScreenPlaces user={user} onBack={()=>setExploreView('home')}/>:
        <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
          <PH ey="Découvrir" title={<span>Explorer<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>le vin</span></span>}/>
          <div style={{padding:'8px 16px 0'}}>
            {[{icon:<IcMap sz={28} c="#fff"/>,title:'Carte des régions',desc:'Appellations, domaines, terroirs',gradient:'linear-gradient(140deg,#3A5040,#1A2820)',onClick:()=>setExploreView('map')},
              {icon:<IcBook sz={28} c="#fff"/>,title:'Guide & Sommelier IA',desc:'Cépages, dégustation, accords, questions',gradient:'linear-gradient(140deg,#4A3060,#1A1030)',onClick:()=>setExploreView('guide')},
              {icon:<IcShop sz={28} c="#fff"/>,title:'Autour de moi',desc:'Cavistes, bars à vin, domaines',gradient:'linear-gradient(140deg,#6B4226,#3A2010)',onClick:()=>setExploreView('places')},
            ].map(b=><button key={b.title} onClick={b.onClick} style={{width:'100%',border:0,borderRadius:20,background:b.gradient,padding:'20px',cursor:'pointer',display:'flex',alignItems:'center',gap:14,textAlign:'left',boxShadow:'0 6px 20px rgba(0,0,0,.15)',marginBottom:12}}>
              <div style={{width:48,height:48,borderRadius:16,background:'rgba(255,255,255,.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{b.icon}</div>
              <div style={{flex:1}}><div style={{color:'#fff',fontSize:18,fontWeight:600,fontFamily:"'Cormorant Garamond',serif"}}>{b.title}</div><div style={{color:'rgba(255,255,255,.7)',fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:3}}>{b.desc}</div></div>
              <IcArrow sz={18} c="rgba(255,255,255,.4)"/>
            </button>)}
          </div>
        </div>
      )}
      {tab==='feed'&&<ScreenFriends tastings={tastings} user={user} onEditTasting={openEditTasting} onViewBottle={(t)=>{
        // Find matching bottle in cave, or create a synthetic bottle from tasting data
        const match=bottles.find(b=>b.name===t.name&&(b.vintage===t.vintage||!t.vintage));
        if(match){openBottleDetail(match);}
        else{openBottleDetail({id:null,name:t.name,cuvee:t.cuvee||'',vintage:t.vintage,region:t.region||'',appellation:t.appellation||'',color:t.color||'rouge',robe:COLORS.find(c=>c.id===t.color)?.robe||'#6B1E2C',quantity:0,price:0,notes:'',aromas:t.aromas||[],pairings:[],service:{},estate:{},cepages:[],tags:[]});}
      }}/>}
      {tab==='profile'&&<ScreenProfile onNav={nav} bottles={bottles} profile={profile} onLogout={signOut} user={user} dark={dark} toggleDark={toggleDark} tastings={tastings}/>}
    </>}
    {/* Full Tasting Sheet Modal */}
    {(tastingBottle||freeTasting||editTasting)&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:70}} onClick={closeTasting}>
      <div onClick={e=>e.stopPropagation()} style={{position:'absolute',bottom:0,left:0,right:0,background:'var(--cr)',borderRadius:'24px 24px 0 0',maxHeight:'92vh',height:'92vh',overflow:'auto',WebkitOverflowScrolling:'touch',padding:'6px 0 40px'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'8px 0 6px',position:'sticky',top:0,background:'var(--cr)',zIndex:2}}><div style={{width:40,height:4,borderRadius:2,background:'var(--ln)'}}></div></div>
        <div style={{padding:'0 20px'}}>
          <h2 className="sf" style={{fontSize:22,fontWeight:500,margin:'0 0 4px'}}>Fiche de <span style={{fontStyle:'italic',color:'var(--bx)'}}>dégustation</span></h2>
          {tastingBottle&&<p style={{fontSize:14,color:'var(--im)',margin:'0 0 12px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{str(tastingBottle.name)} {tastingBottle.vintage||''} — {tastingBottle.region||''}</p>}
          {editTasting&&<p style={{fontSize:14,color:'var(--im)',margin:'0 0 12px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{str(editTasting.name)} {editTasting.vintage||''} — Modification</p>}

          {/* Wine info for free tasting */}
          {freeTasting&&!editTasting&&<div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>Quel vin dégustez-vous ?</div>
            {/* Search catalog */}
            <div style={{position:'relative',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'11px 14px',border:'1px solid var(--ln)',borderRadius:12,background:'var(--cr)'}}>
                <IcSearch sz={16} c="var(--im)"/>
                <input type="text" value={tastingSearch} onChange={e=>{setTastingSearch(e.target.value);if(e.target.value.length>=2){searchWines(e.target.value).then(r=>setTastingResults(r.slice(0,8)));}else setTastingResults([]);}} placeholder="Chercher dans le catalogue..."
                  style={{flex:1,border:0,background:'transparent',outline:'none',fontSize:16,color:'var(--ink)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}/>
              </div>
              {tastingResults.length>0&&<div style={{position:'absolute',top:'100%',left:0,right:0,zIndex:10,background:'var(--sr)',borderRadius:14,boxShadow:'0 8px 24px rgba(0,0,0,.15)',marginTop:4,maxHeight:200,overflow:'auto'}}>
                {tastingResults.map((w,i)=><button key={w.id||i} onClick={()=>{
                  const deduced=Object.entries(APPELLATION_MAP).find(([k])=>(w.appellation||w.name||'').toLowerCase().includes(k.toLowerCase()));
                  const region=w.region||(deduced?deduced[1].r:'')||'';
                  setTForm(f=>({...f,wineName:w.name||'',wineVintage:f.wineVintage,wineRegion:region,wineColor:w.color||'rouge'}));
                  setTastingSearch('');setTastingResults([]);
                }} style={{width:'100%',border:0,padding:'10px 14px',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:10,textAlign:'left',borderBottom:'.5px solid var(--ln)'}}>
                  <div style={{width:5,height:28,borderRadius:3,background:COLORS.find(c=>c.id===w.color)?.robe||'var(--bx)',flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}><div className="sf" style={{fontSize:15,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{w.name}</div><div style={{fontSize:12,color:'var(--im)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{w.region||''}{w.appellation?' · '+w.appellation:''}</div></div>
                </button>)}
              </div>}
            </div>
            {/* Manual entry */}
            <input type="text" value={tForm.wineName} onChange={e=>setTForm(f=>({...f,wineName:e.target.value}))} placeholder="Nom du vin *" style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box',marginBottom:8}}/>
            <div style={{display:'flex',gap:8}}>
              <input type="number" value={tForm.wineVintage} onChange={e=>setTForm(f=>({...f,wineVintage:e.target.value}))} placeholder="Année" style={{width:90,flexShrink:0,padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
              <input type="text" value={tForm.wineRegion} onChange={e=>setTForm(f=>({...f,wineRegion:e.target.value}))} placeholder="Région" style={{flex:1,minWidth:0,padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box'}}/>
            </div>
            <div style={{display:'flex',gap:4,marginTop:8,flexWrap:'wrap'}}>
              {COLORS.map(c=><button key={c.id} onClick={()=>setTForm(f=>({...f,wineColor:c.id}))} style={{padding:'6px 10px',borderRadius:10,border:tForm.wineColor===c.id?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.wineColor===c.id?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:5,background:c.robe}}/><span style={{color:tForm.wineColor===c.id?'var(--bx)':'var(--is)',fontWeight:tForm.wineColor===c.id?600:400}}>{c.label}</span></button>)}
            </div>
            {tForm.wineName&&<div style={{marginTop:10,padding:'12px 14px',background:'var(--pm)',borderRadius:12,display:'flex',gap:10,alignItems:'center'}}>
              <div style={{width:6,height:28,borderRadius:3,background:COLORS.find(c=>c.id===tForm.wineColor)?.robe||'var(--bx)',flexShrink:0}}/>
              <div style={{flex:1}}><div className="sf" style={{fontSize:16,fontWeight:600}}>{tForm.wineName}</div><div style={{fontSize:13,color:'var(--im)'}}>{tForm.wineVintage||''}{tForm.wineRegion?' · '+tForm.wineRegion:''}</div></div>
            </div>}
          </div>}

          {/* ŒIL */}
          <div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>👁️ L'œil — penchez le verre à 45° sur fond blanc</div>
            {/* Robe color */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>Robe</div>
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {(()=>{const wc=tastingBottle?.color||editTasting?.color||tForm.wineColor;
                  return(wc==='blanc'?
                  [{n:'Vert pâle',c:'#D4E6A5'},{n:'Jaune paille',c:'#E8D44D'},{n:'Or',c:'#D4A030'},{n:'Doré',c:'#B8960B'},{n:'Ambré',c:'#CD853F'},{n:'Cuivré',c:'#B87333'}]:
                  wc==='rosé'?
                  [{n:'Rose pâle',c:'#F8C8D4'},{n:'Saumon',c:'#FA8072'},{n:'Pêche',c:'#FFDAB9'},{n:'Framboise',c:'#E8587A'},{n:'Pelure d\'oignon',c:'#C89060'},{n:'Cuivré',c:'#CD7F50'}]:
                  wc==='effervescent'?
                  [{n:'Blanc doré',c:'#E8D44D'},{n:'Or pâle',c:'#D4B040'},{n:'Rose pâle',c:'#F8C8D4'},{n:'Saumon',c:'#FA8072'},{n:'Ambre',c:'#CD853F'}]:
                  [{n:'Violet',c:'#5B1A5E'},{n:'Pourpre',c:'#800040'},{n:'Rubis',c:'#9B111E'},{n:'Cerise',c:'#A52A2A'},{n:'Grenat',c:'#6C2020'},{n:'Tuilé',c:'#8B5A2B'},{n:'Brique',c:'#964B00'},{n:'Acajou',c:'#6B3A2E'}]
                );})().map(r=><button key={r.n} onClick={()=>setTForm(f=>({...f,robeColor:r.n}))} style={{padding:'6px 10px',borderRadius:10,border:tForm.robeColor===r.n?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.robeColor===r.n?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:5,color:tForm.robeColor===r.n?'var(--bx)':'var(--is)',fontWeight:tForm.robeColor===r.n?600:400}}>
                  <div style={{width:14,height:14,borderRadius:7,background:r.c,border:'.5px solid rgba(0,0,0,.15)'}}/>
                  {r.n}
                </button>)}
              </div>
            </div>
            {[{k:'robeIntensity',l:'Intensité colorante',opts:['pâle','moyenne','soutenue','profonde']},
              {k:'limpidity',l:'Limpidité',opts:['brillante','limpide','voilée','trouble']},
              {k:'tears',l:'Larmes (jambes)',opts:['fines','moyennes','épaisses','grasses']},
            ].map(r=><div key={r.k} style={{marginBottom:8}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{r.l}</div>
              <div style={{display:'flex',gap:4}}>{r.opts.map(o=><button key={o} onClick={()=>setTForm(f=>({...f,[r.k]:o}))} style={{flex:1,padding:'7px 4px',borderRadius:10,border:tForm[r.k]===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm[r.k]===o?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',color:tForm[r.k]===o?'var(--bx)':'var(--is)',fontWeight:tForm[r.k]===o?600:400}}>{o}</button>)}</div>
            </div>)}
          </div>

          {/* NEZ */}
          <div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>👃 Le nez — sans agiter puis après agitation</div>
            <div style={{marginBottom:8}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Intensité olfactive</div>
              <div style={{display:'flex',gap:4}}>{['fermé','discret','moyen','ouvert','expressif'].map(o=><button key={o} onClick={()=>setTForm(f=>({...f,noseIntensity:o}))} style={{flex:1,padding:'7px 2px',borderRadius:10,border:tForm.noseIntensity===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.noseIntensity===o?'var(--pm)':'var(--cr)',fontSize:11,cursor:'pointer',color:tForm.noseIntensity===o?'var(--bx)':'var(--is)',fontWeight:tForm.noseIntensity===o?600:400}}>{o}</button>)}</div>
            </div>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Familles aromatiques</div>
            <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:10}}>
              {['Fruité','Floral','Épicé','Boisé','Minéral','Végétal','Animal','Empyreumatique'].map(a=><button key={a} onClick={()=>setTForm(f=>{const ar=f.noseAromas.includes(a)?f.noseAromas.filter(x=>x!==a):[...f.noseAromas,a];return{...f,noseAromas:ar};})} style={{padding:'6px 12px',borderRadius:999,border:tForm.noseAromas.includes(a)?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.noseAromas.includes(a)?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:tForm.noseAromas.includes(a)?'var(--bx)':'var(--is)',fontWeight:tForm.noseAromas.includes(a)?600:400}}>{a}</button>)}
            </div>
            {/* Arômes précis — toujours visibles, groupés par famille */}
            <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>Arômes précis identifiés</div>
            {[{f:'🍒 Fruité',show:true,aromas:['Cassis','Cerise','Framboise','Mûre','Fraise','Prune','Pomme','Poire','Pêche','Abricot','Agrumes','Fruits exotiques','Confiture','Fruits secs']},
              {f:'🌹 Floral',show:true,aromas:['Rose','Violette','Acacia','Jasmin','Tilleul','Pivoine','Iris','Sureau']},
              {f:'🌶️ Épicé',show:true,aromas:['Poivre noir','Poivre blanc','Vanille','Cannelle','Réglisse','Clou de girofle','Muscade','Gingembre','Safran']},
              {f:'🪵 Boisé',show:true,aromas:['Chêne','Cèdre','Tabac','Café','Cacao','Chocolat','Toast','Noisette','Amande','Brioche','Caramel']},
              {f:'🪨 Minéral',show:true,aromas:['Silex','Craie','Pierre','Iode','Graphite','Pierre à fusil','Pétrole','Ardoise']},
              {f:'🌿 Végétal',show:true,aromas:['Sous-bois','Champignon','Truffe','Garrigue','Thym','Buis','Herbe','Fougère','Menthe','Poivron']},
              {f:'🐴 Animal',show:true,aromas:['Cuir','Gibier','Musc','Lard fumé','Fourrure','Cire']},
              {f:'🔥 Empyreumatique',show:true,aromas:['Fumée','Grillé','Torréfaction','Pain grillé','Moka']},
            ].map(g=><div key={g.f} style={{marginBottom:8}}>
              <div style={{fontSize:12,color:'var(--im)',marginBottom:4}}>{g.f}</div>
              <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
                {g.aromas.map(a=><button key={a} onClick={()=>setTForm(f=>{const sa=f.specificAromas||[];const na=sa.includes(a)?sa.filter(x=>x!==a):[...sa,a];return{...f,specificAromas:na,noseAromas:f.noseAromas.includes(g.f.split(' ')[1])?f.noseAromas:[...f.noseAromas,g.f.split(' ')[1]]};})} style={{padding:'4px 9px',borderRadius:999,border:(tForm.specificAromas||[]).includes(a)?'2px solid var(--g)':'1px solid var(--ln)',background:(tForm.specificAromas||[]).includes(a)?'rgba(200,169,106,.12)':'var(--cr)',fontSize:12,cursor:'pointer',color:(tForm.specificAromas||[]).includes(a)?'var(--g)':'var(--is)',fontWeight:(tForm.specificAromas||[]).includes(a)?600:400}}>{a}</button>)}
              </div>
            </div>)}
            {(tForm.specificAromas||[]).length>0&&<div style={{fontSize:14,color:'var(--bx)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',padding:'8px 0',borderTop:'.5px solid var(--ln)',marginTop:6}}>
              Nez : {(tForm.specificAromas||[]).join(', ')}
            </div>}
            {/* Défauts */}
            <div style={{marginTop:8}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Défauts éventuels</div>
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {['Aucun','Bouchonné','Oxydé','Réduit','Volatile','Brett'].map(d=><button key={d} onClick={()=>setTForm(f=>({...f,noseDefects:f.noseDefects===d?'':d}))} style={{padding:'5px 10px',borderRadius:999,border:tForm.noseDefects===d?'2px solid '+(d==='Aucun'?'#27ae60':'#C0392B'):'1px solid var(--ln)',background:tForm.noseDefects===d?(d==='Aucun'?'#27ae6012':'#C0392B12'):'var(--cr)',fontSize:12,cursor:'pointer',color:tForm.noseDefects===d?(d==='Aucun'?'#27ae60':'#C0392B'):'var(--is)',fontWeight:tForm.noseDefects===d?600:400}}>{d}</button>)}
              </div>
            </div>
          </div>

          {/* BOUCHE */}
          <div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>👅 La bouche</div>
            {[{k:'attack',l:'Attaque',opts:['molle','souple','franche','vive']},
              {k:'acidity',l:'Acidité',opts:['plate','fraîche','vive','mordante']},
              {k:'tannins',l:'Tanins',opts:['fondus','soyeux','fermes','âpres','—'],hide:tForm.wineColor==='blanc'&&freeTasting},
              {k:'body',l:'Corps',opts:['léger','moyen','charpenté','puissant']},
              {k:'lengthCaudalies',l:'Longueur',opts:['courte','moyenne','longue','très longue']},
            ].filter(r=>!r.hide).map(r=><div key={r.k} style={{marginBottom:8}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{r.l}</div>
              <div style={{display:'flex',gap:4}}>{r.opts.map(o=><button key={o} onClick={()=>setTForm(f=>({...f,[r.k]:o}))} style={{flex:1,padding:'7px 4px',borderRadius:10,border:tForm[r.k]===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm[r.k]===o?'var(--pm)':'var(--cr)',fontSize:12,cursor:'pointer',color:tForm[r.k]===o?'var(--bx)':'var(--is)',fontWeight:tForm[r.k]===o?600:400}}>{o}</button>)}</div>
            </div>)}
          </div>

          {/* SCORES */}
          <div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>Notation</div>
            {[{k:'visual',l:'Œil'},{k:'nose',l:'Nez'},{k:'palate',l:'Bouche'},{k:'balance',l:'Équilibre'},{k:'complexity',l:'Complexité'}].map(s=><div key={s.k} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <span style={{fontSize:14,fontWeight:500,width:80}}>{s.l}</span>
              <div style={{display:'flex',gap:3,flex:1}}>
                {[1,2,3,4,5].map(v=><button key={v} onClick={()=>{const nf={...tForm,[s.k]:v};nf.overall=Math.round((nf.visual+nf.nose+nf.palate+nf.balance+nf.complexity)*4/5*10)/10;setTForm(nf);}} style={{flex:1,height:8,borderRadius:4,border:0,cursor:'pointer',background:v<=tForm[s.k]?'var(--bx)':'var(--pm)'}}/>)}
              </div>
              <span className="sf" style={{fontSize:16,fontWeight:600,color:'var(--bx)',width:28,textAlign:'right'}}>{tForm[s.k]}</span>
            </div>)}
            <div style={{textAlign:'center',padding:'8px 0'}}>
              <div className="sf" style={{fontSize:40,fontWeight:600,color:'var(--bx)'}}>{tForm.overall}<span style={{fontSize:20,color:'var(--im)'}}>/20</span></div>
            </div>
          </div>

          {/* CONTEXTE */}
          <div style={{marginBottom:16}}>
            <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:8}}>Contexte</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
              {['Apéritif','Dîner','Soirée','Dégustation','Restaurant','Cadeau'].map(o=><button key={o} onClick={()=>setTForm(f=>({...f,occasion:f.occasion===o?'':o}))} style={{padding:'7px 14px',borderRadius:999,border:tForm.occasion===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.occasion===o?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:tForm.occasion===o?'var(--bx)':'var(--is)',fontWeight:tForm.occasion===o?600:400}}>{o}</button>)}
            </div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:500,width:'100%',marginBottom:4}}>Potentiel de garde</div>
              {['à boire','2-5 ans','5-10 ans','10+ ans'].map(o=><button key={o} onClick={()=>setTForm(f=>({...f,potential:o}))} style={{padding:'7px 12px',borderRadius:999,border:tForm.potential===o?'2px solid var(--bx)':'1px solid var(--ln)',background:tForm.potential===o?'var(--pm)':'var(--cr)',fontSize:13,cursor:'pointer',color:tForm.potential===o?'var(--bx)':'var(--is)',fontWeight:tForm.potential===o?600:400}}>{o}</button>)}
            </div>
            <input type="text" value={tForm.paired} onChange={e=>setTForm(f=>({...f,paired:e.target.value}))} placeholder="Accompagné de..." style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',boxSizing:'border-box',marginBottom:8}}/>
            <textarea value={tForm.comments} onChange={e=>setTForm(f=>({...f,comments:e.target.value}))} placeholder="Vos impressions personnelles..." rows={3} style={{width:'100%',padding:'12px 14px',border:'1px solid var(--ln)',borderRadius:12,fontSize:16,background:'var(--cr)',outline:'none',color:'var(--ink)',resize:'none',fontFamily:'inherit',boxSizing:'border-box'}}/>
          </div>

          {/* SUBMIT */}
          <button onClick={()=>handleOpen(tastingBottle,tForm)} disabled={tSaving||(freeTasting&&!tForm.wineName.trim())} style={{width:'100%',padding:'16px 0',border:0,borderRadius:999,background:tSaving?'var(--pm)':'linear-gradient(180deg,#27ae60 0%,#1e8449 100%)',color:tSaving?'var(--is)':'#fff',fontSize:17,fontWeight:600,cursor:tSaving?'wait':'pointer',boxShadow:'0 4px 14px rgba(39,174,96,.3)',marginBottom:20}}>
            {tSaving?'Enregistrement...':(editTasting?'Enregistrer les modifications':tastingBottle?'🍾 Ouvrir & enregistrer':'Enregistrer la dégustation')}
          </button>
        </div>
      </div>
    </div>}
    {/* Confirm close tasting */}
    {confirmClose&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:80,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{background:'var(--cr)',borderRadius:20,padding:24,maxWidth:320,width:'100%',textAlign:'center',boxShadow:'0 12px 40px rgba(0,0,0,.2)'}}>
        <div style={{fontSize:28,marginBottom:12}}>🍷</div>
        <h3 className="sf" style={{fontSize:20,fontWeight:500,margin:'0 0 8px'}}>Fermer la fiche ?</h3>
        <p style={{fontSize:15,color:'var(--im)',margin:'0 0 20px',lineHeight:1.5}}>Votre dégustation n'a pas été enregistrée et sera perdue.</p>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>setConfirmClose(false)} style={{flex:1,padding:'12px',border:'1px solid var(--ln)',borderRadius:14,background:'var(--cr)',fontSize:15,fontWeight:500,cursor:'pointer',color:'var(--is)'}}>Continuer</button>
          <button onClick={forceCloseTasting} style={{flex:1,padding:'12px',border:0,borderRadius:14,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:'pointer'}}>Fermer</button>
        </div>
      </div>
    </div>}

    {/* Triple action menu */}
    {showActionMenu&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:35}} onClick={()=>setShowActionMenu(false)}>
      <div style={{position:'absolute',bottom:100,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',gap:10,alignItems:'center'}} onClick={e=>e.stopPropagation()}>
        {[{icon:<IcCamera sz={24} c="var(--bx)"/>,label:'Scanner / Ajouter',desc:'Ajouter à ma cave',action:()=>openAdd('cave')},
          {icon:<IcTasting sz={24} c="var(--bx)"/>,label:'Dégustation libre',desc:'Goûter un vin hors cave',action:()=>openAdd('tasting')},
          {icon:<IcHeart sz={24} c="var(--bx)"/>,label:'Wishlist',desc:'Un vin à acheter plus tard',action:()=>openAdd('wishlist')},
        ].map(a=><button key={a.label} onClick={a.action} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 20px',background:'var(--sr)',borderRadius:18,border:0,cursor:'pointer',boxShadow:'0 8px 24px rgba(0,0,0,.15)',width:280,textAlign:'left'}}>
          <div style={{width:44,height:44,borderRadius:14,background:'var(--pm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{a.icon}</div>
          <div><div style={{fontSize:16,fontWeight:600,color:'var(--ink)'}}>{a.label}</div><div style={{fontSize:13,color:'var(--im)'}}>{a.desc}</div></div>
        </button>)}
      </div>
    </div>}

    {!bottle&&!showAdd&&<div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'min(100%,430px)',padding:'0 12px 12px',zIndex:30}}>
      <div style={{height:72,background:dark?'rgba(26,18,21,.88)':'rgba(255,255,255,.88)',backdropFilter:'blur(28px) saturate(180%)',WebkitBackdropFilter:'blur(28px) saturate(180%)',borderRadius:32,boxShadow:'0 8px 24px rgba(107,30,44,.12),0 0 0 .5px var(--ls)',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'0 8px'}}>
        {[{id:'cave',l:'Cave',Ic:IcHome},{id:'explore',l:'Explorer',Ic:IcCompass},{id:'add',l:'',act:1},{id:'feed',l:'Feed',Ic:IcFeed},{id:'profile',l:'Profil',Ic:IcUser}].map(it=>{
          if(it.act)return<button key="add" onClick={()=>setShowActionMenu(m=>!m)} style={{width:52,height:52,borderRadius:'50%',background:showActionMenu?'var(--im)':'linear-gradient(180deg,var(--bs) 0%,var(--bx) 100%)',color:'var(--cr)',border:0,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:showActionMenu?'none':'0 6px 18px rgba(107,30,44,.4)',cursor:'pointer',transform:'translateY(-6px)',transition:'all .2s'}}>
            {showActionMenu?<span style={{fontSize:24,fontWeight:300,lineHeight:1}}>✕</span>:<IcScan sz={22} c="var(--cr)"/>}
          </button>;
          return<button key={it.id} onClick={()=>nav(it.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,flex:1,height:56,borderRadius:20,border:0,background:'transparent',cursor:'pointer',color:tab===it.id?'var(--bx)':'var(--im)',transition:'color .2s'}}>
            <it.Ic sz={22}/><span style={{fontSize:11,fontWeight:500,letterSpacing:'.02em'}}>{it.l}</span>
          </button>;
        })}
      </div>
    </div>}
  </div>;
}
