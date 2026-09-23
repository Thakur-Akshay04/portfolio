export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export type Experience = ExperienceItem;
