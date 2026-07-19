import {
  CaseStudyLayout,
  Hero,
  TextSection,
  CardGrid,
  TechStack
} from "@/components/case-study";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function YokarnaCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="YoKarna"
        category="Business Platform"
        vision="A modern, high-performance business platform architected to establish a scalable digital presence and streamline customer engagement."
        role="Product Engineer (Full-Stack)"
        teamSize="Solo / AI-Assisted"
        status="Live"
        platform="Web Application (B2B/B2C)"
      />

      {/* 2. Overview */}
      <TextSection title="Overview" label="Executive Summary">
        <p>
          YoKarna is a unified digital business platform engineered to provide a blazingly fast, responsive, and scalable online presence for modern enterprises. It moves beyond a simple static website, acting as a dynamic engine for customer interaction, service discovery, and business operations.
        </p>
        <p>
          <strong>Why it matters:</strong> In a digital-first economy, the speed and usability of a company's platform directly correlate to its conversion rate and brand trust. YoKarna ensures that the business makes a premium, professional impression while providing a robust backend to handle operational growth.
        </p>
      </TextSection>

      {/* 3. The Problem */}
      <TextSection title="The Problem" label="Context">
        <p>
          <strong>Business Problem:</strong> The client's existing digital infrastructure was fragmented, slow, and difficult to maintain. Updating content required engineering overhead, and the lack of a unified backend made tracking customer engagement impossible.
        </p>
        <p>
          <strong>User Problem:</strong> Customers visiting the legacy platform experienced slow load times, poor mobile responsiveness, and a confusing information architecture that made it difficult to discover services or contact the business.
        </p>
        <p>
          <strong>Opportunity:</strong> To engineer a bespoke Next.js platform that offers the performance and SEO benefits of a static site, combined with the dynamic capabilities of a modern React application and a custom Express/MongoDB backend.
        </p>
      </TextSection>

      {/* 4. My Role & 5. Solution */}
      <CardGrid 
        title="Strategy & Solution" 
        items={[
          { title: "My Role", description: "Drove the project from initial client discovery to production deployment. Led product strategy, UX design, Next.js frontend engineering, and Express/MongoDB backend architecture.", tag: "Ownership" },
          { title: "Product Vision", description: "A digital platform that feels as fast and intuitive as a native application, empowering the business to scale its operations without being bottlenecked by technical limitations.", tag: "Vision" },
          { title: "Information Architecture", description: "The architecture is deliberately flat. The homepage acts as a routing hub, pushing users immediately toward specialized service verticals or the primary conversion funnel.", tag: "Architecture" },
          { title: "Key UX Decisions", description: "Performance as a Design Feature. Minimalist aesthetics reduced bundle size and time-to-interactive, while subtle micro-interactions elevated perceived brand value.", tag: "UX/UI" }
        ]} 
      />

      {/* 6. Core Features */}
      <CardGrid 
        title="Core Features" 
        items={[
          { title: "Statically Generated Pages", description: "Pre-renders crucial marketing pages at build time to achieve perfect Lighthouse scores and maximize SEO indexing. Uses Next.js ISR for seamless content updates.", tag: "Feature" },
          { title: "Unified Inquiry Engine", description: "A dynamic, multi-step contact flow that captures user intent and routes it securely to the MongoDB backend, replacing clunky third-party form embeds.", tag: "Feature" },
          { title: "Modular Content Architecture", description: "A flexible UI system built with Tailwind CSS utility classes, allowing rapid creation of new landing pages that strictly adhere to brand guidelines.", tag: "Feature" }
        ]} 
      />


      {/* 8. Challenges & Trade-offs */}
      <TextSection title="Engineering Challenges" label="Trade-offs">
        <p>
          <strong>SEO vs. Interactivity:</strong> The marketing team required heavy SEO optimization (favoring static HTML), while UX wanted an App-like experience (SPAs). I adopted the Next.js App Router utilizing Server Components for the heavy lifting, passing only the necessary interactive bits to Client Components. This achieved a 100/100 Lighthouse score while maintaining fluid page transitions.
        </p>
        <p>
          <strong>Evolving Data Requirements:</strong> During development, the client frequently changed required data fields for services. I chose MongoDB (NoSQL) over a strict SQL database. While this sacrificed strict relational integrity, it enabled massive developer velocity, allowing on-the-fly schema adjustments without complex migrations.
        </p>
      </TextSection>

      {/* 9. Outcomes & 10. Future Roadmap */}
      <CardGrid 
        title="Outcomes & Roadmap" 
        items={[
          { title: "Business Impact", description: "The client reported a significant increase in organic lead generation (due to improved SEO) and a massive reduction in the time required to update site content.", tag: "Results" },
          { title: "Technical Outcomes", description: "Built a resilient, scalable architecture capable of handling traffic spikes with zero downtime, utilizing edge caching and static generation.", tag: "Engineering" },
          { title: "Future: CRM Integration", description: "Piping lead data directly from the MongoDB backend into the client's enterprise CRM via webhooks.", tag: "Roadmap" },
          { title: "Future: AI Support", description: "Deploying an RAG-based support widget to deflect tier-1 customer inquiries.", tag: "Roadmap" }
        ]} 
      />

      {/* 11. Key Takeaways */}
      <TextSection title="Reflection" label="Key Takeaways">
        <p>
          I learned the immense value of "boring" technology executed perfectly. While there are always flashy new frameworks, utilizing established tools like Express and MongoDB in combination with the modern capabilities of Next.js provides an incredibly stable, fast, and maintainable foundation for business operations.
        </p>
      </TextSection>

      {/* 12. Tech Stack */}
      <TechStack 
        categories={[
          { name: "Frontend", technologies: ["Next.js", "React", "Tailwind CSS"] },
          { name: "Backend", technologies: ["Express.js", "Node.js"] },
          { name: "Database", technologies: ["MongoDB"] },
          { name: "Deployment", technologies: ["Vercel"] }
        ]} 
      />


      {/* 14. Related Projects */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-border flex flex-col items-center text-center">
         <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-12">Next Project</h2>
         <Link href="/work/kollimalai" className="group">
           <p className="text-secondary tracking-widest uppercase text-sm mb-4">View Case Study</p>
           <div className="flex items-center gap-4 text-4xl md:text-6xl font-medium text-primary group-hover:text-accent transition-colors">
              Kollimalai Natural Store <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
           </div>
         </Link>
      </section>

    </CaseStudyLayout>
  );
}
