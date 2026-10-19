import { Writing } from "@/components/Writing";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Writing | Tadimarri Dadapeer",
  description: "Articles, thoughts, and essays by Tadimarri Dadapeer.",
};

export default function WritingPage() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-secondary/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
      <Writing />
    </div>
  );
}
