export type ProjectCategory =
  | "AI/ML"
  | "Computer Vision"
  | "Healthcare"
  | "Software Development"
  | "Research"
  | "Other";

export interface Person {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  tagline: string;
  summary: string;
  aboutLong: string[];
  interests: string[];
  careerInterests: string[];
  technicalFocus: string[];
  goals: string[];
  mantra: string;
  profileImage: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    quora: string;
    youtube: string;
    email: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  contributions: string[];
  links?: { label: string; url: string }[];
  relatedProjectSlugs?: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  shortDescription: string;
  category: ProjectCategory[];
  featured: boolean;
  status: string;
  duration: string;
  problem: string;
  motivation: string;
  solution: string;
  architecture: string[];
  methodology: string[];
  features: string[];
  results: string[];
  challenges: string[];
  futureImprovements: string[];
  technologies: string[];
  heroTone: "teal" | "copper" | "slate";
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  researchSlug?: string;
  relatedAchievementIds?: string[];
  images?: { src: string; alt: string }[];
}

export interface ResearchPaper {
  slug: string;
  title: string;
  year: string;
  venue: string;
  role: string;
  award?: string;
  abstract: string;
  problem: string;
  methodology: string[];
  systemArchitecture: string[];
  results: string[];
  limitations: string[];
  futureWork: string[];
  publicationDetails: {
    conference: string;
    publisher: string;
    authors: string[];
    year: string;
    pdfUrl?: string;
  };
  relatedProjectSlug?: string;
  interestsOverlap: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: "Research" | "Hackathon" | "Competition" | "Technical Event" | "Other";
  event?: string;
  date: string;
  description: string;
  details?: string[];
  image?: string;
  documentUrl?: string;
  relatedResearchSlug?: string;
  relatedProjectSlug?: string;
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  date: string;
  description?: string;
  image?: string;
  credentialUrl?: string;
  relatedAchievementId?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Conferences" | "Hackathons" | "Projects" | "Certificates" | "Events" | "Presentations" | "Other";
  src: string;
  alt: string;
}
