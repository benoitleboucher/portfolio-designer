import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Lightbulb, Users, Target } from 'lucide-react';
import * as Icons from 'lucide-react';
import aboutData from '../../content/about/index.json';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stats = aboutData.stats;

  const values = aboutData.values.map(value => ({
    ...value,
    icon: Icons[value.icon] || Heart,
  }));

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-gradient-to-b from-deep-black to-charcoal relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Image (spans 5 columns on large screens) */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative">
              {/* Photo Container with Creative Frame */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Main Photo */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-graphite to-charcoal rounded-tr-[80px] rounded-bl-[80px] overflow-hidden border-4 border-accent/20">
                  {/* Professional Photo */}
                  <img
                    src={aboutData.image}
                    alt={aboutData.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/20 to-transparent"></div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-20 h-20 border-4 border-accent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content (spans 7 columns on large screens) */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
                À propos de moi
              </h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {aboutData.title}
              </h3>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 text-white/70 text-lg mb-8">
              <p>
                {aboutData.description}
              </p>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-display font-bold text-accent mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Values Grid */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-display font-semibold mb-6">
                Mes valeurs
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-graphite/50 rounded-lg border border-graphite hover:border-accent/30 transition-all duration-300 group"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <Icon size={24} className="text-accent" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-1">
                          {value.title}
                        </h5>
                        <p className="text-sm text-white/60">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
