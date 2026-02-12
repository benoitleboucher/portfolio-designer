import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';

// Import all accomplishment files
import accompSettings from '../../content/accomplishments/settings.json';
import accomp1 from '../../content/accomplishments/bandsintown.json';
import accomp2 from '../../content/accomplishments/cellfish.json';
import accomp3 from '../../content/accomplishments/radio-show.json';
import accomp4 from '../../content/accomplishments/eresys.json';
import accomp5 from '../../content/accomplishments/marvel.json';
import accomp6 from '../../content/accomplishments/music.json';

const Accomplishments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Load accomplishments from TinaCMS with icons
  const accompData = [accomp1, accomp2, accomp3, accomp4, accomp5, accomp6];
  const accomplishments = accompData.map(item => ({
    ...item,
    icon: Icons[item.icon] || Icons.Award,
    color: 'from-accent/20 to-accent/10',
    iconColor: 'text-accent',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="accomplishments"
      ref={ref}
      className="section-padding bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            {accompSettings.subtitle}
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{accompSettings.title}</span>
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {accompSettings.description}
          </p>
        </motion.div>

        {/* Accomplishments Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {accomplishments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-graphite to-charcoal rounded-2xl border border-graphite hover:border-accent/30 transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Year */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon size={32} className={item.iconColor} />
                      </div>
                      <span className="text-white/40 text-sm font-semibold">
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-display font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h4>

                    {/* Organization */}
                    <p className="text-accent/80 text-sm font-medium mb-3">
                      {item.organization}
                    </p>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Glow Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl bg-gradient-to-br ${item.color}`}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {accompSettings.summaryStats?.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-graphite/50 rounded-xl border border-graphite hover:border-accent/30 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">
            Intéressé par une collaboration ?
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
            Démarrons un projet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Accomplishments;
