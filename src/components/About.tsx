export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-16 border-t border-border mt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-12">About</h2>
        
        <div className="flex flex-col gap-10 text-lg text-secondary leading-relaxed">
          
          {/* 1. My Story */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">The Bridge Between Design and Logic</h3>
            <p>
              I began my career as a UI/UX Designer. In those early days, my focus was entirely on the surface—understanding human behavior, identifying friction points, and crafting interfaces that felt intuitive. I learned that pixels tell stories, and every interaction is a silent conversation between the product and the user.
            </p>
            <p>
              But as I handed off designs to engineering teams, I found myself increasingly curious about what happened next. How did these static frames become living, breathing software? That curiosity became a catalyst. I started pulling on the threads of frontend development, which inevitably led to backend engineering, database architecture, and cloud infrastructure. Eventually, it drew me into the world of artificial intelligence.
            </p>
            <p>
              Today, I don't see design, software engineering, and AI as separate disciplines. I see them as different tools to solve the same problem. I believe the most exceptional products emerge when product strategy, user experience, rigorous engineering, and machine intelligence work together seamlessly.
            </p>
          </div>

          {/* 2. What I Build */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">Zero to One</h3>
            <p>
              I specialize in building complete digital products from the ground up. I thrive in the ambiguity of the "zero to one" phase—transforming an abstract idea into a production-ready application that solves a real-world problem.
            </p>
            <p>
              This requires wearing many hats. On any given day, I might be mapping out a product strategy, designing a user flow, writing a REST API, configuring a PostgreSQL database, or integrating a large language model. This end-to-end context allows me to make architectural decisions that don't just optimize for technical elegance, but optimize for the user experience.
            </p>
          </div>

          {/* 3. Engineering Philosophy */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">Intentional Engineering</h3>
            <p>
              I believe technology should solve meaningful problems, not create unnecessary complexity. Every product must have a clear, undeniable purpose. Every feature must actively improve the user's workflow. 
            </p>
            <p>
              In an industry that often celebrates over-engineering, I value simplicity, maintainability, and thoughtful product design. Every technical decision I make is intentional. I write code that is clean, architecture that scales only when it needs to, and interfaces that get out of the user's way. 
            </p>
          </div>

          {/* 4. Experience & Approach */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">Building Reality</h3>
            <p>
              Over the past year and a half, I have contributed to building complete products across multiple domains. I architected and developed P'STYLST, India's AI-powered Personal Stylist Intelligence platform, integrating computer vision and generative AI to democratize fashion styling. I built Writersthing to give modern authors a seamless digital publishing ecosystem. And I engineered YoKarna, a highly scalable platform designed to solidify digital presence for growing businesses.
            </p>
            <p>
              Across these projects, my approach remains remarkably consistent: understand the core problem deeply, talk to users, define clear product goals, design an intuitive experience, build a scalable system, integrate AI where it creates asymmetric value, and deploy quickly. The goal is always to get the product into users' hands, learn from their behavior, and continuously iterate.
            </p>
          </div>

          {/* 5. What Excites Me */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">The AI Accelerator</h3>
            <p>
              We are living through a fundamental shift in how software is designed and built. What excites me most about this moment is the unprecedented ability to turn ideas into working products faster than ever before. 
            </p>
            <p>
              I embrace artificial intelligence as a profound creative and engineering accelerator, but I do not see it as a replacement for critical human thinking. AI can write boilerplate code and generate layouts, but it cannot empathize with a frustrated user or understand the nuanced context of a business problem. I enjoy exploring how modern AI systems can augment human productivity, simplify complex operations, and create magical, previously impossible user experiences.
            </p>
          </div>

          {/* 6. What I Am Looking For */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-primary">Looking Forward</h3>
            <p>
              I am interested in collaborating with startups and product-focused companies that are building meaningful, ambitious technology. I am particularly drawn to problems in the spaces of Artificial Intelligence, SaaS, FinTech, developer tools, and the future of work. 
            </p>
            <p>
              I want to work in fast-moving, high-agency environments where experimentation is encouraged, ownership is a given, and the pursuit of excellence is a shared baseline. If you are building something that matters, I would love to talk.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
