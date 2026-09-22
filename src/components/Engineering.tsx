import { Lightbulb, Bot, MonitorSmartphone, Server, Database, PenTool, ArrowRight, ArrowDown } from "lucide-react";

const capabilities = [
  {
    icon: Lightbulb,
    title: "Product Thinking",
    description: "I begin every project by understanding the problem before choosing the technology.",
    items: [
      "Product Discovery",
      "User Experience",
      "Feature Planning",
      "MVP Strategy",
      "Product Architecture",
      "End-to-End Delivery",
    ],
  },
  {
    icon: Bot,
    title: "AI-Assisted Development",
    description: "I use modern AI tools to accelerate engineering, automate repetitive work, explore ideas faster, and build production-ready software efficiently.",
    items: [
      "Prompt Engineering",
      "AI-assisted Development",
      "LLM Integration",
      "AI Workflow Automation",
      "Rapid Prototyping",
      "Code Review with AI",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Frontend Engineering",
    description: "Building fast, responsive, accessible, and scalable user interfaces.",
    items: [
      "UI/UX Implementation",
      "Responsive Design",
      "Client-side Architecture",
      "State Management",
      "Cross-platform Development",
      "Performance Optimization",
    ],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description: "Developing secure APIs and scalable backend systems that power modern digital products.",
    items: [
      "API Development",
      "System Architecture",
      "Microservices",
      "Authentication",
      "Security",
      "Scalable Infrastructure",
    ],
  },
  {
    icon: Database,
    title: "Data & Cloud",
    description: "Managing application data, cloud storage, and scalable backend services.",
    items: [
      "Database Architecture",
      "Cloud Infrastructure",
      "Data Modeling",
      "Serverless Architecture",
      "Storage Solutions",
      "Data Privacy",
    ],
  },
  {
    icon: PenTool,
    title: "Product Design",
    description: "Creating intuitive digital experiences through thoughtful design and user-centered thinking.",
    items: [
      "UX Research",
      "User Flows",
      "Wireframes",
      "Design Systems",
      "Figma",
      "Prototyping",
    ],
  },
];

const workflow = [
  { step: "Problem", desc: "Identify the core challenge" },
  { step: "Research", desc: "Understand users & context" },
  { step: "Product Strategy", desc: "Define goals & scope" },
  { step: "UX Design", desc: "Craft intuitive experiences" },
  { step: "AI-assisted Development", desc: "Build & accelerate" },
  { step: "Testing", desc: "Ensure quality & reliability" },
  { step: "Deployment", desc: "Ship to production" },
  { step: "Continuous Improvement", desc: "Iterate based on feedback" },
];

const coreCompetencies = [
  "AI Product Development", "End-to-End Product Engineering", "Product Strategy", "Product Discovery", 
  "Prompt Engineering", "AI-assisted Development", "LLM Integration", "Rapid Prototyping", 
  "Product Architecture", "System Design", "API Design", "Database Design", 
  "Cloud Deployment", "Cross-functional Collaboration", "Agile Product Development", "Continuous Product Improvement"
];

export function Engineering() {
  return (
    <section id="engineering" className="w-full py-12 md:py-16 border-t border-border">
      
      {/* Introduction */}
      <div className="mb-20 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-8 tracking-tight">How I Build Products</h2>
        <div className="space-y-6 text-xl text-secondary max-w-3xl leading-relaxed">
          <p>
            I build products by combining product thinking, modern software engineering, and AI-assisted development.
          </p>
          <p>
            My workflow focuses on solving real problems, rapidly validating ideas, and shipping production-ready software using AI as an engineering accelerator—not as a replacement for thoughtful decision making.
          </p>
        </div>
      </div>
      
      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {capabilities.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="p-8 md:p-10 rounded-3xl border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors group flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-8 flex-1">
                {card.description}
              </p>
              <ul className="space-y-3 mt-auto">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center text-sm font-medium text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Product Development Workflow */}
      <div className="mb-32">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-12 tracking-tight">My Product Development Workflow</h3>
        <div className="flex flex-col md:flex-row flex-wrap md:items-start gap-y-8 gap-x-4">
          {workflow.map((item, index) => (
            <div key={item.step} className="flex items-start md:items-center">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 group">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-primary group-hover:text-accent transition-colors">{item.step}</span>
                  <span className="text-xs text-secondary mt-1">{item.desc}</span>
                </div>
                {index < workflow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-secondary/30 hidden md:block mx-2" />
                )}
                {index < workflow.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-secondary/30 block md:hidden mt-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Competencies */}
      <div className="mb-32">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4 tracking-tight">Core Competencies</h3>
        <p className="text-lg text-secondary mb-12">The skills and expertise that drive my product development workflow.</p>
        <div className="flex flex-wrap gap-4">
          {coreCompetencies.map((competency) => (
            <span key={competency} className="px-5 py-2.5 rounded-full border border-border bg-secondary/5 text-primary font-medium text-sm hover:bg-secondary/10 transition-colors">
              {competency}
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="pt-16 border-t border-border/50 text-center max-w-3xl mx-auto">
        <p className="text-2xl md:text-3xl text-primary font-medium leading-relaxed italic">
          "I don't use AI to replace engineering. I use AI to accelerate thoughtful product development, reduce repetitive work, and spend more time solving meaningful problems."
        </p>
      </div>

    </section>
  );
}
