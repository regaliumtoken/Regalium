import { motion } from "framer-motion";
import { Crown, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What is Regalium (RGLM)?",
        answer: "Regalium (RGLM) is a gaming reward token built on the Polygon blockchain. It serves as the universal currency for gaming economies, enabling players to earn, stake, and trade across multiple integrated games. Our mission is to create a player-first economy where every achievement has real value."
      },
      {
        question: "Why was Polygon chosen as the blockchain?",
        answer: "Polygon offers the perfect combination of speed, low transaction costs, and security for gaming applications. With near-instant finality and gas fees measured in fractions of a cent, Polygon enables the high-frequency, low-value transactions that gaming requires. It's also EVM-compatible, making it easy for developers to integrate."
      },
      {
        question: "Is Regalium a cryptocurrency?",
        answer: "Yes, RGLM is a cryptocurrency token specifically designed for the gaming industry. It follows the ERC-20 standard on Polygon and can be traded on decentralized exchanges. However, its primary purpose is utility within gaming ecosystems rather than pure speculation."
      },
      {
        question: "How is Regalium different from other gaming tokens?",
        answer: "Regalium focuses on creating a unified reward layer across multiple games rather than being tied to a single game. Our player-first economics, robust staking mechanism (Royal Vault), and guild governance system set us apart. We're building infrastructure, not just a token."
      }
    ]
  },
  {
    category: "Buying & Trading",
    questions: [
      {
        question: "How can I buy RGLM tokens?",
        answer: "You can purchase RGLM through our Buy page using cryptocurrency (via DEX swaps on Uniswap or 1inch) or with a credit/debit card through our integrated fiat on-ramps (MoonPay and Transak). Connect your wallet, choose your preferred payment method, and follow the prompts."
      },
      {
        question: "Which wallets are supported?",
        answer: "We support all major Web3 wallets including MetaMask, WalletConnect-compatible wallets (Trust Wallet, Rainbow, Coinbase Wallet, and more), and hardware wallets like Ledger and Trezor when connected through MetaMask."
      },
      {
        question: "What is the contract address for RGLM?",
        answer: "The official RGLM token contract address on Polygon is: 0x3772127acbd138f86fabcb2341860956b9190346. Always verify you're interacting with the correct contract to avoid scams."
      },
      {
        question: "Are there any trading fees?",
        answer: "Regalium does not charge trading fees on the token itself. However, standard DEX fees (typically 0.3% on Uniswap) and network gas fees apply when trading. Fiat on-ramps like MoonPay and Transak have their own fee structures displayed during purchase."
      }
    ]
  },
  {
    category: "Royal Vault (Staking)",
    questions: [
      {
        question: "What is the Royal Vault?",
        answer: "The Royal Vault is our staking protocol where RGLM holders can lock their tokens to earn rewards. It's designed to incentivize long-term holding and participation in the Regalium ecosystem. Stakers also gain governance voting rights."
      },
      {
        question: "What APY can I earn from staking?",
        answer: "APY varies based on the total amount staked in the vault—lower total stakes mean higher individual rewards. Current rates are displayed on the Stake page. Historical APY has ranged from 20% to 45% depending on participation levels."
      },
      {
        question: "Is there a lock-up period for staking?",
        answer: "No, there is no mandatory lock-up period. You can unstake your RGLM at any time. However, rewards are calculated based on your stake duration, so longer staking periods naturally accumulate more rewards."
      },
      {
        question: "How often are staking rewards distributed?",
        answer: "Rewards accrue continuously every second based on the reward rate. You can claim your accumulated rewards at any time through the Royal Vault interface. There's no minimum claim amount, though you'll want to consider gas costs for small claims."
      },
      {
        question: "What is the staking contract address?",
        answer: "The Royal Vault staking contract is deployed at: 0xd61994a5528197c1def33799549556501f227c97 on Polygon. This contract has been audited for security."
      }
    ]
  },
  {
    category: "Gaming Integration",
    questions: [
      {
        question: "Which games support Regalium?",
        answer: "We're currently in the process of onboarding our first game partners. Announcements will be made through our official channels as integrations go live. If you're a game developer interested in integrating, please reach out through our partnership program."
      },
      {
        question: "How do I earn RGLM in games?",
        answer: "Each integrated game has its own reward mechanisms, but common ways include: completing achievements, winning matches, reaching milestones, participating in events, and trading in-game items. Earned RGLM is sent directly to your connected wallet."
      },
      {
        question: "Can I use RGLM to buy in-game items?",
        answer: "Yes, participating games will accept RGLM for in-game purchases, premium features, and exclusive content. The exact offerings vary by game but may include cosmetics, battle passes, loot boxes, and more."
      },
      {
        question: "I'm a game developer. How can I integrate Regalium?",
        answer: "We provide a comprehensive SDK with APIs for Unity, Unreal Engine, and web-based games. Our developer documentation covers wallet integration, reward distribution, and item trading. Contact us at developers@regalium.io for partnership inquiries."
      }
    ]
  },
  {
    category: "Security & Safety",
    questions: [
      {
        question: "Has Regalium been audited?",
        answer: "Yes, our smart contracts have undergone security audits by reputable blockchain security firms. Audit reports are available in our documentation. We follow industry best practices including multi-signature admin controls and upgradeable proxy patterns."
      },
      {
        question: "How do I avoid scams?",
        answer: "Always verify contract addresses on our official website before interacting. Never share your seed phrase or private keys. Our team will never DM you first or ask for funds. Only use official links from regalium.io and be wary of fake social media accounts."
      },
      {
        question: "What happens if I send RGLM to the wrong address?",
        answer: "Blockchain transactions are irreversible. If you send tokens to an incorrect address, they cannot be recovered. Always double-check recipient addresses and use small test transactions for first-time transfers to new addresses."
      }
    ]
  },
  {
    category: "Governance",
    questions: [
      {
        question: "How does Regalium governance work?",
        answer: "RGLM holders can participate in governance through our Guild Council system. Staked tokens grant voting power on proposals affecting treasury allocation, game partnerships, protocol upgrades, and reward parameters. Larger stakes mean more voting weight."
      },
      {
        question: "How do I create a governance proposal?",
        answer: "Creating proposals requires holding at least 100,000 RGLM. Proposals go through a 7-day voting period where all stakers can vote. A quorum of 10% of circulating supply must participate for the vote to be valid. Passed proposals are executed via timelock."
      },
      {
        question: "When will full governance launch?",
        answer: "The governance module is scheduled for Phase II of our roadmap (Q2 2025). Initially, we'll start with limited governance functions and progressively decentralize more protocol decisions to the community."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur border border-border/50 text-sm text-muted-foreground mb-8">
              <Crown className="w-4 h-4 text-gold" />
              <span>Knowledge Base</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Regalium. Can't find what you're looking for? 
              Reach out to our community support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-serif font-bold text-gold mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {category.category}
                </h2>
                
                <div className="royal-card overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${category.category}-${faqIndex}`}
                        className="border-b border-border/30 last:border-0"
                      >
                        <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-muted/30 transition-colors text-foreground font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="royal-card p-12 max-w-3xl mx-auto text-center"
          >
            <MessageCircle className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">
              Still Have <span className="text-gradient-gold">Questions?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our community is here to help. Join our Discord server for real-time support, 
              or check out the documentation for technical details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://discord.gg/regalium" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="lg">
                  Join Discord Community
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Link to="/whitepaper">
                <Button variant="gold-outline" size="lg">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
