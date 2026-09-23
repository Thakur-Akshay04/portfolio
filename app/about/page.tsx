import type { Metadata } from "next";
import About from "@/components/sections/About";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
};

export default function AboutPage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <About />
    </main>
  );
}
