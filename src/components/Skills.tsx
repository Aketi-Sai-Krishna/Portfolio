import { useRef, type MouseEvent } from 'react';
import { skillGroups } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { InteractiveChip } from './ui/InteractiveChip';

function TiltCard({
  category,
  items,
  featured = false,
}: {
  category: string;
  items: string[];
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--tilt-x', `${py * -6}deg`);
    card.style.setProperty('--tilt-y', `${px * 6}deg`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div
      className={`skill-card${featured ? ' skill-card--featured' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="skill-card__title">{category}</h3>
      <ul className="skill-card__list">
        {items.map((item) => (
          <li key={item}>
            <InteractiveChip label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <SectionHeading
        eyebrow="Skills"
        title="A component-first toolkit"
        description="Grouped the way they get used on a real product build — not just a keyword list."
      />

      <div className="skill-grid">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.category}
            delay={index * 0.05}
            className={index === 0 ? 'skill-grid__featured-slot' : undefined}
          >
            <TiltCard category={group.category} items={group.items} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
