/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const THEMES = {
  cyberpunk: {
    name: 'Cyberpunk Neon',
    emoji: '🟣',
    primary: '#00F5FF',
    secondary: '#FF00C8',
    accent: '#facc15',
    bg: '#060610',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(0,245,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,0,200,0.08) 0%, transparent 50%), linear-gradient(135deg, #060610 0%, #0a0a1a 50%, #060610 100%)',
    gridColor: 'rgba(0,245,255,0.035)',
    taskbarBg: 'rgba(6,6,14,0.94)',
    windowBg: 'rgba(8,8,20,0.96)',
    titleBar: 'linear-gradient(90deg, rgba(0,245,255,0.14) 0%, rgba(255,0,200,0.14) 100%)',
    borderColor: 'rgba(0,245,255,0.18)',
  },
  retro: {
    name: 'Matrix Retro',
    emoji: '🟢',
    primary: '#39ff14',
    secondary: '#ffaa00',
    accent: '#ffff00',
    bg: '#040804',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(57,255,20,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,170,0,0.08) 0%, transparent 50%), linear-gradient(135deg, #040804 0%, #081208 50%, #040804 100%)',
    gridColor: 'rgba(57,255,20,0.04)',
    taskbarBg: 'rgba(4,8,4,0.94)',
    windowBg: 'rgba(5,12,5,0.96)',
    titleBar: 'linear-gradient(90deg, rgba(57,255,20,0.14) 0%, rgba(255,170,0,0.14) 100%)',
    borderColor: 'rgba(57,255,20,0.2)',
  },
  modern: {
    name: 'Modern Indigo',
    emoji: '🔵',
    primary: '#818cf8',
    secondary: '#f472b6',
    accent: '#34d399',
    bg: '#080814',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(129,140,248,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(244,114,182,0.08) 0%, transparent 50%), linear-gradient(135deg, #080814 0%, #0e0e22 50%, #080814 100%)',
    gridColor: 'rgba(129,140,248,0.04)',
    taskbarBg: 'rgba(8,8,18,0.94)',
    windowBg: 'rgba(10,10,24,0.96)',
    titleBar: 'linear-gradient(90deg, rgba(129,140,248,0.14) 0%, rgba(244,114,182,0.14) 100%)',
    borderColor: 'rgba(129,140,248,0.18)',
  },
  nordic: {
    name: 'Nordic Frost',
    emoji: '❄️',
    primary: '#38bdf8',
    secondary: '#a78bfa',
    accent: '#2dd4bf',
    bg: '#060a12',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(167,139,250,0.08) 0%, transparent 50%), linear-gradient(135deg, #060a12 0%, #0a1220 50%, #060a12 100%)',
    gridColor: 'rgba(56,189,248,0.04)',
    taskbarBg: 'rgba(6,10,18,0.94)',
    windowBg: 'rgba(8,14,24,0.96)',
    titleBar: 'linear-gradient(90deg, rgba(56,189,248,0.14) 0%, rgba(167,139,250,0.14) 100%)',
    borderColor: 'rgba(56,189,248,0.18)',
  },
};

export const WALLPAPERS = [
  { id: 'grid',     name: 'Grid',         description: 'Matematiksel Izgara' },
  { id: 'dots',     name: 'Noktalar',     description: 'Matrix Matrisi' },
  { id: 'circuit',  name: 'Devre Kartı',  description: 'PCB Devre Şeması' },
  { id: 'gradient', name: 'Sade Gradyan', description: 'Minimalist Gradyan' },
  { id: 'stars',    name: 'Yıldızlar',    description: 'Uzay Parçacıkları' },
];

export const SPEEDS = {
  instant: { name: 'Anlık',  ms: 0   },
  fast:    { name: 'Hızlı',  ms: 80  },
  normal:  { name: 'Normal', ms: 180 },
  slow:    { name: 'Yavaş',  ms: 400 },
};

export const FONTS = {
  sans:   { name: 'Inter (Modern Sans)',       css: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  mono:   { name: 'JetBrains (Monospace)',     css: "'JetBrains Mono', 'Courier New', monospace" },
  system: { name: 'Sistem Standartı (System)', css: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
};

export const GLASS_EFFECTS = {
  ultra:    { name: 'Ultra Cam (28px Blur)', blur: '28px', opacity: '0.92' },
  balanced: { name: 'Dengeli (16px Blur)',   blur: '16px', opacity: '0.96' },
  solid:    { name: 'Düz / Katı (Performans)', blur: '0px', opacity: '0.99' },
};

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  // Local storage assisted state initialization
  const [themeName, setThemeName] = useState(() => {
    try { return localStorage.getItem('affanos_theme') || 'cyberpunk'; } catch { return 'cyberpunk'; }
  });
  const [wallpaper, setWallpaper] = useState(() => {
    try { return localStorage.getItem('affanos_wallpaper') || 'grid'; } catch { return 'grid'; }
  });
  const [speedKey, setSpeedKey] = useState(() => {
    try { return localStorage.getItem('affanos_speed') || 'normal'; } catch { return 'normal'; }
  });
  const [fontKey, setFontKey] = useState(() => {
    try { return localStorage.getItem('affanos_font') || 'sans'; } catch { return 'sans'; }
  });
  const [glassKey, setGlassKey] = useState(() => {
    try { return localStorage.getItem('affanos_glass') || 'ultra'; } catch { return 'ultra'; }
  });
  const [crtEffect, setCrtEffect] = useState(() => {
    try { return localStorage.getItem('affanos_crt') === 'true'; } catch { return false; }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('affanos_theme', themeName);
      localStorage.setItem('affanos_wallpaper', wallpaper);
      localStorage.setItem('affanos_speed', speedKey);
      localStorage.setItem('affanos_font', fontKey);
      localStorage.setItem('affanos_glass', glassKey);
      localStorage.setItem('affanos_crt', String(crtEffect));
    } catch {
      // Storage unavailable
    }
  }, [themeName, wallpaper, speedKey, fontKey, glassKey, crtEffect]);

  // Apply dynamic font to document
  useEffect(() => {
    const fontConfig = FONTS[fontKey] || FONTS.sans;
    document.documentElement.style.setProperty('--font-sans', fontConfig.css);
  }, [fontKey]);

  const resetDefaults = useCallback(() => {
    setThemeName('cyberpunk');
    setWallpaper('grid');
    setSpeedKey('normal');
    setFontKey('sans');
    setGlassKey('ultra');
    setCrtEffect(false);
    try { localStorage.clear(); } catch { /* ignore */ }
  }, []);

  const theme = THEMES[themeName] || THEMES.cyberpunk;
  const speed = SPEEDS[speedKey] || SPEEDS.normal;
  const glass = GLASS_EFFECTS[glassKey] || GLASS_EFFECTS.ultra;

  return (
    <ThemeContext.Provider value={{
      theme, themeName, setThemeName,
      wallpaper, setWallpaper,
      speedKey, setSpeedKey, speed,
      fontKey, setFontKey, FONTS,
      glassKey, setGlassKey, glass, GLASS_EFFECTS,
      crtEffect, setCrtEffect,
      resetDefaults,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
