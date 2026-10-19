export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-16 border-t border-border mt-8">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-4 tracking-tight">About</h2>
          <p className="text-lg text-secondary leading-relaxed">
            My background, philosophy, and approach to building products at the intersection of design, engineering, and AI.
          </p>
        </div>
        
        {/* Right Column: 'From Pixels to Products' Story */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-lg md:text-xl text-secondary leading-relaxed">
          <h3 className="text-2xl md:text-3xl font-medium text-primary tracking-tight">
            From Pixels to Products
          </h3>

          <p>
            My journey began with a simple question: <strong className="text-primary font-medium">What happens when a design becomes a real product?</strong>
          </p>

          <p>
            I started as a UI/UX Designer, fascinated by how people interact with technology. I learned to turn ideas into intuitive experiences, but designing the interface was only the beginning. I wanted to understand everything behind it—the code, the systems, the data, and eventually, the intelligence that brings products to life.
          </p>

          <p>
            That curiosity led me from design to frontend development, backend engineering, cloud infrastructure, and AI. Somewhere along the way, I realized I didn&apos;t want to build just one part of a product. <strong className="text-primary font-medium">I wanted to build the whole thing.</strong>
          </p>

          <p>
            Today, I work at the intersection of design, engineering, and AI, turning early-stage ideas into real, working products. From building P&apos;STYLST, an AI-powered personal styling platform, to creating Writersthing for modern authors, each project has taught me the same lesson: great products aren&apos;t built by technology alone. They&apos;re built by understanding people and solving the right problems.
          </p>

          <p>
            My approach is simple: start with the problem, design with purpose, engineer with intention, and use AI where it genuinely makes a difference. I value simplicity over unnecessary complexity and meaningful progress over perfect plans.
          </p>

          <p>
            I&apos;m excited by what comes next—the opportunity to build ambitious products, experiment with emerging technologies, and turn ideas that seem impossible today into something people can use tomorrow.
          </p>

          <p className="pt-2 text-xl md:text-2xl text-primary font-medium leading-relaxed">
            I&apos;m not just interested in how things look or how they work. I&apos;m interested in bringing the two together to build things that matter.
          </p>
        </div>
      </div>
    </section>
  );
}
