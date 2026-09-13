import { useState } from 'react';
import {
  ExternalLink,
  ArrowLeft,
  Code,
  MessageSquare,
  Database,
  Gamepad2,
  Monitor,
  Cpu,
  LayoutDashboard,
  Globe,
  Star,
  Lock,
  Layers,
} from 'lucide-react';

const PROJECTS = [
  // ── FEATURED PROJECTS (TOP 3) ──────────────────────────────────────────────
  {
    id: 1,
    name: 'real-time-chat',
    tier: 'featured',
    category: 'web',
    title: 'Gerçek Zamanlı Mesajlaşma Mimarisi',
    subtitle: 'Düşük Gecikmeli Socket.io Altyapısı',
    desc: 'Node.js ve WebSocket (Socket.io) tabanlı, oda bazlı mesajlaşma ve MongoDB oturum kalıcılığı sağlayan iletişim sistemi.',
    problem: 'Geleneksel HTTP polling sistemlerinin oluşturduğu gecikme ve sunucu yükünü ortadan kaldırmak; binlerce anlık kullanıcının oda bazında hatasız iletişim kurmasını sağlamak.',
    solution: 'Event-driven WebSocket mimarisi kuruldu. Kullanıcılar dinamik odalara (rooms) abone edilerek yük optimize edildi. Bağlantı kopmalarına karşı otomatik yeniden bağlanma ve mesajlaşma kuyruğu modellendi.',
    highlights: [
      'Socket.io room multiplexing ile kanal bazlı izolasyon',
      'MongoDB üzerinde indeksli mesaj geçmişi ve TTL koleksiyonları',
      'XSS saldırılarına karşı sanitize edilmiş payload doğrulaması',
      'Mobil uyumlu Tailwind CSS arayüzü ve bildirim sesleri',
    ],
    tags: ['Node.js', 'Socket.io', 'MongoDB', 'Express', 'Tailwind CSS'],
    icon: MessageSquare,
    iconColor: '#00F5FF',
    image: '/images/proje1.webp',
    github: null,
    repoStatus: 'Özel Depo (Private Repo)',
    liveDemo: null,
  },
  {
    id: 2,
    name: 'GustoPos',
    tier: 'featured',
    category: 'web',
    title: 'GustoPos & Restoran Yönetim Sistemi',
    subtitle: 'Kapasite, Rezervasyon ve POS Otomasyonu',
    desc: 'React ve TypeScript ile geliştirilmiş restoran POS, masa doluluk ve anlık sipariş yönetim sistemi.',
    problem: 'Restoran ve kafelerde masa rezervasyonu çakışmaları, sipariş takibi hataları ve anlık ciro/doluluk analitiğinin dağınık yürütülmesi.',
    solution: 'TypeScript tip güvenliğiyle geliştirilen merkezi bir yönetim paneli. Masa durumu renk kodlarıyla dinamik izlenir; siparişler ve rezervasyonlar algoritmik olarak kuyruğa alınır.',
    highlights: [
      'TypeScript ile katı tip güvenliği ve modüler durum yönetimi',
      'Dinamik masa haritası ve gerçek zamanlı doluluk durumu takibi',
      'Rezervasyon çakışmalarını önleyen algoritmik zaman aralığı kontrolü',
      'Gelir, sipariş ve masa performansı grafiksel analizleri',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'POS Sistemi', 'Dashboard'],
    icon: LayoutDashboard,
    iconColor: '#FF00C8',
    image: '/images/proje2.webp',
    github: 'https://github.com/emrhnccn/GustoPos',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: 'https://gusto-pos-two.vercel.app',
  },
  {
    id: 3,
    name: 'coop-puzzle',
    tier: 'featured',
    category: 'game',
    title: '3D Co-op Bulmaca Oyunu',
    subtitle: 'Eşzamanlı Fizik ve Etkileşim Motoru',
    desc: 'Unity 3D ve C# ile geliştirilmiş iki oyunculu co-op bulmaca oyunu. Rigidbody fiziği ve raycast senkronizasyonu içerir.',
    problem: 'İki karakterin eşzamanlı olarak aynı fiziksel objeler üzerinde kuvvet uygulaması ve senkronize bulmacaları çözmesi sırasında oluşan desync ve bellek darboğazları.',
    solution: 'C# Clean Code prensipleriyle nesne havuzu (Object Pooling) ve optimize edilmiş Raycast etkileşimleri geliştirildi. Garbage Collection yükü minimize edildi.',
    highlights: [
      'Custom Rigidbody fizik mekanikleri ve dinamik ağırlık dengesi',
      'Bellek optimizasyonu: Object Pooling ile sıfır frame-drop',
      'Modular Interaction System (Butonlar, lazerler, ağırlık tablaları)',
      'Unity Animator State Machine ve ses senkronizasyonu',
    ],
    tags: ['Unity 3D', 'C#', 'Fizik Motoru', 'Object Pooling', 'Level Design'],
    icon: Gamepad2,
    iconColor: '#00F5FF',
    image: '/images/proje4.webp',
    github: null,
    repoStatus: 'Özel Mülkiyet (Private Repo)',
    liveDemo: null,
  },

  // ── SELECTED PROJECTS ───────────────────────────────────────────────────────
  {
    id: 4,
    name: 'kyk-automation',
    tier: 'selected',
    category: 'web',
    title: 'KYK Yurt Otomasyonu & Kapasite Takibi',
    subtitle: 'İlişkisel Veritabanı & Algoritmik Oda Atama',
    desc: 'MySQL ve Node.js üzerine kurulu, öğrenci kayıt, oda atama, yemekhane hakkı ve kapasite takibini yöneten sistem.',
    problem: 'Yurtlarda manuel yapılan oda yerleşimleri, kapasite aşımları ve yemekhane haklarının takibindeki insan hataları.',
    solution: '3. Normal Form (3NF) kurallarına uygun ilişkisel MySQL şeması ve algoritmik oda atama servisi geliştirildi.',
    highlights: [
      'Kompleks MySQL Foreign Key ve Indexleme optimizasyonu',
      'Öğrenci kontenjanı ve oda tiplerine göre otomatik yerleşim algoritması',
      'Role-based yetkilendirme (Yönetici, Personel, Öğrenci)',
    ],
    tags: ['Node.js', 'MySQL', 'RDBMS', 'Relational Schema', 'API'],
    icon: Database,
    iconColor: '#FF00C8',
    image: '/images/proje3.webp',
    github: null,
    repoStatus: 'Kurumsal Proje (Client Project)',
    liveDemo: null,
  },
  {
    id: 5,
    name: 'match3-game',
    tier: 'selected',
    category: 'game',
    title: 'Kampüs Temalı Match-3 Oyunu',
    subtitle: 'Bitirme Projesi & Blender 3D Entegrasyonu',
    desc: 'Blender ile modellenen kampüs binalarının Unity\'ye dinamik harita olarak aktarıldığı, Match-3 algoritmalarına sahip oyun.',
    problem: 'Geleneksel 2D Match-3 oyunları yerine kampüs yaşamını tanıtan 3D interaktif harita ve oyun mekaniği üretmek.',
    solution: 'Blender 3D modelleri Unity içerisine low-poly olarak aktarıldı. Grid tabanlı eşleştirme algoritması ve backend leaderboard API entegre edildi.',
    highlights: [
      'Grid eşleştirme ve patlama kuyruğu algoritmaları',
      'Blender low-poly çevre modellemesi ve UV mapping',
      'REST API bağlantılı dinamik skor tablosu (Leaderboard)',
    ],
    tags: ['Unity', 'C#', 'Blender', 'Grid Algorithm', 'REST API'],
    icon: Monitor,
    iconColor: '#00F5FF',
    image: '/images/proje5.webp',
    github: null,
    repoStatus: 'Akademik Proje (University Project)',
    liveDemo: null,
  },
  {
    id: 6,
    name: 'ai-automation',
    tier: 'selected',
    category: 'ai',
    title: 'AI İçerik & Veri Otomasyonları',
    subtitle: 'LLM API & Web Scraping Pipeline',
    desc: 'LLM API entegrasyonu ile dinamik içerik üreten ve Web Scraping botlarıyla yapılandırılmış veri toplayan otomasyon araçları.',
    problem: 'Manuel veri toplama ve içerik üretim süreçlerinin çok zaman alması ve hataya açık olması.',
    solution: 'Node.js üzerinde zamanlanmış botlar ve LLM API pipeline\'ları kuruldu. Ham veriler yapılandırılmış JSON formatına dönüştürüldü.',
    highlights: [
      'Puppeteer ve Cheerio ile otomatik veri madenciliği',
      'LLM Prompt Engineering ile yapılandırılmış JSON çıktıları',
      'Rate-limiting ve proxy hata yönetimi altyapısı',
    ],
    tags: ['LLM API', 'Node.js', 'Puppeteer', 'Web Scraping', 'Veri Pipeline'],
    icon: Cpu,
    iconColor: '#FF00C8',
    image: '/images/proje6.webp',
    github: null,
    repoStatus: 'Ar-Ge Projesi (R&D)',
    liveDemo: null,
  },
  {
    id: 7,
    name: 'pendikcekici',
    tier: 'selected',
    category: 'web',
    title: 'Pendik Çekici Hizmetleri',
    subtitle: 'Teknik SEO & Core Web Vitals Odaklı Web',
    desc: 'İstanbul Pendik bölgesine özel çekici ve yol yardım hizmeti sunan SEO ve hız odaklı kurumsal web platformu.',
    problem: 'Yerel arama motoru sorgularında düşük hız ve eksik teknik SEO nedeniyle müşteriye ulaşamama sorunu.',
    solution: 'Temiz semantic HTML5, kritik CSS inlining ve optimize varlıklarla Google PageSpeed 100/100 performansı elde edildi.',
    highlights: [
      'Core Web Vitals skorlarında sıfır CLS ve 0.8s altı LCP',
      'Local Business Schema JSON-LD zengin veri entegrasyonu',
      'Mobil acil çağrı düğmeleri ve WhatsApp yönlendirme',
    ],
    tags: ['HTML5', 'CSS3', 'Teknik SEO', 'PageSpeed 100', 'Schema.org'],
    icon: Globe,
    iconColor: '#00F5FF',
    image: null,
    github: 'https://github.com/emrhnccn/pendikcekici',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: 'https://pendikcekici.vercel.app',
  },

  // ── ARCHIVE & EXPERIMENTS ──────────────────────────────────────────────────
  {
    id: 8,
    name: 'aiflix',
    tier: 'archive',
    category: 'ai',
    title: 'AIFlix — Yapay Zeka Öneri Prototipi',
    subtitle: 'Akıllı İçerik Keşif Platformu',
    desc: 'Modern video akış servislerinden ilham alan, yapay zekâ tabanlı içerik öneri algoritması prototipi.',
    problem: 'Geniş medya kataloglarında kullanıcının zevkine uygun içerik bulma zorluğu.',
    solution: 'React ve TypeScript ile geliştirilen arayüz, izleme geçmişine göre ağırlıklandırılmış öneriler sunar.',
    highlights: [
      'Modern UI/UX streaming arayüz tasarımı',
      'Kullanıcı tercih vektörlerine dayalı basit öneri motoru',
    ],
    tags: ['React', 'TypeScript', 'AI Öneri', 'UI Tasarımı'],
    icon: Monitor,
    iconColor: '#00F5FF',
    image: null,
    github: 'https://github.com/emrhnccn/aiflix',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: null,
  },
  {
    id: 9,
    name: 'BereketSisesiGit',
    tier: 'archive',
    category: 'web',
    title: 'Bereket Sesi (v1)',
    subtitle: 'Kurumsal Web & Marka Platformu',
    desc: 'Bereket Sesi markasının ilk versiyon kurumsal web sitesi ve dijital vitrin projesi.',
    problem: 'Markanın dijital dünyadaki ilk temsilini sade ve hızlı bir yapıyla kurmak.',
    solution: 'Hafif frontend altyapısı ve marka kimliğine uygun kurumsal sunum.',
    highlights: ['Minimalist tasarım', 'Hızlı sayfa yükleme', 'Responsive uyumluluk'],
    tags: ['Web Sitesi', 'Kurumsal', 'Marka Kimliği', 'Vercel'],
    icon: Globe,
    iconColor: '#FF00C8',
    image: null,
    github: null,
    repoStatus: 'Özel Depo (Private Repo)',
    liveDemo: 'https://bereketsisesi.vercel.app',
  },
  {
    id: 10,
    name: 'restaurant-system',
    tier: 'archive',
    category: 'web',
    title: 'Salaas Kafe & Restoran Web Portalı',
    subtitle: 'Canlı Müşteri Rezervasyon & Menü Platformu',
    desc: 'Aktif işletme için geliştirilmiş, dinamik menü ve rezervasyon iletişim altyapısına sahip canlı web sitesi.',
    problem: 'Müşterilerin işletme menüsüne ve rezervasyon iletişimine anlık erişebilmesi.',
    solution: 'Modern web standartlarında geliştirilip canlı yayına alınan stabil kurumsal platform.',
    highlights: ['Canlı üretim ortamında aktif kullanım', 'Mobil odaklı arayüz', 'Hızlı menü navigasyonu'],
    tags: ['React', 'Web Geliştirme', 'Canlı Proje', 'Restoran'],
    icon: LayoutDashboard,
    iconColor: '#00F5FF',
    image: null,
    github: null,
    repoStatus: 'Kurumsal Mülkiyet (Client Project)',
    liveDemo: 'https://salaascaferestaurant.com.tr',
  },
];

// ── Detail View Component ──────────────────────────────────────────────────
function ProjectDetail({ project, onBack }) {
  const IconComp = project.icon;

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px' }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px', color: '#cbd5e1', padding: '6px 14px',
          fontSize: '12px', fontWeight: 600, marginBottom: '20px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.12)'; e.currentTarget.style.color = '#00F5FF'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; }}
      >
        <ArrowLeft size={14} aria-hidden="true" /> Projeler Listesine Dön
      </button>

      {/* Hero Header / Banner */}
      <div style={{
        height: '200px', borderRadius: '12px', overflow: 'hidden',
        marginBottom: '22px', position: 'relative',
        background: project.image ? '#0a0a14' : 'linear-gradient(135deg, #0d0d20 0%, #170d2e 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px',
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${project.iconColor}55`,
            boxShadow: `0 0 30px ${project.iconColor}33`,
          }}>
            <IconComp size={40} color={project.iconColor} aria-hidden="true" />
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(6,6,16,0.92) 0%, rgba(6,6,16,0.2) 60%, transparent 100%)',
        }} />

        {/* Floating tier badge */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 10px', borderRadius: '20px',
          background: project.tier === 'featured' ? 'rgba(0,245,255,0.2)' : 'rgba(255,255,255,0.1)',
          border: project.tier === 'featured' ? '1px solid rgba(0,245,255,0.4)' : '1px solid rgba(255,255,255,0.15)',
          color: project.tier === 'featured' ? '#00F5FF' : '#cbd5e1',
          fontSize: '11px', fontFamily: 'monospace', fontWeight: 600,
          backdropFilter: 'blur(10px)',
        }}>
          {project.tier === 'featured' && <Star size={12} fill="#00F5FF" aria-hidden="true" />}
          {project.tier === 'featured' ? 'ÖNE ÇIKAN PROJE' : project.tier === 'selected' ? 'SEÇİLİ PROJE' : 'ARŞİV & PROTOTİP'}
        </div>
      </div>

      <div style={{ marginBottom: '6px', color: project.iconColor, fontFamily: 'monospace', fontSize: '12px', fontWeight: 700 }}>
        {project.subtitle}
      </div>

      <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        {project.title}
      </h2>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: '4px 12px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0', fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 500,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Engineering Problem & Solution Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          padding: '16px', borderRadius: '10px',
          background: 'rgba(248, 113, 113, 0.05)', border: '1px solid rgba(248, 113, 113, 0.2)',
        }}>
          <div style={{ color: '#f87171', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '6px' }}>
            // PROBLEM TANIMI
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            {project.problem}
          </p>
        </div>

        <div style={{
          padding: '16px', borderRadius: '10px',
          background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)',
        }}>
          <div style={{ color: '#34d399', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '6px' }}>
            // MİMARİ VE ÇÖZÜM
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            {project.solution}
          </p>
        </div>
      </div>

      {/* Technical Highlights */}
      {project.highlights && (
        <div style={{
          padding: '18px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '24px',
        }}>
          <div style={{ color: '#00F5FF', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '12px' }}>
            TEKNİK ÖNE ÇIKANLAR
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#94a3b8', fontSize: '13px', lineHeight: 1.8 }}>
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '8px',
              background: 'rgba(255,0,200,0.15)', border: '1px solid rgba(255,0,200,0.4)',
              color: '#ff52d9', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <ExternalLink size={16} aria-hidden="true" /> Canlı Demoyu Ziyaret Et
          </a>
        )}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '8px',
              background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.35)',
              color: '#00F5FF', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <Code size={16} aria-hidden="true" /> GitHub Kodlarını İncele
          </a>
        ) : (
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 18px', borderRadius: '8px',
              background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.15)',
              color: '#94a3b8', fontSize: '12.5px', fontFamily: 'monospace',
            }}
          >
            <Lock size={14} aria-hidden="true" /> {project.repoStatus}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Projects App Component ───────────────────────────────────────────
export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === 'featured') return p.tier === 'featured';
    if (activeFilter === 'web') return p.category === 'web';
    if (activeFilter === 'game') return p.category === 'game';
    if (activeFilter === 'ai') return p.category === 'ai';
    return true;
  });

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#070712' }}>
      {/* Top Header Bar */}
      <div style={{
        padding: '12px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} color="#00F5FF" />
          <span style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 600 }}>
            Projeler Mimarisi ({PROJECTS.length})
          </span>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'Tümü (10)' },
            { id: 'featured', label: '⭐ Öne Çıkanlar (3)' },
            { id: 'web', label: 'Web & Full-Stack' },
            { id: 'game', label: 'Unity & Oyun' },
            { id: 'ai', label: 'AI & Veri' },
          ].map(filter => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: '4px 10px', borderRadius: '6px',
                border: activeFilter === filter.id ? '1px solid rgba(0,245,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === filter.id ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.02)',
                color: activeFilter === filter.id ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.12s',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Container */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '14px',
        alignContent: 'start',
      }}>
        {filteredProjects.map(project => {
          const IconComp = project.icon;
          const isFeatured = project.tier === 'featured';

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`${project.title} ayrıntılarını aç`}
              style={{
                display: 'flex', flexDirection: 'column',
                padding: '16px', borderRadius: '12px',
                background: isFeatured ? 'rgba(0, 245, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                border: isFeatured ? '1px solid rgba(0, 245, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.07)',
                textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.16s',
                position: 'relative', overflow: 'hidden',
                outline: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isFeatured ? 'rgba(0, 245, 255, 0.09)' : 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(0, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isFeatured ? 'rgba(0, 245, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(0, 245, 255, 0.25)' : 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Header row with Icon & Tier Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${project.iconColor}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${project.iconColor}40`,
                }}>
                  <IconComp size={20} color={project.iconColor} aria-hidden="true" />
                </div>

                {isFeatured ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '3px 8px', borderRadius: '20px',
                    background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.3)',
                    color: '#00F5FF', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700,
                  }}>
                    <Star size={10} fill="#00F5FF" aria-hidden="true" /> ÖNE ÇIKAN
                  </span>
                ) : (
                  <span style={{
                    color: '#64748b', fontSize: '10px', fontFamily: 'monospace',
                  }}>
                    {project.category.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {project.title}
              </div>
              <div style={{ fontSize: '11.5px', color: project.iconColor, fontFamily: 'monospace', marginBottom: '8px' }}>
                {project.subtitle}
              </div>

              {/* Short desc */}
              <p style={{
                color: '#94a3b8', fontSize: '12px', lineHeight: 1.5,
                margin: '0 0 14px', flex: 1,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={{
                    padding: '2px 7px', borderRadius: '4px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#cbd5e1', fontSize: '10px', fontFamily: 'monospace',
                  }}>
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span style={{ color: '#64748b', fontSize: '10px', padding: '2px 4px', fontFamily: 'monospace' }}>
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer bar */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: '#64748b', fontSize: '11px', fontFamily: 'monospace',
      }}>
        <span>{filteredProjects.length} proje gösteriliyor</span>
        <span>Ayrıntılı teknik analiz için kartları tıklayın</span>
      </div>
    </div>
  );
}
