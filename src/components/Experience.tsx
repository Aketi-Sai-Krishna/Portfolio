import { experience } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { InteractiveChip } from './ui/InteractiveChip';

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <SectionHeading eyebrow="Experience" title="A journey of four years — evolving, one step at a time" />

      <ul className="timeline">
        {experience.map((entry, index) => (
          <Reveal as="li" key={entry.id} delay={index * 0.06} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__header">
                <h3 className="timeline__role">{entry.role}</h3>
                <span className="timeline__dates">
                  {entry.startDate} — {entry.endDate}
                </span>
              </div>
              <p className="timeline__company">
                {entry.company} · {entry.location}
              </p>
              {entry.project && <p className="timeline__project">{entry.project}</p>}

              <ul className="timeline__highlights">
                {entry.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {entry.technologies && (
                <ul className="timeline__tech">
                  {entry.technologies.map((tech) => (
                    <li key={tech}>
                      <InteractiveChip label={tech} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
