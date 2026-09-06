import { profile } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { AboutPortrait } from './ui/AboutPortrait';

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <SectionHeading title="About Me" />

      <div className="about__intro">
        <Reveal className="about__portrait-col">
          <AboutPortrait />
        </Reveal>

        <Reveal delay={0.1} className="about__copy-col">
          <div className="about__summary">
            {profile.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
