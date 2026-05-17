import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(221, 70%, 45%)"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/70 shadow-sm mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/70">AI-Powered Business Growth</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Welcome to{" "}
              <span className="text-primary">Momentum</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Transform your business with AI-driven automation. From lead generation to customer
              engagement, we help you scale smarter and faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors text-lg px-8 py-6 font-semibold" asChild>
                <a href="https://calendly.com/revantraj198011/30min" target="_blank" rel="noopener noreferrer">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 border-border/70 bg-card hover:bg-secondary">
                Learn More
              </Button>
            </div>

          </div>

          {/* Right Content - 3D Spline Scene */}
          <div className="flex-1 h-[400px] lg:h-[600px] w-full relative animate-fade-in rounded-[2rem] border border-border/80 bg-card shadow-[0_30px_60px_rgba(15,23,42,0.12)] overflow-hidden" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/60 to-white/10" />
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full relative z-10 opacity-90 [filter:grayscale(0.6)_contrast(1.05)_saturate(0.7)_brightness(1.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
