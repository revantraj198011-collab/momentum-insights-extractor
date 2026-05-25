import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Linkedin } from "lucide-react";
import logo from "@/assets/momentum logo.png";

const indexLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const companyLinks = [
  { name: "Company", href: "#about" },
  { name: "Careers", href: "#" },
  { name: "Blog", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0b0b0c] py-12 text-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="">
          <div className="text-[clamp(3.5rem,12vw,10rem)] font-display  font-semibold tracking-wide leading-none text-white/85">
            MOMENTUM AI
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                Index
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                {indexLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/50" />
                  
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/50" />
                  <a href="mailto:hello@momentum.ai" className="hover:text-white transition-colors">
                    momentumai18@gmail.com
                  </a>
                </li>
             
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                Social
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/momentumai__/reels/"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />

                </a>
                
                <a
                  href="https://www.linkedin.com/company/117714122/"
                  aria-label="Linkedin"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-6">
                <a
                  href="https://calendly.com/momentumai18/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-xl bg-white/90 border border-white/10 p-2 shadow-sm">
                  <img src={logo} alt="Momentum AI Logo" className="h-7 w-auto" />
                </span>
                <span className="text-sm font-display font-semibold text-white/80">
                  Momentum <span className="text-white">AI</span>
                </span>
              </div>
              <p className="text-xs text-white/50">
                © {new Date().getFullYear()} Momentum AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
