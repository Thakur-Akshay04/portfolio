export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export type TechItem = SkillItem;
export type TechCategory = SkillCategory;
