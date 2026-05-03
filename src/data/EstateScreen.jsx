// ═══════════════════════════════════════════════════════════════════════════════
//  EstateScreen.jsx — Écran de fiche domaine
//
//  Affiche la fiche complète d'un domaine viticole avec :
//  • Header héroïque (nom, type, région, prestige)
//  • Histoire + timeline interactive
//  • Vignoble & terroir
//  • Viticulture & pratiques (Bio, Biodynamie, certifications)
//  • Vinification & élevage
//  • Cuvées produites (liste cliquable croisée avec WINE_DATABASE)
//  • Style & philosophie
//  • Valeur & reconnaissance
//  • Visite & contact
//  • Anecdotes
//
//  Dépendances : SectionCard, Pill, IconEstate (déjà dans shared.jsx / screens-a.jsx)
//                EstateService (estate-service.jsx)
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';

// ── Petits composants utilitaires locaux ────────────────────────────────────

function KV({ label, value, span }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div style={{
      gridColumn: span === 2 ? 'span 2' : 'auto',
      background: 'var(--parchment)',
      borderRadius: 14, padding: '10px 12px',
    }}>
      <div className="smallcaps" style={{ fontSize: 8, color: 'var(--bordeaux)', letterSpacing: 1 }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: 14, color: 'var(--ink)', marginTop: 3, lineHeight: 1.35 }}>
        {Array.isArray(value) ? value.join(' · ') : value}
      </div>
    </div>
  );
}

function Pill({ children, variant = 'default' }) {
  const styles = {
    default: { bg: 'var(--parchment)', fg: 'var(--ink-soft)' },
    bio: { bg: '#E8F0DC', fg: '#3A5A24' },
    bioDyn: { bg: '#DFECCF', fg: '#1F4A18' },
    gold: { bg: 'var(--gold-soft)', fg: 'var(--bordeaux)' },
    ink: { bg: 'var(--ink)', fg: 'var(--cream)' },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 10px', borderRadius: 999,
      fontSize: 10.5, fontFamily: 'inherit',
      background: s.bg, color: s.fg,
      letterSpacing: 0.5,
    }}>
      {children}
    </span>
  );
}

function MethodBadge({ method, certifications = [] }) {
  if (!method) return null;
  const m = method.toLowerCase();
  let variant = 'default';
  if (m.includes('biodynam')) variant = 'bioDyn';
  else if (m.includes('bio')) variant = 'bio';
  else if (m.includes('hve')) variant = 'gold';
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      <Pill variant={variant}>{method}</Pill>
      {certifications.map(c => <Pill key={c} variant={variant}>{c}</Pill>)}
    </div>
  );
}

function PrestigeStars({ score }) {
  if (score == null) return null;
  const stars = Math.round(score / 20); // 0-5
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ letterSpacing: 2, color: 'var(--gold)', fontSize: 14 }}>
        {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      </div>
      <span className="smallcaps" style={{ fontSize: 9, color: 'var(--ink-muted)' }}>
        {score}/100
      </span>
    </div>
  );
}

// ── Composant principal ─────────────────────────────────────────────────────

export default function EstateScreen({ estate, onWineClick, onBack }) {
  const [tab, setTab] = useState('histoire');

  if (!estate) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-muted)' }}>
        Domaine introuvable.
      </div>
    );
  }

  // Récupération des vins — si le service est dispo
  const wines = useMemo(() => {
    if (typeof window.EstateService === 'undefined') return [];
    return window.EstateService.getWinesForEstate(estate.id);
  }, [estate.id]);

  const heroGradient = estate.color
    ? `linear-gradient(155deg, ${estate.color} 0%, ${estate.color}CC 60%, var(--bordeaux) 100%)`
    : 'linear-gradient(155deg, var(--bordeaux) 0%, var(--lie) 100%)';

  // ── HERO ────────────────────────────────────────────────────────────────
  const Hero = (
    <div style={{
      background: heroGradient,
      color: 'var(--cream)',
      padding: '28px 20px 24px',
      borderRadius: '0 0 28px 28px',
      position: 'relative',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          color: 'var(--cream)', padding: '6px 12px', borderRadius: 20,
          fontSize: 11, cursor: 'pointer', marginBottom: 14,
        }}>← Retour</button>
      )}
      <div className="smallcaps" style={{ fontSize: 10, opacity: 0.8, letterSpacing: 1.5 }}>
        {estate.type} · {estate.region}{estate.subRegion ? ` · ${estate.subRegion}` : ''}
      </div>
      <h1 className="serif" style={{
        fontSize: 30, fontWeight: 500, margin: '6px 0 10px',
        lineHeight: 1.1, textWrap: 'balance',
      }}>
        {estate.name}
      </h1>
      {estate.founded && (
        <div className="serif-italic" style={{ fontSize: 14, opacity: 0.85, marginBottom: 10 }}>
          Fondé en {estate.founded} · {new Date().getFullYear() - estate.founded} ans d'histoire
        </div>
      )}
      {estate.prestigeScore && (
        <div style={{ marginTop: 10 }}>
          <PrestigeStars score={estate.prestigeScore} />
        </div>
      )}
      {estate.tags?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {estate.tags.slice(0, 5).map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: 999,
              background: 'rgba(255,255,255,0.15)',
              fontSize: 10, letterSpacing: 0.5,
            }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );

  // ── ONGLETS ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'histoire', label: 'Histoire' },
    { id: 'vignoble', label: 'Vignoble' },
    { id: 'vinif', label: 'Vinification' },
    { id: 'vins', label: `Cuvées${wines.length ? ` · ${wines.length}` : ''}` },
    { id: 'infos', label: 'Infos' },
  ];

  const TabBar = (
    <div style={{
      display: 'flex', overflowX: 'auto', gap: 4,
      padding: '14px 16px 10px', borderBottom: '1px solid var(--line)',
      background: 'var(--cream)', position: 'sticky', top: 0, zIndex: 2,
    }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            background: tab === t.id ? 'var(--bordeaux)' : 'transparent',
            color: tab === t.id ? 'var(--cream)' : 'var(--ink-soft)',
            border: 'none', padding: '8px 14px', borderRadius: 999,
            fontSize: 12, letterSpacing: 0.3, whiteSpace: 'nowrap',
            cursor: 'pointer', flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >{t.label}</button>
      ))}
    </div>
  );

  // ── CONTENU DES ONGLETS ─────────────────────────────────────────────────

  const TabHistoire = (
    <>
      {estate.history && (
        <SectionCard title="Récit" eyebrow="Histoire du domaine">
          <p className="serif" style={{
            fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6,
            margin: 0, textWrap: 'pretty',
          }}>
            {estate.history}
          </p>
          {estate.founder && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <div className="smallcaps" style={{ fontSize: 9, color: 'var(--bordeaux)' }}>Fondateur</div>
              <div className="serif" style={{ fontSize: 14, color: 'var(--ink)', marginTop: 3 }}>
                {estate.founder}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {estate.timeline?.length > 0 && (
        <SectionCard title="Timeline" eyebrow="Grandes dates">
          <div style={{ position: 'relative', paddingLeft: 22 }}>
            <div style={{
              position: 'absolute', left: 6, top: 4, bottom: 4,
              width: 2, background: 'var(--line)',
            }} />
            {estate.timeline.map((t, i) => (
              <div key={i} style={{ marginBottom: i === estate.timeline.length - 1 ? 0 : 16, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: -22, top: 4, width: 14, height: 14,
                  background: 'var(--bordeaux)', borderRadius: '50%',
                  border: '2px solid var(--cream)',
                }} />
                <div className="serif" style={{ fontSize: 16, color: 'var(--bordeaux)', fontWeight: 500 }}>
                  {t.year}
                </div>
                <div className="serif" style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 2 }}>
                  {t.event}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {estate.anecdotes?.length > 0 && (
        <SectionCard title="Anecdotes" eyebrow="À savoir">
          {estate.anecdotes.map((a, i) => (
            <p key={i} className="serif-italic" style={{
              fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55,
              margin: i === estate.anecdotes.length - 1 ? 0 : '0 0 10px',
              paddingLeft: 12, borderLeft: '2px solid var(--gold)',
            }}>
              « {a} »
            </p>
          ))}
        </SectionCard>
      )}
    </>
  );

  const TabVignoble = (
    <>
      <SectionCard title="Vignoble" eyebrow="Surface & structure">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <KV label="Surface totale" value={estate.vineyard?.surface ? `${estate.vineyard.surface} ha` : estate.vineyard?.surfaceRaw} />
          <KV label="En production" value={estate.vineyard?.inProductionSurface ? `${estate.vineyard.inProductionSurface} ha` : null} />
          <KV label="Âge moyen des vignes" value={estate.vineyard?.vineAge ? `${estate.vineyard.vineAge} ans` : null} />
          <KV label="Densité" value={estate.vineyard?.density ? `${estate.vineyard.density.toLocaleString('fr-FR')} pieds/ha` : null} />
          <KV label="Rendement" value={estate.vineyard?.yield ? `${estate.vineyard.yield} hl/ha` : null} />
          <KV label="Exposition" value={estate.vineyard?.exposition} />
        </div>
      </SectionCard>

      <SectionCard title="Terroir" eyebrow="Sols & climat">
        <KV label="Résumé" value={estate.terroir?.summary} span={2} />
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <KV label="Sols" value={estate.terroir?.soils} span={2} />
          <KV label="Sous-sol" value={estate.terroir?.subsoil} span={2} />
          <KV label="Climat" value={estate.terroir?.climate} />
          <KV label="Pluviométrie" value={estate.terroir?.rainfall ? `${estate.terroir.rainfall} mm/an` : null} />
          <KV label="Ensoleillement" value={estate.terroir?.sunshine ? `${estate.terroir.sunshine} h/an` : null} />
        </div>
      </SectionCard>

      <SectionCard title="Viticulture" eyebrow="Pratiques & certifications">
        <MethodBadge method={estate.viticulture?.method} certifications={estate.viticulture?.certifications} />
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <KV label="Bio depuis" value={estate.viticulture?.organicSince} />
          <KV label="Biodynamie depuis" value={estate.viticulture?.biodynamicSince} />
        </div>
      </SectionCard>
    </>
  );

  const TabVinif = (
    <>
      {estate.vinification && Object.values(estate.vinification).some(v => v) && (
        <SectionCard title="Vinification" eyebrow="Au chai">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <KV label="Vendanges" value={estate.vinification.harvest} span={2} />
            <KV label="Tri" value={estate.vinification.sorting} span={2} />
            <KV label="Fermentation" value={estate.vinification.fermentation} span={2} />
            <KV label="Levures" value={estate.vinification.yeasts} />
            <KV label="Macération" value={estate.vinification.maceration} />
            <KV label="Éraflage" value={estate.vinification.destemming} />
            <KV label="Malo" value={estate.vinification.malolactic} />
          </div>
        </SectionCard>
      )}

      {estate.aging && Object.values(estate.aging).some(v => v) && (
        <SectionCard title="Élevage" eyebrow="Affinage">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <KV label="Contenant" value={estate.aging.vessel} span={2} />
            <KV label="Durée" value={estate.aging.duration} />
            <KV label="Bois neuf" value={estate.aging.newOakPct != null ? `${estate.aging.newOakPct}%` : null} />
            <KV label="Taille" value={estate.aging.size} />
            <KV label="Tonneliers" value={estate.aging.cooperages} span={2} />
          </div>
        </SectionCard>
      )}

      {(estate.philosophy || estate.style || estate.signature) && (
        <SectionCard title="Style & philosophie" eyebrow="Signature">
          {estate.philosophy && (
            <>
              <div className="smallcaps" style={{ fontSize: 9, color: 'var(--bordeaux)', letterSpacing: 1 }}>Philosophie</div>
              <p className="serif-italic" style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55, margin: '4px 0 14px' }}>
                « {estate.philosophy} »
              </p>
            </>
          )}
          {estate.style && (
            <>
              <div className="smallcaps" style={{ fontSize: 9, color: 'var(--bordeaux)', letterSpacing: 1 }}>Style</div>
              <p className="serif" style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '4px 0 14px', lineHeight: 1.5 }}>
                {estate.style}
              </p>
            </>
          )}
          {estate.signature && (
            <>
              <div className="smallcaps" style={{ fontSize: 9, color: 'var(--bordeaux)', letterSpacing: 1 }}>Signature aromatique</div>
              <p className="serif" style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '4px 0 0', lineHeight: 1.5 }}>
                {estate.signature}
              </p>
            </>
          )}
        </SectionCard>
      )}
    </>
  );

  const TabVins = (
    <>
      {estate.production && (estate.production.firstWine || estate.production.annualBottles) && (
        <SectionCard title="Production" eyebrow="Volumes & cuvées">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <KV label="Bouteilles / an" value={estate.production.annualBottles?.toLocaleString('fr-FR')} />
            <KV label="Grand vin" value={estate.production.firstWine} span={2} />
            <KV label="Second vin" value={estate.production.secondWine} span={2} />
            <KV label="Troisième vin" value={estate.production.thirdWine} span={2} />
            <KV label="Blanc" value={estate.production.whiteWine} span={2} />
          </div>
        </SectionCard>
      )}

      <SectionCard title={`Cuvées référencées`} eyebrow={wines.length > 0 ? `${wines.length} vin(s) dans le catalogue` : 'Aucun vin lié'}>
        {wines.length === 0 && (
          <p className="serif-italic" style={{ fontSize: 13, color: 'var(--ink-muted)', margin: 0 }}>
            Aucune cuvée de ce domaine n'est encore dans le catalogue vin.
          </p>
        )}
        {wines.map(w => (
          <div
            key={w.id}
            onClick={() => onWineClick?.(w)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', marginBottom: 8, borderRadius: 14,
              background: 'var(--parchment)',
              cursor: onWineClick ? 'pointer' : 'default',
              transition: 'transform 0.15s',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: w.robe || 'var(--bordeaux)', flexShrink: 0,
                }} />
                <div className="serif" style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>
                  {w.cuvee || w.name}
                </div>
              </div>
              <div className="serif-italic" style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>
                {w.appellation}
              </div>
            </div>
            {w.priceRange && (
              <Pill variant="gold">{w.priceRange} €</Pill>
            )}
          </div>
        ))}
      </SectionCard>
    </>
  );

  const TabInfos = (
    <>
      <SectionCard title="Équipe" eyebrow="Propriété & direction">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <KV label="Propriétaire" value={estate.owner} span={2} />
          <KV label="Directeur" value={estate.director} />
          <KV label="Maître de chai" value={estate.winemaker} />
          <KV label="Œnologue conseil" value={estate.consultingOenologist} span={2} />
        </div>
      </SectionCard>

      {estate.valuation && (estate.valuation.avgPriceFirst || estate.valuation.investmentGrade) && (
        <SectionCard title="Valeur" eyebrow="Cotation & marché">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <KV label="Prix moyen grand vin" value={estate.valuation.avgPriceFirst ? `${estate.valuation.avgPriceFirst} €` : null} />
            <KV label="Tendance 10 ans" value={estate.valuation.priceTrend10y} />
            <KV label="Investment grade" value={estate.valuation.investmentGrade} />
            <KV label="Liquidité" value={estate.valuation.liquidityIndex} span={2} />
            {estate.valuation.topVintage && (
              <KV
                label="Millésime phare"
                value={`${estate.valuation.topVintage.year} — ${estate.valuation.topVintage.price} €`}
                span={2}
              />
            )}
          </div>
        </SectionCard>
      )}

      {estate.awards?.length > 0 && (
        <SectionCard title="Distinctions" eyebrow="Reconnaissance">
          {estate.awards.map((a, i) => (
            <div key={i} className="serif" style={{
              fontSize: 13, color: 'var(--ink-soft)',
              padding: '6px 0', borderBottom: i === estate.awards.length - 1 ? 'none' : '1px solid var(--line)',
            }}>
              ★ {a}
            </div>
          ))}
          {estate.classification && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line)' }}>
              <Pill variant="gold">{estate.classification}</Pill>
            </div>
          )}
        </SectionCard>
      )}

      {estate.visit && (estate.visit.website || estate.visit.openToPublic != null) && (
        <SectionCard title="Visite & contact" eyebrow="Se rendre au domaine">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <KV label="Ouvert au public" value={estate.visit.openToPublic ? 'Oui' : estate.visit.openToPublic === false ? 'Non' : null} />
            <KV label="Sur rendez-vous" value={estate.visit.byAppointment ? 'Oui' : null} />
            <KV label="Visites" value={estate.visit.tours} span={2} />
            <KV label="Dégustation" value={estate.visit.tasting} span={2} />
            <KV label="Téléphone" value={estate.visit.phone} span={2} />
          </div>
          {estate.visit.website && (
            <a
              href={estate.visit.website}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '10px 16px',
                background: 'var(--bordeaux)', color: 'var(--cream)',
                borderRadius: 999, textDecoration: 'none',
                fontSize: 12, letterSpacing: 0.5,
              }}
            >↗ Site officiel</a>
          )}
        </SectionCard>
      )}

      <SectionCard title="Localisation" eyebrow="Où est le domaine">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <KV label="Pays" value={estate.country} />
          <KV label="Région" value={estate.region} />
          <KV label="Sous-région" value={estate.subRegion} />
          <KV label="Commune" value={estate.village} />
          <KV label="Code postal" value={estate.postalCode} />
          <KV label="Appellations" value={estate.appellations} span={2} />
          {estate.coordinates && (
            <KV label="Coordonnées" value={`${estate.coordinates.lat}, ${estate.coordinates.lng}`} span={2} />
          )}
        </div>
      </SectionCard>
    </>
  );

  // ── RENDU ───────────────────────────────────────────────────────────────
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 40 }}>
      {Hero}
      {TabBar}
      <div style={{ padding: '18px 16px 20px' }}>
        {tab === 'histoire' && TabHistoire}
        {tab === 'vignoble' && TabVignoble}
        {tab === 'vinif' && TabVinif}
        {tab === 'vins' && TabVins}
        {tab === 'infos' && TabInfos}
      </div>
    </div>
  );
}
