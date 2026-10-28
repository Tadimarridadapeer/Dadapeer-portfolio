"use client";

import { motion } from "framer-motion";

export const coreCompetencies = [
  "AI Product Development", "End-to-End Product Engineering", "Product Strategy", "Product Discovery", 
  "Prompt Engineering", "AI-assisted Development", "LLM Integration", "Rapid Prototyping", 
  "Product Architecture", "System Design", "API Design", "Database Design", 
  "Cloud Deployment", "Cross-functional Collaboration", "Agile Product Development", "Continuous Product Improvement"
];

export function CoreCompetencies({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-2 tracking-tight">Core Competencies</h3>
        <p className="text-sm sm:text-base text-secondary">The skills and expertise that drive my product development workflow.</p>
      </div>
      
      <div className="flex flex-col gap-3 sm:gap-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-2">
        {/* Row 1: Scrolling Left */}
        <div className="relative w-full overflow-hidden py-0.5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-3 sm:gap-4"
          >
            {[...coreCompetencies.slice(0, 8), ...coreCompetencies.slice(0, 8)].map((competency, idx) => (
              <span
                key={idx}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-border bg-secondary/5 text-primary font-medium text-xs sm:text-sm hover:bg-secondary/15 transition-colors shrink-0 whitespace-nowrap cursor-default shadow-sm"
              >
                {competency}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="relative w-full overflow-hidden py-0.5">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-3 sm:gap-4"
          >
            {[...coreCompetencies.slice(8), ...coreCompetencies.slice(8)].map((competency, idx) => (
              <span
                key={idx}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-border bg-secondary/5 text-primary font-medium text-xs sm:text-sm hover:bg-secondary/15 transition-colors shrink-0 whitespace-nowrap cursor-default shadow-sm"
              >
                {competency}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
