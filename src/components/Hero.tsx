"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/[0.03] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col pt-12 md:pt-0"
      >
        {/* Availability Badge */}
        <motion.div variants={item} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[13px] font-medium text-secondary">Available for new opportunities</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-medium tracking-tighter text-primary mb-6 max-w-4xl">
          <span className="text-muted-foreground/80 font-normal">I build </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            AI-powered digital products
          </span>
          <br className="hidden md:block" />
          <span className="text-muted-foreground/80 font-normal"> from idea to production.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className="text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-10">
          I combine product thinking, AI, design, and engineering to build
          intelligent software that solves real-world problems.
        </motion.p>

        {/* Actions */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#work"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-background font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 text-base"
          >
            View Work
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border/60 bg-white/50 backdrop-blur-sm text-primary font-medium hover:bg-secondary/5 hover:border-border transition-all group text-base"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}
