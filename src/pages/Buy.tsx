import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Coins, ChevronDown, ArrowRight, Shield, Zap, ExternalLink } from "lucide-react";
import { useAccount } from "wagmi";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ON_RAMP_PROVIDERS, type OnRampConfig } from "@/lib/onramp";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

const cryptoOptions = [
  { symbol: "MATIC", name: "Polygon", icon: "🟣" },
  { symbol: "ETH", name: "Ethereum", icon: "⟠" },
  { symbol: "USDC", name: "USD Coin", icon: "💵" },
  { symbol: "USDT", name: "Tether", icon: "💲" },
];

export default function Buy() {
  const { address, isConnected } = useAccount();
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "fiat">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [amount, setAmount] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(ON_RAMP_PROVIDERS[0]);

  const regaliumAmount = amount ? (parseFloat(amount) * 125.5).toFixed(2) : "0.00";
  const fiatRegaliumAmount = amount ? (parseFloat(amount) * 10.5).toFixed(2) : "0.00";

  const handleBuyWithFiat = () => {
    if (!address) return;
    
    const config: OnRampConfig = {
      walletAddress: address,
      fiatCurrency: 'USD',
      fiatAmount: parseFloat(amount) || 100,
      cryptoCurrency: 'MATIC',
      network: 'polygon',
    };
    
    selectedProvider.openWidget(config);
  };

  return (
    <Layout>
      <section className="min-h-screen py-32 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Buy <span className="text-gradient-gold">Regalium</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Acquire the crown jewel of gaming tokens
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="royal-card p-8"
            >
              {/* Payment Method Toggle */}
              <div className="flex gap-2 p-1 bg-muted rounded-xl mb-8">
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                    paymentMethod === "crypto"
                      ? "bg-card text-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Coins className="w-5 h-5" />
                  Crypto
                </button>
                <button
                  onClick={() => setPaymentMethod("fiat")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                    paymentMethod === "fiat"
                      ? "bg-card text-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Card
                </button>
              </div>

              {paymentMethod === "crypto" ? (
                <>
                  {/* Crypto Payment */}
                  <div className="space-y-6">
                    {/* From */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">You Pay</label>
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1 text-2xl h-16 bg-muted border-border/50"
                        />
                        <div className="relative">
                          <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="h-16 px-4 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors min-w-[140px]"
                          >
                            <span className="text-2xl">{selectedCrypto.icon}</span>
                            <span className="font-medium">{selectedCrypto.symbol}</span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          
                          {showDropdown && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden">
                              {cryptoOptions.map((option) => (
                                <button
                                  key={option.symbol}
                                  onClick={() => {
                                    setSelectedCrypto(option);
                                    setShowDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors"
                                >
                                  <span className="text-xl">{option.icon}</span>
                                  <div className="text-left">
                                    <div className="font-medium">{option.symbol}</div>
                                    <div className="text-xs text-muted-foreground">{option.name}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gold rotate-90" />
                      </div>
                    </div>

                    {/* To */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">You Receive</label>
                      <div className="flex gap-3">
                        <div className="flex-1 h-16 px-4 bg-muted/50 rounded-lg flex items-center text-2xl font-medium text-gradient-gold">
                          {regaliumAmount}
                        </div>
                        <div className="h-16 px-4 bg-muted/50 rounded-lg flex items-center gap-2 min-w-[140px]">
                          <span className="text-2xl">👑</span>
                          <span className="font-medium">RGLM</span>
                        </div>
                      </div>
                    </div>

                    {/* Rate info */}
                    <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                      <div className="flex justify-between mb-2">
                        <span>Rate</span>
                        <span>1 {selectedCrypto.symbol} = 125.5 RGLM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Fee</span>
                        <span>~$0.01</span>
                      </div>
                    </div>

                    {!isConnected && (
                      <Button 
                        variant="gold" 
                        size="xl" 
                        className="w-full"
                        onClick={() => {/* Wallet modal will be handled by navigation */}}
                      >
                        Connect Wallet to Buy
                      </Button>
                    )}
                    {isConnected && (
                      <Button variant="gold" size="xl" className="w-full">
                        Buy RGLM
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Fiat Payment with On-Ramp Providers */}
                  <div className="space-y-6">
                    {/* Provider Selection */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-3 block">Select Provider</label>
                      <div className="grid grid-cols-2 gap-3">
                        {ON_RAMP_PROVIDERS.map((provider) => (
                          <button
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              selectedProvider.id === provider.id
                                ? "border-gold bg-gold/10"
                                : "border-border bg-muted/50 hover:border-gold/50"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{provider.logo}</span>
                              <span className="font-semibold">{provider.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{provider.description}</p>
                            <div className="mt-2 text-xs text-gold">Fees: {provider.fees}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Amount (USD)</label>
                      <Input
                        type="number"
                        placeholder="100.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-2xl h-16 bg-muted border-border/50"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">You Receive (estimated)</label>
                      <div className="h-16 px-4 bg-muted/50 rounded-lg flex items-center justify-between">
                        <span className="text-2xl font-medium text-gradient-gold">
                          {fiatRegaliumAmount}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">👑</span>
                          <span className="font-medium">RGLM</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                      <div className="flex justify-between mb-2">
                        <span>Rate</span>
                        <span>$1 ≈ 10.5 RGLM</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Processing Fee</span>
                        <span>{selectedProvider.fees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Methods</span>
                        <span>{selectedProvider.supportedMethods.slice(0, 3).join(", ")}</span>
                      </div>
                    </div>

                    {!isConnected && (
                      <Button 
                        variant="gold" 
                        size="xl" 
                        className="w-full"
                      >
                        Connect Wallet to Continue
                      </Button>
                    )}
                    {isConnected && (
                      <Button 
                        variant="gold" 
                        size="xl" 
                        className="w-full"
                        onClick={handleBuyWithFiat}
                      >
                        <CreditCard className="w-5 h-5" />
                        Buy with {selectedProvider.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    <p className="text-center text-xs text-muted-foreground">
                      Powered by {selectedProvider.name} • Secure checkout • Funds delivered to your wallet
                    </p>
                  </div>
                </>
              )}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-8 mt-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-gold" />
                Audited Smart Contract
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-gold" />
                Instant Delivery
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
