import type { Metadata } from "next";
import { DemoBackgroundPaths } from "@/components/ui/demo";

export const metadata: Metadata = {
  title: "Demo | Background Paths",
  description: "Interactive demo for the Background Paths component with animated floating SVG paths.",
};

export default function DemoPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <DemoBackgroundPaths />
    </main>
  );
}
