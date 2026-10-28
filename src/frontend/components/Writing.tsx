"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const articles = [
  {
    title: "Part 1: GPT-6 Astra: What Is It, Where Did It Come From, and Where Is AI Going?",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/2c6dbb9f-a53c-48e8-ab71-2529888a9f49"
  },
  {
    title: "Part 2: Astra, Software Development & AGI: Is AI Becoming the Developer?",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/2adac629-b474-48f2-9cbe-349868ca4069"
  },
  {
    title: "Your Brain Is Being Programmed Every Morning — Whether You Realize It or Not",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/c24330b3-8856-4593-aeb2-ebe657ea0ead"
  },
  {
    title: "AI Isn't the Skill. Knowing How to Use It Is.",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/49dbba94-465a-408a-ba8d-fb16fc3f683f"
  },
  {
    title: "From Replacement to Collaborator",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/7bea409e-dd2e-45e4-84c9-6899595e0cab"
  },
  {
    title: "AI Isn't the Skill. Knowing How to Use It Is.",
    date: "Read More",
    link: "https://www.writersthing.com/blogs/49dbba94-465a-408a-ba8d-fb16fc3f683f"
  }
];

export function Writing() {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section id="writing" className="w-full py-12 md:py-16 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold text-primary mb-4">Writing</h2>
          <p className="text-secondary mb-6">
            Thoughts, lessons, and technical deep-dives into AI engineering and product development.
          </p>
        </div>
        <div className="md:col-span-8 flex flex-col">
          {displayedArticles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border last:border-0 hover:px-4 -mx-4 transition-all hover:bg-secondary/5 cursor-pointer"
            >
              <h3 className="text-lg font-medium text-primary mb-2 sm:mb-0 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center text-sm text-secondary whitespace-nowrap">
                {article.date} <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </a>
          ))}
          <div className="mt-8 flex items-center justify-between">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors cursor-pointer"
            >
              {showAll ? "Show Less" : "Read More"} 
              {showAll ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
            </button>
            <a href="https://www.writersthing.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
              View More on Writer's Thing <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
