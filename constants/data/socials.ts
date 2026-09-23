import type { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  { name: "GitHub", url: (process.env.NEXT_PUBLIC_GITHUB_URL || "").trim(), iconName: "Github" },
  { name: "LinkedIn", url: (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim(), iconName: "Linkedin" },
  { name: "Resume", url: (process.env.NEXT_PUBLIC_RESUME_URL || "").trim(), iconName: "Resume" },
];
