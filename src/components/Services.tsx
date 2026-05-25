import { Brain, BarChart3, Shield, Workflow, Mic } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Chatbots",
    description: "Intelligent conversational agents that understand context and provide human-like responses.",
  },
  {
    icon: Mic,
    title: "AI Voice Agents",
    description: "Natural-sounding voice assistants that handle calls, appointments, and customer inquiries 24/7.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Real-time dashboards and predictive analytics to track your growth metrics.",
  },
  {
    icon: Shield,
    title: "Lead Qualification",
    description: "AI-powered scoring to identify and prioritize your highest-value prospects.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline operations by automating repetitive tasks and processes.",
  },
];

const bentoLayout = [
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

const cardStyles = [
  "md:min-h-[210px]",
  "md:min-h-[210px]",
  "md:min-h-[200px]",
  "md:min-h-[200px]",
  "md:min-h-[200px]",
];

const accentStyles = [
  "from-sky-100 via-white to-indigo-50",
  "from-indigo-100 via-white to-sky-50",
  "from-violet-100 via-white to-indigo-50",
  "from-emerald-100 via-white to-emerald-50",
  "from-rose-100 via-white to-amber-50",
];

export const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Comprehensive AI solutions designed to automate and optimize every aspect of your business.
          </p>
        </div>

        <div className="rounded-[0px]]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
                className={`group h-full rounded-[22px] bg-card border border-border/80 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all duration-300 animate-fade-in-up ${bentoLayout[index]} ${cardStyles[index]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
                <div className="flex h-full flex-col p-5 md:p-6">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-display font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-foreground/65 text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div
                      className={`relative w-full h-20 md:h-24 rounded-2xl border border-white/70 bg-gradient-to-br ${accentStyles[index]} shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:14px_14px] opacity-50" />
                      <div className="relative h-full flex items-center justify-center">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 ring-1 ring-black/5 shadow-sm">
                          <service.icon className="h-4.5 w-4.5 text-primary" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
