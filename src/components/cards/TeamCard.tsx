import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  index: number;
}

export function TeamCard({ name, role, image, twitter, linkedin, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="royal-card overflow-hidden group"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Social overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {twitter && (
            <a
              href={twitter}
              className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:text-gold transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:text-gold transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
          {name}
        </h3>
        <p className="text-gold text-sm font-medium">
          {role}
        </p>
      </div>
    </motion.div>
  );
}
