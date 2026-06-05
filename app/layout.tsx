import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshay Singh Thakur",
  description: "Explore the personal portfolio of Akshay, a Full Stack & MERN Developer specializing in Next.js, React, Node.js, and high-performance cloud applications.",
  keywords: "Full Stack Developer, MERN Stack Developer, React, Next.js, Node.js, Cloud, DevOps, Portfolio",
  authors: [{ name: "Akshay" }],
  openGraph: {
    title: "Akshay Singh Thakur",
    description: "Personal portfolio demonstrating MERN Stack engineering expertise, interactive React interfaces, and modern full-stack web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay Singh Thakur",
    description: "Personal portfolio demonstrating MERN Stack engineering expertise, interactive React interfaces, and modern full-stack web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          <div className="max-w-[2200px] mx-auto border-x border-white/10 min-h-screen flex flex-col bg-black relative">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
