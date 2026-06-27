import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section, SectionHeading, SectionSubheading } from "@/components/SectionComponents";
import sankarImg from "@/assets/sankar-ganesh.jpg";
import imthiazImg from "@/assets/imthiaz.jpeg";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const LeaderCard = ({
  name,
  role,
  image,
  alt,
  bio,
  quote,
  featured,
  delay = 0,
}: {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  quote?: string;
  featured?: boolean;
  delay?: number;
}) => (
  <FadeIn delay={delay}>
    <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[280px] flex-shrink-0">
          <img src={image} alt={alt} className="w-full h-72 md:h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0 p-8 md:p-10 flex flex-col justify-center">
          {featured && (
            <div className="mb-1">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">Featured Leader</span>
            </div>
          )}
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mt-2">{name}</h3>
          <p className="text-muted-foreground text-sm mt-1 font-medium">{role}</p>

          {quote && (
            <div className="mt-6 relative pl-5 border-l-[3px] border-accent">
              <Quote className="absolute -left-3 -top-1 w-5 h-5 text-accent bg-card" />
              <p className="text-foreground/80 italic leading-relaxed text-[15px]">{quote}</p>
            </div>
          )}

          <p className="mt-6 text-muted-foreground text-[15px] leading-relaxed max-w-lg">{bio}</p>
        </div>
      </div>
    </div>
  </FadeIn>
);

const LeadershipSection = () => {
  return (
    <Section className="bg-muted/50">
      <FadeIn>
        <SectionHeading>Our Leadership</SectionHeading>
        <SectionSubheading>
          Meet the people driving ski-G Energies forward with discipline, clarity, and accountability.
        </SectionSubheading>
      </FadeIn>

      <div className="mt-14 max-w-4xl mx-auto space-y-8">
        <LeaderCard
          name="Sankar Ganesh"
          role="CEO & Managing Director"
          image={sankarImg}
          alt="Sankar Ganesh – CEO & Managing Director"
          featured
          delay={0.15}
          quote="At ski-G Energies, we believe that the true measure of a solar company lies not in the promises it makes, but in the systems it delivers and the accountability it maintains long after commissioning."
          bio="Our journey began with a simple conviction — that India and the Middle East deserve energy partners who prioritise engineering discipline over sales targets. We remain committed to transparent communication, structured execution, and building long-term relationships with every client we serve."
        />

        <LeaderCard
          name="Imthiaz"
          role="Director – Sales & Operations"
          image={imthiazImg}
          alt="Imthiaz – Director, Sales & Operations"
          delay={0.25}
          quote="Every successful solar project starts with clear communication and disciplined coordination. Our responsibility doesn't end at installation — it extends to ensuring every client experiences the value of structured, accountable execution."
          bio="Imthiaz leads sales and operations at ski-G Energies, ensuring every client engagement is structured, responsive, and aligned with project goals. His hands-on approach to coordination and execution strengthens the company's commitment to delivering reliable energy solutions."
        />
      </div>
    </Section>
  );
};

export default LeadershipSection;
