import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Momentum AI Logo" className="h-12 w-auto" />
              <span className="text-xl font-display font-bold text-foreground">
                Momentum<span className="gradient-text">AI</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering businesses with AI-driven automation solutions for sustainable growth.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Momentum AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
