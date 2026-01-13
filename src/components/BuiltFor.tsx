import { Phone, MessageSquare, Target } from "lucide-react";

const audiences = [
  {
    icon: Phone,
    title: "Built for Businesses That Can't Afford to Miss a Call",
    description:
      "Every missed call is a missed opportunity. Our AI ensures you never lose a lead, even when you're busy closing deals.",
    highlight: "24/7 Call Coverage",
  },
  {
    icon: MessageSquare,
    title: "Created for Businesses That Rely on Phone Conversations",
    description:
      "When your revenue depends on meaningful conversations, our AI handles the volume while maintaining the personal touch.",
    highlight: "Smart Conversations",
  },
  {
    icon: Target,
    title: "Made for Businesses Where Every Call Matters",
    description:
      "High-ticket services, urgent inquiries, time-sensitive leads — we understand that some calls simply can't wait.",
    highlight: "Zero Missed Leads",
  },
];

export const BuiltFor = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            Perfect Fit
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-in">
            Who <span className="gradient-text">Momentum AI</span> Is Built For
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-in">
            We understand the unique challenges of call-dependent businesses
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card */}
              <div className="h-full p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Icon container */}
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <audience.icon className="w-8 h-8 text-white" />
                </div>

                {/* Highlight badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  {audience.highlight}
                </span>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-foreground mb-4 leading-tight">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground">
            Sound like you? <span className="text-primary font-medium">Let's talk.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
