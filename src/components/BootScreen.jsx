import React, { useState, useEffect, useRef } from 'react';

const BOOT_LINES = [
  { text: 'AffanOS BIOS v2.6.1  (C) 2024 Affan Dev Systems', color: '#00F5FF', bold: true },
  { text: '', color: '#eee' },
  { text: 'CPU  : Full-Stack Developer Core @ 3.9GHz ....... [ OK ]', color: '#e2e8f0' },
  { text: 'RAM  : 8192MB DDR5 ............................... [ OK ]', color: '#e2e8f0' },
  { text: 'GPU  : React Renderer v18.3.1 ................... [ OK ]', color: '#e2e8f0' },
  { text: 'NET  : GitHub API bağlantısı ..................... [ OK ]', color: '#e2e8f0' },
  { text: 'SSD  : /repos → 10 proje algılandı .............. [ OK ]', color: '#e2e8f0' },
  { text: '', color: '#eee' },
  { text: 'Sistem dosyaları yükleniyor...', color: '#FF00C8' },
  { text: '  ▸ react@18.3.1 .................. yüklendi ✓', color: '#4ade80' },
  { text: '  ▸ node_modules .................. yüklendi ✓', color: '#4ade80' },
  { text: '  ▸ socket.io ..................... yüklendi ✓', color: '#4ade80' },
  { text: '  ▸ unity-bridge .................. yüklendi ✓', color: '#4ade80' },
  { text: '  ▸ llm-api-connector ............. yüklendi ✓', color: '#4ade80' },
  { text: '', color: '#eee' },
  { text: 'DeveloperOS v1.0 başlatılıyor...', color: '#FF00C8' },
  { text: 'Kullanıcı ortamı hazırlanıyor...', color: '#FF00C8' },
  { text: 'Masaüstü arayüzü yükleniyor...', color: '#FF00C8' },
  { text: '', color: '#eee' },
  { text: '■ Tüm sistemler hazır. Hoş geldin, Misafir.', color: '#00F5FF', bold: true },
];

const STEP_DELAY = 160;

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('boot'); // 'boot' | 'welcome' | 'fadeout'
  const bottomRef = useRef(null);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), STEP_DELAY);
      return () => clearTimeout(t);
    } else if (phase === 'boot') {
      setPhase('progress');
    }
  }, [visibleLines, phase]);

  useEffect(() => {
    if (phase !== 'progress') return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('welcome'), 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'welcome') {
      setTimeout(() => setPhase('fadeout'), 1800);
    }
    if (phase === 'fadeout') {
      setTimeout(onComplete, 700);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLines]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: '#000',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.7s ease',
      }}
    >
      {phase === 'welcome' || phase === 'fadeout' ? (
        /* Welcome screen */
        <div className="text-center animate-pulse-once">
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#00F5FF',
              textShadow: '0 0 20px rgba(0,245,255,0.8)',
              letterSpacing: '0.05em',
              marginBottom: '24px',
            }}
          >
            AffanOS v1.0
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 30px rgba(255,255,255,0.5)',
              marginBottom: '8px',
            }}
          >
            Hoş geldin, Misafir
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#FF00C8',
              textShadow: '0 0 10px rgba(255,0,200,0.6)',
            }}
          >
            Masaüstü yükleniyor...
          </div>
        </div>
      ) : (
        /* Boot terminal */
        <div
          style={{
            width: '100%',
            maxWidth: '720px',
            padding: '32px',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '13px',
            lineHeight: '1.8',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              style={{
                color: line.color,
                fontWeight: line.bold ? 'bold' : 'normal',
                textShadow: line.bold ? `0 0 10px ${line.color}` : 'none',
                opacity: 1,
                animation: 'bootLineIn 0.1s ease forwards',
              }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}

          {/* Progress bar shown after all lines */}
          {phase === 'progress' && (
            <div style={{ marginTop: '24px' }}>
              <div
                style={{
                  color: '#00F5FF',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}
              >
                Sistem başlatılıyor... {progress}%
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00F5FF, #FF00C8)',
                    borderRadius: '3px',
                    boxShadow: '0 0 10px rgba(0,245,255,0.6)',
                    transition: 'width 0.03s linear',
                  }}
                />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
