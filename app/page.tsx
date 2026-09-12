"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import CyberAtmosphereBackground from "@/components/ui/CyberAtmosphereBackground";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* 1. Hero Section - Completely Pure Black Background */}
      <div className="relative w-full bg-black z-20">
        <Hero />
      </div>

      {/* 2. Cyber Atmosphere Background from About Me downwards */}
      <div className="relative flex flex-col min-h-screen z-10">
        <CyberAtmosphereBackground />

        <div className="relative z-10 flex flex-col">
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
      </div>
    </main>
  );
}
