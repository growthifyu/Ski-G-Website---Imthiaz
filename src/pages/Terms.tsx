import { Section } from "@/components/SectionComponents";
import Layout from "@/components/Layout";

const Terms = () => (
  <Layout>
    <section className="bg-primary py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">Terms & Conditions</h1>
      </div>
    </section>
    <Section className="bg-background">
      <div className="max-w-3xl prose prose-neutral dark:prose-invert">
        <p className="text-muted-foreground text-sm mb-8">Effective Date: February 2025</p>

        <p className="text-foreground leading-relaxed mb-6">
          By accessing this website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">1. Use of Website</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          The content on this website is provided for general informational purposes only.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Misuse the website</li>
          <li>Attempt unauthorized access</li>
          <li>Disrupt website functionality</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">2. Services Disclaimer</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          All project timelines, savings estimates, and performance representations are indicative and may vary based on:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Site conditions</li>
          <li>Government approvals</li>
          <li>Customer documentation</li>
          <li>Utility policies</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Final project details will be provided through formal proposal and agreement.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">3. Intellectual Property</h2>
        <p className="text-muted-foreground leading-relaxed">
          All content, text, images, branding, and materials on this website are the property of ski-G Energies and may not be copied or reproduced without written permission.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">4. Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">ski-G Energies shall not be held liable for:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Website downtime</li>
          <li>Indirect damages</li>
          <li>Loss resulting from reliance on general website information</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">5. Third-Party Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our website may contain links to third-party websites. We are not responsible for their content or policies.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">6. Governing Law</h2>
        <p className="text-muted-foreground leading-relaxed">
          These terms are governed by the laws applicable in India and the United Arab Emirates, depending on the jurisdiction of operation.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">7. Contact</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">For any legal queries:</p>
        <p className="text-muted-foreground leading-relaxed">
          ski-G Energies Pvt. Ltd.<br />
          Chennai, India<br />
          Dubai, UAE
        </p>
      </div>
    </Section>
  </Layout>
);

export default Terms;
