import { useState, useEffect, useRef } from 'react';

export default function StartMenu({ apps, onOpen, onClose }) {
  const [search, setSearch] = useState('');
  const menuRef = useRef(null);
  const filtered = apps.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;
      const focusable = [...(menuRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), a[href]',
      ) || [])];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />

      {/* Menu */}
      <div
        ref={menuRef}
        id="start-menu"
        className="start-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Başlat menüsü"
        style={{
          position: 'fixed', bottom: '56px', left: '8px',
          width: '300px', zIndex: 999,
          background: 'rgba(10, 10, 20, 0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden',
          animation: 'slideUpMenu 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            fontFamily: 'monospace', fontSize: '11px',
            color: '#00F5FF', marginBottom: '12px', opacity: 0.7,
          }}>
            AffanOS v1.0
          </div>
          <input
            type="text"
            aria-label="Uygulama ara"
            placeholder="🔍 Uygulama ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '8px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#e2e8f0',
              fontSize: '13px', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* App list */}
        <div style={{ padding: '8px', maxHeight: '320px', overflowY: 'auto' }}>
          <div style={{ color: '#475569', fontSize: '10px', padding: '4px 8px 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Uygulamalar
          </div>
          {filtered.map(app => (
            <button
              key={app.id}
              onClick={() => { onOpen(app); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '10px 10px',
                background: 'transparent', border: 'none',
                borderRadius: '8px', cursor: 'pointer',
                color: '#e2e8f0', fontSize: '13px', textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>{app.icon}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{app.title}</div>
                <div style={{ color: '#475569', fontSize: '11px' }}>{app.subtitle}</div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ color: '#475569', fontSize: '12px', padding: '12px 10px', textAlign: 'center' }}>
              Uygulama bulunamadı
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: '12px', color: '#475569' }}>
            👤 Misafir
          </div>
          <div style={{ fontSize: '11px', color: '#334155', fontFamily: 'monospace' }}>
            affanos v1.0
          </div>
        </div>
      </div>
    </>
  );
}
