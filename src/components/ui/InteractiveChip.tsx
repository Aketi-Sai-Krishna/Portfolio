import { motion } from 'framer-motion';

interface InteractiveChipProps {
  label: string;
}

/** A tag/skill pill that pops up and lifts on hover, focus, or tap — the
 * one consistent micro-interaction used for every chip across the site. */
export function InteractiveChip({ label }: InteractiveChipProps) {
  return (
    <motion.span
      className="skill-chip"
      tabIndex={0}
      whileHover={{ y: -4, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      whileFocus={{ y: -4, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
    >
      {label}
    </motion.span>
  );
}
