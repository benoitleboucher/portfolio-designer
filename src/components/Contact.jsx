import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, Mail, MapPin, Phone, Linkedin, Dribbble, Palette, Twitter } from 'lucide-react';
import contactData from '../../content/contact/index.json';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form Data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: contactData.email,
      link: `mailto:${contactData.email}`,
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: contactData.phone,
      link: `tel:${contactData.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: contactData.location,
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            {contactData.subtitle}
          </h2>
          <h3 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{contactData.title}</span>
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {contactData.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <div>
              <h4 className="text-2xl font-display font-semibold mb-6">
                Informations de contact
              </h4>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-white font-medium hover:text-accent transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              className="p-6 bg-gradient-to-br from-accent/10 to-graphite rounded-xl border border-accent/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Disponible pour freelance</span>
              </div>
              <p className="text-white/60 text-sm">
                Je suis actuellement disponible pour de nouveaux projets et
                collaborations passionnantes.
              </p>
            </motion.div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-display font-semibold mb-4">
                Suivez-moi
              </h4>
              <div className="flex gap-4">
                {contactData.social.linkedin && (
                  <motion.a
                    href={contactData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-graphite rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={20} className="text-white" />
                  </motion.a>
                )}
                {contactData.social.dribbble && (
                  <motion.a
                    href={contactData.social.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-graphite rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Dribbble size={20} className="text-white" />
                  </motion.a>
                )}
                {contactData.social.behance && (
                  <motion.a
                    href={contactData.social.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-graphite rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Palette size={20} className="text-white" />
                  </motion.a>
                )}
                {contactData.social.twitter && (
                  <motion.a
                    href={contactData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-graphite rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={20} className="text-white" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Nom complet *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: {
                      value: 2,
                      message: 'Le nom doit contenir au moins 2 caractères',
                    },
                  })}
                  className={`w-full px-4 py-3 bg-graphite border ${
                    errors.name ? 'border-red-500' : 'border-graphite'
                  } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors duration-300`}
                  placeholder="Jean Dupont"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  className={`w-full px-4 py-3 bg-graphite border ${
                    errors.email ? 'border-red-500' : 'border-graphite'
                  } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors duration-300`}
                  placeholder="jean.dupont@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Subject Field (Optional) */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Sujet
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className="w-full px-4 py-3 bg-graphite border border-graphite rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="Projet de site web"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', {
                    required: 'Le message est requis',
                    minLength: {
                      value: 10,
                      message: 'Le message doit contenir au moins 10 caractères',
                    },
                  })}
                  className={`w-full px-4 py-3 bg-graphite border ${
                    errors.message ? 'border-red-500' : 'border-graphite'
                  } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none`}
                  placeholder="Parlez-moi de votre projet..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-accent hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30'
                } text-white disabled:opacity-70 disabled:cursor-not-allowed`}
                whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Envoi en cours...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
