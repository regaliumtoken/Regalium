import { Layout } from "@/components/layout/Layout";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
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
              <FileText className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Legal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Terms of <span className="text-gradient-gold">Service</span>
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
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Regalium platform, website, and services 
                (collectively, the "Services"), you agree to be bound by these Terms 
                of Service. If you do not agree to these terms, please do not use 
                our Services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                2. Eligibility
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 18 years old and have the legal capacity to 
                enter into these terms. By using our Services, you represent that 
                you meet these requirements and that you are not prohibited from 
                using cryptocurrency services under the laws of your jurisdiction.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                3. Description of Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Regalium provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>A platform for acquiring RGLM tokens through various methods</li>
                <li>Staking services for earning rewards on RGLM tokens</li>
                <li>Integration with third-party DEX aggregators and on-ramp services</li>
                <li>Access to project information and documentation</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                4. Wallet Connection
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To use certain features of our Services, you must connect a compatible 
                cryptocurrency wallet. You are solely responsible for maintaining the 
                security of your wallet and private keys. We never have access to your 
                private keys and cannot recover lost funds.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                5. Risks and Disclaimers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using our Services, you acknowledge and accept the following risks:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Cryptocurrency values are highly volatile and may result in significant losses</li>
                <li>Smart contract interactions carry inherent technical risks</li>
                <li>Regulatory changes may affect the availability or legality of our Services</li>
                <li>Network congestion or failures may affect transaction processing</li>
                <li>Past performance does not guarantee future results</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                6. No Investment Advice
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nothing on our platform constitutes financial, investment, legal, or 
                tax advice. RGLM tokens are utility tokens for use within the Regalium 
                ecosystem. You should consult with qualified professionals before 
                making any financial decisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                7. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Services integrate with third-party providers including DEX 
                aggregators (Uniswap, 1inch), on-ramp services (MoonPay, Transak), 
                and wallet providers. Your use of these third-party services is 
                subject to their respective terms and conditions. We are not 
                responsible for the actions or omissions of third parties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                8. Prohibited Activities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use our Services for any illegal purpose</li>
                <li>Attempt to exploit or manipulate our smart contracts</li>
                <li>Engage in market manipulation or fraudulent activities</li>
                <li>Circumvent geographic restrictions or access controls</li>
                <li>Interfere with or disrupt our Services</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, REGALIUM AND ITS AFFILIATES 
                SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, 
                REVENUES, DATA, OR TOKENS, ARISING FROM YOUR USE OF OUR SERVICES.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                10. Indemnification
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Regalium and its team 
                members from any claims, damages, or expenses arising from your 
                use of our Services or violation of these terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                11. Modifications
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. 
                Changes will be effective upon posting to our website. Your continued 
                use of our Services after changes constitutes acceptance of the 
                modified terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                12. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with 
                applicable laws, without regard to conflict of law principles. Any 
                disputes arising from these terms shall be resolved through binding 
                arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                13. Contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@regalium.io" className="text-gold hover:underline">
                  legal@regalium.io
                </a>
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
