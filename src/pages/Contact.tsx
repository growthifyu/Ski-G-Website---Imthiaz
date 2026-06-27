import { Button } from "@/components/ui/button";
import { Section, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { Send, Loader2, MapPin, Phone, Mail, Factory } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";

const Contact = () => {
  return (
    <Layout>
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Solar infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mx-auto">
            Get a clear solar <span className="text-accent">recommendation.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Fill the form below and we'll respond with the next step.
          </p>
        </div>
      </section>

      <Section className="bg-background">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <FadeIn>
            <div style={{ width: "100%", height: "625px", overflow: "hidden", display: "flex", justifyContent: "center" }}>
              <iframe
                frameBorder="0"
                style={{ height: "500px", width: "80%", border: "none", transform: "scale(1.25)", transformOrigin: "top center" }}
                src="https://zcform.in/gcHti"
                title="Contact Form"
              ></iframe>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-6">


              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Factory className="w-5 h-5 text-accent" />
                  <h3 className="font-heading font-semibold text-lg">Factory</h3>
                </div>
                <p className="font-semibold">Ganesh Energies</p>
                <p className="text-muted-foreground text-sm mt-1">144 Krishnagiri Trunk Road, Ranipet – 632401</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-heading font-semibold text-lg">Chennai</h3>
                </div>
                <p className="font-semibold text-sm">Solar Knowledge Industries Group Private Ltd.</p>
                
                <div className="mt-3">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Registered Office</p>
                  <p className="text-sm text-muted-foreground mt-0.5">4A3, Olympia Towers, Lattice Bridge Road, Adyar, Chennai – 600041</p>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Branch Office</p>
                  <p className="text-sm text-muted-foreground mt-0.5">SKI-G Energies, 2nd Floor, The Palms, 2/675, Balaji Nagar 1st St, Neelankarai, Chennai – 600115, Tamil Nadu.</p>
                </div>

                <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span><a href="tel:+919500092381">+91 9500092381</a></span>
                </div>
                <div className="flex items-start gap-2 mt-2 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-accent mt-0.5" />
                  <div className="flex flex-col">
                    <a href="mailto:info@ski-g.com" className="hover:text-accent transition-colors">info@ski-g.com</a>
                    <a href="mailto:connect@ski-g.com" className="hover:text-accent transition-colors">connect@ski-g.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-heading font-semibold text-lg">Dubai</h3>
                </div>
                <p className="font-semibold text-sm">SkiG Energies LLC FZ</p>
                <p className="text-sm text-muted-foreground mt-1">Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba | PO 17965 | Dubai, UAE</p>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href="tel:+971506053728">+971 506053728</a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-card rounded-xl p-6 border border-border shadow-sm">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">General Enquiries</p>
                  <div className="flex flex-col">
                    <a href="mailto:info@ski-g.com" className="font-semibold text-sm hover:text-accent transition-colors">info@ski-g.com</a>
                    <a href="mailto:connect@ski-g.com" className="font-semibold text-sm hover:text-accent transition-colors">connect@ski-g.com</a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;