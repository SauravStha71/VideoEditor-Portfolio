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
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #0a0a0a 100%)'
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
        className="section-padding relative z-10 pt-32 pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="divider" />
          <span className="font-mono text-xs tracking-ultra uppercase text-muted">
            Portfolio — 2026
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight"
            style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
          >
            <span className="text-warm-white italic">Dipen</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-none tracking-tight"
            style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
          >
            <span className="text-outline italic">Maharjan</span>
          </motion.h1>
        </div>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-4"
        >
          <p className="font-mono text-sm tracking-widest uppercase text-muted max-w-xs">
            Video Editor & Visual Storyteller
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="btn-outline group"
              data-cursor="expand"
            >
              <span>View Work</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Corner label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 right-6 md:right-12 lg:right-20 xl:right-28"
      >
        <p className="font-mono text-xs text-muted tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
          Based in Ontario, Canada
        </p>
      </motion.div>
    </section>
  );
}
