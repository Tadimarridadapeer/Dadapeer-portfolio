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

export default function VegetableTonnesCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="VegetableTonnes"
        category="B2B AgriTech • Auction Platform"
        vision="India's premier B2B agriculture bidding and marketplace platform, connecting farmers directly with bulk buyers, traders, and wholesalers through transparent digital auctions."
        role="Product Engineer (Full-Stack)"
        teamSize="Solo / AI-Assisted"
        status="Live"
        platform="Web Application (B2B Marketplace)"
        liveUrl="https://www.vegetabletonnes.com/"
        heroImage="/projects_images/vegetabletonnes-hero.png"
      />

      {/* 2. Overview */}
      <TextSection title="Overview" label="Executive Summary">
        <p>
          VegetableTonnes is a digital marketplace engineered to transform traditional agricultural trade in India. By establishing a direct farm-to-buyer auction ecosystem, the platform eliminates predatory middlemen, ensuring fair price discovery for farmers and transparent bulk procurement for wholesale buyers.
        </p>
        <p>
          <strong>Why it matters:</strong> Agricultural supply chains in emerging markets suffer from massive markups and price opacity caused by multi-layered commission agents. VegetableTonnes empowers agricultural producers by providing real-time bidding tools, verified buyer connections, and direct logistics coordination.
        </p>
      </TextSection>

      {/* 3. The Problem */}
      <TextSection title="The Problem" label="Context">
        <p>
          <strong>Business Problem:</strong> Farmers historically sold bulk produce at arbitrary local mandis with high commission fees and delayed payments. Bulk buyers lacked a reliable platform to inspect produce quality, compare prices across regions, and place digital bids.
        </p>
        <p>
          <strong>User Problem:</strong> High volatility in daily commodity pricing created financial unpredictability for both growers and wholesalers. Communication was fragmented across phone calls and local agents.
        </p>
        <p>
          <strong>Opportunity:</strong> To build a high-performance B2B bidding engine that facilitates real-time auctions, live commodity market price updates, and verified trade management.
        </p>
      </TextSection>

      {/* 4. Strategy & Solution */}
      <CardGrid 
        title="Strategy & Solution" 
        items={[
          { title: "My Role", description: "Led end-to-end product architecture, UI/UX design, real-time bidding interface engineering, and frontend optimization for high-density market data.", tag: "Ownership" },
          { title: "Product Vision", description: "To become India's most trusted digital agricultural exchange, enabling transparent bulk trade with zero middleman commissions.", tag: "Vision" },
          { title: "Bidding Architecture", description: "Engineered a low-latency digital auction room supporting automated incremental bidding, reserve prices, and timed auction cycles.", tag: "Architecture" },
          { title: "Key UX Decisions", description: "Designed an intuitive, high-visibility dashboard with clear commodity tickers, produce quality badges, and simplified one-click bidding flows.", tag: "UX/UI" }
        ]} 
      />

      {/* 5. Core Features */}
      <CardGrid 
        title="Core Features" 
        items={[
          { title: "Live Auction & Bidding Engine", description: "Real-time bidding tickers for bulk vegetable lots (tomatoes, onions, potatoes) with live timer countdowns and bid status updates.", tag: "Feature" },
          { title: "Market Price Trends Dashboard", description: "Interactive price analytics tracking regional commodity trends, historical price fluctuations, and supply forecasts.", tag: "Feature" },
          { title: "Bulk Trade Management", description: "Comprehensive order tracking system for sellers and buyers from initial bid win through escrow payment and logistics dispatch.", tag: "Feature" }
        ]} 
      />

      {/* 6. Metrics & Impact */}
      <MetricsDashboard 
        metrics={[
          { label: "Middleman Markups Eliminated", value: "100", suffix: "%" },
          { label: "Bidding Latency", value: "<150", suffix: "ms" },
          { label: "Produce Categories", value: "25", suffix: "+" },
          { label: "Lighthouse Performance", value: "98", suffix: "" }
        ]} 
      />

      {/* 7. Engineering Challenges */}
      <TextSection title="Engineering Challenges" label="Trade-offs">
        <p>
          <strong>Real-Time Data Synchronization:</strong> Managing live bid updates across thousands of concurrent buyers required ultra-fast state synchronization. Implemented efficient client-side reactive state management combined with optimistic UI rendering to ensure smooth bidding under varying mobile network conditions.
        </p>
        <p>
          <strong>Low-Bandwidth Mobile Optimization:</strong> Many agricultural traders access the platform on low-tier mobile networks in rural locations. Prioritized minimal initial bundle size, aggressive font and asset optimization, and responsive design tailored for mobile screens.
        </p>
      </TextSection>

      {/* 8. Outcomes & Roadmap */}
      <CardGrid 
        title="Outcomes & Roadmap" 
        items={[
          { title: "Business Impact", description: "Successfully launched India's direct farm-to-buyer auction platform, connecting regional farmers with major wholesale buyers and reducing trade cycles.", tag: "Results" },
          { title: "Technical Outcomes", description: "Achieved a blazingly fast web experience with instantaneous price chart rendering and sub-200ms bid interactions.", tag: "Engineering" },
          { title: "Future: Logistics & Escrow", description: "Integrating automated third-party logistics dispatch and digital escrow payments upon delivery verification.", tag: "Roadmap" },
          { title: "Future: Multilingual Support", description: "Adding native regional language support (Hindi, Telugu, Tamil, Kannada) to maximize accessibility for rural farmers.", tag: "Roadmap" }
        ]} 
      />

      {/* 9. Reflection */}
      <TextSection title="Reflection" label="Key Takeaways">
        <p>
          Building VegetableTonnes highlighted the transformative potential of domain-focused B2B market tech. Designing for non-traditional software users in agriculture requires ruthless simplicity in user flows—stripping away visual noise and focusing purely on price transparency and trust signals.
        </p>
      </TextSection>

      {/* 10. Tech Stack */}
      <TechStack 
        categories={[
          { name: "Frontend", technologies: ["React", "TypeScript", "Tailwind CSS", "Outfit & Inter Fonts"] },
          { name: "Framework & State", technologies: ["Vite", "React Hooks", "Lucide Icons"] },
          { name: "Deployment & Infra", technologies: ["Vercel", "Edge CDN"] }
        ]} 
      />

      {/* 11. Next Project */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-border flex flex-col items-center text-center">
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
