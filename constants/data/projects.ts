import type { Project } from "@/types";

export const projects: Project[] = [
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
];
