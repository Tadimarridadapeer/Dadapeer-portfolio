"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Globe, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ExternalLink 
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  liveUrl?: string;
  previewImage: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: "pstylst",
    name: "P'STYLST",
    tagline: "AI-Powered Personal Stylist Intelligence",
    category: "AI & Computer Vision",
    year: "2025",
    description:
      "An AI-powered personal styling platform combining computer vision and generative AI to deliver personalized outfit recommendations, smart wardrobe intelligence, and real-time aesthetic curation.",
    liveUrl: "https://www.pstylst.com/",
    previewImage: "/projects_images/pstylst-hero.png",
    highlights: ["Computer Vision", "LLM Integration", "Wardrobe Curation"],
  },
  {
    id: "writersthing",
    name: "Writersthing",
    tagline: "Digital Publishing Ecosystem for Authors",
    category: "Publishing SaaS",
    year: "2025",
    description:
      "A modern digital publishing ecosystem built for authors and readers to write, manage, distribute, and monetize books with an intuitive, scalable web reader and author portal.",
    liveUrl: "https://www.writersthing.com/",
    previewImage: "/projects_images/writersthing-hero.png",
    highlights: ["Web Reader", "Monetization", "Cloud Storage"],
  },
  {
    id: "kollimalai",
    name: "Kollimalai Natural Store",
    tagline: "Direct-from-Origin E-Commerce Platform",
    category: "E-Commerce",
    year: "2024",
    description:
      "A direct-from-origin e-commerce platform bringing authentic natural products from Kolli Hills to customers through a modern, seamless digital shopping experience with regional payments.",
    liveUrl: "https://www.kollimalainaturalstore.com/",
    previewImage: "/projects_images/kollimalai-hero.png",
    highlights: ["Custom Cart", "Payment Gateway", "Order Tracking"],
  },
  {
    id: "crossmotive",
    name: "CrossMotive Services",
    tagline: "Enterprise Operations & BPO Platform",
    category: "Enterprise Operations",
    year: "2024",
    description:
      "An enterprise operations and BPO management platform providing specialized services across data annotation, IT administration, and financial workflows with real-time operational metrics.",
    liveUrl: "https://www.crossmotiveservices.com/",
    previewImage: "/projects_images/crossmotive-hero.png",
    highlights: ["Operations Dashboard", "Workflow Automation", "BPO Analytics"],
  },
  {
    id: "vegetabletonnes",
    name: "VegetableTonnes",
    tagline: "B2B AgriTech Auction Marketplace",
    category: "AgriTech B2B",
    year: "2024",
    description:
      "India's premier B2B agriculture bidding and marketplace platform connecting farmers directly with bulk buyers through real-time digital auctions and transparent market rates.",
    liveUrl: "https://www.vegetabletonnes.com/",
    previewImage: "/projects_images/vegetabletonnes-hero.png",
    highlights: ["Live Bidding", "Bulk Auctions", "Market Price Intelligence"],
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

export function SelectedWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation when hovering or focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === "ArrowRight") slideNext();
      if (e.key === "ArrowLeft") slidePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, slideNext, slidePrev]);

  const activeProject = projects[currentIndex];

  return (
    <section 
      id="work" 
      className="w-full py-12 md:py-20 border-t border-border overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Title and Sliding Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/5 text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Curated Showcase · 0{currentIndex + 1} of 0{projects.length}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-secondary mt-2 max-w-xl">
            Slide through production software built across AI, SaaS ecosystems, and product engineering.
          </p>
        </div>

        {/* Desktop / Tablet Slider Controls */}
        <div className="flex items-center gap-3 select-none">
          {/* Progress Indicator Bar */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-secondary/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={slidePrev}
            className="w-12 h-12 rounded-full border border-border/80 bg-white/90 backdrop-blur-sm text-primary hover:bg-secondary/10 active:scale-95 transition-all flex items-center justify-center shadow-sm focus:outline-none"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={slideNext}
            className="w-12 h-12 rounded-full border border-border/80 bg-primary text-background hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center shadow-md focus:outline-none"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Animated Sliding Project Stage */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                slideNext();
              } else if (info.offset.x > 60) {
                slidePrev();
              }
            }}
            className="w-full bg-white border border-border/80 rounded-2xl md:rounded-3xl shadow-xl shadow-black/[0.03] overflow-hidden"
          >
            {/* macOS Browser Mockup Top Bar */}
            <div className="w-full px-5 py-3.5 bg-neutral-50/80 border-b border-border/60 flex items-center justify-between text-xs text-secondary/60 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
              </div>

              {/* Centered URL Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-border/60 text-secondary text-[11px] shadow-2xs max-w-[280px] truncate">
                <span className="text-secondary/40">https://</span>
                <span className="font-medium text-primary">{activeProject.id}.portfolio.dev</span>
              </div>

              {/* Category pill */}
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-[11px] text-secondary font-medium tracking-wide">
                {activeProject.category}
              </span>
            </div>

            {/* Project Card Body (Responsive Split Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Cinematic Visual Preview Image */}
              <div className="lg:col-span-7 relative bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-border/60 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden group">
                <Link
                  href={`/work/${activeProject.id}`}
                  className="relative w-full aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-black/5 bg-white flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={activeProject.previewImage}
                    alt={`${activeProject.name} showcase`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-primary text-xs font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center gap-1.5">
                      View Project <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right Column: Project Meta, Story, and Actions */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
                <div>
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                    <span>{activeProject.category}</span>
                    <span className="px-2 py-0.5 rounded-md bg-secondary/5 border border-border/50">
                      {activeProject.year}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <Link href={`/work/${activeProject.id}`} className="block group">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary tracking-tight group-hover:text-neutral-700 transition-colors">
                      {activeProject.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium text-secondary/90 mt-1">
                    {activeProject.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-secondary leading-relaxed mt-4">
                    {activeProject.description}
                  </p>

                  {/* Key Highlights Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {activeProject.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-secondary/5 border border-border/60 text-xs font-medium text-secondary"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center gap-3">
                  {/* Primary: View Case Study */}
                  <Link
                    href={`/work/${activeProject.id}`}
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary text-background font-medium hover:bg-primary/90 active:scale-95 transition-all text-sm shadow-sm group"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Secondary: Visit Live Site */}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-border hover:bg-secondary/5 active:scale-95 transition-all text-sm font-medium text-primary"
                    >
                      <Globe className="w-4 h-4 text-secondary" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5 text-secondary/60" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Interactive Project Switcher (Quick-jump Pills) */}
      <div className="mt-6 md:mt-8 flex items-center justify-start sm:justify-center overflow-x-auto py-2 no-scrollbar gap-2">
        {projects.map((project, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={project.id}
              onClick={() => goToSlide(idx)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 whitespace-nowrap focus:outline-none ${
                isActive
                  ? "text-white"
                  : "text-secondary hover:text-primary hover:bg-secondary/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectPill"
                  className="absolute inset-0 bg-[#1c1d21] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="font-mono opacity-60 mr-1.5">0{idx + 1}</span>
              <span>{project.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-secondary/50 font-mono tracking-wider uppercase mt-4">
        <span>← Swipe to slide projects →</span>
      </div>
    </section>
  );
}
