"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Globe, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";

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

export function SelectedWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Update scroll buttons & active index on scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - 10);

    // Calculate nearest active card
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).clientWidth + 24
      : 800;
    const newIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(newIndex);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll by one card
  const scrollByCard = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.firstElementChild as HTMLElement;
    const cardWidth = card ? card.clientWidth + 24 : 800;

    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  // Scroll to a specific project
  const scrollToProject = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="work" className="w-full py-12 md:py-20 border-t border-border overflow-hidden">
      {/* Header with Title and Scroll Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white shadow-xs text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Showcase · 0{activeIndex + 1} of 0{projects.length}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-secondary mt-2 max-w-xl leading-relaxed">
            Scroll horizontally to explore production software built across AI systems, SaaS platforms, and digital products.
          </p>
        </div>

        {/* Scroll Controls & Indicator */}
        <div className="flex items-center gap-3 select-none">
          {/* Progress Indicator Bar */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToProject(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-secondary/40"
                }`}
                aria-label={`Scroll to project ${idx + 1}`}
              />
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full border border-border bg-white text-primary transition-all flex items-center justify-center shadow-xs focus:outline-none ${
              canScrollLeft
                ? "hover:bg-secondary/10 hover:border-secondary/40 active:scale-95 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full border border-border bg-primary text-background transition-all flex items-center justify-center shadow-md focus:outline-none ${
              canScrollRight
                ? "hover:bg-primary/90 active:scale-95 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Jump Project Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => scrollToProject(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              idx === activeIndex
                ? "bg-primary text-background border-primary shadow-xs"
                : "bg-white text-secondary border-border hover:border-secondary/40 hover:text-primary"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing -mx-4 px-4 sm:-mx-6 sm:px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[88vw] sm:w-[680px] lg:w-[840px] flex-shrink-0 snap-center bg-white border border-border rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* macOS Browser Mockup Top Bar */}
            <div className="w-full px-5 py-3.5 bg-neutral-50/80 border-b border-border/70 flex items-center justify-between text-xs text-secondary/60 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
              </div>

              {/* Centered URL Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-border/60 text-secondary text-[11px] shadow-2xs max-w-[280px] truncate">
                <span className="text-secondary/40">https://</span>
                <span className="font-medium text-primary">{project.id}.portfolio.dev</span>
              </div>

              {/* Category pill */}
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-[11px] text-secondary font-medium tracking-wide">
                {project.category}
              </span>
            </div>

            {/* Project Card Body (Responsive Split Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
              {/* Left Column: Cinematic Visual Preview Image */}
              <div className="lg:col-span-7 relative bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-border/60 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden group">
                <Link
                  href={`/work/${project.id}`}
                  className="relative w-full aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-black/5 bg-white flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={project.previewImage}
                    alt={`${project.name} showcase`}
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
              <div className="lg:col-span-5 p-6 sm:p-7 md:p-8 flex flex-col justify-between bg-white">
                <div>
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-secondary/70 mb-2.5">
                    <span>{project.category}</span>
                    <span className="px-2 py-0.5 rounded-md bg-secondary/5 border border-border/50">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <Link href={`/work/${project.id}`} className="block group">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary tracking-tight group-hover:text-neutral-700 transition-colors">
                      {project.name}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm font-medium text-secondary/90 mt-1">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-3.5 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Key Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-secondary/5 border border-border/60 text-[11px] font-medium text-secondary"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/work/${project.id}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-background text-xs sm:text-sm font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-secondary hover:text-primary hover:bg-secondary/5 transition-all text-xs sm:text-sm font-medium"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3 text-secondary/60" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden flex items-center justify-center gap-2 text-xs text-secondary/70 mt-2 font-mono">
        <span>← Swipe horizontally to explore projects →</span>
      </div>
    </section>
  );
}
