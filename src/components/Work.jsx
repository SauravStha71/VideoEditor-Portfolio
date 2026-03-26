import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Work() {
  return (
    <section id="work" className="py-28 md:py-40 section-padding">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24"
      >
        <div>
          <p className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">
            — Selected Work
          </p>
          <h2 className="font-serif font-light italic leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            <span className="text-warm-white">Projects</span>
          </h2>
        </div>

        <p className="font-mono text-xs text-muted tracking-wider max-w-xs leading-relaxed">
          A curated selection of films, commercials, and creative projects — each crafted with intention and precision.
        </p>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex justify-center mt-16 md:mt-24"
      >
        <a href="#contact" className="btn-outline" data-cursor="expand">
          <span>Start a Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
