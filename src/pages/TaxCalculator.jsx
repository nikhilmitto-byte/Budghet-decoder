import { useState } from 'react';
import { Calculator as CalcIcon, AlertCircle } from 'lucide-react';

export default function TaxCalculator() {
  const [income, setIncome] = useState(1000000); // Default 10L
  const [isNewRegime] = useState(true); // Assuming new regime for 2026

  const calculateTax = () => {
    let rawIncome = Number(income);
    if (isNaN(rawIncome) || rawIncome < 0) return { tax: 0, breakdown: [] };

    // Standard Deduction
    let taxableIncome = Math.max(0, rawIncome - 75000);
    
    // Rebate up to 8 Lakh
    if (taxableIncome <= 800000) return { tax: 0, breakdown: [{ slab: 'Below 8L (Rebate applied)', amount: 0 }] };

    let tax = 0;
    let breakdown = [];

    const calculateSlab = (min, max, rate, label) => {
      if (taxableIncome > min) {
        let taxableInThisSlab = Math.min(taxableIncome - min, max - min);
        let taxForSlab = taxableInThisSlab * rate;
        tax += taxForSlab;
        if (taxForSlab > 0) {
          breakdown.push({ slab: label, amount: taxForSlab });
        }
      }
    };

    calculateSlab(400000, 800000, 0.05, '4L - 8L (5%)');
    calculateSlab(800000, 1200000, 0.10, '8L - 12L (10%)');
    calculateSlab(1200000, 1600000, 0.15, '12L - 16L (15%)');
    calculateSlab(1600000, 2000000, 0.20, '16L - 20L (20%)');
    
    if (taxableIncome > 2000000) {
      let taxForSlab = (taxableIncome - 2000000) * 0.30;
      tax += taxForSlab;
      breakdown.push({ slab: 'Above 20L (30%)', amount: taxForSlab });
    }

    // Health and Education Cess (4%)
    let cess = tax * 0.04;
    breakdown.push({ slab: 'Health & Edu Cess (4%)', amount: cess });
    tax += cess;

    return { tax, breakdown };
  };

  const results = calculateTax();

  return (
    <div className="container animate-fade-in">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 className="flex items-center justify-center gap-4">
          <CalcIcon size={42} color="var(--accent-1)" /> Budget 2026 Tax Calculator
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Estimate your preliminary tax liability under the proposed new tax regime.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'flex-start' }}>
        {/* Input Form */}
        <div className="glass-panel animate-fade-in delay-100">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Your Income Details</h2>
          
          <div className="input-group">
            <label className="input-label">Annual Gross Income (₹)</label>
            <input 
              type="number" 
              className="input-field" 
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 1200000"
              min="0"
            />
          </div>
          
          <div className="input-group" style={{ opacity: 0.7 }}>
            <label className="input-label">Tax Regime</label>
            <input type="text" className="input-field" value="New Regime (Default 2026)" disabled />
          </div>

          <div className="input-group" style={{ opacity: 0.7 }}>
            <label className="input-label">Standard Deduction Applicable</label>
            <input type="text" className="input-field" value="₹75,000" disabled />
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--accent-3)', borderRadius: '0.5rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
            <AlertCircle size={20} color="var(--accent-3)" style={{ flexShrink: 0 }} />
            <span>This is an estimation based on the proposed 2026 budget slabs and does not constitute financial advice.</span>
          </div>
        </div>

        {/* Results Box */}
        <div className="glass-panel animate-fade-in delay-200" style={{ background: 'rgba(79, 70, 229, 0.1)', borderColor: 'var(--primary)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>Tax Breakdown</h2>
          
          <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Gross Income:</span>
            <strong>₹{Number(income).toLocaleString('en-IN')}</strong>
          </div>
          
          <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Standard Deduction:</span>
            <strong style={{ color: 'var(--accent-1)' }}>- ₹75,000</strong>
          </div>
          
          <div className="flex justify-between" style={{ marginBottom: '1.5rem', fontSize: '1.1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Taxable Income:</span>
            <strong>₹{Math.max(0, Number(income) - 75000).toLocaleString('en-IN')}</strong>
          </div>

          {results.breakdown.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Slab Calculations:</strong>
              {results.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between" style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  <span>{item.slab}</span>
                  <span>₹{Math.round(item.amount).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex-col items-center justify-center" style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '1rem', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Estimated Total Tax</span>
            <span style={{ fontSize: '3rem', fontWeight: '700', color: results.tax === 0 ? 'var(--accent-1)' : 'var(--text-main)', lineHeight: '1' }}>
              ₹{Math.round(results.tax).toLocaleString('en-IN')}
            </span>
            {results.tax === 0 && <span style={{ color: 'var(--accent-1)', marginTop: '0.5rem', fontWeight: '500' }}>No Tax Applicable!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
