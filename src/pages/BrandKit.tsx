import { Layout } from "@/components/layout/Layout";
import { 
  Download, 
  Crown, 
  Palette, 
  Type, 
  Image as ImageIcon,
  FileText,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const brandColors = [
  { name: "Royal Gold", hex: "#D4AF37", class: "bg-gold" },
  { name: "Gold Light", hex: "#E8C547", class: "bg-gold-light" },
  { name: "Gold Dark", hex: "#B8860B", class: "bg-gold-dark" },
  { name: "Royal Purple", hex: "#5B21B6", class: "bg-royal-purple" },
  { name: "Deep Obsidian", hex: "#0A0A0F", class: "bg-background" },
  { name: "Card Background", hex: "#1A1A2E", class: "bg-card" },
];

const downloadAssets = [
  {
    title: "Logo Package",
    description: "Primary and secondary logos in SVG, PNG, and PDF formats",
    formats: ["SVG", "PNG", "PDF"],
    size: "2.4 MB",
  },
  {
    title: "Icon Set",
    description: "Crown icons and app icons in various sizes",
    formats: ["SVG", "PNG", "ICO"],
    size: "1.8 MB",
  },
  {
    title: "Social Media Kit",
    description: "Profile pictures, banners, and post templates",
    formats: ["PNG", "PSD", "Figma"],
    size: "8.5 MB",
  },
  {
    title: "Press Kit",
    description: "Official descriptions, facts, and media resources",
    formats: ["PDF", "DOCX"],
    size: "3.2 MB",
  },
];

const guidelines = [
  "Always maintain clear space around the logo equal to the crown height",
  "Never stretch, rotate, or apply effects to the logo",
  "Use the gold logo on dark backgrounds, dark logo on light backgrounds",
  "Minimum logo size is 32px for digital and 10mm for print",
  "The crown icon can be used independently as a favicon or app icon",
];

export default function BrandKit() {
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
              <Palette className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Brand Assets</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              <span className="text-gradient-gold">Brand</span> Kit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Official Regalium brand assets and guidelines for partners, 
              media, and community members.
            </p>
          </motion.div>

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10 flex items-center justify-center gap-3">
              <Crown className="w-6 h-6 text-gold" />
              Logo
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Dark Background */}
              <div className="royal-card p-12 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <Crown className="w-16 h-16 text-gold" />
                  <span className="text-4xl font-serif font-bold text-gradient-gold">
                    Regalium
                  </span>
                </div>
              </div>
              {/* Light Background */}
              <div className="rounded-xl border border-border/50 p-12 flex items-center justify-center bg-white">
                <div className="flex items-center gap-4">
                  <Crown className="w-16 h-16 text-gold-dark" />
                  <span className="text-4xl font-serif font-bold text-gray-900">
                    Regalium
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10 flex items-center justify-center gap-3">
              <Palette className="w-6 h-6 text-gold" />
              Color Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {brandColors.map((color) => (
                <div key={color.name} className="text-center">
                  <div 
                    className={`w-full aspect-square rounded-xl mb-3 border border-border/30 ${color.class}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="font-medium text-foreground text-sm">{color.name}</p>
                  <p className="text-muted-foreground text-xs">{color.hex}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10 flex items-center justify-center gap-3">
              <Type className="w-6 h-6 text-gold" />
              Typography
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="royal-card p-8">
                <h3 className="text-lg text-muted-foreground mb-4">Display Font</h3>
                <p className="text-5xl font-serif font-bold text-foreground mb-2">
                  Cormorant Garamond
                </p>
                <p className="text-muted-foreground">
                  Used for headings, titles, and brand elements
                </p>
              </div>
              <div className="royal-card p-8">
                <h3 className="text-lg text-muted-foreground mb-4">Body Font</h3>
                <p className="text-5xl font-sans font-medium text-foreground mb-2">
                  Inter
                </p>
                <p className="text-muted-foreground">
                  Used for body text, UI elements, and interfaces
                </p>
              </div>
            </div>
          </motion.div>

          {/* Download Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10 flex items-center justify-center gap-3">
              <ImageIcon className="w-6 h-6 text-gold" />
              Download Assets
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {downloadAssets.map((asset) => (
                <div
                  key={asset.title}
                  className="royal-card p-6 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-foreground">
                        {asset.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {asset.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {asset.size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {asset.formats.map((format) => (
                        <span
                          key={format}
                          className="text-xs text-gold bg-gold/10 px-2 py-1 rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-serif font-bold text-center mb-10 flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-gold" />
              Usage Guidelines
            </h2>
            <div className="royal-card p-8 max-w-3xl mx-auto">
              <ul className="space-y-4">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{guideline}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-border/30 text-center">
                <Button className="royal-button">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Brand Guidelines (PDF)
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
