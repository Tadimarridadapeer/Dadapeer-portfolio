"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/#work" },
  { name: "How I Build", href: "/#engineering" },
  { name: "Writing", href: "/#writing" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-80">
          <Image 
            src="/favicon.jpg" 
            alt="Logo" 
            width={24} 
            height={24} 
            className="rounded-full border border-border/50 group-hover:scale-105 transition-transform" 
          />
          <span className="font-medium tracking-tight text-primary">Tadimarri Dadapeer</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Mobile Nav Toggle can go here, but for now we keep it minimal */}
      </div>
    </header>
  );
}
