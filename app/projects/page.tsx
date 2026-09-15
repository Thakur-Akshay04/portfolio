import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects | Akshay Singh Thakur",
  description: "Featured engineering projects built by Akshay Singh Thakur, including Luminote (AI notes workspace), ResuCraft (AI resume optimizer), and CredVault (blockchain credentials).",
};

export default function ProjectsPage() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Projects />
    </main>
  );
}
