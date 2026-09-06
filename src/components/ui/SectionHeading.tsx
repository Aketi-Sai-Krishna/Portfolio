import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Keep the description on one line (desktop) instead of wrapping. */
  descriptionNoWrap?: boolean;
}

export function SectionHeading({ eyebrow, title, description, descriptionNoWrap }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {description && (
        <p
          className={`section-heading__description${
            descriptionNoWrap ? ' section-heading__description--nowrap' : ''
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
