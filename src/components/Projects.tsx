import { projects } from '@/data/resume';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { InteractiveChip } from './ui/InteractiveChip';

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <SectionHeading
        title="Projects"
        description="Pulled from real production work. Swap in live links or case-study write-ups any time — the data lives in one file."
        descriptionNoWrap
      />

      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08}>
            <article className="project-card">
              <span className="project-card__source">{project.sourceCompany}</span>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>
              <ul className="project-card__tech">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <InteractiveChip label={tech} />
                  </li>
                ))}
              </ul>
              {project.link && (
                <a className="project-card__link" href={project.link} target="_blank" rel="noopener noreferrer">
                  View project →
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
