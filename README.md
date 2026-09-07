# Sai Krishna — 3D Portfolio

An interactive portfolio built with **React 18 + TypeScript**, **Vite**, and
**Framer Motion**. The hero uses a hand-rolled Canvas 2D "liquid reveal"
effect (no WebGL) — a dark panel that paints a photo along the cursor's
trail with a soft, fading brush.

Live Demo : https://portfolio-kohl-three-1qhqhuap0a.vercel.app/

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

Requires Node 18+.

## Project structure

```
src/
  data/resume.ts         # single source of truth for all content — edit this to update the site
  types/resume.ts         # TypeScript types for the data above
  components/
    Hero/                  # Hero.tsx (copy/layout) + LiquidReveal.tsx (Canvas 2D cursor-reveal effect)
    ui/                    # Reveal (scroll animation), Chip, SectionHeading, AboutPortrait
    Navbar.tsx, About.tsx, Skills.tsx, Experience.tsx,
    Projects.tsx, Education.tsx, Certifications.tsx, Contact.tsx, Footer.tsx
  hooks/
    useReducedMotion.ts    # respects OS-level "reduce motion" setting
    useMediaQuery.ts       # used to gate the hero's pointer-driven reveal to devices with real hover
  utils/
    whatsapp.ts            # builds the wa.me link used by the navbar and contact form
  styles/
    tokens.css             # design tokens: color, type, spacing
    layout.css              # component + section styles
  index.css                 # global reset + accessibility base styles
```

## Design system rules

The palette and type system are adapted from a client-supplied reference
("Lumora"): **Onest** as the only typeface, and a near-monochrome scale —
`#0A0A0A` (ink, dark cards/pills) · `#E6E5E2` (hairline borders) ·
`#E3E2DF` / `#F1F0EE` (surfaces) · `#FFFFFF` (page) — plus **one** accent,
burnt orange `#B15F2C` (gradient pair `#CF8047 → #97501F`). See
`--color-ink` / `--color-sage` / `--color-parchment` / `--color-mist` /
`--color-paper` / `--color-accent` in `src/styles/tokens.css`.

The accent is the single interactive/brand signal — eyebrow labels, focus
rings, link/hover states, the brand mark, and the lead stat. Everything
else stays in ink/white/neutral. One accessibility note: the reference's
literal muted gray (`#8D8D8D`) is under WCAG AA contrast on white for body
text, so `--color-text-muted` uses a darkened variant for real reading
content; the reference's exact value survives as `--color-subtle` for
decorative use only.

## Photo

`public/portrait.jpg` already contains the headshot you provided. It's
used in two places: the About section (displayed directly) and the Hero's
liquid-reveal effect (painted along the cursor trail over the dark panel).
To swap it, just replace that file (square, 800×800px+, ideally with clear
subject framing since the hero crops it "cover"-style); no code change
needed. If the file is ever removed, About falls back to a monogram panel
and the hero's reveal effect will simply have nothing to paint.

### Mobile nav

The mobile nav (`Navbar.tsx`) is a real full-screen menu with its own
composition, not the desktop links hidden via CSS — edit `mobile-menu`
styles in `layout.css` if you change the link set.

## Updating content

Everything you see — name, summary, skills, experience, projects, education,
certifications — comes from **`src/data/resume.ts`**. Edit that file only;
no component code needs to change for a content update.

## WhatsApp integration

The contact form and the navbar's "WhatsApp" button both build a
[`wa.me`](https://faq.whatsapp.com/425247423114725) click-to-chat link (see
`src/utils/whatsapp.ts`). This opens WhatsApp (app or web) in a new tab with
the visitor's message pre-filled — they tap send themselves. It's free,
requires no backend, and works on both desktop and mobile.

If you later want messages delivered automatically without the visitor
confirming send, that requires the paid **WhatsApp Business Platform (Cloud
API)**: you'd add a small serverless function (Vercel/Netlify function) that
receives the form POST and calls the Business API with a verified sender
number. The form component (`src/components/Contact.tsx`) is written so that
swap only touches the `handleSubmit` function.

To change the destination number, edit `WHATSAPP_NUMBER` in
`src/utils/whatsapp.ts` (E.164 format, digits only, no `+`).

## LinkedIn

The LinkedIn URL lives in `src/data/resume.ts` (`profile.linkedinUrl`) and is
used in the navbar and the contact section. Update it there.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the hero's cursor-painted reveal is
  skipped entirely and replaced with a static, softly-masked peek at the
  photo — no animation, no pointer required.
- The liquid-reveal canvas only runs on devices with real hover + a fine
  pointer (`(hover: hover) and (pointer: fine)`); touch devices get the
  same static fallback as reduced-motion users.
- All interactive elements are keyboard-reachable with a visible focus ring;
  the contact form has associated labels, `aria-invalid`/`aria-describedby`
  error wiring, and a live status region.
- A "Skip to main content" link is included for screen-reader/keyboard users.
- Framer Motion is code-split into its own chunk (see `vite.config.ts`) so
  the initial JS payload stays lean. The hero's liquid-reveal effect is
  plain Canvas 2D — no WebGL/Three.js dependency at all.

## Before you launch

- Replace `https://your-domain.example/` in `index.html` (canonical/OG URLs)
  and `public/robots.txt` with your real domain.
- Add a real `public/og-cover.png` (1200×630) social preview image.
- Swap the placeholder `link` fields in `src/data/resume.ts` projects with
  live URLs or case studies once you have them.

## Deployment

### Vercel
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel detects these automatically).
4. Deploy — you'll get a live URL and can attach a custom domain under
   Project Settings → Domains.

### Netlify
1. Push the project to a Git repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command: `npm run build`; publish directory: `dist`.
4. Deploy. Add a custom domain under Site configuration → Domain management.

### CLI alternative (either host)
```bash
npm run build
npx vercel --prod        # Vercel
# or
npx netlify deploy --prod --dir=dist   # Netlify
```

Both platforms auto-deploy on every push to your main branch once connected.
