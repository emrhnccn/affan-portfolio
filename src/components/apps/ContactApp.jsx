import { useState } from 'react';
import { Mail, Send, Inbox, FileText, Star, Trash2, Copy, Check } from 'lucide-react';

const CONTACT_EMAIL = 'emrhn.ccn@gmail.com';
const EMPTY_FORM = { name: '', email: '', subject: '', body: '' };

const INBOX_MESSAGES = [
  {
    id: 1, from: 'GitHub Notifications', subject: 'New star on your repo ⭐',
    preview: 'emrhnccn/affan-portfolio received a new star from a developer.',
    body: 'emrhnccn/affan-portfolio\n\nYour repository just received a new ⭐ star from a visitor!\n\nView your repository: https://github.com/emrhnccn/affan-portfolio',
    time: '10:24', read: false, starred: false,
  },
  {
    id: 2, from: 'LinkedIn', subject: 'Biri profilinizi görüntüledi',
    preview: 'Bir işe alım uzmanı profilinizi görüntüledi.',
    body: 'Merhaba Affan Emirhan,\n\nBir işe alım uzmanı profilinizi görüntüledi.\n\nProfil görüntülemelerinizi görmek için LinkedIn\'i ziyaret edin.',
    time: 'Dün', read: true, starred: true,
  },
  {
    id: 3, from: 'System', subject: 'AffanOS güncellemesi hazır',
    preview: 'DeveloperOS v1.1 kullanılabilir.',
    body: 'AffanOS v1.1 Güncelleme Notları:\n\n• Ayarlar uygulaması eklendi\n• Tarayıcı uygulaması eklendi\n• Ses efektleri eklendi\n• Tema sistemi geliştirildi\n\nGüncellemek için Terminal\'i açın.',
    time: '2g', read: true, starred: false,
  },
];

const DRAFT_MESSAGES = [
  {
    id: 10, from: 'Ben', subject: 'İş birliği teklifi [Taslak]',
    preview: 'Merhaba, seninle bir proje üzerinde...',
    body: 'Merhaba,\n\nSeninle bir proje üzerinde çalışmak istiyorum...',
    time: 'Bugün', read: true, starred: false, isDraft: true,
  },
];

const SENT_MESSAGES = [];
const IMPORTANT_MESSAGES = INBOX_MESSAGES.filter(m => m.starred);
const TRASH_MESSAGES = [];

const FOLDER_MAP = {
  'Gelen Kutusu': INBOX_MESSAGES,
  'Önemli': IMPORTANT_MESSAGES,
  'Gönderilmiş': SENT_MESSAGES,
  'Taslaklar': DRAFT_MESSAGES,
  'Çöp Kutusu': TRASH_MESSAGES,
};

const FOLDER_COUNTS = {
  'Gelen Kutusu': INBOX_MESSAGES.filter(m => !m.read).length,
  'Önemli': 0,
  'Gönderilmiş': 0,
  'Taslaklar': DRAFT_MESSAGES.length,
  'Çöp Kutusu': 0,
};

const SIDEBAR_ITEMS = [
  { icon: Inbox,    label: 'Gelen Kutusu' },
  { icon: Star,     label: 'Önemli' },
  { icon: Send,     label: 'Gönderilmiş' },
  { icon: FileText, label: 'Taslaklar' },
  { icon: Trash2,   label: 'Çöp Kutusu' },
];

export default function ContactApp() {
  const [activeFolder, setActiveFolder] = useState('Gelen Kutusu');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [composing, setComposing] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sendState, setSendState] = useState('idle');
  const [copyState, setCopyState] = useState('idle');

  const currentMessages = FOLDER_MAP[activeFolder] || [];

  const handleFolderChange = (label) => {
    setActiveFolder(label);
    setSelectedMsg(null);
    setComposing(false);
  };

  const handleSelectMsg = (msg) => {
    if (msg.isDraft) {
      setForm({
        ...EMPTY_FORM,
        subject: msg.subject.replace(' [Taslak]', ''),
        body: msg.body,
      });
      setSendState('idle');
      setCopyState('idle');
      setComposing(true);
      setSelectedMsg(null);
    } else {
      setSelectedMsg(msg);
    }
  };

  const openComposer = (nextForm = EMPTY_FORM) => {
    setForm(nextForm);
    setSendState('idle');
    setCopyState('idle');
    setComposing(true);
    setSelectedMsg(null);
  };

  const updateFormField = (field, value) => {
    setForm(currentForm => ({ ...currentForm, [field]: value }));
    setSendState('idle');
  };

  const handleSend = (event) => {
    event.preventDefault();

    const emailBody = [
      `Merhaba Affan Emirhan,`,
      '',
      form.body.trim(),
      '',
      '---',
      `Gönderen: ${form.name.trim()}`,
      `Yanıt e-postası: ${form.email.trim()}`,
    ].join('\n');
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(emailBody)}`;

    setSendState('draft-opened');
    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <div className="contact-app" style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div className="contact-sidebar" style={{
        width: '180px', flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(255,255,255,0.02)',
        padding: '12px 0',
      }}>
        <div className="contact-demo-label" style={{
          padding: '0 14px 10px',
          color: '#475569', fontSize: '9px', fontFamily: 'monospace',
          letterSpacing: '0.08em',
        }}>
          ÖRNEK POSTA KUTUSU
        </div>
        <button
          type="button"
          className="contact-compose-launch"
          onClick={() => openComposer()}
          style={{
            margin: '0 12px 16px',
            padding: '10px', borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,200,0.15))',
            border: '1px solid rgba(0,245,255,0.3)',
            color: '#00F5FF', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '6px', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(255,0,200,0.25))'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,200,0.15))'}
        >
          <Mail size={15} /> Yeni Mesaj
        </button>

        {SIDEBAR_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeFolder === item.label;
          const count = FOLDER_COUNTS[item.label] || 0;
          return (
            <button
              type="button"
              className="contact-folder-button"
              key={item.label}
              onClick={() => handleFolderChange(item.label)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 16px', border: 'none',
                background: isActive ? 'rgba(0,245,255,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid #00F5FF' : '2px solid transparent',
                color: isActive ? '#00F5FF' : '#64748b',
                fontSize: '13px', cursor: 'pointer', width: '100%',
                textAlign: 'left', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#94a3b8'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#64748b'; }}
            >
              <Icon size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {count > 0 && (
                <span style={{
                  background: '#00F5FF', color: '#000',
                  borderRadius: '10px', padding: '1px 6px',
                  fontSize: '10px', fontWeight: 700,
                }}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Message list */}
      {!composing && (
        <div className="contact-message-list" style={{
          width: '240px', flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace',
            background: 'rgba(255,255,255,0.02)',
            flexShrink: 0,
          }}>
            Örnek {activeFolder} — {currentMessages.length} mesaj
          </div>

          {currentMessages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <p style={{ color: '#334155', fontSize: '12px', textAlign: 'center' }}>Bu klasör boş.</p>
            </div>
          ) : (
            currentMessages.map(msg => (
              <button
                type="button"
                key={msg.id}
                onClick={() => handleSelectMsg(msg)}
                aria-label={`${msg.subject} mesajını aç`}
                style={{
                  width: '100%', border: 'none', textAlign: 'left',
                  padding: '12px 14px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  background: selectedMsg?.id === msg.id
                    ? 'rgba(0,245,255,0.07)'
                    : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (selectedMsg?.id !== msg.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (selectedMsg?.id !== msg.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: msg.read ? '#94a3b8' : '#e2e8f0', fontSize: '12px', fontWeight: msg.read ? 400 : 600 }}>
                    {msg.from}
                  </span>
                  <span style={{ color: '#475569', fontSize: '11px' }}>{msg.time}</span>
                </div>
                <div style={{ color: msg.read ? '#64748b' : '#94a3b8', fontSize: '12px', fontWeight: msg.read ? 400 : 600, marginBottom: '2px' }}>
                  {msg.subject}
                </div>
                <div style={{ color: '#475569', fontSize: '11px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {msg.preview}
                </div>
                {msg.isDraft && (
                  <span style={{
                    display: 'inline-block', marginTop: '4px',
                    fontSize: '10px', color: '#facc15',
                    background: 'rgba(250,204,21,0.1)', borderRadius: '4px', padding: '1px 6px',
                  }}>Taslak</span>
                )}
              </button>
            ))
          )}
        </div>
      )}

      {/* Content area */}
      <div className="contact-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {composing ? (
          /* Compose */
          <form
            onSubmit={handleSend}
            aria-labelledby="contact-compose-title"
            style={{
              flex: 1, padding: '20px', display: 'flex', flexDirection: 'column',
              gap: '12px', overflowY: 'auto',
            }}
          >
            <div>
              <h2
                id="contact-compose-title"
                style={{
                  color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace',
                  fontWeight: 500, margin: '0 0 5px',
                }}
              >
                Yeni Mesaj
              </h2>
              <p style={{ color: '#64748b', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
                Bilgileriniz e-posta uygulamanızda bir taslağa dönüştürülür.
                Gönderimi e-posta uygulamanızda siz tamamlarsınız.
              </p>
            </div>

            <div
              style={{
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px',
              }}
            >
              <span style={{ color: '#475569', fontSize: '12px' }}>Alıcı:</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ color: '#00F5FF', fontSize: '12px', textDecoration: 'none' }}
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`${CONTACT_EMAIL} adresini kopyala`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '5px 8px', borderRadius: '6px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: copyState === 'copied' ? '#4ade80' : '#64748b',
                  fontSize: '11px', cursor: 'pointer',
                }}
              >
                {copyState === 'copied'
                  ? <Check size={12} aria-hidden="true" />
                  : <Copy size={12} aria-hidden="true" />}
                {copyState === 'copied' ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="contact-name" style={{ color: '#64748b', fontSize: '12px' }}>
                Adınız
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={event => updateFormField('name', event.target.value)}
                placeholder="Adınız ve soyadınız"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px',
                  padding: '9px 10px', color: '#e2e8f0', fontSize: '12px',
                  fontFamily: 'inherit', cursor: 'text',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="contact-email" style={{ color: '#64748b', fontSize: '12px' }}>
                E-posta adresiniz
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={event => updateFormField('email', event.target.value)}
                placeholder="ornek@eposta.com"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px',
                  padding: '9px 10px', color: '#e2e8f0', fontSize: '12px',
                  fontFamily: 'inherit', cursor: 'text',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="contact-subject" style={{ color: '#64748b', fontSize: '12px' }}>
                Konu
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={event => updateFormField('subject', event.target.value)}
                placeholder="Mesajınızın konusu"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px',
                  padding: '9px 10px', color: '#e2e8f0', fontSize: '12px',
                  fontFamily: 'inherit', cursor: 'text',
                }}
              />
            </div>

            <div style={{ display: 'flex', flex: 1, minHeight: '150px', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="contact-message" style={{ color: '#64748b', fontSize: '12px' }}>
                Mesajınız
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={form.body}
                onChange={event => updateFormField('body', event.target.value)}
                placeholder="Mesajınızı yazın..."
                style={{
                  flex: 1, minHeight: '120px', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                  padding: '12px', color: '#e2e8f0', fontSize: '13px',
                  resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit', cursor: 'text',
                }}
              />
            </div>

            <div aria-live="polite" role="status" style={{ minHeight: '18px' }}>
              {sendState === 'draft-opened' && (
                <p style={{ color: '#4ade80', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
                  E-posta taslağı açma isteği gönderildi. Gönderimi e-posta uygulamanızda tamamlayın.
                </p>
              )}
              {copyState === 'failed' && (
                <p style={{ color: '#facc15', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
                  Adres otomatik kopyalanamadı. Yukarıdaki e-posta bağlantısını kullanabilirsiniz.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '10px 20px', borderRadius: '8px',
                  background: 'rgba(0,245,255,0.12)',
                  border: '1px solid rgba(0,245,255,0.3)', color: '#00F5FF',
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <Send size={14} aria-hidden="true" />
                E-posta Taslağını Aç
              </button>
              <button
                type="button"
                onClick={() => {
                  setComposing(false);
                  setForm(EMPTY_FORM);
                  setSendState('idle');
                  setCopyState('idle');
                }}
                style={{
                  padding: '10px 16px', borderRadius: '8px', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)', color: '#64748b', fontSize: '13px', cursor: 'pointer',
                }}
              >
                İptal
              </button>
            </div>
          </form>
        ) : selectedMsg ? (
          /* Message detail */
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <h2 style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 600, margin: '0 0 12px' }}>
              {selectedMsg.subject}
            </h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #00F5FF22, #FF00C822)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,245,255,0.2)',
                fontSize: '16px', flexShrink: 0,
              }}>
                {selectedMsg.from[0]}
              </div>
              <div>
                <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>{selectedMsg.from}</div>
                <div style={{ color: '#475569', fontSize: '12px' }}>Kime: ben@affanos.dev · {selectedMsg.time}</div>
              </div>
              {selectedMsg.starred && <span style={{ marginLeft: 'auto', fontSize: '16px' }}>⭐</span>}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {selectedMsg.body}
            </p>
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => openComposer({
                  ...EMPTY_FORM,
                  subject: `Re: ${selectedMsg.subject}`,
                  body: `\n\n---\nGönderen: ${selectedMsg.from}\n${selectedMsg.body}`,
                })}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '8px',
                  background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)',
                  color: '#00F5FF', fontSize: '12px', cursor: 'pointer',
                }}
              >
                ↩ Yanıtla
              </button>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Mail size={48} color="#1e293b" />
            <p style={{ color: '#334155', fontSize: '14px', margin: 0 }}>
              {currentMessages.length > 0 ? 'Bir mesaj seçin' : 'Bu klasör boş'}
            </p>
            <button
              type="button"
              onClick={() => openComposer()}
              style={{
                padding: '10px 24px', borderRadius: '8px',
                background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)',
                color: '#00F5FF', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              ✉️ Mesaj Yaz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
