import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import all project files
import projectSettings from '../../content/projects/settings.json';
import project1 from '../../content/projects/ecommerce-platform.json';
import project2 from '../../content/projects/fitness-tracking-app.json';
import project3 from '../../content/projects/brand-identity-techstart.json';
import project4 from '../../content/projects/dashboard-analytics.json';
import project5 from '../../content/projects/food-delivery-app.json';
import project6 from '../../content/projects/saas-landing-page.json';

const Projects = () => {
  // Load projects from JSON files
  const projectsData = [project1, project2, project3, project4, project5, project6];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load categories from TinaCMS and add "All" filter automatically
  const categories = [
    { id: 'all', label: 'Tous' },
    ...projectSettings.categories
  ];

  // Load projects from TinaCMS content with IDs
  const projects = projectsData.map((project, index) => ({
    ...project,
    id: index + 1,
  }));

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Navigation functions
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;

      if (e.key === 'Escape') {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  // Reset image index when opening new project
  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
    }
  }, [selectedProject]);

  // Block body scroll and hide navigation when lightbox is open
  useEffect(() => {
    if (selectedProject) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Block scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Hide navigation completely
      const nav = document.querySelector('nav');
      if (nav) {
        nav.style.display = 'none';
      }

      return () => {
        // Restore scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Show navigation again
        if (nav) {
          nav.style.display = '';
        }

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedProject]);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            {projectSettings.subtitle}
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{projectSettings.title}</span>
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {projectSettings.description}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-graphite text-white/70 hover:text-white hover:bg-graphite/70'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-graphite to-charcoal border border-graphite hover:border-accent/30 transition-all duration-500 cursor-pointer h-[400px]"
            >
              {/* Project Image Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-graphite/40 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent opacity-90"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* Category Badge */}
                <span className="inline-block w-fit px-3 py-1 mb-3 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  {categories.find((c) => c.id === project.category)?.label}
                </span>

                {/* Title */}
                <h4 className="text-xl md:text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded text-white/60 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Click to view details hint */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-accent text-sm font-medium">
                    Cliquez pour voir les détails →
                  </span>
                </div>
              </div>

              {/* Hover Effect - Scale */}
              <motion.div
                className="absolute inset-0 border-2 border-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">
            Vous avez un projet en tête ?
          </p>
          <motion.button
            onClick={() => {
              const contact = document.querySelector('#contact');
              if (contact) contact.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discutons-en
          </motion.button>
        </motion.div>

        {/* Lightbox Gallery - Fullscreen */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] bg-deep-black flex flex-col"
              onClick={() => {
                setSelectedProject(null);
                setCurrentImageIndex(0);
              }}
            >
              {/* Header avec Close Button */}
              <div className="absolute top-0 left-0 right-0 z-[10000] flex items-center justify-between p-6 bg-gradient-to-b from-deep-black to-transparent">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-accent/90 backdrop-blur-sm rounded-full text-white text-sm font-semibold uppercase tracking-wider">
                    {categories.find((c) => c.id === selectedProject.category)?.label}
                  </span>
                  <span className="text-white/60 text-sm">
                    {currentImageIndex + 1} / {selectedProject.gallery.length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentImageIndex(0);
                  }}
                  className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-accent backdrop-blur-sm rounded-full transition-all duration-300"
                  aria-label="Close lightbox"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Main Image avec Navigation */}
              <div
                className="flex-1 relative flex items-center justify-center px-20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image principale avec animation */}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={selectedProject.gallery[currentImageIndex]}
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  className="max-h-[60vh] max-w-full object-contain"
                />

                {/* Navigation Arrows */}
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        previousImage();
                      }}
                      className="absolute left-6 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-accent backdrop-blur-sm rounded-full transition-all duration-300 group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-6 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-accent backdrop-blur-sm rounded-full transition-all duration-300 group"
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} className="text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Info & Thumbnails Section */}
              <div
                className="bg-gradient-to-t from-charcoal/95 to-transparent backdrop-blur-xl border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Project Info */}
                <div className="max-w-7xl mx-auto px-8 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Title & Description */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                        {selectedProject.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed mb-4">
                        {selectedProject.fullDescription}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col gap-3">
                      {selectedProject.link && (
                        <motion.a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink size={18} />
                          Voir le projet
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {selectedProject.gallery.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-accent scale-105'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                        whileHover={{ scale: index === currentImageIndex ? 1.05 : 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
