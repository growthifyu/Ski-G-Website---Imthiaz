import { Section } from "@/components/SectionComponents";
import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="bg-primary py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">Privacy Policy</h1>
      </div>
    </section>
    <Section className="bg-background">
      <div className="max-w-3xl prose prose-neutral dark:prose-invert">
        <p className="text-muted-foreground text-sm mb-8">Effective Date: February 2025</p>

        <p className="text-foreground leading-relaxed mb-6">
          ski-G Energies Pvt. Ltd. ("ski-G Energies", "we", "our", or "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">1. Information We Collect</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">We may collect the following information when you interact with our website:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Full Name</li>
          <li>Phone Number</li>
          <li>Email Address</li>
          <li>Location</li>
          <li>Electricity bill range or related energy usage information</li>
          <li>Any other information voluntarily submitted through contact forms</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-3">We may also automatically collect:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Website usage data via analytics tools</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">We use your information to:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Respond to enquiries and provide quotations</li>
          <li>Contact you regarding solar and energy solutions</li>
          <li>Provide consultation and service information</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed font-medium">We do not sell your personal information.</p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">3. Data Sharing</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">We may share information with:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Internal teams</li>
          <li>Authorized service partners</li>
          <li>Legal or regulatory authorities when required</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">We do not share your data with third parties for marketing resale purposes.</p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">4. Data Security</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          We implement reasonable technical and organizational measures to protect your data against unauthorized access, loss, or misuse.
        </p>
        <p className="text-muted-foreground leading-relaxed">However, no online system can guarantee 100% security.</p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">5. Cookies & Tracking</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Our website may use cookies and tracking tools (such as Google Analytics or Meta Pixel) to improve user experience and measure performance.
        </p>
        <p className="text-muted-foreground leading-relaxed">You may disable cookies via your browser settings.</p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">6. Your Rights</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">Depending on your jurisdiction, you may request:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
          <li>Access to your data</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of your data</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">You may contact us to exercise these rights.</p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">7. International Operations</h2>
        <p className="text-muted-foreground leading-relaxed">
          ski-G Energies operates across India and the United Arab Emirates. Data may be processed in either location in compliance with applicable regulations.
        </p>

        <h2 className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">8. Contact Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">For privacy-related queries:</p>
        <p className="text-muted-foreground leading-relaxed">
          ski-G Energies Pvt. Ltd.<br />
          Emails: <a href="mailto:info@ski-g.com" className="text-accent hover:underline">info@ski-g.com</a> | <a href="mailto:connect@ski-g.com" className="text-accent hover:underline">connect@ski-g.com</a><br />
          Chennai, India<br />
          Dubai, UAE
        </p>

        <p className="text-muted-foreground leading-relaxed mt-8 text-sm italic">
          We may update this Privacy Policy periodically. Changes will be reflected on this page.
        </p>
      </div>
    </Section>
  </Layout>
);

export default Privacy;
