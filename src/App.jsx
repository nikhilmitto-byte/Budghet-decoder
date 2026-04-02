import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Briefcase, FileText, BarChart3, Calculator, Zap } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useTheme } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LogoutButton } from './components/LogoutButton';

// Pages
import Login from './pages/Login';
import HomePage from './pages/Home';
import ProfessionImpact from './pages/ProfessionImpact';
import BudgetLaws from './pages/BudgetLaws';
import ComparativeAnalysis from './pages/ComparativeAnalysis';
import TaxCalculator from './pages/TaxCalculator';
import BudgetDecoder from './pages/BudgetDecoder';

// Components
import Chatbot from './components/Chatbot';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const navItems = [
    { path: '/', label: 'Summary', icon: <HomeIcon size={18} /> },
    { path: '/professions', label: 'Professions', icon: <Briefcase size={18} /> },
    { path: '/laws', label: 'Laws & Tax', icon: <FileText size={18} /> },
    { path: '/analysis', label: 'Analysis', icon: <BarChart3 size={18} /> },
    { path: '/calculator', label: 'Calculator', icon: <Calculator size={18} /> },
    { path: '/decoder', label: 'Decoder', icon: <Zap size={18} /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Show login page without navbar
  if (location.pathname === '/login') {
    return <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-logo">
            <span style={{ color: 'var(--accent-1)' }}>B</span>udget<span style={{ color: 'var(--accent-2)' }}>26</span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-1 nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            {user && (
              <div className="user-profile">
                <span className="user-name">{user.displayName || user.email}</span>
                <ThemeSwitcher />
                <LogoutButton onClick={handleLogout} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/professions" element={<ProtectedRoute><ProfessionImpact /></ProtectedRoute>} />
          <Route path="/laws" element={<ProtectedRoute><BudgetLaws /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><ComparativeAnalysis /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><TaxCalculator /></ProtectedRoute>} />
          <Route path="/decoder" element={<ProtectedRoute><BudgetDecoder /></ProtectedRoute>} />
        </Routes>
      </main>

      {user && <Chatbot />}
    </>
  );
}

export default App;
