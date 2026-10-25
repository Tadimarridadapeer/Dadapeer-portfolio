"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Bot, Code2, Layers, ArrowDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { VisitorCounter } from "@/components/VisitorCounter";

const rotatingPhrases = [
  "zero-to-one applications",
  "AI-powered digital products",
  "intelligent SaaS platforms",
  "scalable full-stack systems",
];

const highlights = [
  {
    icon: Bot,
    title: "AI-Native Engineering",
    description: "LLMs, autonomous agents, RAG & generative interfaces",
  },
  {
    icon: Code2,
    title: "Full-Stack Craft",
    description: "Next.js, TypeScript, React & high-performance APIs",
  },
  {
    icon: Layers,
    title: "Zero-to-One Execution",
    description: "Product discovery, rapid prototyping & production scale",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      
      {/* Refined Ambient Lighting & Dot Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft radial atmospheric glow */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-neutral-200/50 via-neutral-100/30 to-transparent blur-[140px] rounded-full" />
        
        {/* Modern Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#80808022_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_30%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-4 sm:px-6 w-full"
      >
        {/* Top Status & Role Cluster */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {/* Role Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 bg-white/90 backdrop-blur-md shadow-xs text-xs font-medium text-primary">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>AI Product Engineer</span>
          </div>

          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-white/90 backdrop-blur-md shadow-xs text-xs font-medium text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for opportunities</span>
          </div>

          {/* Live Visitor Counter */}
          <VisitorCounter />
        </motion.div>

        {/* Elevated Kinetic Headline */}
        <motion.h1 
          variants={itemVariants} 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.15] font-normal tracking-tight text-primary mb-6 flex flex-col items-center select-none"
        >
          <span className="text-secondary/70">I build</span>
          
          <div className="relative h-[1.3em] w-full max-w-full flex items-center justify-center overflow-hidden my-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold text-primary tracking-tight whitespace-nowrap text-center px-2 underline decoration-accent/20 decoration-2 underline-offset-8"
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="text-secondary/70">from idea to production.</span>
        </motion.h1>

        {/* Crisp Subtitle */}
        <motion.p 
          variants={itemVariants} 
          className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-9 font-normal"
        >
          I combine product thinking, AI engineering, and high-fidelity design to architect intelligent software that solves real-world problems.
        </motion.p>

        {/* High-Craft Call To Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full mb-14">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-primary text-background font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/15 text-sm sm:text-base group"
          >
            <span>View Work</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">6+</span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-border bg-white/90 backdrop-blur-md text-primary font-medium hover:bg-secondary/5 hover:border-secondary/40 transition-all group text-sm sm:text-base shadow-xs"
          >
            <span>Get in Touch</span>
            <ArrowRight className="ml-2 w-4 h-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </Link>
        </motion.div>

        {/* Capability Feature Highlights Strip */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-4xl pt-4"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-5 rounded-2xl border border-border/80 bg-white/70 backdrop-blur-sm shadow-xs hover:border-border hover:bg-white transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-secondary/5 border border-border/60 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-primary mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Subtle Scroll Hint */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 hidden md:flex items-center gap-2 text-xs text-secondary/60 hover:text-secondary transition-colors cursor-pointer select-none"
          onClick={() => {
            const el = document.getElementById("work") || document.getElementById("engineering");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>

      </motion.div>

    </section>
  );
}
