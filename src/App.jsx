import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { 
  TerminalSquare, ChevronRight, 
  Code, ExternalLink, Mail, User, Monitor, Gamepad2, 
  MessageSquare, Database, LayoutDashboard, Cpu, Search, Sparkles, BrainCircuit, Loader2, FileText, X
} from 'lucide-react';

// --- CUSTOM BRAND ICONS ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- YEREL AI SİMÜLASYONU (API GEREKTİRMEZ) ---
const simulateAIResponse = async (query, context) => {
  // Gerçekçilik için kısa bir bekleme süresi
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
  
  const q = query.toLowerCase();
  
  if (q.includes("merhaba") || q.includes("selam")) return "Merhaba! Ben Affan'ın asistanıyım. Portföyü gezmene yardımcı olabilirim.";
  if (q.includes("nasılsın") || q.includes("naber")) return "Harikayım! Senin için burada bekliyor ve Affan'ın projelerini tanıtıyorum. Sen nasılsın?";
  if (q.includes("kimsin") || q.includes("adın ne")) return "Ben kural tabanlı, API gerektirmeyen (bedava çalışan 😁) bir yapay zeka asistanıyım.";
  if (q.includes("iletişim") || q.includes("mail") || q.includes("ulaşabilirim")) return "Affan ile 'emrhn.ccn@gmail.com' üzerinden veya LinkedIn'den (/in/affanccn) iletişime geçebilirsin.";
  if (q.includes("proje") || q.includes("oyun") || q.includes("yaptın")) return "Gerçek zamanlı mesajlaşma, KYK yurt otomasyonu ve 3D Unity oyunları gibi birçok projesi var. 'projeler' yazarak listeyi görebilirsin!";
  if (q.includes("yetenek") || q.includes("dil") || q.includes("biliyorsun")) return "React, Node.js, Unity(C#), MySQL ve MongoDB gibi teknolojilere hakim.";
  if (q.includes("aşk") || q.includes("sevgili")) return "Ben sadece bir kod parçasıyım, duygularım yok... ama Affan kod yazmaya aşık! 💻❤️";
  if (q.includes("maaş") || q.includes("ücret") || q.includes("para")) return "Bunu doğrudan kendisiyle konuşmalısın! İletişim: emrhn.ccn@gmail.com";
  if (q.includes("teşekkür")) return "Rica ederim, her zaman buradayım!";
  
  return "Bunu anladığımdan emin değilim. Ama Affan'ın projeleri, yetenekleri veya iletişim bilgileri hakkında bir şeyler sorabilirsin. (Örn: 'hangi dilleri biliyor?')";
};

const getRandomIdea = () => {
  const ideas = [
    "🚀 Kuantum şifrelemeli, blockchain tabanlı merkeziyetsiz bir dosya paylaşım ağı oluştur.",
    "🎮 Unity ile nöral ağlar (neural networks) kullanarak kendi kendine öğrenen düşmanların olduğu bir co-op hayatta kalma oyunu geliştir.",
    "🧠 Kullanıcının yazdığı metinlerin duygu analizini yaparak, ona uygun arka plan müziği ve arayüz rengi üreten bir web uygulaması tasarla.",
    "🛒 E-ticaret siteleri için, müşterinin sepette bıraktığı ürünleri AR (Artırılmış Gerçeklik) ile odasında gösterebilen bir eklenti kodla.",
    "🤖 Sadece sesli komutlarla ve doğal dil işleme ile (NLP) tüm CRUD işlemlerini yapabilen bir veritabanı yönetim paneli tasarla."
  ];
  return ideas[Math.floor(Math.random() * ideas.length)];
};

// --- CUSTOM HOOKS ---

const useTypingEffect = (text, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration]);

  return displayedText;
};

const useScrollFadeIn = () => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return { ref: domRef, isVisible };
};


// --- COMPONENTS ---

const SectionItem = ({ children, delay = "0" }) => {
  const { ref, isVisible } = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Terminal Component
const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'AffanOS v1.0.0 sürümüne hoş geldiniz.' },
    { type: 'system', text: 'Mevcut komutları görmek için "yardim" yazın. ✨ Yapay zeka ile konuşmak için "ai [soru]" yazın.' }
  ]);
  const scrollContainerRef = useRef(null);

  // Sayfayı kaydırmak yerine SADECE terminalin içini en alta kaydırıyoruz!
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmdRaw = input.trim();
      const cmd = cmdRaw.toLowerCase();
      const newHistory = [...history, { type: 'user', text: `ziyaretci@affan:~$ ${cmdRaw}` }];
      
      if (cmd.startsWith('ai ')) {
        const query = cmdRaw.substring(3);
        setHistory([...newHistory, { type: 'system', text: '✨ AI Asistan düşünüyor...' }]);
        setInput('');
        
        try {
          const response = await simulateAIResponse(query, "terminal");
          setHistory(prev => {
            const filtered = prev.filter(h => h.text !== '✨ AI Asistan düşünüyor...');
            return [...filtered, { type: 'output', text: `✨ AI: ${response}` }];
          });
        } catch (error) {
          setHistory(prev => {
            const filtered = prev.filter(h => h.text !== '✨ AI Asistan düşünüyor...');
            return [...filtered, { type: 'error', text: 'AI bağlantı hatası: Lütfen tekrar deneyin.' }];
          });
        }
        return;
      }

      switch (cmd) {
        case 'yardim':
          newHistory.push({ type: 'output', text: 'Komutlar: kimimben, projeler, yetenekler, egitim, iletisim, temizle, ai [soru]' });
          break;
        case 'kimimben':
          newHistory.push({ type: 'output', text: 'Affan Emirhan Çüçen - Full-Stack web geliştirme, Unity oyun programlama ve teknik SEO alanlarında uzman yazılım geliştirici.' });
          break;
        case 'projeler':
          newHistory.push({ type: 'output', text: '1. Gerçek Zamanlı Mesajlaşma\n2. Restoran Kapasite Yönetimi\n3. KYK Yurt Otomasyonu\n4. Unity 3D/2D Match-3\n5. Co-op Bulmaca Oyunu\n6. Yapay Zeka Otomasyonları\n\nDetaylar için yukarıdaki UI arayüzünü inceleyin.' });
          break;
        case 'yetenekler':
          newHistory.push({ type: 'output', text: 'Frontend: React.js, Tailwind CSS, JS (ES6+)\nBackend: Node.js, Express.js, Socket.io\nVeritabanı: MongoDB, MySQL\nOyun: Unity 3D/2D, C#, Blender\nDiğer: LLM API, Web Scraping, Teknik SEO' });
          break;
        case 'egitim':
          newHistory.push({ type: 'output', text: '🎓 Bartın Üniversitesi - Bilgisayar Mühendisliği (2022 - Devam)\n🎓 Fırat Üniversitesi - Bilgisayar Mühendisliği (2018 - 2022)' });
          break;
        case 'iletisim':
          newHistory.push({ type: 'output', text: 'E-posta: emrhn.ccn@gmail.com | LinkedIn: /in/affanccn | GitHub: /emrhnccn' });
          break;
        case 'temizle':
          setHistory([]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'error', text: `Komut bulunamadı: ${cmd}. Geçerli komutlar için "yardim" yazın.` });
      }
      
      if (newHistory.length > 50) {
        newHistory.splice(0, newHistory.length - 50);
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-[#050505] border border-white/20 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,245,255,0.15)] relative">
      
      {/* CRT Scanline Effect (CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10" style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)", backgroundSize: "100% 4px" }}></div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-10"></div>
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/10 relative z-20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_yellow]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_green]"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400 font-mono flex items-center bg-black/50 px-3 py-1 rounded-md border border-white/5">
          <TerminalSquare size={14} className="mr-2 text-[#00F5FF]" /> root@affanccn:~
        </div>
      </div>
      
      {/* Terminal Body */}
      <div ref={scrollContainerRef} className="p-6 h-96 overflow-y-auto font-mono text-sm scroll-smooth relative z-20" style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}>
        {history.map((line, i) => (
          <div key={i} className="mb-3 tracking-wide">
            {line.type === 'user' && <span className="text-[#00F5FF] font-bold drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">{line.text}</span>}
            {line.type === 'system' && <span className="text-[#FF00C8] drop-shadow-[0_0_8px_rgba(255,0,200,0.8)]">{line.text}</span>}
            {line.type === 'output' && <span className="text-green-400 whitespace-pre-line leading-relaxed drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{line.text}</span>}
            {line.type === 'error' && <span className="text-red-400 drop-shadow-[0_0_5px_red]">{line.text}</span>}
          </div>
        ))}
        <div className="flex items-center text-[#00F5FF] mt-4 font-bold drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
          <span className="animate-pulse mr-2">➜</span>
          <span>ziyaretci@affan:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-green-300 ml-2 font-mono focus:ring-0 placeholder-gray-600 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};


// --- MOUSE TRACKING MEMOJI COMPONENT ---
const MouseTrackingMemoji = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = -(mouseY / (window.innerHeight / 2)) * 40; 
      const rotateY = (mouseX / (window.innerWidth / 2)) * 40;

      setTilt({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-10" style={{ perspective: '800px' }}>
      <div className="absolute inset-0 bg-[#00F5FF]/30 rounded-full blur-[60px] animate-pulse" />
      <img 
        ref={imgRef}
        src="/images/memoji.png"
        alt="Affan Memoji"
        className="relative w-full h-full object-contain"
        style={{ 
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15) translateZ(40px)`,
          transition: 'transform 0.15s ease-out',
          filter: 'drop-shadow(0px 25px 30px rgba(0, 245, 255, 0.4)) drop-shadow(0px 0px 10px rgba(255, 0, 200, 0.2))'
        }}
      />
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const typingText = useTypingEffect("Full-Stack Web & Unity Geliştiricisiyim");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // --- AI Feature States ---
  const [ideaInput, setIdeaInput] = useState('');
  const [aiIdea, setAiIdea] = useState(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const handleGenerateIdea = async () => {
    if (!ideaInput.trim()) return;
    setIsGeneratingIdea(true);
    setAiIdea(null);
    try {
      // API kullanmadan rastgele fikir üret
      await new Promise(resolve => setTimeout(resolve, 1500)); // Animasyon efekti için bekle
      const response = getRandomIdea();
      setAiIdea(`Seçilen Sektör/Problem: "${ideaInput}"\n\n🎯 Öneri: ${response}`);
    } catch (error) {
      setAiIdea("Fikir üretilirken bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
    
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const fallbackProjects = [
    {
      title: "Gerçek Zamanlı Mesajlaşma",
      desc: "Node.js ve Socket.io ile inşa edilmiş anlık mesajlaşma uygulaması. Kullanıcılar oda bazlı sohbet edebilir, mesaj geçmişi MongoDB'de saklanır ve Vercel üzerinde canlıya alınmıştır.",
      longDesc: "Kullanıcılar arası iletişim için Node.js ve Socket.io kullanarak geliştirdiğim düşük gecikmeli mesajlaşma altyapısıdır. MongoDB ile sohbet geçmişini modelledim. Projeyi Ngrok ve Vercel ile canlı ortama taşıyıp responsive (mobil uyumlu) bir arayüz entegre ettim.",
      tags: ["Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      icon: <MessageSquare size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje1.png",
      github: "https://github.com/emrhnccn"
    },
    {
      title: "Restoran Rezervasyon Sistemi",
      desc: "Restoranlar için geliştirilmiş React + Node.js tabanlı kapasite ve masa yönetim sistemi. Müşteriler anlık boş masaları görebilir, yönetici paneli doluluk analizleri sunar.",
      longDesc: "Restoranlar için özel olarak geliştirilmiş kapasite yönetim sistemidir. Dinamik masa durumu ve rezervasyon takibini içerir. İstemci (müşteri) tarafında anlık boş masa takibi sağlarken, yönetici panelinde rezervasyon ve doluluk analizleri sunan güvenli bir yapı tasarladım.",
      tags: ["React", "Node.js", "Express", "Algoritmik Planlama"],
      icon: <LayoutDashboard size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje2.png",
      github: "https://github.com/emrhnccn"
    },
    {
      title: "KYK Yurt Otomasyonu",
      desc: "MySQL üzerine kurulu yurt yönetim sistemi; öğrenci kayıt, oda atama, yemekhane hakkı ve kapasite takibini algoritmik olarak yönetir. Tüm mimari baştan tasarlanmıştır.",
      longDesc: "Sistem mimarisini tamamen kendim tasarladığım bir otomasyon sistemidir. MySQL kullanarak öğrenci, oda ve kapasite bilgilerini yöneten kompleks bir ilişkisel veritabanı oluşturdum. Yemekhane hakları, giriş-çıkış saatleri ve oda doluluk oranlarını algoritmik olarak takip eder.",
      tags: ["Node.js", "MySQL", "RDBMS", "API Geliştirme"],
      icon: <Database size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje3.png",
      github: "https://github.com/emrhnccn"
    },
    {
      title: "3D Co-op Bulmaca Oyunu",
      desc: "Unity 3D ile geliştirilmiş iki oyunculu co-op bulmaca oyunu. Rigidbody fiziği, Raycast etkileşimleri ve karakter senkronizasyonu içerir; Clean Code prensiplerine göre optimize edilmiştir.",
      longDesc: "İki oyuncunun (Co-op) eşzamanlı etkileşimine dayalı 3D bulmaca mekanikleri içeren Unity oyunumdur. Karakterler arası veri senkronizasyonu sağlandı. Rigidbody fiziği ve Raycast etkileşimleri kullanılarak Clean Code (temiz kod) prensipleriyle bellek optimizasyonu yapıldı.",
      tags: ["Unity 3D", "C#", "Level Design", "Fizik Motoru"],
      icon: <Gamepad2 size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje4.png",
      github: "https://github.com/emrhnccn"
    },
    {
      title: "Kampüs Temalı Match-3",
      desc: "Üniversite bitirme projesi; Blender ile modellenen kampüs binaları Unity'ye entegre edilmiş, C# ile Match-3 algoritmaları yazılmış ve API destekli Leaderboard sistemi kurulmuştur.",
      longDesc: "Üniversite bitirme projem olarak hazırladığım Kampüs temalı Match-3 oyunu. Blender ile kampüs binalarını modelleyip Unity'ye dinamik level haritası olarak entegre ettim. C# ile grid tabanlı Match-3 algoritmaları yazdım ve API üzerinden veri senkronizasyonu sağlayan Leaderboard (Liderlik Tablosu) kurdum.",
      tags: ["Unity", "C#", "Blender", "Backend API"],
      icon: <Monitor size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje5.png",
      github: "https://github.com/emrhnccn"
    },
    {
      title: "AI & Veri Otomasyonları",
      desc: "LLM API entegrasyonu ile dinamik içerik üreten ve Web Scraping botlarıyla internetten veri toplayan Ar-Ge projeleri. Tekrarlayan iş akışlarını otomatize ederek süreçleri hızlandırır.",
      longDesc: "Ar-Ge projelerim kapsamında geliştirdiğim otomasyon sistemleri. LLM (Yapay Zeka API'leri) entegrasyonuyla dinamik içerik üreten sistemler ve Web Scraping (Veri Kazıma) ile internetten veri toplayan botlar tasarladım. Tekrarlayan görevleri otomatize ederek süreçleri hızlandırır.",
      tags: ["LLM API", "Node.js", "Web Scraping", "Otomasyon"],
      icon: <Cpu size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje6.png",
      github: "https://github.com/emrhnccn"
    }
  ];

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        // Tüm repoları çek (pinli değil, tümü)
        const response = await fetch('https://api.github.com/users/emrhnccn/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Ağ hatası');
        const data = await response.json();
        
        const filtered = data.filter(repo => !repo.fork);

        if (filtered.length === 0) {
          setProjectsData(fallbackProjects);
          return;
        }

        // Extra projeler için sabit açıklamalar (görsel yok)
        const extraProjectsMap = {
          'pendikcekici': {
            title: 'Pendik Çekici Hizmetleri',
            desc: 'İstanbul Pendik bölgesine özel çekici ve yol yardım hizmeti sunan statik kurumsal web sitesi. SEO odaklı, hızlı yüklenen ve mobil uyumlu tasarımıyla müşteri kazanımını hedefler.',
            longDesc: 'Pendik bölgesinde faaliyet gösteren bir çekici firması için geliştirdiğim kurumsal web sitesidir. Hızlı yükleme süresi ve teknik SEO optimizasyonlarıyla arama motorlarında üst sıralarda yer almayı hedefler. HTML/CSS ile sade ve etkin bir kullanıcı deneyimi sunulmuştur.',
            tags: ['HTML', 'CSS', 'SEO', 'Kurumsal Site'],
          },
          'BereketSisesiGit': {
            title: 'Bereket Sesi (v1)',
            desc: 'Bereket Sesi markasının ilk versiyon web sitesi. Marka kimliğini yansıtan sade arayüzü ve içerik yönetim altyapısıyla kurumsal dijital varlık oluşturur.',
            longDesc: 'Bereket Sesi markası için hazırladığım ilk versiyon kurumsal web sitesidir. Marka kimliğine uygun renk paleti ve tipografi seçimleriyle profesyonel bir görünüm sağlanmıştır. Bu versiyon üzerine iterasyonlar yapılarak daha gelişmiş sürümlere geçilmiştir.',
            tags: ['Web Sitesi', 'Kurumsal', 'Marka', 'UI/UX'],
          },
          'aiflix': {
            title: 'AIFlix',
            desc: 'Netflix benzeri arayüze sahip, yapay zeka destekli içerik öneri platformu prototipi. Kullanıcı geçmişine göre kişiselleştirilmiş film ve dizi önerileri üretir.',
            longDesc: 'Netflix arayüzünden ilham alarak tasarladığım yapay zeka destekli içerik öneri platformudur. Kullanıcının izleme geçmişini analiz ederek kişiselleştirilmiş öneriler sunar. Modern React mimarisi ve API entegrasyonuyla zengin bir kullanıcı deneyimi hedeflenmiştir.',
            tags: ['React', 'AI', 'TypeScript', 'API'],
          },
          'affan-portfolio': {
            title: 'Affan Portfolio',
            desc: 'Bu portfolyo sitesinin kaynak kodu. React, Vite ve Tailwind CSS ile inşa edilmiş; terminal, AI asistan ve gerçek zamanlı GitHub entegrasyonu içeren kişisel portfolyo uygulaması.',
            longDesc: 'Şu an gezdiğiniz bu portfolyo sitesinin kaynak kodudur. React + Vite altyapısı, özel terminal simülatörü, fare takipli memoji, scroll animasyonları ve GitHub API entegrasyonu ile modern bir geliştirici portfolyosu tasarlandı.',
            tags: ['React', 'Vite', 'Tailwind CSS', 'GitHub API'],
          },
          'ersa-ticaret': {
            title: 'Ersa Ticaret',
            desc: 'Ticaret şirketi için geliştirilen TypeScript tabanlı e-ticaret web uygulaması. Ürün listeleme, kategori filtreleme ve iletişim formu modülleri içerir.',
            longDesc: 'Ersa Ticaret şirketi için geliştirdiğim kurumsal e-ticaret web uygulamasıdır. TypeScript ile tip güvenli bir yapı oluşturulmuş, ürün kataloğu, kategori yönetimi ve müşteri iletişim formu entegre edilmiştir.',
            tags: ['TypeScript', 'React', 'E-Ticaret', 'Kurumsal'],
          },
          'salas-rezervasyon': {
            title: 'Salaas Cafe Restaurant',
            desc: 'Salaas Cafe & Restaurant için geliştirilen online rezervasyon ve menü tanıtım sistemi. Masa rezervasyonu, menü listeleme ve canlı yayında aktif web uygulaması.',
            longDesc: 'Salaas Cafe Restaurant için özel olarak geliştirdiğim web uygulamasıdır. Müşteriler online masa rezervasyonu yapabilir, menüyü inceleyebilir. Yönetici panelinden rezervasyon takibi ve içerik güncelleme yapılabilir.',
            tags: ['JavaScript', 'Node.js', 'Rezervasyon', 'Restoran'],
          },
          'GustoPos': {
            title: 'GustoPos',
            desc: 'Restoran ve kafe işletmeleri için TypeScript tabanlı POS (Satış Noktası) yönetim sistemi. Sipariş takibi, masa yönetimi ve gelir raporlama modülleri içerir.',
            longDesc: 'Restoran ve kafe işletmelerine yönelik geliştirdiğim modern POS sistemidir. TypeScript ile güvenli ve ölçeklenebilir bir backend oluşturulmuş; masa bazlı sipariş takibi, mutfak ekranı entegrasyonu ve günlük/haftalık gelir raporları sunulmaktadır.',
            tags: ['TypeScript', 'POS', 'Restoran Yönetimi', 'Dashboard'],
          },
          'Bereketsisesi': {
            title: 'Bereket Sesi (v2)',
            desc: 'Bereket Sesi markasının yeniden tasarlanmış TypeScript tabanlı web sitesi. Geliştirilmiş UI/UX, içerik yönetimi ve performans optimizasyonları ile v1'in üzerine inşa edilmiştir.',
            longDesc: 'Bereket Sesi markası için v1 üzerine iterasyon yaparak geliştirdiğim yenilenmiş web uygulamasıdır. TypeScript geçişiyle tip güvenliği sağlanmış, yeni bileşen yapısı ve gelişmiş animasyonlarla kullanıcı deneyimi önemli ölçüde iyileştirilmiştir.',
            tags: ['TypeScript', 'React', 'UI/UX', 'Performans'],
          },
          'nakliyat': {
            title: 'Nakliyat Firması Sitesi',
            desc: 'Nakliyat firması için CSS ağırlıklı geliştirilen kurumsal web sitesi. Hizmet tanıtımı, fiyat teklifi formu ve responsive tasarımıyla potansiyel müşterilere ulaşmayı hedefler.',
            longDesc: 'Bir nakliyat firması için geliştirdiğim kurumsal web sitesidir. CSS animasyonları ve responsive tasarım ile tüm cihazlarda mükemmel görünüm sağlanmıştır. Hizmet sayfaları, fiyat teklifi formu ve iletişim modülü içermektedir.',
            tags: ['CSS', 'HTML', 'Kurumsal', 'SEO'],
          },
        };

        const iconColors = [
          <MessageSquare size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
          <LayoutDashboard size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
          <Database size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
          <Gamepad2 size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
          <Monitor size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
          <Cpu size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
        ];
        
        const mappedProjects = filtered.map((repo, index) => {
          const fallback = fallbackProjects[index];
          const extra = extraProjectsMap[repo.name];
          const isExtra = !fallback; // index >= 6 ya da fallback olmayan
          return {
            title: fallback ? fallback.title : (extra ? extra.title : repo.name.replace(/-/g, ' ').replace(/_/g, ' ')),
            desc: fallback ? fallback.desc : (extra ? extra.desc : (repo.description || 'GitHub projesi.')),
            longDesc: fallback ? fallback.longDesc : (extra ? extra.longDesc : (repo.description || 'Bu proje GitHub üzerinden otomatik olarak çekilmiştir.')),
            tags: fallback ? fallback.tags : (extra ? extra.tags : (repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : ['GitHub']))),
            icon: fallback ? fallback.icon : (iconColors[index % iconColors.length]),
            image: fallback ? fallback.image : null, // Extra projeler görselsiz
            github: repo.html_url
          };
        });
        
        setProjectsData(mappedProjects);
      } catch (error) {
        console.error("Proje çekme hatası:", error);
        setProjectsData(fallbackProjects);
      }
    };
    
    fetchGithubProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EAEAEA] font-sans overflow-x-hidden selection:bg-[#00F5FF] selection:text-[#0D0D0D]">
      
      {/* Custom Cursor - Sadece touch olmayan cihazlarda göster */}
      {!isTouchDevice && (
        <>
          <div 
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#00F5FF] pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-screen"
            style={{ 
              transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${isHovering ? 1.5 : 1})`,
              boxShadow: isHovering ? '0 0 20px #00F5FF' : '0 0 10px rgba(0,245,255,0.5)'
            }}
          />
          <div 
            className="fixed top-0 left-0 w-1 h-1 bg-[#FF00C8] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
          />
        </>
      )}

      {/* Fixed Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-50" />
      
      {/* Subtle Gradient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00F5FF]/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF00C8]/10 blur-[120px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-40 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-[#00F5FF]">&lt;</span>
            affan<span className="text-[#FF00C8]">.ccn</span>
            <span className="text-[#00F5FF]">/&gt;</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#hakkimda" className="hover:text-[#00F5FF] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Hakkımda</a>
            <a href="#projeler" className="hover:text-[#00F5FF] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Projeler</a>
            <a href="#terminal" className="hover:text-[#00F5FF] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Terminal</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-6">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
          <SectionItem>
            <MouseTrackingMemoji />
          </SectionItem>

          <SectionItem delay="100">
            <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-mono text-[#00F5FF] mb-6 shadow-[0_0_10px_rgba(0,245,255,0.1)]">
              Durum: Yeni projelere ve fırsatlara açık
            </div>
          </SectionItem>
          
          <SectionItem delay="200">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Affan Emirhan Çüçen
            </h1>
          </SectionItem>
          
          <SectionItem delay="400">
            <h2 className="text-2xl md:text-3xl text-gray-400 font-light mb-8 h-10 flex items-center justify-center">
              <span className="text-[#00F5FF] mr-2">_</span>{typingText}<span className="inline-block w-[3px] h-8 bg-[#FF00C8] ml-1 animate-pulse" />
            </h2>
          </SectionItem>
          
          <SectionItem delay="600">
            <div className="flex gap-4 flex-col sm:flex-row">
              <a 
                href="#projeler"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="px-8 py-3 rounded-md bg-[#00F5FF]/10 border border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF] hover:text-[#0D0D0D] transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                Projeleri İncele <ChevronRight size={18} />
              </a>
              <a 
                href="#terminal"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="px-8 py-3 rounded-md bg-white/5 border border-white/10 hover:border-[#FF00C8]/50 hover:bg-[#FF00C8]/10 text-white transition-all duration-300 font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                İnteraktif Terminal <TerminalSquare size={18} />
              </a>
            </div>
          </SectionItem>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
            <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
              <div className="w-1 h-3 bg-[#00F5FF] rounded-full animate-ping" />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="hakkimda" className="py-32 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SectionItem>
              <a 
                href="/affanCV11.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group block cursor-none"
                onMouseEnter={() => setIsHovering(true)} 
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF] to-[#FF00C8] rounded-xl blur-xl opacity-30 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"></div>
                
                {/* CV ÖNİZLEME (PREVIEW) BÖLÜMÜ */}
                <div className="relative aspect-square rounded-xl bg-[#111] border border-white/10 overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-2xl">
                   
                   {/* Iframe ile PDF arkada flu olarak gösteriliyor */}
                   <iframe 
                      src="/affanCV11.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500 object-cover" 
                      title="CV Preview"
                   ></iframe>
                   
                   {/* Siyah Karartma ve Gradyan */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent opacity-90 group-hover:opacity-70 transition-all duration-500" />
                   
                   {/* Ön Plandaki Yazı ve İkonlar */}
                   <FileText size={80} className="text-gray-300 group-hover:scale-110 group-hover:text-[#00F5FF] transition-all duration-500 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />
                   <div className="text-center relative z-10">
                      <p className="text-white font-bold text-2xl mb-3 group-hover:text-[#00F5FF] transition-colors tracking-wide drop-shadow-md">Özgeçmiş (CV)</p>
                      <p className="text-[#FF00C8] font-mono text-sm flex items-center justify-center gap-2 bg-[#FF00C8]/10 px-4 py-2 rounded-full border border-[#FF00C8]/20 group-hover:bg-[#00F5FF]/10 group-hover:text-[#00F5FF] group-hover:border-[#00F5FF]/20 transition-all backdrop-blur-sm">
                        İncelemek için tıkla <ExternalLink size={16} />
                      </p>
                   </div>
                </div>
              </a>
            </SectionItem>
            
            <div className="space-y-6">
              <SectionItem delay="200">
                <h3 className="text-[#00F5FF] font-mono text-sm flex items-center gap-2">
                  <Code size={16} /> 01. Hakkımda
                </h3>
              </SectionItem>
              <SectionItem delay="300">
                <h2 className="text-4xl font-bold">Affan Emirhan Çüçen Kimdir?</h2>
              </SectionItem>
              <SectionItem delay="400">
                <p className="text-gray-400 leading-relaxed text-lg">
                  Full-Stack web geliştirme, Unity oyun programlama ve teknik SEO alanlarında güçlü pratik deneyime sahip bir yazılım geliştiriciyim. Gerçek zamanlı sistemler (Socket.io) ve kompleks veritabanı (MySQL, MongoDB) mimarilerinde ölçeklenebilir uygulamalar tasarlıyorum.
                </p>
              </SectionItem>
              <SectionItem delay="500">
                <p className="text-gray-400 leading-relaxed text-lg">
                  Ayrıca LLM (Yapay Zeka API'leri) entegrasyonuyla dinamik içerik üreten sistemler ve Web Scraping otomasyonları üzerinde Ar-Ge çalışmaları yürütüyorum. Algoritma optimizasyonu ve temiz kod (Clean Code) felsefesi benim için vazgeçilmezdir.
                </p>
              </SectionItem>
            </div>
          </div>
        </section>

        {/* TERMINAL SECTION */}
        <section id="terminal" className="py-32 max-w-6xl mx-auto">
          <SectionItem>
            <div className="text-center mb-12">
              <h3 className="text-[#FF00C8] font-mono text-sm mb-2">&gt; terminal_modu</h3>
              <h2 className="text-4xl font-bold">Geliştirici Arayüzü</h2>
              <p className="text-gray-400 mt-4">Sistemi keşfetmek için komutlar girin (örn: yardim).</p>
            </div>
          </SectionItem>
          <SectionItem delay="200">
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <Terminal />
            </div>
          </SectionItem>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projeler" className="py-32 max-w-6xl mx-auto">
          <SectionItem>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-[#00F5FF] font-mono text-sm mb-2">02. Seçilmiş Çalışmalar</h3>
                <h2 className="text-4xl font-bold">Öne Çıkan Projeler</h2>
                <p className="text-gray-400 mt-3 text-sm">
                  {showAllProjects
                    ? `${projectsData.length} projenin tamamı gösteriliyor`
                    : `${Math.min(6, projectsData.length)} öncelikli proje gösteriliyor · Toplam ${projectsData.length} proje`
                  }
                </p>
              </div>
              {projectsData.length > 6 && (
                <button
                  onClick={() => setShowAllProjects(prev => !prev)}
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="flex-shrink-0 px-6 py-3 rounded-lg border border-[#00F5FF]/50 text-[#00F5FF] bg-[#00F5FF]/5 hover:bg-[#00F5FF] hover:text-[#0D0D0D] transition-all duration-300 font-semibold text-sm tracking-wide shadow-[0_0_15px_rgba(0,245,255,0.1)] hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] flex items-center gap-2 cursor-none"
                >
                  {showAllProjects ? (
                    <><span>↑</span> Küçült</>
                  ) : (
                    <><Search size={16} /> Tüm Projeleri Gör ({projectsData.length})</>
                  )}
                </button>
              )}
            </div>
          </SectionItem>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {(showAllProjects ? projectsData : projectsData.slice(0, 6)).map((project, index) => (
              <SectionItem key={index} delay={Math.min(index, 5) * 150}>
                
                {/* PROJE KARTI (Tıklanabilir yapıldı) */}
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-full flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#00F5FF]/50 hover:shadow-[0_0_25px_rgba(0,245,255,0.15)] transition-all duration-500 cursor-none"
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Üst görsel alan: resim varsa göster, yoksa gradient+icon */}
                  {project.image ? (
                    <div className="h-48 bg-[#111] relative overflow-hidden flex items-center justify-center">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative z-10 bg-black/40 p-4 rounded-full backdrop-blur-sm border border-white/5 group-hover:border-white/20 transition-all duration-500">
                        {project.icon}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #111827 50%, #0D0D0D 100%)' }}>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0,245,255,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,0,200,0.2) 0%, transparent 60%)' }} />
                      <div className="relative z-10 bg-black/40 p-5 rounded-full backdrop-blur-sm border border-white/10 group-hover:border-[#00F5FF]/30 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-500">
                        {project.icon}
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col relative z-10 bg-[#050505]">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-[#00F5FF] transition-colors pr-4">{project.title}</h3>
                      
                      {/* GitHub İkonu (Projeyi açmadan direkt GitHub'a gider) */}
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                      >
                        <GithubIcon size={20} />
                      </a>
                    </div>
                    {/* Proje kısa açıklama yazısı */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1 border-l-2 border-[#00F5FF]/20 pl-3">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="text-xs font-mono text-[#FF00C8] bg-[#FF00C8]/10 px-2 py-1 rounded border border-[#FF00C8]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionItem>
            ))}
          </div>

          {/* ✨ AI PROJE FİKİR MİMARI SECTION */}
          <SectionItem delay="300">
            <div className="relative p-1 rounded-2xl bg-gradient-to-r from-[#00F5FF]/50 to-[#FF00C8]/50 shadow-[0_0_30px_rgba(255,0,200,0.2)]">
              <div className="bg-[#050505] p-8 md:p-12 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                  <BrainCircuit size={100} className="text-[#FF00C8]" />
                </div>
                
                <h3 className="text-[#00F5FF] font-mono text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={16} /> 03. AI Entegrasyonu
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Proje Fikir Mimarı</h2>
                <p className="text-gray-400 mb-8 max-w-2xl relative z-10">
                  Bir sektör veya çözmek istediğiniz bir problem yazın. Gemini yapay zekası, yeteneklerimi kullanarak size özel fütüristik bir yazılım/oyun projesi önersin.
                </p>

                <div className="flex flex-col md:flex-row gap-4 relative z-10">
                  <input
                    type="text"
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                    placeholder="Örn: E-ticaret siteleri için müşteri tutma..."
                    className="flex-1 bg-white/5 border border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] rounded-lg px-6 py-4 text-white outline-none transition-all cursor-none"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  />
                  <button
                    onClick={handleGenerateIdea}
                    disabled={isGeneratingIdea}
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                    className="bg-[#00F5FF] text-[#0D0D0D] px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] cursor-none"
                  >
                    {isGeneratingIdea ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Fikir Üret</>}
                  </button>
                </div>

                {aiIdea && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-lg relative z-10 text-gray-300 leading-relaxed font-mono text-sm">
                    <span className="text-[#FF00C8] font-bold block mb-2">&gt; AI_YANITI:</span>
                    {aiIdea}
                  </div>
                )}
              </div>
            </div>
          </SectionItem>

        </section>

      </main>

      {/* FOOTER & SOCIAL */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 flex items-center gap-2">
            <span className="text-[#00F5FF]">&copy;</span> {new Date().getFullYear()} Affan Emirhan Çüçen. Tüm Hakları Saklıdır.
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/emrhnccn" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00F5FF] transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <GithubIcon size={22} />
            </a>
            <a href="https://linkedin.com/in/affanccn" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF00C8] transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <LinkedinIcon size={22} />
            </a>
            <a href="mailto:emrhn.ccn@gmail.com" className="text-gray-400 hover:text-[#00F5FF] transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <Mail size={22} />
            </a>
          </div>
        </div>
      </footer>

      {/* --- PROJE DETAY POPUP (MODAL) --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Arka plan karartması - Tıklanınca modülü kapatır */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
            onClick={() => setSelectedProject(null)}
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          ></div>
          
          {/* Modal İçeriği */}
          <div className="relative bg-[#050505] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.15)] animate-in fade-in zoom-in-95 duration-300 z-10 flex flex-col max-h-[90vh]">
             
             {/* Kapat Butonu */}
             <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors cursor-none"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
             >
               <X size={20} />
             </button>
             
             {/* Resim & Başlık Bölümü */}
             <div className="h-64 relative flex-shrink-0">
               <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
               <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <div className="p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white">
                    {selectedProject.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{selectedProject.title}</h2>
               </div>
             </div>
             
             {/* Detay & Buton Bölümü */}
             <div className="p-8 overflow-y-auto">
               <h3 className="text-[#00F5FF] font-mono text-sm mb-4">Proje Detayları_</h3>
               <p className="text-gray-300 leading-relaxed mb-8 text-lg">{selectedProject.longDesc}</p>
               
               <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-sm font-mono text-[#FF00C8] bg-[#FF00C8]/10 px-3 py-1 rounded border border-[#FF00C8]/20">{tag}</span>
                  ))}
               </div>
               
               {/* GitHub'a Git Butonu */}
               <div className="flex">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 bg-[#00F5FF]/10 hover:bg-[#00F5FF] border border-[#00F5FF]/50 text-[#00F5FF] hover:text-[#0D0D0D] px-6 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-3 cursor-none shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  >
                     <GithubIcon size={24} /> Projeyi GitHub'da İncele
                  </a>
               </div>
             </div>
          </div>
        </div>
      )}
      
    </div>
  );
}