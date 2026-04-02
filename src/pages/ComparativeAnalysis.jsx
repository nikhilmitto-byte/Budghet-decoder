import { comparativeChartData } from '../data/budgetData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function ComparativeAnalysis() {
  return (
    <div className="container animate-fade-in">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1>Comparative Analysis</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Visualizing the government's priorities and spending trends over the last three years.
        </p>
      </div>

      <div className="flex-col gap-8">
        <div className="glass-panel animate-fade-in delay-100">
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Capital Expenditure (₹ Lakh Crores)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={comparativeChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'var(--primary)', color: '#fff', borderRadius: '0.5rem' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="capex" name="Capex" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 delay-200">
          <div className="glass-panel animate-fade-in">
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Healthcare Allocation (%)</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={comparativeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '0.5rem', border: 'none' }} />
                  <Line type="monotone" dataKey="health" name="Health %" stroke="var(--accent-1)" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel animate-fade-in delay-300">
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Defense Allocation (%)</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={comparativeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '0.5rem', border: 'none' }} />
                  <Line type="monotone" dataKey="defense" name="Defense %" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
