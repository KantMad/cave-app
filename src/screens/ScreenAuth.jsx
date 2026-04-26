import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

export default function ScreenAuth() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // login | signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await signUp(email, password, name);
      if (error) setError(error.message);
      else setSuccess('Compte créé ! Vérifie tes emails pour confirmer.');
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message === 'Invalid login credentials' 
        ? 'Email ou mot de passe incorrect.' : error.message);
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, var(--pm) 0%, var(--cr) 100%)',
      padding: '40px 24px',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <svg width="64" height="80" viewBox="0 0 64 80">
          <path d="M 18 8 Q 18 30 32 38 Q 46 30 46 8 Z" fill="none" stroke="var(--bx)" strokeWidth="2" strokeLinejoin="round"/>
          <rect x="18" y="24" width="28" height="14" fill="var(--bx)" opacity="0.7" rx="1"/>
          <line x1="32" y1="38" x2="32" y2="66" stroke="var(--bx)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 22 68 Q 32 66 42 68" fill="none" stroke="var(--bx)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h1 className="sf" style={{ fontSize: 42, fontWeight: 500, color: 'var(--bx)', margin: '12px 0 0', letterSpacing: '0.08em' }}>CAVE</h1>
        <p style={{ fontSize: 14, color: 'var(--im)', marginTop: 4, fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>
          Votre sommelier, de poche.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        width: '100%', maxWidth: 360, background: 'var(--sr)',
        borderRadius: 24, padding: '28px 24px', boxShadow: 'var(--sh)',
      }}>
        <h2 className="sf" style={{ fontSize: 24, fontWeight: 500, textAlign: 'center', marginBottom: 20 }}>
          {mode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h2>

        <div onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'signup' && (
            <input
              type="text" placeholder="Votre prénom"
              value={name} onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" placeholder="Mot de passe"
            value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <div style={{ fontSize: 13, color: '#C0392B', textAlign: 'center', padding: '8px 12px', background: '#FDEDEC', borderRadius: 12 }}>{error}</div>}
          {success && <div style={{ fontSize: 13, color: '#27AE60', textAlign: 'center', padding: '8px 12px', background: '#EAFAF1', borderRadius: 12 }}>{success}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '14px 0', border: 0, borderRadius: 999,
              background: loading ? 'var(--im)' : 'var(--bx)', color: 'var(--cr)',
              fontSize: 16, fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(107,30,44,0.28)',
              marginTop: 4,
            }}
          >
            {loading ? '...' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
            style={{
              border: 0, background: 'none', color: 'var(--bx)',
              fontSize: 14, cursor: 'pointer', textDecoration: 'underline',
              fontFamily: "'Cormorant Garamond',serif",
            }}
          >
            {mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '14px 16px', border: '1px solid var(--ls)',
  borderRadius: 14, fontSize: 15, background: 'var(--cr)',
  outline: 'none', color: 'var(--ink)',
  fontFamily: "'Inter', sans-serif",
  boxSizing: 'border-box',
};
