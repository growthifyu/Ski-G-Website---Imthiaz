import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { ArrowRight, MapPin, Ruler, Zap, Shield, Paintbrush, ImageIcon } from "lucide-react";

type FilterType = "all" | "residential" | "commercial";
type LocationFilter = "all" | "chennai" | "dubai";

const projects = [
  {
    title: "Residential Rooftop Installation – Chennai",
    type: "residential" as const,
    size: "5 kW",
    location: "chennai" as const,
    locationLabel: "Chennai",
    property: "Independent House",
    description: "Designed for optimized rooftop utilization with structured mounting and clean wiring layout.",
  },
  {
    title: "Commercial Rooftop System – Chennai",
    type: "commercial" as const,
    size: "25 kW",
    location: "chennai" as const,
    locationLabel: "Chennai",
    property: "Commercial Building",
    description: "Load-based system design with professional installation and structured documentation.",
  },
  {
    title: "Residential Solar Installation – Dubai",
    type: "residential" as const,
    size: "8 kW",
    location: "dubai" as const,
    locationLabel: "Dubai",
    property: "Villa",
    description: "Engineered for high-temperature performance with secure mounting and compliant wiring.",
  },
  {
    title: "Commercial Solar Project – Dubai",
    type: "commercial" as const,
    size: "50 kW",
    location: "dubai" as const,
    locationLabel: "Dubai",
    property: "Warehouse Facility",
    description: "Large-scale installation with detailed load analysis and structured commissioning process.",
  },
  {
    title: "Residential Rooftop – Chennai",
    type: "residential" as const,
    size: "3 kW",
    location: "chennai" as const,
    locationLabel: "Chennai",
    property: "Apartment Terrace",
    description: "Compact system sized accurately for actual consumption with minimal structural impact.",
  },
  {
    title: "Industrial Solar Installation – Chennai",
    type: "commercial" as const,
    size: "100 kW",
    location: "chennai" as const,
    locationLabel: "Chennai",
    property: "Industrial Unit",
    description: "High-capacity system with peak load management and professional safety compliance.",
  },
];

const executionStandards = [
  {
    icon: Ruler,
    title: "Correct System Sizing",
    desc: "We design based on actual usage, not generic packages.",
  },
  {
    icon: Shield,
    title: "Structural Stability",
    desc: "Mounting systems are secured to ensure long-term mechanical safety.",
  },
  {
    icon: Zap,
    title: "Electrical Discipline",
    desc: "Wiring and integration follow structured and safe practices.",
  },
  {
    icon: Paintbrush,
    title: "Clean Finishing",
    desc: "We maintain respect for property aesthetics and professional finishing standards.",
  },
];

const Projects = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");

  const filtered = projects.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (locationFilter !== "all" && p.location !== locationFilter) return false;
    return true;
  });

  const filterBtn = (label: string, active: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-accent text-accent-foreground"
          : "bg-card border border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      {/* SECTION 1 — HERO */}
      <section className="bg-primary py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground max-w-3xl mx-auto">
            Execution Quality Is <span className="text-accent">Visible.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Every solar installation reflects structured planning, disciplined installation, and attention to detail.
          </p>
        </div>
      </section>

      {/* SECTION 2 — INTRODUCTION */}
      <Section className="bg-background">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHeading>Our Work</SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg leading-relaxed text-foreground mt-8">
              Each project completed by ski-G Energies follows a defined process — from system sizing and layout planning to structured installation and commissioning.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground mt-6">
              We believe solar installations should not only perform efficiently but also reflect mechanical stability, clean wiring, and responsible execution.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground mt-6">
              This page showcases representative installations across Chennai and Dubai.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* SECTION 6 — FILTERS + SECTION 3 — PROJECT GRID */}
      <Section className="bg-muted">
        <FadeIn>
          <SectionHeading>Project Portfolio</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="text-sm font-medium text-muted-foreground self-center mr-1">Type:</span>
            {filterBtn("All", typeFilter === "all", () => setTypeFilter("all"))}
            {filterBtn("Residential", typeFilter === "residential", () => setTypeFilter("residential"))}
            {filterBtn("Commercial", typeFilter === "commercial", () => setTypeFilter("commercial"))}
            <span className="text-sm font-medium text-muted-foreground self-center ml-4 mr-1">Location:</span>
            {filterBtn("All", locationFilter === "all", () => setLocationFilter("all"))}
            {filterBtn("Chennai", locationFilter === "chennai", () => setLocationFilter("chennai"))}
            {filterBtn("Dubai", locationFilter === "dubai", () => setLocationFilter("dubai"))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <div className="bg-card rounded-xl border border-border shadow-sm h-full flex flex-col overflow-hidden">
                <div className="bg-muted flex items-center justify-center h-44">
                  <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {project.type}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.locationLabel}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-3">{project.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <p>System Size: {project.size}</p>
                    <p>Property: {project.property}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
                    {project.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No projects match the selected filters.</p>
        )}
      </Section>

      {/* SECTION 4 — EXECUTION STANDARDS */}
      <Section className="bg-background">
        <FadeIn>
          <SectionHeading>What We Focus On in Every Project</SectionHeading>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-8 mt-12">
          {executionStandards.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SECTION 5 — BEFORE & AFTER */}
      <Section className="bg-muted">
        <FadeIn>
          <SectionHeading>Before & After Execution</SectionHeading>
          <SectionSubheading>
            Solar installations should improve performance without compromising structural safety or visual balance.
          </SectionSubheading>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <FadeIn delay={0.1}>
            <div className="bg-card rounded-xl border border-border h-56 flex flex-col items-center justify-center gap-3">
              <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
              <span className="text-sm text-muted-foreground">Before — Image Placeholder</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl border border-border h-56 flex flex-col items-center justify-center gap-3">
              <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
              <span className="text-sm text-muted-foreground">After — Image Placeholder</span>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* SECTION 7 — FINAL CTA */}
      <Section className="bg-primary">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground">
              Planning a Solar <span className="text-accent">Installation?</span>
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

export default Projects;
