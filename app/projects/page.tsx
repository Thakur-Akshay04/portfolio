import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.projects.title,
  description: siteConfig.pages.projects.description,
};

export default function ProjectsPage() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Projects />
    </main>
  );
}
