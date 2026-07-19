import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "From Replacement to Collaborator: The Real Future of AI in Design",
    date: "Read More",
    link: "https://medium.com/@tadimarridadapeer/from-replacement-to-collaborator-the-real-future-of-ai-in-design-037cb087c87a"
  },
  {
    title: "The Lonely Road to VizTech: Why I Chose Design Over Code",
    date: "Read More",
    link: "https://medium.com/@tadimarridadapeer/the-lonely-road-to-viztech-why-i-chose-design-over-code-in-my-final-year-c8428efdc4fc"
  },
  {
    title: "The Human Touch: How Color Elevates UI Design",
    date: "Read More",
    link: "https://medium.com/@tadimarridadapeer/the-human-touch-how-color-elevates-ui-design-e04262415f74"
  }
];

export function Writing() {
  return (
    <section id="writing" className="w-full py-24 md:py-32 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold text-primary mb-4">Writing</h2>
          <p className="text-secondary mb-6">
            Thoughts, lessons, and technical deep-dives into AI engineering and product development.
          </p>
        </div>
        <div className="md:col-span-8 flex flex-col">
          {articles.map((article, index) => (
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
          <div className="mt-8">
            <a href="https://medium.com/@tadimarridadapeer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
              View More on Medium <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
