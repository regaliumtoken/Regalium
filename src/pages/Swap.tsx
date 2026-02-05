import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, ChevronDown, Settings, Info, ExternalLink } from "lucide-react";
import { useAccount, useChainId } from "wagmi";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEX_PROVIDERS, getRGLMLiquidityLinks, type SwapConfig } from "@/lib/dex";
import { RGLM_TOKEN } from "@/lib/tokens";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

const tokens = [
  { symbol: "MATIC", name: "Polygon", icon: "🟣", balance: "1,234.56", address: "NATIVE" },
  { symbol: "ETH", name: "Ethereum", icon: "⟠", balance: "2.45", address: "NATIVE" },
  { symbol: "USDC", name: "USD Coin", icon: "💵", balance: "5,678.90", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" },
  { symbol: "RGLM", name: "Regalium", icon: "👑", balance: "12,500.00", address: "0x3772127acbd138f86fabcb2341860956b9190346" },
  { symbol: "WETH", name: "Wrapped ETH", icon: "⟠", balance: "1.25", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" },
];

export default function Swap() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[3]);
  const [fromAmount, setFromAmount] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [selectedDex, setSelectedDex] = useState(DEX_PROVIDERS[0]);

  const toAmount = fromAmount ? (parseFloat(fromAmount) * 125.5).toFixed(2) : "";

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount("");
  };

  const handleSwapOnDex = () => {
    const config: SwapConfig = {
      inputToken: fromToken.address === "NATIVE" ? fromToken.symbol : fromToken.address,
      outputToken: toToken.address === "NATIVE" ? toToken.symbol : toToken.address,
      inputAmount: fromAmount,
      chainId,
      slippage: parseFloat(slippage),
    };
    
    selectedDex.openSwap(config);
  };

  const liquidityLinks = getRGLMLiquidityLinks(chainId);

  return (
    <Layout>
      <section className="min-h-screen py-32 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[180px]" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                <span className="text-gradient-gold">Royal</span> Exchange
              </h1>
              <p className="text-xl text-muted-foreground">
                Swap tokens with regal efficiency
              </p>
            </motion.div>

            {/* DEX Provider Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center gap-3 mb-6"
            >
              {DEX_PROVIDERS.map((dex) => (
                <button
                  key={dex.id}
                  onClick={() => setSelectedDex(dex)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    selectedDex.id === dex.id
                      ? "bg-gold/20 border border-gold text-gold"
                      : "bg-card/50 border border-border hover:border-gold/50"
                  }`}
                >
                  <span className="text-lg">{dex.logo}</span>
                  <span className="font-medium">{dex.name}</span>
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="royal-card p-6"
            >
              {/* Settings */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-lg font-semibold">Swap via {selectedDex.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm">
                    <span className="text-muted-foreground">Slippage:</span>
                    <input
                      type="text"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="w-10 bg-transparent text-right focus:outline-none"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* From Token */}
              <div className="relative">
                <div className="p-4 bg-muted rounded-xl mb-2">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>You Pay</span>
                    <span>Balance: {fromToken.balance}</span>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 text-2xl h-14 bg-transparent border-0 p-0 focus-visible:ring-0"
                    />
                    <button
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                      className="h-14 px-4 bg-card rounded-xl flex items-center gap-2 hover:bg-card/80 transition-colors"
                    >
                      <span className="text-xl">{fromToken.icon}</span>
                      <span className="font-medium">{fromToken.symbol}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {["25%", "50%", "75%", "MAX"].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => {
                          const balance = parseFloat(fromToken.balance.replace(",", ""));
                          const percentage = pct === "MAX" ? 1 : parseInt(pct) / 100;
                          setFromAmount((balance * percentage).toFixed(2));
                        }}
                        className="px-3 py-1 text-xs bg-card rounded-lg hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        {pct}
                      </button>
                    ))}
                  </div>
                </div>

                {showFromDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto">
                    {tokens.filter(t => t.symbol !== toToken.symbol).map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => {
                          setFromToken(token);
                          setShowFromDropdown(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors"
                      >
                        <span className="text-xl">{token.icon}</span>
                        <div className="text-left flex-1">
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                        <span className="text-sm text-muted-foreground">{token.balance}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={handleSwapTokens}
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <ArrowDownUp className="w-5 h-5" />
                </button>
              </div>

              {/* To Token */}
              <div className="relative">
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>You Receive</span>
                    <span>Balance: {toToken.balance}</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 text-2xl h-14 flex items-center font-medium text-gradient-gold">
                      {toAmount || "0.00"}
                    </div>
                    <button
                      onClick={() => setShowToDropdown(!showToDropdown)}
                      className="h-14 px-4 bg-card rounded-xl flex items-center gap-2 hover:bg-card/80 transition-colors"
                    >
                      <span className="text-xl">{toToken.icon}</span>
                      <span className="font-medium">{toToken.symbol}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {showToDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto">
                    {tokens.filter(t => t.symbol !== fromToken.symbol).map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => {
                          setToToken(token);
                          setShowToDropdown(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors"
                      >
                        <span className="text-xl">{token.icon}</span>
                        <div className="text-left flex-1">
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                        <span className="text-sm text-muted-foreground">{token.balance}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rate Info */}
              {fromAmount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-muted/50 rounded-xl text-sm space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      Rate
                      <Info className="w-3 h-3" />
                    </span>
                    <span>1 {fromToken.symbol} ≈ 125.5 {toToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Impact</span>
                    <span className="text-accent">&lt;0.01%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span>~$0.02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DEX</span>
                    <span className="text-gold">{selectedDex.name}</span>
                  </div>
                </motion.div>
              )}

              {isConnected ? (
                <Button 
                  variant="gold" 
                  size="xl" 
                  className="w-full mt-6"
                  onClick={handleSwapOnDex}
                  disabled={!fromAmount}
                >
                  {fromAmount ? (
                    <>
                      Swap on {selectedDex.name}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Enter Amount"
                  )}
                </Button>
              ) : (
                <div className="mt-6">
                  <Button 
                    variant="gold" 
                    size="xl" 
                    className="w-full"
                  >
                    Connect Wallet to Swap
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-4"
            >
              {/* Network badges */}
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full text-sm">
                  <span className="text-lg">🟣</span>
                  <span className="text-muted-foreground">Polygon Network</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full text-sm">
                  <span className="text-lg">⟠</span>
                  <span className="text-muted-foreground">Ethereum</span>
                </div>
              </div>

              {/* Liquidity Links */}
              {liquidityLinks && (
                <div className="flex justify-center gap-4 text-sm">
                  <a 
                    href={liquidityLinks.dexScreener} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-muted-foreground hover:text-gold transition-colors"
                  >
                    <span>📊</span> DEX Screener
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={liquidityLinks.dexTools} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-muted-foreground hover:text-gold transition-colors"
                  >
                    <span>🛠</span> DexTools
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
