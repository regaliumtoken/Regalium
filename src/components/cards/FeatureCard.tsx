import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="royal-card p-8 group hover:border-gold/30 transition-all duration-500"
    >
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-gold" />
        </div>
        <div className="absolute inset-0 blur-2xl bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
