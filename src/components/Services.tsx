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

export const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions designed to automate and optimize every aspect of your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl bg-card/50 border border-border hover:bg-card hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
