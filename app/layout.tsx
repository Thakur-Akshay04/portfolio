import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import GlobalPathsBackground from "@/components/ui/GlobalPathsBackground";

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
  title: "Akshay Singh Thakur | Full Stack & MERN Developer",
  description: "Explore the portfolio of Akshay Singh Thakur, Full-Stack & MERN Developer building high-performance web systems with clean architecture, modern React interfaces, and AI integration.",
  keywords: "Full Stack Developer, MERN Stack Developer, React, Next.js, Node.js, Cloud, DevOps, Portfolio",
  authors: [{ name: "Akshay Singh Thakur" }],
  openGraph: {
    title: "Akshay Singh Thakur | Full Stack Developer",
    description: "Personal portfolio demonstrating MERN Stack engineering expertise, interactive React interfaces, and modern full-stack web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay Singh Thakur | Full Stack Developer",
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
  themeColor: "#070709",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          <div className="min-h-screen flex flex-col relative selection:bg-purple-500/30 selection:text-white">
            <GlobalPathsBackground />
            <Navbar />
            <div className="flex-grow flex flex-col pt-16 sm:pt-20 relative z-10">
              {children}
            </div>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
