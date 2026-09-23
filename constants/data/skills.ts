import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
    ],
  },
  {
    title: "Frontend Technologies",
    items: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend & Frameworks",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "PostgreSQL (pgvector)" },
      { name: "Redis" },
    ],
  },
  {
    title: "DevOps & Tools",
    items: [
      { name: "AWS" },
      { name: "Git" },
      { name: "Docker" },
      { name: "Nginx" },
    ],
  },
  {
    title: "AI & APIs",
    items: [
      { name: "Meta Llama-3" },
      { name: "Groq Cloud" },
      { name: "LangChain.js" },
      { name: "REST APIs" },
    ],
  },
];

export const TECH_CATEGORIES = skills;
