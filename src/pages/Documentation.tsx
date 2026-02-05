import { Layout } from "@/components/layout/Layout";
import { Book, Code, Coins, Shield, Zap, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const docCategories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of Regalium and how to get your first RGLM tokens.",
    links: [
      { label: "What is Regalium?", href: "/whitepaper" },
      { label: "Creating a Wallet", href: "#" },
      { label: "Buying RGLM", href: "/buy" },
      { label: "Network Setup", href: "#" },
    ],
  },
  {
    icon: Coins,
    title: "Staking & Rewards",
    description: "Everything you need to know about staking RGLM in the Royal Vault.",
    links: [
      { label: "How Staking Works", href: "/stake" },
      { label: "Reward Calculations", href: "#" },
      { label: "Unstaking & Claiming", href: "#" },
      { label: "APY Breakdown", href: "#" },
    ],
  },
  {
    icon: Zap,
    title: "Trading & Swaps",
    description: "Guide to trading RGLM on decentralized exchanges.",
    links: [
      { label: "Swap Guide", href: "/swap" },
      { label: "Liquidity Pools", href: "#" },
      { label: "Slippage Settings", href: "#" },
      { label: "Price Charts", href: "#" },
    ],
  },
  {
    icon: Code,
    title: "Developer Docs",
    description: "Technical documentation for integrating with Regalium.",
    links: [
      { label: "Smart Contracts", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "SDK Integration", href: "#" },
      { label: "GitHub Repository", href: "#" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Learn about our security measures and how we protect your assets.",
    links: [
      { label: "Audit Reports", href: "/audit" },
      { label: "Bug Bounty", href: "/audit" },
      { label: "Best Practices", href: "#" },
      { label: "Multi-Sig Setup", href: "#" },
    ],
  },
];

const quickLinks = [
  { label: "Whitepaper", href: "/whitepaper", icon: Book },
  { label: "Roadmap", href: "/roadmap", icon: Zap },
  { label: "FAQ", href: "/faq", icon: Shield },
];

export default function Documentation() {
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
              <Book className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Documentation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              <span className="text-gradient-gold">Learn</span> Regalium
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Comprehensive guides and documentation to help you understand 
              and build with Regalium.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-12 py-6 bg-card/50 border-border/50 text-lg"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.href}>
                <Button variant="outline" className="group">
                  <link.icon className="w-4 h-4 mr-2 text-gold" />
                  {link.label}
                  <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            ))}
          </motion.div>

          {/* Documentation Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="royal-card p-8 hover:border-gold/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <category.icon className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-xl font-serif font-bold text-foreground mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-foreground/80 hover:text-gold transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Developer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="royal-card p-12 max-w-3xl mx-auto bg-gradient-to-br from-royal-purple/10 to-transparent">
              <Code className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-4">
                Build with Regalium
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Integrate RGLM into your gaming platform or dApp. Our developer 
                tools make it easy to add royal rewards to your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="royal-button">
                  <Code className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
                <Button variant="outline">
                  API Reference
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
