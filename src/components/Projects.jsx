import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'web', label: 'Web Design' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'branding', label: 'Branding' },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      description: 'Interface moderne pour une plateforme de vente en ligne',
      fullDescription: 'Conception complète d\'une plateforme e-commerce moderne avec focus sur l\'expérience utilisateur. Intégration de filtres avancés, panier intelligent, et processus de checkout optimisé. Design responsive avec animations subtiles pour guider l\'utilisateur.',
      tags: ['Figma', 'React', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'Application mobile de suivi d\'activité physique',
      fullDescription: 'Application mobile native pour tracker les activités sportives en temps réel. Interface intuitive avec graphiques de progression, défis communautaires, et intégration avec appareils fitness. Design minimaliste centré sur les données importantes.',
      tags: ['UI/UX', 'React Native', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Brand Identity - TechStart',
      category: 'branding',
      description: 'Identité visuelle complète pour startup tech',
      fullDescription: 'Création d\'une identité de marque complète pour une startup technologique. Développement du logo, palette de couleurs, typographie, et guidelines de marque. Design system cohérent appliqué sur tous les supports digitaux et print.',
      tags: ['Illustrator', 'Brand Strategy', 'Logo Design'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      category: 'web',
      description: 'Tableau de bord interactif pour analyse de données',
      fullDescription: 'Dashboard analytique complexe avec visualisations de données en temps réel. Interface personnalisable avec widgets drag-and-drop, graphiques interactifs D3.js, et exports automatisés. Optimisé pour traiter de grands volumes de données.',
      tags: ['Vue.js', 'D3.js', 'API'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'Food Delivery App',
      category: 'mobile',
      description: 'Expérience utilisateur optimisée pour livraison de repas',
      fullDescription: 'Application de livraison de repas avec géolocalisation en temps réel. Système de commande simplifié, recommendations personnalisées par IA, et suivi de livreur en direct. Tests utilisateurs approfondis pour optimiser le parcours de commande.',
      tags: ['Figma', 'Prototyping', 'User Testing'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
    },
    {
      id: 6,
      title: 'SaaS Landing Page',
      category: 'web',
      description: 'Landing page convertissante pour produit SaaS',
      fullDescription: 'Landing page haute conversion pour un produit SaaS B2B. Copywriting optimisé, hiérarchie visuelle claire, et CTAs stratégiquement placés. Animations Webflow sur mesure et optimisation SEO complète. Résultat: +85% de conversions.',
      tags: ['Webflow', 'Animation', 'Conversion'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1920&h=1080&fit=crop&q=80',
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&h=1080&fit=crop&q=80',
      ],
      link: '#',
    },
  ];

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
            Portfolio
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Mes <span className="gradient-text">Projets</span>
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Une sélection de mes travaux récents qui démontrent ma passion pour le
            design et l'innovation
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
