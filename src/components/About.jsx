import { motion } from 'framer-motion';

const skills = [
  'Video Editing',
  'Color Grading',
  'Motion Graphics',
  'Adobe Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Sound Design',
  'Visual FX',
];

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '120+', label: 'Projects Delivered' },
  { value: '40+', label: 'Global Clients' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-white/10 to-transparent" />

      <div className="section-padding">
        {/* Section label */}
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

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Image + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main portrait image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                alt="Alex Mercer — Video Editor"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Name label at bottom */}
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl italic text-warm-white">Alex Mercer</p>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mt-1">
                  Video Editor
                </p>
              </div>
            </div>

            {/* Accent border decoration */}
            <div className="absolute -top-3 -right-3 w-24 h-24 border border-accent/20 pointer-events-none" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                  className="bg-surface border border-warm-white/5 p-4"
                >
                  <p className="font-serif text-3xl font-light text-warm-white">{stat.value}</p>
                  <p className="font-mono text-xs text-muted tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + skills */}
          <div className="flex flex-col justify-center">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light italic leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              <span className="text-warm-white">Crafting stories </span>
              <span className="text-outline">frame by frame.</span>
            </motion.h2>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5 mb-12"
            >
              <p className="text-muted-light leading-relaxed text-base font-light">
                I'm a New York-based video editor with over 8 years of experience crafting
                cinematic narratives. From documentary to high-fashion campaigns, I believe
                every frame has a story to tell.
              </p>
              <p className="text-muted leading-relaxed text-base font-light">
                My work spans short films, music videos, commercial campaigns, and branded
                content — always with an eye for rhythm, light, and emotional resonance.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
                — Expertise
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="font-mono text-xs tracking-wider text-muted-light border border-warm-white/10 px-4 py-2 hover:border-accent/40 hover:text-warm-white transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Download reel */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12"
            >
              <a
                href="#contact"
                className="btn-outline"
                data-cursor="expand"
              >
                <span>View Showreel</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
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
