export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 section-padding" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>
          © {year} Dipen Maharjan. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Available for freelance
          </span>
        </div>
        <p className="font-mono text-xs tracking-wider" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Crafted with precision
        </p>
      </div>
    </footer>
  );
}
