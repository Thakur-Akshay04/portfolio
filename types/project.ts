export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  category: string;
}
