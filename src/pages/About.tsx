import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { ArrowRight, MapPin, Shield, Wrench, HeartHandshake, Target, Eye } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import LeadershipSection from "@/components/about/LeadershipSection";

const About = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="ski-G Energies team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground max-w-3xl mx-auto">
            Built to Deliver Solar <span className="text-accent">the Right Way.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            ski-G Energies focuses on structured solar execution — proper system design, clean installation, and long-term accountability for homes and businesses across India and UAE.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <Section className="bg-background">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <FadeIn>
              <SectionHeading className="text-left">Who We Are</SectionHeading>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg leading-relaxed text-foreground mt-8">
                ski-G Energies Pvt. Ltd. is headquartered in Chennai and operates across Pan India and UAE, delivering reliable, sustainable and cost-effective energy solutions.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                We approach every project with an execution-first mindset. Before installation begins, we evaluate real energy usage, site conditions, and long-term performance expectations.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                Our focus is not on aggressive promises. It is on clarity, engineering discipline, and responsible execution.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={commercialImg} alt="Solar installation" className="w-full h-80 object-cover" />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* LEADERSHIP */}
      <LeadershipSection />

      {/* BRIEF HISTORY */}
      <Section className="bg-background">
        <FadeIn>
          <SectionHeading>Our Journey</SectionHeading>
          <SectionSubheading>Key milestones that shaped ski-G Energies.</SectionSubheading>
        </FadeIn>
        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          {[
            { year: "1992", title: "Ganesh Battery Company Founded", desc: "The foundation was laid with Ganesh Battery Company, marking the beginning of decades of energy sector expertise." },
            { year: "2015", title: "Ganesh Energies Formed", desc: "Ganesh Energies was established to enter the renewable energy sector, setting the stage for solar-focused operations." },
            { year: "2020", title: "UAE Operations Launched", desc: "Expanded operations to Dubai, UAE, bringing structured solar execution to the Middle East market." },
            { year: "2022", title: "Commercial Portfolio Growth", desc: "Crossed significant milestones in commercial and industrial solar installations across Pan India." },
            { year: "2025", title: "ski-G Energies Pvt. Ltd. Incorporated", desc: "ski-G Energies Pvt. Ltd. was incorporated in Chennai and Dubai, formalising operations across India and the UAE." },
            { year: "Future", title: "Continued Expansion", desc: "Expanding into other international cities and evolving as a manufacturer in the renewable energy sector." },
          ].map((item, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className={`relative flex items-start gap-6 mb-10 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}>
                <div className={`absolute top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background ${i % 2 === 0 ? "left-[13px] md:left-auto md:-right-[7px]" : "left-[13px] md:-left-[7px]"}`} />
                <div className="ml-10 md:ml-0">
                  <span className="text-sm font-heading font-bold text-accent">{item.year}</span>
                  <h3 className="font-heading font-semibold text-xl mt-1">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* MISSION & VISION */}
      <Section className="bg-background">
        <div className="grid md:grid-cols-2 gap-10">
          <FadeIn>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To provide sustainable and efficient energy solutions that empower businesses and communities.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be a trusted leader in clean energy and power solutions across India and UAE.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* OUR APPROACH */}
      <Section className="bg-muted">
        <FadeIn>
          <SectionHeading>Our Approach to Solar Projects</SectionHeading>
          <SectionSubheading>Clarity. Structure. Accountability.</SectionSubheading>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <FadeIn delay={0.1}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Engineering Before Installation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every project begins with site analysis and proper system sizing. Incorrect sizing reduces return on investment. We prioritise technical accuracy before execution.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Wrench className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Clean and Safe Installation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Solar systems must be mechanically secure and electrically compliant. We ensure proper mounting, structured wiring, and tested commissioning.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Long-Term Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Solar systems operate for years. We remain available for guidance, performance clarity, and structured post-install support.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* WHY SKI-G */}
      <Section className="bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHeading>Why Clients Choose ski-G Energies</SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg leading-relaxed text-foreground mt-8">
              Clients choose ski-G Energies because they value disciplined execution over marketing noise.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground mt-6">Our work reflects:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground text-lg">
              {["Transparent communication", "Clear scope definition", "Structured installation practices", "Respect for property and safety", "Professional coordination"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">●</span> {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* LOCATIONS */}
      <Section className="bg-muted">
        <FadeIn>
          <SectionHeading>Two Locations. <span className="text-accent">Same Standards.</span></SectionHeading>
          <SectionSubheading>
            We operate in Chennai and Dubai, serving residential and commercial clients who expect professional execution.
          </SectionSubheading>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm flex items-center gap-4">
              <MapPin className="w-8 h-8 text-accent shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-xl">Chennai</h3>
                <p className="text-muted-foreground text-sm mt-1">Tamil Nadu, India</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm flex items-center gap-4">
              <MapPin className="w-8 h-8 text-accent shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-xl">Dubai</h3>
                <p className="text-muted-foreground text-sm mt-1">United Arab Emirates</p>
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
              Looking for a Structured Solar <span className="text-accent">Partner?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link to="/contact">
                <Button variant="solar" size="lg">
                  Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-secondary" size="lg">
                  Request a Site Visit
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
};

export default About;
