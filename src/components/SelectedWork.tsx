import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: "pstylst",
    name: "P'STYLST",
    category: "AI Product • Fashion Technology",
    description: "An AI-powered Personal Stylist Intelligence platform designed to deliver personalized styling experiences using artificial intelligence and computer vision. The platform combines face analysis, body analysis, outfit generation, wardrobe intelligence, and personalized recommendations to help users make confident fashion decisions.",
    status: "Live",
    keyContributions: [
      "Led end-to-end product development from concept to deployment.",
      "Designed product architecture and user experience.",
      "Integrated AI-powered styling workflows.",
      "Built scalable frontend and backend systems.",
      "Managed deployment and continuous product improvements."
    ],
    year: "2026",
    liveUrl: "https://www.pstylst.com/",
    previewImage: "/projects_images/pstylst-hero.png"
  },
  {
    id: "writersthing",
    name: "Writersthing",
    category: "Publishing Platform • SaaS",
    description: "A modern publishing ecosystem built for writers and readers to publish, manage, and distribute digital books through an intuitive and scalable platform.",
    status: "Beta Version is available",
    keyContributions: [
      "Product strategy and platform architecture.",
      "Publishing workflow design.",
      "Authentication and user management.",
      "Payment integration.",
      "End-to-end product engineering."
    ],
    year: "2026",
    liveUrl: "https://writersthing-testing.vercel.app/",
    previewImage: "/projects_images/writersthing-hero.png"
  },
  {
    id: "kollimalai",
    name: "Kollimalai Natural Store",
    category: "E-Commerce Platform",
    description: "A modern digital commerce platform bringing authentic natural products from Kolli Hills to customers through a seamless online shopping experience.",
    status: "Live",
    keyContributions: [
      "Product design.",
      "Shopping experience optimization.",
      "Product engineering.",
      "Performance optimization.",
      "Deployment support."
    ],
    year: "2026",
    liveUrl: "https://www.kollimalainaturalstore.com/",
    previewImage: "/projects_images/kollimalai-hero.png"
  },
  {
    id: "crossmotive",
    name: "CrossMotive Services",
    category: "BPO & Enterprise Operations Platform",
    description: "A comprehensive BPO and enterprise outsourcing platform providing specialized services across data annotation, financial operations, IT administration, real estate back-office, and travel operations management.",
    status: "Live",
    keyContributions: [
      "End-to-end platform design and frontend architecture.",
      "Service workflow optimization across multi-domain BPO operations.",
      "Integration of data annotation and IT management dashboards.",
      "Client portal interface engineering and security compliance.",
      "Performance optimization and cloud infrastructure deployment."
    ],
    year: "2026",
    liveUrl: "https://www.crossmotiveservices.com/",
    previewImage: "/projects_images/crossmotive-hero.png"
  },
  {
    id: "vegetabletonnes",
    name: "VegetableTonnes",
    category: "B2B AgriTech • Auction Platform",
    description: "India's premier B2B agriculture bidding and marketplace platform designed to directly connect farmers with bulk buyers and wholesalers through real-time digital auctions, bypassing intermediate supply chain markups.",
    status: "Live",
    keyContributions: [
      "Direct farm-to-buyer bidding marketplace design & engineering.",
      "Real-time auction engine & price discovery mechanism.",
      "Produce inventory cataloging and trade management workflows.",
      "Mobile-responsive frontend with ultra-low latency updates.",
      "Scalable backend architecture for high-volume agricultural trades."
    ],
    year: "2026",
    liveUrl: "https://www.vegetabletonnes.com/",
    previewImage: "/projects_images/vegetabletonnes-hero.png"
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="w-full py-16 md:py-24 border-t border-border">
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-6">Product Case Studies</h2>
        <p className="text-xl text-secondary max-w-2xl leading-relaxed">
          A selection of complete digital products I have designed, architected, and engineered from idea to production.
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {projects.map((project) => (
          <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center group">
            {/* Preview Image Area - Left Side */}
            <div>
              <Link href={`/work/${project.id}`} className="block w-full aspect-video bg-secondary/5 border border-border rounded-2xl md:rounded-3xl overflow-hidden relative transition-transform hover:scale-[1.02] duration-500 ease-out flex items-center justify-center">
                 {project.previewImage && (
                   <img src={project.previewImage} alt={`${project.name} preview`} className="w-full h-full object-cover" />
                 )}
              </Link>
            </div>
            
            {/* Content Area - Right Side */}
            <div className="flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-medium tracking-wide text-primary border border-border rounded-full">
                  {project.status}
                </span>
                <span className="px-3 py-1 text-xs font-medium tracking-wide text-secondary bg-secondary/5 rounded-full">
                  {project.year}
                </span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-semibold text-primary mb-4 tracking-tight">
                {project.name}
              </h3>
              
              <p className="text-sm font-medium text-accent tracking-wide uppercase mb-6">
                {project.category}
              </p>
              
              <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="mb-10 w-full">
                <h4 className="text-xs font-medium text-primary mb-4 uppercase tracking-wider">Key Contributions</h4>
                <ul className="space-y-3">
                  {project.keyContributions.map((contribution, index) => (
                    <li key={index} className="flex items-start text-sm text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-3 mt-1.5 flex-shrink-0"></span>
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/work/${project.id}`}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-background font-medium hover:bg-primary/90 transition-colors group/link"
                >
                  View Case Study
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-transparent text-primary font-medium hover:bg-secondary/5 transition-colors"
                  >
                    Visit Live Site
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
