import { useState, type FormEvent } from 'react';
import { profile } from '@/data/resume';
import { buildWhatsAppLink } from '@/utils/whatsapp';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Enter your email.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.message.trim()) errors.message = 'Add a short message.';
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const link = buildWhatsAppLink(values);
    window.open(link, '_blank', 'noopener,noreferrer');
    setStatus('sent');
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Reach out on LinkedIn, or send a message below — it opens straight into WhatsApp with your note ready to send."
      />

      <div className="contact__grid">
        <Reveal className="contact__links">
          <a
            className="contact-link-card"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link-card__label">LinkedIn</span>
            <span className="contact-link-card__value">/in/aketisaikrishna</span>
          </a>
          <a
            className="contact-link-card"
            href={`mailto:${profile.email}`}
          >
            <span className="contact-link-card__label">Email</span>
            <span className="contact-link-card__value">{profile.email}</span>
          </a>
          <a
            className="contact-link-card"
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
          >
            <span className="contact-link-card__label">Phone / WhatsApp</span>
            <span className="contact-link-card__value">{profile.phone}</span>
          </a>
          <a
            className="contact-link-card"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link-card__label">GitHub</span>
            <span className="contact-link-card__value">/Aketi-Sai-Krishna</span>
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="form-field__error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className="form-field__error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className="form-field__error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button className="btn btn--primary" type="submit">
              Send via WhatsApp
            </button>

            <p className="contact-form__status" role="status" aria-live="polite">
              {status === 'sent' && "WhatsApp is opening in a new tab — hit send there to deliver your message."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
