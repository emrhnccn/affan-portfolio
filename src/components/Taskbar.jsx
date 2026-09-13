import { useState, useEffect, useRef } from 'react';
import StartMenu from './StartMenu';
import { useTheme } from '../contexts/ThemeContext';

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Taskbar({ windows, apps, onOpenApp, onToggleMinimize, muted, onToggleMute }) {
  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef(null);
  const wasStartOpenRef = useRef(false);
  const time = useClock();
  const { theme } = useTheme();

  const formatTime = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d) => d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });

  useEffect(() => {
    if (wasStartOpenRef.current && !startOpen) {
      startButtonRef.current?.focus();
    }
    wasStartOpenRef.current = startOpen;
  }, [startOpen]);

  return (
    <>
      {startOpen && (
        <StartMenu
          apps={apps}
          onOpen={onOpenApp}
          onClose={() => setStartOpen(false)}
        />
      )}

      <footer
        className="taskbar"
        role="navigation"
        aria-label="AffanOS görev çubuğu"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: '48px', zIndex: 990,
          background: theme.taskbarBg || 'rgba(6, 6, 14, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${theme.primary}20`,
          display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: '8px',
          boxShadow: '0 -4px 25px rgba(0,0,0,0.6)',
        }}
      >
        {/* Start button */}
        <button
          ref={startButtonRef}
          type="button"
          onClick={() => setStartOpen(o => !o)}
          aria-label="Başlat menüsünü aç"
          aria-expanded={startOpen}
          aria-controls="start-menu"
          title="Başlat"
          style={{
            width: '38px', height: '34px', borderRadius: '8px',
            background: startOpen ? `${theme.primary}33` : 'rgba(255,255,255,0.06)',
            border: startOpen ? `1px solid ${theme.primary}60` : '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s', flexShrink: 0,
          }}
          onMouseEnter={e => { if (!startOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { if (!startOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        >
          🪟
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        {/* Open windows list */}
        <div className="taskbar-windows" style={{ flex: 1, display: 'flex', gap: '4px', overflow: 'hidden' }}>
          {windows.map(win => (
            <button
              type="button"
              key={win.id}
              onClick={() => onToggleMinimize(win.id)}
              aria-label={`${win.title} penceresini ${win.isMinimized ? 'geri getir' : 'küçült'}`}
              title={win.title}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0 12px', height: '34px', borderRadius: '8px',
                background: win.isMinimized
                  ? 'rgba(255,255,255,0.04)'
                  : `${theme.primary}18`,
                border: win.isMinimized
                  ? '1px solid rgba(255,255,255,0.06)'
                  : `1px solid ${theme.primary}45`,
                color: win.isMinimized ? '#64748b' : '#f8fafc',
                fontSize: '12px', cursor: 'pointer',
                maxWidth: '170px', overflow: 'hidden',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${theme.primary}25`; }}
              onMouseLeave={e => {
                e.currentTarget.style.background = win.isMinimized ? 'rgba(255,255,255,0.04)' : `${theme.primary}18`;
              }}
            >
              <span style={{ fontSize: '14px' }} aria-hidden="true">{win.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{win.title}</span>
              {!win.isMinimized && (
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: theme.primary, flexShrink: 0,
                  boxShadow: `0 0 6px ${theme.primary}`,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Authentic System Status Indicators (Replacing Fake Random Math) */}
        <div className="taskbar-system" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          flexShrink: 0, paddingLeft: '8px',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Status: Available for Work */}
          <div className="taskbar-stat" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 8px', borderRadius: '6px',
            background: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
          }} title="İş tekliflerine ve yeni projelere açık">
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#34d399', boxShadow: '0 0 6px #34d399'
            }} />
            <span style={{ color: '#34d399', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>
              AKTİF · İŞE AÇIK
            </span>
          </div>

          {/* Stack Indicator */}
          <div className="taskbar-stat" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 8px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }} title="Teknoloji Mimarisi">
            <span style={{ color: '#64748b', fontSize: '9px', fontFamily: 'monospace' }}>STACK</span>
            <span style={{ color: theme.primary, fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>
              REACT 19
            </span>
          </div>

          {/* Projects Count */}
          <div className="taskbar-stat" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 8px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }} title="Toplam Proje Sayısı">
            <span style={{ color: '#64748b', fontSize: '9px', fontFamily: 'monospace' }}>PROJE</span>
            <span style={{ color: theme.secondary || '#ff00c8', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>
              10
            </span>
          </div>

          {/* Mute toggle button */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            title={muted ? 'Sesi Aç' : 'Sesi Kapat'}
            style={{
              width: '30px', height: '30px', borderRadius: '6px',
              background: muted ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)',
              border: muted ? '1px solid rgba(248,113,113,0.35)' : '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>

          {/* Clock */}
          <div
            className="taskbar-clock"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '3px 8px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'default',
            }}
          >
            <span style={{ color: '#f8fafc', fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 600, lineHeight: 1.2 }}>
              {formatTime(time)}
            </span>
            <span style={{ color: '#94a3b8', fontSize: '9.5px', fontFamily: 'monospace' }}>
              {formatDate(time)}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
