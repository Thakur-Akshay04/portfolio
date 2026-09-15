import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills | Akshay Singh Thakur",
  description: "Technical skill set and proficiency across frontend frameworks, backend runtimes, databases, cloud architecture, DevOps, and AI models.",
};

export default function SkillsPage() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Skills />
    </main>
  );
}
