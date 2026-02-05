import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Lock, Gift, TrendingUp, Clock, Coins } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StakingCard } from "@/components/cards/StakingCard";

const stakingTiers = [
  { tier: "Knight", apy: "15%", lockPeriod: "30 Days", minStake: "1,000 RGLM", isPopular: false },
  { tier: "Baron", apy: "25%", lockPeriod: "90 Days", minStake: "5,000 RGLM", isPopular: true },
  { tier: "Duke", apy: "35%", lockPeriod: "180 Days", minStake: "25,000 RGLM", isPopular: false },
  { tier: "King", apy: "45%", lockPeriod: "365 Days", minStake: "100,000 RGLM", isPopular: false },
];

const userStakes = [
  { tier: "Baron", amount: "10,000", rewards: "625.50", endDate: "Mar 15, 2025", progress: 65 },
  { tier: "Knight", amount: "2,500", rewards: "93.75", endDate: "Feb 1, 2025", progress: 85 },
];

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <Layout>
      <section className="py-32 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[180px]" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50 text-sm text-muted-foreground mb-6">
              <Crown className="w-4 h-4 text-gold" />
              <span>The Royal Vault</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Stake & <span className="text-gradient-gold">Reign</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lock your Regalium in the Royal Vault and earn rewards fit for nobility.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { icon: Lock, label: "Total Staked", value: "45.2M RGLM" },
              { icon: TrendingUp, label: "Max APY", value: "45%" },
              { icon: Gift, label: "Rewards Paid", value: "2.8M RGLM" },
              { icon: Coins, label: "Your Staked", value: "12,500 RGLM" },
            ].map((stat, index) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                <div className="text-2xl font-serif font-bold text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Staking Tiers */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-serif font-bold mb-8 text-center"
            >
              Choose Your <span className="text-gradient-gold">Title</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stakingTiers.map((tier, index) => (
                <StakingCard key={tier.tier} {...tier} index={index} />
              ))}
            </div>
          </div>

          {/* Active Stakes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">
              Your <span className="text-gradient-gold">Active Stakes</span>
            </h2>
            
            <div className="space-y-4">
              {userStakes.map((stake, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="royal-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <div className="font-serif font-semibold text-lg">{stake.tier} Stake</div>
                        <div className="text-sm text-muted-foreground">{stake.amount} RGLM</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{stake.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-500"
                          style={{ width: `${stake.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Rewards</div>
                        <div className="font-semibold text-gold">{stake.rewards} RGLM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Ends
                        </div>
                        <div className="font-semibold">{stake.endDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="gold-outline" size="sm">Claim</Button>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stake */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 royal-card p-8 text-center"
            >
              <h3 className="text-xl font-serif font-semibold mb-4">Quick Stake</h3>
              <p className="text-muted-foreground mb-6">
                Enter an amount to see available staking options
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="number"
                  placeholder="Enter RGLM amount"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="flex-1 h-12 bg-muted border-border/50"
                />
                <Button variant="gold" size="lg">
                  Stake Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
