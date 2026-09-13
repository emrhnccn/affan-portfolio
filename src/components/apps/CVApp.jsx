import { useState } from 'react';
import { FileText, Download, ExternalLink, GraduationCap, Code } from 'lucide-react';

export default function CVApp() {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'summary'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0a14' }}>
      {/* CV Toolbar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '10px',
      }}>
        {/* Left info & View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '12.5px', fontWeight: 600 }}>
            <FileText size={16} color="#00F5FF" />
            <span>Affan Emirhan Çüçen — CV.pdf</span>
          </div>

          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '6px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              style={{
                padding: '4px 10px', borderRadius: '4px',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'pdf' ? 'rgba(0,245,255,0.2)' : 'transparent',
                color: activeTab === 'pdf' ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600,
              }}
            >
              PDF Önizleme
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              style={{
                padding: '4px 10px', borderRadius: '4px',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'summary' ? 'rgba(0,245,255,0.2)' : 'transparent',
                color: activeTab === 'summary' ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600,
              }}
            >
              Hızlı Özet
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Direct Download Button */}
          <a
            href="/affanCV11.pdf"
            download="Affan_Emirhan_Cucen_CV.pdf"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.35)',
              color: '#34d399', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <Download size={14} /> PDF İndir
          </a>

          {/* Open Fullscreen Tab */}
          <a
            href="/affanCV11.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '6px',
              background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
              color: '#00F5FF', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <ExternalLink size={14} /> Tam Ekran
          </a>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'pdf' ? (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0e0e18' }}>
          <iframe
            src="/affanCV11.pdf#toolbar=1&navpanes=0"
            title="Affan Emirhan Çüçen CV"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      ) : (
        /* Fast HTML Resume Summary View (ideal for mobile / iframe blockers) */
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', color: '#e2e8f0', maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
              Affan Emirhan Çüçen
            </h2>
            <div style={{ color: '#00F5FF', fontSize: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
              Bilgisayar Mühendisi · Full-Stack & Oyun Geliştirici
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
              📍 İstanbul / Türkiye · ✉️ emrhn.ccn@gmail.com · 🔗 linkedin.com/in/affanccn
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00F5FF', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
              <GraduationCap size={16} />
              <span>EĞİTİM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '13.5px' }}>Bartın Üniversitesi — Bilgisayar Mühendisliği (Lisans)</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>2022 – Devam Ediyor</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '13.5px' }}>Fırat Üniversitesi — Bilgisayar Mühendisliği</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>2018 – 2022</div>
              </div>
            </div>
          </div>

          {/* Skills Highlights */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF00C8', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
              <Code size={16} />
              <span>TEKNİK YETKİNLİKLER</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#00F5FF', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Frontend</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>React 19, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5/CSS3</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#34d399', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Backend & Real-Time</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>Node.js, Express, Socket.io (WebSocket), RESTful API Mimarisi</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#facc15', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Veritabanları</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>MySQL (İlişkisel Modelleme, 3NF), MongoDB</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#c084fc', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Oyun & Diğer</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>Unity 3D/2D, C#, Rigidbody Fizik, LLM API, Teknik SEO</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <a
              href="/affanCV11.pdf"
              download="Affan_Emirhan_Cucen_CV.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '8px',
                background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.35)',
                color: '#00F5FF', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Download size={16} /> Tam PDF Özgeçmişi İndir
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
