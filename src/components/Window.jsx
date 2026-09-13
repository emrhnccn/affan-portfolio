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
  const titleBarRef = useRef(null);
  const { theme, speed, glass } = useTheme();
  const titleId = `window-title-${id}`;

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      windowRef.current?.focus();
    }, 10);
    return () => clearTimeout(t);
  }, []);

  // Handle pointer down on the titlebar
  const handlePointerDown = useCallback((e) => {
    if (isMaximized) return;
    // Only primary pointer button (left click or touch)
    if (e.button !== undefined && e.button !== 0) return;

    onFocus(id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if setPointerCapture is unsupported
    }
  }, [isMaximized, onFocus, id, position]);

  // Handle pointer move while dragging
  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    const taskbarHeight = 48;
    const titleHeight = 38;

    // Strict boundary clamping so the titlebar stays comfortably within the viewport
    const maxX = Math.max(0, window.innerWidth - 100);
    const maxY = Math.max(0, window.innerHeight - taskbarHeight - titleHeight);

    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, maxX));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, maxY));

    onMove(id, { x: newX, y: newY });
  }, [isDragging, dragOffset, id, onMove]);

  // Handle pointer up
  const handlePointerUp = useCallback((e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Fallback
    }
  }, [isDragging]);

  // Keyboard shortcut listener on active window dialog
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose(id);
    } else if (e.altKey && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      onMinimize(id);
    }
  }, [id, onClose, onMinimize]);

  // Window geometry styles
  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100dvh - 48px)',
        zIndex,
        borderRadius: 0,
      }
    : {
        left: Math.max(0, Math.min(position.x, window.innerWidth - 100)),
        top: Math.max(0, Math.min(position.y, window.innerHeight - 86)),
        width: size.w,
        height: size.h,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100dvh - 64px)',
        zIndex,
        borderRadius: '12px',
      };

  return (
    <div
      ref={windowRef}
      className={`app-window${isMaximized ? ' app-window--maximized' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onPointerDown={() => onFocus(id)}
      style={{
        ...windowStyle,
        position: 'fixed',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: `0 25px 60px rgba(0,0,0,0.85), 0 0 0 1px ${theme.primary}25`,
        background: theme.windowBg,
        backdropFilter: `blur(${glass?.blur || '28px'})`,
        WebkitBackdropFilter: `blur(${glass?.blur || '28px'})`,
        transform: mounted ? 'scale(1)' : 'scale(0.94)',
        opacity: mounted ? 1 : 0,
        transition: isDragging
          ? 'none'
          : `transform ${speed?.ms || 180}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${speed?.ms || 180}ms ease`,
      }}
    >
      {/* Title Bar with Pointer Event Listeners */}
      <div
        ref={titleBarRef}
        className="window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
          borderBottom: `1px solid ${theme.primary}18`,
          userSelect: 'none',
          touchAction: 'none',
          flexShrink: 0,
        }}
      >
        {/* Title & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#f1f5f9', fontWeight: 600 }}>
          <span style={{ fontSize: '15px' }} aria-hidden="true">{icon}</span>
          <span id={titleId}>{title}</span>
        </div>

        {/* Window Controls */}
        <div className="window-controls" style={{ display: 'flex', gap: '4px' }}>
          {/* Minimize button */}
          <button
            type="button"
            className="window-control"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            aria-label={`${title} penceresini küçült`}
            title="Küçült (Alt+M)"
          >
            <span aria-hidden="true" style={{
              width: '13px', height: '13px', borderRadius: '50%', background: '#FBBF24',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#78350f', fontWeight: 800
            }}>─</span>
          </button>

          {/* Maximize / Restore button */}
          <button
            type="button"
            className="window-control"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            aria-label={`${title} penceresini ${isMaximized ? 'geri yükle' : 'tam ekran yap'}`}
            title={isMaximized ? 'Geri Yükle' : 'Tam Ekran'}
          >
            <span aria-hidden="true" style={{
              width: '13px', height: '13px', borderRadius: '50%', background: '#34D399',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#064e3b', fontWeight: 800
            }}>⊞</span>
          </button>

          {/* Close button */}
          <button
            type="button"
            className="window-control"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            aria-label={`${title} penceresini kapat`}
            title="Kapat (Esc)"
          >
            <span aria-hidden="true" style={{
              width: '13px', height: '13px', borderRadius: '50%', background: '#F87171',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#7f1d1d', fontWeight: 800
            }}>✕</span>
          </button>
        </div>
      </div>

      {/* Content Area - Pointer events disabled during drag to prevent iframe swallowing */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}>
        {children}
      </div>
    </div>
  );
}
