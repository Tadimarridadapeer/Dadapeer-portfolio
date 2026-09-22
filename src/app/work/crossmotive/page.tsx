import {
  CaseStudyLayout,
  Hero,
  TextSection,
  CardGrid,
  TechStack,
  MetricsDashboard
} from "@/components/case-study";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CrossMotiveCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="CrossMotive Services"
        category="BPO & Enterprise Operations Platform"
        vision="A smart outsourcing and operational execution platform streamlining BPO, data annotation, financial operations, IT administration, real estate back-office, and travel operations for global enterprises."
        role="Product Engineer (Full-Stack)"
        teamSize="Cross-functional Team"
        status="Live"
        platform="Web Application (Enterprise SaaS)"
        liveUrl="https://www.crossmotiveservices.com/"
        heroImage="/projects_images/crossmotive-hero.png"
      />

      {/* 2. Overview */}
      <TextSection title="Overview" label="Executive Summary">
        <p>
          CrossMotive Services is an enterprise BPO and smart outsourcing platform engineered to unify high-volume operational workflows across diverse business domains. From machine learning data annotation to complex real estate back-office administration and financial operations, the platform delivers high-fidelity service execution with real-time operational visibility.
        </p>
        <p>
          <strong>Why it matters:</strong> Modern enterprises require agile, highly reliable outsourcing partners. CrossMotive Services bridges the gap between client operational demands and global execution teams, providing a transparent, data-driven interface for SLA tracking, process automation, and quality control.
        </p>
      </TextSection>

      {/* 3. The Problem */}
      <TextSection title="The Problem" label="Context">
        <p>
          <strong>Business Problem:</strong> Managing multi-sector outsourcing contracts (AI data annotation, finance, IT administration, travel) traditionally suffers from fragmented communications, opaque progress metrics, and slow turnarounds.
        </p>
        <p>
          <strong>User Problem:</strong> Client managers lacked centralized visibility into active BPO tasks, workforce allocation, quality control metrics, and automated ticketing status.
        </p>
        <p>
          <strong>Opportunity:</strong> To build a unified digital portal and enterprise web application that aggregates specialized operational verticals into a single cohesive interface, accelerating turnaround times and building transparent client trust.
        </p>
      </TextSection>

      {/* 4. Strategy & Solution */}
      <CardGrid 
        title="Strategy & Solution" 
        items={[
          { title: "My Role", description: "Architected and built the client-facing digital application, designed intuitive domain-specific dashboards, and engineered scalable API integrations across BPO service modules.", tag: "Ownership" },
          { title: "Product Vision", description: "To create a seamless, high-trust digital front door for enterprise outsourcing that translates complex operational tasks into real-time visual progress indicators.", tag: "Vision" },
          { title: "Modular Architecture", description: "Designed modular service routes dedicated to BPO, AI Data Annotation, Finance & Accounting, IT Administration, Real Estate Support, and Travel Operations.", tag: "Architecture" },
          { title: "Key UX Decisions", description: "Employed a dark-themed, glassmorphic analytics aesthetic with high contrast typography and clear call-to-actions, ensuring high readability for operational dashboards.", tag: "UX/UI" }
        ]} 
      />

      {/* 5. Core Features */}
      <CardGrid 
        title="Core Features" 
        items={[
          { title: "Specialized Service Hubs", description: "Dedicated portals for data annotation workflows, financial auditing, IT infrastructure monitoring, and real estate document processing.", tag: "Feature" },
          { title: "Real-Time Quality Metrics", description: "Live tracking of SLA adherence, accuracy scores for AI datasets, and turn-around times for enterprise client requests.", tag: "Feature" },
          { title: "Secure Enterprise Ingestion", description: "Encrypted data upload and task assignment channels ensuring compliance with enterprise security and confidentiality standards.", tag: "Feature" }
        ]} 
      />

      {/* 6. Metrics & Impact */}
      <MetricsDashboard 
        metrics={[
          { label: "SLA Adherence Rate", value: "98.4", suffix: "%" },
          { label: "Operation Domains", value: "6", suffix: "+" },
          { label: "QC Accuracy Score", value: "99.1", suffix: "%" },
          { label: "Lighthouse Performance", value: "96", suffix: "" }
        ]} 
      />

      {/* 7. Engineering Challenges */}
      <TextSection title="Engineering Challenges" label="Trade-offs">
        <p>
          <strong>Domain Diversity vs. Unified Experience:</strong> Providing specialized interfaces for vastly different domains (such as AI dataset annotation versus real estate back-office support) without creating a fragmented codebase. Solved by creating a shared component library with extensible schema-driven data representations.
        </p>
        <p>
          <strong>Performance & Asset Optimization:</strong> Delivering dense metric dashboards and media assets across varying network environments. Implemented code splitting, dynamic client component hydration, and optimized asset pipelines.
        </p>
      </TextSection>

      {/* 8. Outcomes & Roadmap */}
      <CardGrid 
        title="Outcomes & Roadmap" 
        items={[
          { title: "Business Impact", description: "Empowered CrossMotive Services to showcase their end-to-end BPO capabilities to enterprise clients, leading to streamlined client onboarding and higher conversion.", tag: "Results" },
          { title: "Technical Outcomes", description: "Delivered a responsive, high-performance web platform scoring top marks in SEO, accessibility, and speed metrics.", tag: "Engineering" },
          { title: "Future: Client Self-Service Portal", description: "Building an automated client dashboard for live ticket creation and instant billing management.", tag: "Roadmap" },
          { title: "Future: AI Annotation Tooling", description: "Integrating custom browser-based image and text annotation widgets for AI dataset preparation.", tag: "Roadmap" }
        ]} 
      />

      {/* 9. Reflection */}
      <TextSection title="Reflection" label="Key Takeaways">
        <p>
          Building CrossMotive Services reinforced the importance of domain abstraction in software engineering. When building platforms that span multiple industry verticals, clear separation of concerns in component design allows for rapid scaling and easy maintenance.
        </p>
      </TextSection>

      {/* 10. Tech Stack */}
      <TechStack 
        categories={[
          { name: "Frontend", technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
          { name: "Framework & Tooling", technologies: ["Vite", "Node.js", "ESLint"] },
          { name: "Deployment & Analytics", technologies: ["Vercel", "Google Tag Manager"] }
        ]} 
      />

      {/* 11. Next Project */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-border flex flex-col items-center text-center">
         <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-12">Next Project</h2>
         <Link href="/work/vegetabletonnes" className="group">
           <p className="text-secondary tracking-widest uppercase text-sm mb-4">View Case Study</p>
           <div className="flex items-center gap-4 text-4xl md:text-6xl font-medium text-primary group-hover:text-accent transition-colors">
              VegetableTonnes <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
           </div>
         </Link>
      </section>

    </CaseStudyLayout>
  );
}
