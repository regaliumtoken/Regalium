import { useState } from 'react';
import { useSwitchChain, useChainId, useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { polygon, mainnet, polygonMumbai } from 'wagmi/chains';

const chains = [
  { ...polygon, icon: '🟣', color: 'text-purple-400' },
  { ...mainnet, icon: '🔷', color: 'text-blue-400' },
  { ...polygonMumbai, icon: '🟣', color: 'text-purple-300' },
];

export function NetworkSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { switchChain, isPending, error } = useSwitchChain();
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const currentChain = chains.find(c => c.id === chainId) || chains[0];

  if (!isConnected) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-secondary/50 transition-colors"
      >
        <span className="text-lg">{currentChain.icon}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentChain.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-56 royal-card p-2 space-y-1"
            >
              <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                Select Network
              </p>
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => {
                    switchChain({ chainId: chain.id });
                    setIsOpen(false);
                  }}
                  disabled={isPending || chain.id === chainId}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    chain.id === chainId
                      ? 'bg-gold/10 text-gold'
                      : 'hover:bg-secondary/50 text-foreground'
                  }`}
                >
                  <span className="text-xl">{chain.icon}</span>
                  <span className="flex-1 text-left text-sm font-medium">{chain.name}</span>
                  {chain.id === chainId && <Check className="w-4 h-4" />}
                </button>
              ))}

              {error && (
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" />
                  <span>Failed to switch</span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
