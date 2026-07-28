import { useState, useEffect, useRef } from 'react';

const SKILLS = [
  { label: 'Frontend', abbr: 'FRO', value: 85, color: '#00F5FF' },
  { label: 'Backend', abbr: 'BCK', value: 80, color: '#4ade80' },
  { label: 'Firebase', abbr: 'FBS', value: 90, color: '#facc15' },
  { label: 'Unity / C#', abbr: 'UNT', value: 75, color: '#c084fc' },
  { label: 'UI Design', abbr: 'UDG', value: 70, color: '#fb923c' },
];

const OVR = Math.round(SKILLS.reduce((a, s) => a + s.value, 0) / SKILLS.length);

function FifaCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = -(e.clientY - cy) / (rect.height / 2) * 12;
    const ry = (e.clientX - cx) / (rect.width / 2) * 12;
    setTilt({ x: rx, y: ry });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        perspective: '800px',
        display: 'inline-block',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '220px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #c8a84b 0%, #f5e17a 30%, #d4a843 60%, #b8862a 100%)',
          boxShadow: '0 20px 60px rgba(200,168,75,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`,
          transition: 'transform 0.15s ease-out',
          position: 'relative',
        }}
      >
        {/* Sheen effect */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          pointerEvents: 'none', zIndex: 10,
        }} />

        {/* Card top section */}
        <div style={{
          padding: '14px 14px 6px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px', fontWeight: '900', color: '#1a0a00',
              lineHeight: 1, textShadow: '0 1px 2px rgba(255,255,255,0.3)',
              fontFamily: 'Arial Black, sans-serif',
            }}>
              {OVR}
            </div>
            <div style={{
              fontSize: '11px', fontWeight: '800', color: '#1a0a00',
              letterSpacing: '0.1em', marginTop: '2px',
              fontFamily: 'Arial Black, sans-serif',
            }}>
              DEV
            </div>
            <div style={{ fontSize: '20px', marginTop: '4px' }}>🇹🇷</div>
          </div>

          <div style={{ textAlign: 'right', paddingTop: '4px' }}>
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: '#1a0a00', letterSpacing: '0.05em',
              fontFamily: 'Arial, sans-serif',
            }}>
              FC 25
            </div>
          </div>
        </div>

        {/* Player image area */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '0 20px',
          marginTop: '-4px',
        }}>
          <img
            src="/images/memoji.png"
            alt="Affan"
            style={{
              width: '120px', height: '120px', objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;font-size:60px">👨‍💻</div>';
            }}
          />
        </div>

        {/* Name */}
        <div style={{
          textAlign: 'center',
          padding: '4px 12px 8px',
          fontSize: '15px', fontWeight: '900',
          color: '#1a0a00', letterSpacing: '0.1em',
          fontFamily: 'Arial Black, sans-serif',
          textTransform: 'uppercase',
        }}>
          Affan Emirhan
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.2)', margin: '0 12px' }} />

        {/* Stats grid */}
        <div style={{
          padding: '10px 20px 14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 20px',
        }}>
          {SKILLS.map(skill => (
            <div key={skill.abbr} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '13px', fontWeight: '900', color: '#1a0a00',
                fontFamily: 'Arial Black, sans-serif', minWidth: '26px',
              }}>
                {skill.value}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: '700',
                color: 'rgba(0,0,0,0.55)', letterSpacing: '0.05em',
                fontFamily: 'Arial, sans-serif',
              }}>
                {skill.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBar({ label, value, color, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500 }}>{label}</span>
        <span style={{ color, fontSize: '13px', fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{
        height: '6px', background: 'rgba(255,255,255,0.08)',
        borderRadius: '3px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '3px',
          boxShadow: `0 0 8px ${color}66`,
          transition: 'width 0.8s cubic-bezier(0.34,1.2,0.64,1)',
        }} />
      </div>
    </div>
  );
}

export default function AboutApp() {
  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: 'linear-gradient(135deg, #080810 0%, #0d0d1a 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '100%',
      }}>
        {/* Left: Bio */}
        <div style={{
          padding: '32px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          {/* Header */}
          <div>
            <div style={{ color: '#00F5FF', fontFamily: 'monospace', fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>
              &gt; whoami
            </div>
            <h1 style={{
              fontSize: '26px', fontWeight: '800',
              background: 'linear-gradient(90deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              margin: '0 0 4px',
            }}>
              Affan Emirhan Çüçen
            </h1>
            <div style={{ color: '#00F5FF', fontSize: '13px', fontFamily: 'monospace' }}>
              Full-Stack Dev · Unity · AI Enthusiast
            </div>
          </div>

          {/* Memoji */}
          <div style={{ textAlign: 'center' }}>
            <img
              src="/images/memoji.png"
              alt="Affan"
              style={{
                width: '100px', height: '100px', objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.4))',
              }}
              onError={e => e.target.style.display = 'none'}
            />
          </div>

          {/* Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              Full-Stack web geliştirme, Unity oyun programlama ve teknik SEO alanlarında güçlü pratik deneyime sahip bir yazılım geliştiriciyim.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              Gerçek zamanlı sistemler (Socket.io) ve kompleks veritabanı (MySQL, MongoDB) mimarilerinde ölçeklenebilir uygulamalar tasarlıyorum.
            </p>
            <div style={{
              display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px',
            }}>
              {['React', 'Node.js', 'Unity', 'MongoDB', 'Socket.io', 'LLM API'].map(tag => (
                <span key={tag} style={{
                  padding: '3px 10px', borderRadius: '20px',
                  background: 'rgba(0,245,255,0.08)',
                  border: '1px solid rgba(0,245,255,0.2)',
                  color: '#00F5FF', fontSize: '11px', fontFamily: 'monospace',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          {/* Skills */}
          <div>
            <div style={{ color: '#FF00C8', fontFamily: 'monospace', fontSize: '12px', marginBottom: '16px' }}>
              &gt; cat skills.json
            </div>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.abbr} label={skill.label} value={skill.value} color={skill.color} delay={i * 150} />
            ))}
          </div>

          {/* Education */}
          <div>
            <div style={{ color: '#FF00C8', fontFamily: 'monospace', fontSize: '12px', marginBottom: '12px' }}>
              &gt; cat education.txt
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>Bartın Üniversitesi</div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>Bilgisayar Mühendisliği — 2022 · Devam</div>
              </div>
              <div style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>Fırat Üniversitesi</div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>Bilgisayar Mühendisliği — 2018–2022</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: FIFA Card */}
        <div style={{
          padding: '32px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '24px',
        }}>
          <div style={{ color: '#FF00C8', fontFamily: 'monospace', fontSize: '12px', alignSelf: 'flex-start' }}>
            &gt; cat player_card.json
          </div>
          <FifaCard />
          <div style={{
            padding: '16px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            width: '100%', maxWidth: '260px',
          }}>
            <div style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '11px', marginBottom: '10px' }}>
              // player_stats
            </div>
            {SKILLS.map(s => (
              <div key={s.abbr} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '4px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{s.label}</span>
                <span style={{ color: s.color, fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>{s.value}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '6px 0 0',
              marginTop: '4px',
            }}>
              <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>OVR</span>
              <span style={{
                color: '#facc15', fontSize: '13px', fontWeight: 800,
                fontFamily: 'monospace', textShadow: '0 0 8px rgba(250,204,21,0.5)',
              }}>{OVR}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', width: '100%', maxWidth: '260px' }}>
            <a
              href="https://github.com/emrhnccn"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '10px', borderRadius: '8px',
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.25)',
                color: '#00F5FF', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.08)'; }}
            >
              🐙 GitHub Profilim
            </a>
            <a
              href="https://linkedin.com/in/affanccn"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '10px', borderRadius: '8px',
                background: 'rgba(255,0,200,0.08)',
                border: '1px solid rgba(255,0,200,0.25)',
                color: '#FF00C8', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,200,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,0,200,0.08)'; }}
            >
              💼 LinkedIn Profilim
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
