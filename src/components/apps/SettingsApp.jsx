import { useTheme, THEMES, WALLPAPERS, SPEEDS } from '../../contexts/ThemeContext';

function WallpaperPreview({ id, primary }) {
  const style = {
    width: '100%', height: '50px', borderRadius: '6px',
    overflow: 'hidden', position: 'relative',
    background: '#060610',
  };

  const overlayStyle = {
    position: 'absolute', inset: 0,
  };

  if (id === 'grid') {
    return (
      <div style={style}>
        <div style={{
          ...overlayStyle,
          backgroundImage: `linear-gradient(${primary}22 1px, transparent 1px), linear-gradient(90deg, ${primary}22 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
        }} />
      </div>
    );
  }
  if (id === 'dots') {
    return (
      <div style={style}>
        <div style={{
          ...overlayStyle,
          backgroundImage: `radial-gradient(circle, ${primary}44 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }} />
      </div>
    );
  }
  if (id === 'circuit') {
    return (
      <div style={style}>
        <div style={{
          ...overlayStyle,
          backgroundImage: `
            linear-gradient(${primary}33 1px, transparent 1px),
            linear-gradient(90deg, ${primary}33 1px, transparent 1px),
            linear-gradient(${primary}15 1px, transparent 1px),
            linear-gradient(90deg, ${primary}15 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 5px 5px, 5px 5px',
        }} />
      </div>
    );
  }
  if (id === 'gradient') {
    return (
      <div style={{
        ...style,
        background: `radial-gradient(ellipse at center, ${primary}22 0%, transparent 70%), #060610`,
      }} />
    );
  }
  if (id === 'stars') {
    return (
      <div style={style}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '2px' : '1px',
            height: i % 3 === 0 ? '2px' : '1px',
            background: primary,
            borderRadius: '50%',
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 10) % 85}%`,
            boxShadow: `0 0 ${i % 3 === 0 ? 4 : 2}px ${primary}`,
            opacity: 0.6 + (i % 4) * 0.1,
          }} />
        ))}
      </div>
    );
  }
  return <div style={style} />;
}

export default function SettingsApp() {
  const { theme, themeName, setThemeName, wallpaper, setWallpaper, speedKey, setSpeedKey } = useTheme();

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: 'linear-gradient(135deg, #080812 0%, #0c0c1a 100%)',
      padding: '0',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: `1px solid ${theme.primary}22`,
        background: `linear-gradient(90deg, ${theme.primary}08, transparent)`,
      }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: theme.primary, marginBottom: '4px', opacity: 0.8 }}>
          &gt; system/preferences
        </div>
        <h1 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: 0 }}>
          ⚙️ Sistem Ayarları
        </h1>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* ── Tema ──────────────────────────────────────── */}
        <section>
          <h2 style={{ color: theme.primary, fontFamily: 'monospace', fontSize: '12px', margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🎨 Renk Teması
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {Object.entries(THEMES).map(([key, t]) => {
              const isActive = themeName === key;
              return (
                <button
                  key={key}
                  onClick={() => setThemeName(key)}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '10px',
                    border: `2px solid ${isActive ? t.primary : 'rgba(255,255,255,0.08)'}`,
                    background: isActive ? `${t.primary}15` : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? `0 0 20px ${t.primary}33` : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = `${t.primary}55`; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{t.emoji}</div>
                  <div style={{ color: isActive ? t.primary : '#94a3b8', fontSize: '13px', fontWeight: isActive ? 700 : 400 }}>
                    {t.name}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '8px' }}>
                    <div style={{ width: '18px', height: '6px', borderRadius: '3px', background: t.primary }} />
                    <div style={{ width: '18px', height: '6px', borderRadius: '3px', background: t.secondary }} />
                    <div style={{ width: '18px', height: '6px', borderRadius: '3px', background: t.accent }} />
                  </div>
                  {isActive && (
                    <div style={{ color: t.primary, fontSize: '10px', marginTop: '6px', fontFamily: 'monospace' }}>
                      ● Aktif
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Duvar Kağıdı ─────────────────────────────── */}
        <section>
          <h2 style={{ color: theme.primary, fontFamily: 'monospace', fontSize: '12px', margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🖼️ Masaüstü Arkaplanı
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {WALLPAPERS.map(wp => {
              const isActive = wallpaper === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  style={{
                    padding: '0', borderRadius: '8px', overflow: 'hidden',
                    border: `2px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'pointer', background: 'transparent',
                    boxShadow: isActive ? `0 0 14px ${theme.primary}44` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <WallpaperPreview id={wp.id} primary={theme.primary} />
                  <div style={{
                    padding: '4px 0',
                    color: isActive ? theme.primary : '#64748b',
                    fontSize: '10px', fontWeight: isActive ? 700 : 400,
                    background: 'rgba(0,0,0,0.4)',
                  }}>
                    {wp.name}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Animasyon Hızı ────────────────────────────── */}
        <section>
          <h2 style={{ color: theme.primary, fontFamily: 'monospace', fontSize: '12px', margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ⚡ Animasyon Hızı
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {Object.entries(SPEEDS).map(([key, s]) => {
              const isActive = speedKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSpeedKey(key)}
                  style={{
                    flex: 1, padding: '12px 8px', borderRadius: '8px',
                    border: `1px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                    background: isActive ? `${theme.primary}12` : 'rgba(255,255,255,0.03)',
                    color: isActive ? theme.primary : '#64748b',
                    fontSize: '13px', fontWeight: isActive ? 700 : 400,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {key === 'slow' ? '🐢' : key === 'normal' ? '🏃' : '⚡'} {s.name}
                  <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px', fontFamily: 'monospace' }}>
                    {s.ms}ms
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Sistem Bilgisi ────────────────────────────── */}
        <section>
          <h2 style={{ color: theme.primary, fontFamily: 'monospace', fontSize: '12px', margin: '0 0 14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ℹ️ Sistem Bilgisi
          </h2>
          <div style={{
            padding: '14px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
          }}>
            {[
              ['İşletim Sistemi', 'AffanOS v1.0'],
              ['Kernel', 'React 18.3.1'],
              ['Geliştirici', 'Affan Emirhan Çüçen'],
              ['Build Tarihi', '2024'],
              ['Tema Motoru', 'CSS-in-JS'],
              ['Ses Sistemi', 'Web Audio API'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: '#475569', fontSize: '11px' }}>{k}</div>
                <div style={{ color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace' }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
