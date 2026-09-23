export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Akshay Singh Thakur",
  title: "Akshay Singh Thakur | Full Stack & MERN Developer",
  description:
    "Explore the portfolio of Akshay Singh Thakur, Full-Stack & MERN Developer building high-performance web systems with clean architecture, modern React interfaces, and AI integration.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://akshaythakur.dev").trim(),
  ogImage: "/og.png",
  keywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Cloud",
    "DevOps",
    "Portfolio",
  ],
  author: {
    name: "Akshay Singh Thakur",
    url: "https://github.com/Thakur-Akshay04",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  pages: {
    about: {
      title: "About | Akshay Singh Thakur",
      description:
        "Learn about Akshay Singh Thakur, a Full-Stack & MERN Developer specializing in high-performance web systems, modern React applications, and backend engineering.",
    },
    skills: {
      title: "Skills | Akshay Singh Thakur",
      description:
        "Technical skill set and proficiency across frontend frameworks, backend runtimes, databases, cloud architecture, DevOps, and AI models.",
    },
    projects: {
      title: "Projects | Akshay Singh Thakur",
      description:
        "Featured engineering projects built by Akshay Singh Thakur, including Luminote (AI notes workspace), ResuCraft (AI resume optimizer), and CredVault (blockchain credentials).",
    },
    experience: {
      title: "Experience | Akshay Singh Thakur",
      description:
        "Professional journey, internships, and engineering impact of Akshay Singh Thakur.",
    },
    contact: {
      title: "Contact | Akshay Singh Thakur",
      description:
        "Get in touch with Akshay Singh Thakur for full-stack software engineering opportunities, consulting, or technical collaboration.",
    },
  },
};

export type SiteConfig = typeof siteConfig;

export default siteConfig;
