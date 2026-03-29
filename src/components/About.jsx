import { motion } from 'framer-motion';

const skills = [
  'Video Editing', 'Color Grading', 'Motion Graphics',
  'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve',
  'Sound Design', 'Visual FX',
];

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '120+', label: 'Projects Delivered' },
  { value: '40+', label: 'Global Clients' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />

      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="divider" />
          <span className="font-mono text-xs tracking-ultra uppercase text-accent">About</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                alt="Dipen Maharjan — Video Editor"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl italic text-warm-white">Dipen Maharjan</p>
                <p className="font-mono text-xs tracking-widest uppercase mt-1 text-warm-white/70">Video Editor</p>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 w-24 h-24 border border-accent/20 pointer-events-none" />

            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                  className="p-4"
                  style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <p className="font-serif text-3xl font-light" style={{ color: 'var(--text)' }}>{stat.value}</p>
                  <p className="font-mono text-xs tracking-wider uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light italic leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
            >
              Crafting stories{' '}
              <span className="text-outline">frame by frame.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5 mb-12"
            >
              <p className="leading-relaxed text-base font-light" style={{ color: 'var(--text-muted-light)' }}>
                I'm an Ontario based video editor with over 8 years of experience crafting
                cinematic narratives. From documentary to high-fashion campaigns, I believe
                every frame has a story to tell.
              </p>
              <p className="leading-relaxed text-base font-light" style={{ color: 'var(--text-muted)' }}>
                My work spans short films, music videos, commercial campaigns, and branded
                content — always with an eye for rhythm, light, and emotional resonance.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
                — Expertise
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="font-mono text-xs tracking-wider px-4 py-2 transition-all duration-300 hover:text-accent"
                    style={{
                      color: 'var(--text-muted-light)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12"
            >
              <a href="#contact" className="btn-outline" data-cursor="expand">
                <span>View Showreel</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
