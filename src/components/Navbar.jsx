import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
      className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-300"
      style={{ color: 'var(--text-muted)' }}
    >
      <span
        className="relative inline-flex w-10 h-5 rounded-full border transition-colors duration-400 flex-shrink-0"
        style={{
          background: isDark ? 'rgba(201,169,110,0.2)' : 'rgba(10,10,8,0.12)',
          borderColor: isDark ? 'rgba(201,169,110,0.4)' : 'rgba(10,10,8,0.25)',
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-400 flex items-center justify-center"
          style={{
            background: isDark ? '#c9a96e' : '#0f0f0d',
            transform: isDark ? 'translateX(0)' : 'translateX(20px)',
          }}
        >
          {isDark ? (
            /* Moon icon */
            <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            /* Sun icon */
            <svg width="9" height="9" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </span>
      </span>
      <span className="hidden lg:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--bg-nav)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <nav className="section-padding flex items-center justify-between py-6">
          {/* Logo */}
          <a href="#" className="font-serif text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            DM<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: 'var(--text-muted-light)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted-light)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side — availability + toggle */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                Available for work
              </span>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile — toggle + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`}
                style={{ background: 'var(--text-primary)' }} />
              <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`}
                style={{ background: 'var(--text-primary)' }} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-12"
            style={{ background: 'var(--bg-page)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
                className="font-serif text-5xl italic transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={e => e.target.style.color = '#c9a96e'}
                onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
