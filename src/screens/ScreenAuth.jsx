import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

export default function ScreenAuth() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    if (mode === 'forgot') {
      if (!email.trim()) { setError('Entrez votre email.'); setLoading(false); return; }
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else setSuccess('Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.');
    } else if (mode === 'signup') {
      const { error } = await signUp(email, password, name);
      if (error) setError(error.message);
      else setSuccess('Compte créé ! Vérifie tes emails pour confirmer.');
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message === 'Invalid login credentials' ? 'Email ou mot de passe incorrect.' : error.message);
    }
    setLoading(false);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg, var(--pm) 0%, var(--cr) 100%)',padding:'40px 24px'}}>
      <div style={{marginBottom:40,textAlign:'center'}}>
        <img src="/logo.png" alt="CAVE" style={{width:80,height:80,marginBottom:8}}/>
        <h1 className="sf" style={{fontSize:42,fontWeight:500,color:'var(--bx)',margin:'12px 0 0',letterSpacing:'0.08em'}}>CAVE</h1>
        <p style={{fontSize:15,color:'var(--im)',marginTop:6,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Votre sommelier, de poche.</p>
      </div>
      <div style={{width:'100%',maxWidth:360,background:'var(--sr)',borderRadius:24,padding:'28px 24px',boxShadow:'var(--sh)'}}>
        <h2 className="sf" style={{fontSize:24,fontWeight:500,textAlign:'center',marginBottom:20}}>
          {mode==='login'?'Connexion':mode==='signup'?'Créer un compte':'Mot de passe oublié'}
        </h2>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {mode==='signup'&&<input type="text" placeholder="Votre prénom" value={name} onChange={e=>setName(e.target.value)} style={inputStyle}/>}
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
          {mode!=='forgot'&&<input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle}/>}
          {mode==='forgot'&&<p style={{fontSize:14,color:'var(--im)',textAlign:'center',margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Entrez votre email, nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>}
          {error&&<div style={{fontSize:13,color:'#C0392B',textAlign:'center',padding:'8px 12px',background:'#FDEDEC',borderRadius:12}}>{error}</div>}
          {success&&<div style={{fontSize:13,color:'#27AE60',textAlign:'center',padding:'8px 12px',background:'#EAFAF1',borderRadius:12}}>{success}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{width:'100%',padding:'14px 0',border:0,borderRadius:999,background:loading?'var(--im)':'var(--bx)',color:'var(--cr)',fontSize:16,fontWeight:600,cursor:loading?'wait':'pointer',boxShadow:'0 4px 14px rgba(107,30,44,0.28)',marginTop:4}}>
            {loading?'...':mode==='login'?'Se connecter':mode==='signup'?"S'inscrire":'Envoyer le lien'}
          </button>
        </div>
        <div style={{textAlign:'center',marginTop:18,display:'flex',flexDirection:'column',gap:8}}>
          {mode==='login'&&<button onClick={()=>{setMode('forgot');setError('');setSuccess('');}} style={{border:0,background:'none',color:'var(--im)',fontSize:14,cursor:'pointer',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Mot de passe oublié ?</button>}
          <button onClick={()=>{setMode(mode==='login'?'signup':'login');setError('');setSuccess('');}} style={{border:0,background:'none',color:'var(--bx)',fontSize:14,cursor:'pointer',textDecoration:'underline',fontFamily:"'Cormorant Garamond',serif"}}>
            {mode==='forgot'?'← Retour à la connexion':mode==='login'?"Pas encore de compte ? S'inscrire":'Déjà un compte ? Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width:'100%',padding:'14px 16px',border:'1px solid var(--ls)',
  borderRadius:14,fontSize:15,background:'var(--cr)',
  outline:'none',color:'var(--ink)',
  fontFamily:"'Inter', sans-serif",
  boxSizing:'border-box',
};
