import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import skigLogo from "@/assets/skig-logo.png";

const navLinks = [
{ label: "Home", to: "/" },
{ label: "About", to: "/about" },
{ label: "Services", to: "/services" },
{ label: "Locations", to: "/locations" },
{ label: "Projects", to: "/projects" },
{ label: "Contact", to: "/contact" }];


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm border-b border-border py-[18px]">
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        <Link to="/" className="flex items-center gap-3">
           <img alt="ski-G Energies" className="h-20 w-auto object-fill" src={skigLogo} />
          <span className="font-heading font-semibold text-lg text-foreground hidden sm:inline sr-only">ski-G Energies</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-medium transition-colors hover:text-accent ${
            location.pathname === link.to ? "text-accent" : "text-muted-foreground"}`
            }>

              {link.label}
            </Link>
          )}
          <a href="https://wa.me/919791322632" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            WhatsApp
          </a>
          <Link to="/contact">
            <Button variant="solar" size="sm">Get Quote</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card border-b border-border overflow-hidden">

            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-2 transition-colors hover:text-accent ${
              location.pathname === link.to ? "text-accent" : "text-muted-foreground"}`
              }>

                  {link.label}
                </Link>
            )}
              <a href="https://wa.me/919791322632" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="text-sm font-medium py-2 text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button variant="solar" size="sm" className="w-full mt-2">Get Quote</Button>
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

};

export default Navbar;