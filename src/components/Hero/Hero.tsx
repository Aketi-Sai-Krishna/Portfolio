import { motion } from 'framer-motion';
import { CosmicDust } from './CosmicDust';
import { profile } from '@/data/resume';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Hero.css';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="hero" id="top">
      <div className="hero__reveal-layer">
        <CosmicDust active={!reduceMotion} />
      </div>
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__shell">
        <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
          <motion.h1 className="hero__title" variants={item}>
            {profile.name}
          </motion.h1>

          <motion.p className="hero__subtitle hero__cta-text" variants={item}>
            Frontend Developer crafting immersive 3D web experiences with precision and
            creativity — always excited to collaborate on bold ideas, and available for
            freelance work worldwide.
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <a className="btn btn--primary hero__cta-primary" href="#contact">
              Let's talk
            </a>
            <a className="btn btn--ghost hero__cta-ghost" href="#projects">
              View work
            </a>
          </motion.div>

          <motion.a href="#about" className="hero__scroll-cue" variants={item}>
            Scroll to explore <span aria-hidden="true">↓</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__portrait"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__portrait-glow" aria-hidden="true" />
          <img src="/hero-portrait.webp" alt="Aketi Sai Krishna" className="hero__portrait-img" />
        </motion.div>
      </div>
    </header>
  );
}
