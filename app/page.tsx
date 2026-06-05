import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Unique IDs used inside section components matches target anchors */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 text-center text-xs font-mono text-gray-500 border-t border-accent-purple/5 bg-black">
        <div className="max-w-7xl mx-auto px-7 flex justify-center items-center">
          <p>© {new Date().getFullYear()} Akshay Singh Thakur.</p>
        </div>
      </footer>
    </main>
  );
}
