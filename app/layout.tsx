import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import GlobalPathsBackground from "@/components/ui/background/GlobalPathsBackground";

const chillaxFont = localFont({
  src: [
    {
      path: "./fonts/Chillax-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
        className={`${chillaxFont.variable} ${monoFont.variable} font-sans antialiased bg-background text-foreground`}
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
