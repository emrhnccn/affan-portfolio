import React, { useState, useEffect, useRef } from 'react';
import { 
  TerminalSquare, ChevronRight, 
  Code, ExternalLink, Mail, User, Monitor, Gamepad2, 
  MessageSquare, Database, LayoutDashboard, Cpu, Search, Sparkles, BrainCircuit, Loader2, FileText
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

// --- GEMINI API HELPER ---
const apiKey = "";
const callGeminiAPI = async (prompt, systemInstruction) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  const retries = [1000, 2000, 4000, 8000, 16000];

  for (let attempt = 0; attempt <= retries.length; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API Hatası');
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text || "Yanıt alınamadı.";
    } catch (error) {
      if (attempt === retries.length) throw error;
      await delay(retries[attempt]);
    }
  }
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
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
          const sysPrompt = "Sen Affan Emirhan Çüçen'in kişisel yapay zeka asistanısın. Affan; Full-Stack web geliştirme, Unity oyun programlama ve teknik SEO alanlarında uzman bir yazılım geliştiricidir. Ziyaretçilere kısa, samimi ve teknik bir dille cevap ver.";
          const response = await callGeminiAPI(query, sysPrompt);
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
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.1)]">
      <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400 font-mono flex items-center">
          <TerminalSquare size={14} className="mr-2" /> terminal@affanccn
        </div>
      </div>
      <div className="p-6 h-80 overflow-y-auto font-mono text-sm">
        {history.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'user' && <span className="text-[#00F5FF]">{line.text}</span>}
            {line.type === 'system' && <span className="text-[#FF00C8]">{line.text}</span>}
            {line.type === 'output' && <span className="text-gray-300 whitespace-pre-line leading-relaxed">{line.text}</span>}
            {line.type === 'error' && <span className="text-red-400">{line.text}</span>}
          </div>
        ))}
        <div className="flex items-center text-[#00F5FF] mt-2">
          <span>ziyaretci@affan:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 ml-2 font-mono focus:ring-0"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
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

      // Dönüş açılarını artırdık (daha fazla 3D hissi için 40 derece)
      const rotateX = -(mouseY / (window.innerHeight / 2)) * 40; 
      const rotateY = (mouseX / (window.innerWidth / 2)) * 40;

      setTilt({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // Boyutu w-32'den w-48/w-64'e çıkararak oldukça büyüttük
    // Perspective değerini 800px yaparak derinliği artırdık
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-10" style={{ perspective: '800px' }}>
      {/* Arka plan parlama efekti - biraz daha yoğunlaştırıldı */}
      <div className="absolute inset-0 bg-[#00F5FF]/30 rounded-full blur-[60px] animate-pulse" />
      
      {/* Resim Container'ı */}
      <img 
        ref={imgRef}
        src="/images/memoji.png"
        alt="Affan Memoji"
        className="relative w-full h-full object-contain"
        style={{ 
          // translateZ(40px) ile resmi ekrandan bize doğru "fırlatıyoruz" (Gerçek 3D)
          // scale(1.15) ile ekstra büyütüyoruz
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.15) translateZ(40px)`,
          transition: 'transform 0.15s ease-out',
          // Kusursuz bir 3D gölge efekti (Şeffaf PNG olduğunda mükemmel çalışır)
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

  // --- AI Feature States ---
  const [ideaInput, setIdeaInput] = useState('');
  const [aiIdea, setAiIdea] = useState(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const handleGenerateIdea = async () => {
    if (!ideaInput.trim()) return;
    setIsGeneratingIdea(true);
    setAiIdea(null);
    try {
      const prompt = `Şu sektör veya problem için yenilikçi bir yazılım/oyun projesi fikri üret: "${ideaInput}". Fikir, Affan'ın yeteneklerine (React, Node.js, Unity, AI Entegrasyonları) çok uygun, modern ve fütüristik olmalı. Çözümü 3-4 cümleyle açıkla.`;
      const sysPrompt = "Sen yaratıcı bir yazılım mimarı ve proje danışmanısın. Ziyaretçilere çok fütüristik, havalı ve yenilikçi projeler sunarsın.";
      const response = await callGeminiAPI(prompt, sysPrompt);
      setAiIdea(response);
    } catch (error) {
      setAiIdea("Fikir üretilirken bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const projectsData = [
    {
      title: "Gerçek Zamanlı Mesajlaşma",
      desc: "Socket.io kullanarak düşük gecikmeli (low-latency) anlık mesajlaşma altyapısı. MongoDB ile sohbet geçmişi modellemesi.",
      tags: ["Node.js", "Socket.io", "MongoDB", "Tailwind"],
      icon: <MessageSquare size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje1.png"
    },
    {
      title: "Restoran Rezervasyon Sistemi",
      desc: "Kapasite yönetimi sağlayan dinamik masa ve rezervasyon sistemi. İstemci tarafında anlık boş masa takibi.",
      tags: ["React", "Node.js", "Express"],
      icon: <LayoutDashboard size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje2.png"
    },
    {
      title: "KYK Yurt Otomasyonu",
      desc: "MySQL ile öğrenci, oda, kapasite ve yemekhane haklarını algoritmik olarak takip eden backend servisleri.",
      tags: ["Node.js", "MySQL", "RDBMS"],
      icon: <Database size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje3.png"
    },
    {
      title: "3D Co-op Bulmaca Oyunu",
      desc: "İki oyuncunun eşzamanlı etkileşimine dayalı 3D bulmaca mekanikleri. Rigidbody fiziği ile bellek optimizasyonu.",
      tags: ["Unity 3D", "C#", "Clean Code"],
      icon: <Gamepad2 size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje4.png"
    },
    {
      title: "Kampüs Temalı Match-3",
      desc: "Blender ile 3D/2D modellenmiş binalar, grid tabanlı Match-3 algoritmaları ve API senkronizasyonlu Leaderboard.",
      tags: ["Unity", "C#", "Blender"],
      icon: <Monitor size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#00F5FF] transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]" />,
      image: "/images/proje5.png"
    },
    {
      title: "AI & Veri Otomasyonları",
      desc: "LLM API entegrasyonuyla dinamik içerik üretimi ve Web Scraping ile operasyonel verimliliği artıran scriptler.",
      tags: ["LLM API", "Node.js", "Scraping"],
      icon: <Cpu size={40} className="text-gray-300 group-hover:scale-125 group-hover:text-[#FF00C8] transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,0,200,0.5)]" />,
      image: "/images/proje6.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EAEAEA] font-sans overflow-x-hidden selection:bg-[#00F5FF] selection:text-[#0D0D0D]">
      
      {/* Global Styles for Scrollbar & Background Grid */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0D0D0D; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #00F5FF; }
        
        .bg-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
        
        body { cursor: none; }
        a, button, input { cursor: none; }
      `}} />

      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#00F5FF] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-screen"
        style={{ 
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${isHovering ? 1.5 : 1})`,
          boxShadow: isHovering ? '0 0 20px #00F5FF' : '0 0 10px rgba(0,245,255,0.5)'
        }}
      />
      <div 
        className="fixed top-0 left-0 w-1 h-1 bg-[#FF00C8] rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />

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
                <div className="relative aspect-square rounded-xl bg-[#111] border border-white/10 overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-2xl">
                   <FileText size={80} className="text-gray-600 group-hover:scale-110 group-hover:text-[#00F5FF] transition-all duration-500 mb-6 relative z-10" />
                   <div className="text-center relative z-10">
                      <p className="text-white font-bold text-2xl mb-3 group-hover:text-[#00F5FF] transition-colors tracking-wide">Özgeçmiş (CV)</p>
                      <p className="text-[#FF00C8] font-mono text-sm flex items-center justify-center gap-2 bg-[#FF00C8]/10 px-4 py-2 rounded-full border border-[#FF00C8]/20 group-hover:bg-[#00F5FF]/10 group-hover:text-[#00F5FF] group-hover:border-[#00F5FF]/20 transition-all">
                        İncelemek için tıkla <ExternalLink size={16} />
                      </p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />
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
                <h2 className="text-4xl font-bold">Gerçek Zamanlı Sistemler & Oyun Mekanikleri.</h2>
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
            <div className="mb-16">
              <h3 className="text-[#00F5FF] font-mono text-sm mb-2">02. Seçilmiş Çalışmalar</h3>
              <h2 className="text-4xl font-bold">Öne Çıkan Projeler</h2>
            </div>
          </SectionItem>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {projectsData.map((project, index) => (
              <SectionItem key={index} delay={index * 150}>
                <div 
                  className="group relative h-full flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#00F5FF]/50 hover:shadow-[0_0_25px_rgba(0,245,255,0.15)] transition-all duration-500"
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="h-48 bg-[#111] relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative z-10 bg-black/40 p-4 rounded-full backdrop-blur-sm border border-white/5 group-hover:border-white/20 transition-all duration-500">
                      {project.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative z-10 bg-[#050505]">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold group-hover:text-[#00F5FF] transition-colors">{project.title}</h3>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <GithubIcon size={20} />
                      </a>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-1">
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
                    className="flex-1 bg-white/5 border border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] rounded-lg px-6 py-4 text-white outline-none transition-all"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  />
                  <button
                    onClick={handleGenerateIdea}
                    disabled={isGeneratingIdea}
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                    className="bg-[#00F5FF] text-[#0D0D0D] px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
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
            <a href="https://github.com/emrhnccn" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00F5FF] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <GithubIcon size={22} />
            </a>
            <a href="https://linkedin.com/in/affanccn" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF00C8] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <LinkedinIcon size={22} />
            </a>
            <a href="mailto:emrhn.ccn@gmail.com" className="text-gray-400 hover:text-[#00F5FF] transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <Mail size={22} />
            </a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}