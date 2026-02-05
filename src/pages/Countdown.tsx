import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Bell } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const launchDate = new Date();
  launchDate.setFullYear(launchDate.getFullYear() + 1);
  
  const difference = launchDate.getTime() - new Date().getTime();
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownUnit({ value, label, index }: { value: number; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center"
    >
      <div className="relative">
        <div className="countdown-number animate-glow-pulse">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="absolute inset-0 blur-3xl bg-gold/20 -z-10" />
      </div>
      <div className="text-sm md:text-base text-muted-foreground uppercase tracking-[0.3em] mt-4">
        {label}
      </div>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscription
    alert(`Thank you! ${email} has been added to the royal notification list.`);
    setEmail("");
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-glow/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <Crown className="w-20 h-20 text-gold mx-auto mb-8 float" />
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                The <span className="text-gradient-gold">Royal Launch</span> Awaits
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Prepare your kingdom. The crown jewel of gaming tokens is almost here.
              </p>
            </motion.div>

            {/* Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
              <CountdownUnit value={timeLeft.days} label="Days" index={0} />
              <CountdownUnit value={timeLeft.hours} label="Hours" index={1} />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" index={2} />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" index={3} />
            </div>

            {/* Crown divider */}
            <div className="crown-divider mb-12">
              <Crown className="w-8 h-8 text-gold/50 mx-4" />
            </div>

            {/* Email signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <h3 className="text-xl font-serif font-semibold mb-4">
                Be First to Know
              </h3>
              <p className="text-muted-foreground mb-6">
                Join the royal notification list and receive exclusive updates.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-card border-border/50 focus:border-gold"
                  required
                />
                <Button type="submit" variant="gold">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </form>
            </motion.div>

            {/* Features preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Early Access", desc: "Priority access to token sale" },
                { title: "Bonus Rewards", desc: "Exclusive launch bonuses" },
                { title: "Founding Member", desc: "Special governance rights" },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="glass-card p-6 text-center"
                >
                  <h4 className="font-serif font-semibold text-gold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
