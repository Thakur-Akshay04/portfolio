import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.experience.title,
  description: siteConfig.pages.experience.description,
};

export default function ExperiencePage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <Experience />
    </main>
  );
}
