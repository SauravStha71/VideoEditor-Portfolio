import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllMedia, GALLERY_FOLDERS } from '../utils/cloudinary';

// ─── Individual media card ────────────────────────────────────────────────────
function MediaCard({ item, index, onOpen }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded]   = useState(false);
  const isVertical = item.height > item.width;

  const handleEnter = useCallback(() => {
    setHovered(true);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item.type]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [item.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: (index % 12) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`gallery-card ${isVertical ? 'gallery-card--vertical' : 'gallery-card--horizontal'}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(item)}
      data-cursor="expand"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}
      aria-label={`View ${item.type} from ${item.folder}`}
    >
      {/* Shimmer skeleton while loading */}
      {!loaded && <div className="gallery-shimmer" />}

      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.url}
          muted
          playsInline
          loop
          preload="metadata"
          poster={item.poster}
          onLoadedData={() => setLoaded(true)}
          className={`gallery-media ${loaded ? 'gallery-media--visible' : ''}`}
        />
      ) : (
        <img
          src={item.url}
          alt={`${item.folder} media`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`gallery-media ${loaded ? 'gallery-media--visible' : ''}`}
        />
      )}

      {/* Gradient overlay */}
      <div className="gallery-card__overlay" />

      {/* Hover content */}
      <div className={`gallery-card__info ${hovered ? 'gallery-card__info--visible' : ''}`}>
        <span className="gallery-card__folder">{item.folder}</span>
        <span className="gallery-card__type">
          {item.type === 'video' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
          {item.type}
        </span>
      </div>

      {/* Expand icon */}
      <motion.div
        className="gallery-card__expand"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox / modal ────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  const isVertical = item.height > item.width;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={`lightbox-content ${isVertical ? 'lightbox-content--vertical' : 'lightbox-content--horizontal'}`}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            src={item.url}
            controls
            muted
            playsInline
            preload="metadata"
            autoPlay
            className="lightbox-media"
          />
        ) : (
          <img src={item.url} alt={item.folder} className="lightbox-media" />
        )}

        {/* Footer */}
        <div className="lightbox-footer">
          <span className="lightbox-folder">{item.folder}</span>
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Folder filter pill ───────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`gallery-filter-pill ${active ? 'gallery-filter-pill--active' : ''}`}
    >
      {label}
    </button>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingGrid() {
  return (
    <div className="gallery-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`gallery-shimmer-card ${i % 3 === 0 ? 'gallery-card--vertical' : 'gallery-card--horizontal'}`}
        />
      ))}
    </div>
  );
}

// ─── Main Gallery component ──────────────────────────────────────────────────
export default function Gallery() {
  const [media,         setMedia]         = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [activeFilter,  setActiveFilter]  = useState('All');
  const [lightboxItem,  setLightboxItem]  = useState(null);

  // Fetch on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllMedia()
      .then((items) => {
        if (!cancelled) {
          setMedia(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Gallery fetch error:', err);
          setError(err.message ?? 'Failed to load media.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // Filter list
  const filters = ['All', ...GALLERY_FOLDERS];

  // Filtered + sorted media
  const displayed = media
    .filter((item) => activeFilter === 'All' || item.folder === activeFilter)
    .sort((a, b) => {
      const aV = a.height > a.width;
      const bV = b.height > b.width;
      if (aV && !bV) return -1;
      if (!aV && bV) return 1;
      return 0;
    });

  return (
    <section id="work" className="gallery-section section-padding">
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="gallery-header"
      >
        <div>
          <p className="gallery-eyebrow">— Selected Work</p>
          <h2 className="gallery-title">Gallery</h2>
        </div>
        <p className="gallery-desc">
          A curated selection of commercial, brand, and creative work — each
          crafted with intention and precision.
        </p>
      </motion.div>

      {/* ── Live indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="gallery-live"
      >
        <span className="gallery-live__dot" />
        <span className="gallery-live__label">Clients</span>
      </motion.div>

      {/* ── Folder filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="gallery-filters"
      >
        {filters.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          />
        ))}
      </motion.div>

      {/* ── States ── */}
      {loading && <LoadingGrid />}

      {error && !loading && (
        <div className="gallery-error">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>{error}</p>
          <p className="gallery-error__hint">
            Check your Cloudinary credentials or CORS settings.
          </p>
        </div>
      )}

      {!loading && !error && displayed.length === 0 && (
        <div className="gallery-empty">
          <p>No media found in the selected folder.</p>
        </div>
      )}

      {/* ── Media grid ── */}
      {!loading && !error && displayed.length > 0 && (
        <motion.div
          layout
          className="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((item, i) => (
              <MediaCard
                key={item.id}
                item={item}
                index={i}
                onOpen={setLightboxItem}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── CTA ── */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gallery-cta"
        >
          <a href="#contact" className="btn-outline" data-cursor="expand">
            <span>Start a Project</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
