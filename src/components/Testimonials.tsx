import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    content:
      "Momentum AI transformed our lead generation process. We saw a 300% increase in qualified leads within the first month.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    content:
      "The AI chatbot handles 80% of our customer inquiries automatically. Our team can now focus on high-value tasks.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    content:
      "Best investment we've made. The ROI was clear within weeks, and the support team is incredibly responsive.",
    rating: 5,
    avatar: "ER",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business owners are saying about Momentum AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{testimonial.avatar}</span>
                </div>
              <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
