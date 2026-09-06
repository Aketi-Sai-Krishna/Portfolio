import { useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const REST_ROTATE_X = 6;
const REST_ROTATE_Y = -10;

/**
 * Renders a real photo at /public/portrait.jpg if one exists; otherwise
 * falls back to a deliberate monogram panel so the section never looks like
 * a missing-image placeholder. Drop a real headshot at public/portrait.jpg
 * (square, 800x800+) and this switches automatically — no code change.
 *
 * The card rests at a slight 3D incline and tilts further toward the
 * cursor (spring-eased), popping forward with a scale/shadow lift on
 * hover — a small, tactile bit of depth rather than a flat photo.
 */
export function AboutPortrait() {
  const [hasPhoto, setHasPhoto] = useState(true);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(REST_ROTATE_X);
  const rotateY = useMotionValue(REST_ROTATE_Y);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(REST_ROTATE_X - py * 22);
    rotateY.set(REST_ROTATE_Y + px * 22);
  }

  function handleMouseLeave() {
    setHovered(false);
    rotateX.set(REST_ROTATE_X);
    rotateY.set(REST_ROTATE_Y);
  }

  return (
    <div className="portrait-stage">
      <motion.div
        className={`portrait${!hasPhoto ? ' portrait--monogram' : ''}`}
        style={{ rotateX: springX, rotateY: springY }}
        animate={{
          scale: hovered ? 1.05 : 1,
          z: hovered ? 40 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {hasPhoto ? (
          <img
            src="/portrait.jpg"
            alt="Portrait of Aketi Sai Krishna"
            onError={() => setHasPhoto(false)}
          />
        ) : (
          <div role="img" aria-label="Portrait placeholder for Aketi Sai Krishna" className="portrait__fallback">
            <span className="portrait__monogram gradient-text">ASK</span>
            <span className="portrait__grid" aria-hidden="true" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
