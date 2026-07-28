import { useState } from 'react';
import { ExternalLink, Folder, ArrowLeft, Code, MessageSquare, Database, Gamepad2, Monitor, Cpu, LayoutDashboard, Globe } from 'lucide-react';

const PROJECTS = [
  {
    id: 1, name: 'real-time-chat', title: 'Gerçek Zamanlı Mesajlaşma',
    desc: 'Node.js ve Socket.io ile inşa edilmiş anlık mesajlaşma uygulaması. Kullanıcılar oda bazlı sohbet edebilir, mesaj geçmişi MongoDB\'de saklanır.',
    longDesc: 'Kullanıcılar arası iletişim için Node.js ve Socket.io kullanarak geliştirdiğim düşük gecikmeli mesajlaşma altyapısıdır. MongoDB ile sohbet geçmişini modelledim. Projeyi Ngrok ve Vercel ile canlı ortama taşıyıp responsive bir arayüz entegre ettim.',
    tags: ['Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    icon: MessageSquare, iconColor: '#00F5FF', image: '/images/proje1.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
  },
  {
    id: 2, name: 'restaurant-system', title: 'Restoran Rezervasyon Sistemi',
    desc: 'React + Node.js tabanlı kapasite ve masa yönetim sistemi. Müşteriler anlık boş masaları görebilir, yönetici paneli doluluk analizleri sunar.',
    longDesc: 'Restoranlar için özel olarak geliştirilmiş kapasite yönetim sistemidir. Dinamik masa durumu ve rezervasyon takibini içerir. Yönetici panelinde rezervasyon ve doluluk analizleri sunan güvenli bir yapı tasarladım.',
    tags: ['React', 'Node.js', 'Express', 'Algoritmik Planlama'],
    icon: LayoutDashboard, iconColor: '#FF00C8', image: '/images/proje2.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
    liveDemo: 'https://salaascaferestaurant.com.tr',
  },
  {
    id: 3, name: 'kyk-automation', title: 'KYK Yurt Otomasyonu',
    desc: 'MySQL üzerine kurulu yurt yönetim sistemi. Öğrenci kayıt, oda atama, yemekhane hakkı ve kapasite takibini algoritmik olarak yönetir.',
    longDesc: 'Sistem mimarisini tamamen kendim tasarladığım bir otomasyon sistemidir. MySQL kullanarak öğrenci, oda ve kapasite bilgilerini yöneten kompleks ilişkisel veritabanı oluşturdum. Yemekhane hakları ve oda doluluk oranlarını algoritmik olarak takip eder.',
    tags: ['Node.js', 'MySQL', 'RDBMS', 'API Geliştirme'],
    icon: Database, iconColor: '#00F5FF', image: '/images/proje3.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
  },
  {
    id: 4, name: 'coop-puzzle', title: '3D Co-op Bulmaca Oyunu',
    desc: 'Unity 3D ile geliştirilmiş iki oyunculu co-op bulmaca oyunu. Rigidbody fiziği, Raycast etkileşimleri ve karakter senkronizasyonu içerir.',
    longDesc: 'İki oyuncunun eşzamanlı etkileşimine dayalı 3D bulmaca mekanikleri içeren Unity oyunumdur. Karakterler arası veri senkronizasyonu sağlandı. Clean Code prensipleriyle bellek optimizasyonu yapıldı.',
    tags: ['Unity 3D', 'C#', 'Level Design', 'Fizik Motoru'],
    icon: Gamepad2, iconColor: '#FF00C8', image: '/images/proje4.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
  },
  {
    id: 5, name: 'match3-game', title: 'Kampüs Temalı Match-3',
    desc: 'Üniversite bitirme projesi. Blender ile modellenen kampüs binaları Unity\'ye entegre edilmiş, C# ile Match-3 algoritmaları yazılmıştır.',
    longDesc: 'Üniversite bitirme projem olarak hazırladığım Kampüs temalı Match-3 oyunu. Blender ile kampüs binalarını modelleyip Unity\'ye dinamik level haritası olarak entegre ettim. API üzerinden Leaderboard kurdum.',
    tags: ['Unity', 'C#', 'Blender', 'Backend API'],
    icon: Monitor, iconColor: '#00F5FF', image: '/images/proje5.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
  },
  {
    id: 6, name: 'ai-automation', title: 'AI & Veri Otomasyonları',
    desc: 'LLM API entegrasyonu ile dinamik içerik üreten ve Web Scraping botlarıyla veri toplayan Ar-Ge projeleri.',
    longDesc: 'LLM (Yapay Zeka API\'leri) entegrasyonuyla dinamik içerik üreten sistemler ve Web Scraping ile internetten veri toplayan botlar tasarladım. Tekrarlayan görevleri otomatize ederek süreçleri hızlandırır.',
    tags: ['LLM API', 'Node.js', 'Web Scraping', 'Otomasyon'],
    icon: Cpu, iconColor: '#FF00C8', image: '/images/proje6.webp',
    github: null,
    repoStatus: 'Depo bağlantısı henüz paylaşılmadı',
  },
  {
    id: 7, name: 'pendikcekici', title: 'Pendik Çekici Hizmetleri',
    desc: 'İstanbul Pendik bölgesine özel çekici ve yol yardım hizmeti sunan SEO odaklı kurumsal web sitesi.',
    longDesc: 'Pendik bölgesinde faaliyet gösteren bir çekici firması için geliştirdiğim kurumsal web sitesidir. Hızlı yükleme süresi ve teknik SEO optimizasyonlarıyla arama motorlarında üst sıralarda yer almayı hedefler.',
    tags: ['HTML', 'CSS', 'SEO', 'Kurumsal Site'],
    icon: Globe, iconColor: '#00F5FF', image: null,
    github: 'https://github.com/emrhnccn/pendikcekici',
    liveDemo: 'https://pendikcekici.vercel.app',
  },
  {
    id: 8, name: 'BereketSisesiGit', title: 'Bereket Sesi (v1)',
    desc: 'Bereket Sesi markasının ilk versiyon web sitesi. Marka kimliğini yansıtan sade arayüz ve içerik yönetim altyapısı.',
    longDesc: 'Bereket Sesi markası için hazırladığım ilk versiyon kurumsal web sitesidir. Bu versiyon üzerine iterasyonlar yapılarak daha gelişmiş sürümlere geçilmiştir.',
    tags: ['Web Sitesi', 'Kurumsal', 'Marka', 'UI/UX'],
    icon: Globe, iconColor: '#FF00C8', image: null,
    github: null,
    repoStatus: 'Kaynak kodu yakında paylaşılacak',
    liveDemo: 'https://bereketsisesi.vercel.app',
  },
  {
    id: 9, name: 'aiflix', title: 'AIFlix',
    desc: 'Netflix benzeri arayüze sahip, yapay zeka destekli içerik öneri platformu prototipi.',
    longDesc: 'Netflix arayüzünden ilham alarak tasarladığım yapay zeka destekli içerik öneri platformudur. Kullanıcının geçmişini analiz ederek kişiselleştirilmiş öneriler sunar.',
    tags: ['React', 'AI', 'TypeScript', 'API'],
    icon: Monitor, iconColor: '#00F5FF', image: null,
    github: 'https://github.com/emrhnccn/aiflix',
  },
  {
    id: 10, name: 'GustoPos', title: 'GustoPos',
    desc: 'Restoran ve kafe işletmeleri için TypeScript tabanlı POS yönetim sistemi. Sipariş takibi, masa yönetimi içerir.',
    longDesc: 'Restoran ve kafe işletmelerine yönelik geliştirdiğim modern POS sistemidir. TypeScript ile güvenli yapı oluşturulmuş; masa bazlı sipariş takibi ve gelir raporları sunulmaktadır.',
    tags: ['TypeScript', 'POS', 'Restoran Yönetimi', 'Dashboard'],
    icon: LayoutDashboard, iconColor: '#FF00C8', image: null,
    github: 'https://github.com/emrhnccn/GustoPos',
    liveDemo: 'https://gusto-pos-two.vercel.app',
  },
];

function ProjectDetail({ project, onBack }) {
  const IconComp = project.icon;
  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px' }}>
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px', color: '#94a3b8', padding: '6px 12px',
          fontSize: '12px', cursor: 'pointer', marginBottom: '20px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#00F5FF'}
        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
      >
        <ArrowLeft size={14} /> Geri
      </button>

      {/* Image or gradient */}
      <div style={{
        height: '180px', borderRadius: '10px', overflow: 'hidden',
        marginBottom: '20px', position: 'relative',
        background: project.image
          ? 'transparent'
          : `linear-gradient(135deg, #0d0d1a, #1a0d2e)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {project.image ? (
          <img src={project.image} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            onError={e => e.target.style.display = 'none'}
          />
        ) : (
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${project.iconColor}44`,
            boxShadow: `0 0 20px ${project.iconColor}33`,
          }}>
            <IconComp size={32} color={project.iconColor} />
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 60%)',
        }} />
      </div>

      <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
        {project.title}
      </h2>

      <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px' }}>
        {project.longDesc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: '20px',
            background: 'rgba(255,0,200,0.08)', border: '1px solid rgba(255,0,200,0.2)',
            color: '#FF00C8', fontSize: '11px', fontFamily: 'monospace',
          }}>{tag}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '8px' }}>
        {project.liveDemo && (
          <a
            href={project.liveDemo} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '8px',
              background: 'rgba(255,0,200,0.08)', border: '1px solid rgba(255,0,200,0.25)',
              color: '#FF00C8', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,200,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,0,200,0.08)'}
          >
            <ExternalLink size={16} aria-hidden="true" /> Canlı Demoyu Aç
          </a>
        )}

        {project.github ? (
          <a
            href={project.github} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '8px',
              background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
              color: '#00F5FF', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,245,255,0.08)'}
          >
            <ExternalLink size={16} aria-hidden="true" /> GitHub'da İncele
          </a>
        ) : (
          <button
            type="button"
            disabled
            title={project.repoStatus}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '8px',
              background: 'rgba(148,163,184,0.05)', border: '1px solid rgba(148,163,184,0.14)',
              color: '#64748b', fontSize: '13px', fontWeight: 600,
              cursor: 'not-allowed', opacity: 0.85,
            }}
          >
            <Code size={16} aria-hidden="true" /> {project.repoStatus}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);
  const projects = PROJECTS;

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Address bar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <Code size={14} color="#00F5FF" />
        <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '12px' }}>
          ~/emrhnccn/repos · {projects.length} proje
        </span>
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px',
        alignContent: 'start',
      }}>
        {projects.map((project) => {
          const IconComp = project.icon;
          return (
            <button
              type="button"
              key={project.id}
              onClick={() => setSelected(project)}
              aria-label={`${project.title} ayrıntılarını aç`}
              title={`${project.title} ayrıntılarını aç`}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                padding: '14px 8px 10px',
                borderRadius: '10px', cursor: 'pointer',
                transition: 'all 0.15s',
                border: '1px solid transparent',
                userSelect: 'none',
                background: 'transparent',
                font: 'inherit',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,245,255,0.07)';
                e.currentTarget.style.border = '1px solid rgba(0,245,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1px solid transparent';
              }}
              onFocus={e => {
                e.currentTarget.style.background = 'rgba(0,245,255,0.07)';
                e.currentTarget.style.border = '1px solid rgba(0,245,255,0.45)';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,245,255,0.18)';
              }}
              onBlur={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Folder icon with inner icon */}
              <div style={{ position: 'relative', width: '52px', height: '44px' }}>
                <Folder size={52} color={project.iconColor} fill={`${project.iconColor}22`} />
                <div style={{
                  position: 'absolute', bottom: '6px', right: '-2px',
                  background: 'rgba(8,8,16,0.9)', borderRadius: '4px',
                  padding: '2px',
                }}>
                  <IconComp size={14} color={project.iconColor} />
                </div>
              </div>

              <span style={{
                color: '#e2e8f0', fontSize: '11px', textAlign: 'center',
                lineHeight: 1.3, fontWeight: 500,
                maxWidth: '120px',
              }}>
                {project.title}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{
        padding: '8px 16px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: '#475569', fontSize: '11px', fontFamily: 'monospace',
      }}>
        {projects.length} öğe · Açmak için seçin
      </div>
    </div>
  );
}
