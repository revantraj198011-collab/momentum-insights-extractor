import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="gradient-text">Accelerate</span> Your Growth?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join hundreds of businesses already using Momentum AI to automate their success.
            Get started today and see results within weeks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity text-lg px-8 py-6 glow">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-secondary">
              Contact Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free consultation • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
