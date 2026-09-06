export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  whatsappNumber: string; // E.164 without '+', used for wa.me links
  linkedinUrl: string;
  githubUrl: string;
  summary: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string; // 'Present' if ongoing
  project?: string;
  technologies?: string[];
  highlights: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  sourceCompany: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
}
