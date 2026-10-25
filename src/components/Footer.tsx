import Link from "next/link";
import { BrickBuilderGame } from "@/components/BrickBuilderGame";
import { VisitorCounter } from "@/components/VisitorCounter";

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-16 py-12">
      {/* Interactive Brick Builder Game Section — Spanning Full Width */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 mb-12">
        <BrickBuilderGame />
      </div>

      {/* Existing Footer Links and Copyright */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} Tadimarri Dadapeer. All rights reserved.
          </p>
          <VisitorCounter />
        </div>
        <div className="flex gap-6">
          <Link href="mailto:tadimarridadapeer@gmail.com" className="text-sm text-secondary hover:text-primary transition-colors">
            Email
          </Link>
          <Link href="https://www.linkedin.com/in/dada-peer-/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-primary transition-colors">
            LinkedIn
          </Link>
          <Link href="https://github.com/Tadimarridadapeer" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-primary transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
