import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ValueProposition } from "@/components/ValueProposition";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Mission } from "@/components/Mission";
import { BuiltFor } from "@/components/BuiltFor";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-64 -left-32 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Stats />
          <ValueProposition />
          <About />
          <Services />
          <Mission />
          <BuiltFor />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
