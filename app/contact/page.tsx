import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact | Akshay Singh Thakur",
  description: "Get in touch with Akshay Singh Thakur for full-stack software engineering opportunities, consulting, or technical collaboration.",
};

export default function ContactPage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <Contact />
    </main>
  );
}
