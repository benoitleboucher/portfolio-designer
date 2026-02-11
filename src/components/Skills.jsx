import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Figma,
  Code,
  Palette,
  Layers,
  Smartphone,
  Users,
  MessageSquare,
  Lightbulb,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import skillsData from '../../content/skills/index.json';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState('design');

  const skillCategories = {
    design: {
      title: skillsData.designToolsTitle,
      icon: Palette,
      skills: skillsData.designTools.map(skill => ({ ...skill, icon: Code })),
    },
    dev: {
      title: skillsData.devSkillsTitle,
      icon: Code,
      skills: skillsData.devSkills.map(skill => ({ ...skill, icon: Code })),
    },
    soft: {
      title: skillsData.softSkillsTitle,
      icon: Users,
      skills: skillsData.softSkills.map(skill => ({ ...skill, level: 95, icon: MessageSquare })),
    },
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

  const barVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 0.5,
      },
    }),
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding bg-gradient-to-b from-charcoal to-deep-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            {skillsData.subtitle}
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{skillsData.title}</span>
          </h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {skillsData.description}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.entries(skillCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                    : 'bg-graphite text-white/70 hover:text-white hover:bg-graphite/70 hover:scale-105'
                }`}
              >
                <Icon size={20} />
                {category.title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <div
              key={key}
              className={`${
                activeTab === key ? 'block' : 'hidden'
              } transition-all duration-500`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.skills.map((skill, index) => {
                  const SkillIcon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                            <SkillIcon size={20} className="text-accent" />
                          </div>
                          <span className="font-semibold text-white">
                            {skill.name}
                          </span>
                        </div>
                        <motion.span
                          className="text-accent font-bold text-lg"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isInView && activeTab === key
                              ? { opacity: 1, scale: 1 }
                              : {}
                          }
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="relative h-3 bg-graphite rounded-full overflow-hidden">
                        {/* Animated Progress Bar */}
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                          custom={skill.level}
                          variants={barVariants}
                          initial="hidden"
                          animate={isInView && activeTab === key ? 'visible' : 'hidden'}
                        />

                        {/* Glow Effect */}
                        <motion.div
                          className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-accent/50 to-transparent blur-sm"
                          initial={{ opacity: 0 }}
                          animate={
                            isInView && activeTab === key
                              ? { opacity: [0, 1, 0] }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5 + index * 0.1,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto"
        >
          {skillsData.infoCards.map((card, index) => {
            const CardIcon = Icons[card.icon] || Layers;
            return (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-graphite to-charcoal rounded-xl border border-graphite hover:border-accent/30 transition-all duration-300 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <CardIcon size={28} className="text-accent" />
                </div>
                <h4 className="text-xl font-display font-semibold mb-2">
                  {card.title}
                </h4>
                <p className="text-white/60 text-sm">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Timeline (Optional decorative element) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h4 className="text-2xl font-display font-semibold mb-8">
            {skillsData.processTitle}
          </h4>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {skillsData.processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/20 border-2 border-accent rounded-full text-accent font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-white/80">{step}</span>
                </div>
                {index < skillsData.processSteps.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-accent/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
