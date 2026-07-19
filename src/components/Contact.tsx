import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="w-full py-24 md:py-32 border-t border-border">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-6">Let's build something.</h2>
        <p className="text-xl text-secondary mb-10">
          I am always open to discussing new opportunities, interesting problems, or building the next big thing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="mailto:tadimarridadapeer@gmail.com"
            className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-primary text-background font-medium hover:bg-primary/90 transition-all text-lg group"
          >
            Email Me
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/Tadimarri Dadapeer-AI Product Enigneer-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-border text-primary font-medium hover:bg-secondary/5 transition-all text-lg"
          >
            Download Resume
          </Link>
        </div>
        <p className="mt-8 text-secondary flex flex-col items-center gap-2">
          <span>tadimarridadapeer@gmail.com</span>
          <span>+91 96666 15118</span>
        </p>
      </div>
    </section>
  );
}
