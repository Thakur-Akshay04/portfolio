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

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Akshay Singh Thakur",
    email: (process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "").trim(),
    location: "Himachal Pradesh, India",
  },

  projects: [
    {
      id: "project-3",
      title: "Luminote",
      category: "Full Stack / Productivity",
      liveUrl: "https://luminote.demo.dev",
      githubUrl: "https://github.com/Thakur-Akshay04/Luminote",
      description: "An AI-powered notes application supporting rich text, hand-drawn sketchpads, and voice memos. Features automated background note summarization, interactive Q&A chat, AI task checklist extraction, and vector-based semantic search.",
      features: [
        "Interactive multi-format editor for text notes, checklists, canvas drawings, and voice recordings",
        "LLM-powered background note summarization, interactive Q&A, and task auto-extraction",
        "Semantic similarity search powered by OpenAI text embeddings and pgvector storage",
        "Real-time websocket alert checks and notification pushes for note-linked reminders"
      ],
      techStack: [
        "Next.js",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "Redis",
        "Groq API",
        "Groq Whisper"
      ],
    },
    {
      id: "project-1",
      title: "ResuCraft",
      subtitle: "AI Resume Builder & ATS Optimizer",
      category: "Full Stack / AI",
      githubUrl: "https://github.com/Thakur-Akshay04/Res_AI",
      description: "A full-stack web application designed to help job seekers instantly tailor their resumes to specific job descriptions.",
      features: [
        "Real-time ATS keyword auditing using Groq Cloud API (Llama-3)",
        "Live print-ready PDF preview generated instantly on editor input change",
        "Secure user workspace with multi-provider login via Clerk Auth"
      ],
      techStack: [
        "React 19",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Puppeteer",
        "REST APIs",
        "MongoDB",
        "Clerk Auth",
        "Groq Cloud API",
        "Meta Llama-3",
        "Docker"
      ],
    },
    {
      id: "project-2",
      title: "CredVault - Blockchain Credentials",
      category: "Blockchain / Web3",
      githubUrl: "https://github.com/Thakur-Akshay04/CredValut",
      description: "A blockchain-based credential registry on Ethereum — issue, store, and verify academic certificates using smart contracts.",
      features: [
        "On-chain certificate registry using Solidity smart contracts",
        "Cryptographic verification checks based on document hash validity",
        "Flexible OAuth and credentials login backed by Supabase Auth"
      ],
      techStack: [
        "React",
        "Ethers.js",
        "CSS3",
        "HTML5 & CSS3",
        "Bootstrap 5",
        "Node.js",
        "Express.js",
        "REST API",
        "MongoDB",
        "Solidity",
        "Hardhat",
        "MetaMask",
        "JWT & Bcrypt"
      ],
    },
  ] as Project[],

  experience: [
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
  ] as ExperienceItem[],

  socials: [
    { name: "GitHub", url: (process.env.NEXT_PUBLIC_GITHUB_URL || "").trim(), iconName: "Github" },
    { name: "LinkedIn", url: (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim(), iconName: "Linkedin" },
    { name: "Resume", url: (process.env.NEXT_PUBLIC_RESUME_URL || "").trim(), iconName: "Resume" },
  ] as SocialLink[],
};
