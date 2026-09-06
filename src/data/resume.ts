import type {
  Profile,
  SkillGroup,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  CertificationEntry,
} from '@/types/resume';

export const profile: Profile = {
  name: 'Aketi Sai Krishna',
  title: 'Frontend Engineer',
  location: 'Hyderabad, India',
  email: 'saikrishnaaketi1@gmail.com',
  phone: '+91 9100710460',
  whatsappNumber: '919100710460',
  linkedinUrl: 'https://www.linkedin.com/in/aketisaikrishna/',
  githubUrl: 'https://github.com/Aketi-Sai-Krishna',
  summary: [
    'Frontend Engineer with 4+ years of experience designing and developing modern web applications using React JS, JavaScript, TypeScript, HTML5, CSS3, SCSS, and Material UI.',
    'Hands-on experience building enterprise SaaS products, reusable UI components, dynamic forms, dashboards, and data-driven applications with REST API integrations.',
    'Skilled in React Hooks, Context API, Zustand, React Router, state management, component-based architecture, and front-end performance optimization.',
    'Accelerates the software development lifecycle by extensively leveraging advanced AI coding assistants, including Claude AI and Cursor IDE, to rapidly build applications, optimize code, and prototype complex features.',
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend Technologies',
    items: ['React JS', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SCSS / SASS', 'Material UI (MUI)', 'Bootstrap'],
  },
  {
    category: 'State Management',
    items: ['React Hooks', 'Context API', 'Zustand'],
  },
  {
    category: 'Routing & Forms',
    items: ['React Router', 'Dynamic Forms', 'Form Validation'],
  },
  {
    category: 'API Integration',
    items: ['REST APIs', 'Axios', 'JSON'],
  },
  {
    category: 'Development Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Vite', 'NPM'],
  },
  {
    category: 'Development Practices',
    items: [
      'Responsive Web Design',
      'Cross-Browser Compatibility',
      'Component-Based Architecture',
      'Single Page Applications',
      'Performance Optimization',
    ],
  },
  {
    category: 'Methodologies',
    items: ['Agile / Scrum', 'SDLC', 'Version Control'],
  },
  {
    category: 'Soft Skills',
    items: ['Problem Solving', 'Team Collaboration', 'Adaptability', 'Research & Analysis'],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: 'curately-senior',
    role: 'Senior Product Development Engineer',
    company: 'Curately AI',
    location: 'Hyderabad, India',
    startDate: 'Jan 2026',
    endDate: 'May 2026',
    project: 'Curately AI Web App & Chrome Extension (Manifest V3)',
    technologies: ['React JS', 'TypeScript', 'Material UI', 'REST APIs', 'React Hooks', 'Vitest', 'Extensions API'],
    highlights: [
      'Built scalable and reusable UI components for a recruiter-focused Chrome Extension using React JS, TypeScript, Material UI, and SCSS, leveraging Storybook for design consistency.',
      'Implemented frontend features from UX/UI specifications, collaborating cross-functionally to deliver a unified design language throughout the extension.',
      'Developed and integrated REST API services using React Hooks and component-based architecture to connect frontend modules with backend systems.',
      'Authored unit tests using Vitest, participated in code reviews, and partnered with QA to ship high-quality releases.',
    ],
  },
  {
    id: 'curately-pde',
    role: 'Product Development Engineer',
    company: 'Curately AI',
    location: 'Hyderabad, India',
    startDate: 'Jul 2024',
    endDate: 'Jan 2026',
    project: 'Curately AI Web Application',
    technologies: ['React JS', 'TypeScript', 'Material UI', 'Zustand', 'REST APIs'],
    highlights: [
      'Developed and enhanced frontend features across Candidate, Job, and Settings modules, supporting workflows used by 500+ recruiters.',
      'Built 15+ reusable React components — dynamic dashboards and dynamic forms — reducing duplicate code by 20% and improving maintainability.',
      'Integrated REST APIs via React Hooks to deliver candidate management, authentication, dashboard, and reporting features in Agile environments.',
      'Researched AWS deployment workflows and collaborated on application hosting using AWS S3 and CloudFront, documenting the process for the team.',
    ],
  },
  {
    id: 'tenjin',
    role: 'Junior Front End Developer',
    company: 'Tenjin Technologies',
    location: 'Bangalore, India',
    startDate: 'Jul 2022',
    endDate: 'Jun 2024',
    project: 'Client Web Applications',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React JS'],
    highlights: [
      'Developed responsive websites and single-page applications using HTML5, CSS3, JavaScript, and React JS.',
      'Built user-friendly interfaces from design specifications while ensuring cross-browser compatibility and mobile responsiveness.',
      'Integrated APIs and third-party libraries to implement dynamic website functionality and improve user experience.',
      'Collaborated with the team to develop, test, and maintain web applications for client requirements.',
    ],
  },
  {
    id: 'ait-solutions',
    role: 'Technical Assistant',
    company: 'AIT Solutions',
    location: 'Pathum Thani, Thailand',
    startDate: 'Jun 2021',
    endDate: 'May 2022',
    project: 'Student Assistantship',
    technologies: ['HTML', 'CSS', 'Wix', 'Canva'],
    highlights: [
      'Developed and maintained website pages using HTML, CSS, and the Wix platform, gaining hands-on experience in responsive design.',
      'Created website layouts, marketing materials, and visual assets using Canva to support branding and engagement initiatives.',
      'Applied SEO fundamentals and digital marketing best practices to improve search visibility and user reach.',
      'Collaborated with web designers to gather requirements and prepare technical documentation.',
    ],
  },
];

// Derived from real work — replace `link` with live URLs/case studies when available.
export const projects: ProjectEntry[] = [
  {
    id: 'curately-extension',
    title: 'Curately AI Chrome Extension',
    description:
      'A recruiter-focused Chrome Extension (Manifest V3) with a reusable component library built in React, TypeScript, and Material UI, backed by a Storybook design system for consistency across the product.',
    technologies: ['React', 'TypeScript', 'Material UI', 'Storybook', 'Vitest'],
    sourceCompany: 'Curately AI',
  },
  {
    id: 'curately-webapp',
    title: 'Curately AI Web Application',
    description:
      'Candidate, Job, and Settings modules serving 500+ recruiters in production — 15+ reusable components, dynamic dashboards, and dynamic forms that cut duplicate code by 20%.',
    technologies: ['React', 'TypeScript', 'Zustand', 'REST APIs', 'AWS S3 + CloudFront'],
    sourceCompany: 'Curately AI',
  },
  {
    id: 'tenjin-client-sites',
    title: 'Client Web Applications',
    description:
      'Responsive marketing sites and single-page applications built to client specifications, with third-party API integrations and cross-browser, mobile-first layouts.',
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    sourceCompany: 'Tenjin Technologies',
  },
];

export const education: EducationEntry[] = [
  {
    id: 'ait',
    degree: 'Master of Engineering, Information and Communication Technology',
    institution: 'Asian Institute of Technology',
    location: 'Pathum Thani, Thailand',
    date: 'Jul 2022',
  },
  {
    id: 'jntu',
    degree: 'Bachelor of Technology, Civil Engineering',
    institution: 'Jawaharlal Nehru Technological University',
    location: 'Kakinada, India',
    date: 'Jul 2018',
  },
];

export const certifications: CertificationEntry[] = [
  { id: 'fcc', name: 'Responsive Web Design Certification (300+ Hours)', issuer: 'FreeCodeCamp' },
  { id: 'webla', name: 'Full Stack Web Development Certification', issuer: 'Webla' },
];
