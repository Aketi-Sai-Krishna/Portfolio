import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li';
  className?: string;
}

/**
 * Fades and slides content in as it scrolls into view. Falls back to a
 * simple opacity fade (no motion) when the user prefers reduced motion.
 *
 * On mobile, the slide is a bit more pronounced (a moderate diagonal
 * slide-in rather than just a small vertical drift) since there's no hover
 * state to give the page any life on touch devices — this is what gives
 * scrolling through the site on a phone a bit of presence.
 */
export function Reveal({ children, delay = 0, y = 14, as = 'div', className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 720px)');

  const initial =
    reduceMotion
      ? { opacity: 0 }
      : isMobile
      ? { opacity: 0, y: y + 22, x: -16 }
      : { opacity: 0, y };
  const whileInView = { opacity: 1, y: 0, x: 0 };
  const viewport = { once: true, margin: '-60px' } as const;
  const transition = {
    duration: reduceMotion ? 0.2 : isMobile ? 0.55 : 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  if (as === 'li') {
    return (
      <motion.li
        className={className}
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
