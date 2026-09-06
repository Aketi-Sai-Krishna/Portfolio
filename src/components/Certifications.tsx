import { certifications } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

export function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-heading">
      <SectionHeading title="Certifications" />

      <ul className="timeline">
        {certifications.map((cert, index) => (
          <Reveal as="li" key={cert.id} delay={index * 0.06} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__header">
                <h3 className="timeline__role">{cert.name}</h3>
              </div>
              <p className="timeline__company">{cert.issuer}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
