import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Building2, Wallet, Cpu } from 'lucide-react';
import { summaryData } from '../data/budgetData';

// Map icon strings to actual components
const getIcon = (iconName) => {
  switch(iconName) {
    case 'TrendingDown': return <TrendingDown size={32} color="var(--accent-1)" />;
    case 'Building2': return <Building2 size={32} color="var(--accent-2)" />;
    case 'Wallet': return <Wallet size={32} color="var(--accent-3)" />;
    case 'Cpu': return <Cpu size={32} color="var(--accent-4)" />;
    default: return null;
  }
};

export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ position: 'relative' }}>
      <div className="flex-col items-center text-center" style={{ padding: '2rem 0 4rem 0', gap: '2rem', position: 'relative', zIndex: 10 }}>
        
        {/* 3D Geometric Figure */}
        <div className="scene-3d animate-fade-in">
          <div className="cube-3d">
            <div className="cube-face front">₹</div>
            <div className="cube-face back">26</div>
            <div className="cube-face right">📈</div>
            <div className="cube-face left">💼</div>
            <div className="cube-face top">🏛️</div>
            <div className="cube-face bottom">⚡</div>
          </div>
        </div>

        <h1 className="animate-fade-in delay-100" style={{ marginTop: '-1rem' }}>Decoding Union Budget 2026</h1>
        <p style={{ maxWidth: '800px', fontSize: '1.25rem', margin: '0 auto' }} className="animate-fade-in delay-100">
          We strip away the financial jargon to help you understand exactly how India's latest budget impacts your wallet, your business, and the nation's future.
        </p>
        
        <div className="flex gap-4 justify-center animate-fade-in delay-200" style={{ marginTop: '2rem' }}>
          <Link to="/calculator" className="btn btn-primary">
            Calculate My Tax <ArrowRight size={18} />
          </Link>
          <Link to="/professions" className="btn btn-outline">
            See Profession Impact
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 className="text-center animate-fade-in delay-300">Key Highlights for the Common Man</h2>
        <div className="grid grid-cols-2 gap-6 animate-fade-in delay-300" style={{ marginTop: '3rem' }}>
          {summaryData.map(item => (
            <div key={item.id} className="glass-panel flex-col gap-4">
              <div className="flex items-center gap-4">
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                  {getIcon(item.icon)}
                </div>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-panel text-center animate-fade-in delay-300" style={{ marginTop: '4rem', background: 'rgba(79, 70, 229, 0.1)', borderColor: 'var(--primary)' }}>
        <h2>Got specific questions?</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
          Our interactive assistant is trained on the entire budget document. Ask any question about taxes, schemes, or policies.
        </p>
        <button className="btn btn-primary" onClick={() => document.getElementById('chat-toggle').click()}>
          Open Budget Assistant Chat
        </button>
      </div>
    </div>
  );
}
