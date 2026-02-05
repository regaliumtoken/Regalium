import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { NetworkSwitcher } from "@/components/wallet/NetworkSwitcher";
import crownImg from "@/assets/Regalium-removebg-preview.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/countdown", label: "Launch" },
  { href: "/buy", label: "Buy" },
  { href: "/swap", label: "Swap" },
  { href: "/stake", label: "Vault" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/faq", label: "FAQ" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border/30" />

      <div className="container relative mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-auto flex items-center">
              <img
                src={crownImg}
                alt="Regalium Logo"
                className="
        h-16 w-auto
        object-contain
        transition-transform duration-300
        group-hover:scale-105
      "
              />

              <div className="absolute inset-0 blur-xl bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <span className="text-2xl font-serif font-bold text-gradient-gold">
              Regalium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <NetworkSwitcher />
            <ConnectWalletButton />
            <Link to="/buy">
              <Button variant="gold" size="sm">
                Buy Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative bg-card/95 backdrop-blur-xl border-b border-border/30"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-lg font-medium transition-colors ${
                      location.pathname === link.href
                        ? "text-gold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                <ConnectWalletButton variant="mobile" />
                <Link to="/buy" onClick={() => setIsOpen(false)}>
                  <Button variant="gold" className="w-full">
                    Buy Regalium
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
