import { profile } from '@/data/resume';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, TypeScript & Three.js.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
