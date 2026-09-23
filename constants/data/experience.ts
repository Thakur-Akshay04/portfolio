import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software Development Intern",
    company: "Worisgo",
    period: "July 2025 – September 2025",
    location: "Remote",
    description:
      "Built and shipped back-end services for a real-time employee management system, working across Spring Boot, Node.js, and Firebase Cloud Functions. Focused on performance and reliability — the system supported 30–40 concurrent users with sub-150ms latency and 99.9% uptime. Also led a legacy-to-modern system integration, connecting new Node.js/Spring Boot services to an existing PHP platform with zero data loss and zero downtime during migration.",
    achievements: [
      "Delivered a real-time system achieving <150ms latency and 99.9% uptime for 30–40 concurrent users",
      "Improved database access speed by ~40% through MongoDB and Firestore schema design and scaling",
      "Migrated legacy PHP services to a modern Node.js/Spring Boot architecture with zero downtime",
      "Collaborated in a 3-person Agile team using Git/GitHub workflows (feature branches, PR reviews)",
    ],
    techStack: [
      "Spring Boot",
      "Node.js",
      "Firebase Cloud Functions",
      "MongoDB",
      "Firestore",
      "Java",
      "JDBC",
      "Hibernate/JPA",
      "Git",
    ],
  },
];
