import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/data/resume';
import { buildDirectWhatsAppLink } from '@/utils/whatsapp';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`} aria-label="Primary">
        <a href="#top" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__brand-mark gradient-text" aria-hidden="true">{'</>'}</span> Sai Krishna
        </a>

        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a
            className="navbar__icon-link"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Sai Krishna's LinkedIn profile in a new tab"
          >
            LinkedIn
          </a>
          <a
            className="btn btn--small btn--primary"
            href={buildDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Sai Krishna on WhatsApp (opens in a new tab)"
          >
            WhatsApp
          </a>
        </div>

        <button
          className="navbar__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`} aria-hidden="true" />
        </button>
      </nav>

      {/*
        Rendered as a SIBLING of <nav>, not nested inside it. `.navbar--scrolled`
        applies `backdrop-filter`, and per the CSS spec, `backdrop-filter` (like
        `transform`) on an ancestor creates a new containing block for any
        `position: fixed` descendant — so a fixed-position menu nested inside
        the navbar would size itself to the navbar's own small box instead of
        the viewport as soon as you'd scrolled (exactly the bug where the menu
        opened fine from the hero but broke from every other section). Keeping
        it outside `<nav>` avoids that entirely, regardless of scroll state.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="mobile-menu__links">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu__actions">
              <a className="btn btn--ghost" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a
                className="btn btn--primary"
                href={buildDirectWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
