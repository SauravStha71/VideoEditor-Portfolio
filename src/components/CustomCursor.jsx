import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleElementHoverIn = () => setIsHovering(true);
    const handleElementHoverOut = () => setIsHovering(false);

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor="expand"], .project-card, input, textarea'
    );

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHoverIn);
      el.addEventListener('mouseleave', handleElementHoverOut);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ring lerp animation
    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1);

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHoverIn);
        el.removeEventListener('mouseleave', handleElementHoverOut);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Re-bind hover listeners when DOM changes
  useEffect(() => {
    const rebind = () => {
      const handleIn = () => setIsHovering(true);
      const handleOut = () => setIsHovering(false);
      const els = document.querySelectorAll(
        'a, button, [data-cursor="expand"], .project-card, input, textarea'
      );
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleIn);
        el.addEventListener('mouseleave', handleOut);
      });
    };
    const observer = new MutationObserver(rebind);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering ? 'expanded' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'expanded' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
