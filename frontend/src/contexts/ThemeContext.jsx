import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codequest_theme') || 'purple';
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('codequest_fontSize') || '14');
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('codequest_sound') !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('codequest_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codequest_fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('codequest_sound', soundEnabled.toString());
  }, [soundEnabled]);

  const themes = {
    purple: {
      name: 'Purple Dream',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      primary: 'purple-600',
      secondary: 'pink-600',
      accent: 'indigo-500'
    },
    ocean: {
      name: 'Ocean Blue',
      gradient: 'from-blue-400 via-cyan-500 to-teal-500',
      primary: 'blue-600',
      secondary: 'cyan-600',
      accent: 'teal-500'
    },
    sunset: {
      name: 'Sunset',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      primary: 'orange-600',
      secondary: 'red-600',
      accent: 'pink-500'
    },
    forest: {
      name: 'Forest',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      primary: 'green-600',
      secondary: 'emerald-600',
      accent: 'teal-600'
    },
    galaxy: {
      name: 'Galaxy',
      gradient: 'from-purple-600 via-blue-600 to-indigo-800',
      primary: 'purple-700',
      secondary: 'blue-700',
      accent: 'indigo-700'
    },
    fire: {
      name: 'Fire',
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      primary: 'orange-600',
      secondary: 'red-600',
      accent: 'yellow-500'
    }
  };

  const currentTheme = themes[theme];

  const increaseFontSize = () => {
    if (fontSize < 20) setFontSize(prev => prev + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 10) setFontSize(prev => prev - 2);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      themes,
      currentTheme,
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      soundEnabled,
      toggleSound
    }}>
      {children}
    </ThemeContext.Provider>
  );
};