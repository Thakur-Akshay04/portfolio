import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About | Akshay Singh Thakur",
  description: "Learn about Akshay Singh Thakur, a Full-Stack & MERN Developer specializing in high-performance web systems, modern React applications, and backend engineering.",
};

export default function AboutPage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <About />
    </main>
  );
}
