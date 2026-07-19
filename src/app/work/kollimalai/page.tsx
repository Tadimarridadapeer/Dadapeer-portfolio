import {
  CaseStudyLayout,
  Hero,
  TextSection,
  CardGrid,
  TechStack
} from "@/components/case-study";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function KollimalaiCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="Kollimalai Natural Store"
        category="E-Commerce Platform"
        vision="A modern, high-conversion digital commerce platform connecting authentic, naturally sourced products from the Kolli Hills directly to conscious consumers."
        role="Product Engineer (Full-Stack)"
        teamSize="Solo / AI-Assisted"
        status="Live"
        platform="Web Application (E-Commerce)"
        liveUrl="https://www.kollimalainaturalstore.com/"
        heroImage="/projects_images/kollimalai-hero.png"
      />

      {/* 2. Overview */}
      <TextSection title="Overview" label="Executive Summary">
        <p>
          Kollimalai Natural Store is a digital commerce ecosystem built to digitize a traditionally offline supply chain of natural and organic goods from the Kolli Hills region. It serves as both a brand storytelling platform and a high-performance retail engine.
        </p>
        <p>
          <strong>Why it matters:</strong> By controlling the end-to-end digital experience, the brand can authentically communicate its heritage while maximizing revenue margins. For consumers, it provides a transparent, secure, and delightful way to discover and purchase natural goods, bypassing third-party aggregators.
        </p>
      </TextSection>

      {/* 3. The Problem */}
      <TextSection title="The Problem" label="Context">
        <p>
          <strong>Business Problem:</strong> The merchant lacked a scalable digital storefront. Relying on WhatsApp orders and disjointed social media channels made inventory management chaotic and stunted growth potential.
        </p>
        <p>
          <strong>User Problem:</strong> Customers found it difficult to browse the catalog, trust the authenticity of products, and securely process payments without a centralized, professional storefront.
        </p>
        <p>
          <strong>Opportunity:</strong> To build a custom e-commerce solution that blends editorial brand storytelling with a frictionless, high-speed checkout flow, utilizing a decoupled architecture to maintain complete ownership of the data and UX.
        </p>
      </TextSection>

      {/* 4. My Role & 5. Solution */}
      <CardGrid 
        title="Strategy & Solution" 
        items={[
          { title: "My Role", description: "Oversaw the entire transition from an offline sales model to a scalable digital storefront, owning product strategy, UX/UI, frontend engineering, backend development, and database architecture.", tag: "Ownership" },
          { title: "Product Vision", description: "To create a digital storefront that feels less like a sterile supermarket and more like a premium, curated artisanal boutique, without sacrificing the speed and convenience of modern e-commerce.", tag: "Vision" },
          { title: "Information Architecture", description: "Navigation is aggressively simplified, emphasizing top-level categories directly from the header, with a persistent search bar and universally accessible cart icon.", tag: "Architecture" },
          { title: "Key UX Decisions", description: "Used an earthy yet modern aesthetic with muted greens and deep browns. Added subtle micro-interactions for cart updates and validations to build tactile feedback and consumer trust.", tag: "UX/UI" }
        ]} 
      />

      {/* 6. Core Features */}
      <CardGrid 
        title="Core Features" 
        items={[
          { title: "High-Performance Product Catalog", description: "A dynamically rendered yet statically fast grid of products with advanced filtering. Utilized Next.js Image optimization and lazy loading to achieve top-tier Lighthouse scores.", tag: "Feature" },
          { title: "Persistent Edge Cart", description: "Maintains its state globally across the application without requiring page reloads, keeping the user in the catalog longer and increasing Average Order Value.", tag: "Feature" },
          { title: "Integrated Checkout", description: "A secure, multi-step checkout process integrated with localized payment gateways. Requires absolute minimum clicks from 'Add to Cart' to 'Payment Complete'.", tag: "Feature" }
        ]} 
      />


      {/* 8. Challenges & Trade-offs */}
      <TextSection title="Engineering Challenges" label="Trade-offs">
        <p>
          <strong>Custom E-Commerce vs. Shopify:</strong> The client wanted strict control over their data, zero monthly platform fees, and highly bespoke storytelling layouts that are difficult to achieve in generic Shopify themes. I chose to build a custom Next.js/Express stack from scratch. While this significantly increased initial development time, the business now owns its entire technology stack and saves thousands in recurring platform fees.
        </p>
        <p>
          <strong>Inventory Synchronization:</strong> In a custom setup, preventing overselling of limited artisanal batches is critical. I implemented strict server-side cart validation—the frontend cart is optimistic, but the Express backend performs a hard inventory check against MongoDB at the exact moment of checkout initiation. This adds slight latency but prevents catastrophic customer service issues.
        </p>
      </TextSection>

      {/* 9. Outcomes & 10. Future Roadmap */}
      <CardGrid 
        title="Outcomes & Roadmap" 
        items={[
          { title: "Business Impact", description: "Successfully transitioned the business from informal chat-based sales into a scalable digital enterprise, drastically reducing manual operational hours and increasing conversion rates.", tag: "Results" },
          { title: "Technical Outcomes", description: "Engineered an e-commerce platform that routinely scores 95+ on Google Lighthouse across Performance, Accessibility, and SEO.", tag: "Engineering" },
          { title: "Future: Headless CMS", description: "Migrating static editorial content to a headless CMS (like Sanity) so the owner can publish blog posts without code deployments.", tag: "Roadmap" },
          { title: "Future: Subscriptions", description: "Modifying the MongoDB schema and payment logic to allow users to subscribe to monthly deliveries of staple natural products.", tag: "Roadmap" }
        ]} 
      />

      {/* 11. Key Takeaways */}
      <TextSection title="Reflection" label="Key Takeaways">
        <p>
          Building e-commerce from scratch teaches you to respect the checkout flow. Every single millisecond of latency and every confusing UI element directly costs money. For e-commerce, Next.js Image optimization and Static Site Generation (SSG) are non-negotiable superpowers because they solve the biggest conversion killer: slow page loads.
        </p>
      </TextSection>

      {/* 12. Tech Stack */}
      <TechStack 
        categories={[
          { name: "Frontend", technologies: ["Next.js", "React", "Tailwind CSS"] },
          { name: "Backend", technologies: ["Express.js", "Node.js"] },
          { name: "Database", technologies: ["MongoDB"] },
          { name: "Deployment & Payments", technologies: ["Vercel", "Stripe/Razorpay"] }
        ]} 
      />


      {/* 14. Related Projects */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-border flex flex-col items-center text-center">
         <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-12">Next Project</h2>
         <Link href="/work/pstylst" className="group">
           <p className="text-secondary tracking-widest uppercase text-sm mb-4">View Case Study</p>
           <div className="flex items-center gap-4 text-4xl md:text-6xl font-medium text-primary group-hover:text-accent transition-colors">
              P'STYLST <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
           </div>
         </Link>
      </section>

    </CaseStudyLayout>
  );
}
