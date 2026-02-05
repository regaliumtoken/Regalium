import { Layout } from "@/components/layout/Layout";
import { 
  MessageCircle, 
  Mail, 
  Twitter, 
  HelpCircle, 
  ExternalLink,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join our royal community for real-time support and discussions.",
    action: "Join Discord",
    href: "#",
    response: "Instant",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    description: "Follow us for announcements and quick support via DMs.",
    action: "Follow @Regalium",
    href: "#",
    response: "< 24 hours",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "For detailed inquiries and partnership requests.",
    action: "support@regalium.io",
    href: "mailto:support@regalium.io",
    response: "1-2 business days",
  },
];

const popularTopics = [
  { label: "How do I connect my wallet?", href: "/faq" },
  { label: "Where can I buy RGLM tokens?", href: "/buy" },
  { label: "How does staking work?", href: "/stake" },
  { label: "What networks are supported?", href: "/faq" },
  { label: "How do I claim rewards?", href: "/stake" },
  { label: "Is Regalium audited?", href: "/audit" },
];

export default function Support() {
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
              <HelpCircle className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              How Can We <span className="text-gradient-gold">Help</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our royal support team is here to assist you. Choose your preferred 
              channel or browse our resources.
            </p>
          </motion.div>

          {/* Support Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-20"
          >
            {supportChannels.map((channel, index) => (
              <a
                key={channel.title}
                href={channel.href}
                className="royal-card p-8 hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <channel.icon className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-xl font-serif font-bold text-foreground mb-2">
                  {channel.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {channel.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Response: {channel.response}</span>
                </div>
                <Button variant="outline" className="w-full group-hover:border-gold/50">
                  {channel.action}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ))}
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-gold" />
                Popular Topics
              </h2>
              <div className="royal-card p-6">
                <ul className="space-y-4">
                  {popularTopics.map((topic) => (
                    <li key={topic.label}>
                      <Link
                        to={topic.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gold/5 transition-colors group"
                      >
                        <span className="text-foreground/80 group-hover:text-gold transition-colors">
                          {topic.label}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border/30">
                  <Link to="/faq">
                    <Button variant="outline" className="w-full">
                      View All FAQs
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-gold" />
                Send a Message
              </h2>
              <div className="royal-card p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Name
                      </label>
                      <Input placeholder="Your name" className="bg-background/50" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Email
                      </label>
                      <Input placeholder="your@email.com" type="email" className="bg-background/50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="How can we help?" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Describe your issue or question..."
                      className="bg-background/50 min-h-[120px]"
                    />
                  </div>
                  <Button className="royal-button w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20"
          >
            <div className="royal-card p-12 text-center bg-gradient-to-br from-gold/5 to-transparent">
              <Users className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-4">
                Join Our Royal Community
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Connect with over 50,000 members in our Discord community. 
                Get help, share strategies, and stay updated on the latest developments.
              </p>
              <Button className="royal-button">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
