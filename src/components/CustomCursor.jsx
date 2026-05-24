import { useEffect, useRef } from 'react';

/**
 * CustomCursor — ref-only implementation.
 *
 * Performance fix: cursor position is set via transform:translate instead of
 * left/top. This keeps all cursor movement on the GPU compositor thread —
 * no layout recalculation happens at 60fps, eliminating a major source of
 * main-thread jitter.
 *
 * Mobile fix: On touch / coarse-pointer devices this component renders nothing
 * and registers zero listeners. Detection uses the CSS `pointer: coarse` media
 * feature — more reliable than screen width because it reflects the actual
 * input device type rather than display dimensions.
 */
export default function CustomCursor() {
  // Evaluated synchronously at render time — not a hook, so hook order is safe.
  // `pointer: coarse` = finger/stylus input (phones, tablets).
  // `maxTouchPoints` is the SSR / legacy-browser fallback.
  const isTouch =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0);

  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Touch devices: bail out immediately — no listeners, no RAF loop.
    if (isTouch) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── State (plain object, no React state) ──────────────────────────────
    const st = { x: -200, y: -200, rx: -200, ry: -200, visible: false, hovering: false, pressing: false };

    const HOVER_SEL = 'a, button, [data-cursor="expand"], input, textarea, label, select';
    const lerp = (a, b, t) => a + (b - a) * t;

    // ── Apply current state to DOM ────────────────────────────────────────
    const flush = () => {
      dot.style.opacity  = st.visible ? '1' : '0';
      ring.style.opacity = st.visible ? '1' : '0';

      const expand = st.hovering || st.pressing;
      dot.classList.toggle('expanded', expand);
      ring.classList.toggle('expanded', expand);

      const scale = st.pressing ? ' scale(0.5)' : '';
      dot.style.transform = `translate(calc(${st.x}px - 50%), calc(${st.y}px - 50%))${scale}`;
    };

    // ── Event handlers ────────────────────────────────────────────────────
    const onMove = (e) => {
      st.x = e.clientX;
      st.y = e.clientY;
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;

      const nowHovering = !!e.target.closest(HOVER_SEL);
      const changed = nowHovering !== st.hovering || !st.visible;
      st.hovering = nowHovering;
      st.visible  = true;
      if (changed) flush();
    };

    const onEnter  = () => { st.visible  = true;  flush(); };
    const onLeave  = () => { st.visible  = false; flush(); };
    const onDown   = () => { st.pressing = true;  flush(); };
    const onUp     = () => { st.pressing = false; flush(); };

    // ── Ring lerp animation loop ──────────────────────────────────────────
    let raf;
    const animate = () => {
      st.rx = lerp(st.rx, st.x, 0.14);
      st.ry = lerp(st.ry, st.y, 0.14);
      const ringScale = st.pressing ? ' scale(0.82)' : '';
      ring.style.transform = `translate(calc(${st.rx}px - 50%), calc(${st.ry}px - 50%))${ringScale}`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // ── Register ─────────────────────────────────────────────────────────
    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  // On touch devices render nothing — cursor DOM nodes don't exist so they
  // can never linger, get stuck, or interfere with touch interactions.
  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
