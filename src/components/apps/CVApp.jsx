import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, CheckCircle, Loader } from 'lucide-react';

const BOOT_LOGS = [
  'CV.exe başlatılıyor...',
  'Kimlik doğrulama... OK',
  'Şifreleme katmanı yükleniyor... OK',
  'Belge motoru başlatılıyor... OK',
  'PDF renderer hazır... OK',
  'İçerik yükleniyor... OK',
  '✓ Hazır.',
];

export default function CVApp() {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'content'
  const [logLines, setLogLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lineIndex = 0;
    const addLine = () => {
      if (lineIndex < BOOT_LOGS.length) {
        setLogLines(prev => [...prev, BOOT_LOGS[lineIndex]]);
        setProgress(Math.round(((lineIndex + 1) / BOOT_LOGS.length) * 100));
        lineIndex++;
        setTimeout(addLine, 350);
      } else {
        setTimeout(() => setPhase('content'), 600);
      }
    };
    setTimeout(addLine, 300);
  }, []);

  if (phase === 'boot') {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#050508', padding: '40px',
      }}>
        <FileText size={48} color="#00F5FF" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 12px rgba(0,245,255,0.6))' }} />
        <div style={{ width: '100%', maxWidth: '380px', marginBottom: '24px' }}>
          {logLines.map((line, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: i === logLines.length - 1 ? '#00F5FF' : '#4ade80',
              fontSize: '13px', fontFamily: 'monospace',
              marginBottom: '6px',
              opacity: 1,
            }}>
              {i === logLines.length - 1 && line !== '✓ Hazır.'
                ? <Loader size={12} style={{ animation: 'spin 1s linear infinite' }} />
                : <CheckCircle size={12} />}
              {line}
            </div>
          ))}
        </div>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            color: '#64748b', fontSize: '12px', fontFamily: 'monospace',
            marginBottom: '8px',
          }}>
            <span>CV.exe</span>
            <span>{progress}%</span>
          </div>
          <div style={{
            height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00F5FF, #FF00C8)',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 8px rgba(0,245,255,0.5)',
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace' }}>
          <FileText size={14} color="#00F5FF" />
          affanCV11.pdf — Hazır
        </div>
        <a
          href="/affanCV11.pdf"
          target="_blank" rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '6px',
            background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)',
            color: '#00F5FF', fontSize: '12px', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,245,255,0.1)'}
        >
          <ExternalLink size={13} /> Tam Ekran Aç
        </a>
      </div>

      {/* PDF Viewer */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#1a1a2e' }}>
        <iframe
          src="/affanCV11.pdf#toolbar=1&navpanes=0"
          title="Affan CV"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
}
