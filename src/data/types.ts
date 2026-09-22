export type Language = 'en' | 'ko';
export type Localized = { en: string; ko: string };
export type ProjectCategory = 'ai' | 'autonomous' | 'research' | 'software';
export type ResearchStatus = 'exploring' | 'ongoing' | 'completed' | 'published';
export type PublicationKind = 'conference' | 'workshop' | 'poster' | 'review';
export type GraphicKind = 'systems' | 'perception' | 'mobility';

export interface ResearchInterest {
  id: string;
  title: Localized;
  description: Localized;
  tags: string[];
  graphic: GraphicKind;
}

export interface ResearchEntry {
  id: string;
  title: Localized;
  status: ResearchStatus;
  area: Localized;
  overview: Localized;
  problem?: Localized;
  motivation?: Localized;
  approach?: Localized;
  role?: Localized;
  methods?: string[];
  dataset?: Localized;
  tools?: string[];
  architecture?: Localized;
  architectureImage?: { src: string; alt: Localized };
  experiments?: Localized;
  results?: Localized;
  paper?: string;
  code?: string;
  slides?: string;
}

export interface Publication {
  id: string;
  title: Localized;
  authors: string[];
  venue: string;
  year: number;
  kind: PublicationKind;
  role?: Localized;
  contribution?: Localized;
  pdf?: string;
  presentation?: string;
  code?: string;
  projectPage?: string;
}

export interface Project {
  id: string;
  title: Localized;
  category: ProjectCategory;
  description: Localized;
  problem?: Localized;
  contribution?: Localized;
  architecture?: Localized;
  implementation?: Localized;
  result?: Localized;
  lessons?: Localized;
  technologies: string[];
  image?: { src: string; alt: Localized };
  github?: string;
  demo?: string;
  paper?: string;
  documentation?: string;
}

export interface ExperienceEntry {
  id: string;
  organization: Localized;
  role: Localized;
  date: Localized;
  category: 'research' | 'academic' | 'development';
  description?: Localized;
  contributions?: Localized[];
  technologies?: string[];
}

export interface Education {
  school: Localized;
  degree: Localized;
  date?: Localized;
}

export interface SkillGroup {
  id: 'programming' | 'ml' | 'autonomous' | 'systems';
  skills: string[];
}
