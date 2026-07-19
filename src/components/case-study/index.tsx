"use client";

import React, { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code, LayoutTemplate } from "lucide-react";

// --- LAYOUT & NAVIGATION ---

export function CaseStudyLayout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen w-full bg-background selection:bg-primary/20">
      {/* Sticky Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <Link href="/#work" className="w-12 h-12 rounded-full border border-border bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-secondary/5 transition-colors group">
          <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <main className="w-full flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}

// --- ANIMATION WRAPPERS ---

export function FadeIn({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- SECTIONS ---

// 1. Hero Section
export function Hero({
  name, category, vision, role, teamSize, status, platform, liveUrl, githubUrl, prototypeUrl, heroImage
}: {
  name: string; category: string; vision: string; role: string; teamSize: string; status: string; platform: string;
  liveUrl?: string; githubUrl?: string; prototypeUrl?: string; heroImage?: string;
}) {
  return (
    <section className="w-full max-w-7xl px-6 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
      <FadeIn>
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary/5 text-xs font-medium text-secondary tracking-widest uppercase mb-8">
          {category}
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-primary mb-6">{name}</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-xl md:text-3xl text-secondary font-light max-w-4xl mx-auto leading-relaxed mb-16">
          {vision}
        </p>
      </FadeIn>
      
      <FadeIn delay={0.3} className="w-full">
        {heroImage && (
          <div className="w-full aspect-[21/9] bg-secondary/5 border border-border rounded-3xl mb-16 flex items-center justify-center overflow-hidden">
             <img src={heroImage} alt={`${name} Hero`} className="w-full h-full object-cover" />
          </div>
        )}
      </FadeIn>

      <FadeIn delay={0.4} className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-y border-border py-8 text-left">
        <div><p className="text-xs text-secondary tracking-widest uppercase mb-2">My Role</p><p className="font-medium text-primary">{role}</p></div>
        <div><p className="text-xs text-secondary tracking-widest uppercase mb-2">Team Size</p><p className="font-medium text-primary">{teamSize}</p></div>
        <div><p className="text-xs text-secondary tracking-widest uppercase mb-2">Status</p><p className="font-medium text-primary">{status}</p></div>
        <div><p className="text-xs text-secondary tracking-widest uppercase mb-2">Platform</p><p className="font-medium text-primary">{platform}</p></div>
      </FadeIn>

      <FadeIn delay={0.5} className="mt-16 flex flex-wrap justify-center gap-4">
        {liveUrl && (
          <Link href={liveUrl} target="_blank" className="h-12 px-8 rounded-full bg-primary text-background font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            View Live Product <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" className="h-12 px-8 rounded-full border border-border bg-transparent text-primary font-medium flex items-center gap-2 hover:bg-secondary/5 transition-colors">
            <Code className="w-4 h-4" /> Github
          </Link>
        )}
        {prototypeUrl && (
          <Link href={prototypeUrl} target="_blank" className="h-12 px-8 rounded-full border border-border bg-transparent text-primary font-medium flex items-center gap-2 hover:bg-secondary/5 transition-colors">
            <LayoutTemplate className="w-4 h-4" /> Prototype
          </Link>
        )}
      </FadeIn>
    </section>
  );
}

// Text Section (Used for Exec Summary, Problem, Vision, Strategy, etc.)
export function TextSection({ title, label, children }: { title: string; label?: string; children: ReactNode }) {
  return (
    <section className="w-full max-w-4xl px-6 py-24 md:py-32">
      <FadeIn>
        {label && <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">{label}</p>}
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-12">{title}</h2>
        <div className="prose prose-lg md:prose-xl prose-p:text-secondary prose-p:leading-relaxed prose-p:font-light prose-strong:text-primary prose-strong:font-medium prose-headings:text-primary max-w-none">
          {children}
        </div>
      </FadeIn>
    </section>
  );
}

// Metric Dashboard Section
export function MetricsDashboard({ metrics }: { metrics: { label: string, value: string, suffix?: string }[] }) {
  return (
    <section className="w-full max-w-7xl px-6 py-24 md:py-32">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-16 text-center">Impact & Results</h2>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <FadeIn key={i} delay={i * 0.1} className="p-8 rounded-3xl border border-border bg-secondary/5 flex flex-col items-center justify-center text-center">
            <p className="text-5xl md:text-6xl font-semibold text-primary mb-2">
              {m.value}<span className="text-accent">{m.suffix}</span>
            </p>
            <p className="text-sm font-medium text-secondary tracking-wide uppercase">{m.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// Feature/Challenge Card Grid
export function CardGrid({ title, items }: { title: string, items: { title: string, description: string, tag?: string }[] }) {
  return (
    <section className="w-full max-w-7xl px-6 py-24 md:py-32">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-16">{title}</h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1} className="p-8 md:p-12 rounded-3xl border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors">
            {item.tag && <span className="inline-block px-3 py-1 rounded-full border border-border bg-background text-xs font-medium text-primary mb-6">{item.tag}</span>}
            <h3 className="text-2xl font-medium text-primary mb-4">{item.title}</h3>
            <p className="text-secondary leading-relaxed">{item.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// Architecture/Diagram Placeholder
export function DiagramPlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <section className="w-full max-w-7xl px-6 py-24 md:py-32">
       <FadeIn>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-6">{title}</h2>
            <p className="text-xl text-secondary font-light">{description}</p>
          </div>
          <div className="w-full aspect-video bg-background/50 border border-border rounded-3xl flex flex-col items-center justify-center border-dashed relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background"></div>
            <span className="relative z-10 text-secondary/40 font-medium tracking-widest uppercase text-sm">Interactive Architecture Diagram</span>
          </div>
       </FadeIn>
    </section>
  );
}

// Tech Stack Grid
export function TechStack({ categories }: { categories: { name: string, technologies: string[] }[] }) {
  return (
    <section className="w-full max-w-7xl px-6 py-24 md:py-32 border-t border-border mt-16">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-16 text-center">Technology Stack</h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {categories.map((cat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <h3 className="text-sm font-semibold tracking-widest text-secondary uppercase mb-6">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.technologies.map(t => (
                <span key={t} className="px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium text-primary">{t}</span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// Image Gallery
export function ImageGallery({ images }: { images: { label: string }[] }) {
  return (
    <section className="w-full max-w-[100rem] mx-auto px-6 py-24 md:py-32">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {images.map((img, i) => (
            <FadeIn key={i} delay={i * 0.1} className={`w-full ${i === 0 ? 'md:col-span-2 lg:col-span-3 aspect-[21/9]' : 'aspect-[4/3]'} bg-secondary/5 border border-border rounded-3xl flex items-center justify-center overflow-hidden hover:scale-[1.02] transition-transform duration-500`}>
              <span className="text-secondary/40 font-medium tracking-widest uppercase text-sm">{img.label} Mockup</span>
            </FadeIn>
         ))}
       </div>
    </section>
  );
}
