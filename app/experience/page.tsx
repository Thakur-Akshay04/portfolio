import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience | Akshay Singh Thakur",
  description: "Professional journey, internships, and engineering impact of Akshay Singh Thakur.",
};

export default function ExperiencePage() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Experience />
    </main>
  );
}
