import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, Check, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";

const principles = [
  "Proper system sizing",
  "Structural safety",
  "Clean electrical integration",
  "Transparent communication",
  "Professional accountability",
];

const Locations = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Solar infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground max-w-3xl mx-auto">
            Serving Chennai and Dubai with the <span className="text-accent">Same Standards.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Structured solar execution for residential and commercial clients — Pan India &amp; UAE.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <Section className="bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHeading>Our Presence</SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg leading-relaxed text-foreground mt-8">
              ski-G Energies operates in Chennai and Dubai, delivering professionally engineered solar installations for homes and businesses.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground mt-6">
              While each market has its own regulatory and structural considerations, our execution standards remain consistent — clarity in planning, discipline in installation, and accountability after commissioning.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* CHENNAI */}
      <Section className="bg-muted">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-7 h-7 text-accent" />
            <SectionHeading className="text-left">Chennai, India</SectionHeading>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <FadeIn delay={0.1}>
            <div>
              <p className="text-lg leading-relaxed text-foreground">
                Our Chennai operations focus on residential rooftop solar and commercial installations across the city and surrounding regions.
              </p>
              <h4 className="font-heading font-semibold mt-6 mb-4">We provide:</h4>
              <ul className="space-y-3">
                {["Site survey and feasibility evaluation", "System design and sizing", "Structured installation", "Testing and commissioning", "Post-install guidance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h4 className="font-heading font-semibold mb-5">Contact Details</h4>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span><a href="tel:+919500092381" className="hover:text-accent transition-colors">+91 9500092381</a></span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="mailto:info@ski-g.com" className="hover:text-accent transition-colors">info@ski-g.com</a>
                    <a href="mailto:connect@ski-g.com" className="hover:text-accent transition-colors">connect@ski-g.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Solar Knowledge Industries Group Private Ltd.</p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider">Registered Office</p>
                      <p className="mt-0.5">4A3, Olympia Towers, Lattice Bridge Road, Adyar, Chennai – 600041</p>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider">Branch Office</p>
                      <p className="mt-0.5">SKI-G Energies, 2nd Floor, The Palms, 2/675, Balaji Nagar 1st St, Neelankarai, Chennai – 600115, Tamil Nadu.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="inline-block mt-6">
                <Button variant="solar">Schedule Chennai Site Visit <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* DUBAI */}
      <Section className="bg-background">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-7 h-7 text-accent" />
            <SectionHeading className="text-left">Dubai, United Arab Emirates</SectionHeading>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <FadeIn delay={0.1}>
            <div>
              <p className="text-lg leading-relaxed text-foreground">
                Our Dubai operations provide consultation and structured solar project execution aligned with UAE requirements and standards.
              </p>
              <h4 className="font-heading font-semibold mt-6 mb-4">We focus on:</h4>
              <ul className="space-y-3">
                {["System planning and feasibility", "Engineering alignment", "Installation coordination", "Commissioning guidance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h4 className="font-heading font-semibold mb-5">Contact Details</h4>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a href="tel:+971506053728" className="hover:text-accent transition-colors">+971 506053728</a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="mailto:info@ski-g.com" className="hover:text-accent transition-colors">info@ski-g.com</a>
                    <a href="mailto:connect@ski-g.com" className="hover:text-accent transition-colors">connect@ski-g.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">SkiG Energies LLC FZ</p>
                    <p>Meydan Grandstand, 6th Floor</p>
                    <p>Meydan Road, Nad Al Sheba</p>
                    <p>PO 17965</p>
                    <p>Dubai, UAE</p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="inline-block mt-6">
                <Button variant="solar">Request Dubai Consultation <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* OPERATING PRINCIPLES */}
      <Section className="bg-muted">
        <FadeIn>
          <SectionHeading>One Brand. <span className="text-accent">One Standard.</span></SectionHeading>
          <SectionSubheading>
            Regardless of location, ski-G Energies operates under the same execution principles:
          </SectionSubheading>
        </FadeIn>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {principles.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex items-center gap-4">
                <Check className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <p className="text-lg text-muted-foreground mt-10 max-w-2xl mx-auto">
            We do not differentiate standards by geography. Our commitment to disciplined execution remains the same.
          </p>
        </FadeIn>
      </Section>

      {/* MAP PLACEHOLDERS */}
      <Section className="bg-background">
        <FadeIn>
          <SectionHeading>Office Locations</SectionHeading>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <FadeIn delay={0.1}>
            <div className="rounded-xl overflow-hidden border border-border relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.747!2d80.2569!3d13.0067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677e88aaaa01%3A0x6e0a5e5e5e5e5e5e!2sOlympia%20Technology%20Park%2C%20Lattice%20Bridge%20Rd%2C%20Adyar%2C%20Chennai%2C%20Tamil%20Nadu%20600041!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chennai Office Location"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center pointer-events-none">
                <MapPin className="w-14 h-14 text-red-500 mb-2" />
                <span className="text-2xl font-heading font-bold text-white">Chennai</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden border border-border relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178!2d55.2962!3d25.1632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d0c5a1b8a1%3A0x3e5f69d0c5a1b8a1!2sMeydan%20Grandstand%2C%20Meydan%20Rd%2C%20Nad%20Al%20Sheba%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dubai Office Location"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center pointer-events-none">
                <MapPin className="w-14 h-14 text-red-500 mb-2" />
                <span className="text-2xl font-heading font-bold text-white">Dubai</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-primary">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground">
              Need Solar Support in Chennai or <span className="text-accent">Dubai?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link to="/contact">
                <Button variant="solar" size="lg">
                  Get a Quote <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-secondary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
};

export default Locations;
