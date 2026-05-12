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
                <h3 className="font-heading font-semibold text-lg mb-4">Director</h3>
                <p className="font-semibold">Sankar Ganesh</p>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href="tel:+919952224998">+91 99522 24998</a>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:S.ganesh@ski-g.com">S.ganesh@ski-g.com</a>
                </div>
              </div>

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
                <p className="text-sm text-muted-foreground mt-1">4A3, Olympia Towers, Lattice Bridge Road, Adyar, Chennai – 600041</p>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span><a href="tel:+919791322632">+91 9791 322 632</a> | <a href="tel:+919952224998">+91 9952224998</a></span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:Solarprojects@ski-g.com">Solarprojects@ski-g.com</a>
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
                  <a href="tel:+971506053728">+971 5060 537 28</a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-card rounded-xl p-6 border border-border shadow-sm">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">General Enquiries</p>
                  <a href="mailto:m.imthiaz@ski-g.com" className="font-semibold text-sm">m.imthiaz@ski-g.com</a>
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