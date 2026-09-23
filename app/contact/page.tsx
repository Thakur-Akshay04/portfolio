import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.contact.title,
  description: siteConfig.pages.contact.description,
};

export default function ContactPage() {
  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center">
      <Contact />
    </main>
  );
}
