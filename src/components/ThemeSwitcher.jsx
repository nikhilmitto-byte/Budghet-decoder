import { useTheme, themes } from '../context/ThemeContext';
import { Palette } from 'lucide-react';
import '../styles/ThemeSwitcher.css';

export const ThemeSwitcher = () => {
  const { currentTheme, switchTheme, availableThemes } = useTheme();

  return (
    <div className="theme-switcher">
      <button className="theme-button" title="Switch theme">
        <Palette size={20} />
      </button>
      <div className="theme-dropdown">
        {availableThemes.map((themeName) => (
          <button
            key={themeName}
            className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
            onClick={() => switchTheme(themeName)}
            title={`Switch to ${themes[themeName].name} theme`}
          >
            <span className="theme-color" style={{ backgroundColor: themes[themeName].primary }}></span>
            {themes[themeName].name}
          </button>
        ))}
      </div>
    </div>
  );
};
