import { CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const highlights = [
  "Expert team with 10+ years in AI and automation",
  "Proven track record with 500+ successful implementations",
  "Dedicated support and continuous optimization",
  "Custom solutions tailored to your business needs",
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              About <span className="gradient-text">Momentum AI</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Momentum AI was founded with a simple mission: to make advanced AI technology
              accessible to businesses of all sizes. We believe that every company deserves
              the power of intelligent automation.
            </p>
            <p className="text-muted-foreground mb-8">
              Led by our founder <span className="text-foreground font-semibold">Revant Raj</span>, 
              our team combines deep expertise in artificial intelligence, machine learning, 
              and business automation to deliver solutions that drive real results.
            </p>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient Background */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-6 glow animate-float bg-background/50 p-4">
                    <img src={logo} alt="Momentum AI" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Revant Raj</h3>
                  <p className="text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
