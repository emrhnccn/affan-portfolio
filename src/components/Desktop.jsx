import { useState, useEffect, useRef, useCallback } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import { useTheme } from '../contexts/ThemeContext';
import { useSounds } from '../hooks/useSounds';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import CVApp from './apps/CVApp';
import ContactApp from './apps/ContactApp';
import TerminalApp from './apps/TerminalApp';
import SettingsApp from './apps/SettingsApp';
import BrowserApp from './apps/BrowserApp';

const APP_COMPONENTS = {
  about: <AboutApp />,
  projects: <ProjectsApp />,
  cv: <CVApp />,
  contact: <ContactApp />,
  terminal: <TerminalApp />,
  browser: <BrowserApp />,
  settings: <SettingsApp />,
};

// ─── Wallpaper patterns ───────────────────────────────────────────────────────
function WallpaperLayer({ wallpaper, theme }) {
  const { gridColor } = theme;

  if (wallpaper === 'grid') return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
    }} />
  );

  if (wallpaper === 'dots') return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `radial-gradient(circle, ${gridColor.replace('0.03', '0.4')} 1.5px, transparent 1.5px)`,
      backgroundSize: '24px 24px',
      maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
    }} />
  );

  if (wallpaper === 'circuit') return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(${gridColor.replace('0.035','0.06')} 1px, transparent 1px),
        linear-gradient(90deg, ${gridColor.replace('0.035','0.06')} 1px, transparent 1px),
        linear-gradient(${gridColor} 1px, transparent 1px),
        linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px, 60px 60px, 12px 12px, 12px 12px',
      maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 75%)',
    }} />
  );

  if (wallpaper === 'stars') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[...Array(80)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 5 === 0 ? '3px' : '1.5px',
          height: i % 5 === 0 ? '3px' : '1.5px',
          background: theme.primary,
          borderRadius: '50%',
          left: `${(i * 173 + 7) % 100}%`,
          top: `${(i * 97 + 13) % 100}%`,
          boxShadow: `0 0 ${i % 5 === 0 ? 5 : 2}px ${theme.primary}`,
          opacity: 0.2 + (i % 5) * 0.1,
          animation: `pulse ${2 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${(i % 8) * 0.4}s`,
        }} />
      ))}
    </div>
  );

  // gradient — no extra overlay
  return null;
}

// ─── Desktop icon component ───────────────────────────────────────────────────
function DesktopIcon({ app, onClick, theme }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className="desktop-icon"
      onClick={() => onClick(app)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${app.title} uygulamasını aç`}
      title={`${app.title} uygulamasını aç`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
        background: hovered ? `${theme.primary}12` : 'transparent',
        border: hovered ? `1px solid ${theme.primary}33` : '1px solid transparent',
        width: '80px', transition: 'all 0.15s', userSelect: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        font: 'inherit',
      }}
    >
      <span style={{
        fontSize: '32px',
        filter: hovered ? `drop-shadow(0 4px 12px ${theme.primary}66)` : 'none',
        transition: 'filter 0.2s',
      }}>
        {app.icon}
      </span>
      <span style={{
        color: '#e2e8f0', fontSize: '11px', textAlign: 'center',
        lineHeight: 1.3, fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.8)',
      }}>
        {app.title}
      </span>
    </button>
  );
}

// ─── Context menu ─────────────────────────────────────────────────────────────
function ContextMenu({ x, y, onClose, onOpenApp, APP_LIST, theme }) {
  const items = [
    { label: '🔄 Masaüstünü Yenile', action: () => {} },
    { label: '📁 Projeler', action: () => onOpenApp(APP_LIST.find(a => a.id === 'projects')) },
    { label: '⬛ Terminal Aç', action: () => onOpenApp(APP_LIST.find(a => a.id === 'terminal')) },
    { label: '🌐 Tarayıcı', action: () => onOpenApp(APP_LIST.find(a => a.id === 'browser')) },
    { divider: true },
    { label: '⚙️ Ayarlar', action: () => onOpenApp(APP_LIST.find(a => a.id === 'settings')) },
    { label: '💡 Hakkımda', action: () => onOpenApp(APP_LIST.find(a => a.id === 'about')) },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 888 }} />
      <div style={{
        position: 'fixed', left: x, top: y, zIndex: 889,
        background: 'rgba(8, 8, 18, 0.97)', backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.primary}22`, borderRadius: '10px',
        padding: '6px', minWidth: '200px',
        boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 0 1px ${theme.primary}11`,
        animation: 'fadeInScale 0.15s ease',
      }}>
        {items.map((item, i) => item.divider ? (
          <div key={i} style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
        ) : (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            style={{
              display: 'block', width: '100%', padding: '8px 12px',
              background: 'transparent', border: 'none',
              color: '#e2e8f0', fontSize: '13px', cursor: 'pointer',
              textAlign: 'left', borderRadius: '6px', transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${theme.primary}15`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Main Desktop ─────────────────────────────────────────────────────────────
export default function Desktop() {
  const { theme, wallpaper } = useTheme();
  const [muted, setMuted] = useState(false);
  const { play } = useSounds(muted);

  const [windows, setWindows] = useState([]);
  const [topZ, setTopZ] = useState(100);
  const [contextMenu, setContextMenu] = useState(null);
  const startupPlayedRef = useRef(false);

  // ── App configs (inside component to use play callback) ───────────────────
  const APP_LIST = [
    { id: 'about',    title: 'Hakkımda.exe', icon: '👤', subtitle: 'Geliştirici profili & FIFA kartı', size: { w: 840, h: 580 }, defaultPos: () => ({ x: 80,  y: 60  }) },
    { id: 'projects', title: 'Projeler/',     icon: '📁', subtitle: '10 seçili proje',                 size: { w: 780, h: 540 }, defaultPos: () => ({ x: 160, y: 80  }) },
    { id: 'cv',       title: 'CV.exe',        icon: '📄', subtitle: 'Özgeçmiş görüntüleyici',          size: { w: 760, h: 580 }, defaultPos: () => ({ x: 220, y: 60  }) },
    { id: 'contact',  title: 'İletişim.app',  icon: '✉️', subtitle: 'Email client',                    size: { w: 780, h: 520 }, defaultPos: () => ({ x: 260, y: 80  }) },
    { id: 'terminal', title: 'Terminal',      icon: '⬛', subtitle: 'AffanOS Shell',                   size: { w: 680, h: 440 }, defaultPos: () => ({ x: 300, y: 100 }) },
    { id: 'browser',  title: 'Tarayıcı',      icon: '🌐', subtitle: 'AffanOS Browser',                 size: { w: 900, h: 620 }, defaultPos: () => ({ x: 180, y: 50  }) },
    { id: 'settings', title: 'Ayarlar',       icon: '⚙️', subtitle: 'Kişiselleştirme',                 size: { w: 560, h: 600 }, defaultPos: () => ({ x: 400, y: 80  }) },
  ];

  // Startup sound on first user interaction
  useEffect(() => {
    const handleFirst = () => {
      if (!startupPlayedRef.current) {
        startupPlayedRef.current = true;
        play('startup');
      }
      document.removeEventListener('click', handleFirst);
    };
    document.addEventListener('click', handleFirst);
    return () => document.removeEventListener('click', handleFirst);
  }, [play]);

  // ── Window management ──────────────────────────────────────────────────────
  const openApp = useCallback((appConfig) => {
    if (!appConfig) return;
    play('click');
    setWindows(prev => {
      const exists = prev.find(w => w.appId === appConfig.id);
      if (exists) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        return prev.map(w =>
          w.appId === appConfig.id ? { ...w, isMinimized: false, zIndex: newZ } : w
        );
      }
      const newZ = topZ + 1;
      setTopZ(newZ);
      const pos = appConfig.defaultPos();
      const offset = prev.length * 24;
      const safeX = Math.max(12, Math.min(pos.x + offset, window.innerWidth - appConfig.size.w - 12));
      const safeY = Math.max(12, Math.min(pos.y + offset, window.innerHeight - appConfig.size.h - 60));
      play('windowOpen');
      return [...prev, {
        id: Date.now(),
        appId: appConfig.id,
        title: appConfig.title,
        icon: appConfig.icon,
        isMinimized: false,
        isMaximized: false,
        position: { x: safeX, y: safeY },
        size: appConfig.size,
        zIndex: newZ,
        component: APP_COMPONENTS[appConfig.id],
      }];
    });
  }, [topZ, play]);

  const closeWindow = useCallback((id) => {
    play('windowClose');
    setWindows(prev => prev.filter(w => w.id !== id));
  }, [play]);

  const minimizeWindow = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, [play]);

  const maximizeWindow = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, [play]);

  const focusWindow = useCallback((id) => {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
  }, [topZ]);

  const moveWindow = useCallback((id, pos) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const toggleMinimize = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      if (w.isMinimized) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        return { ...w, isMinimized: false, zIndex: newZ };
      }
      return { ...w, isMinimized: true };
    }));
  }, [topZ, play]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    play('click');
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <main
      className="portfolio-desktop"
      aria-label="Affan Emirhan Çüçen portföy masaüstü"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
      style={{
        position: 'fixed', inset: 0,
        background: theme.bgGradient,
        overflow: 'hidden', paddingBottom: '48px',
      }}
    >
      {/* Wallpaper */}
      <WallpaperLayer wallpaper={wallpaper} theme={theme} />

      {/* Desktop watermark */}
      <div style={{
        position: 'absolute', bottom: '60px', right: '20px',
        color: 'rgba(255,255,255,0.04)', fontSize: '11px',
        fontFamily: 'monospace', letterSpacing: '0.1em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        AffanOS v1.0 · emrhnccn
      </div>

      {/* Desktop icons */}
      <nav className="desktop-icon-dock" aria-label="Portföy uygulamaları" style={{
        position: 'absolute', top: '20px', left: '20px',
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        {APP_LIST.map(app => (
          <DesktopIcon key={app.id} app={app} onClick={openApp} theme={theme} />
        ))}
      </nav>

      <section className="desktop-intro" aria-labelledby="portfolio-title">
        <div className="desktop-intro__eyebrow" style={{ color: theme.primary }}>
          PORTFOLYO · 2026
        </div>
        <h1 id="portfolio-title">Affan Emirhan Çüçen</h1>
        <p>Full-Stack web geliştirme, Unity oyun programlama ve yapay zekâ entegrasyonları.</p>
        <div className="desktop-intro__actions">
          {['about', 'projects', 'contact'].map(appId => {
            const app = APP_LIST.find(item => item.id === appId);
            return (
              <button key={appId} type="button" onClick={() => openApp(app)}>
                <span aria-hidden="true">{app.icon}</span>
                {appId === 'about' ? 'Hakkımda' : appId === 'projects' ? 'Projeler' : 'İletişim'}
              </button>
            );
          })}
        </div>
      </section>

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          position={win.position}
          size={win.size}
          zIndex={win.zIndex}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        >
          {win.component}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        apps={APP_LIST}
        onOpenApp={openApp}
        onToggleMinimize={toggleMinimize}
        muted={muted}
        onToggleMute={() => { setMuted(m => !m); }}
      />

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x} y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenApp={openApp}
          APP_LIST={APP_LIST}
          theme={theme}
        />
      )}

    </main>
  );
}
