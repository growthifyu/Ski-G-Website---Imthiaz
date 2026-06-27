import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";
import skigLogo from "@/assets/skig-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <img alt="ski-G Energies" className="h-16 w-auto mb-4" src={skigLogo} />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Complete Solar EPC Solutions for Homes, Commercial Buildings & Industrial Facilities.
            </p>
            <p className="text-primary-foreground/60 text-xs mt-3">
              Operating Across Pan India & UAE
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/locations" className="hover:text-accent transition-colors">Locations</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/services" className="hover:text-accent transition-colors">Solar EPC</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Commercial Solar</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Electrical Contracting</Link></li>
              <li><Link to="/ess" className="hover:text-accent transition-colors">Energy Storage (BESS)</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Maintenance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span><a href="tel:+919500092381" className="hover:text-accent transition-colors">+91 9500092381</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+971506053728" className="hover:text-accent transition-colors">+971 506053728</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent mt-0.5" />
                <div className="flex flex-col">
                  <a href="mailto:info@ski-g.com" className="hover:text-accent transition-colors">info@ski-g.com</a>
                  <a href="mailto:connect@ski-g.com" className="hover:text-accent transition-colors">connect@ski-g.com</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent" />
                <a href="https://wa.me/919500092381" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a>
              </li>
            </ul>

            {/* Social Links */}
            <h4 className="font-heading font-semibold mb-3 mt-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/skig_energies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/SKIGEnergies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/skig-energies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <span>© {new Date().getFullYear()} Ski-G Energies. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;