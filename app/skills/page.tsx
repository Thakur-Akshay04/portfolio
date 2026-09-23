import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.skills.title,
  description: siteConfig.pages.skills.description,
};

export default function SkillsPage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <Skills />
    </main>
  );
}
