import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Mission } from "@/components/Mission";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import FireTunnelShader from "@/components/ui/fire-nightmare-shader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fire Shader Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <FireTunnelShader />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ValueProposition />
          <About />
          <Services />
          <Mission />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
