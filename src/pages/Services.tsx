import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { Check, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";
import residentialImg from "@/assets/residential-solar.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import electricalImg from "@/assets/electrical-work.jpg";
import dgImg from "@/assets/dg-backup.png";
import bessImg from "@/assets/bess-storage.jpg";
import maintenanceImg from "@/assets/maintenance-solar.jpg";
import monitoringImg from "@/assets/monitoring-solar.jpg";
import projectsImg from "@/assets/projects-solar.jpg";

const serviceBlocks = [
  {
    title: "Solar EPC (Design, Supply, Installation & Commissioning)",
    desc: "End-to-end solar project execution from initial feasibility through commissioning. We handle system design, component supply, structured installation, and final handover — all under one roof.",
    items: ["Site survey & feasibility assessment", "Custom system design", "Component procurement (Tier-1 panels & inverters)", "Professional installation", "Testing, commissioning & handover"],
    cta: "Get a Solar EPC Quote",
    image: residentialImg,
  },
  {
    title: "Commercial & Industrial Solar Power Plants",
    desc: "Engineered solar power solutions for commercial buildings, factories, and industrial facilities. Our systems are designed around load profiles, peak demand, and long-term ROI.",
    items: ["Load analysis & peak demand study", "Custom plant design & engineering", "Rooftop or ground-mounted installation", "Grid integration & net metering assistance", "Performance monitoring setup"],
    cta: "Request Commercial Proposal",
    image: commercialImg,
  },
  {
    title: "Electrical Contracting & Infrastructure Works",
    desc: "Professional electrical contracting for residential, commercial, and industrial projects. From internal wiring to HT/LT panel installations, we deliver safe and compliant electrical infrastructure.",
    items: ["Internal & external electrical wiring", "HT/LT panel installation", "Cable laying & termination", "Earthing & lightning protection", "Electrical safety compliance"],
    cta: "Enquire About Electrical Works",
    image: electricalImg,
  },
  {
    title: "DG / Power Backup Solutions",
    desc: "Reliable diesel generator sets and power backup systems for uninterrupted operations. We design, supply, install, and maintain DG solutions for commercial and industrial clients.",
    items: ["DG set sizing & selection", "Installation & commissioning", "AMF/ATS panel integration", "Fuel system setup", "Preventive maintenance contracts"],
    cta: "Get DG Backup Quote",
    image: dgImg,
  },
  {
    title: "Battery Energy Storage Systems (BESS)",
    desc: "Advanced battery storage solutions to optimize energy usage, reduce peak demand charges, and ensure power availability during outages.",
    items: ["Energy audit & storage sizing", "Lithium-ion / LFP battery solutions", "Hybrid solar + storage integration", "Peak shaving & load management", "Remote monitoring & BMS"],
    cta: "Explore BESS Solutions",
    image: bessImg,
  },
  {
    title: "Energy Optimization & Maintenance Services",
    desc: "Periodic maintenance and energy optimization services to keep your solar and electrical systems performing at peak efficiency.",
    items: ["Performance inspection & reporting", "Panel cleaning & thermal imaging", "Inverter & wiring health checks", "Preventive maintenance schedules", "Issue resolution & support"],
    cta: "Enquire About Maintenance",
    image: maintenanceImg,
  },
  {
    title: "Real-Time Monitoring Systems",
    desc: "Cloud-based monitoring dashboards for real-time visibility into your solar system's performance. Track generation, consumption, and savings from anywhere.",
    items: ["IoT-based data acquisition", "Cloud dashboard setup", "Performance alerts & notifications", "Monthly generation reports", "Remote diagnostics"],
    cta: "Learn About Monitoring",
    image: monitoringImg,
  },
  {
    title: "Solar Insurance & Subsidy Support",
    desc: "End-to-end assistance with government subsidy applications and solar insurance to protect your investment and maximize financial returns.",
    items: ["Subsidy eligibility assessment", "Documentation & application filing", "Liaison with government agencies", "Solar panel insurance advisory", "Post-approval tracking"],
    cta: "Get Subsidy Assistance",
    image: projectsImg,
  },
];

const Services = () => {
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
            Solar Solutions Built Around <span className="text-accent">Real Usage.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Residential and commercial solar systems designed, installed, and supported with structured execution standards across India and UAE.
          </p>
        </div>
      </section>

      {/* SERVICE BLOCKS */}
      {serviceBlocks.map((s, i) => (
        <Section key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted"}>
          <FadeIn>
            <div className={`grid md:grid-cols-2 gap-10 items-center`}>
              <div className={`text-left ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight">{s.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground mt-6">{s.desc}</p>
                <div className="mt-6">
                  <h4 className="font-heading font-semibold mb-4">Scope Includes:</h4>
                  <ul className="space-y-3">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="inline-block mt-5">
                    <Button variant="solar">{s.cta} <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  </Link>
                </div>
              </div>
              <div className={`rounded-xl overflow-hidden shadow-lg ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <img src={s.image} alt={s.title} className="w-full h-full min-h-[320px] max-h-[420px] object-cover" />
              </div>
            </div>
          </FadeIn>
        </Section>
      ))}

      {/* FINAL CTA */}
      <Section className="bg-primary">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground">
              Need a Clear Solar <span className="text-accent">Recommendation?</span>
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
                  Schedule Site Visit
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
};

export default Services;
