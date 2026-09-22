import {
  CaseStudyLayout,
  Hero,
  TextSection,
  CardGrid,
  TechStack
} from "@/components/case-study";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WritersthingCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="Writersthing"
        category="Publishing Platform • SaaS"
        vision="A modern publishing ecosystem built for writers and readers to publish, manage, and distribute digital books through an intuitive and scalable platform."
        role="Product Engineer (End-to-End)"
        teamSize="Solo / AI-Assisted"
        status="Live"
        platform="Web Application (SaaS)"
        liveUrl="https://www.writersthing.com/"
        heroImage="/projects_images/writersthing-hero.png"
      />

      {/* 2. Overview */}
      <TextSection title="Overview" label="Executive Summary">
        <p>
          Writersthing is a comprehensive SaaS platform designed to modernize the digital publishing ecosystem. It acts as a bridge between independent authors and avid readers, providing a unified space to write, edit, publish, and monetize digital literature.
        </p>
        <p>
          <strong>Why it matters:</strong> By removing the technical and logistical barriers to self-publishing, Writersthing empowers creators to focus entirely on their craft while retaining ownership of their distribution channels and revenue streams.
        </p>
      </TextSection>

      {/* 3. The Problem */}
      <TextSection title="The Problem" label="Context">
        <p>
          <strong>Business Problem:</strong> Legacy publishing platforms take massive revenue cuts (often 30-70%) and offer opaque analytics, making it difficult for independent authors to build sustainable businesses.
        </p>
        <p>
          <strong>User Problem:</strong> Authors face a steep learning curve when formatting manuscripts for various digital devices. Readers suffer from disjointed experiences, often having to download external e-reader apps to consume content purchased directly from creators.
        </p>
        <p>
          <strong>Opportunity:</strong> To build a vertically integrated, premium publishing SaaS that offers a distraction-free writing environment, automated formatting, and integrated payments—allowing authors to capture higher margins with zero technical overhead.
        </p>
      </TextSection>

      {/* 4. My Role & 5. Solution */}
      <CardGrid
        title="Strategy & Solution"
        items={[
          { title: "My Role", description: "Architected and executed the entire platform from the ground up, including product strategy, UX/UI, Next.js frontend, Express API, Supabase architecture, and Stripe payments.", tag: "Ownership" },
          { title: "Product Vision", description: "To become the default operating system for independent digital publishing, where the transition from drafting to monetization happens in a single click.", tag: "Vision" },
          { title: "Information Architecture", description: "The platform is bifurcated into the 'Creator Studio' for manuscript management and payouts, and the 'Reader Portal' for discovery and consumption.", tag: "Architecture" },
          { title: "Key UX Decisions", description: "Prioritized a typography-first approach and a distraction-free mode where the editor and reader collapse all navigation elements when scrolling or typing.", tag: "UX/UI" }
        ]}
      />

      {/* 6. Core Features */}
      <CardGrid
        title="Core Features"
        items={[
          { title: "Unified Manuscript Editor", description: "A rich-text, block-based editor optimized for long-form content. Eliminates the need to draft in Word and painfully format for the web later. Kept performant at 100k+ words via virtualization.", tag: "Feature" },
          { title: "Frictionless E-Commerce", description: "Integrated Stripe Connect to handle complex multi-party routing, ensuring authors receive payouts automatically while remaining compliant with international tax regulations.", tag: "Monetization" },
          { title: "Responsive Web Reader", description: "A premium reading interface that adapts to any device, offering dark mode, font scaling, and bookmarking. Progress syncs accurately across all devices via the database.", tag: "Experience" }
        ]}
      />

      {/* 7. AI Implementation */}
      <TextSection title="AI Implementation" label="Intelligent Features">
        <p>
          While Writersthing is fundamentally a SaaS platform rather than a pure AI product, strategic AI integrations enhance the author experience without compromising creative integrity.
        </p>
        <ul>
          <li><strong>Automated Metadata Generation:</strong> Using OpenAI's LLMs to analyze manuscripts and suggest SEO-optimized titles, summaries, and genre tags to aid in discovery.</li>
          <li><strong>Workflow:</strong> When an author moves to "Publish," a background job chunks the text and requests promotional blurbs. The author retains full editorial control to accept or modify suggestions.</li>
          <li><strong>Guardrails:</strong> AI is strictly utilized as a suggestive tool for marketing and discovery, never autonomously altering the core manuscript, respecting the author's voice.</li>
        </ul>
      </TextSection>


      {/* 9. Challenges & Trade-offs */}
      <TextSection title="Engineering Challenges" label="Trade-offs">
        <p>
          <strong>Handling Large Documents:</strong> Long manuscripts caused significant UI lag when typing. I adopted a block-based editor architecture and implemented virtualization for chapter management. While this increased initial development time compared to a standard textarea, the performance gain was mandatory for long-form writing.
        </p>
        <p>
          <strong>Cross-Device Reading State:</strong> Readers expect to close a book on their laptop and open it on their phone exactly where they left off. I implemented a continuous sync mechanism that debounces the user's scroll position to PostgreSQL, ensuring a native-feeling experience.
        </p>
      </TextSection>

      {/* 10. Outcomes & 11. Future Roadmap */}
      <CardGrid
        title="Outcomes & Roadmap"
        items={[
          { title: "Product Outcomes", description: "Delivered a fully functional Beta platform that successfully manages the entire lifecycle of a digital book from draft to monetization.", tag: "Results" },
          { title: "Technical Outcomes", description: "Architected a scalable database schema capable of handling high-volume read traffic and complex write operations, with seamless multi-party payment routing.", tag: "Engineering" },
          { title: "Future: Audiobook Integration", description: "Implementing advanced Text-to-Speech (TTS) models to automatically generate high-fidelity audiobooks from written manuscripts.", tag: "Roadmap" },
          { title: "Future: Offline Reading", description: "Utilizing Progressive Web App (PWA) technologies and IndexedDB to allow readers to download books for offline consumption in the browser.", tag: "Roadmap" }
        ]}
      />

      {/* 12. Key Takeaways */}
      <TextSection title="Reflection" label="Key Takeaways">
        <p>
          Building a dual-sided platform is exponentially more complex than a single-user SaaS. You have to build two distinct products (the Creator Studio and the Reader Portal) that communicate flawlessly. I learned that prioritizing the <strong>reader's</strong> UX is actually the best way to serve the <strong>author</strong>, because a great reading experience drives sales.
        </p>
      </TextSection>

      {/* 13. Tech Stack */}
      <TechStack
        categories={[
          { name: "Frontend", technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
          { name: "Backend", technologies: ["Express.js", "Node.js"] },
          { name: "Database & Auth", technologies: ["Supabase", "PostgreSQL", "Supabase Auth"] },
          { name: "Payments & Cloud", technologies: ["Stripe Connect", "Supabase Storage"] }
        ]}
      />


      {/* 15. Related Projects */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-border flex flex-col items-center text-center">
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
