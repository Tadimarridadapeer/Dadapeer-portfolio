"use client";

import { Lightbulb, Bot, MonitorSmartphone, Server, Database, PenTool, ArrowRight, ArrowDown, Quote, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const capabilities = [
  {
    icon: Lightbulb,
    title: "Product Thinking",
    description: "I begin every project by understanding the problem before choosing the technology.",
    items: [
      "Product Discovery",
      "User Experience",
      "Feature Planning",
      "MVP Strategy",
      "Product Architecture",
      "End-to-End Delivery",
    ],
  },
  {
    icon: Bot,
    title: "AI-Assisted Development",
    description: "I use modern AI tools to accelerate engineering, automate repetitive work, explore ideas faster, and build production-ready software efficiently.",
    items: [
      "Prompt Engineering",
      "AI-assisted Development",
      "LLM Integration",
      "AI Workflow Automation",
      "Rapid Prototyping",
      "Code Review with AI",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Frontend Engineering",
    description: "Building fast, responsive, accessible, and scalable user interfaces.",
    items: [
      "UI/UX Implementation",
      "Responsive Design",
      "Client-side Architecture",
      "State Management",
      "Cross-platform Development",
      "Performance Optimization",
    ],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description: "Developing secure APIs and scalable backend systems that power modern digital products.",
    items: [
      "API Development",
      "System Architecture",
      "Microservices",
      "Authentication",
      "Security",
      "Scalable Infrastructure",
    ],
  },
  {
    icon: Database,
    title: "Data & Cloud",
    description: "Managing application data, cloud storage, and scalable backend services.",
    items: [
      "Database Architecture",
      "Cloud Infrastructure",
      "Data Modeling",
      "Serverless Architecture",
      "Storage Solutions",
      "Data Privacy",
    ],
  },
  {
    icon: PenTool,
    title: "Product Design",
    description: "Creating intuitive digital experiences through thoughtful design and user-centered thinking.",
    items: [
      "UX Research",
      "User Flows",
      "Wireframes",
      "Design Systems",
      "Figma",
      "Prototyping",
    ],
  },
];

const workflow = [
  { step: "Problem", desc: "Identify the core challenge" },
  { step: "Research", desc: "Understand users & context" },
  { step: "Product Strategy", desc: "Define goals & scope" },
  { step: "UX Design", desc: "Craft intuitive experiences" },
  { step: "AI-assisted Development", desc: "Build & accelerate" },
  { step: "Testing", desc: "Ensure quality & reliability" },
  { step: "Deployment", desc: "Ship to production" },
  { step: "Continuous Improvement", desc: "Iterate based on feedback" },
];

const coreCompetencies = [
  "AI Product Development", "End-to-End Product Engineering", "Product Strategy", "Product Discovery", 
  "Prompt Engineering", "AI-assisted Development", "LLM Integration", "Rapid Prototyping", 
  "Product Architecture", "System Design", "API Design", "Database Design", 
  "Cloud Deployment", "Cross-functional Collaboration", "Agile Product Development", "Continuous Product Improvement"
];

const quoteWords = [
  { text: '"I', highlight: false },
  { text: "don't", highlight: false },
  { text: "use", highlight: false },
  { text: "AI", highlight: true },
  { text: "to", highlight: false },
  { text: "replace", highlight: false },
  { text: "engineering.", highlight: false },
  { text: "I", highlight: false },
  { text: "use", highlight: false },
  { text: "AI", highlight: true },
  { text: "to", highlight: false },
  { text: "accelerate", highlight: true },
  { text: "thoughtful", highlight: true },
  { text: "product", highlight: true },
  { text: "development,", highlight: true },
  { text: "reduce", highlight: false },
  { text: "repetitive", highlight: false },
  { text: "work,", highlight: false },
  { text: "and", highlight: false },
  { text: "spend", highlight: false },
  { text: "more", highlight: false },
  { text: "time", highlight: false },
  { text: "solving", highlight: true },
  { text: "meaningful", highlight: true },
  { text: 'problems."', highlight: true },
];

const quoteContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const quoteWordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export function Engineering() {
  return (
    <section id="engineering" className="w-full py-12 md:py-16 border-t border-border">
      
      {/* Introduction */}
      <div className="mb-20 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-8 tracking-tight">How I Build Products</h2>
        <div className="space-y-6 text-xl text-secondary max-w-3xl leading-relaxed">
          <p>
            I build products by combining product thinking, modern software engineering, and AI-assisted development.
          </p>
          <p>
            My workflow focuses on solving real problems, rapidly validating ideas, and shipping production-ready software using AI as an engineering accelerator—not as a replacement for thoughtful decision making.
          </p>
        </div>
      </div>
      
      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {capabilities.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="p-8 md:p-10 rounded-3xl border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors group flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-8 flex-1">
                {card.description}
              </p>
              <ul className="space-y-3 mt-auto">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center text-sm font-medium text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Product Development Workflow */}
      <div className="mb-32">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-12 tracking-tight">My Product Development Workflow</h3>
        <div className="flex flex-col md:flex-row flex-wrap md:items-start gap-y-8 gap-x-4">
          {workflow.map((item, index) => (
            <div key={item.step} className="flex items-start md:items-center">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 group">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-primary group-hover:text-accent transition-colors">{item.step}</span>
                  <span className="text-xs text-secondary mt-1">{item.desc}</span>
                </div>
                {index < workflow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-secondary/30 hidden md:block mx-2" />
                )}
                {index < workflow.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-secondary/30 block md:hidden mt-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Competencies — Smooth Infinite Scrolling Marquee */}
      <div className="mb-32 w-full overflow-hidden">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4 tracking-tight">Core Competencies</h3>
        <p className="text-lg text-secondary mb-10">The skills and expertise that drive my product development workflow.</p>
        
        <div className="flex flex-col gap-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {/* Row 1: Scrolling Left */}
          <div className="relative w-full overflow-hidden py-1">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-4"
            >
              {[...coreCompetencies.slice(0, 8), ...coreCompetencies.slice(0, 8)].map((competency, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-full border border-border bg-secondary/5 text-primary font-medium text-sm hover:bg-secondary/15 hover:border-accent/40 transition-colors shrink-0 whitespace-nowrap cursor-default shadow-sm"
                >
                  {competency}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="relative w-full overflow-hidden py-1">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-4"
            >
              {[...coreCompetencies.slice(8), ...coreCompetencies.slice(8)].map((competency, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-full border border-border bg-secondary/5 text-primary font-medium text-sm hover:bg-secondary/15 hover:border-accent/40 transition-colors shrink-0 whitespace-nowrap cursor-default shadow-sm"
                >
                  {competency}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-24 pt-16 pb-14 px-6 sm:px-12 md:px-16 rounded-3xl border border-border/80 bg-gradient-to-b from-secondary/[0.04] via-secondary/[0.015] to-transparent backdrop-blur-md max-w-4xl mx-auto overflow-hidden text-center shadow-2xl shadow-black/10"
      >
        {/* Ambient Pulsing Aura */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[360px] bg-gradient-to-r from-neutral-400/10 via-neutral-500/10 to-neutral-400/10 blur-3xl rounded-full -z-10 pointer-events-none"
        />

        {/* Top Edge Shimmer */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />

        {/* Floating Quote Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-secondary/10 border border-border flex items-center justify-center text-[#1c1d21] shadow-sm backdrop-blur-sm"
        >
          <Quote className="w-5 h-5 fill-secondary/20" />
        </motion.div>

        {/* Animated Staggered Words */}
        <motion.p
          variants={quoteContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-2xl sm:text-3xl md:text-4xl text-primary font-medium leading-relaxed tracking-tight flex flex-wrap justify-center gap-x-2 gap-y-1.5"
        >
          {quoteWords.map((item, index) => (
            <motion.span
              key={index}
              variants={quoteWordVariants}
              className={
                item.highlight
                  ? "text-[#1c1d21] font-semibold"
                  : "text-secondary/80 font-normal"
              }
            >
              {item.text}
            </motion.span>
          ))}
        </motion.p>

        {/* Attribution Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 pt-6 border-t border-border/40 flex items-center justify-center gap-3 text-xs sm:text-sm text-secondary uppercase tracking-widest font-mono"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1c1d21]" />
          <span>Philosophy & Approach</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1c1d21]/60" />
          <span>Dadapeer</span>
        </motion.div>
      </motion.div>

    </section>
  );
}
