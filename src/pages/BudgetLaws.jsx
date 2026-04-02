import { lawsData } from '../data/budgetData';
import { Shield, Scale } from 'lucide-react';

export default function BudgetLaws() {
  return (
    <div className="container animate-fade-in">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 className="flex items-center justify-center gap-4">
          <Scale size={42} color="var(--accent-2)" /> Budget Laws & Tax Changes
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          An easy-to-digest breakdown of regulatory modifications and taxation adjustments.
        </p>
      </div>

      <div className="flex-col gap-8">
        {lawsData.map((law, idx) => (
          <div key={idx} className={`glass-panel animate-fade-in delay-${(idx + 1) * 100}`}>
            <h2 className="flex items-center gap-2" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#a5b4fc' }}>
              <Shield size={24} /> {law.title}
            </h2>
            
            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
              {law.details.map((detail, dIdx) => (
                <div key={dIdx} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{detail.range}</span>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{detail.rate}</strong>
                </div>
              ))}
            </div>
            
            <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.1)', borderLeft: '4px solid var(--accent-1)', borderRadius: '0.5rem' }}>
              <strong>Key Note:</strong> {law.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
