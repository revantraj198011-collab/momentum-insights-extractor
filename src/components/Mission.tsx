import { Target, Eye } from "lucide-react";

export const Mission = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="p-8 rounded-3xl bg-card border border-border/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-foreground">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed">
              To democratize AI technology and empower businesses of all sizes to achieve 
              exponential growth through intelligent automation. We're committed to making 
              cutting-edge AI accessible, affordable, and impactful for every entrepreneur 
              and business owner.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl bg-card border border-border/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-foreground">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              A world where every business has access to the same powerful AI tools as 
              Fortune 500 companies. We envision a future where AI amplifies human potential, 
              enabling entrepreneurs to focus on creativity and strategy while automation 
              handles the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
