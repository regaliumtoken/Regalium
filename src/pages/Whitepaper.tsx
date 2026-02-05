import { motion } from "framer-motion";
import { Crown, Coins, Shield, Users, Zap, Globe, Lock, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Crown,
    content: `Regalium (RGLM) represents the pinnacle of gaming token evolution—a royal standard for in-game economies built on the Polygon blockchain. Designed to unify fragmented gaming ecosystems under a single, noble banner, Regalium empowers players to truly own their digital achievements.

Our vision transcends mere tokenization. We are building a sovereign gaming economy where every player is royalty, every achievement has lasting value, and every transaction upholds the highest standards of fairness and transparency.`
  },
  {
    id: "problem",
    title: "The Problem",
    icon: Shield,
    content: `The current gaming landscape suffers from fundamental flaws that undermine player sovereignty:

• **Fragmented Economies** - Each game operates in isolation, trapping value within proprietary systems
• **No True Ownership** - Players spend countless hours accumulating assets they never truly own
• **Centralized Control** - Game publishers hold absolute power over in-game economies
• **Value Extraction** - Traditional models extract value from players rather than rewarding them
• **Interoperability Barriers** - Achievements and assets cannot transfer between games`
  },
  {
    id: "solution",
    title: "The Regalium Solution",
    icon: Zap,
    content: `Regalium introduces a unified reward layer that sits above individual game economies, creating a royal treasury of gaming value:

• **Universal Gaming Currency** - One token accepted across the entire Regalium ecosystem
• **True Asset Ownership** - NFT-backed items and achievements stored on-chain
• **Player-First Economics** - Rewards flow to players, not just publishers
• **Seamless Integration** - Simple SDK for game developers to join the kingdom
• **Cross-Game Value** - Earn in one realm, spend in another`
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    icon: Coins,
    content: `RGLM has a carefully designed token distribution that ensures long-term sustainability and fair distribution:

**Total Supply: 1,000,000,000 RGLM**

• **40% - Player Rewards Pool** — Distributed through gameplay, staking, and engagement
• **25% - Treasury** — Governed by the community for ecosystem development
• **15% - Team & Advisors** — 3-year vesting with 1-year cliff
• **10% - Strategic Partnerships** — Game studio integrations and collaborations
• **7% - Liquidity Provision** — DEX and CEX liquidity pools
• **3% - Initial Distribution** — Launch events and airdrops`
  },
  {
    id: "staking",
    title: "Royal Vault Staking",
    icon: Lock,
    content: `The Royal Vault is our flagship staking mechanism, designed to reward loyal subjects who commit their RGLM to the kingdom:

**Staking Benefits:**
• **Base APY** — Competitive rewards paid in RGLM
• **Time-Weighted Bonuses** — Longer stakes earn higher multipliers
• **Governance Power** — Stakers gain voting rights proportional to their stake
• **Exclusive Access** — Early access to new game integrations and features
• **Compounding Rewards** — Auto-compound option for maximum growth

The vault employs a dynamic reward rate adjusted based on total staked supply, ensuring sustainable yields for all participants.`
  },
  {
    id: "governance",
    title: "Guild Governance",
    icon: Users,
    content: `Regalium embraces decentralized governance through the Guild Council system:

**Governance Structure:**
• **Proposal Creation** — Token holders with 100,000+ RGLM can create proposals
• **Voting Period** — 7-day voting windows for community deliberation
• **Quorum Requirements** — 10% of circulating supply must participate
• **Execution** — Passed proposals are executed via timelock contracts

**Governance Scope:**
• Treasury allocation and grants
• Game integration approvals
• Reward rate adjustments
• Protocol upgrades and parameters
• Strategic partnership decisions`
  },
  {
    id: "technology",
    title: "Technical Architecture",
    icon: Globe,
    content: `Regalium is built on a robust technical foundation optimized for gaming:

**Blockchain Layer:**
• Polygon PoS for high throughput and low fees
• Sub-second finality for real-time gaming integration
• EVM compatibility for developer accessibility

**Smart Contract Infrastructure:**
• Upgradeable proxy patterns for future enhancements
• Multi-signature security for critical operations
• Audited by leading blockchain security firms

**Integration SDK:**
• RESTful APIs and WebSocket connections
• Unity and Unreal Engine plugins
• Comprehensive documentation and support`
  },
  {
    id: "roadmap",
    title: "Royal Roadmap",
    icon: TrendingUp,
    content: `**Phase I: Foundation (Q1 2025)**
• Token launch on Polygon
• Royal Vault staking deployment
• Initial DEX listings
• Community building initiatives

**Phase II: Expansion (Q2-Q3 2025)**
• First game studio partnerships
• Mobile wallet application
• Cross-chain bridge deployment
• Governance module activation

**Phase III: Dominion (Q4 2025 - 2026)**
• 10+ game integrations
• CEX listings on major exchanges
• NFT marketplace launch
• DAO transition complete`
  }
];

export default function Whitepaper() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-[120px]" />
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50 text-sm text-muted-foreground mb-8">
              <Crown className="w-4 h-4 text-gold" />
              <span>Official Documentation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              <span className="text-gradient-gold">Regalium</span> Whitepaper
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The definitive guide to the royal gaming token protocol. 
              Discover our vision, technology, and roadmap to gaming sovereignty.
            </p>
            
            <div className="mt-8 text-sm text-muted-foreground">
              Version 1.0 • Last Updated: January 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-y border-border/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-semibold text-center mb-8">Table of Contents</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors"
              >
                {section.title}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-20">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="royal-card p-8">
                    <div className="prose prose-invert prose-lg max-w-none">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                          {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="royal-card p-8 text-center">
            <h3 className="text-xl font-serif font-semibold mb-4 text-gold">Legal Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This whitepaper is for informational purposes only and does not constitute financial advice, 
              an offer to sell, or a solicitation of an offer to buy any securities or tokens. 
              Cryptocurrency investments carry significant risk. Please conduct your own research and 
              consult with financial advisors before making any investment decisions. The Regalium team 
              reserves the right to update this document as the project evolves.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
