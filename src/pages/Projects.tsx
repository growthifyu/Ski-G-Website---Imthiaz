import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { ArrowRight, MapPin, Ruler, Zap, Shield, Paintbrush, ImageIcon } from "lucide-react";

type FilterType = "all" | "residential" | "commercial";
type LocationFilter = "all" | "chennai" | "dubai";

const projects: any[] = [];

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

// --- GOOGLE SHEETS DYNAMIC SETUP (NON-CODER FRIENDLY) ---
// We read your spreadsheet directly from Google Drive (CSV format)
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/1vXmTo9CAZVOUCIMfq2sslbvfNKSY5btSOjM9rTrmZeA/export?format=csv"; 

const parseCSV = (csvText: string) => {
  const result: string[][] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      row.push(current.trim());
      result.push(row);
      row = [];
      current = '';
    } else {
      current += char;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    result.push(row);
  }

  if (result.length < 2) return [];

  // Extract and normalize spreadsheet headers to lowercase
  const headers = result[0].map(h => h.toLowerCase().trim());
  const parsed: any[] = [];

  for (let i = 1; i < result.length; i++) {
    const values = result[i];
    if (values.length === 0 || (values.length === 1 && !values[0])) continue;

    const rawItem: any = {};
    headers.forEach((header, index) => {
      let val = values[index] || "";
      val = val.replace(/^"|"$/g, '').trim();
      rawItem[header] = val;
    });

    // Map spreadsheet columns to visual projects shape
    const item: any = {};

    // 1. Title -> 'Project Name'
    item.title = rawItem["project name"] || rawItem["title"] || "";

    // 2. Type -> 'Project Type' (Industrial/Commercial mapped to 'commercial', others to 'residential')
    const rawType = (rawItem["project type"] || "").toLowerCase();
    if (rawType.includes("residential") || rawType.includes("home")) {
      item.type = "residential";
    } else {
      item.type = "commercial";
    }

    // 3. Size -> 'System Capacity (kW/MW)'
    item.size = rawItem["system capacity (kw/mw)"] || rawItem["size"] || "";

    // 4. Location -> 'Location'
    const rawLoc = (rawItem["location"] || "").toLowerCase();
    if (rawLoc.includes("dubai") || rawLoc.includes("uae")) {
      item.location = "dubai";
    } else {
      item.location = "chennai";
    }
    item.locationLabel = item.location === 'dubai' ? 'Dubai' : 'Chennai';

    // 5. Property -> 'Installation Type' (plus company name if available)
    const installType = rawItem["installation type"] || rawItem["property"] || "";
    const clientName = rawItem["client / company name"] || "";
    item.property = clientName ? `${installType} (Client: ${clientName})` : installType;

    // 6. Description -> Combine 'Key Project Highlights' & 'Scope of Work by SKI-G'
    const highlights = rawItem["key project highlights"] || "";
    const scope = rawItem["scope of work by ski-g"] || "";
    const descParts = [];
    if (highlights) descParts.push(highlights);
    if (scope) descParts.push(`Scope: ${scope}`);
    item.description = descParts.join(". ") || rawItem["description"] || "";

    // 7. Image -> Gather from multiple columns: 'google drive photo link 1', 'google drive photo link', and 'picture link 2' to 'picture link 5'
    const imageList: string[] = [];
    const possibleImageKeys = [
      "google drive photo link 1",
      "google drive photo link",
      "picture link 2",
      "picture link 3",
      "picture link 4",
      "picture link 5",
      "image"
    ];

    possibleImageKeys.forEach(key => {
      const val = rawItem[key];
      if (val) {
        val.split(',').forEach((link: string) => {
          const trimmed = link.trim();
          if (trimmed) {
            imageList.push(trimmed);
          }
        });
      }
    });
    item.images = imageList;

    if (item.title) {
      parsed.push(item);
    }
  }
  return parsed;
};

// Converts standard Google Drive sharing links to direct raw image URLs
const getImageUrl = (link: string) => {
  if (!link) return "";
  let url = link.replace(/^"|"$/g, '').trim();
  
  if (url.includes("drive.google.com")) {
    let fileId = "";
    const dMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    } else {
      const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }
    
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  return url;
};

// Component to handle image load state and error fallbacks cleanly (supports auto-swipe slideshow)
const ProjectCardImage = ({ srcList, alt }: { srcList: string[]; alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);

  // Filter out empty or broken links and normalize them
  const validUrls = (srcList || [])
    .map(src => getImageUrl(src))
    .filter(url => typeof url === "string" && url.trim() !== "")
    .filter(url => !errors[url]);

  // Handle active index out of bounds (e.g. if URLs fail and the array shrinks)
  const activeIndex = currentIndex >= validUrls.length ? 0 : currentIndex;

  // Set up auto-swipe interval (4 seconds) if there are multiple images, pausing on hover
  useEffect(() => {
    if (validUrls.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= validUrls.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [validUrls.length, isHovered]);

  if (validUrls.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted">
        <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
      </div>
    );
  }

  const currentUrl = validUrls[activeIndex];

  return (
    <div 
      className="relative w-full h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={currentUrl} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => {
          if (currentUrl) {
            setErrors(prev => ({ ...prev, [currentUrl]: true }));
          }
        }}
      />
      
      {validUrls.length > 1 && (
        <>
          {/* Left Arrow button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(prev => (prev === 0 ? validUrls.length - 1 : prev - 1));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 text-xs font-bold z-10"
            aria-label="Previous image"
          >
            &lt;
          </button>
          
          {/* Right Arrow button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(prev => (prev >= validUrls.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 text-xs font-bold z-10"
            aria-label="Next image"
          >
            &gt;
          </button>
          
          {/* Slides dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {validUrls.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  idx === activeIndex ? "bg-accent scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Projects = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [projectsList, setProjectsList] = useState(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!GOOGLE_SHEETS_CSV_URL) {
      setLoading(false);
      return;
    }

    const fetchSheetData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        const text = await response.text();
        const parsed = parseCSV(text);
        if (parsed.length > 0) {
          setProjectsList(parsed);
        }
      } catch (err) {
        console.error("Error fetching project sheet data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  const filtered = projectsList.filter((p) => {
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">Loading project portfolio...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {filtered.map((project, i) => (
                <FadeIn key={project.title} delay={i * 0.08}>
                  <div className="bg-card rounded-xl border border-border shadow-sm h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-square w-full bg-muted overflow-hidden">
                      <ProjectCardImage srcList={project.images} alt={project.title} />
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
          </>
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
