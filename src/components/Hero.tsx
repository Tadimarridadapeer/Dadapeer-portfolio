"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const rotatingPhrases = [
  "AI-powered digital products",
  "intelligent SaaS platforms",
  "scalable full-stack systems",
  "zero-to-one applications",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
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
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-neutral-500/5 via-neutral-600/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-white/80 backdrop-blur-md shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[13px] font-medium text-secondary">Available for new opportunities</span>
          </div>
        </motion.div>

        {/* Kinetic Headline */}
        <motion.h1 
          variants={itemVariants} 
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.2] font-medium tracking-tight text-primary mb-8 flex flex-col items-center select-none"
        >
          <span className="text-muted-foreground/80 font-normal">I build</span>
          
          <div className="relative h-[1.25em] w-full max-w-full flex items-center justify-center overflow-hidden my-1 sm:my-1.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#1c1d21] font-semibold tracking-tight whitespace-nowrap text-center px-2"
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="text-muted-foreground/80 font-normal">from idea to production.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants} 
          className="text-lg sm:text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed mb-12 font-normal"
        >
          I combine product thinking, AI, design, and engineering to build
          intelligent software that solves real-world problems.
        </motion.p>

        {/* Call to Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center h-13 px-8 rounded-full bg-primary text-background font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 text-base"
          >
            View Work
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center h-13 px-8 rounded-full border border-border/70 bg-white/70 backdrop-blur-md text-primary font-medium hover:bg-secondary/5 hover:border-border transition-all group text-base"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}
