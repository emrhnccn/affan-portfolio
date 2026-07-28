/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

export const THEMES = {
  cyberpunk: {
    name: 'Cyberpunk',
    emoji: '🟣',
    primary: '#00F5FF',
    secondary: '#FF00C8',
    accent: '#facc15',
    bg: '#060610',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(0,245,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,0,200,0.07) 0%, transparent 50%), linear-gradient(135deg, #060610 0%, #0a0a1a 50%, #060610 100%)',
    gridColor: 'rgba(0,245,255,0.035)',
    taskbarBg: 'rgba(6,6,14,0.93)',
    windowBg: 'rgba(8,8,18,0.97)',
    titleBar: 'linear-gradient(90deg, rgba(0,245,255,0.13) 0%, rgba(255,0,200,0.13) 100%)',
    borderColor: 'rgba(0,245,255,0.15)',
  },
  retro: {
    name: 'Retro Green',
    emoji: '🟢',
    primary: '#39ff14',
    secondary: '#ff7700',
    accent: '#ffff00',
    bg: '#050a05',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(57,255,20,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,119,0,0.07) 0%, transparent 50%), linear-gradient(135deg, #050a05 0%, #0a110a 50%, #050a05 100%)',
    gridColor: 'rgba(57,255,20,0.04)',
    taskbarBg: 'rgba(5,10,5,0.93)',
    windowBg: 'rgba(5,10,5,0.97)',
    titleBar: 'linear-gradient(90deg, rgba(57,255,20,0.13) 0%, rgba(255,119,0,0.13) 100%)',
    borderColor: 'rgba(57,255,20,0.18)',
  },
  modern: {
    name: 'Modern',
    emoji: '🔵',
    primary: '#818cf8',
    secondary: '#f472b6',
    accent: '#34d399',
    bg: '#0a0a14',
    bgGradient: 'radial-gradient(ellipse at 20% 30%, rgba(129,140,248,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(244,114,182,0.07) 0%, transparent 50%), linear-gradient(135deg, #0a0a14 0%, #0f0f1e 50%, #0a0a14 100%)',
    gridColor: 'rgba(129,140,248,0.04)',
    taskbarBg: 'rgba(10,10,20,0.93)',
    windowBg: 'rgba(10,10,22,0.97)',
    titleBar: 'linear-gradient(90deg, rgba(129,140,248,0.13) 0%, rgba(244,114,182,0.13) 100%)',
    borderColor: 'rgba(129,140,248,0.15)',
  },
};

export const WALLPAPERS = [
  { id: 'grid',     name: 'Grid',         description: 'Izgara deseni' },
  { id: 'dots',     name: 'Noktalar',     description: 'Nokta matrisi' },
  { id: 'circuit',  name: 'Devre Kartı',  description: 'PCB deseni' },
  { id: 'gradient', name: 'Gradyan',      description: 'Sade gradyan' },
  { id: 'stars',    name: 'Yıldızlar',    description: 'Uzay teması' },
];

export const SPEEDS = {
  slow:   { name: 'Yavaş',  ms: 400 },
  normal: { name: 'Normal', ms: 180 },
  fast:   { name: 'Hızlı',  ms: 80  },
};

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [themeName, setThemeName]   = useState('cyberpunk');
  const [wallpaper, setWallpaper]   = useState('grid');
  const [speedKey,  setSpeedKey]    = useState('normal');

  const theme = THEMES[themeName];
  const speed = SPEEDS[speedKey];

  return (
    <ThemeContext.Provider value={{
      theme, themeName, setThemeName,
      wallpaper, setWallpaper,
      speedKey, setSpeedKey, speed,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
