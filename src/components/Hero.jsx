import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import heroData from '../../content/hero/index.json';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth motion
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-black"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-charcoal to-deep-black opacity-70"></div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium">
                <Sparkles size={16} className="animate-pulse" />
                {heroData.greeting}
              </span>
            </motion.div>

            {/* Main Title with stagger effect */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold mb-6"
            >
              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {heroData.name}
              </motion.span>
              <motion.span
                className="block text-white/90"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {heroData.title}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 69, 0, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                {heroData.ctaText}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: '5+', label: 'Années' },
                { value: '50+', label: 'Projets' },
                { value: '30+', label: 'Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-display font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Image with geometric mask */}
          <motion.div
            variants={imageVariants}
            className="relative hidden lg:block"
          >
            {/* Geometric Frame */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative Border */}
              <motion.div
                className="absolute inset-0 border-2 border-accent/30 rounded-tl-[100px] rounded-br-[100px]"
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Image Container */}
              <div className="absolute inset-4 bg-gradient-to-br from-accent/20 to-graphite rounded-tl-[90px] rounded-br-[90px] overflow-hidden">
                {/* Designer Image */}
                <img
                  src={heroData.profileImage}
                  alt={heroData.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20 blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollToSection('#about')}
      >
        <span className="text-white/60 text-sm font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={24} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
