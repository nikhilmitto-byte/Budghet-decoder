import { professionsData } from '../data/budgetData';
import { CheckCircle2 } from 'lucide-react';

export default function ProfessionImpact() {
  return (
    <div className="container animate-fade-in">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1>Impact by Profession</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Discover exactly how the Union Budget 2026 affects your specific line of work.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {professionsData.map((prof, idx) => (
          <div 
            key={idx} 
            className={`glass-panel animate-fade-in delay-${(idx + 1) * 100}`}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
              <h2>{prof.profession}</h2>
              <span 
                style={{ 
                  background: prof.impact === 'Highly Positive' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)', 
                  color: 'var(--accent-1)',
                  padding: '0.25rem 1rem',
                  borderRadius: '2rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                {prof.impact} Impact
              </span>
            </div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {prof.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex gap-2" style={{ alignItems: 'flex-start' }}>
                  <CheckCircle2 color="var(--accent-1)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-main)', lineHeight: '1.4' }}>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
