import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ── Security headers applied to both dev server and preview build ─────────────
// For production hosting, mirror these in your platform config:
//   Netlify  → public/_headers
//   Vercel   → vercel.json headers[]
//   Nginx    → add_header directives in server block
const securityHeaders = {
  // Prevent clickjacking — disallow embedding this page in any frame
  'X-Frame-Options': 'DENY',
  // Block MIME-type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Only send origin (no path) as Referer to third parties
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Disable unused browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  // Content Security Policy — restrict resource origins
  'Content-Security-Policy': [
    "default-src 'self'",
    // React needs inline scripts during dev; tighten for production
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://res.cloudinary.com",
    "media-src 'self' https://res.cloudinary.com",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:  { headers: securityHeaders },
  preview: { headers: securityHeaders },
})

