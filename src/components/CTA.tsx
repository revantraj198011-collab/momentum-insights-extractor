import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/50">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="gradient-text">Accelerate</span> Your Growth?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join hundreds of businesses already using Momentum AI to automate their success.
            Get started today and see results within weeks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity text-lg px-8 py-6 glow text-primary-foreground font-semibold" asChild>
              <a href="https://calendly.com/revantraj198011/30min" target="_blank" rel="noopener noreferrer">
                Book Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
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
