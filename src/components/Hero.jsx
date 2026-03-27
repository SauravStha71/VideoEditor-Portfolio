import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-texture noise-overlay"
    >
      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #0a0a0a 100%)',
        }}
      />

      {/* Accent line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
      />

      <motion.div
        style={{ y, opacity }}
        className="section-padding relative z-10 pt-28 sm:pt-32 pb-32 sm:pb-40"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 mb-8 sm:mb-10"
        >
          <span className="divider" />
          <span className="font-mono text-xs tracking-ultra uppercase text-muted">
            Portfolio — 2026
          </span>
        </motion.div>

        {/* Heading — first name */}
        <div className="overflow-hidden mb-1 sm:mb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
          >
            <span className="text-warm-white italic">Dipen</span>
          </motion.h1>
        </div>

        {/* Heading — last name */}
        <div className="overflow-hidden mb-8 sm:mb-10">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
          >
            <span className="text-outline italic">Maharjan</span>
          </motion.h1>
        </div>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8 mt-2"
        >
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-muted max-w-xs">
            Video Editor &amp; Visual Storyteller
          </p>

          <div className="flex items-center gap-6 sm:pr-20 md:pr-24 lg:pr-16 xl:pr-12">
            <a href="#work" className="btn-outline group" data-cursor="expand">
              <span>View Work</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Location — visible inline ONLY on mobile (below subtitle row) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center gap-3 mt-6 sm:hidden"
        >
          <svg
            className="w-3 h-3 text-muted flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
            />
          </svg>
          <span className="font-mono text-xs tracking-widest uppercase text-muted">
            Based in Ontario, Canada
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 sm:h-12 bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>

      {/* Corner label — vertical, RIGHT side, desktop only (sm and up) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 sm:bottom-10
                   right-4 sm:right-6 md:right-10 lg:right-16 xl:right-20
                   hidden sm:block z-10"
      >
        <p className="font-mono text-xs text-muted tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
          Based in Ontario, Canada
        </p>
      </motion.div>
    </section>
  );
}
