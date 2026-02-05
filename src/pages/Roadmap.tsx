import { motion } from "framer-motion";
import { Crown, Rocket, Users, Globe, Trophy, Sparkles, Check, Clock, Circle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

type PhaseStatus = "completed" | "current" | "upcoming";

interface RoadmapPhase {
  phase: string;
  title: string;
  period: string;
  status: PhaseStatus;
  description: string;
  milestones: {
    text: string;
    completed: boolean;
  }[];
  icon: typeof Crown;
}

const roadmapData: RoadmapPhase[] = [
  {
    phase: "Phase I",
    title: "Genesis",
    period: "Q1 2025",
    status: "current",
    description: "Laying the royal foundation. Token launch, core infrastructure, and community building.",
    icon: Rocket,
    milestones: [
      { text: "RGLM Token deployment on Polygon", completed: true },
      { text: "Royal Vault staking contract launch", completed: true },
      { text: "Website and brand reveal", completed: true },
      { text: "Community Discord & Telegram launch", completed: true },
      { text: "Initial DEX listing (Uniswap, QuickSwap)", completed: false },
      { text: "Security audits by Certik & Hacken", completed: false },
      { text: "1,000+ community members milestone", completed: false },
    ]
  },
  {
    phase: "Phase II",
    title: "Expansion",
    period: "Q2 2025",
    status: "upcoming",
    description: "Growing the kingdom. First partnerships, enhanced features, and broader accessibility.",
    icon: Users,
    milestones: [
      { text: "First game studio partnership announced", completed: false },
      { text: "Mobile wallet application (iOS & Android)", completed: false },
      { text: "Cross-chain bridge (Ethereum ↔ Polygon)", completed: false },
      { text: "Guild Governance module activation", completed: false },
      { text: "Fiat on-ramp integration (MoonPay)", completed: false },
      { text: "10,000+ community members milestone", completed: false },
      { text: "First CEX listing announcement", completed: false },
    ]
  },
  {
    phase: "Phase III",
    title: "Conquest",
    period: "Q3 2025",
    status: "upcoming",
    description: "Claiming new territories. Multiple integrations, marketplace launch, and ecosystem growth.",
    icon: Globe,
    milestones: [
      { text: "5+ game integrations live", completed: false },
      { text: "NFT Achievement marketplace launch", completed: false },
      { text: "Developer SDK public release", completed: false },
      { text: "Strategic exchange partnerships", completed: false },
      { text: "Gaming guild alliance program", completed: false },
      { text: "50,000+ community members milestone", completed: false },
      { text: "First major esports sponsorship", completed: false },
    ]
  },
  {
    phase: "Phase IV",
    title: "Dominion",
    period: "Q4 2025",
    status: "upcoming",
    description: "Establishing sovereignty. Full decentralization, major partnerships, and market leadership.",
    icon: Trophy,
    milestones: [
      { text: "15+ game integrations active", completed: false },
      { text: "Tier 1 CEX listings", completed: false },
      { text: "Full DAO transition complete", completed: false },
      { text: "Cross-chain expansion (BSC, Arbitrum)", completed: false },
      { text: "100,000+ community members milestone", completed: false },
      { text: "Major AAA game partnership", completed: false },
      { text: "Regional gaming events & tournaments", completed: false },
    ]
  },
  {
    phase: "Phase V",
    title: "Sovereignty",
    period: "2026 & Beyond",
    status: "upcoming",
    description: "The eternal kingdom. Self-sustaining ecosystem, industry standard, and long-term vision.",
    icon: Sparkles,
    milestones: [
      { text: "50+ integrated games ecosystem", completed: false },
      { text: "Native mobile games development", completed: false },
      { text: "Real-world gaming merchandise", completed: false },
      { text: "Regalium Gaming DAO Fund", completed: false },
      { text: "Industry standard for gaming tokens", completed: false },
      { text: "Global gaming convention presence", completed: false },
      { text: "1M+ active community members", completed: false },
    ]
  }
];

function MilestoneIcon({ completed, status }: { completed: boolean; status: PhaseStatus }) {
  if (completed) {
    return <Check className="w-4 h-4 text-accent" />;
  }
  if (status === "current") {
    return <Clock className="w-4 h-4 text-gold" />;
  }
  return <Circle className="w-4 h-4 text-muted-foreground" />;
}

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const Icon = phase.icon;
  const isEven = index % 2 === 0;
  
  const statusColors = {
    completed: "border-accent/30 bg-accent/5",
    current: "border-gold/50 bg-gold/5",
    upcoming: "border-border/50 bg-card/50"
  };

  const statusBadge = {
    completed: { bg: "bg-accent/20 text-accent", text: "Completed" },
    current: { bg: "bg-gold/20 text-gold", text: "In Progress" },
    upcoming: { bg: "bg-muted text-muted-foreground", text: "Upcoming" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex ${isEven ? "md:justify-start" : "md:justify-end"}`}
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-primary/30 to-transparent -translate-x-1/2" />
      
      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-background z-10" />
      
      <div className={`w-full md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"}`}>
        <div className={`royal-card p-8 ${statusColors[phase.status]} transition-all duration-300 hover:border-gold/30`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7 text-gold" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-gold">{phase.phase}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[phase.status].bg}`}>
                  {statusBadge[phase.status].text}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">{phase.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{phase.period}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {phase.description}
          </p>

          {/* Milestones */}
          <div className="space-y-3">
            {phase.milestones.map((milestone, mIndex) => (
              <div 
                key={mIndex}
                className={`flex items-start gap-3 ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}
              >
                <MilestoneIcon completed={milestone.completed} status={phase.status} />
                <span className={`text-sm ${milestone.completed ? "line-through opacity-70" : ""}`}>
                  {milestone.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Roadmap() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50 text-sm text-muted-foreground mb-8">
              <Crown className="w-4 h-4 text-gold" />
              <span>Our Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Royal <span className="text-gradient-gold">Roadmap</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow the path of Regalium as we build the future of gaming economies. 
              Each phase brings us closer to true player sovereignty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-12 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-gradient-gold mb-2">4</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Milestones Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-gradient-gold mb-2">Phase I</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Current Phase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-gradient-gold mb-2">5</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Phases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-12 md:space-y-0">
            {roadmapData.map((phase, index) => (
              <PhaseCard key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <Crown className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Join the <span className="text-gradient-gold">Journey</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Be part of the Regalium kingdom from the beginning. Follow our progress 
              and help shape the future of gaming.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://discord.gg/regalium" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-medium"
              >
                Join Discord
              </a>
              <a 
                href="https://twitter.com/regalium" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-card border border-border hover:border-gold/30 transition-colors font-medium"
              >
                Follow on X
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
