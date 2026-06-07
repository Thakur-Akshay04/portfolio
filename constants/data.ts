export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export interface Skill {
  name: string;
  iconName: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
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
    taglineWords: ["MERN Stack Developer", "Full Stack Developer"],
    bio: [
      "I am a Full-stack / MERN developer specializing in building responsive web applications and scalable cloud-based solutions. I focus on creating pixel-perfect user interfaces and designing highly efficient API architectures.",
      "My recent work includes developing AI-powered tools like the AI Resume Tailor and engineering secure verification systems for academic credentials with CredVault.",
      "I thrive in Agile team environments, enjoy optimizing web performance and accessibility, and constantly push the boundaries of React, TypeScript, Node.js, and modern web technologies."
    ],
    email: process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "akshaysinghthakur0004@gmail.com",
    location: "Himachal Pradesh, India",
  },
  
  stats: [
    { value: 5, label: "Projects Completed", suffix: "+" },
    { value: 1, label: "Internship Completed", suffix: "" },
    { value: 3, label: "Certifications Earned", suffix: "" },
  ] as Stat[],

  skills: [
    {
      title: "Frontend Development",
      skills: [
        { name: "React 19 / 18", iconName: "Code2", level: 92 },
        { name: "Vite", iconName: "ArrowUpRight", level: 90 },
        { name: "Tailwind CSS", iconName: "Palette", level: 95 },
        { name: "TanStack Query (v5)", iconName: "RefreshCw", level: 85 },
        { name: "Zustand", iconName: "Sliders", level: 88 },

        { name: "HTML5 & CSS3", iconName: "Flame", level: 95 },
        { name: "React Router DOM", iconName: "Share2", level: 92 },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js & Express.js", iconName: "Server", level: 90 },
        { name: "REST APIs (Axios/Fetch)", iconName: "Cpu", level: 92 },
        { name: "MongoDB & Mongoose", iconName: "Database", level: 88 },
        { name: "Clerk Auth", iconName: "Lock", level: 85 },
        { name: "Supabase Auth", iconName: "Shield", level: 85 },
        { name: "JWT & Bcrypt", iconName: "Lock", level: 85 },
        { name: "MySQL & Databases", iconName: "Database", level: 88 },
      ],
    },
    {
      title: "Blockchain & DevOps",
      skills: [
        { name: "Solidity (Ethereum)", iconName: "Box", level: 82 },
        { name: "Hardhat & Ethers.js", iconName: "Activity", level: 84 },
        { name: "MetaMask Wallet", iconName: "Wallet", level: 85 },
        { name: "Docker & Compose", iconName: "Container", level: 78 },
        { name: "Nginx", iconName: "Globe", level: 80 },
        { name: "Jest & Supertest", iconName: "Gauge", level: 80 },
        { name: "SonarQube Cloud", iconName: "CheckSquare", level: 75 },
        { name: "Puppeteer (PDF Generation)", iconName: "FileText", level: 82 },
        { name: "Git & GitHub", iconName: "GitCommit", level: 90 },
      ],
    },
  ] as SkillCategory[],

  projects: [
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
        "Vite",
        "Tailwind CSS",
        "TanStack Query (v5)",
        "Zustand",
        "Node.js",
        "Express.js",
        "Puppeteer",
        "REST APIs",
        "MongoDB",
        "Clerk Auth",
        "Groq Cloud API",
        "Meta Llama-3",
        "Docker",
        "Docker Compose",
        "Nginx",
        "Jest",
        "Supertest",
        "SonarQube Cloud"
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
      fullDescription: "CredVault solves academic credential fraud by storing certificate records permanently on the Ethereum blockchain. Academic institutions issue credentials via smart contracts, which live on the Ethereum blockchain and are cryptographically verifiable by anyone, forever.\n\nKey Features Built:\n• On-chain credential issuance via a Solidity smart contract\n• Cryptographic verification — verify any credential's authenticity by its hash\n• Dual authentication using Supabase (Email/password + Google OAuth)\n• MetaMask wallet integration for secure transaction signing\n• REST API with 5 endpoints for credential CRUD operations\n• Glassmorphism UI with custom animations and responsive layout design",
      challenge: "Credential fraud is rampant — degrees get faked, certificates get forged.",
      solution: "Built a decentralized registry system featuring on-chain credential issuance via a Solidity smart contract, cryptographic verification via credential hash, MetaMask wallet integration, and Supabase OAuth authentication, backed by Node.js, Express.js, and MongoDB.",
      features: [
        "On-chain certificate registry using Solidity smart contracts",
        "Cryptographic verification checks based on document hash validity",
        "Flexible OAuth and credentials login backed by Supabase Auth"
      ],
      techStack: [
        "React 18",
        "Ethers.js",
        "CSS3 (Glassmorphism)",
        "React Router DOM",
        "HTML5 & CSS3",
        "Bootstrap 5",
        "Node.js",
        "Express.js",
        "REST API",
        "MongoDB",
        "Mongoose",
        "Supabase",
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
      role: "Frontend Web-Developer (Intern)",
      company: "1Stop ai",
      period: "Jan 2025 - Mar 2025",
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
    { name: "LinkedIn", url: "https://linkedin.com/in/thakur-akshay04", iconName: "Linkedin" },
    { name: "Resume", url: "#", iconName: "Resume" },
  ] as SocialLink[],
};
