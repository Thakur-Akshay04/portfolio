export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  image: string;
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
    title: "Full-stack / MERN Developer",
    subtitle: "Developing High-Performance Full-Stack Web Applications with AI Integration",
    taglineWords: ["MERN Developer", "Full Stack Developer"],
    bio: [
      "I am a Full-stack / MERN developer focused on crafting clean user interfaces and highly efficient API architectures. I build responsive, modern web applications.",
      "I am passionate about creating high-performance digital experiences, experimenting with modern web standards, and integrating intelligent AI features into full-stack systems."
    ],
    email: process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "[EMAIL_ADDRESS] ",
    location: "Himachal Pradesh, India",
  },

  stats: [
    { value: 5, label: "Projects Completed", suffix: "+" },
    { value: 1, label: "Internship Completed", suffix: "" },
    { value: 3, label: "Certifications Earned", suffix: "" },
  ] as Stat[],

  projects: [
    {
      id: "project-3",
      title: "Luminote",
      category: "Full Stack / Productivity",
      image: "/images/luminote.png",
      liveUrl: "https://luminote.demo.dev",
      githubUrl: "https://github.com/Thakur-Akshay04/Luminote",
      description: "An AI-powered notes application supporting rich text, hand-drawn sketchpads, and voice memos. Features automated background note summarization, interactive Q&A chat, AI task checklist extraction, and vector-based semantic search.",
      fullDescription: "Luminote is a next-generation notes and productivity workspace built for developers and creators. Rather than limiting users to simple text, it supports text notes, interactive checklists, an HTML5 Canvas drawing board, and voice recording with auto-transcription. The application leverages a FastAPI backend connected to PostgreSQL and Redis, implementing pgvector for similarity searches across note embeddings and integrating LLMs for real-time document Q&A and task auto-generation.",
      solution: "Engineered a full-stack web application using Next.js and Tailwind CSS, backed by a FastAPI server, PostgreSQL (with pgvector), and Redis. Implemented a feature-rich editor supporting text, checklists, drawing, and audio transcriptions, alongside LLM-driven tools for Q&A, auto-summarization, and semantic search.",
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
      title: "AI Resume Tailor",
      category: "Full Stack / AI",
      image: "/images/ai_resume.png",
      liveUrl: "https://ai-resume.demo.dev",
      githubUrl: "https://github.com/Thakur-Akshay04/Res_AI",
      description: "A full-stack web application designed to help job seekers instantly tailor their resumes to specific job descriptions.",
      fullDescription: "AI Resume Tailor leverages Meta Llama-3 to provide real-time ATS keyword auditing, AI-powered summary and bullet-point rewriting, and live PDF rendering in a print-ready split-screen editor. It automates the tedious process of keyword-matching and formatting to drastically increase the chances of passing automated ATS filters.",
      challenge: "Job seekers often fail to pass automated ATS filters because they submit generic resumes.",
      solution: "Engineered a Live Split-Screen Editor where input changes instantly reflect on a live, print-ready PDF using React and Puppeteer. Integrated Groq Cloud API (Llama-3) to rewrite bullet points, summaries, and skills to align perfectly with target job descriptions, backed by Clerk Auth and MongoDB.",
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
      image: "/images/credvault.png",
      liveUrl: "https://credvault.demo.dev",
      githubUrl: "https://github.com/Thakur-Akshay04/CredValut",
      description: "A blockchain-based credential registry on Ethereum — issue, store, and verify academic certificates using smart contracts.",
      fullDescription: "CredVault solves academic credential fraud by storing certificate records permanently on the Ethereum blockchain. Academic institutions issue credentials via smart contracts, which live on the Ethereum blockchain and are cryptographically verifiable by anyone, forever.",
      challenge: "Credential fraud is rampant — degrees get faked, certificates get forged.",
      solution: "Built a decentralized registry system featuring on-chain credential issuance via a Solidity smart contract, cryptographic verification via credential hash, MetaMask wallet integration, and Supabase OAuth authentication, backed by Node.js, Express.js, and MongoDB.",
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
      role: "Web-Developer (Intern)",
      company: "1Stop ai",
      period: "July 2025 - Sept 2025",
      location: "Remote",
      description: "Developed client-facing features, dashboard components, and API integrations in a responsive web environment.",
      achievements: [
        "Built and maintained responsive web pages using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and mobile-first design.",
        "Developed reusable React components for a client-facing dashboard, improving code maintainability and reducing development time.",
        "Implemented Bootstrap grid layouts and utility classes to create consistent, responsive UI across multiple projects.",
        "Integrated REST APIs using fetch and axios to dynamically render data on product listing and user profile pages.",
        "Refactored interactive components to eliminate UI bugs, enhancing screen reader compatibility and overall usability.",
        "Managed version control using Git & GitHub, working on feature branches and merging via pull requests."
      ],
      techStack: ["React", "HTML5", "CSS3", "Bootstrap"],
    },
  ] as ExperienceItem[],

  socials: [
    { name: "GitHub", url: "https://github.com/Thakur-Akshay04", iconName: "Github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/akshaythakur04/", iconName: "Linkedin" },
    { name: "Resume", url: process.env.NEXT_PUBLIC_RESUME_URL || "https://drive.google.com/file/d/1FzXkmBibfAiv_Cn0avmqbnvTYzYaWgnD/view?usp=sharing", iconName: "Resume" },
  ] as SocialLink[],
};
