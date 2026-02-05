import { useState } from 'react';
import { useAccount, useDisconnect, useBalance, useChainId } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, Copy, ExternalLink, ChevronDown, Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectWalletModal } from './ConnectWalletModal';
import { useRGLMBalance } from '@/hooks/useTokenBalance';
import { polygon, mainnet, polygonMumbai } from 'wagmi/chains';

const chainIcons: Record<number, string> = {
  [polygon.id]: '🟣',
  [mainnet.id]: '🔷',
  [polygonMumbai.id]: '🟣',
};

const chainNames: Record<number, string> = {
  [polygon.id]: 'Polygon',
  [mainnet.id]: 'Ethereum',
  [polygonMumbai.id]: 'Mumbai',
};

interface ConnectWalletButtonProps {
  variant?: 'default' | 'mobile';
}

export function ConnectWalletButton({ variant = 'default' }: ConnectWalletButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: nativeBalance } = useBalance({ address });
  const { formattedBalance: rglmBalance, symbol: rglmSymbol, isValidToken } = useRGLMBalance(address);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getExplorerUrl = () => {
    if (chainId === polygon.id) {
      return `https://polygonscan.com/address/${address}`;
    }
    if (chainId === mainnet.id) {
      return `https://etherscan.io/address/${address}`;
    }
    return `https://mumbai.polygonscan.com/address/${address}`;
  };

  const formatNativeBalance = () => {
    if (!nativeBalance) return '0.0000';
    return (Number(nativeBalance.value) / Math.pow(10, nativeBalance.decimals)).toFixed(4);
  };

  if (!isConnected) {
    return (
      <>
        <Button 
          variant="gold-outline" 
          size={variant === 'mobile' ? 'default' : 'sm'}
          onClick={() => setIsModalOpen(true)}
          className={variant === 'mobile' ? 'w-full' : ''}
        >
          <Wallet className="w-4 h-4" />
          Connect
        </Button>
        <ConnectWalletModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="glass"
        size={variant === 'mobile' ? 'default' : 'sm'}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`gap-2 ${variant === 'mobile' ? 'w-full justify-between' : ''}`}
      >
        <span className="flex items-center gap-2">
          <span className="text-sm">{chainIcons[chainId] || '🔗'}</span>
          <span className="text-gold font-medium">{truncateAddress(address!)}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute z-50 mt-2 ${
                variant === 'mobile' ? 'left-0 right-0' : 'right-0 w-80'
              } royal-card p-4 space-y-4`}
            >
              {/* Network indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Connected to {chainNames[chainId] || 'Unknown Network'}
              </div>

              {/* RGLM Balance - Primary */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-gold/10 to-primary/10 border border-gold/20">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4 text-gold" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">RGLM Balance</span>
                </div>
                <p className="text-2xl font-serif font-bold text-gradient-gold">
                  {isValidToken ? rglmBalance : '—'} <span className="text-lg">{rglmSymbol}</span>
                </p>
                {!isValidToken && (
                  <p className="text-xs text-muted-foreground mt-1">Token not deployed on this network</p>
                )}
              </div>

              {/* Native Balance */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Native Balance</p>
                <p className="text-lg font-semibold">
                  {formatNativeBalance()} <span className="text-muted-foreground">{nativeBalance?.symbol || 'ETH'}</span>
                </p>
              </div>

              {/* Address with copy */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                <code className="flex-1 text-xs text-muted-foreground font-mono">
                  {truncateAddress(address!)}
                </code>
                <button
                  onClick={copyAddress}
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={getExplorerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Disconnect */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
