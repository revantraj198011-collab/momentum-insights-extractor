import { Bot, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "24/7 Virtual Assistant",
    description:
      "Never miss a lead with our AI-powered assistant that works around the clock to engage with your customers.",
  },
  {
    icon: Users,
    title: "Lead Management System",
    description:
      "Capture, qualify, and nurture leads automatically with our intelligent CRM integration.",
  },
  {
    icon: Zap,
    title: "Smart Marketing Automation",
    description:
      "Automate your marketing campaigns with AI-driven personalization and optimal timing.",
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">Momentum AI</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered solutions are designed to help your business grow faster and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
