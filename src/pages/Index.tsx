import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { Check, AlertTriangle, ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";
import residentialImg from "@/assets/residential-solar.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import maintenanceImg from "@/assets/maintenance-solar.jpg";
import storageImg from "@/assets/lithium-battery.png";

import heroVideo from "@/assets/hero-solar-video.mp4";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const authorityBullets = [
  "End-to-End Design, Supply & Installation",
  "Solar, storage, and battery solutions with clear project execution",
  "Government Subsidy Assistance",
  "24-Hour Service Response",
  "Backed by Industry Experience Since 1992",
];

const failReasons = [
  { title: "Wrong system sizing", desc: "Too small and savings are limited. Too big and ROI drops." },
  { title: "Poor installation quality", desc: "Loose wiring, weak structures, improper finishing." },
  { title: "No after-installation support", desc: "When performance drops, nobody responds." },
];

const services = [
  {
    title: "Residential Rooftop Solar",
    desc: "Reduce your monthly electricity bill with a system designed specifically for your usage and roof structure.",
    items: ["Site survey & feasibility", "System sizing & proposal", "Installation & wiring", "Testing & commissioning", "Handover & guidance"],
    cta: "Get Residential Quote",
    image: residentialImg,
  },
  {
    title: "Commercial & Industrial Solar",
    desc: "Lower operational costs with engineered solar systems built for higher loads and long-term performance.",
    items: ["Load analysis", "Custom engineering design", "Safe and compliant installation", "Structured commissioning", "Performance guidance"],
    cta: "Schedule Site Visit",
    image: commercialImg,
  },
  {
    title: "Lithium-Ion Batteries & Storage",
    desc: "Battery solutions for solar storage, backup power, and industrial energy applications.",
    items: ["Custom battery sizing", "Solar storage integration", "Industrial backup power", "Reliable performance"],
    cta: "Explore Storage Options",
    image: storageImg,
    to: "/ess",
  },
];

const executionBullets = [
  "Detailed Site Survey & Load Analysis",
  "Custom System Design & Transparent Proposal",
  "Tier-1 Components & Certified Installation Teams",
  "Solar, storage, and battery solutions with clear project execution",
  "Complete Government Subsidy Assistance",
  "24-Hour Service Response Time",
];

const faqs = [
  {
    q: "How do I know what system size I need?",
    a: (
      <div className="space-y-3">
        <p>
          System size depends on two things: your average monthly electricity consumption in units/kWh and your available rooftop space. As a rough guide, a typical Indian household consuming 300-500 units/month needs a 3-5 kW system, which requires about 200-350 sq. ft. of shadow-free roof space.
        </p>
        <p>
          We don't guess. Our team conducts a proper site survey and load analysis before recommending anything. Share your electricity bill and location, and we'll give you a clear, no-obligation sizing recommendation.
        </p>
      </div>
    ),
  },
  {
    q: "How long does installation take?",
    a: (
      <div className="space-y-3">
        <p>
          For residential projects, we complete installation in 10-15 working days from the date of order confirmation. This includes delivery of components, structural mounting, wiring, and commissioning.
        </p>
        <p>
          Commercial and industrial projects vary based on system size and site complexity. We'll give you a specific timeline in your proposal.
        </p>
      </div>
    ),
  },
  {
    q: "What savings can I expect?",
    a: (
      <div className="space-y-3">
        <p>
          Most residential customers see a 70-90% reduction in their electricity bill within the first month. A typical 5 kW system in Chennai can generate 550-600 units/month, offsetting most or all of a standard household's consumption.
        </p>
        <p>
          ROI (return on investment) typically ranges from 4-6 years, after which the system generates essentially free electricity for the remaining 20+ years of its life. Exact savings depend on your tariff rate, consumption pattern, and system size. We'll show you the numbers in your proposal.
        </p>
      </div>
    ),
  },
  {
    q: "Do you help with documentation or approvals?",
    a: (
      <div className="space-y-3">
        <p>
          Yes, completely. We handle all paperwork including DISCOM electricity board approvals, net metering applications, and single-line diagram submissions. In India, we also assist with the PM Surya Ghar subsidy application, which can cover up to ₹78,000 for eligible residential systems.
        </p>
        <p>
          For UAE projects, we coordinate with relevant local authorities and ensure compliance with DEWA or emirate-specific requirements.
        </p>
      </div>
    ),
  },
  {
    q: "What maintenance is required?",
    a: (
      <div className="space-y-3">
        <p>
          Solar systems are largely low-maintenance. The main requirement is periodic panel cleaning every 1-3 months depending on dust levels to maintain output efficiency. We recommend an annual performance inspection to check wiring integrity, inverter health, and structural fastening.
        </p>
        <p>
          Our O&M service covers all of this: inspections, cleaning guidance, performance monitoring, and issue resolution, so your system keeps performing at its best long-term.
        </p>
      </div>
    ),
  },
  {
    q: "Do you assist with government subsidy process?",
    a: (
      <div className="space-y-3">
        <p>
          Yes. For residential customers in India, we provide end-to-end assistance with the PM Surya Ghar Muft Bijli Yojana subsidy, which offers:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>₹30,000 for 1 kW systems</li>
          <li>₹60,000 for 2 kW systems</li>
          <li>₹78,000 for 3 kW and above</li>
        </ul>
        <p>
          We handle the application, documentation, and follow-up so you don't have to navigate it alone.
        </p>
      </div>
    ),
  },
  {
    q: "What is your service response time?",
    a: (
      <div className="space-y-3">
        <p>
          We guarantee a 24-hour response to any service or support request. For O&M customers on a maintenance plan, issues are prioritised and escalated to our technical team immediately.
        </p>
        <p>
          You can also reach us directly on WhatsApp for the fastest response. Most queries are answered within a few hours.
        </p>
      </div>
    ),
  },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Solar panels on rooftop" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                Solar Solutions | Lithium-Ion Battery Manufacturing
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-primary-foreground leading-tight">
                Power Your Property with{" "}
                <span className="text-accent">Smart Solar.</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
                End-to-end solar solutions for homes, businesses, industries, and large-scale projects.
              </p>
              <ul className="mt-6 space-y-2">
                {authorityBullets.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact">
                  <Button variant="hero" size="lg">Get a Free Feasibility Check</Button>
                </Link>
                <a href="https://wa.me/919500092381" target="_blank" rel="noopener noreferrer">
                  <Button variant="hero-secondary" size="lg">
                    <MessageCircle className="w-5 h-5 mr-1" /> WhatsApp Us
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/60">
                Share your location and monthly electricity bill range — we'll guide you clearly and transparently.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden md:block"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-primary-foreground/10">
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPANY INTRO */}
      <Section className="bg-background">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn>
              <div>
                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-foreground leading-tight">
                  Built for Reliable, Professional Solar Execution
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-foreground">
                  SKI-G Energies delivers complete solar energy solutions from site assessment and system design to supply, installation, testing, and commissioning.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We work across residential, commercial, industrial, and energy storage requirements, with lithium-ion battery manufacturing for reliable backup and solar storage applications.
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  {["Pan India & UAE", "Since 1992", "Engineering-Led"].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground bg-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* WHY MOST SOLAR PROJECTS FAIL */}
      <Section className="bg-muted">
        <div className="max-w-[1140px] mx-auto">
          <SectionHeading>Solar is simple. Bad execution makes it expensive.</SectionHeading>
          <SectionSubheading>Most solar installations underperform because of three reasons:</SectionSubheading>
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {failReasons.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl border border-border p-7 h-full shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg leading-snug">{r.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-14 relative overflow-hidden rounded-xl max-w-[960px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-accent/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--accent)/0.15),transparent_60%)]" />
              <div className="relative px-8 py-9 md:px-12 md:py-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <p className="text-primary-foreground font-heading font-semibold text-2xl md:text-3xl leading-tight">
                    ski-G Energies was built to fix exactly this.
                  </p>
                  <p className="text-primary-foreground/70 mt-2 text-lg">
                    We size correctly. We install cleanly. We stay available.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link to="/contact">
                    <Button variant="hero" size="lg">Start with a Call <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* SERVICES — TEXT LEFT / IMAGE RIGHT */}
      <Section className="bg-background">
        <SectionHeading>Solar solutions built around your actual requirement.</SectionHeading>
        <div className="space-y-16 mt-12">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="font-heading font-semibold text-2xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground mb-5">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={s.to || "/contact"}>
                    <Button variant="solar">{s.cta} <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  </Link>
                </div>
                <div className={`rounded-xl overflow-hidden shadow-lg ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-72 object-cover" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CLEAR PROCESS */}
      <Section className="bg-background">
        <SectionHeading>Clear process. No surprises.</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            { step: "01", title: "Initial Discussion", desc: "We understand your usage, location, and expectations." },
            { step: "02", title: "Site Survey", desc: "We assess your roof structure, space, and electrical setup." },
            { step: "03", title: "Proposal + Savings & Storage Estimate", desc: "Recommended solar capacity, expected generation, storage need if required, budget, and timeline." },
            { step: "04", title: "Installation", desc: "Structured, clean installation with safety checks." },
            { step: "05", title: "Testing & Commissioning", desc: "System is activated and performance verified." },
            { step: "06", title: "Support & Guidance", desc: "We guide you on monitoring and maintenance." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <span className="text-3xl font-heading font-bold text-accent/30">{item.step}</span>
                <h3 className="font-heading font-semibold text-lg mt-3">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div className="mt-10 text-center">
            <Link to="/contact">
              <Button variant="solar" size="lg">Start with a Call <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* EXECUTION QUALITY */}
      <Section className="bg-muted">
        <SectionHeading className="text-center">Execution Quality Is Visible.</SectionHeading>
        <SectionSubheading className="mx-auto text-center">Every installation reflects our standards in wiring, structure, finishing, and safety.</SectionSubheading>
        <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-3xl mx-auto">
          {executionBullets.map((bullet, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex items-center gap-3 bg-card rounded-lg p-5 border border-border h-full min-h-[72px]">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="mt-10 text-center">
            <Link to="/projects">
              <Button variant="solar-outline" size="lg">
                View Our Projects <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* LOCATIONS */}
      <Section className="bg-background">
        <SectionHeading>Two locations. Same execution standards.</SectionHeading>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            {
              city: "Chennai",
              desc: "Residential and commercial rooftop solar installations with local execution support.",
              addresses: [
                { label: "Registered Office", val: "4A3, Olympia Towers, Lattice Bridge Road, Adyar, Chennai – 600041" },
                { label: "Branch Office", val: "SKI-G Energies, 2nd Floor, The Palms, 2/675, Balaji Nagar 1st St, Neelankarai, Chennai – 600115, Tamil Nadu." }
              ],
              phone: "+91 9500092381",
              phoneHref: "tel:+919500092381",
              emails: ["info@ski-g.com", "connect@ski-g.com"],
            },
            {
              city: "Dubai",
              desc: "Consultation and project execution aligned with UAE requirements.",
              addresses: [
                { label: "Office Address", val: "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, PO 17965, Dubai, UAE" }
              ],
              phone: "+971 506053728",
              phoneHref: "tel:+971506053728",
              emails: ["info@ski-g.com", "connect@ski-g.com"],
            },
          ].map((loc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-8 border border-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h3 className="font-heading font-semibold text-2xl">{loc.city}</h3>
                </div>
                <p className="text-muted-foreground">{loc.desc}</p>
                <div className="flex flex-col gap-3 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <a href={loc.phoneHref} className="hover:text-accent transition-colors">{loc.phone}</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-accent mt-0.5" />
                    <div className="flex flex-col">
                      {loc.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
                      ))}
                    </div>
                  </div>
                  {loc.addresses.map((addr) => (
                    <div key={addr.val} className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        {loc.addresses.length > 1 && (
                          <span className="text-xs font-semibold text-accent uppercase tracking-wider block">{addr.label}</span>
                        )}
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(addr.val)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {addr.val}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="inline-block mt-5">
                  <Button variant="solar-outline">Contact Your Location</Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-muted">
        <SectionHeading className="text-center">Frequently Asked Questions</SectionHeading>
        <div className="max-w-2xl mx-auto mt-10">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-heading font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <FadeIn delay={0.2}>
          <div className="text-center mt-8">
            <a href="https://wa.me/919500092381" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="solar-outline">
                <MessageCircle className="w-4 h-4 mr-1" /> Ask a Question on WhatsApp
              </Button>
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-primary-foreground"
          >
            Structured Solar & Battery Solutions for Modern Energy Needs.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-primary-foreground/70 text-lg max-w-xl mx-auto"
          >
            Tell us your location and electricity bill range. We'll tell you what makes sense.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link to="/contact">
              <Button variant="hero" size="lg" className="whitespace-normal h-auto py-3">Get a Free Solar Feasibility Check + Storage Estimate</Button>
            </Link>
            <a href="https://wa.me/919500092381" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-secondary" size="lg">
                <MessageCircle className="w-5 h-5 mr-1" /> WhatsApp Us
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
