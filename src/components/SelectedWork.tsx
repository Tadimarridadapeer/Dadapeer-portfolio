import Link from "next/link";
import { Globe } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  liveUrl?: string;
  previewImage: string;
}

const projects: Project[] = [
  {
    id: "pstylst",
    name: "P'STYLST",
    description: "An AI-powered Personal Stylist Intelligence platform combining computer vision and generative AI to deliver personalized outfit recommendations and wardrobe intelligence.",
    liveUrl: "https://www.pstylst.com/",
    previewImage: "/projects_images/pstylst-hero.png"
  },
  {
    id: "writersthing",
    name: "Writersthing",
    description: "A modern digital publishing ecosystem built for authors and readers to write, manage, distribute, and monetize books with an intuitive and scalable platform.",
    liveUrl: "https://www.writersthing.com/",
    previewImage: "/projects_images/writersthing-hero.png"
  },
  {
    id: "kollimalai",
    name: "Kollimalai Natural Store",
    description: "A direct-from-origin e-commerce platform bringing authentic natural products from Kolli Hills to customers through a modern, seamless digital shopping experience.",
    liveUrl: "https://www.kollimalainaturalstore.com/",
    previewImage: "/projects_images/kollimalai-hero.png"
  },
  {
    id: "crossmotive",
    name: "CrossMotive Services",
    description: "An enterprise operations and BPO management platform providing specialized services across data annotation, IT administration, and financial workflows.",
    liveUrl: "https://www.crossmotiveservices.com/",
    previewImage: "/projects_images/crossmotive-hero.png"
  },
  {
    id: "vegetabletonnes",
    name: "VegetableTonnes",
    description: "India's premier B2B agriculture bidding and marketplace platform connecting farmers directly with bulk buyers through real-time digital auctions.",
    liveUrl: "https://www.vegetabletonnes.com/",
    previewImage: "/projects_images/vegetabletonnes-hero.png"
  }
];

export function SelectedWork() {
  return (
    <section id="work" className="w-full py-12 md:py-16 border-t border-border">
      {/* Featured Projects Header */}
      <div className="mb-8 md:mb-12">
        <p className="text-xs md:text-sm font-mono tracking-widest text-secondary/70 uppercase">
          Featured Projects
        </p>
      </div>

      {/* 2-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Card Preview Image */}
            <Link
              href={`/work/${project.id}`}
              className="block relative w-full aspect-[16/10] overflow-hidden bg-[#F9FAFB] border-b border-border/70 p-3 sm:p-4 flex items-center justify-center cursor-pointer"
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-black/5 bg-white flex items-center justify-center">
                <img
                  src={project.previewImage}
                  alt={`${project.name} preview`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>
            </Link>

            {/* Card Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 justify-between bg-white">
              {/* Title & Live Link Row */}
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/work/${project.id}`}
                  className="hover:text-accent transition-colors"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
                    {project.name}
                  </h3>
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/70 hover:text-primary transition-colors p-1"
                    title="Visit Live Site"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-secondary mt-3 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
