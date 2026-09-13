import { useState, useId } from 'react';
import { useTheme, THEMES, WALLPAPERS, SPEEDS, FONTS, GLASS_EFFECTS } from '../../contexts/ThemeContext';
import { useSounds } from '../../hooks/useSounds';
import {
  Palette,
  Type,
  Zap,
  Volume2,
  HardDrive,
  Check,
  RotateCcw,
  Sparkles,
  Monitor,
  Sliders,
  Tv,
  Eye,
  Activity,
  Cpu,
} from 'lucide-react';

// ── Miniature Wallpaper Preview Component ─────────────────────────────────────
function WallpaperPreview({ id, primary }) {
  const baseStyle = {
    width: '100%',
    height: '46px',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
    background: '#060610',
  };

  if (id === 'grid') {
    return (
      <div style={baseStyle}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${primary}28 1px, transparent 1px), linear-gradient(90deg, ${primary}28 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
        }} />
      </div>
    );
  }
  if (id === 'dots') {
    return (
      <div style={baseStyle}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${primary}55 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }} />
      </div>
    );
  }
  if (id === 'circuit') {
    return (
      <div style={baseStyle}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(${primary}44 1px, transparent 1px),
            linear-gradient(90deg, ${primary}44 1px, transparent 1px),
            linear-gradient(${primary}18 1px, transparent 1px),
            linear-gradient(90deg, ${primary}18 1px, transparent 1px)
          `,
          backgroundSize: '18px 18px, 18px 18px, 6px 6px, 6px 6px',
        }} />
      </div>
    );
  }
  if (id === 'gradient') {
    return (
      <div style={{
        ...baseStyle,
        background: `radial-gradient(ellipse at center, ${primary}33 0%, transparent 70%), #060610`,
      }} />
    );
  }
  if (id === 'stars') {
    return (
      <div style={baseStyle}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? '2px' : '1px',
            height: i % 3 === 0 ? '2px' : '1px',
            background: primary,
            borderRadius: '50%',
            left: `${(i * 19 + 7) % 92}%`,
            top: `${(i * 27 + 11) % 82}%`,
            boxShadow: `0 0 ${i % 3 === 0 ? 4 : 2}px ${primary}`,
            opacity: 0.7 + (i % 3) * 0.15,
          }} />
        ))}
      </div>
    );
  }
  return <div style={baseStyle} />;
}

// ── Main Settings Application ─────────────────────────────────────────────────
export default function SettingsApp() {
  const {
    theme,
    themeName,
    setThemeName,
    wallpaper,
    setWallpaper,
    speedKey,
    setSpeedKey,
    fontKey,
    setFontKey,
    glassKey,
    setGlassKey,
    crtEffect,
    setCrtEffect,
    resetDefaults,
  } = useTheme();

  const { play } = useSounds(false);
  const [activeTab, setActiveTab] = useState('appearance');
  const [soundFeedback, setSoundFeedback] = useState(null);
  const [resetToast, setResetToast] = useState(false);
  const crtSwitchId = useId();

  const handleTestSound = (soundId, label) => {
    play(soundId);
    setSoundFeedback(label);
    setTimeout(() => setSoundFeedback(null), 1200);
  };

  const handleResetAll = () => {
    resetDefaults();
    play('success');
    setResetToast(true);
    setTimeout(() => setResetToast(false), 3000);
  };

  const TABS = [
    { id: 'appearance', label: 'Görünüm',   icon: Palette },
    { id: 'typography', label: 'Tipografi', icon: Type },
    { id: 'motion',     label: 'Animasyon', icon: Zap },
    { id: 'audio',      label: 'Ses Motoru',icon: Volume2 },
    { id: 'system',     label: 'Sistem',    icon: HardDrive },
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #070712 0%, #0b0c1b 100%)',
      color: '#e2e8f0',
      overflow: 'hidden',
    }}>
      {/* ── App Header ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: `1px solid ${theme.primary}22`,
        background: `linear-gradient(90deg, ${theme.primary}0a 0%, transparent 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: theme.primary,
            opacity: 0.85,
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '3px',
          }}>
            <Sliders size={12} />
            <span>&gt; system/preferences/control_center</span>
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            Sistem Ayarları & Kişiselleştirme
          </h1>
        </div>

        <div style={{
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: theme.primary,
        }}>
          AffanOS v1.0
        </div>
      </div>

      {/* ── Navigation Tabs ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Ayar kategorileri"
        style={{
          display: 'flex',
          gap: '4px',
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
          overflowX: 'auto',
        }}
      >
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                play('click');
                setActiveTab(tab.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isActive ? `${theme.primary}55` : 'transparent',
                background: isActive ? `${theme.primary}18` : 'transparent',
                color: isActive ? theme.primary : '#94a3b8',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Tab Content Area ────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: GÖRÜNÜM (APPEARANCE)                                          */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'appearance' && (
          <>
            {/* Color Themes */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h2 style={{
                  color: theme.primary,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  margin: 0,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <Palette size={14} />
                  <span>Renk Temaları</span>
                </h2>
                <span style={{ fontSize: '11px', color: '#64748b' }}>4 Küratörlü Palet</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
              }}>
                {Object.entries(THEMES).map(([key, t]) => {
                  const isActive = themeName === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        play('click');
                        setThemeName(key);
                      }}
                      style={{
                        padding: '14px 10px',
                        borderRadius: '10px',
                        border: `2px solid ${isActive ? t.primary : 'rgba(255,255,255,0.08)'}`,
                        background: isActive ? `${t.primary}15` : 'rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isActive ? `0 0 20px ${t.primary}33` : 'none',
                        position: 'relative',
                      }}
                    >
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: t.primary,
                          color: '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                      <div style={{ fontSize: '24px', marginBottom: '6px' }}>{t.emoji}</div>
                      <div style={{
                        color: isActive ? t.primary : '#e2e8f0',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        marginBottom: '8px',
                      }}>
                        {t.name}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <div style={{ width: '16px', height: '6px', borderRadius: '3px', background: t.primary }} title="Primary" />
                        <div style={{ width: '16px', height: '6px', borderRadius: '3px', background: t.secondary }} title="Secondary" />
                        <div style={{ width: '16px', height: '6px', borderRadius: '3px', background: t.accent }} title="Accent" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Desktop Wallpaper */}
            <section>
              <h2 style={{
                color: theme.primary,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '0 0 12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Monitor size={14} />
                <span>Masaüstü Arkaplanı</span>
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '8px',
              }}>
                {WALLPAPERS.map(wp => {
                  const isActive = wallpaper === wp.id;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => {
                        play('click');
                        setWallpaper(wp.id);
                      }}
                      style={{
                        padding: '0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: `2px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                        cursor: 'pointer',
                        background: 'transparent',
                        boxShadow: isActive ? `0 0 14px ${theme.primary}44` : 'none',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <WallpaperPreview id={wp.id} primary={theme.primary} />
                      <div style={{
                        padding: '5px 4px',
                        color: isActive ? theme.primary : '#94a3b8',
                        fontSize: '11px',
                        fontWeight: isActive ? 700 : 500,
                        background: 'rgba(0,0,0,0.5)',
                        textAlign: 'center',
                        width: '100%',
                      }}>
                        {wp.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Glassmorphism / Frosted Blur Level */}
            <section>
              <h2 style={{
                color: theme.primary,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '0 0 12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Sparkles size={14} />
                <span>Buzlu Cam (Glassmorphism) Düzeyi</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {Object.entries(GLASS_EFFECTS).map(([key, g]) => {
                  const isActive = glassKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        play('click');
                        setGlassKey(key);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: `1px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                        background: isActive ? `${theme.primary}15` : 'rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{
                        color: isActive ? theme.primary : '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <span>{g.name}</span>
                        {isActive && <Check size={14} color={theme.primary} />}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>
                        Bulanıklık: <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{g.blur}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Retro CRT Scanline Filter Toggle */}
            <section style={{
              padding: '14px 16px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: crtEffect ? `${theme.primary}22` : 'rgba(255,255,255,0.05)',
                  color: crtEffect ? theme.primary : '#64748b',
                }}>
                  <Tv size={20} />
                </div>
                <div>
                  <label htmlFor={crtSwitchId} style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, display: 'block', cursor: 'pointer' }}>
                    Retro CRT & Scanline Filtresi
                  </label>
                  <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>
                    Nostaljik katot ışınlı tüp (CRT) monitör tarama çizgileri ve fosfor ışıması simülasyonu
                  </div>
                </div>
              </div>

              <button
                id={crtSwitchId}
                role="switch"
                aria-checked={crtEffect}
                onClick={() => {
                  play('click');
                  setCrtEffect(v => !v);
                }}
                style={{
                  width: '46px',
                  height: '24px',
                  borderRadius: '12px',
                  background: crtEffect ? theme.primary : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: crtEffect ? '25px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#060610',
                  transition: 'left 0.2s',
                }} />
              </button>
            </section>
          </>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: TİPOGRAFİ (TYPOGRAPHY)                                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'typography' && (
          <>
            <section>
              <h2 style={{
                color: theme.primary,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '0 0 12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Type size={14} />
                <span>Tipografi Motoru & Yazı Tipi</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(FONTS).map(([key, f]) => {
                  const isActive = fontKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        play('click');
                        setFontKey(key);
                      }}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: `1.5px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                        background: isActive ? `${theme.primary}12` : 'rgba(255,255,255,0.025)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{
                          color: isActive ? theme.primary : '#ffffff',
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: f.css,
                        }}>
                          {f.name}
                        </div>
                        <div style={{
                          color: '#64748b',
                          fontSize: '11px',
                          marginTop: '4px',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          CSS: {f.css.split(',')[0]}
                        </div>
                      </div>
                      {isActive && (
                        <div style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: `${theme.primary}25`,
                          color: theme.primary,
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                        }}>
                          AKTİF
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Live Font Interactive Sandbox */}
            <section style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                color: '#64748b',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Eye size={12} />
                <span>Canlı Tipografi Test Alanı</span>
              </div>

              <div style={{
                fontSize: '16px',
                color: '#ffffff',
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: '8px',
              }}>
                Affan Emirhan Çüçen — Bilgisayar Mühendisi & Full-Stack Geliştirici
              </div>

              <div style={{
                fontSize: '13px',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '12px',
              }}>
                Türkçe Karakter Desteği: Çç, Ğğ, İı, Öö, Şş, Üü. 0123456789 (ABCXYZ)
              </div>

              <div style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: theme.primary,
              }}>
                const dev = &#123; status: &quot;YENİ FIRSATLARA AÇIK&quot;, stack: [&quot;React 19&quot;, &quot;Node.js&quot;, &quot;Unity&quot;] &#125;;
              </div>
            </section>
          </>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: ANİMASYON (MOTION & SPEED)                                    */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'motion' && (
          <>
            <section>
              <h2 style={{
                color: theme.primary,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '0 0 12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Zap size={14} />
                <span>Pencere & Geçiş Animasyon Hızı</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                {Object.entries(SPEEDS).map(([key, s]) => {
                  const isActive = speedKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        play('click');
                        setSpeedKey(key);
                      }}
                      style={{
                        padding: '14px 10px',
                        borderRadius: '10px',
                        border: `1.5px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                        background: isActive ? `${theme.primary}15` : 'rgba(255,255,255,0.03)',
                        color: isActive ? theme.primary : '#94a3b8',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                        {key === 'instant' ? '⚡' : key === 'fast' ? '🏃' : key === 'normal' ? '⏱️' : '🐢'}
                      </div>
                      <div style={{ color: isActive ? theme.primary : '#ffffff', fontWeight: 600 }}>
                        {s.name}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        opacity: 0.7,
                        marginTop: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {s.ms} ms
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section style={{
              padding: '14px 16px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                ♿ Erişilebilirlik & Hareketi Azalt (prefers-reduced-motion)
              </div>
              <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
                AffanOS, işletim sistemi düzeyinde &ldquo;Hareketi Azalt&rdquo; tercihi yapan kullanıcılar için CSS
                animasyonlarını ve geçişlerini otomatik olarak sıfıra indirger.
              </p>
            </section>
          </>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: SES MOTORU (WEB AUDIO FX)                                     */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'audio' && (
          <>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h2 style={{
                  color: theme.primary,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  margin: 0,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <Volume2 size={14} />
                  <span>Web Audio API Ses Sentezleyici Paneli</span>
                </h2>
                {soundFeedback && (
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: theme.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Activity size={12} className="spin" />
                    Çalınıyor: {soundFeedback}
                  </span>
                )}
              </div>

              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                fontSize: '12px',
                color: '#94a3b8',
                lineHeight: 1.5,
                marginBottom: '16px',
              }}>
                AffanOS, harici ses dosyaları (.mp3/.wav) indirmeden tarayıcının <strong style={{ color: '#38bdf8' }}>Web Audio API</strong> osilatörleri
                üzerinden matematiksel sinüs ve kare dalgalarla anlık ses sentezler. Sıfır ağ yükü, sıfır gecikme.
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '10px',
              }}>
                {[
                  { id: 'startup',     name: 'Sistem Açılışı',  desc: 'Polifonik 4 ton akoru', icon: '🚀' },
                  { id: 'windowOpen',  name: 'Pencere Açılışı', desc: '440-660Hz sinüs sweep',  icon: '🪟' },
                  { id: 'windowClose', name: 'Pencere Kapanış', desc: '660-330Hz iniş tonu',    icon: '📉' },
                  { id: 'click',       name: 'Fare Tıklaması',  desc: '1200Hz mikro klik',      icon: '🖱️' },
                  { id: 'notification',name: 'Bildirim / Çan',  desc: '880-1100Hz ikili ton',   icon: '🔔' },
                  { id: 'success',     name: 'Başarı / Onay',   desc: 'Üçlü yükselen arpej',    icon: '✅' },
                  { id: 'error',       name: 'Hata / İkaz',     desc: 'Testere dişi uyarı',     icon: '⚠️' },
                  { id: 'navigate',    name: 'Navigasyon',      desc: '800Hz geçiş tonu',       icon: '🧭' },
                ].map(snd => (
                  <button
                    key={snd.id}
                    onClick={() => handleTestSound(snd.id, snd.name)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${theme.primary}55`;
                      e.currentTarget.style.background = `${theme.primary}10`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '18px' }}>{snd.icon}</span>
                      <Volume2 size={13} color={theme.primary} />
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600 }}>
                      {snd.name}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      {snd.desc}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 5: SİSTEM & SIFIRLA (DIAGNOSTICS & RESET)                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'system' && (
          <>
            <section>
              <h2 style={{
                color: theme.primary,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '0 0 12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Cpu size={14} />
                <span>Sistem Teşhisi & Ortam Özellikleri</span>
              </h2>

              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
              }}>
                {[
                  ['İşletim Sistemi', 'AffanOS v1.0'],
                  ['Çekirdek (Kernel)', 'React 19.2.5 SPA'],
                  ['Geliştirici', 'Affan Emirhan Çüçen'],
                  ['Durum', 'YENİ FIRSATLARA AÇIK'],
                  ['Ekran Çözünürlüğü', `${window.innerWidth} × ${window.innerHeight} px`],
                  ['Piksel Yoğunluğu (DPR)', `${window.devicePixelRatio || 1}x`],
                  ['Pencere Olayları', 'W3C Pointer Events'],
                  ['Ses Altyapısı', 'Web Audio Synthesizer (0 KB)'],
                  ['Tasarım Belirteçleri', 'Tailwind 4 + Vanilla Tokens'],
                  ['Build Hedefi', 'Production (Vite 8)'],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>{k}</div>
                    <div style={{
                      color: k === 'Durum' ? '#34d399' : '#e2e8f0',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Storage & Factory Reset */}
            <section style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div>
                <div style={{ color: '#f87171', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RotateCcw size={14} />
                  <span>Fabrika Ayarlarına Döndür</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px', lineHeight: 1.5 }}>
                  Tüm özel tema seçimleri, arkaplan, tipografi, animasyon hızı ve cam efektleri varsayılan değerlere döndürülür ve tarayıcı yerel depolaması temizlenir.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleResetAll}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#f87171',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                >
                  <RotateCcw size={13} />
                  <span>Varsayılanlara Sıfırla</span>
                </button>

                {resetToast && (
                  <span style={{ color: '#34d399', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Ayarlar sıfırlandı!
                  </span>
                )}
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
