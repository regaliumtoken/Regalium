import {
  motion,
  useScroll,
  useTransform,
  Variants,
  Easing,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Crown,
  Hexagon,
  Coins,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { StatsCard } from "@/components/cards/StatsCard";
import heroImage from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Hexagon,
    title: "Built on Polygon",
    description:
      "Lightning-fast transactions with minimal gas fees. Experience the future of blockchain gaming on the most efficient network.",
  },
  {
    icon: Coins,
    title: "Player-First Economy",
    description:
      "Rewards that matter. Earn, trade, and grow your wealth in an ecosystem designed for gamers, by gamers.",
  },
  {
    icon: Zap,
    title: "Seamless Rewards",
    description:
      "Instant payouts, automatic staking rewards, and frictionless integration with your favorite games.",
  },
  {
    icon: Shield,
    title: "Royal Security",
    description:
      "Multi-audited smart contracts and enterprise-grade security protecting your kingdom of assets.",
  },
  {
    icon: Users,
    title: "Guild Governance",
    description:
      "Shape the future of Regalium through decentralized governance. Your voice, your realm.",
  },
  {
    icon: Sparkles,
    title: "Exclusive Benefits",
    description:
      "Access premium game content, early launches, and exclusive partnerships as a Regalium holder.",
  },
];

const stats = [
  { label: "Total Value Locked", value: "$12.5", suffix: "M" },
  { label: "Active Stakers", value: "24", suffix: "K+" },
  { label: "Games Integrated", value: "18", suffix: "" },
  { label: "APY Up To", value: "45", suffix: "%" },
];

// Staggered text animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

function AnimatedTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Index() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        {/* Animated Decorative Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-[150px]"
        />

        {/* Floating Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="absolute top-1/3 right-1/4 hidden lg:block"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Crown className="w-32 h-32 text-gold/20" />
            <div className="absolute inset-0 blur-2xl bg-gold/10" />
          </motion.div>
        </motion.div>

        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-gold/20 text-sm text-muted-foreground shimmer">
                <Crown className="w-4 h-4 text-gold" />
                <span>The Crown Jewel of Gaming Tokens</span>
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
            </motion.div>

            {/* Animated Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-8">
              <AnimatedTitle text="Rule Your" className="block" />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                className="text-gradient-gold inline-block"
              >
                Gaming
              </motion.span>
              <AnimatedTitle text=" Empire" className="" />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Ascend to the throne of gaming wealth. Regalium is the royal
              reward token powering the next generation of gaming economies on
              Polygon.
              <span className="text-gold font-medium">
                {" "}
                Stake, earn, and reign supreme.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="gold" size="xl" className="group">
                <Link to="/buy">
                  Claim Your Throne
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
              <Button asChild variant="gold-outline" size="xl">
                <Link to="/stake">Enter Royal Vault</Link>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12 flex flex-wrap justify-center gap-4 text-sm"
            >
              <Link
                to="/whitepaper"
                className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                Read Whitepaper <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/roadmap"
                className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                View Roadmap <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/faq"
                className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                FAQ <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
        <br />
        <br />

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Discover More
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30"
          >
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} {...stat} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

        {/* Decorative orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[200px]"
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-primary/10 mb-6"
            >
              <Crown className="w-8 h-8 text-gold" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              The <span className="text-gradient-gold">Royal</span> Advantage
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover why Regalium stands above all other gaming tokens in the
              realm.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/5 to-primary/10" />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [-50, 50, -50],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[200px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [50, -50, 50],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]"
          />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="royal-card p-12 md:p-20 text-center max-w-4xl mx-auto border-gold/20 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer opacity-50" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-gold/10 rounded-full"
            />

            <Crown className="w-16 h-16 text-gold mx-auto mb-8 relative z-10" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 relative z-10">
              Join the <span className="text-gradient-gold">Royal Court</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto relative z-10">
              Your journey to gaming royalty awaits. Buy, stake, and earn
              rewards fit for a king.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button asChild variant="gold" size="xl">
                <Link to="/countdown">
                  View Launch Countdown
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
