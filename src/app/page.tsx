import { Hero } from "@/components/Hero";
import { CoreCompetencies } from "@/components/CoreCompetencies";
import { SelectedWork } from "@/components/SelectedWork";
import { Engineering } from "@/components/Engineering";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Writing } from "@/components/Writing";
import { About } from "@/components/About";
import { Posters } from "@/components/Posters";
import { Contact } from "@/components/Contact";
import { FeaturedOn } from "@/components/FeaturedOn";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="block md:hidden py-10 border-t border-border">
        <CoreCompetencies />
      </div>
      <div>
        <SelectedWork />
      </div>
      <div className="hidden md:block">
        <Engineering />
      </div>
      {/* Live GitHub Real-Time Contributions & Activity */}
      <GitHubActivity />
      <div className="hidden md:block">
        <Writing />
      </div>
      <About />
      {/* <Posters /> */}
      <Contact />
      {/* Featured On Badges & Directory Recognition Section (Last Before Footer) */}
      <FeaturedOn />
    </div>
  );
}
