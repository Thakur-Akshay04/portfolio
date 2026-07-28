"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

const BackgroundGlobe = dynamic(() => import("@/components/sections/BackgroundGlobe"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Persistent Background Globe Effect across the Webpage */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none opacity-40 md:opacity-60 overflow-hidden">
        <BackgroundGlobe />
      </div>

      {/* Main Portfolio Page Sections */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />

        {/* Footer */}
        <footer className="py-8 text-center text-xs font-mono text-gray-500 border-t border-accent-purple/10 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-7 flex justify-center items-center">
            <p>© {new Date().getFullYear()} Akshay Singh Thakur.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
