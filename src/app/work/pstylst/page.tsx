import {
  CaseStudyLayout,
  Hero,
  TextSection,
  MetricsDashboard,
  CardGrid,
  TechStack
} from "@/components/case-study";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PstylstCaseStudy() {
  return (
    <CaseStudyLayout>
      {/* 1. Hero Section */}
      <Hero
        name="P'STYLST"
        category="AI Product • Fashion Technology"
        vision="An AI-powered Personal Stylist Intelligence platform designed to help people make smarter fashion decisions with confidence."
        role="Product Engineer (End-to-End)"
        teamSize="Solo / AI-Assisted"
        status="Live"
        platform="Web Application"
        liveUrl="https://www.pstylst.com/"
        heroImage="/projects_images/pstylst-hero.png"
      />

      {/* 2. Executive Summary */}
      <TextSection title="Executive Summary" label="Overview">
        <p>
          P'STYLST is an intelligent digital platform that democratizes personal styling. It was built to solve a fundamental disconnect in the fashion industry: the gap between knowing what clothes look good and knowing what clothes look good <strong>on you</strong>. 
        </p>
        <p>
          By combining computer vision, body analysis, and advanced LLMs, P'STYLST provides bespoke wardrobe intelligence that was previously only accessible via high-end personal stylists. This matters because confidence is inherently linked to personal presentation, and technology should empower individuals to look and feel their best.
        </p>
      </TextSection>

      {/* 3. Problem Statement */}
      <TextSection title="The Problem" label="Context">
        <p>
          Fashion e-commerce suffers from a massive returns problem (often exceeding 30%) because users buy clothes that don't suit their body type or skin tone.
        </p>
        <ul>
          <li><strong>Current Situation:</strong> Users rely on generic size charts and model photos.</li>
          <li><strong>Pain Points:</strong> Decision paralysis, buyer's remorse, and wasted money on clothes that don't fit well.</li>
          <li><strong>Market Gap:</strong> No affordable, personalized, data-driven styling solution exists for the average consumer.</li>
          <li><strong>Business Challenge:</strong> High return rates destroy e-commerce profit margins.</li>
        </ul>
      </TextSection>

      {/* 4. Product Vision */}
      <TextSection title="Product Vision" label="North Star">
        <p>
          <strong>Mission:</strong> To eliminate wardrobe anxiety through personalized data intelligence.
        </p>
        <p>
          <strong>Vision:</strong> A world where every individual has a trusted digital stylist in their pocket, ensuring they only buy what truly complements them.
        </p>
        <p>
          <strong>North Star Metric:</strong> Confidence Score (measured by user survey post-recommendation) and Outfit Generation retention rate.
        </p>
      </TextSection>

      {/* 5. Market & 6. User Research */}
      <CardGrid 
        title="Research & Insights" 
        items={[
          { title: "Competitor Analysis", description: "Most competitors rely on static quizzes. Very few utilize computer vision for real-time body analysis.", tag: "Market Research" },
          { title: "User Personas", description: "Targeting young professionals who care about appearance but lack the time or knowledge to curate a personalized wardrobe.", tag: "User Research" },
          { title: "Pain Points", description: "Users are overwhelmed by choice. They don't want more clothes; they want the right clothes.", tag: "User Journey" },
          { title: "Opportunity", description: "Providing a generative AI interface that translates physical attributes into specific clothing categories.", tag: "Gap Analysis" }
        ]} 
      />

      {/* 7. Product Strategy */}
      <TextSection title="Product Strategy" label="Go-To-Market">
        <p>
          <strong>Business Model:</strong> Freemium access to basic body analysis, with a premium subscription for unlimited wardrobe generation and occasion-specific styling.
        </p>
        <p>
          <strong>MVP Strategy:</strong> Focus heavily on the accuracy of the computer vision body analysis first. If the foundation is wrong, the LLM recommendations will be useless. Prioritize a mobile-first web experience to leverage device cameras easily.
        </p>
      </TextSection>

      {/* 8. Product Requirements */}
      <TextSection title="Requirements" label="Specifications">
        <ul>
          <li><strong>Functional:</strong> Real-time body scanning, wardrobe digitization, outfit generation based on weather/occasion.</li>
          <li><strong>Non-functional:</strong> Sub-2-second latency on initial AI generation. Mobile-first responsiveness.</li>
          <li><strong>AI Requirements:</strong> High accuracy in edge-based facial/body landmark detection. Guardrails against inappropriate image uploads.</li>
        </ul>
      </TextSection>



      {/* 14. AI Implementation */}
      <TextSection title="AI Implementation" label="Core Engine">
        <p>
          AI is the brain of P'STYLST. I chose to use a hybrid approach to balance performance, cost, and privacy.
        </p>
        <ul>
          <li><strong>Computer Vision (Edge):</strong> Used TensorFlow.js for immediate, private body and face analysis on the user's device. No images are sent to the server for this step.</li>
          <li><strong>Recommendation System (Server):</strong> Integrated OpenAI's LLMs via structured outputs to generate semantic clothing recommendations based on the edge-computed physical data.</li>
          <li><strong>Guardrails:</strong> Implemented strict moderation endpoints and fallback logic to handle edge cases where the CV model fails to detect landmarks accurately.</li>
        </ul>
      </TextSection>


      {/* 16. Engineering Decisions */}
      <TextSection title="Engineering Decisions" label="Architecture">
        <p>
          <strong>Why Next.js?</strong> SSR was critical for perceived performance, and the app router provided seamless integration between frontend UI and backend AI routes.
        </p>
        <p>
          <strong>Trade-offs:</strong> Running TensorFlow.js on the client increases the initial JS bundle size. I mitigated this by dynamically importing the heavy CV modules only when the user enters the scanning flow, keeping the landing page incredibly fast.
        </p>
      </TextSection>

      {/* 17. Features & 18. Challenges */}
      <CardGrid 
        title="Key Features & Challenges" 
        items={[
          { title: "Real-time Body Analysis", description: "Problem: Users don't know their measurements. Solution: CV edge model. Challenge: Lighting variations affecting model accuracy. Mitigated via UI guidance.", tag: "Feature" },
          { title: "Semantic Outfit Generation", description: "Problem: Hard-coded logic is too rigid for fashion. Solution: LLM-driven generation. Challenge: Hallucinations. Mitigated via strict prompt engineering and structured JSON outputs.", tag: "Feature" },
          { title: "Latency Spikes", description: "Challenge: AI inference can take 5+ seconds. Solved by implementing optimistic UI updates and skeletal loading states to maintain perceived performance.", tag: "Challenge" },
          { title: "Privacy Concerns", description: "Challenge: Users hesitant to upload photos. Solved by processing sensitive data entirely on the client-side.", tag: "Challenge" }
        ]} 
      />

      {/* 19. Metrics & 20. Results */}
      <MetricsDashboard 
        metrics={[
          { label: "User Satisfaction", value: "94", suffix: "%" },
          { label: "Avg Session Time", value: "4.5", suffix: "m" },
          { label: "Inference Latency", value: "<2", suffix: "s" },
          { label: "Core Web Vitals", value: "100", suffix: "" }
        ]} 
      />

      {/* 21. Future Roadmap */}
      <TextSection title="Future Roadmap" label="What's Next">
        <ul>
          <li><strong>Short-term:</strong> Implement advanced caching for generated outfits to reduce LLM API costs.</li>
          <li><strong>Mid-term:</strong> Direct e-commerce integrations to allow users to buy generated outfits immediately.</li>
          <li><strong>Long-term:</strong> AR try-on capabilities directly in the browser.</li>
        </ul>
      </TextSection>

      {/* 22. Reflection */}
      <TextSection title="Reflection" label="Looking Back">
        <p>
          Building P'STYLST fundamentally shifted my perspective on product engineering. It taught me that <strong>an AI model is only as valuable as the user experience surrounding it</strong>. The biggest learning was managing state between heavy client-side ML models and server-side LLMs gracefully.
        </p>
      </TextSection>

      {/* 23. Tech Stack */}
      <TechStack 
        categories={[
          { name: "Frontend", technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
          { name: "Backend", technologies: ["Node.js", "Next.js API", "Prisma"] },
          { name: "AI & Data", technologies: ["TensorFlow.js", "OpenAI", "PostgreSQL", "Supabase"] }
        ]} 
      />


      {/* 25. Related Projects */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-border flex flex-col items-center text-center">
         <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-12">Next Project</h2>
         <Link href="/work/writersthing" className="group">
           <p className="text-secondary tracking-widest uppercase text-sm mb-4">View Case Study</p>
           <div className="flex items-center gap-4 text-4xl md:text-6xl font-medium text-primary group-hover:text-accent transition-colors">
              Writersthing <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
           </div>
         </Link>
      </section>

    </CaseStudyLayout>
  );
}
