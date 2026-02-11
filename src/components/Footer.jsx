import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      color: 'hover:text-[#333]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      color: 'hover:text-[#0077B5]',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:contact@designer.com',
      color: 'hover:text-accent',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      color: 'hover:text-[#E4405F]',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <footer className="relative bg-charcoal border-t border-graphite">
      <div className="container-custom py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Logo & Tagline */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold mb-2">Portfolio</h3>
            <p className="text-white/60 text-sm">
              Créer des expériences digitales mémorables
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Back to Top Button */}
          <motion.div variants={itemVariants} className="text-center md:text-right">
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 group"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Retour en haut</span>
              <ArrowUp
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 pt-8 border-t border-graphite text-center"
        >
          <p className="text-white/50 text-sm">
            © {currentYear} Portfolio Designer. Tous droits réservés. Créé avec{' '}
            <span className="text-accent">♥</span> et React
          </p>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;
