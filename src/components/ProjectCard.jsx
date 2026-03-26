import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Col-span map per size
const sizeToColSpan = {
  large: 'md:col-span-7',
  medium: 'md:col-span-5',
  small: 'md:col-span-4',
  'medium-large': 'md:col-span-8',
  full: 'md:col-span-12',
  half: 'md:col-span-6',
};

// Height map per size
const sizeToHeight = {
  large: 'h-[380px] md:h-[520px]',
  medium: 'h-[380px] md:h-[520px]',
  small: 'h-[320px] md:h-[420px]',
  'medium-large': 'h-[320px] md:h-[420px]',
  full: 'h-[420px] md:h-[60vh]',
  half: 'h-[350px] md:h-[460px]',
};

export default function ProjectCard({ project, index }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`project-card col-span-12 ${sizeToColSpan[project.size]} group relative overflow-hidden ${sizeToHeight[project.size]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="expand"
    >
      {/* Background image / video */}
      <div className="absolute inset-0 bg-surface">
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={project.videoSrc}
            muted
            loop
            playsInline
            loading="lazy"
            className="w-full h-full object-cover"
            poster={project.thumb}
          />
        ) : (
          <img
            src={project.thumb}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 project-card-overlay" />

      {/* Dark hover overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className="project-number">{project.id}</span>
          {/* Tags */}
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-xs px-2 py-1 border border-warm-white/20 text-warm-white/50 tracking-wider transition-all duration-300 ${
                  isHovered ? 'opacity-100 border-warm-white/40 text-warm-white/80' : 'opacity-0'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
            {project.category}
          </p>
          <div className="flex items-end justify-between">
            <h3 className="font-serif text-3xl md:text-4xl font-light italic text-warm-white leading-tight">
              {project.title}
            </h3>

            {/* View Project button */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-warm-white"
            >
              <span className="font-mono text-xs tracking-widest uppercase hidden sm:block">
                View Project
              </span>
              <div className="w-8 h-8 border border-warm-white/50 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
