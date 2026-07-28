import { FileText, ExternalLink } from 'lucide-react';

export default function CVApp() {
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
