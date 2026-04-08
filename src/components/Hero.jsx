import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const roles = ['Video Editor', 'Motion Designer', 'Sound Designer'];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-texture noise-overlay"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, var(--vignette-end) 100%)' }}
      />

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
      />

      <motion.div style={{ y, opacity }}
        className="section-padding relative z-10 pt-28 sm:pt-32 pb-28 sm:pb-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 mb-8 sm:mb-10"
        >
          <span className="divider" />
          <span className="font-mono text-xs tracking-ultra uppercase text-accent">
            Portfolio — {new Date().getFullYear()}
          </span>
        </motion.div>

        <div className="overflow-hidden mb-1 sm:mb-4">
          <motion.h1
            initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight italic"
            style={{ fontSize: 'clamp(3rem, 12vw, 14rem)', color: 'var(--text-primary)' }}
          >
            Dipen
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10 sm:mb-14">
          <motion.h1
            initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight text-outline italic"
            style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
          >
            Maharjan
          </motion.h1>
        </div>

        {/* Rolling role text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mb-10 sm:mb-12"
        >
          <div className="overflow-hidden" style={{ height: 'clamp(2.8rem, 6vw, 5rem)' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic font-light leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                {roles[roleIndex].split(' ').map((word, i) => (
                  <span
                    key={i}
                    style={{
                      color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted-light)',
                      marginRight: '0.3em',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* View Work button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center sm:pr-20 md:pr-24 lg:pr-20 xl:pr-16"
        >
          <a href="#work" className="btn-outline group" data-cursor="expand">
            <span>View Work</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Location — mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center gap-2 mt-6 sm:hidden"
        >
          <svg className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-muted)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            Based in Toronto, Canada
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 sm:h-12"
          style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
        />
      </motion.div>

      {/* Corner label — desktop only */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 sm:bottom-10 right-4 sm:right-6 md:right-10 lg:right-16 xl:right-20 hidden sm:block z-10"
      >
        <p className="font-mono text-xs tracking-widest uppercase [writing-mode:vertical-rl] rotate-180" style={{ color: 'var(--text-muted)' }}>
          Based in Toronto, Canada
        </p>
      </motion.div>
    </section>
  );
}