import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-card border border-border/80 shadow-[0_18px_42px_rgba(15,23,42,0.1)]">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="text-primary">Accelerate</span> Your Growth?
          </h2>
          <p className="text-lg text-foreground/70 mb-10">
            Join hundreds of businesses already using Momentum AI to automate their success.
            Get started today and see results within weeks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors text-lg px-8 py-6 font-semibold" asChild>
              <a href="https://calendly.com/momentumai18/30min" target="_blank" rel="noopener noreferrer">
                Book Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-foreground/60 mt-6">
            No credit card required • Free consultation • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
