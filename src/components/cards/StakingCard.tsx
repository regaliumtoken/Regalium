import { motion } from "framer-motion";
import { Crown, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StakingCardProps {
  tier: string;
  apy: string;
  lockPeriod: string;
  minStake: string;
  isPopular?: boolean;
  index: number;
}

export function StakingCard({ tier, apy, lockPeriod, minStake, isPopular, index }: StakingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`royal-card p-8 relative ${isPopular ? 'border-gold/50 glow-gold' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full text-xs font-semibold text-accent-foreground">
          Most Popular
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-6">
        <Crown className={`w-6 h-6 ${isPopular ? 'text-gold' : 'text-primary'}`} />
        <h3 className="text-2xl font-serif font-bold text-foreground">{tier}</h3>
      </div>

      <div className="text-5xl font-serif font-bold text-gradient-gold mb-2">
        {apy}
      </div>
      <p className="text-muted-foreground mb-8">Annual Percentage Yield</p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-sm">
          <Lock className="w-4 h-4 text-gold" />
          <span className="text-muted-foreground">Lock Period:</span>
          <span className="text-foreground font-medium ml-auto">{lockPeriod}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <TrendingUp className="w-4 h-4 text-gold" />
          <span className="text-muted-foreground">Min. Stake:</span>
          <span className="text-foreground font-medium ml-auto">{minStake}</span>
        </div>
      </div>

      <Button 
        variant={isPopular ? "gold" : "gold-outline"} 
        className="w-full"
        size="lg"
      >
        Stake Now
      </Button>
    </motion.div>
  );
}
