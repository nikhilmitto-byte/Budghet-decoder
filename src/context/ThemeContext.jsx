
































































import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'Light',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent1: '#dc2626',
    accent2: '#ea580c',
    background: '#ffffff',
    surface: '#f3f4f6',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
  },
  dark: {
    name: 'Dark',
    primary: '#3b82f6',
    secondary: '#1e3a8a',
    accent1: '#ef4444',
    accent2: '#f97316',
    background: '#111827',
    surface: '#1f2937',
    text: '#f3f4f6',
    textSecondary: '#9ca3af',
    border: '#374151',
  },
  ocean: {
    name: 'Ocean',
    primary: '#0369a1',
    secondary: '#0c4a6e',
    accent1: '#06b6d4',
    accent2: '#0ea5e9',
    background: '#f0f9ff',
    surface: '#e0f2fe',
    text: '#164e63',
    textSecondary: '#475569',
    border: '#cffafe',
  },
  forest: {
    name: 'Forest',
    primary: '#15803d',
    secondary: '#14532d',
    accent1: '#10b981',
    accent2: '#34d399',
    background: '#f0fdf4',
    surface: '#dcfce7',
    text: '#166534',
    textSecondary: '#47564a',
    border: '#86efac',
  },
  sunset: {
    name: 'Sunset',
    primary: '#ea580c',
    secondary: '#9a3412',
    accent1: '#f97316',
    accent2: '#fb923c',
    background: '#fef3c7',
    surface: '#fed7aa',
    text: '#92400e',
    textSecondary: '#b45309',
    border: '#fbbf24',
  },
  purple: {
    name: 'Purple',
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent1: '#a855f7',
    accent2: '#d946ef',
    background: '#f5f3ff',
    surface: '#ede9fe',
    text: '#5b21b6',
    textSecondary: '#7c3aed',
    border: '#c4b5fd',
  },
  rose: {
    name: 'Rose',
    primary: '#be185d',
    secondary: '#831843',
    accent1: '#f43f5e',
    accent2: '#fb7185',
    background: '#fff7ed',
    surface: '#ffe4e6',
    text: '#831843',
    textSecondary: '#be185d',
    border: '#fbcfe8',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('appTheme');
    return saved || 'light';
  });

  const theme = themes[currentTheme];

  useEffect(() => {
    localStorage.setItem('appTheme', currentTheme);
    
    // Apply theme variables to document root
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [currentTheme, theme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme,
    switchTheme,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
