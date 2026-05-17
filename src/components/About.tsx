import { CheckCircle } from "lucide-react";

const highlights = [
  "Dedicated support and continuous optimization",
  "Custom solutions tailored to your business needs",
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="animate-fade-in text-center p-10 rounded-3xl bg-card border border-border/80 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              About <span className="text-primary">Momentum AI</span>
            </h2>
            <p className="text-foreground/70 text-lg mb-6">
              Momentum AI was founded with a simple mission: to make advanced AI technology
              accessible to businesses of all sizes. We believe that every company deserves
              the power of intelligent automation.
            </p>
            <p className="text-foreground/70 mb-8">
              Led by our founder <span className="text-foreground font-semibold">Revant Raj</span>, 
              our team combines deep expertise in artificial intelligence, machine learning, 
              and business automation to deliver solutions that drive real results.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
