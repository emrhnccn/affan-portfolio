import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Window({
  id,
  title,
  icon,
  children,
  position,
  size,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const windowRef = useRef(null);
  const { theme, speed } = useTheme();
  const titleId = `window-title-${id}`;

  useEffect(() => {
    // Slight delay for mount animation
    const t = setTimeout(() => {
      setMounted(true);
      windowRef.current?.focus();
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const handleTitleMouseDown = useCallback((e) => {
    if (isMaximized || e.button !== 0) return;
    e.preventDefault();
    onFocus(id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [isMaximized, position, id, onFocus]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 120));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 80));
      onMove(id, { x: newX, y: newY });
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onMove]);

  const style = isMaximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100dvh - 48px)', zIndex }
    : {
        left: position.x,
        top: position.y,
        width: size.w,
        height: size.h,
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`app-window${isMaximized ? ' app-window--maximized' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      tabIndex={-1}
      onMouseDown={() => onFocus(id)}
      style={{
        ...style,
        position: 'fixed',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        borderRadius: isMaximized ? 0 : '10px',
        overflow: 'hidden',
        boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px ${theme.primary}18`,
        background: theme.windowBg,
        backdropFilter: 'blur(24px)',
        transform: mounted ? 'scale(1)' : 'scale(0.92)',
        opacity: mounted ? 1 : 0,
        transition: isDragging
          ? 'box-shadow 0.1s'
          : `transform ${speed?.ms || 180}ms cubic-bezier(0.34,1.56,0.64,1), opacity ${speed?.ms || 180}ms ease`,
      }}
    >
      {/* Title bar */}
      <div
        className="window-titlebar"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => onMaximize(id)}
        style={{
          height: '38px',
          minHeight: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          cursor: isDragging ? 'grabbing' : 'grab',
          background: theme.titleBar,
          borderBottom: `1px solid ${theme.primary}15`,
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {/* Window title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
          <span style={{ fontSize: '15px' }}>{icon}</span>
          <span id={titleId}>{title}</span>
        </div>

        {/* Window controls */}
        <div className="window-controls" style={{ display: 'flex', gap: '2px' }}>
          <button
            type="button"
            className="window-control"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            aria-label={`${title} penceresini küçült`}
            title="Küçült"
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: 'rgba(0,0,0,0)',
              transition: 'color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'transparent'}
          >
            <span aria-hidden="true" style={{
              width: '14px', height: '14px', borderRadius: '50%', background: '#FBBF24',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>─</span>
          </button>
          <button
            type="button"
            className="window-control"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            aria-label={`${title} penceresini ${isMaximized ? 'geri yükle' : 'büyüt'}`}
            title="Büyüt"
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: 'rgba(0,0,0,0)',
              transition: 'color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'transparent'}
          >
            <span aria-hidden="true" style={{
              width: '14px', height: '14px', borderRadius: '50%', background: '#34D399',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>⊞</span>
          </button>
          <button
            type="button"
            className="window-control"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            aria-label={`${title} penceresini kapat`}
            title="Kapat"
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: 'rgba(0,0,0,0)',
              transition: 'color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'transparent'}
          >
            <span aria-hidden="true" style={{
              width: '14px', height: '14px', borderRadius: '50%', background: '#F87171',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
