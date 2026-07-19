import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Engineering } from "@/components/Engineering";
import { Writing } from "@/components/Writing";
import { About } from "@/components/About";
import { Posters } from "@/components/Posters";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <SelectedWork />
      <Engineering />
      <Writing />
      <About />
      {/* <Posters /> */}
      <Contact />
    </div>
  );
}
