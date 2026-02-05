import { motion } from "framer-motion";
import { Crown, Shield, Code, Briefcase } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TeamCard } from "@/components/cards/TeamCard";

const teamMembers = [
  {
    name: "Alexander Sterling",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Victoria Crown",
    role: "Co-Founder & CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Marcus Knight",
    role: "Lead Blockchain Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
  },
  {
    name: "Elena Valor",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "James Noble",
    role: "Lead Smart Contract Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Sophia Grace",
    role: "Head of Community",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
  },
];

const advisors = [
  {
    name: "Dr. Richard Monarch",
    role: "Strategic Advisor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Catherine Reign",
    role: "Gaming Industry Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    twitter: "#",
    linkedin: "#",
  },
];

const values = [
  {
    icon: Crown,
    title: "Excellence",
    description: "We pursue the highest standards in everything we build, befitting royalty.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Your assets are protected by enterprise-grade security and audited contracts.",
  },
  {
    icon: Code,
    title: "Innovation",
    description: "Pushing the boundaries of what's possible in gaming economies.",
  },
  {
    icon: Briefcase,
    title: "Integrity",
    description: "Transparent operations and honest communication with our community.",
  },
];

export default function Team() {
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
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50 text-sm text-muted-foreground mb-6">
              <Crown className="w-4 h-4 text-gold" />
              <span>The Royal Court</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Meet the <span className="text-gradient-gold">Nobility</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A distinguished assembly of blockchain pioneers, gaming veterans, and visionaries building the future of gaming economies.
            </p>
          </motion.div>

          {/* Core Team */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-serif font-bold mb-8 text-center"
            >
              Core <span className="text-gradient-gold">Leadership</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <TeamCard key={member.name} {...member} index={index} />
              ))}
            </div>
          </div>

          {/* Advisors */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-serif font-bold mb-8 text-center"
            >
              Royal <span className="text-gradient-gold">Advisors</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {advisors.map((advisor, index) => (
                <TeamCard key={advisor.name} {...advisor} index={index} />
              ))}
            </div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Join CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="royal-card p-12 max-w-2xl mx-auto">
              <Crown className="w-12 h-12 text-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Join the Kingdom</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for exceptional talent to join our royal court. 
                If you're passionate about blockchain and gaming, we'd love to hear from you.
              </p>
              <a 
                href="mailto:careers@regalium.io" 
                className="inline-flex items-center gap-2 text-gold hover:underline"
              >
                careers@regalium.io
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
