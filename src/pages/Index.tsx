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
    <div className="min-h-screen bg-background">
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
  );
};

export default Index;
