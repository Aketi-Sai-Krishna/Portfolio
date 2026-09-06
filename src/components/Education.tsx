import { education } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <SectionHeading title="Education" />

      <ul className="timeline">
        {education.map((entry, index) => (
          <Reveal as="li" key={entry.id} delay={index * 0.06} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__header">
                <h3 className="timeline__role">{entry.degree}</h3>
                <span className="timeline__dates">{entry.date}</span>
              </div>
              <p className="timeline__company">
                {entry.institution} · {entry.location}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
