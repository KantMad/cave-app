import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from './lib/auth';
import ScreenAuth from './screens/ScreenAuth';
import { CELLAR, FRIENDS, VINTAGES } from './data/cellar';
import { MAP_REGIONS, MAP_CITIES } from './data/mapData';
import { fetchBottles, seedDemoData, addBottle, updateBottle, deleteBottle, searchWines, fetchEstate, seedReferenceCatalog, scanLabel, scanBarcode } from './lib/api';
// Unused: searchOFF, searchByBarcode, Html5Qrcode removed

// ═══════════════════════════════════════════════════════════════
// CAVE — Application complète · Tous écrans
// Carte IGN · Fiche bouteille · Stats · Accords · Amis · Profil
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// ICONS (inline SVG)
// ═══════════════════════════════════════════════════════════════
const I = ({d,sz=22,c="currentColor",sw=1.6,...p}) => <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}><path d={d}/></svg>;
const IcHome=p=><I {...p} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h3v-5a1 1 0 011-1h4a1 1 0 011 1v5h3a1 1 0 001-1v-9"/>;
const IcMap=p=><I {...p} d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"/>;
const IcFork=p=><I {...p} d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7"/>;
const IcChart=p=><I {...p} d="M18 20V10M12 20V4M6 20v-6"/>;
const IcBook=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M8 7h8M8 11h6"/></svg>;
const IcScan=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round"><path d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcUser=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0114 0v1"/></svg>;
const IcBack=p=><I {...p} d="M15 18l-6-6 6-6"/>;
const IcSearch=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const IcPin=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const IcArrow=p=><I {...p} d="M9 18l6-6-6-6"/>;
const IcExport=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
const IcSettings=p=><svg width={p.sz||22} height={p.sz||22} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function txtNorm(s){return(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
const PH = ({ey,title,action}) => <div style={{padding:'14px 24px 10px',display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}><div>{ey&&<div style={{textTransform:'uppercase',letterSpacing:'0.18em',fontSize:10,fontWeight:500,color:'var(--bx)',opacity:0.7,marginBottom:6}}>{ey}</div>}<h1 className="sf" style={{margin:0,fontSize:34,lineHeight:1,fontWeight:500,letterSpacing:'-0.005em'}}>{title}</h1></div>{action}</div>;
const SC = ({title,ey,children}) => <div style={{background:'var(--sr)',borderRadius:22,padding:20,marginTop:16,boxShadow:'var(--sh)'}}>{ey&&<div style={{textTransform:'uppercase',letterSpacing:'0.18em',fontSize:9,fontWeight:500,color:'var(--bx)',opacity:0.7}}>{ey}</div>}<h3 className="sf" style={{fontSize:20,fontWeight:500,margin:'2px 0 14px'}}>{title}</h3>{children}</div>;
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
  <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
    <span>{s}</span><span style={{color:inP?'var(--bx)':'var(--is)'}}>{inP?'À boire':cur<pf?'À garder':'Déclin'} — {cur}</span><span>{e}</span>
  </div></div>;
}

// Aroma wheel
function AW({data,size=240}) {
  const keys=Object.keys(data),n=keys.length,r=size/2-24,cx=size/2,cy=size/2;
  const pts=keys.map((k,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2,v=data[k]/100;return[cx+Math.cos(a)*r*v,cy+Math.sin(a)*r*v];});
  const axP=keys.map((_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r];});
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    {[.25,.5,.75,1].map((rr,i)=><circle key={i} cx={cx} cy={cy} r={r*rr} fill="none" stroke="var(--ls)" strokeWidth=".5" strokeDasharray={i===3?'':'2 3'}/>)}
    {axP.map(([x,y],i)=><line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--ls)" strokeWidth=".5"/>)}
    <polygon points={pts.map(p=>p.join(',')).join(' ')} fill="var(--bx)" fillOpacity=".22" stroke="var(--bx)" strokeWidth="1.5" strokeLinejoin="round"/>
    {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="var(--bx)"/>)}
    {keys.map((k,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return <text key={k} x={cx+Math.cos(a)*(r+14)} y={cy+Math.sin(a)*(r+14)} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" textAnchor="middle" dominantBaseline="middle" fill="var(--is)" letterSpacing=".5">{k.toUpperCase()}</text>;})}
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
function ScreenHome({onSel,onNav,bottles,profile,onSeed}) {
  const [f,setF]=useState('tous');
  const [seeding,setSeeding]=useState(false);
  const fs=['tous','rouge','blanc','effervescent','liquoreux'];
  const vis=f==='tous'?bottles:bottles.filter(b=>b.color===f);
  const tb=bottles.reduce((s,b)=>s+(b.quantity||1),0);
  const tv=bottles.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const nm=profile?.name||'Ami';
  const doSeed=async()=>{setSeeding(true);await onSeed();setSeeding(false);};
  return <div style={{paddingBottom:120,background:'var(--cr)',minHeight:'100%'}}>
    <div style={{padding:'48px 24px 18px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div><div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:6}}>Ma cave</div>
          <h1 className="sf" style={{margin:0,fontSize:38,lineHeight:1.05,fontWeight:500}}>Bonsoir,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>{nm}</span></h1></div>
        <button onClick={()=>onNav('profile')} style={{width:44,height:44,borderRadius:22,border:0,cursor:'pointer',background:'linear-gradient(135deg,var(--bx) 0%,var(--bs) 100%)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,boxShadow:'0 4px 12px rgba(107,30,44,.25)'}}>{(nm[0]||'?').toUpperCase()}</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'var(--ls)',borderRadius:18,overflow:'hidden',marginTop:20,border:'0.5px solid var(--ls)'}}>
        {[{l:'Bouteilles',v:tb},{l:'Références',v:bottles.length},{l:'Valeur',v:tv>=1000?Math.round(tv/1000)+'k€':tv+'€'}].map(s=><div key={s.l} style={{background:'var(--sr)',padding:'14px 12px',textAlign:'center'}}><div className="sf" style={{fontSize:22,fontWeight:600}}>{s.v}</div><div className="sc" style={{fontSize:9,marginTop:2}}>{s.l}</div></div>)}
      </div>
    </div>
    <div style={{display:'flex',gap:8,padding:'12px 24px',overflowX:'auto'}}>
      {fs.map(x=><button key={x} onClick={()=>setF(x)} style={{padding:'8px 16px',borderRadius:999,border:0,fontSize:13,fontWeight:500,cursor:'pointer',whiteSpace:'nowrap',background:f===x?'var(--bx)':'var(--pm)',color:f===x?'var(--cr)':'var(--is)',transition:'all .15s'}}>{x==='tous'?'Tous':x[0].toUpperCase()+x.slice(1)}</button>)}
    </div>
    <div style={{padding:'4px 20px 0',display:'flex',flexDirection:'column',gap:12}}>
      {bottles.length===0?<div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:56,marginBottom:12}}>🍷</div>
        <h2 className="sf" style={{fontSize:22,fontWeight:500,margin:'0 0 8px'}}>Votre cave est vide</h2>
        <p style={{fontSize:14,color:'var(--im)',margin:'0 0 20px',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Commencez par ajouter quelques bouteilles</p>
        <button onClick={doSeed} disabled={seeding} style={{padding:'14px 28px',borderRadius:999,border:0,background:'var(--bx)',color:'var(--cr)',fontSize:15,fontWeight:600,cursor:seeding?'wait':'pointer',boxShadow:'0 4px 14px rgba(107,30,44,.28)'}}>
          {seeding?'Ajout en cours...':'Ajouter 3 bouteilles de démo'}
        </button>
      </div>:vis.map(b=><div key={b.id} onClick={()=>onSel(b)} style={{display:'flex',gap:14,alignItems:'center',padding:'14px 16px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)',cursor:'pointer'}}>
        <div style={{width:8,height:44,borderRadius:4,background:b.robe,flexShrink:0}}/>
        <div style={{flex:1}}><div className="sf" style={{fontSize:17,fontWeight:500,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:12,color:'var(--im)',marginTop:2}}>{b.region} · {b.vintage}</div></div>
        <div style={{textAlign:'right'}}><div className="sf" style={{fontSize:15,fontWeight:600,color:'var(--bx)'}}>×{b.quantity}</div><div style={{fontSize:11,color:'var(--im)'}}>{b.price}€</div></div>
      </div>)}
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: BOTTLE DETAIL
// ═══════════════════════════════════════════════════════════════
function ScreenBottle({bottle:b,onBack,onEdit,onDelete}) {
  const [tab,setTab]=useState('dégustation');
  const [confirmDel,setConfirmDel]=useState(false);
  const [estate,setEstate]=useState(null);
  const [estateLoading,setEstateLoading]=useState(false);
  const tabs=['dégustation','domaine','accords','amis'];

  // Fetch full estate data when domaine tab is selected
  useEffect(()=>{
    if(tab==='domaine'&&!estate&&!estateLoading){
      setEstateLoading(true);
      fetchEstate(b.name).then(e=>{
        setEstate(e);setEstateLoading(false);
      }).catch(()=>setEstateLoading(false));
    }
  },[tab]);
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    {/* Hero */}
    <div style={{position:'relative',height:280,overflow:'hidden',background:`radial-gradient(120% 80% at 50% 30%,${b.robe} 0%,${b.robe}dd 40%,#3A0F18 100%)`}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(60% 50% at 50% 100%,rgba(0,0,0,.4) 0%,transparent 70%)'}}/>
      <div style={{position:'relative',padding:'62px 16px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack} bg="rgba(245,237,224,.2)" c="var(--cr)"/>
        <div style={{display:'flex',gap:8}}>
          {onEdit&&<button onClick={()=>onEdit(b)} style={{padding:'8px 16px',borderRadius:999,border:0,background:'rgba(245,237,224,.2)',backdropFilter:'blur(8px)',color:'var(--cr)',fontSize:13,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Modifier
          </button>}
          {onDelete&&<button onClick={()=>setConfirmDel(true)} style={{width:36,height:36,borderRadius:'50%',border:0,background:'rgba(192,57,43,.3)',backdropFilter:'blur(8px)',color:'var(--cr)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>}
        </div>
      </div>
      <div style={{position:'absolute',bottom:16,left:24,right:24,color:'var(--cr)'}}>
        <div className="sc" style={{opacity:.75,marginBottom:4}}>{b.appellation}</div>
      </div>
    </div>
    {/* Confirm delete modal */}
    {confirmDel&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setConfirmDel(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--sr)',borderRadius:24,padding:28,maxWidth:320,width:'100%',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,.3)'}}>
        <div style={{fontSize:40,marginBottom:12}}>🗑️</div>
        <h3 className="sf" style={{fontSize:22,margin:'0 0 8px'}}>Supprimer cette bouteille ?</h3>
        <p style={{fontSize:14,color:'var(--im)',margin:'0 0 20px',lineHeight:1.4}}>{b.name}{b.vintage?' · '+b.vintage:''}</p>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>setConfirmDel(false)} style={{flex:1,padding:'12px 0',borderRadius:999,border:'1px solid var(--ls)',background:'transparent',fontSize:14,fontWeight:500,cursor:'pointer',color:'var(--is)'}}>Annuler</button>
          <button onClick={()=>{setConfirmDel(false);onDelete(b.id);}} style={{flex:1,padding:'12px 0',borderRadius:999,border:0,background:'#C0392B',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer'}}>Supprimer</button>
        </div>
      </div>
    </div>}
    {/* Name + score */}
    <div style={{padding:'20px 24px 0',textAlign:'center'}}>
      <h1 className="sf" style={{margin:0,fontSize:28,fontWeight:500,lineHeight:1.1}}>{b.name}</h1>
      <div style={{fontSize:18,color:'var(--bx)',marginTop:4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
        {b.cuvee?b.cuvee+' · ':''}{b.vintage}
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:20,marginTop:16}}>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:28,color:'var(--bx)',fontWeight:500,lineHeight:1}}>{b.score||'—'}<span style={{fontSize:14,color:'var(--im)'}}>/100</span></div><div className="sc" style={{fontSize:9,color:'var(--im)',marginTop:4}}>Note</div></div>
        <div style={{width:.5,height:32,background:'var(--ls)'}}/>
        <div style={{textAlign:'center'}}><SR v={b.communityRating||0} sz={14}/><div className="sc" style={{fontSize:9,color:'var(--im)',marginTop:4}}>{b.communityCount||0} avis</div></div>
        <div style={{width:.5,height:32,background:'var(--ls)'}}/>
        <div style={{textAlign:'center'}}><div className="sf" style={{fontSize:28,color:'var(--bx)',fontWeight:500,lineHeight:1}}>×{b.quantity||1}</div><div className="sc" style={{fontSize:9,color:'var(--im)',marginTop:4}}>En cave</div></div>
      </div>
    </div>
    {/* Tabs */}
    <div style={{padding:'24px 16px 0'}}><div style={{display:'flex',background:'var(--pm)',borderRadius:999,padding:3,gap:2}}>
      {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,border:0,padding:'9px 6px',borderRadius:999,background:tab===t?'var(--sr)':'transparent',color:tab===t?'var(--bx)':'var(--im)',fontSize:12,fontWeight:500,textTransform:'capitalize',cursor:'pointer',boxShadow:tab===t?'var(--sh)':'none',transition:'all .2s'}}>{t}</button>)}
    </div></div>
    {/* Tab content */}
    <div style={{padding:'0 20px'}}>
      {tab==='dégustation'&&<>
        <SC title="Fenêtre de dégustation" ey="Maturité"><MB pf={b.peakFrom} pt={b.peakTo}/></SC>
        <SC title="Nez — roue des arômes" ey="Olfactif">
          <div style={{display:'flex',justifyContent:'center',padding:'4px 0 12px'}}><AW data={b.aromaW} size={240}/></div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{(b.aromas||[]).slice(0,8).map(a=><span key={a} style={{padding:'6px 12px',borderRadius:999,fontSize:12,fontWeight:500,background:'var(--pm)',color:'var(--is)',border:'0.5px solid var(--ln)'}}>{a}</span>)}</div>
        </SC>
        <SC title="Assemblage" ey="Cépages">
          {(b.cepages||[]).map(c=><div key={c.n} style={{marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c.n}</span>
              <span className="sf" style={{fontSize:14,color:'var(--bx)',fontWeight:600}}>{c.p}%</span>
            </div>
            <div style={{height:4,background:'var(--pm)',borderRadius:2,overflow:'hidden'}}><div style={{width:`${c.p}%`,height:'100%',background:'linear-gradient(90deg,var(--bs),var(--bx))'}}/></div>
          </div>)}
        </SC>
        <SC title="Service" ey="Conseils">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
            {[{l:'Température',v:b.service?.temp||'—'},{l:'Verre',v:b.service?.verre||'—'},{l:'Carafage',v:b.service?.carafe||'—'}].map(s=><div key={s.l} style={{background:'var(--pm)',borderRadius:16,padding:12,textAlign:'center'}}>
              <div className="sc" style={{fontSize:8,color:'var(--im)'}}>{s.l}</div>
              <div className="sf" style={{fontSize:13,fontWeight:500,marginTop:4}}>{s.v}</div>
            </div>)}
          </div>
        </SC>
        <SC title="Notes personnelles" ey="Impressions">
          <p style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)',lineHeight:1.5,margin:0}}>« {b.notes} »</p>
        </SC>
      </>}
      {tab==='domaine'&&<>
        {estateLoading&&<div style={{textAlign:'center',padding:'40px 0',color:'var(--im)'}}>Chargement du domaine...</div>}
        <SC title={estate?.name||b.name} ey="Histoire">
          <div style={{display:'flex',alignItems:'flex-end',gap:16,marginBottom:14,padding:'16px',borderRadius:16,background:'linear-gradient(140deg,var(--pm),var(--cr))'}}>
            <div><div className="sc" style={{fontSize:9,color:'var(--bx)'}}>Fondé en</div><div className="sf" style={{fontSize:32,fontWeight:500,color:'var(--bx)',lineHeight:1}}>{estate?.founded||b.estate?.founded||'—'}</div></div>
            {estate?.classification&&<div style={{padding:'6px 12px',background:'var(--bx)',borderRadius:999,marginLeft:'auto'}}><span style={{fontSize:11,fontWeight:600,color:'var(--cr)'}}>{estate.classification}</span></div>}
          </div>
          <p className="sf" style={{fontSize:15,color:'var(--is)',lineHeight:1.55,margin:'0 0 14px'}}>{estate?.history||b.estate?.desc||b.estate?.description||'Informations à venir.'}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[
              {l:'Propriétaire',v:estate?.owner||b.estate?.owner||'—'},
              {l:'Surface',v:estate?.vineyard?.surfaceRaw||b.estate?.surface||'—'},
              {l:'Région',v:estate?.subRegion||b.region},
              {l:'Terroir',v:estate?.terroir?.summary||b.estate?.terroir||'—'},
              ...(estate?.terroir?.climate?[{l:'Climat',v:estate.terroir.climate}]:[]),
              ...(estate?.terroir?.soils?.length?[{l:'Sols',v:estate.terroir.soils.join(', ')}]:[]),
            ].map(i=><div key={i.l} style={{padding:'10px 12px',background:'var(--pm)',borderRadius:12}}>
              <div className="sc" style={{fontSize:8,color:'var(--im)',marginBottom:2}}>{i.l}</div>
              <div className="sf" style={{fontSize:13,fontWeight:500}}>{i.v}</div>
            </div>)}
          </div>
        </SC>
        {estate?.viticulture?.method&&<SC title="Viticulture" ey="Méthode">
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span style={{padding:'6px 14px',borderRadius:999,background:'var(--pm)',border:'.5px solid var(--ln)',fontSize:12,fontWeight:500}}>{estate.viticulture.method}</span>
            {(estate.viticulture.certifications||[]).map(c=><span key={c} style={{padding:'6px 14px',borderRadius:999,background:'var(--bx)',color:'var(--cr)',fontSize:12,fontWeight:500}}>{c}</span>)}
          </div>
          {estate.philosophy&&<p style={{fontSize:13,color:'var(--is)',margin:'12px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{estate.philosophy}</p>}
        </SC>}
        {estate?.anecdotes?.length>0&&<SC title="Le saviez-vous ?" ey="Anecdotes">
          {estate.anecdotes.map((a,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:i<estate.anecdotes.length-1?12:0}}>
            <div style={{width:4,borderRadius:2,background:'var(--g)',flexShrink:0,marginTop:4}}/>
            <p style={{fontSize:13,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</p>
          </div>)}
        </SC>}
        {VINTAGES[b.region]&&<SC title={`Millésime ${b.vintage}`} ey="Note de l'année">
          <div style={{display:'flex',gap:4,alignItems:'flex-end',height:80}}>
            {Object.entries(VINTAGES[b.region]).map(([y,s])=><div key={y} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:'100%',background:parseInt(y)===b.vintage?'var(--bx)':'var(--pm)',borderRadius:3,height:`${(s/100)*70}px`,transition:'all .2s'}}/>
              <span style={{fontSize:8,color:parseInt(y)===b.vintage?'var(--bx)':'var(--im)',fontWeight:parseInt(y)===b.vintage?700:400}}>{y.slice(2)}</span>
            </div>)}
          </div>
        </SC>}
      </>}
      {tab==='accords'&&<>
        <SC title="Accords recommandés" ey="Mets & vin">
          {(b.pairings||[]).map(p=><div key={p} style={{display:'flex',gap:14,alignItems:'center',padding:'12px 14px',background:'var(--pm)',borderRadius:14,marginBottom:8}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--bx)'}}><IcFork sz={18}/></div>
            <span className="sf" style={{fontSize:15,fontWeight:500,flex:1}}>{p}</span>
            <IcArrow sz={16} c="var(--im)"/>
          </div>)}
        </SC>
        <SC title="À éviter" ey="Désaccords">
          <p style={{fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--im)',margin:0,lineHeight:1.5}}>
            {b.color==='rouge'?'Poissons gras, plats trop épicés ou très vinaigrés.':b.color==='blanc'?'Viandes rouges saignantes, gibiers à plumes.':b.color==='liquoreux'?'Plats salés-acides. Servir en apéritif ou accord sucré-salé maîtrisé.':'Plats très corsés qui écraseraient la délicatesse des bulles.'}
          </p>
        </SC>
      </>}
      {tab==='amis'&&<>
        <SC title="Avis de vos proches" ey={`${(b.friends||[]).length} commentaire${(b.friends||[]).length!==1?'s':''}`}>
          {(!b.friends||b.friends.length===0)?<p style={{fontSize:15,color:'var(--im)',textAlign:'center',padding:'20px 0',margin:0,fontStyle:'italic'}}>Aucun avis pour cette bouteille.</p>:
          b.friends.map((f,i)=><div key={i} style={{display:'flex',gap:12,marginBottom:i<b.friends.length-1?16:0}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'var(--bx)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontWeight:500,fontSize:16,flexShrink:0}}>{f.n[0]}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14}}><span className="sf" style={{fontWeight:600}}>{f.n}</span></div>
              <SR v={f.r} sz={12}/>
              {f.c&&<p style={{fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)',margin:'4px 0 0',lineHeight:1.4}}>« {f.c} »</p>}
              <div style={{fontSize:11,color:'var(--im)',marginTop:4}}>{f.d}</div>
            </div>
          </div>)}
        </SC>
      </>}
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: MAP
// ═══════════════════════════════════════════════════════════════
function ScreenMapFull({onSel,bottles}) {
  const [sel,setSel]=useState('naq');
  const r=MAP_REGIONS.find(x=>x.id===sel);
  const rb=useMemo(()=>{if(!r?.w)return[];const ws=r.w.toLowerCase().split(/[&·,]/).map(s=>s.trim());return bottles.filter(b=>{const n=(b.region||'').toLowerCase();return ws.some(w=>n.includes(w)||w.includes(n));});},[r,bottles]);
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Terroir" title={<span>Ma France<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>du vin</span></span>}/>
    <div style={{margin:'8px 16px 0',borderRadius:20,overflow:'hidden',background:'#E6EEF5',boxShadow:'var(--sh)'}}>
      <WineMap sel={sel} onSel={setSel} bottles={bottles}/>
    </div>
    {r?.w&&<div style={{padding:'14px 16px 0'}}><div style={{background:'var(--sr)',borderRadius:22,padding:20,boxShadow:'var(--sh)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><div className="sc" style={{color:'var(--bx)',opacity:.7}}>{rb.length} référence{rb.length!==1?'s':''}</div>
          <h2 className="sf" style={{margin:'2px 0 0',fontSize:24,fontWeight:500}}>{r.w}</h2>
          <div style={{fontSize:12,color:'var(--im)',marginTop:2,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{r.s}</div></div>
        <div style={{width:44,height:44,borderRadius:22,background:r.ac,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 12px ${r.ac}40`}}><IcPin sz={20} c="#fff"/></div>
      </div>
      {rb.length>0?<div style={{marginTop:14,display:'flex',flexDirection:'column',gap:8}}>
        {rb.map(b=><div key={b.id} onClick={()=>onSel(b)} style={{display:'flex',gap:12,alignItems:'center',padding:'10px 12px',borderRadius:14,background:'var(--pm)',cursor:'pointer'}}>
          <div style={{width:6,height:30,borderRadius:3,background:b.robe,flexShrink:0}}/>
          <div style={{flex:1}}><div className="sf" style={{fontSize:15,fontWeight:500,lineHeight:1.2}}>{b.name}</div><div style={{fontSize:11,color:'var(--im)'}}>{b.appellation} · {b.vintage}</div></div>
          <span style={{padding:'4px 10px',borderRadius:999,fontSize:12,fontWeight:600,background:'var(--cr)',color:'var(--bx)',border:'0.5px solid var(--ln)'}}>×{b.quantity}</span>
        </div>)}
      </div>:<p style={{fontSize:15,color:'var(--im)',marginTop:14,fontStyle:'italic'}}>Aucune bouteille.</p>}
      {r.t&&<div style={{marginTop:14,padding:'12px 14px',borderRadius:14,background:'var(--pm)',display:'flex',gap:10,alignItems:'flex-start'}}>
        <span style={{fontSize:16,lineHeight:1,marginTop:2}}>🍷</span>
        <div><div className="sc" style={{fontSize:8,color:'var(--bx)',opacity:.7,marginBottom:2}}>Conseil sommelier</div>
          <p style={{fontSize:13,color:'var(--is)',margin:0,lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{r.t}</p></div>
      </div>}
    </div></div>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: STATS
// ═══════════════════════════════════════════════════════════════
function ScreenStats({bottles}) {
  const tb=bottles.reduce((s,b)=>s+(b.quantity||1),0);
  const tv=bottles.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const byC={};bottles.forEach(b=>byC[b.color]=(byC[b.color]||0)+(b.quantity||1));
  const byR={};bottles.forEach(b=>byR[b.region]=(byR[b.region]||0)+(b.quantity||1));
  const byP={};bottles.forEach(b=>(b.cepages||[]).forEach(c=>byP[c.n]=(byP[c.n]||0)+(b.quantity||1)*(c.p/100)));
  const topP=Object.entries(byP).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const clr={rouge:'#6B1E2C',blanc:'#D9B84A',effervescent:'#E6C668',liquoreux:'#D68A1A'};
  // Donut
  const entries=Object.entries(byC);let cum=0;const R=40,CX=64,CY=64,circ=2*Math.PI*R;
  // Maturity curve
  const yrs=Array.from({length:22},(_,i)=>2024+i);
  const vals=yrs.map(y=>{let v=0;bottles.forEach(b=>{if(!b.peak_from&&!b.peakFrom)return;const pf=b.peak_from||b.peakFrom,pt=b.peak_to||b.peakTo;const c=(pf+pt)/2,w=(pt-pf)/2||1;v+=(b.quantity||1)*Math.exp(-Math.pow((y-c)/w,2));});return v;});
  const mx=Math.max(...vals)||1,W=320,H=110,pd=4,xS=(W-pd*2)/(yrs.length-1);
  const pts=vals.map((v,i)=>[pd+i*xS,H-pd-(v/mx)*(H-pd-4)]);
  if(bottles.length===0) return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Tendances" title={<span>Ma cave,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>en chiffres</span></span>}/>
    <div style={{padding:'60px 40px',textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>📊</div><div className="sf" style={{fontSize:20,color:'var(--is)'}}>Ajoutez des bouteilles pour voir vos statistiques</div></div>
  </div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Tendances" title={<span>Ma cave,<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>en chiffres</span></span>}/>
    <div style={{padding:'8px 20px 0'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
        {[{l:'Bouteilles',v:tb,s:`${bottles.length} réf.`},{l:'Valeur',v:tv>=1000?`${(tv/1000).toFixed(1)}k€`:`${tv}€`,s:tb>0?`${Math.round(tv/tb)}€/bout.`:'—'},{l:'Garde moy.',v:'12 ans',s:'→ 2038'},{l:'À boire',v:'3',s:'Cette année',a:true}].map(k=><div key={k.l} style={{background:k.a?'var(--bx)':'var(--sr)',color:k.a?'var(--cr)':'var(--ink)',borderRadius:22,padding:16,boxShadow:'var(--sh)'}}>
          <div className="sc" style={{color:k.a?'var(--gs)':'var(--bx)',opacity:k.a?.9:.7,fontSize:9}}>{k.l}</div>
          <div className="sf" style={{fontSize:32,fontWeight:500,lineHeight:1.1,marginTop:4}}>{k.v}</div>
          <div style={{fontSize:11,color:k.a?'var(--gs)':'var(--im)',marginTop:2}}>{k.s}</div>
        </div>)}
      </div>
      {/* Donut */}
      <SC title="Par couleur" ey="Répartition">
        <div style={{display:'flex',gap:20,alignItems:'center'}}>
          <svg width="128" height="128" viewBox="0 0 128 128">
            {entries.map(([c,ct])=>{const p=ct/tb,len=p*circ,off=-cum*circ;cum+=p;
              return <circle key={c} cx={CX} cy={CY} r={R} fill="none" stroke={clr[c]} strokeWidth="22" strokeDasharray={`${len} ${circ}`} strokeDashoffset={off} transform={`rotate(-90 ${CX} ${CY})`}/>;})}
            <text x={CX} y={CY-2} textAnchor="middle" fontSize="28" fontFamily="'Cormorant Garamond',serif" fontWeight="500">{tb}</text>
            <text x={CX} y={CY+14} textAnchor="middle" fontSize="8" fill="var(--im)" letterSpacing="1.5">BOUT.</text>
          </svg>
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}>
            {entries.map(([c,ct])=><div key={c} style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:10,height:10,borderRadius:5,background:clr[c]}}/>
              <span style={{fontSize:14,textTransform:'capitalize',flex:1,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c}</span>
              <span className="sf" style={{fontSize:14,color:'var(--bx)',fontWeight:600}}>{ct} <span style={{opacity:.5,fontSize:11}}>({Math.round(ct/tb*100)}%)</span></span>
            </div>)}
          </div>
        </div>
      </SC>
      {/* Regions */}
      <SC title="Par région" ey="Géographie">
        {Object.entries(byR).sort((a,b)=>b[1]-a[1]).map(([rg,ct])=>{const mx2=Math.max(...Object.values(byR));return <div key={rg} style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{rg}</span><span className="sf" style={{fontSize:14,color:'var(--bx)',fontWeight:600}}>{ct}</span></div>
          <div style={{height:6,background:'var(--pm)',borderRadius:3}}><div style={{width:`${(ct/mx2)*100}%`,height:'100%',background:'var(--bx)',borderRadius:3}}/></div>
        </div>;})}
      </SC>
      {/* Maturity curve */}
      <SC title="Tendance d'apogée" ey="Prévision">
        <svg width="100%" viewBox={`0 0 ${W} ${H+16}`}>
          <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--bx)" stopOpacity=".25"/><stop offset="1" stopColor="var(--bx)" stopOpacity="0"/></linearGradient></defs>
          <path d={'M '+pts.map(p=>p.join(',')).join(' L ')+` L ${pts[pts.length-1][0]},${H-pd} L ${pts[0][0]},${H-pd} Z`} fill="url(#mg)"/>
          <path d={'M '+pts.map(p=>p.join(',')).join(' L ')} fill="none" stroke="var(--bx)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          {(()=>{const ni=2,[x,y]=pts[ni];return<><line x1={x} y1="0" x2={x} y2={H-pd} stroke="var(--g)" strokeWidth=".5" strokeDasharray="2 2"/><circle cx={x} cy={y} r="3" fill="var(--g)"/></>;})()}
          {[0,5,10,15,20].map(i=><text key={i} x={pd+i*xS} y={H+10} textAnchor="middle" fontSize="9" fill="var(--im)" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">{yrs[i]}</text>)}
        </svg>
        <p style={{fontSize:13,color:'var(--is)',margin:'12px 0 0',textAlign:'center',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Votre cave entre en pleine maturité entre 2028 et 2033.</p>
      </SC>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: PAIRINGS
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// SCREEN: GUIDE — Encyclopédie interactive du vin (13 chapitres)
// ═══════════════════════════════════════════════════════════════
const GUIDE_TOPICS=[
  {id:'pairings',title:'Accords mets & vins',desc:'Les bases de l\'harmonie à table',icon:'🍽️',gradient:'linear-gradient(140deg,#6B1E2C,#3A0F18)'},
  {id:'tasting',title:'L\'art de la dégustation',desc:'Voir, sentir, goûter : les 3 étapes',icon:'👃',gradient:'linear-gradient(140deg,#8B4513,#3E1A00)'},
  {id:'aromas',title:'Roue des arômes',desc:'Identifier et nommer les arômes',icon:'🌸',gradient:'linear-gradient(140deg,#5C6B2F,#2A3010)'},
  {id:'colors',title:'Rouges, blancs & rosés',desc:'Reconnaître un vin par sa robe',icon:'🍷',gradient:'linear-gradient(140deg,#7B2D3B,#2A0F16)'},
  {id:'cepages',title:'Les grands cépages',desc:'8 variétés essentielles à connaître',icon:'🌿',gradient:'linear-gradient(140deg,#3A6040,#1A3020)'},
  {id:'terroir',title:'Comprendre le terroir',desc:'Sol, climat & exposition',icon:'🏔️',gradient:'linear-gradient(140deg,#6A5040,#2A1A10)'},
  {id:'vinification',title:'Vendanges & vinification',desc:'Du raisin à la bouteille',icon:'🍇',gradient:'linear-gradient(140deg,#4A3060,#1A1030)'},
  {id:'regions',title:'Vignobles de France',desc:'Les grandes régions viticoles',icon:'🗺️',gradient:'linear-gradient(140deg,#2B4570,#0F1A30)'},
  {id:'lexique',title:'Vocabulaire du vin',desc:'Décoder les mots du sommelier',icon:'📖',gradient:'linear-gradient(140deg,#5A4A3A,#2A1A10)'},
  {id:'choisir',title:'Choisir son vin',desc:'6 règles pour ne jamais se tromper',icon:'🎯',gradient:'linear-gradient(140deg,#704030,#301510)'},
  {id:'gouts',title:'Trouver son profil',desc:'Découvrez vos goûts en 5 familles',icon:'❤️',gradient:'linear-gradient(140deg,#8B2A3A,#3A0F18)'},
  {id:'restaurant',title:'Choisir au restaurant',desc:'Décrypter la carte des vins',icon:'📋',gradient:'linear-gradient(140deg,#5A3E2B,#2A1A0F)'},
  {id:'cellar',title:'Constituer sa cave',desc:'Acheter, stocker, faire mûrir',icon:'🏠',gradient:'linear-gradient(140deg,#3A5050,#1A2A2A)'},
];

// SVG Aroma Wheel component
function AromaWheelFull() {
  const families=[
    {name:'Fruité',color:'#C0392B',subs:['Cassis','Cerise','Framboise','Pomme','Agrumes','Fruits exotiques','Fruits secs','Confiture']},
    {name:'Floral',color:'#E74C8B',subs:['Rose','Violette','Acacia','Jasmin','Tilleul','Pivoine']},
    {name:'Épicé',color:'#D4880F',subs:['Poivre','Cannelle','Vanille','Réglisse','Clou de girofle','Muscade']},
    {name:'Boisé',color:'#8B4513',subs:['Chêne','Cèdre','Tabac','Café','Cacao','Grillé']},
    {name:'Minéral',color:'#7F8C8D',subs:['Silex','Craie','Pierre à fusil','Iode','Graphite']},
    {name:'Végétal',color:'#27AE60',subs:['Herbe','Fougère','Sous-bois','Mousse','Champignon','Truffe']},
    {name:'Empyreumatique',color:'#6B4226',subs:['Fumée','Torréfaction','Caramel','Pain grillé','Cuir']},
    {name:'Animal',color:'#5D4037',subs:['Cuir','Gibier','Fourrure','Musc']},
  ];
  const n=families.length,cx=160,cy=160,R=145,r1=65,r2=95;
  return <svg viewBox="0 0 320 320" style={{width:'100%',maxWidth:300}}>
    {families.map((f,i)=>{
      const a1=(i/n)*Math.PI*2-Math.PI/2,a2=((i+1)/n)*Math.PI*2-Math.PI/2;
      const mid=(a1+a2)/2;
      const x1i=cx+Math.cos(a1)*r1,y1i=cy+Math.sin(a1)*r1;
      const x2i=cx+Math.cos(a2)*r1,y2i=cy+Math.sin(a2)*r1;
      const x1o=cx+Math.cos(a1)*r2,y1o=cy+Math.sin(a1)*r2;
      const x2o=cx+Math.cos(a2)*r2,y2o=cy+Math.sin(a2)*r2;
      const lx=cx+Math.cos(mid)*((r1+r2)/2),ly=cy+Math.sin(mid)*((r1+r2)/2);
      const ns=f.subs.length;
      return <g key={f.name}>
        <path d={`M${x1i},${y1i} A${r1},${r1} 0 0,1 ${x2i},${y2i} L${x2o},${y2o} A${r2},${r2} 0 0,0 ${x1o},${y1o} Z`} fill={f.color} opacity="0.85"/>
        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8" fontWeight="600" fontFamily="Inter">{f.name}</text>
        {f.subs.map((s,j)=>{
          const sa1=a1+(a2-a1)*(j/ns),sa2=a1+(a2-a1)*((j+1)/ns);
          const smid=(sa1+sa2)/2;
          const sx1=cx+Math.cos(sa1)*r2,sy1=cy+Math.sin(sa1)*r2;
          const sx2=cx+Math.cos(sa2)*r2,sy2=cy+Math.sin(sa2)*r2;
          const sx3=cx+Math.cos(sa2)*R,sy3=cy+Math.sin(sa2)*R;
          const sx4=cx+Math.cos(sa1)*R,sy4=cy+Math.sin(sa1)*R;
          const slx=cx+Math.cos(smid)*((r2+R)/2),sly=cy+Math.sin(smid)*((r2+R)/2);
          const rot=smid*180/Math.PI;
          return <g key={s}>
            <path d={`M${sx1},${sy1} A${r2},${r2} 0 0,1 ${sx2},${sy2} L${sx3},${sy3} A${R},${R} 0 0,0 ${sx4},${sy4} Z`} fill={f.color} opacity="0.55" stroke="#fff" strokeWidth="0.3"/>
            <text x={slx} y={sly} textAnchor="middle" dominantBaseline="central" fill="var(--ink)" fontSize="5.5" fontFamily="Inter" transform={`rotate(${rot>90&&rot<270?rot+180:rot},${slx},${sly})`}>{s}</text>
          </g>;
        })}
      </g>;
    })}
    <circle cx={cx} cy={cy} r={r1-2} fill="var(--cr)"/>
    <text x={cx} y={cy-6} textAnchor="middle" fill="var(--bx)" fontSize="11" fontWeight="600" fontFamily="Cormorant Garamond">Roue des</text>
    <text x={cx} y={cy+8} textAnchor="middle" fill="var(--bx)" fontSize="11" fontWeight="600" fontFamily="Cormorant Garamond" fontStyle="italic">arômes</text>
  </svg>;
}

// Tasting steps visual
function TastingVisual() {
  const steps=[
    {name:'L\'Œil',icon:'👁️',color:'#6B1E2C',items:['Limpidité','Intensité de la couleur','Nuance (rubis, grenat, tuilé…)','Viscosité (les larmes)','Brillance et éclat']},
    {name:'Le Nez',icon:'👃',color:'#8B4513',items:['1er nez : sans agiter le verre','2e nez : après aération','Familles aromatiques','Intensité et complexité','Évolution à l\'air']},
    {name:'La Bouche',icon:'👅',color:'#4A3060',items:['Attaque (1ères secondes)','Milieu de bouche','Finale et longueur (caudalies)','Tanins (soyeux → astringents)','Acidité, sucrosité, alcool']},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:16}}>
    {steps.map((s,i)=><div key={s.name} style={{display:'flex',gap:14}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{width:48,height:48,borderRadius:'50%',background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,boxShadow:`0 4px 12px ${s.color}40`}}>{s.icon}</div>
        {i<2&&<div style={{width:2,flex:1,background:'var(--ln)',marginTop:8}}/>}
      </div>
      <div style={{flex:1,paddingBottom:8}}>
        <div className="sf" style={{fontSize:18,fontWeight:600,color:s.color,marginBottom:6}}>{s.name}</div>
        {s.items.map(it=><div key={it} style={{fontSize:13,color:'var(--is)',lineHeight:1.6,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',display:'flex',gap:6}}>
          <span style={{color:s.color,fontSize:10,marginTop:3}}>●</span>{it}
        </div>)}
      </div>
    </div>)}
  </div>;
}

// Wine colors visual
function WineColorsVisual() {
  const colors=[
    {name:'Blanc jeune',hex:'#E8E4A0',notes:'Reflets verts, vivacité'},
    {name:'Blanc évolué',hex:'#D4B84A',notes:'Or profond, maturité'},
    {name:'Rosé pâle',hex:'#F5C5C0',notes:'Provence, délicat'},
    {name:'Rosé soutenu',hex:'#E88090',notes:'Tavel, vineux'},
    {name:'Rouge jeune',hex:'#9B1B30',notes:'Rubis vif, fruit'},
    {name:'Rouge mature',hex:'#6B1E2C',notes:'Grenat, complexité'},
    {name:'Rouge évolué',hex:'#4A1520',notes:'Tuilé, sous-bois'},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:8}}>
    {colors.map(c=><div key={c.name} style={{display:'flex',alignItems:'center',gap:12}}>
      <div style={{width:36,height:36,borderRadius:'50%',background:c.hex,boxShadow:`0 2px 8px ${c.hex}60`,flexShrink:0,border:'2px solid rgba(255,255,255,.5)'}}/>
      <div style={{flex:1}}>
        <div className="sf" style={{fontSize:15,fontWeight:500}}>{c.name}</div>
        <div style={{fontSize:12,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c.notes}</div>
      </div>
    </div>)}
  </div>;
}

// Pairing rules
function PairingGuide() {
  const rules=[
    {title:'Accord de poids',desc:'Un plat léger demande un vin léger. Un plat riche demande un vin puissant. La sauce guide l\'accord plus que la protéine.',icon:'⚖️'},
    {title:'Accord régional',desc:'Les vins s\'harmonisent naturellement avec les mets de leur terroir. Bourgogne et bœuf bourguignon, Alsace et choucroute.',icon:'🏔️'},
    {title:'Accord de couleur',desc:'Rouge avec viandes rouges, blanc avec poissons — mais ce n\'est qu\'un point de départ. Un blanc charpenté peut accompagner une volaille rôtie.',icon:'🎨'},
    {title:'Accord de saveurs',desc:'Cherchez la complémentarité : un vin acide avec un plat gras, un vin sucré avec un plat salé (Sauternes + Roquefort).',icon:'✨'},
  ];
  const pairings=[
    {plat:'Côte de bœuf grillée',vins:['Saint-Émilion','Cahors','Madiran'],color:'#6B1E2C'},
    {plat:'Sole meunière',vins:['Chablis','Muscadet','Sancerre'],color:'#D9B84A'},
    {plat:'Plateau de fromages',vins:['Sauternes','Gewurztraminer','Porto'],color:'#D68A1A'},
    {plat:'Tajine d\'agneau',vins:['Châteauneuf-du-Pape','Corbières','Minervois'],color:'#8B2252'},
    {plat:'Saumon fumé',vins:['Champagne','Riesling','Pouilly-Fumé'],color:'#C8A96A'},
    {plat:'Tarte au citron',vins:['Jurançon moelleux','Vouvray','Muscat de Rivesaltes'],color:'#E8C44A'},
  ];
  return <>
    {rules.map(r=><div key={r.title} style={{display:'flex',gap:12,marginBottom:16}}>
      <div style={{fontSize:24,flexShrink:0,marginTop:2}}>{r.icon}</div>
      <div><div className="sf" style={{fontSize:16,fontWeight:600,marginBottom:4}}>{r.title}</div>
        <p style={{fontSize:13,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{r.desc}</p></div>
    </div>)}
    <div style={{height:.5,background:'var(--ln)',margin:'20px 0'}}/>
    <div className="sc" style={{color:'var(--bx)',opacity:.7,marginBottom:12}}>Exemples classiques</div>
    {pairings.map(p=><div key={p.plat} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:'var(--pm)',borderRadius:16,marginBottom:8}}>
      <div style={{width:6,height:36,borderRadius:3,background:p.color,flexShrink:0}}/>
      <div style={{flex:1}}>
        <div className="sf" style={{fontSize:15,fontWeight:500}}>{p.plat}</div>
        <div style={{fontSize:12,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{p.vins.join(' · ')}</div>
      </div>
    </div>)}
  </>;
}

// Vinification process
function VinificationGuide() {
  const steps=[
    {n:'Vendanges',desc:'Manuelles ou mécaniques, le choix du moment de récolte détermine l\'équilibre sucre/acidité.',m:'Septembre-Octobre',icon:'✂️'},
    {n:'Éraflage & foulage',desc:'Séparation des rafles et écrasement doux des baies pour libérer le jus.',m:'Jour J',icon:'🫧'},
    {n:'Fermentation',desc:'Les levures transforment le sucre en alcool. En cuve inox (blancs) ou avec les peaux (rouges) pour extraire couleur et tanins.',m:'2-4 semaines',icon:'🧪'},
    {n:'Pressurage',desc:'Pour les rouges : séparation du vin de goutte et du marc. Pour les blancs : avant fermentation.',m:'Après fermentation',icon:'🔧'},
    {n:'Élevage',desc:'En cuve (fruité préservé), en fût de chêne (vanille, complexité) ou en amphore (minéralité). De 6 mois à 3 ans.',m:'6-36 mois',icon:'🪵'},
    {n:'Assemblage',desc:'Le maître de chai assemble les cuvées. Chaque parcelle, chaque cépage apporte sa note.',m:'Avant mise',icon:'🎼'},
    {n:'Mise en bouteille',desc:'Filtration éventuelle, sulfitage léger, puis bouchage. Le vin continue d\'évoluer en bouteille.',m:'Printemps',icon:'🍾'},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:0}}>
    {steps.map((s,i)=><div key={s.n} style={{display:'flex',gap:14,paddingBottom:i<steps.length-1?16:0}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{width:40,height:40,borderRadius:12,background:'var(--pm)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,border:'1.5px solid var(--ln)'}}>{s.icon}</div>
        {i<steps.length-1&&<div style={{width:1.5,flex:1,background:'var(--ln)',marginTop:6}}/>}
      </div>
      <div style={{flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><div className="sf" style={{fontSize:16,fontWeight:600}}>{s.n}</div><span style={{fontSize:10,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{s.m}</span></div>
        <p style={{fontSize:13,color:'var(--is)',margin:'4px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{s.desc}</p>
      </div>
    </div>)}
  </div>;
}

// Regions guide
function RegionsGuide() {
  const regions=[
    {name:'Bordeaux',ha:'111 000 ha',cepages:'Merlot, Cabernet Sauvignon, Cabernet Franc',style:'Puissance, structure, garde',color:'#6B1E2C'},
    {name:'Bourgogne',ha:'30 000 ha',cepages:'Pinot Noir, Chardonnay',style:'Finesse, terroir, élégance',color:'#891A31'},
    {name:'Champagne',ha:'34 000 ha',cepages:'Chardonnay, Pinot Noir, Pinot Meunier',style:'Effervescence, fraîcheur, fête',color:'#C8A96A'},
    {name:'Rhône',ha:'71 000 ha',cepages:'Syrah (Nord), Grenache (Sud)',style:'Générosité, épices, soleil',color:'#5A1020'},
    {name:'Loire',ha:'70 000 ha',cepages:'Chenin, Sauvignon, Cabernet Franc',style:'Diversité, fraîcheur, vivacité',color:'#2B7050'},
    {name:'Alsace',ha:'15 500 ha',cepages:'Riesling, Gewurztraminer, Pinot Gris',style:'Aromatique, pureté, cépages',color:'#4A7030'},
    {name:'Languedoc-Roussillon',ha:'228 000 ha',cepages:'Grenache, Syrah, Mourvèdre, Carignan',style:'Soleil, valeur, renouveau',color:'#D4880F'},
    {name:'Provence',ha:'27 000 ha',cepages:'Grenache, Cinsault, Mourvèdre, Rolle',style:'Rosé, lumière, Méditerranée',color:'#E8A0B5'},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:10}}>
    {regions.map(r=><div key={r.name} style={{background:'var(--pm)',borderRadius:18,padding:'14px 16px',border:'0.5px solid var(--ln)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
        <div style={{width:10,height:10,borderRadius:5,background:r.color}}/>
        <span className="sf" style={{fontSize:18,fontWeight:600}}>{r.name}</span>
        <span style={{fontSize:11,color:'var(--im)',marginLeft:'auto'}}>{r.ha}</span>
      </div>
      <div style={{fontSize:12,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5}}>
        <strong style={{color:'var(--ink)',fontWeight:500}}>Cépages :</strong> {r.cepages}<br/>
        <strong style={{color:'var(--ink)',fontWeight:500}}>Style :</strong> {r.style}
      </div>
    </div>)}
  </div>;
}

// Cépages guide
function CepagesGuide() {
  const cepages=[
    {name:'Cabernet Sauvignon',type:'rouge',color:'#4A1520',origin:'Bordeaux',profile:'Roi des cépages rouges. Tanins puissants, cassis, cèdre. Structuré, fait pour la garde.',aromas:['Cassis','Cèdre','Poivron vert','Tabac'],sols:'Graves, sols chauds et drainants',regions:'Bordeaux (Médoc) · Napa Valley · Chili · Australie'},
    {name:'Merlot',type:'rouge',color:'#6B1E2C',origin:'Bordeaux',profile:'Rondeur et fruité. Plus souple que le Cabernet, tanins veloutés. Accessible jeune.',aromas:['Prune','Cerise','Chocolat','Vanille'],sols:'Argilo-calcaire, sols frais',regions:'Bordeaux (rive droite) · Sud-Ouest · Italie · Washington'},
    {name:'Pinot Noir',type:'rouge',color:'#772133',origin:'Bourgogne',profile:'Finesse et élégance. Mono-cépage en Bourgogne. Sensible au terroir, peu tannique.',aromas:['Cerise','Framboise','Rose','Sous-bois'],sols:'Calcaire, marnes, sols pauvres',regions:'Bourgogne · Champagne · Alsace · Oregon · Nouvelle-Zélande'},
    {name:'Syrah',type:'rouge',color:'#3A0F18',origin:'Vallée du Rhône',profile:'Puissance et épices. Poivre noir caractéristique. Couleur intense, garde excellente.',aromas:['Poivre noir','Violette','Mûre','Olive noire'],sols:'Granite, schiste, sols pauvres et chauds',regions:'Rhône Nord · Languedoc · Australie (Shiraz) · Afrique du Sud'},
    {name:'Grenache',type:'rouge',color:'#8B2A3A',origin:'Espagne (Aragon)',profile:'Généreux et solaire. Fruits rouges mûrs, épices douces. Base des vins du sud.',aromas:['Fraise','Garrigue','Cannelle','Réglisse'],sols:'Galets roulés, schiste, sols arides',regions:'Rhône Sud · Languedoc · Priorat · Sardaigne'},
    {name:'Chardonnay',type:'blanc',color:'#D4B040',origin:'Bourgogne',profile:'Le caméléon. Vif et minéral en Chablis, beurré et boisé en Meursault. S\'adapte à tout terroir.',aromas:['Pomme','Beurre','Noisette','Brioche'],sols:'Calcaire (Bourgogne), tous sols',regions:'Bourgogne · Champagne · Californie · Australie'},
    {name:'Sauvignon Blanc',type:'blanc',color:'#C8D850',origin:'Loire',profile:'Fraîcheur et vivacité. Notes d\'agrumes et de buis. Net et tranchant.',aromas:['Pamplemousse','Buis','Fruit de la passion','Silex'],sols:'Silex, calcaire, argile',regions:'Loire (Sancerre) · Bordeaux · Nouvelle-Zélande'},
    {name:'Riesling',type:'blanc',color:'#E8E4A0',origin:'Alsace / Allemagne',profile:'Pureté cristalline. Grande acidité, arômes pétrolés en vieillissant. Peut être sec ou moelleux.',aromas:['Citron vert','Pétrole','Fleurs blanches','Miel'],sols:'Granite, schiste, calcaire',regions:'Alsace · Moselle · Australie · Finger Lakes'},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:10}}>
    <p style={{fontSize:13,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5,margin:'0 0 4px'}}>
      Le cépage est la variété de raisin utilisée. Il définit 60% du caractère du vin — le terroir fait le reste.
    </p>
    {cepages.map(c=><div key={c.name} style={{background:'var(--sr)',borderRadius:18,padding:'16px',boxShadow:'var(--sh)',border:'0.5px solid var(--ln)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
        <div style={{width:22,height:22,borderRadius:7,background:c.color}}/>
        <span className="sf" style={{fontSize:17,fontWeight:600,flex:1}}>{c.name}</span>
        <span className="sc" style={{fontSize:9,background:c.type==='rouge'?'#F5E8EB':'#FBF6E8',color:c.type==='rouge'?'var(--bx)':'#8A7020',padding:'3px 8px',borderRadius:999}}>{c.type}</span>
      </div>
      <p style={{fontSize:13,color:'var(--is)',margin:'0 0 10px',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{c.profile}</p>
      <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:10}}>
        {c.aromas.map(a=><span key={a} style={{background:c.color+'12',color:c.color,padding:'3px 9px',borderRadius:999,fontSize:11,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{a}</span>)}
      </div>
      <div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)'}}>
        <div style={{fontSize:11,color:'var(--im)',marginBottom:2}}><strong style={{color:'var(--ink)'}}>Sols :</strong> {c.sols}</div>
        <div style={{fontSize:11,color:'var(--im)'}}><strong style={{color:'var(--ink)'}}>Régions :</strong> {c.regions}</div>
      </div>
    </div>)}
  </div>;
}

// Terroir guide
function TerroirGuide() {
  const sols=[
    {name:'Calcaire',icon:'🤍',effect:'Drainage excellent, stress hydrique modéré. Vins tendus, minéraux, belle acidité.',regions:'Bourgogne, Champagne, Loire'},
    {name:'Argile',icon:'🟤',effect:'Retient l\'eau, sols frais. Favorise la rondeur, le corps et la richesse.',regions:'Pomerol, Pommard, Cahors'},
    {name:'Graves / Galets',icon:'⚪',effect:'Accumulent la chaleur le jour, la restituent la nuit. Vins concentrés.',regions:'Graves, Châteauneuf-du-Pape, Médoc'},
    {name:'Schiste',icon:'📐',effect:'Sols pauvres, la vigne souffre et se concentre. Vins intenses et profonds.',regions:'Banyuls, Côte-Rôtie, Anjou, Moselle'},
    {name:'Granite',icon:'🪨',effect:'Sols acides et drainants. Finesse aromatique, vins élégants et floraux.',regions:'Beaujolais (crus), Rhône Nord, Alsace'},
    {name:'Silex',icon:'🔥',effect:'Pierre à fusil. Minéralité tranchante et fumée caractéristique.',regions:'Sancerre, Pouilly-Fumé, Vouvray'},
  ];
  return <>
    <p style={{fontSize:13,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5,margin:'0 0 12px'}}>
      Le terroir, c'est l'alchimie entre le sol, le climat et l'exposition. C'est lui qui rend chaque vin unique — même avec le même cépage.
    </p>
    {sols.map(s=><div key={s.name} style={{display:'flex',gap:12,marginBottom:14}}>
      <div style={{width:40,height:40,borderRadius:12,background:'var(--pm)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0,border:'1px solid var(--ln)'}}>{s.icon}</div>
      <div style={{flex:1}}>
        <div className="sf" style={{fontSize:16,fontWeight:600,marginBottom:4}}>{s.name}</div>
        <p style={{fontSize:13,color:'var(--is)',margin:'0 0 4px',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{s.effect}</p>
        <div style={{fontSize:11,color:'var(--im)'}}><strong style={{color:'var(--ink)'}}>Régions :</strong> {s.regions}</div>
      </div>
    </div>)}
    <div style={{background:'var(--pm)',borderRadius:18,padding:16,marginTop:8,border:'0.5px solid var(--ln)'}}>
      <div className="sf" style={{fontSize:15,fontWeight:600,marginBottom:8}}>Les 3 facteurs du terroir</div>
      {[['🌍 Sol','Draine ou retient l\'eau, apporte les minéraux, règle la vigueur de la vigne.'],['☀️ Climat','Continental, océanique, méditerranéen — chacun donne un style différent.'],['⛰️ Exposition','Coteau orienté sud = plus de soleil = maturité. Nord = fraîcheur et acidité.']].map(([t,d])=><div key={t} style={{marginBottom:8}}>
        <div style={{fontSize:13,fontWeight:600,color:'var(--bx)'}}>{t}</div>
        <p style={{fontSize:12,color:'var(--is)',margin:'2px 0 0',lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{d}</p>
      </div>)}
    </div>
  </>;
}

// Lexique du vin
function LexiqueGuide() {
  const vocab=[
    {term:'Tannique',def:'Sensation d\'assèchement en bouche, comme du thé fort. Vient des peaux et pépins. Les tanins s\'adoucissent avec l\'âge.',scale:['Souple','Soyeux','Ferme','Tannique','Astringent'],level:2,tip:'Les tanins puissants ont besoin de plats gras (viande rouge, fromage) pour s\'équilibrer.'},
    {term:'Charpenté',def:'Vin costaud, avec du corps et de la structure. Souvent riche en alcool et en tanins.',scale:['Léger','Moyen','Costaud','Charpenté','Massif'],level:3,tip:'Idéal avec les plats d\'hiver : gibier, cassoulet, ragoûts.'},
    {term:'Minéral',def:'Notes de pierre, silex, craie, iode. Souvent lié au terroir calcaire. Donne une sensation de fraîcheur et de profondeur.',scale:['Absent','Discret','Présent','Marqué','Dominant'],level:2,tip:'La minéralité s\'exprime mieux dans les blancs secs et les vins non boisés.'},
    {term:'Boisé',def:'Arômes de vanille, toast, café, caramel apportés par l\'élevage en fût de chêne. Un boisé discret enrichit ; un boisé excessif masque le fruit.',scale:['Inox','Discret','Intégré','Boisé','Très boisé'],level:2,tip:'Les vins « non boisés » élevés en cuve inox sont plus purs et fruités. Le boisé n\'est pas un gage de qualité.'},
    {term:'Long en bouche',def:'La persistance aromatique après avoir avalé. Se mesure en « caudalies » (1 caudalie = 1 seconde). Un grand vin peut durer 15-20 secondes.',scale:['Court','Moyen','Long','Très long','Infini'],level:3,tip:'La longueur est un des meilleurs indicateurs de qualité. Plus un vin persiste, plus il est grand.'},
    {term:'Rond',def:'Vin souple, gras, sans aspérité. Les tanins sont fondus, l\'acidité est basse. Sensation de velours.',scale:['Anguleux','Vif','Souple','Rond','Opulent'],level:3,tip:'Les vins ronds se boivent facilement jeunes et accompagnent les plats crémeux.'},
    {term:'Vif',def:'Bonne acidité, fraîcheur marquée. Donne envie de reprendre une gorgée. L\'acidité est la colonne vertébrale d\'un blanc.',scale:['Plat','Frais','Vif','Nerveux','Mordant'],level:2,tip:'L\'acidité équilibre les plats gras et les sauces riches. Un vin vif nettoie le palais.'},
    {term:'Complexe',def:'Un vin qui révèle de multiples arômes et saveurs, qui évolue dans le verre. Contraire de « simple » ou « monolithique ».',scale:['Simple','Plaisant','Riche','Complexe','Fascinant'],level:3,tip:'La complexité vient du terroir, de l\'âge, et du savoir-faire. Les grands vins se dégustent lentement.'},
  ];
  return <div style={{display:'flex',flexDirection:'column',gap:14}}>
    {vocab.map(v=><div key={v.term} style={{background:'var(--sr)',borderRadius:18,padding:'16px',boxShadow:'var(--sh)',border:'0.5px solid var(--ln)'}}>
      <div className="sf" style={{fontSize:18,fontWeight:600,marginBottom:6,color:'var(--bx)'}}>{v.term}</div>
      <p style={{fontSize:13,color:'var(--is)',margin:'0 0 10px',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{v.def}</p>
      <div style={{display:'flex',gap:2,marginBottom:6}}>
        {v.scale.map((l,i)=><div key={i} style={{flex:1,height:6,borderRadius:3,background:i<=v.level?'var(--bx)':'var(--pm)',opacity:i<=v.level?0.3+(i/v.scale.length)*0.7:0.4}}/>)}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
        {v.scale.map((l,i)=><span key={i} style={{fontSize:8,color:i===v.level?'var(--bx)':'var(--im)',fontWeight:i===v.level?600:400,textAlign:'center',flex:1}}>{l}</span>)}
      </div>
      <div style={{padding:'10px 12px',borderRadius:12,background:'var(--pm)',display:'flex',gap:8}}>
        <span style={{fontSize:14}}>💡</span>
        <p style={{fontSize:12,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{v.tip}</p>
      </div>
    </div>)}
  </div>;
}

// Comment choisir
function ChoisirGuide() {
  const tips=[
    {title:'Commencez par l\'occasion',icon:'🎯',text:'Apéro décontracté ? Dîner gastronomique ? Cadeau ? L\'occasion dicte le budget et le style.'},
    {title:'Pensez au plat',icon:'🍽️',text:'Accord poids pour poids : plat léger = vin léger, plat riche = vin corsé. La sauce guide plus que la viande.'},
    {title:'Lisez l\'étiquette',icon:'🏷️',text:'Appellation = zone. Millésime = année. Classement (Grand Cru, etc.) = hiérarchie qualitative.'},
    {title:'Repérez le degré d\'alcool',icon:'📊',text:'11-12.5° → léger et frais. 13-14° → moyen, équilibré. 14.5°+ → corsé et puissant.'},
    {title:'Fiez-vous au caviste',icon:'🧑‍🍳',text:'Un bon caviste vaut mieux que 100 guides. Décrivez ce que vous aimez, il trouvera.'},
    {title:'Notez vos dégustations',icon:'📝',text:'Gardez une trace de ce que vous buvez. Avec le temps, vos goûts deviennent clairs. C\'est le but de CAVE !'},
  ];
  const temps=[
    {label:'Effervescents',temp:'6-8°C',dot:'#89CFF0'},{label:'Blancs légers',temp:'8-10°C',dot:'#B4D7A8'},
    {label:'Blancs corsés',temp:'10-12°C',dot:'#D4B896'},{label:'Rosés',temp:'8-10°C',dot:'#F4B4C0'},
    {label:'Rouges légers',temp:'14-16°C',dot:'#D4848F'},{label:'Rouges corsés',temp:'16-18°C',dot:'#8B3545'},
  ];
  return <>
    {tips.map((tip,i)=><div key={i} style={{display:'flex',gap:14,marginBottom:16}}>
      <div style={{width:40,height:40,borderRadius:12,background:'var(--pm)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{tip.icon}</div>
      <div style={{flex:1}}>
        <div className="sf" style={{fontSize:16,fontWeight:600,marginBottom:4}}>{tip.title}</div>
        <p style={{fontSize:13,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{tip.text}</p>
      </div>
      <span className="sf" style={{fontSize:22,fontWeight:300,color:'var(--g)',opacity:.5}}>{i+1}</span>
    </div>)}
    <div style={{background:'linear-gradient(135deg,#3A0F18,var(--bx))',borderRadius:20,padding:20,marginTop:8}}>
      <div className="sc" style={{color:'var(--gs)',opacity:.8,marginBottom:10}}>Mémo température</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {temps.map(t=><div key={t.label} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:12,background:'rgba(245,237,224,0.08)'}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:t.dot,flexShrink:0}}/>
          <div><div style={{fontSize:11,color:'rgba(245,237,224,0.7)'}}>{t.label}</div>
            <div className="sf" style={{fontSize:15,fontWeight:500,color:'var(--g)'}}>{t.temp}</div></div>
        </div>)}
      </div>
    </div>
  </>;
}

// Détecter ses goûts
function GoutsGuide() {
  const profiles=[
    {name:'Fruité & Léger',emoji:'🍒',color:'#D4848F',desc:'Vins accessibles, frais et gourmands.',red:'Beaujolais (Gamay), Pinot Noir d\'Alsace, Valpolicella',white:'Muscadet, Picpoul de Pinet, Vermentino'},
    {name:'Puissant & Corsé',emoji:'🦁',color:'#4A1520',desc:'Structure, tanins, intensité.',red:'Cahors, Madiran, Bandol, Barolo, Châteauneuf-du-Pape',white:'Meursault boisé, Hermitage blanc, Condrieu'},
    {name:'Frais & Minéral',emoji:'💎',color:'#6A8A9A',desc:'Tension, pureté, précision.',red:'Bourgogne (Volnay), Sancerre rouge, Trousseau du Jura',white:'Chablis, Sancerre, Riesling sec'},
    {name:'Rond & Gourmand',emoji:'🍫',color:'#8B3545',desc:'Rondeur, velours, générosité.',red:'Saint-Émilion, Pomerol, Côtes du Rhône Villages',white:'Viognier, Marsanne, Chardonnay de Californie'},
    {name:'Aromatique & Exotique',emoji:'🌺',color:'#B8963A',desc:'Parfums intenses, découvertes.',red:'Mourvèdre, Nebbiolo, Malbec argentin',white:'Gewurztraminer, Muscat, Torrontés, Grüner Veltliner'},
  ];
  return <>
    <p style={{fontSize:13,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5,margin:'0 0 16px'}}>
      Quel profil vous attire ? Explorez les familles de goûts pour trouver votre style.
    </p>
    {profiles.map(p=><div key={p.name} style={{background:'var(--sr)',borderRadius:18,padding:'16px',marginBottom:10,boxShadow:'var(--sh)',border:'0.5px solid var(--ln)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
        <div style={{width:42,height:42,borderRadius:12,background:p.color+'25',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{p.emoji}</div>
        <div><div className="sf" style={{fontSize:17,fontWeight:600}}>{p.name}</div>
          <div style={{fontSize:12,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{p.desc}</div></div>
      </div>
      <div style={{padding:'10px 12px',borderRadius:14,background:'var(--pm)'}}>
        <div style={{marginBottom:6}}><div className="sc" style={{color:'var(--bx)',opacity:.7,fontSize:9}}>Essayez en rouge</div>
          <div style={{fontSize:12,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:2}}>{p.red}</div></div>
        <div style={{height:.5,background:'var(--ln)',margin:'4px 0'}}/>
        <div style={{marginTop:6}}><div className="sc" style={{color:'#8A7020',opacity:.7,fontSize:9}}>Essayez en blanc</div>
          <div style={{fontSize:12,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:2}}>{p.white}</div></div>
      </div>
    </div>)}
    <div style={{textAlign:'center',padding:20,background:'var(--pm)',borderRadius:20,marginTop:8,border:'0.5px solid var(--ln)'}}>
      <span style={{fontSize:28,display:'block',marginBottom:8}}>🍷</span>
      <p className="sf" style={{fontSize:17,fontWeight:500,margin:'0 0 6px'}}>« Le meilleur vin est celui que <em>vous</em> aimez. »</p>
      <p style={{fontSize:13,color:'var(--im)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Il n'y a pas de mauvais goût — seulement des découvertes à faire.</p>
    </div>
  </>;
}

function ScreenGuide() {
  const [topic,setTopic]=useState(null);

  if(topic){
    const t=GUIDE_TOPICS.find(t=>t.id===topic);
    return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
      <div style={{padding:'52px 24px 16px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <IB icon={<IcBack sz={18}/>} onClick={()=>setTopic(null)}/>
          <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>Encyclopédie</div>
            <h1 className="sf" style={{margin:0,fontSize:24,fontWeight:500}}>{t?.title}</h1></div>
          <span style={{fontSize:28}}>{t?.icon}</span>
        </div>
      </div>
      <div style={{padding:'0 20px'}}>
        {topic==='pairings'&&<SC title="Les 4 règles d'or" ey="Principes"><PairingGuide/></SC>}
        {topic==='tasting'&&<><SC title="Les 3 étapes" ey="Méthode"><TastingVisual/></SC>
          <SC title="Vocabulaire" ey="Expressions clés">
            {[['Longueur en bouche','Mesurée en caudalies (1 caudalie = 1 seconde). Un grand vin dépasse 10 caudalies.'],['Tanins','Composés des peaux et pépins. Soyeux, fondus, astringents ou poudrés.'],['Rétro-olfaction','Les arômes perçus en bouche, qui « remontent » vers le nez.'],['Équilibre','L\'harmonie entre acidité, alcool, tanins et fruit.']].map(([t,d])=><div key={t} style={{marginBottom:14}}>
              <div className="sf" style={{fontSize:15,fontWeight:600,color:'var(--bx)'}}>{t}</div>
              <p style={{fontSize:13,color:'var(--is)',margin:'4px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{d}</p>
            </div>)}
          </SC>
        </>}
        {topic==='aromas'&&<><SC title="La roue complète" ey="8 familles aromatiques">
          <div style={{display:'flex',justifyContent:'center',padding:'8px 0'}}><AromaWheelFull/></div>
          <p style={{fontSize:13,color:'var(--is)',margin:'12px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',textAlign:'center'}}>Chaque vin exprime un mélange unique de ces familles. L'entraînement du nez permet de les distinguer.</p>
        </SC>
          <SC title="Par couleur de vin" ey="Arômes typiques">
            {[['Rouges jeunes','Fruits rouges frais (cerise, framboise, groseille), violette, poivre','#9B1B30'],['Rouges évolués','Sous-bois, cuir, truffe, tabac, fruits confits','#4A1520'],['Blancs secs','Agrumes, fleurs blanches, minéralité, pomme verte','#D9B84A'],['Blancs boisés','Vanille, beurre, noisette grillée, brioche','#C8A050'],['Rosés','Pamplemousse, fraise, bonbon anglais, pêche','#E88090']].map(([t,d,c])=><div key={t} style={{display:'flex',gap:10,marginBottom:14}}>
              <div style={{width:6,borderRadius:3,background:c,flexShrink:0}}/>
              <div><div className="sf" style={{fontSize:14,fontWeight:600}}>{t}</div>
                <p style={{fontSize:12,color:'var(--is)',margin:'2px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{d}</p></div>
            </div>)}
          </SC>
        </>}
        {topic==='colors'&&<SC title="Décoder la robe" ey="Analyse visuelle"><WineColorsVisual/>
          <div style={{marginTop:16,padding:14,background:'var(--pm)',borderRadius:14}}>
            <div className="sf" style={{fontSize:14,fontWeight:600,marginBottom:6}}>Astuce du sommelier</div>
            <p style={{fontSize:13,color:'var(--is)',margin:0,lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Inclinez votre verre au-dessus d'une surface blanche. Le centre révèle l'intensité, le bord (disque) révèle l'âge.</p>
          </div>
        </SC>}
        {topic==='cepages'&&<SC title="Les grands cépages" ey="8 variétés essentielles"><CepagesGuide/></SC>}
        {topic==='terroir'&&<SC title="Sol, climat & exposition" ey="Le triangle du terroir"><TerroirGuide/></SC>}
        {topic==='vinification'&&<SC title="Du raisin à la bouteille" ey="Les étapes"><VinificationGuide/></SC>}
        {topic==='regions'&&<SC title="Les 8 grandes régions" ey="France viticole"><RegionsGuide/></SC>}
        {topic==='lexique'&&<SC title="Décoder les mots du vin" ey="8 termes essentiels"><LexiqueGuide/></SC>}
        {topic==='choisir'&&<SC title="6 règles simples" ey="Ne jamais se tromper"><ChoisirGuide/></SC>}
        {topic==='gouts'&&<SC title="Trouvez votre profil" ey="5 familles de palais"><GoutsGuide/></SC>}
        {topic==='restaurant'&&<SC title="Décrypter la carte" ey="Conseils pratiques">
          {[['Fixez un budget','Repérez la 2e ou 3e bouteille la moins chère — souvent le meilleur rapport qualité-prix.'],['Demandez conseil','Le sommelier est là pour vous aider. Dites-lui vos plats et votre budget, il trouvera la perle.'],['Osez les régions méconnues','Languedoc, Rhône Sud, Loire : des vins magnifiques à prix doux face aux Bourgogne et Bordeaux.'],['Le vin au verre','Parfait pour goûter sans s\'engager. Vérifiez qu\'il est frais (ouvert récemment).'],['L\'accord unique','Choisissez un vin qui s\'accorde au plat le plus complexe de la table. Les plats simples suivront.'],['Les signes de qualité','AOC/AOP garantit l\'origine. « Mis en bouteille au domaine » est un gage de traçabilité.']].map(([t,d])=><div key={t} style={{marginBottom:16}}>
            <div className="sf" style={{fontSize:15,fontWeight:600,color:'var(--bx)'}}>{t}</div>
            <p style={{fontSize:13,color:'var(--is)',margin:'4px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{d}</p>
          </div>)}
        </SC>}
        {topic==='cellar'&&<SC title="Votre première cave" ey="Guide d'achat">
          {[['La règle des tiers','1/3 à boire maintenant, 1/3 à garder 2-5 ans, 1/3 à garder 5-15 ans. Vous aurez toujours quelque chose de prêt.'],['Diversifiez','Mélangez couleurs, régions et cépages. 6 rouges, 3 blancs, 1 effervescent est un bon début pour 10 bouteilles.'],['Le prix juste','Entre 10€ et 30€ se trouvent d\'excellents vins. Au-delà, vous payez la rareté plus que la qualité.'],['Stockage','Couché, à l\'abri de la lumière, entre 12°C et 14°C, humidité 70%. Une cave, un garage frais ou une armoire à vin.'],['Achetez par 3 ou 6','Vous pourrez suivre l\'évolution en goûtant une bouteille tous les ans.'],['Les sources','Domaines en direct, salons de vignerons, cavistes indépendants. Évitez les promotions en grande surface.']].map(([t,d])=><div key={t} style={{marginBottom:16}}>
            <div className="sf" style={{fontSize:15,fontWeight:600,color:'var(--bx)'}}>{t}</div>
            <p style={{fontSize:13,color:'var(--is)',margin:'4px 0 0',lineHeight:1.5,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{d}</p>
          </div>)}
        </SC>}
      </div>
    </div>;
  }

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Apprendre" title={<span>Guide du<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>vin</span></span>}/>
    <div style={{padding:'8px 20px 0'}}>
      <p style={{fontSize:14,color:'var(--is)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.5,margin:'0 0 16px'}}>
        Tout ce qu'il faut savoir pour apprécier, choisir et servir le vin avec confiance.
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {GUIDE_TOPICS.map(t=><button key={t.id} onClick={()=>setTopic(t.id)} style={{border:0,borderRadius:20,background:t.gradient,padding:'18px 20px',cursor:'pointer',display:'flex',alignItems:'center',gap:14,textAlign:'left',boxShadow:'0 4px 16px rgba(0,0,0,.15)'}}>
          <span style={{fontSize:28}}>{t.icon}</span>
          <div style={{flex:1}}>
            <div style={{color:'#fff',fontSize:16,fontWeight:600,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>{t.title}</div>
            <div style={{color:'rgba(255,255,255,.7)',fontSize:12,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',marginTop:3}}>{t.desc}</div>
          </div>
          <IcArrow sz={18} c="rgba(255,255,255,.5)"/>
        </button>)}
      </div>
    </div>
  </div>;
}


// ═══════════════════════════════════════════════════════════════
// SCREEN: FRIENDS
// ═══════════════════════════════════════════════════════════════
function ScreenFriends() {
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <PH ey="Cercle" title={<span>Entre<br/><span style={{fontStyle:'italic',color:'var(--bx)'}}>amateurs</span></span>}/>
    <div style={{padding:'8px 20px 0'}}>
      <SC title="Activité récente" ey="Fil">
        {[{f:FRIENDS[0],a:'a dégusté',w:'Clos Rougeard Le Bourg 2016',r:5,t:'il y a 2h',c:'Le Cab Franc dans sa plus pure expression.'},
          {f:FRIENDS[1],a:'a ajouté',w:'Domaine Roulot Meursault 2021',t:'hier',q:3},
          {f:FRIENDS[2],a:'recommande',w:'Domaine Tempier Bandol 2020',t:'il y a 2j',c:'À garder 10 ans.'}
        ].map((x,i)=><div key={i}>{i>0&&<div style={{height:.5,background:'var(--ln)',margin:'16px 0'}}/>}
          <div style={{display:'flex',gap:12}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:x.f.color,color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:500,flexShrink:0}}>{x.f.ini}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,color:'var(--is)',lineHeight:1.4}}><span className="sf" style={{fontWeight:600}}>{x.f.name.split(' ')[0]}</span> {x.a} <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--bx)'}}>{x.w}</span>{x.q&&` · ×${x.q}`}</div>
              {x.r&&<SR v={x.r} sz={12}/>}
              {x.c&&<p style={{fontSize:14,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',color:'var(--is)',margin:'4px 0 0',lineHeight:1.4}}>« {x.c} »</p>}
              <div style={{fontSize:11,color:'var(--im)',marginTop:6}}>{x.t}</div>
            </div>
          </div>
        </div>)}
      </SC>
      <SC title="Votre cercle" ey={`${FRIENDS.length} amis`}>
        {FRIENDS.map(f=><div key={f.name} style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
          <div style={{width:48,height:48,borderRadius:'50%',background:f.color,color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:500,flexShrink:0}}>{f.ini}</div>
          <div style={{flex:1}}><div className="sf" style={{fontSize:16,fontWeight:500}}>{f.name}</div><div style={{fontSize:11,color:'var(--im)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>{f.cellar} bouteilles · {f.tone}</div></div>
          <span style={{padding:'6px 12px',borderRadius:999,fontSize:12,fontWeight:500,background:'rgba(200,169,106,.15)',color:'#8B6A2A',border:'0.5px solid rgba(200,169,106,.3)'}}>{f.shared} partagées</span>
        </div>)}
      </SC>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: PROFILE
// ═══════════════════════════════════════════════════════════════
function ScreenProfile({onNav,bottles,profile,onLogout,onSeedCatalog}) {
  const nm=profile?.name||'Ami';
  const [seeding,setSeeding]=useState(false);
  const [seedMsg,setSeedMsg]=useState('');
  const tb=bottles.reduce((s,b)=>s+(b.quantity||1),0),tv=bottles.reduce((s,b)=>s+(b.price||0)*(b.quantity||1),0);
  const regs=[...new Set(bottles.map(b=>b.region).filter(Boolean))];
  const oldest=bottles.length?Math.min(...bottles.map(b=>b.vintage).filter(Boolean)):'—';
  const avg=bottles.length?Math.round(bottles.reduce((s,b)=>s+(b.score||0),0)/bottles.length):0;
  const types={};bottles.forEach(b=>types[b.color]=(types[b.color]||0)+(b.quantity||1));
  const tc={rouge:'#6B1E2C',blanc:'#D9B84A',effervescent:'#C8A96A',liquoreux:'#D68A1A'};
  const rc={};bottles.forEach(b=>b.region&&(rc[b.region]=(rc[b.region]||0)+(b.quantity||1)));
  const fav=Object.entries(rc).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'48px 24px 28px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)',textAlign:'center'}}>
      <div style={{width:88,height:88,borderRadius:'50%',margin:'0 auto 14px',background:'linear-gradient(135deg,var(--bx) 0%,var(--bs) 100%)',color:'var(--cr)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontFamily:"'Cormorant Garamond',serif",fontWeight:500,boxShadow:'0 8px 24px rgba(107,30,44,.25)',border:'3px solid var(--cr)'}}>{(nm[0]||'?').toUpperCase()}</div>
      <h1 className="sf" style={{margin:0,fontSize:28,fontWeight:500}}>{nm}</h1>
      <div style={{fontSize:13,color:'var(--im)',marginTop:4,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Amateur éclairé</div>
    </div>
    <div style={{padding:'0 20px'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:-8}}>
        {[{l:'Bouteilles',v:tb,i:'🍾'},{l:'Valeur cave',v:tv.toLocaleString('fr')+'\u00A0€',i:'💰'},{l:'Régions',v:regs.length,i:'🗺️'},{l:'Score moyen',v:avg?avg+'/100':'—',i:'⭐'}].map(s=><div key={s.l} style={{background:'var(--sr)',borderRadius:18,padding:'16px 18px',boxShadow:'var(--sh)'}}>
          <div style={{fontSize:20,marginBottom:6}}>{s.i}</div>
          <div className="sf" style={{fontSize:22,fontWeight:600}}>{s.v}</div>
          <div style={{fontSize:11,color:'var(--im)',marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
      {bottles.length>0&&<SC title="Mon profil de goût" ey="Préférences">
        {[['Région favorite',fav],['Plus ancien millésime',oldest],['Style dominant','Vins de garde']].map(([l,v],i)=><div key={l}>{i>0&&<div style={{height:.5,background:'var(--ln)',margin:'14px 0'}}/>}<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:14,color:'var(--is)'}}>{l}</span>
          <span className="sf" style={{fontSize:15,fontWeight:600,color:i===0?'var(--bx)':'var(--ink)'}}>{v}</span>
        </div></div>)}
      </SC>}
      {Object.keys(types).length>0&&<SC title="Répartition" ey="Par type">
        <div style={{display:'flex',gap:6,height:10,borderRadius:5,overflow:'hidden',marginBottom:14}}>
          {Object.entries(types).map(([t,c])=><div key={t} style={{flex:c,background:tc[t],borderRadius:5}}/>)}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {Object.entries(types).map(([t,c])=><div key={t} style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:8,height:8,borderRadius:4,background:tc[t]}}/>
            <span style={{fontSize:12,color:'var(--is)',textTransform:'capitalize'}}>{t} ({c})</span>
          </div>)}
        </div>
      </SC>}
      <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
        {[{l:'Réglages',ic:<IcSettings sz={20} c="var(--bx)"/>},{l:'Exporter ma cave',ic:<IcExport sz={20} c="var(--bx)"/>}].map(lk=><button key={lk.l} style={{width:'100%',border:0,padding:16,background:'var(--sr)',borderRadius:16,boxShadow:'var(--sh)',cursor:'pointer',display:'flex',alignItems:'center',gap:14,textAlign:'left'}}>
          {lk.ic}<span className="sf" style={{fontSize:15,fontWeight:500,flex:1}}>{lk.l}</span><IcArrow sz={16} c="var(--im)"/>
        </button>)}
        <button onClick={async()=>{
          setSeeding(true);setSeedMsg('Chargement...');
          try{const r=await onSeedCatalog();setSeedMsg(r?.message||'Catalogue chargé !');}
          catch(e){setSeedMsg('Erreur');}
          setSeeding(false);setTimeout(()=>setSeedMsg(''),3000);
        }} disabled={seeding} style={{width:'100%',border:0,padding:16,background:'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',borderRadius:16,cursor:seeding?'wait':'pointer',display:'flex',alignItems:'center',gap:14,textAlign:'left',color:'var(--cr)'}}>
          <span style={{fontSize:20}}>📚</span>
          <span style={{fontSize:15,fontWeight:500,flex:1}}>{seedMsg||'Charger le catalogue de référence'}</span>
          {!seeding&&<IcArrow sz={16} c="var(--cr)"/>}
        </button>
        <button onClick={onLogout} style={{width:'100%',border:'1px solid var(--ls)',padding:16,background:'transparent',borderRadius:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          <span style={{fontSize:14,color:'var(--bx)',fontWeight:500}}>Se déconnecter</span>
        </button>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN: ADD BOTTLE
// ═══════════════════════════════════════════════════════════════
const REGIONS=['Bordeaux','Bourgogne','Champagne','Rhône','Loire','Alsace','Languedoc','Provence','Jura','Savoie','Sud-Ouest','Corse','Beaujolais'];
const COLORS=[{id:'rouge',label:'Rouge',robe:'#6B1E2C'},{id:'blanc',label:'Blanc',robe:'#D9B84A'},{id:'rosé',label:'Rosé',robe:'#E8A0B5'},{id:'effervescent',label:'Effervescent',robe:'#D4B896'},{id:'liquoreux',label:'Liquoreux',robe:'#D68A1A'}];

function ScreenAdd({onBack,onSave,editBottle}) {
  const isEdit=!!editBottle;
  const init=isEdit?{
    name:editBottle.name||'',cuvee:editBottle.cuvee||'',vintage:editBottle.vintage||2023,
    region:editBottle.region||'Bordeaux',appellation:editBottle.appellation||'',
    color:editBottle.color||'rouge',price:editBottle.price||'',quantity:editBottle.quantity||1,
    alcohol:editBottle.alcohol||'',score:editBottle.score||'',
    peakFrom:editBottle.peakFrom||editBottle.peak_from||'',peakTo:editBottle.peakTo||editBottle.peak_to||'',
    notes:editBottle.notes||''
  }:{name:'',cuvee:'',vintage:2023,region:'Bordeaux',appellation:'',color:'rouge',price:'',quantity:1,alcohol:'',score:'',peakFrom:'',peakTo:'',notes:''};
  const [form,setForm]=useState(init);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [search,setSearch]=useState('');
  const [results,setResults]=useState([]);
  const [searching,setSearching]=useState(false);
  const [richData,setRichData]=useState(isEdit?{
    cepages:editBottle.cepages||[],aromas:editBottle.aromas||[],
    aromaW:editBottle.aromaW||editBottle.aroma_wheel||{},
    pairings:editBottle.pairings||[],service:editBottle.service||{},
    estate:editBottle.estate||{},tags:editBottle.tags||[],robe:editBottle.robe||'#6B1E2C'
  }:{});
  const [scanning,setScanning]=useState(false);
  const [scanMsg,setScanMsg]=useState('');
  const [scanPreview,setScanPreview]=useState(null);

  // Shared scan processing
  const processScan=async(file)=>{
    if(!file){setScanMsg('Erreur : aucun fichier reçu');return;}
    setScanMsg(`Photo reçue (${Math.round(file.size/1024)}KB). Envoi...`);
    const url=URL.createObjectURL(file);
    setScanPreview(url);setScanning(true);
    try{
      setScanMsg('Redimensionnement...');
      const result=await scanLabel(file);
      if(result.name){
        setForm(f=>({...f,
          name:result.name||f.name,cuvee:result.cuvee||f.cuvee,
          vintage:result.vintage||f.vintage,region:result.region||f.region,
          appellation:result.appellation||f.appellation,color:result.color||f.color,
          alcohol:result.alcohol||f.alcohol,notes:result.notes||f.notes,
        }));
        setScanMsg(`✓ ${result.name} reconnu !`);
        // Enrich from catalog
        const wines=await searchWines(result.name);
        if(wines.length>0){
          const w=wines[0];
          setForm(f=>({...f,
            name:w.name||f.name,cuvee:w.cuvee||f.cuvee,
            region:w.region||f.region,appellation:w.appellation||f.appellation,
            color:w.color||f.color,price:w.typical_price||w.price||f.price,
            alcohol:w.typical_alcohol||w.alcohol||f.alcohol,
            peakFrom:w.peak_from||f.peakFrom,peakTo:w.peak_to||f.peakTo,
          }));
          setRichData({cepages:w.cepages||[],aromas:w.aromas||[],aromaW:w.aroma_wheel||w.aromaWheel||{},pairings:w.pairings||[],service:w.service||{},estate:w.estate||{},tags:w.tags||[],robe:w.robe||COLORS.find(c=>c.id===(w.color||'rouge'))?.robe||'#6B1E2C'});
          setScanMsg(`✓ ${w.name} — enrichi depuis le catalogue !`);
        }
      }else{
        setScanMsg('Étiquette non lisible. Réessayez avec plus de lumière.');
      }
    }catch(err){
      console.error('Scan error:', err);
      setScanMsg('Erreur : '+(err.message||'Vérifiez votre connexion'));
    }
    setScanning(false);
  };

  // Guard against double-fire (onChange + onInput)
  const scanGuard=React.useRef(false);
  const handleScanInput=async(e)=>{
    if(scanGuard.current)return;
    const file=e.target.files?.[0];
    e.target.value='';
    if(file){scanGuard.current=true;await processScan(file);scanGuard.current=false;}
  };

  // Code-barres
  const barcodeGuard=React.useRef(false);
  const handleBarcode=async(e)=>{
    if(barcodeGuard.current)return;
    const file=e.target.files?.[0];
    e.target.value='';
    if(!file)return;
    barcodeGuard.current=true;
    setScanPreview(URL.createObjectURL(file));
    setScanning(true);setScanMsg('Détection du code-barres...');
    try{
      if('BarcodeDetector' in window){
        const img=await createImageBitmap(file);
        const detector=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e']});
        const barcodes=await detector.detect(img);
        if(barcodes.length>0){
          const code=barcodes[0].rawValue;
          setScanMsg(`Code ${code} — recherche...`);
          const result=await scanBarcode(code);
          if(result&&result.name){
            setForm(f=>({...f,name:result.name,cuvee:result.cuvee||'',color:result.color||'rouge',alcohol:result.alcohol||''}));
            setScanMsg(`✓ ${result.name} trouvé !`);
          }else{setScanMsg(`Code ${code} non trouvé dans Open Food Facts.`);}
        }else{setScanMsg('Aucun code-barres détecté.');}
      }else{setScanMsg('Non supporté sur ce navigateur.');}
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
    const alc=w.alcohol||w.typical_alcohol||(w.alcoholRange?parseFloat(w.alcoholRange.split('-')[0]):'');
    const price=w.price||w.typical_price||(w.priceRange?parseFloat(w.priceRange.split('-')[0]):'');
    const pf=w.peak_from||(w.guard?.from?new Date().getFullYear()+w.guard.from:'');
    const pt=w.peak_to||(w.guard?.to?new Date().getFullYear()+w.guard.to:'');
    setForm({
      name:w.name||'',cuvee:w.cuvee||'',vintage:form.vintage,
      region:w.region||form.region,appellation:w.appellation||'',
      color:w.color||'rouge',
      price,quantity:1,alcohol:alc,score:'',
      peakFrom:pf,peakTo:pt,notes:''
    });
    // Store rich data (cepages, aromas, service, etc.) to pass through at save
    setRichData({
      cepages:w.cepages||[],
      aromas:w.aromas||[],
      aromaW:w.aroma_wheel||w.aromaWheel||{},
      pairings:w.pairings||[],
      service:w.service||{},
      estate:w.estate||{},
      tags:w.tags||w.labels||[],
      robe:w.robe||COLORS.find(c=>c.id===(w.color||'rouge'))?.robe||'#6B1E2C',
    });
    setSearch('');setResults([]);
  };

  const srcLabel=(w)=>w.source==='openfoodfacts'?'OFF':w.source==='reference'?'Réf':w.source==='catalog'?'Cave':'';
  const srcColor=(w)=>w.source==='openfoodfacts'?'#27ae60':w.source==='reference'?'var(--g)':'var(--bx)';

  const handleSave=async()=>{
    if(!form.name.trim()){setError('Le nom du domaine est requis.');return;}
    setSaving(true);setError('');
    const bottle={
      name:form.name.trim(),cuvee:form.cuvee.trim(),vintage:parseInt(form.vintage)||2023,
      region:form.region,appellation:form.appellation.trim(),color:form.color,
      robe:richData.robe||robe,
      price:parseFloat(form.price)||0,quantity:parseInt(form.quantity)||1,
      alcohol:parseFloat(form.alcohol)||null,score:parseInt(form.score)||null,
      peakFrom:parseInt(form.peakFrom)||null,peakTo:parseInt(form.peakTo)||null,
      notes:form.notes.trim(),
      // Rich data from catalog
      cepages:richData.cepages||[],
      aromas:richData.aromas||[],
      aromaW:richData.aromaW||{},
      pairings:richData.pairings||[],
      service:richData.service||{},
      estate:richData.estate||{},
      tags:richData.tags||[],
    };
    const ok=await onSave(bottle,isEdit?editBottle.id:null);
    setSaving(false);
    if(ok)onBack();
    else setError('Erreur lors de l\'enregistrement.');
  };

  const inp=(label,key,type='text',placeholder='')=>
    <div style={{marginBottom:14}}>
      <label className="sc" style={{display:'block',fontSize:9,color:'var(--bx)',opacity:.7,marginBottom:6}}>{label}</label>
      <input type={type} value={form[key]} onChange={e=>up(key,e.target.value)} placeholder={placeholder}
        style={{width:'100%',padding:'13px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:15,background:'var(--cr)',outline:'none',color:'var(--ink)',fontFamily:"'Inter',sans-serif",boxSizing:'border-box'}}/>
    </div>;

  return <div style={{background:'var(--cr)',minHeight:'100%',paddingBottom:120}}>
    <div style={{padding:'52px 24px 10px',background:'linear-gradient(180deg,var(--pm) 0%,var(--cr) 100%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
        <IB icon={<IcBack sz={18}/>} onClick={onBack}/>
        <div style={{flex:1}}><div className="sc" style={{color:'var(--bx)',opacity:.7}}>{isEdit?'Modification':'Nouvelle entrée'}</div>
          <h1 className="sf" style={{margin:0,fontSize:28,fontWeight:500}}>{isEdit?'Modifier':'Ajouter'} <span style={{fontStyle:'italic',color:'var(--bx)'}}>une bouteille</span></h1></div>
      </div>
    </div>
    <div style={{padding:'0 20px'}}>
      {/* Scan buttons (add mode only) */}
      {!isEdit&&<>
        {/* Scan result panel */}
        {(scanPreview||scanMsg)&&<div style={{background:'var(--sr)',borderRadius:18,padding:14,marginBottom:14,boxShadow:'var(--sh)',border:'0.5px solid var(--ln)'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            {scanPreview&&<img src={scanPreview} alt="" style={{width:56,height:56,borderRadius:10,objectFit:'cover',border:'1px solid var(--ln)'}}/>}
            <div style={{flex:1,fontSize:14,color:scanMsg.startsWith('✓')?'#27ae60':scanMsg.startsWith('Erreur')?'#C0392B':'var(--bx)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',lineHeight:1.4,display:'flex',alignItems:'center',gap:8}}>
              {scanning&&<span style={{display:'inline-block',width:14,height:14,border:'2px solid var(--bx)',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',flexShrink:0}}/>}
              {scanMsg}
            </div>
            {!scanning&&scanMsg&&<button onClick={()=>{setScanPreview(null);setScanMsg('');}} style={{width:28,height:28,borderRadius:'50%',border:'1px solid var(--ln)',background:'var(--cr)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'var(--im)',flexShrink:0}}>✕</button>}
          </div>
        </div>}

        {/* Scan buttons — inputs inside labels for max Android compatibility */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
          <label style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'linear-gradient(140deg,var(--bx) 0%,#3A0F18 100%)',color:scanning?'var(--is)':'var(--cr)',fontSize:11,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:scanning?'none':'0 4px 12px rgba(107,30,44,.2)',display:'flex',flexDirection:'column',alignItems:'center',gap:5,textAlign:'center',position:'relative',overflow:'hidden'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            Photo
            <input type="file" accept="image/*" capture="environment" onChange={handleScanInput} onInput={handleScanInput} disabled={scanning} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}}/>
          </label>
          <label style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'var(--sr)',color:scanning?'var(--im)':'var(--bx)',fontSize:11,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:'var(--sh)',border:'1px solid var(--ln)',display:'flex',flexDirection:'column',alignItems:'center',gap:5,textAlign:'center',position:'relative',overflow:'hidden'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            Fichier
            <input type="file" accept="image/*" onChange={handleScanInput} onInput={handleScanInput} disabled={scanning} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}}/>
          </label>
          <label style={{padding:'12px 0',border:0,borderRadius:14,background:scanning?'var(--pm)':'var(--sr)',color:scanning?'var(--im)':'var(--bx)',fontSize:11,fontWeight:500,cursor:scanning?'wait':'pointer',boxShadow:'var(--sh)',border:'1px solid var(--ln)',display:'flex',flexDirection:'column',alignItems:'center',gap:5,textAlign:'center',position:'relative',overflow:'hidden'}}>
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
            style={{flex:1,border:0,background:'transparent',outline:'none',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:15,color:'var(--ink)'}}/>
          {searching&&<span style={{fontSize:12,color:'var(--im)'}}>...</span>}
        </div>
        {results.length>0&&<div style={{position:'absolute',top:'100%',left:0,right:0,zIndex:10,background:'var(--sr)',borderRadius:18,boxShadow:'0 8px 24px rgba(0,0,0,.15)',marginTop:6,maxHeight:240,overflow:'auto'}}>
          {results.map((w,i)=><button key={w.id||w.barcode||i} onClick={()=>pickCatalog(w)} style={{width:'100%',border:0,padding:'12px 16px',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:12,textAlign:'left',borderBottom:'0.5px solid var(--ln)'}}>
            <div style={{width:6,height:36,borderRadius:3,background:COLORS.find(c=>c.id===w.color)?.robe||'#6B1E2C',flexShrink:0}}/>
            <div style={{flex:1}}>
              <div className="sf" style={{fontSize:15,fontWeight:500}}>{w.name}</div>
              <div style={{fontSize:11,color:'var(--im)'}}>
                {w.region}{w.subRegion?' — '+w.subRegion:''}{w.cuvee?' · '+w.cuvee:''}{w.appellation?' · '+w.appellation:''}
              </div>
              {w.classification&&<div style={{fontSize:9,color:'var(--bx)',fontWeight:600,marginTop:2}}>{w.classification}</div>}
            </div>
            {srcLabel(w)&&<span style={{fontSize:9,padding:'3px 7px',borderRadius:999,background:srcColor(w)+'18',color:srcColor(w),fontWeight:600,letterSpacing:'.05em',flexShrink:0}}>{srcLabel(w)}</span>}
          </button>)}
        </div>}
      </div>}
      {/* Preview */}
      <div style={{display:'flex',alignItems:'center',gap:14,padding:'16px 18px',background:'var(--sr)',borderRadius:20,boxShadow:'var(--sh)',marginBottom:16}}>
        <div style={{width:8,height:48,borderRadius:4,background:robe,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div className="sf" style={{fontSize:18,fontWeight:500,lineHeight:1.2,color:form.name?'var(--ink)':'var(--im)'}}>{form.name||'Nom du domaine'}</div>
          <div style={{fontSize:12,color:'var(--im)',marginTop:2}}>{form.region} · {form.vintage}{form.cuvee?' · '+form.cuvee:''}</div>
        </div>
        <div className="sf" style={{fontSize:16,fontWeight:600,color:'var(--bx)'}}>×{form.quantity}</div>
      </div>

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
            <span style={{fontSize:13,fontWeight:form.color===c.id?600:400,color:form.color===c.id?'var(--bx)':'var(--is)'}}>{c.label}</span>
          </button>)}
        </div>
      </SC>

      <SC title="Origine" ey="Région">
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {REGIONS.map(r=><button key={r} onClick={()=>up('region',r)} style={{padding:'8px 14px',borderRadius:999,border:form.region===r?'2px solid var(--bx)':'1.5px solid var(--ln)',background:form.region===r?'var(--pm)':'var(--cr)',cursor:'pointer',fontSize:13,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontWeight:form.region===r?600:400,color:form.region===r?'var(--bx)':'var(--is)',transition:'all .15s'}}>{r}</button>)}
        </div>
      </SC>

      <SC title="Détails" ey="Caractéristiques">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('Prix (€)','price','number','35')}
          <div style={{marginBottom:14}}>
            <label className="sc" style={{display:'block',fontSize:9,color:'var(--bx)',opacity:.7,marginBottom:6}}>Quantité</label>
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

      <SC title="Fenêtre de garde" ey="Apogée">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {inp('À partir de','peakFrom','number','2028')}
          {inp('Jusqu\'à','peakTo','number','2040')}
        </div>
      </SC>

      <SC title="Notes personnelles" ey="Impressions">
        <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} placeholder="Vos impressions, le contexte de dégustation..."
          style={{width:'100%',minHeight:80,padding:'13px 16px',border:'1px solid var(--ln)',borderRadius:14,fontSize:15,background:'var(--cr)',outline:'none',color:'var(--ink)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',resize:'vertical',boxSizing:'border-box'}}/>
      </SC>

      {error&&<div style={{fontSize:13,color:'#C0392B',textAlign:'center',padding:'12px',background:'#FDEDEC',borderRadius:14,marginTop:16}}>{error}</div>}

      <button onClick={handleSave} disabled={saving} style={{width:'100%',padding:'16px 0',border:0,borderRadius:999,background:saving?'var(--im)':'linear-gradient(180deg,var(--bs) 0%,var(--bx) 100%)',color:'var(--cr)',fontSize:17,fontWeight:600,cursor:saving?'wait':'pointer',boxShadow:'0 6px 20px rgba(107,30,44,.35)',marginTop:20,marginBottom:20}}>
        {saving?'Enregistrement...':isEdit?'Enregistrer les modifications':'Ajouter à ma cave'}
      </button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// NORMALIZE: Supabase snake_case → frontend camelCase
// ═══════════════════════════════════════════════════════════════
function norm(b){return{...b,peakFrom:b.peak_from||b.peakFrom,peakTo:b.peak_to||b.peakTo,aromaW:b.aroma_wheel||b.aromaW||{},aromas:b.aromas||[],cepages:b.cepages||[],pairings:b.pairings||[],service:b.service||{},estate:b.estate||{},friends:b.friends||[],tags:b.tags||[],quantity:b.quantity||1,price:b.price||0,score:b.score||0,communityRating:b.communityRating||4.2,communityCount:b.communityCount||0,notes:b.notes||''};}

// ═══════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════
const CSS_VARS = {'--bx':'#6B1E2C','--bd':'#4A1520','--bs':'#8B3545','--cr':'#FAF6EE','--pm':'#EFE4D2','--bg':'#F5EDE0','--g':'#C8A96A','--gs':'#D4B896','--ink':'#2A1F1F','--is':'#5A4A4A','--im':'#8B7A7A','--ln':'rgba(42,31,31,.08)','--ls':'rgba(42,31,31,.14)','--sr':'#FFFFFF','--sh':'0 1px 2px rgba(74,21,32,.04),0 2px 6px rgba(74,21,32,.04)'};

export default function App() {
  const { user, profile, loading, signOut } = useAuth();
  const [tab,setTab]=useState('home');
  const [bottle,setBottle]=useState(null);
  const [bottles,setBottles]=useState([]);
  const [loadingB,setLoadingB]=useState(true);
  const [showAdd,setShowAdd]=useState(false);
  const [editBottle,setEditBottle]=useState(null);
  const nav=s=>{setBottle(null);setShowAdd(false);setEditBottle(null);setTab(s);};

  // Fetch bottles from Supabase when user changes
  useEffect(()=>{
    if(!user){setBottles([]);setLoadingB(false);return;}
    setLoadingB(true);
    fetchBottles(user.id).then(({data})=>{
      setBottles((data||[]).map(norm));
      setLoadingB(false);
    });
  },[user]);

  // Loading
  if (loading||loadingB) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--cr)',...CSS_VARS}}>
    <div style={{textAlign:'center'}}>
      <div className="sf" style={{fontSize:42,color:'var(--bx)',letterSpacing:'0.08em'}}>CAVE</div>
      <div style={{fontSize:14,color:'var(--im)',marginTop:8}}>Chargement...</div>
    </div>
  </div>;

  // Not logged in
  if (!user) return <div style={{...CSS_VARS}}><style>{`
    .sf{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;letter-spacing:.01em}
    .sc{text-transform:uppercase;letter-spacing:.18em;font-size:10px;font-weight:500}
    input::placeholder{color:var(--im)}
  `}</style><ScreenAuth/></div>;

  // Seed demo bottles and refresh
  const handleSeed=async()=>{
    if(!user)return;
    await seedDemoData(user.id);
    const {data}=await fetchBottles(user.id);
    setBottles((data||[]).map(norm));
  };

  // Add or update a bottle
  const handleAdd=async(bottle,bottleId)=>{
    if(!user)return false;
    let result;
    if(bottleId){
      result=await updateBottle(bottleId,bottle);
    }else{
      result=await addBottle(user.id,bottle);
    }
    if(result.error)return false;
    const res=await fetchBottles(user.id);
    const updated=(res.data||[]).map(norm);
    setBottles(updated);
    setBottle(null);setEditBottle(null);
    return true;
  };

  // Edit: open form pre-filled
  const handleEdit=(b)=>{
    setBottle(null);
    setEditBottle(b);
    setShowAdd(true);
  };

  // Delete a bottle
  const handleDelete=async(bottleId)=>{
    if(!user)return;
    await deleteBottle(bottleId);
    const res=await fetchBottles(user.id);
    setBottles((res.data||[]).map(norm));
    setBottle(null);
  };

  return <div style={{maxWidth:430,margin:'0 auto',fontFamily:"'Inter',-apple-system,sans-serif",WebkitFontSmoothing:'antialiased',minHeight:'100vh',background:'var(--cr)',...CSS_VARS}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap');
      .sf{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;letter-spacing:.01em}
      .sc{text-transform:uppercase;letter-spacing:.18em;font-size:10px;font-weight:500}
      ::-webkit-scrollbar{width:0;height:0}
      input::placeholder{color:var(--im)}
    `}</style>
    {showAdd?<ScreenAdd onBack={()=>{setShowAdd(false);setEditBottle(null);}} onSave={handleAdd} editBottle={editBottle}/>:
    bottle?<ScreenBottle bottle={bottle} onBack={()=>setBottle(null)} onEdit={handleEdit} onDelete={handleDelete}/>:<>
      {tab==='home'&&<ScreenHome onSel={setBottle} onNav={nav} bottles={bottles} profile={profile} onSeed={handleSeed}/>}
      {tab==='map'&&<ScreenMapFull onSel={setBottle} bottles={bottles}/>}
      {tab==='stats'&&<ScreenStats bottles={bottles}/>}
      {tab==='guide'&&<ScreenGuide/>}
      {tab==='friends'&&<ScreenFriends/>}
      {tab==='profile'&&<ScreenProfile onNav={nav} bottles={bottles} profile={profile} onLogout={signOut} onSeedCatalog={seedReferenceCatalog}/>}
    </>}
    {!bottle&&!showAdd&&<div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'min(100%,430px)',padding:'0 12px 12px',zIndex:30}}>
      <div style={{height:72,background:'rgba(255,255,255,.88)',backdropFilter:'blur(28px) saturate(180%)',WebkitBackdropFilter:'blur(28px) saturate(180%)',borderRadius:32,boxShadow:'0 8px 24px rgba(107,30,44,.12),0 0 0 .5px var(--ls)',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'0 8px'}}>
        {[{id:'home',l:'Cave',Ic:IcHome},{id:'map',l:'Carte',Ic:IcMap},{id:'add',l:'',act:1},{id:'guide',l:'Guide',Ic:IcBook},{id:'stats',l:'Stats',Ic:IcChart}].map(it=>{
          if(it.act)return<button key="add" onClick={()=>setShowAdd(true)} style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(180deg,var(--bs) 0%,var(--bx) 100%)',color:'var(--cr)',border:0,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 6px 18px rgba(107,30,44,.4)',cursor:'pointer',transform:'translateY(-6px)'}}><IcScan sz={22} c="var(--cr)"/></button>;
          return<button key={it.id} onClick={()=>nav(it.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,flex:1,height:56,borderRadius:20,border:0,background:'transparent',cursor:'pointer',color:tab===it.id?'var(--bx)':'var(--im)',transition:'color .2s'}}>
            <it.Ic sz={22}/><span style={{fontSize:10,fontWeight:500,letterSpacing:'.02em'}}>{it.l}</span>
          </button>;
        })}
      </div>
    </div>}
  </div>;
}
