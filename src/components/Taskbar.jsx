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

function useSystemStats() {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(4.2);
  useEffect(() => {
    const t = setInterval(() => {
      setCpu(prev => Math.max(5, Math.min(85, prev + (Math.random() - 0.5) * 12)));
      setRam(prev => Math.max(2.8, Math.min(7.2, prev + (Math.random() - 0.5) * 0.3)));
    }, 2000);
    return () => clearInterval(t);
  }, []);
  return { cpu: Math.round(cpu), ram: ram.toFixed(1) };
}

export default function Taskbar({ windows, apps, onOpenApp, onToggleMinimize, muted, onToggleMute }) {
  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef(null);
  const wasStartOpenRef = useRef(false);
  const time = useClock();
  const { cpu, ram } = useSystemStats();
  const { theme } = useTheme();

  const formatTime = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d) => d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });

  const cpuColor = cpu > 70 ? '#f87171' : cpu > 40 ? '#facc15' : theme.primary;
  const openWindows = windows;

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

      <div
        className="taskbar"
        role="navigation"
        aria-label="AffanOS görev çubuğu"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: '48px', zIndex: 990,
          background: theme.taskbarBg,
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${theme.primary}18`,
          display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: '6px',
          boxShadow: '0 -2px 20px rgba(0,0,0,0.5)',
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
            border: startOpen ? `1px solid ${theme.primary}55` : '1px solid rgba(255,255,255,0.08)',
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

        {/* Open windows */}
        <div className="taskbar-windows" style={{ flex: 1, display: 'flex', gap: '4px', overflow: 'hidden' }}>
          {/* Taskbar window buttons */}
          {openWindows.map(win => (
            <button
              type="button"
              key={win.id}
              onClick={() => onToggleMinimize(win.id)}
              aria-label={`${win.title} penceresini ${win.isMinimized ? 'geri getir' : 'küçült'}`}
              title={win.title}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0 10px', height: '34px', borderRadius: '8px',
                background: win.isMinimized
                  ? 'rgba(255,255,255,0.04)'
                  : `${theme.primary}18`,
                border: win.isMinimized
                  ? '1px solid rgba(255,255,255,0.06)'
                  : `1px solid ${theme.primary}40`,
                color: win.isMinimized ? '#64748b' : '#e2e8f0',
                fontSize: '12px', cursor: 'pointer',
                maxWidth: '160px', overflow: 'hidden',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${theme.primary}22`; }}
              onMouseLeave={e => {
                e.currentTarget.style.background = win.isMinimized ? 'rgba(255,255,255,0.04)' : `${theme.primary}18`;
              }}
            >
              <span style={{ fontSize: '14px' }}>{win.icon}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
              {!win.isMinimized && (
                <div style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: theme.primary, flexShrink: 0,
                  boxShadow: `0 0 4px ${theme.primary}cc`,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* System indicators */}
        <div className="taskbar-system" style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          flexShrink: 0, paddingLeft: '8px',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* CPU */}
          <div className="taskbar-stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              <span style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.05em' }}>CPU</span>
              <span style={{ color: cpuColor, fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>
                {cpu}%
              </span>
            </div>
            <div style={{ width: '48px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${cpu}%`,
                background: cpuColor, borderRadius: '2px',
                transition: 'width 1.5s ease, background 0.5s',
                boxShadow: `0 0 4px ${cpuColor}88`,
              }} />
            </div>
          </div>

          {/* RAM */}
          <div className="taskbar-stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              <span style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.05em' }}>RAM</span>
              <span style={{ color: theme.primary, fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>
                {ram}GB
              </span>
            </div>
            <div style={{ width: '48px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(ram / 8) * 100}%`,
                background: theme.primary, borderRadius: '2px',
                transition: 'width 1.5s ease',
                boxShadow: `0 0 4px ${theme.primary}88`,
              }} />
            </div>
          </div>

          {/* Projects */}
          <div className="taskbar-stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ color: '#475569', fontSize: '9px', letterSpacing: '0.05em' }}>PROJE</span>
            <span style={{ color: theme.secondary, fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>10</span>
          </div>

          {/* Mute button */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            title={muted ? 'Sesi Aç' : 'Sesi Kapat'}
            style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: muted ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)',
              border: muted ? '1px solid rgba(248,113,113,0.3)' : '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = muted ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = muted ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)'}
          >
            {muted ? '🔇' : '🔊'}
          </button>

          {/* Clock */}
          <div
            className="taskbar-clock"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '4px 10px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'default',
            }}
          >
            <span style={{ color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace', fontWeight: 600, lineHeight: 1.2 }}>
              {formatTime(time)}
            </span>
            <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'monospace' }}>
              {formatDate(time)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
