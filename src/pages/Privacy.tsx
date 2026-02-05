import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Legal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 15, 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="royal-card p-8 md:p-12 prose prose-invert max-w-none"
          >
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Regalium ("we," "our," or "us") respects your privacy and is committed 
                to protecting your personal data. This privacy policy explains how we 
                collect, use, and safeguard your information when you use our website 
                and services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Wallet addresses when you connect to our platform</li>
                <li>Transaction data related to staking and token transfers</li>
                <li>Email addresses if you subscribe to our newsletter</li>
                <li>Support inquiries and communication records</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                4. Blockchain Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Please note that blockchain transactions are public by nature. When you 
                interact with our smart contracts, your wallet address and transaction 
                details are permanently recorded on the Polygon blockchain and are 
                publicly accessible. We have no control over this data once it is 
                recorded on the blockchain.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies to enable basic functionality of our website. 
                We may also use analytics cookies to understand how visitors interact 
                with our website. You can control cookie preferences through your 
                browser settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                6. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to 
                protect your personal data against unauthorized access, alteration, 
                disclosure, or destruction. However, no method of transmission over 
                the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                7. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services may contain links to third-party websites, applications, 
                or services (including DEX aggregators, on-ramp providers, and wallet 
                providers). We are not responsible for the privacy practices of these 
                third parties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                8. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data (where applicable)</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify 
                you of any changes by posting the new policy on this page and updating 
                the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy or our privacy practices, 
                please contact us at{" "}
                <a href="mailto:privacy@regalium.io" className="text-gold hover:underline">
                  privacy@regalium.io
                </a>
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
