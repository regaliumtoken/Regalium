import { Layout } from "@/components/layout/Layout";
import { Shield, CheckCircle, ExternalLink, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const auditReports = [
  {
    auditor: "CertiK",
    date: "Q1 2025",
    status: "Completed",
    score: "94/100",
    findings: "0 Critical, 0 Major, 2 Minor (Resolved)",
    reportUrl: "#",
  },
  {
    auditor: "Hacken",
    date: "Q1 2025",
    status: "Completed",
    score: "9.5/10",
    findings: "0 Critical, 1 Medium (Resolved)",
    reportUrl: "#",
  },
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Multi-Sig Treasury",
    description: "All treasury operations require multiple signatures from trusted guardians.",
  },
  {
    icon: Lock,
    title: "Timelock Contracts",
    description: "48-hour timelock on all governance proposals for community review.",
  },
  {
    icon: CheckCircle,
    title: "Bug Bounty Program",
    description: "Up to $100,000 rewards for responsible disclosure of vulnerabilities.",
  },
  {
    icon: FileText,
    title: "Open Source",
    description: "All smart contracts are verified and open source on Polygonscan.",
  },
];

export default function Audit() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Security First</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              <span className="text-gradient-gold">Security</span> & Audits
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Regalium prioritizes the safety of your assets with rigorous security 
              measures and third-party audits from industry-leading firms.
            </p>
          </motion.div>

          {/* Audit Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10">
              Third-Party Audit Reports
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {auditReports.map((audit, index) => (
                <div
                  key={audit.auditor}
                  className="royal-card p-8 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground">
                        {audit.auditor}
                      </h3>
                      <p className="text-muted-foreground">{audit.date}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      {audit.status}
                    </div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Security Score</span>
                      <span className="text-gold font-bold">{audit.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Findings</span>
                      <span className="text-foreground text-sm">{audit.findings}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group">
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Report
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10">
              Security Measures
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="royal-card p-6 text-center hover:border-gold/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bug Bounty CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="royal-card p-12 max-w-3xl mx-auto bg-gradient-to-br from-gold/5 to-transparent">
              <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-4">
                Bug Bounty Program
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Help us keep Regalium secure. Report vulnerabilities responsibly 
                and earn rewards up to $100,000 based on severity.
              </p>
              <Button className="royal-button">
                Submit a Report
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
