import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, SectionSubheading, FadeIn } from "@/components/SectionComponents";
import Layout from "@/components/Layout";
import { 
  Check, 
  ArrowRight, 
  Battery, 
  Zap, 
  Shield, 
  HelpCircle, 
  Leaf, 
  Sparkles, 
  Award, 
  RefreshCw, 
  Thermometer, 
  Wrench, 
  Feather, 
  Coins, 
  GraduationCap, 
  Megaphone, 
  Scale 
} from "lucide-react";
import bessImg from "@/assets/bess-storage.jpg";

// Product data for calculator
const products = {
  nexus100:  { price: 19000, name: "Nexus 12.8V 100Ah",  kwh: 1.28, aio: false },
  nexus200:  { price: 34000, name: "Nexus 12.8V 200Ah",  kwh: 2.56, aio: false },
  nexus24:   { price: 35000, name: "Nexus 25.6V 100Ah",  kwh: 2.56, aio: false },
  voltrix12: { price: 22000, name: "Voltrix 1280Wh",     kwh: 1.28, aio: false },
  voltrix24: { price: 38000, name: "Voltrix 2560Wh",     kwh: 2.56, aio: false },
  voltrixaio:{ price: 33000, name: "Voltrix 1kVA All-in-One", kwh: 1.28, aio: true },
  aether:    { price: 95000, name: "Aether 5.12 kWh",    kwh: 4.6,  aio: false }
};

const ECO = { leadPerBattery: 10, co2PerBattery: 55, treeAbsorbPerYr: 20 };
const MILESTONES = { sold: 120, displacementFactor: 3 };

// Animated Counter component
const AnimatedCounter = ({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(easedProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl sm:text-4xl text-accent">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
};

type ProductPictureVariant = "nexus" | "voltrix" | "aio" | "aether";

const ProductPicture = ({ variant, title }: { variant: ProductPictureVariant; title: string }) => {
  const stockImages = {
    nexus: "https://imrorwxhikrmln5q-static.micyjz.com/cloud/liBpjKkqloSRolojiqmlip/integrated-lithium-battery-power-supply-solution-for-data-centers.jpg",
    voltrix: "https://imrorwxhikrmln5q-static.micyjz.com/cloud/lmBpjKkqloSRolijqniiio/snadi-bl-1000l-wall-mount-modular-energy-storage-system-solution.png",
    aio: "https://5.imimg.com/data5/SELLER/Default/2022/9/QP/DH/HN/160337977/wall-mounted-inverter-with-lithium-battery-1000x1000.jpg",
    aether: "https://image.made-in-china.com/155f0j00AbaoqcnRftkN/Rack-Mount-Battery-Storage-Batteries-51-2V-170ah-Solar-LiFePO4-Energy-Storage-System.webp"
  }[variant];

  return (
    <div className="mt-5 flex justify-center xl:mt-0 xl:justify-end">
      <div className="relative h-[220px] w-full max-w-[230px] overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
        <img
          src={stockImages}
          alt={`${title} product picture`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = bessImg;
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-primary/80 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          {title}
        </div>
      </div>
    </div>
  );
};

const ESS = () => {
  // Calculator States
  const [selectedProd, setSelectedProd] = useState<keyof typeof products>("nexus100");
  const [periodYears, setPeriodYears] = useState<number>(10);
  const [hours, setHours] = useState<number>(3);
  const [elecRate, setElecRate] = useState<number>(8);
  const [laPrice, setLaPrice] = useState<number>(16000);

  // Dynamic calculations
  const results = useMemo(() => {
    const p = products[selectedProd];
    const rate = elecRate || 8;
    const priceLA = laPrice || 16000;

    const laLife = Math.min(4, Math.max(2, 3.5 * Math.pow(3 / hours, 0.4)));
    const laBanks = Math.max(1, Math.round(p.kwh / 0.9));
    const laCount = Math.ceil(periodYears / laLife) * laBanks;

    const dailyKwh = Math.min(hours * 0.55, p.kwh);
    const yearlyKwh = dailyKwh * 365;
    const laLoss = yearlyKwh * 0.22 * rate * periodYears;
    const liLoss = yearlyKwh * 0.04 * rate * periodYears;
    const kwhWasteAvoided = yearlyKwh * (0.22 - 0.04) * periodYears;

    const laMaint = 400 * periodYears;
    const laInverter = p.aio ? 6500 * 1.6 : 0;

    const laTCO = laCount * priceLA + laLoss + laMaint + laInverter;
    const liTCO = p.price + liLoss;
    const savings = Math.max(0, laTCO - liTCO);

    const leadKg = laCount * ECO.leadPerBattery;
    const co2Kg = Math.round(laCount * ECO.co2PerBattery + kwhWasteAvoided * 0.72);
    const trees = Math.max(1, Math.round(co2Kg / (ECO.treeAbsorbPerYr * periodYears)));

    return {
      laCount,
      laTCO,
      liTCO,
      savings,
      leadKg,
      co2Kg,
      trees,
      kwhWasteAvoided,
      productName: p.name
    };
  }, [selectedProd, periodYears, hours, elecRate, laPrice]);

  return (
    <Layout>
      {/* INNER PAGE HERO - Matches /services and /about layout exactly */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bessImg} alt="SKI-G ESS battery energy storage systems" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            Energy Storage Systems (ESS)
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground max-w-3xl mx-auto leading-tight">
            Power That Outlasts. <span className="text-accent">Savings That Add Up.</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            SKI-G ESS brings advanced Lithium Ferro Phosphate (LFP) battery systems to Indian homes and businesses — engineered for South India's heat, built to replace lead acid for good.
          </p>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS BANNER */}
      <section className="bg-background py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center border-r border-border last:border-0 md:border-r">
              <div className="font-heading font-bold text-2xl md:text-3xl text-accent">3500+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Charge Cycles</div>
            </div>
            <div className="text-center md:border-r border-border last:border-0">
              <div className="font-heading font-bold text-2xl md:text-3xl text-accent">90%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Usable DoD*</div>
            </div>
            <div className="text-center border-r border-border last:border-0 md:border-r">
              <div className="font-heading font-bold text-2xl md:text-3xl text-accent">5 Years</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Warranty</div>
            </div>
            <div className="text-center last:border-0">
              <div className="font-heading font-bold text-2xl md:text-3xl text-accent">Zero</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Maintenance</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - Styled as standard alternating service blocks */}
      <Section className="bg-background" id="products">
        <div className="max-w-[1150px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">OUR PRODUCT RANGE</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-foreground mt-3">
              Four Solutions. Every Backup Need Covered.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Each SKI-G ESS product is purpose-built around how Indian homes and businesses actually use backup power — with full technical specifications published openly.
            </p>
          </div>
        </div>
      </Section>

      {/* PRODUCT 1: NEXUS */}
      <Section className="bg-background pt-0">
        <div className="max-w-[1140px] mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 mb-4">
                  Home &amp; SME · IP65
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-foreground">Nexus</h3>
                <h5 className="text-accent font-semibold text-base mt-1 mb-4">Floor-Standing LFP Series</h5>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  The direct lead acid replacement. Drop-in compatible with your existing home UPS or inverter — same role, multi-fold gains in life and performance. IP65 rated: completely dust-tight and protected against water jets, built for real Indian installation conditions. At just 9 kg for the 100Ah model, one person installs it in minutes.
                </p>
                <div className="bg-muted/50 border-l-4 border-accent p-4 rounded-r-lg mb-6">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Ideal for:</span>
                  <p className="text-sm text-muted-foreground mt-1">Homes with inverter backup, small shops, clinics, small offices.</p>
                </div>
                <Link to="/contact">
                  <Button variant="solar">Enquire About Nexus <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
              <div className="md:col-span-7">
                <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center p-2">
                      <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
                        <rect x="8" y="6" width="44" height="68" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <rect x="16" y="16" width="28" height="6" rx="3" fill="currentColor"/>
                        <rect x="16" y="28" width="28" height="6" rx="3" fill="currentColor" opacity=".7"/>
                        <rect x="16" y="40" width="28" height="6" rx="3" fill="currentColor" opacity=".45"/>
                        <circle cx="30" cy="60" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground">Technical Specifications</h4>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-center">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary text-white text-left font-semibold">
                          <th className="p-2.5 rounded-tl-lg">Specification</th>
                          <th className="p-2.5 text-center">Nexus 12.8V 100Ah</th>
                          <th className="p-2.5 text-center">Nexus 12.8V 200Ah</th>
                          <th className="p-2.5 text-center rounded-tr-lg">Nexus 25.6V 100Ah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Chemistry</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Nominal Voltage</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">12.8 V</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">12.8 V</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">25.6 V</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Usable Energy</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">1.28 kWh</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">2.56 kWh</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">2.56 kWh</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Cycle Life</td>
                          <td className="p-2.5 text-center text-foreground font-semibold" colSpan={3}>3500 @ 90% DoD</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Enclosure</td>
                          <td className="p-2.5 text-center text-foreground font-semibold" colSpan={3}>ABS · IP65</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Weight (approx.)</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">9 kg</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">17–18 kg</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">17 kg</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                    <ProductPicture variant="nexus" title="Nexus" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* PRODUCT 2: VOLTRIX */}
      <Section className="bg-muted">
        <div className="max-w-[1140px] mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 md:order-2">
                <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center p-2">
                      <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-accent">
                        <rect x="6" y="14" width="48" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <path d="M30 24 L22 42 H30 L26 56 L40 36 H31 L36 24 Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground">Technical Specifications</h4>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-center">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary text-white text-left font-semibold">
                          <th className="p-2.5 rounded-tl-lg">Specification</th>
                          <th className="p-2.5 text-center">Voltrix 1280Wh (12.8V)</th>
                          <th className="p-2.5 text-center rounded-tr-lg">Voltrix 2560Wh (25.6V)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Chemistry</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Capacity</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">100 Ah</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">100 Ah</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Nominal Voltage</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">12.8 V</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">25.6 V</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Usable Energy</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">1.28 kWh</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">2.56 kWh</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Enclosure</td>
                          <td className="p-2.5 text-center text-foreground font-semibold" colSpan={2}>CRCA steel · IP20 (indoor)</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Weight &amp; Install</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">13.5 kg / Wall Mount</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">25 kg / Wall Mount</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                    <ProductPicture variant="voltrix" title="Voltrix" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 text-left md:order-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 mb-4">
                  Commercial · Wall-Mount
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-foreground">Voltrix</h3>
                <h5 className="text-accent font-semibold text-base mt-1 mb-4">Wall-Mounted LFP Series</h5>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Premium wall-mounted packs with a clean, space-saving design. Zero floor footprint, professional appearance, clean cabling — backup power that disappears into the wall. CRCA steel enclosure for indoor commercial environments.
                </p>
                <div className="bg-background border-l-4 border-accent p-4 rounded-r-lg mb-6 shadow-sm">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Ideal for:</span>
                  <p className="text-sm text-muted-foreground mt-1">Showrooms, offices, clinics, retail spaces, urban homes — anywhere floor space and aesthetics matter.</p>
                </div>
                <Link to="/contact">
                  <Button variant="solar">Enquire About Voltrix <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* PRODUCT 3: VOLTRIX ALL-IN-ONE */}
      <Section className="bg-background">
        <div className="max-w-[1140px] mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 mb-4">
                  Integrated · 1kVA
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-foreground">Voltrix 1kVA All-in-One</h3>
                <h5 className="text-accent font-semibold text-base mt-1 mb-4">Inverter + LFP Battery · One Wall-Mounted Unit</h5>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  Total backup in one box. A 1000 VA pure-power inverter and a 1.28 kWh LFP battery integrated into a single wall-mounted unit — no trolley, no battery stand, no cable mess. Built-in display and bypass-mode switch for total control.
                </p>
                <div className="bg-muted/50 border-l-4 border-accent p-4 rounded-r-lg mb-6">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Ideal for:</span>
                  <p className="text-sm text-muted-foreground mt-1">Urban homes and small offices wanting the cleanest possible backup installation.</p>
                </div>
                <Link to="/contact">
                  <Button variant="solar">Enquire About All-in-One <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
              <div className="md:col-span-7">
                <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center p-2">
                      <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-accent">
                        <rect x="6" y="10" width="48" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <rect x="13" y="18" width="34" height="14" rx="3" fill="currentColor" opacity=".9"/>
                        <path d="M30 38 L24 50 H30 L27 60 L38 46 H31 L34 38 Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground">Technical Specifications</h4>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-center">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary text-white text-left font-semibold">
                          <th className="p-2.5 rounded-tl-lg">Parameter</th>
                          <th className="p-2.5 text-center rounded-tr-lg">Voltrix 1kVA All-in-One</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="bg-muted/10 font-bold">
                          <td className="p-2.5 text-accent uppercase tracking-wider text-xs" colSpan={2}>Inverter Parameters</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Rating &amp; Max Power</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">1000 VA / 800 W</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Voltage Parameters</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">Input: 230 VAC | Output: 220 ±5% VAC</td>
                        </tr>
                        <tr className="bg-muted/10 font-bold">
                          <td className="p-2.5 text-accent uppercase tracking-wider text-xs" colSpan={2}>Battery Parameters</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Capacity &amp; Voltage</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP Chemistry (12.8V 100Ah · 1.28 kWh)</td>
                        </tr>
                        <tr className="bg-muted/10 font-bold">
                          <td className="p-2.5 text-accent uppercase tracking-wider text-xs" colSpan={2}>Installation &amp; General</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Build &amp; Dimension</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">Wall Mount / 526×372×142 mm</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Warranty</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">5 years</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                    <ProductPicture variant="aio" title="Voltrix 1kVA All-in-One" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* PRODUCT 4: AETHER */}
      <Section className="bg-muted">
        <div className="max-w-[1140px] mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 md:order-2">
                <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center p-2">
                      <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-accent">
                        <circle cx="30" cy="26" r="10" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="30" y1="8" x2="30" y2="13"/>
                          <line x1="30" y1="39" x2="30" y2="44"/>
                          <line x1="12" y1="26" x2="17" y2="26"/>
                          <line x1="43" y1="26" x2="48" y2="26"/>
                          <line x1="17" y1="13" x2="21" y2="17"/>
                          <line x1="39" y1="35" x2="43" y2="39"/>
                          <line x1="43" y1="13" x2="39" y2="17"/>
                          <line x1="21" y1="35" x2="17" y2="39"/>
                        </g>
                        <rect x="14" y="52" width="32" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                        <rect x="20" y="58" width="20" height="8" rx="2" fill="currentColor"/>
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground">Technical Specifications</h4>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-center">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary text-white text-left font-semibold">
                          <th className="p-2.5 rounded-tl-lg">Specification</th>
                          <th className="p-2.5 text-center rounded-tr-lg">Aether 5.12 kWh (51.2V)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Chemistry</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">LFP</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Capacity / Voltage / Energy</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">100 Ah / 51.2 V / 5.12 kWh</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Cycle Life</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">3500 @ 90% DoD</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Ports &amp; Communication</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">RS485 · CAN / 16S 100A Intelligent BMS</td>
                        </tr>
                        <tr className="hover:bg-muted/10">
                          <td className="p-2.5 font-medium text-muted-foreground">Weight &amp; Form Factor</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">45–50 kg / Stack or Rack Mount</td>
                        </tr>
                        <tr className="hover:bg-muted/10 bg-muted/20">
                          <td className="p-2.5 font-medium text-muted-foreground">Warranty</td>
                          <td className="p-2.5 text-center text-foreground font-semibold">5 years</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                    <ProductPicture variant="aether" title="Aether" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 text-left md:order-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 mb-4">
                  Solar Hybrid · RS485/CAN
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-foreground">Aether</h3>
                <h5 className="text-accent font-semibold text-base mt-1 mb-4">Solar-Communicable LFP Series · 5.12 kWh</h5>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  High-capacity LFP storage that talks to your solar hybrid inverter. RS485/CAN communication ensures optimal solar charging, maximum self-consumption, and longer battery life. Stackable and rack-mountable — your storage grows with your solar. Intelligent 16S BMS with passive cell balancing, thermal-runaway protection, and a built-in circuit breaker.
                </p>
                <div className="bg-background border-l-4 border-accent p-4 rounded-r-lg mb-6 shadow-sm">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Ideal for:</span>
                  <p className="text-sm text-muted-foreground mt-1">Homes and businesses with (or planning) hybrid solar systems; higher-capacity backup needs.</p>
                </div>
                <Link to="/contact">
                  <Button variant="solar">Enquire About Aether <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* WHY LFP SECTION - Matches standard list of benefits */}
      <Section className="bg-background" id="why-lfp">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">BENEFITS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-foreground mt-3">
              Built Different from Lead Acid. Built for India.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Lithium Ferro Phosphate (LFP) is the safest, most durable lithium chemistry — and it leaves lead acid behind on every metric that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <RefreshCw className="w-6 h-6 text-accent" />, title: "7–8× Longer Life", desc: "3500 cycles vs roughly 400–500 for tubular lead acid. One SKI-G pack outlives multiple lead acid replacements.", vs: "Lead acid: replaced every 3–4 years" },
              { icon: <Zap className="w-6 h-6 text-accent" />, title: "Faster Charging", desc: "Up to 50A recommended charge current — recharges in a fraction of lead acid's time, critical when grid windows between outages are short.", vs: "Lead acid: 10–12 hr full charge" },
              { icon: <Battery className="w-6 h-6 text-accent" />, title: "More Usable Power", desc: "Up to 90% depth of discharge on Nexus and Voltrix. Lead acid degrades fast below 50% discharge — you pay for capacity you can't use.", vs: "Lead acid: ~50% usable" },
              { icon: <Thermometer className="w-6 h-6 text-accent" />, title: "Heat Tolerant", desc: "Rated to charge at up to 55°C and discharge to 60°C — qualified for South Indian summers where lead acid life drops sharply with every degree.", vs: "Lead acid: life halves per +10°C" },
              { icon: <Wrench className="w-6 h-6 text-accent" />, title: "Zero Maintenance", desc: "No water top-ups, no terminal corrosion, no fumes. Install it, forget it.", vs: "Lead acid: monthly upkeep" },
              { icon: <Feather className="w-6 h-6 text-accent" />, title: "Light & Compact", desc: "Nexus 100Ah weighs just 9 kg vs 50–60 kg for an equivalent tubular battery. Voltrix mounts on the wall entirely.", vs: "Lead acid: floor trolley required" }
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="bg-card border border-border p-6 rounded-xl shadow-sm h-full flex flex-col justify-between hover:border-accent transition-colors duration-200">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border text-xs text-accent font-semibold uppercase tracking-wider">
                    {item.vs}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 bg-accent/5 border border-accent/20 rounded-xl p-6 md:p-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-heading font-semibold text-foreground text-base">Safety First Engineering</h5>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                LFP is the safest lithium chemistry — thermally stable, no cobalt, no acid fumes inside your home. Aether adds thermal-runaway protection and a built-in circuit breaker; Nexus is IP65 sealed against dust and water splashes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* PARTNER / DEALER PROGRAM - Re-styled as clean cards in light background */}
      <Section className="bg-muted" id="dealer">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">DEALER PROGRAMME</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground tracking-tight mt-3">
              Partner With SKI-G Energies
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Join during the pilot phase and grow with the brand toward our own manufacturing facility in Tamil Nadu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Coins className="w-6 h-6 text-accent" />, title: "Protected Margins", desc: "Structured MOP/MSP price discipline — dealers compete on service, not price-cutting." },
              { icon: <GraduationCap className="w-6 h-6 text-accent" />, title: "Product Training", desc: "Pre-dispatch product training and installation guidance for your team." },
              { icon: <Megaphone className="w-6 h-6 text-accent" />, title: "Marketing Support", desc: "Catalogues, in-store displays, and digital assets ready to use." },
              { icon: <Wrench className="w-6 h-6 text-accent" />, title: "Service Backbone", desc: "Warranty and service support from Chennai — 5-year product warranty backed by OEM partnership." }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" variant="solar">Become a SKI-G Dealer <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* SAVINGS CALCULATOR SECTION - Styled with clean light theme layout */}
      <Section className="bg-background" id="calculator">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">SAVINGS CALCULATOR</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground tracking-tight mt-3">
              See What Lead Acid Really Costs You
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Compare total cost of ownership: your lead acid setup vs an SKI-G Lithium Ferro system. Money saved, batteries avoided, carbon avoided.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Input Panel */}
            <div className="lg:col-span-5 bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
              <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" /> Your Setup
              </h3>

              <div className="space-y-6">
                {/* Product choice */}
                <div>
                  <label htmlFor="calc-product" className="block text-sm font-bold text-foreground mb-2">
                    Choose SKI-G Solution
                  </label>
                  <select
                    id="calc-product"
                    value={selectedProd}
                    onChange={(e) => setSelectedProd(e.target.value as keyof typeof products)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground outline-none focus:border-accent transition-colors"
                  >
                    <option value="nexus100">Nexus 12.8V 100Ah</option>
                    <option value="nexus200">Nexus 12.8V 200Ah</option>
                    <option value="nexus24">Nexus 25.6V 100Ah</option>
                    <option value="voltrix12">Voltrix 1280Wh</option>
                    <option value="voltrix24">Voltrix 2560Wh</option>
                    <option value="voltrixaio">Voltrix 1kVA All-in-One</option>
                    <option value="aether">Aether 5.12 kWh</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    {products[selectedProd].aio
                      ? "Compared against a traditional inverter + tubular lead acid battery setup."
                      : "Compared against an equivalent tubular lead acid battery."}
                  </p>
                </div>

                {/* Period choice */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Comparison Period
                  </label>
                  <div className="flex gap-2">
                    {[5, 10, 15].map((y) => (
                      <button
                        key={y}
                        onClick={() => setPeriodYears(y)}
                        className={`flex-1 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                          periodYears === y
                            ? "bg-accent border-accent text-white shadow-md shadow-accent/20"
                            : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {y} yrs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-foreground">
                      Daily Power Cut Duration
                    </label>
                    <span className="px-2.5 py-1 rounded bg-accent/15 text-accent font-bold text-xs">
                      {hours} hrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-border accent-accent cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    More usage = more lead acid wear = bigger lithium advantage.
                  </p>
                </div>

                {/* Electricity Rate */}
                <div>
                  <label htmlFor="calc-rate" className="block text-sm font-bold text-foreground mb-2">
                    Electricity Rate (₹/unit)
                  </label>
                  <input
                    id="calc-rate"
                    type="number"
                    value={elecRate}
                    min="3"
                    max="15"
                    step="0.5"
                    onChange={(e) => setElecRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Lead acid wastes ~22% of energy in charging losses; LFP wastes under 4%.
                  </p>
                </div>

                {/* Lead Acid Battery Price */}
                <div>
                  <label htmlFor="calc-la-price" className="block text-sm font-bold text-foreground mb-2">
                    Your Lead Acid Battery Price (₹)
                  </label>
                  <input
                    id="calc-la-price"
                    type="number"
                    value={laPrice}
                    min="8000"
                    step="500"
                    onChange={(e) => setLaPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Typical 150Ah tubular: ₹14,000–₹18,000. Replaced every 3–4 years.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm flex flex-col justify-between h-full">
              <div>
                {/* Clean Navy-gradient Hero box - Matches website banner branding */}
                <div className="bg-gradient-to-br from-primary to-navy-light rounded-xl p-6 text-white text-center shadow-md mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                    YOUR SAVINGS WITH SKI-G
                  </span>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl mt-2">
                    ₹{Math.round(results.savings).toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs font-medium text-white/90 block mt-2">
                    vs Lead Acid total cost of ownership over {periodYears} years with {results.productName}
                  </span>
                </div>

                {/* Breakdown list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium text-muted-foreground">Lead acid batteries replaced</span>
                    <span className="text-sm font-bold text-red-600">{results.laCount} {results.laCount === 1 ? "battery" : "batteries"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium text-muted-foreground">Lead acid: total TCO spend</span>
                    <span className="text-sm font-bold text-red-600">₹{Math.round(results.laTCO).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium text-muted-foreground">SKI-G LFP: total TCO spend</span>
                    <span className="text-sm font-bold text-green-600">₹{Math.round(results.liTCO).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Eco box */}
                <div className="mt-8 bg-green-50/50 border border-green-200/50 rounded-xl p-5">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-green-800 flex items-center gap-2 mb-4">
                    <Leaf className="w-4 h-4 text-green-600" /> Environmental Impact Avoided
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-green-700/80 block font-semibold">Lead avoided</span>
                      <span className="font-bold text-green-800 text-base">{results.leadKg} kg</span>
                    </div>
                    <div>
                      <span className="text-xs text-green-700/80 block font-semibold">CO₂e avoided</span>
                      <span className="font-bold text-green-800 text-base">{results.co2Kg.toLocaleString("en-IN")} kg</span>
                    </div>
                    <div>
                      <span className="text-xs text-green-700/80 block font-semibold">Equivalent trees</span>
                      <span className="font-bold text-green-800 text-base">{results.trees} trees</span>
                    </div>
                    <div>
                      <span className="text-xs text-green-700/80 block font-semibold">Energy saved</span>
                      <span className="font-bold text-green-800 text-base">{Math.round(results.kwhWasteAvoided).toLocaleString("en-IN")} units</span>
                    </div>
                  </div>
                </div>

                {/* Comparison Bar chart */}
                <div className="mt-8 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
                      <span>Lead Acid TCO</span>
                      <span>₹{Math.round(results.laTCO).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-slate-300 transition-all duration-500 rounded-full"
                        style={{ width: `${(results.laTCO / Math.max(results.laTCO, results.liTCO)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-accent mb-2">
                      <span>SKI-G LFP TCO</span>
                      <span>₹{Math.round(results.liTCO).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-[#f5832e] transition-all duration-500 rounded-full"
                        style={{ width: `${(results.liTCO / Math.max(results.laTCO, results.liTCO)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-muted-foreground leading-normal border-t border-border pt-4">
                Indicative estimates based on typical market prices, lead acid replacement cycles, charging-efficiency differences, ~10 kg lead and ~55 kg CO₂e per avoided lead acid battery (indicative lifecycle figures, pending final published references), and 20 kg CO₂/year absorption per tree. SKI-G prices shown are placeholders pending final pricing. Contact SKI-G for an exact quote.
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MILESTONES / LIVE IMPACT SECTION - Styled on light gray bg-muted background */}
      <Section className="bg-muted" id="milestones">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">OUR IMPACT</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground tracking-tight mt-3">
              Every SKI-G Battery Counts
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Each lithium pack sold displaces multiple lead acid batteries — and the lead, acid, and carbon that come with them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border p-8 rounded-xl text-center shadow-sm hover:border-accent transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Battery className="w-6 h-6 text-accent" />
              </div>
              <div className="block mt-2">
                <AnimatedCounter target={MILESTONES.sold} />
              </div>
              <div className="text-sm text-muted-foreground font-semibold mt-2 leading-relaxed">
                SKI-G batteries powering homes &amp; businesses
              </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl text-center shadow-sm hover:border-accent transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <RefreshCw className="w-6 h-6 text-accent animate-[spin_5s_linear_infinite]" />
              </div>
              <div className="block mt-2">
                <AnimatedCounter target={MILESTONES.sold * MILESTONES.displacementFactor} />
              </div>
              <div className="text-sm text-muted-foreground font-semibold mt-2 leading-relaxed">
                Lead acid batteries displaced over their lifetime
              </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl text-center shadow-sm hover:border-accent transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Scale className="w-6 h-6 text-accent" />
              </div>
              <div className="block mt-2">
                <AnimatedCounter target={MILESTONES.sold * MILESTONES.displacementFactor * ECO.leadPerBattery} suffix=" kg" />
              </div>
              <div className="text-sm text-muted-foreground font-semibold mt-2 leading-relaxed">
                Lead kept out of the waste stream
              </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl text-center shadow-sm hover:border-accent transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Leaf className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <div className="block mt-2">
                <AnimatedCounter target={MILESTONES.sold * MILESTONES.displacementFactor * ECO.co2PerBattery} suffix=" kg" />
              </div>
              <div className="text-sm text-muted-foreground font-semibold mt-2 leading-relaxed">
                CO₂e emissions avoided
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-12 leading-relaxed max-w-xl mx-auto">
            Figures derived from cumulative sales × lifecycle displacement factors (indicative; methodology published on request).
          </div>
        </div>
      </Section>

      {/* FINAL CALL TO ACTION - Brand standard dark navy section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-12 h-1 bg-accent rounded-full mb-6 mx-auto"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground tracking-tight"
          >
            Upgrade to Modern Energy Storage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-blue-100/70 leading-relaxed"
          >
            Replace unreliable lead acid setups with our long-life Lithium Ferro Phosphate (LFP) systems. Contact Chennai's energy specialists for pricing details.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Link to="/contact">
              <Button variant="hero" size="lg">Get a Free Sizing Estimate</Button>
            </Link>
            <a href="https://wa.me/919500092381" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-secondary" size="lg" className="border-white/20 hover:bg-white/5">
                WhatsApp Us
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ESS;
