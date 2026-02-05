import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import { 
  Wallet, Crown, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Gift, Clock, ExternalLink, Copy, Shield, AlertCircle 
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useRGLMBalance } from "@/hooks/useTokenBalance";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { polygon, mainnet, polygonMumbai } from "wagmi/chains";
import { useState } from "react";

// Mock staking data - would come from a smart contract in production
const mockStakingData = {
  stakedAmount: "12,500.00",
  pendingRewards: "312.50",
  totalEarned: "1,856.75",
};

// Mock activity - would come from on-chain events in production
const mockActivity = [
  { type: "Stake", amount: "+5,000 RGLM", date: "2 hours ago", status: "completed", isPositive: true },
  { type: "Claim Rewards", amount: "+125.5 RGLM", date: "1 day ago", status: "completed", isPositive: true },
  { type: "Swap", amount: "-1,000 RGLM", date: "3 days ago", status: "completed", isPositive: false },
  { type: "Buy", amount: "+2,500 RGLM", date: "5 days ago", status: "completed", isPositive: true },
  { type: "Stake", amount: "+7,500 RGLM", date: "1 week ago", status: "completed", isPositive: true },
];

const chainExplorers: Record<number, string> = {
  [polygon.id]: "https://polygonscan.com",
  [mainnet.id]: "https://etherscan.io",
  [polygonMumbai.id]: "https://mumbai.polygonscan.com",
};

const chainNames: Record<number, string> = {
  [polygon.id]: "Polygon",
  [mainnet.id]: "Ethereum", 
  [polygonMumbai.id]: "Mumbai Testnet",
};

function NotConnectedState() {
  return (
    <Layout>
      <section className="py-32 relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center">
            <Wallet className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">
            Connect Your <span className="text-gradient-gold">Wallet</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect your wallet to view your Royal Dashboard, track balances, staking rewards, and transaction history.
          </p>
          <ConnectWalletButton variant="mobile" />
        </motion.div>
      </section>
    </Layout>
  );
}

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: nativeBalance, isLoading: isNativeLoading } = useBalance({ address });
  const { 
    formattedBalance: rglmBalance, 
    rawBalance: rglmRawBalance,
    isLoading: isRGLMLoading,
    isValidToken 
  } = useRGLMBalance(address);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const getExplorerUrl = () => {
    const base = chainExplorers[chainId] || chainExplorers[polygon.id];
    return `${base}/address/${address}`;
  };

  // Calculate USD value (mock rate - would use price oracle in production)
  const mockUSDRate = 0.50; // $0.50 per RGLM
  const usdValue = (rglmRawBalance * mockUSDRate).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Portfolio breakdown based on real + mock data
  const availableAmount = rglmRawBalance;
  const stakedAmount = parseFloat(mockStakingData.stakedAmount.replace(',', ''));
  const totalAmount = availableAmount + stakedAmount;
  const availablePercent = totalAmount > 0 ? Math.round((availableAmount / totalAmount) * 100) : 50;
  const stakedPercent = 100 - availablePercent;

  const portfolioBreakdown = [
    { label: "Available", value: availablePercent, amount: `${rglmBalance} RGLM`, color: "bg-gold" },
    { label: "Staked", value: stakedPercent, amount: `${mockStakingData.stakedAmount} RGLM`, color: "bg-primary" },
  ];

  if (!isConnected) {
    return <NotConnectedState />;
  }

  return (
    <Layout>
      <section className="py-32 relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                Royal <span className="text-gradient-gold">Dashboard</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-mono">{truncateAddress(address!)}</span>
                  <button 
                    onClick={copyAddress} 
                    className="p-1 hover:text-gold transition-colors"
                    title={copied ? "Copied!" : "Copy address"}
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{chainNames[chainId] || 'Unknown Network'}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={getExplorerUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="gold-outline">
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </Button>
              </a>
              <Button variant="outline" onClick={() => disconnect()}>
                <Wallet className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </motion.div>

          {/* Token not deployed warning */}
          {!isValidToken && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl bg-gold/10 border border-gold/30 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gold">RGLM Token Not Deployed</p>
                <p className="text-sm text-muted-foreground">
                  The RGLM token contract has not been deployed on {chainNames[chainId] || 'this network'} yet. 
                  Balances shown are for demonstration purposes.
                </p>
              </div>
            </motion.div>
          )}

          {/* Main Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                icon: Crown, 
                label: "RGLM Balance", 
                value: isRGLMLoading ? "Loading..." : rglmBalance, 
                subvalue: usdValue, 
                gradient: true 
              },
              { 
                icon: Shield, 
                label: "Staked Amount", 
                value: mockStakingData.stakedAmount, 
                subvalue: "RGLM" 
              },
              { 
                icon: Gift, 
                label: "Pending Rewards", 
                value: mockStakingData.pendingRewards, 
                subvalue: "RGLM", 
                highlight: true 
              },
              { 
                icon: TrendingUp, 
                label: "Total Earned", 
                value: mockStakingData.totalEarned, 
                subvalue: "RGLM" 
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`royal-card p-6 ${stat.highlight ? 'border-gold/30 glow-gold' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gold" />
                  </div>
                  {stat.highlight && (
                    <Button variant="gold" size="sm">Claim</Button>
                  )}
                </div>
                <div className={`text-2xl md:text-3xl font-serif font-bold mb-1 ${stat.gradient ? 'text-gradient-gold' : ''}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.subvalue}</div>
                <div className="text-xs text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Native Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 royal-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-lg">{chainId === mainnet.id ? '🔷' : '🟣'}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Native Balance</p>
                  <p className="font-semibold">
                    {isNativeLoading ? 'Loading...' : 
                      `${nativeBalance ? (Number(nativeBalance.value) / Math.pow(10, nativeBalance.decimals)).toFixed(4) : '0.0000'} ${nativeBalance?.symbol || 'ETH'}`
                    }
                  </p>
                </div>
              </div>
              <Link to="/buy">
                <Button variant="gold-outline" size="sm">Buy More</Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Portfolio Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="royal-card p-6"
            >
              <h3 className="text-lg font-serif font-semibold mb-6">Portfolio Breakdown</h3>
              
              {/* Visual chart */}
              <div className="relative h-4 bg-muted rounded-full overflow-hidden mb-6">
                {portfolioBreakdown.map((item, index) => (
                  <div
                    key={item.label}
                    className={`absolute top-0 h-full ${item.color} transition-all duration-500`}
                    style={{
                      left: index === 0 ? 0 : `${portfolioBreakdown[0].value}%`,
                      width: `${item.value}%`,
                    }}
                  />
                ))}
              </div>
              
              <div className="space-y-4">
                {portfolioBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.amount}</div>
                      <div className="text-xs text-muted-foreground">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex gap-2">
                  <Link to="/stake" className="flex-1">
                    <Button variant="gold" className="w-full">Stake More</Button>
                  </Link>
                  <Link to="/stake" className="flex-1">
                    <Button variant="gold-outline" className="w-full">Unstake</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 royal-card p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-semibold">Recent Activity</h3>
                <a 
                  href={getExplorerUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:underline flex items-center gap-1"
                >
                  View All <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="space-y-4">
                {mockActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.isPositive ? 'bg-accent/10' : 'bg-destructive/10'
                    }`}>
                      {activity.isPositive ? (
                        <ArrowUpRight className="w-5 h-5 text-accent" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.date}
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      activity.isPositive ? 'text-accent' : 'text-destructive'
                    }`}>
                      {activity.amount}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded-full">
                      {activity.status}
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                Activity data is simulated. Connect to a deployed RGLM contract for real transaction history.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
