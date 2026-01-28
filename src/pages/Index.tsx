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
import ShaderBackground from "@/components/ui/shader-background";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Global Shader Background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground className="opacity-70" />
      </div>
      
      {/* Overlay for better content readability */}
      <div className="fixed inset-0 z-0 bg-background/30" />
      
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
