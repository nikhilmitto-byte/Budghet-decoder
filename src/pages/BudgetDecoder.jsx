import { useState } from 'react';
import { Loader2, Zap, Briefcase, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BudgetDecoder() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ job: '', salary: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState('');

  const chatEndpoint = import.meta.env.VITE_CHAT_PROXY_URL ? import.meta.env.VITE_CHAT_PROXY_URL.replace('/chat', '/profile/match') : '/api/profile/match';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!formData.job || !formData.salary) {
      setError('Job and Salary are required');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const payload = {
        userId: user ? user.uid : 'guest',
        job: formData.job,
        salary: Number(formData.salary),
        location: formData.location
      };
      
      const res = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to decode budget');
      
      setMatches(data.matched_benefits);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            <Zap size={36} color="#fbbf24" style={{ flexShrink: 0 }} /> 
            AI Budget Decoder
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
            Enter your professional profile below. Our AI evaluates the Union Budget 2026 data and instantly recommends exact tax benefits and schemes tailored for you.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          
          {/* Form */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Your Profile</h3>
            
            <form onSubmit={handleMatch} className="flex flex-col gap-4">
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={16}/> Profession / Job Title
                </label>
                <input 
                  type="text" name="job" value={formData.job} onChange={handleChange}
                  placeholder="e.g. Software Engineer, Farmer" className="input-field" required
                />
              </div>

              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16}/> Annual Salary (₹)
                </label>
                <input 
                  type="number" name="salary" value={formData.salary} onChange={handleChange}
                  placeholder="e.g. 1500000" className="input-field" required
                />
              </div>

              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16}/> Location (Optional)
                </label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleChange}
                  placeholder="e.g. Mumbai, Tier-2 City" className="input-field"
                />
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', justifyContent: 'center' }}>
                {loading ? <><Loader2 className="animate-spin" /> Decoding...</> : <><Zap /> Reveal My Benefits</>}
              </button>
            </form>
          </div>

          {/* Results */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>AI Matched Schemes</h3>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {!matches && !loading && (
                <div style={{ textAlign: 'center', opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                    <Zap size={32} />
                  </div>
                  <p>Submit your profile to clearly see personalized Budget 2026 schemes.</p>
                </div>
              )}

              {loading && (
                <div style={{ textAlign: 'center', color: '#60a5fa', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <Loader2 size={40} className="animate-spin" />
                  <p>Analyzing Budget facts...</p>
                </div>
              )}

              {matches && !loading && (
                <div className="flex flex-col gap-4 animate-fade-in" style={{ height: '100%' }}>
                  {matches.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '0.5rem', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }}>
                      <CheckCircle2 color="#34d399" size={24} style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, color: '#f8fafc', lineHeight: 1.5 }}>{benefit}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', paddingTop: '1.5rem', textAlign: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
                    Results generated securely via AI mapped to the Union Budget 2026.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
