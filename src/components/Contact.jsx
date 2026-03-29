import { motion } from 'framer-motion';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mhr.dp/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dipen-maharjan-b4a124330/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@dipenmaharjan6461',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 md:py-44 relative overflow-hidden"
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-white/10 to-transparent" />

      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="section-padding flex flex-col items-center text-center relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="divider" />
          <span className="font-mono text-xs tracking-ultra uppercase text-accent">Contact</span>
          <span className="divider" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light leading-none mb-8 max-w-4xl"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}
        >
          <span className="text-warm-white italic block">Let's Work</span>
          <span className="text-outline italic block">Together.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-mono text-sm text-muted tracking-wider max-w-md leading-relaxed mb-14"
        >
          Open for freelance projects, brand collaborations, and long-term creative partnerships. Let's make something memorable.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-16"
        >
          <a
            href="mailto:hello@alexmercer.com"
            className="btn-primary group"
            data-cursor="expand"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>hello@alexmercer.com</span>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-px h-12 bg-gradient-to-b from-warm-white/20 to-transparent mb-12"
        />

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-8"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex flex-col items-center gap-2 text-muted hover:text-warm-white transition-colors duration-300 group"
              data-cursor="expand"
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300">
                {social.icon}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
