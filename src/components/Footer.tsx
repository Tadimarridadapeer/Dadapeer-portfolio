import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-16 py-12">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} Tadimarri Dadapeer. All rights reserved.
        </p>
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
