import { Button } from "@/components/ui/button";
import msmeLogo from "@/assets/msme.png";

export const VoiceBuiltForIndia = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.24)_1px,transparent_1px)] bg-[size:80px_80px] opacity-80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border/70 px-4 py-2 text-sm text-foreground/70 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Backed by</span>
            <span className="text-primary font-medium">Delhi Government</span>
          </div>

          <h2 className="mt-8 text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
            MOMENTUM AI
          </h2>
          <h3 className="mt-2 text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
            Helping Businesses{" "}
            <span className="bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
              Globally
            </span>
          </h3>

          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
            Power thousands of inbound and outbound calls every minute with human-like,
            multilingual intelligence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-foreground">
              Registered under
            </h3>
            <img
              src={msmeLogo}
              alt="Delhi Government Logo"
              className="h-20 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
