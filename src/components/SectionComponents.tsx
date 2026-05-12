import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = "", id }: SectionProps) => (
  <section id={id} className={`py-[50px] md:py-[80px] ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

export const SectionHeading = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-center ${className}`}
  >
    {children}
  </motion.h2>
);

export const SectionSubheading = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className={`text-lg text-muted-foreground mt-4 max-w-2xl mx-auto text-center ${className}`}
  >
    {children}
  </motion.p>
);

export const FadeIn = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
