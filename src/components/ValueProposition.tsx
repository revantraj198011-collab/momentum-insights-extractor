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

const cardThemes = [
  "bg-[#dbe7f2] border-[#cbdbe9]",
  "bg-[#f4d6b6] border-[#e9c9a6]",
  "bg-[#cdb4e6] border-[#bfa2df]",
];

const featureDetails = [
  ["Conversational flows", "Human handoff", "Multi-language"],
  ["Pipeline visibility", "Auto-routing", "CRM-ready data"],
  ["Campaign triggers", "Personalized sequences", "Performance lift"],
];

export const ValueProposition = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="text-primary font-lemonmilk">Momentum AI</span>?
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our AI-powered solutions are designed to help your business grow faster and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative flex h-full min-h-[380px] md:min-h-[420px] flex-col rounded-[28px] border p-8 shadow-[0_20px_45px_rgba(140,120,90,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(140,120,90,0.22)] animate-fade-in-up cursor-pointer ${cardThemes[index]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/70 border border-black/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                <div className="mt-6 space-y-2 text-sm text-foreground/70">
                  {featureDetails[index].map((detail) => (
                    <div key={detail} className="flex items-center gap-2 border-b border-black/10 pb-2 last:border-b-0 last:pb-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                      {detail}
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/60">
                    Learn More
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-foreground/70">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
