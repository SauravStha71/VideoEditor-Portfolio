export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-warm-white/5 py-8 section-padding">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted tracking-wider">
          © {year} Alex Mercer. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-muted tracking-wider">
            Available for freelance
          </span>
        </div>
        <p className="font-mono text-xs text-muted/50 tracking-wider">
          Crafted with precision
        </p>
      </div>
    </footer>
  );
}
