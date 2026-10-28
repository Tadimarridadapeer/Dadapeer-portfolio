"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ArrowDown } from "lucide-react";

const desktopNavItems = [
  { name: "Case Studies", href: "/#work" },
  { name: "Today I Learned", href: "/learning" },
  { name: "Writing", href: "/#writing" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const mobileNavItems = [
  { name: "Projects", href: "/projects", tag: "Page" },
  { name: "Today I Learned (TIL)", href: "/learning", tag: "Page" },
  { name: "How I Built", href: "/how-i-built", tag: "Page" },
  { name: "About", href: "/#about", tag: "Scroll" },
  { name: "Writing", href: "/writing", tag: "Page" },
  { name: "Contact", href: "/#contact", tag: "Scroll" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 flex h-16 items-center justify-between">
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 group transition-opacity hover:opacity-85"
        >
          <Image 
            src="/favicon.png" 
            alt="Tadimarri Dadapeer Logo" 
            width={44} 
            height={44} 
            className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-md group-hover:scale-105 transition-transform" 
            priority
          />
          <span className="font-semibold text-base sm:text-lg tracking-tight text-primary">
            Tadimarri Dadapeer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {desktopNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-primary hover:bg-secondary/10 transition-colors focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl overflow-hidden px-6 py-5 shadow-xl"
          >
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3.5 px-3 rounded-xl text-base font-medium text-primary hover:bg-secondary/5 transition-colors border-b border-border/40 last:border-none"
                  >
                    <span className="text-primary font-medium">{item.name}</span>
                    <span className="text-xs text-secondary/60 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      {item.tag === "Page" ? (
                        <>
                          <span>View</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-secondary/70" />
                        </>
                      ) : (
                        <>
                          <span>Scroll</span>
                          <ArrowDown className="w-3.5 h-3.5 text-secondary/70" />
                        </>
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
