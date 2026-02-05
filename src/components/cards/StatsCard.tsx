import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string;
  suffix?: string;
  index: number;
}

export function StatsCard({ label, value, suffix, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold mb-2">
        {value}
        {suffix && <span className="text-gold-light">{suffix}</span>}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}
