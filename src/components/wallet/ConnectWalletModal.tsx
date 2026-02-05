import { useConnect } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Crown } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletIcons: Record<string, string> = {
  'MetaMask': '🦊',
  'WalletConnect': '🔗',
  'Injected': '💉',
};

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { connectors, connect, isPending, error } = useConnect();

  const handleConnect = async (connector: (typeof connectors)[number]) => {
    connect({ connector });
  };

  // Get unique connectors by name - ensure we're working with an array
  const connectorsArray = Array.from(connectors);
  const uniqueConnectors = connectorsArray.reduce((acc, connector) => {
    const name = connector.name === 'Injected' ? 'MetaMask' : connector.name;
    if (!acc.find(c => (c.name === 'Injected' ? 'MetaMask' : c.name) === name)) {
      acc.push(connector);
    }
    return acc;
  }, [] as (typeof connectors)[number][]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md royal-card p-6 space-y-6 glow-purple"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-serif font-bold">Connect Wallet</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">
              Connect your wallet to access the Royal Treasury and manage your Regalium tokens.
            </p>

            {/* Connectors */}
            <div className="space-y-3">
              {uniqueConnectors.map((connector) => {
                const displayName = connector.name === 'Injected' ? 'MetaMask' : connector.name;
                const icon = walletIcons[displayName] || walletIcons[connector.name] || '🔗';
                
                return (
                  <button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    disabled={isPending}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-secondary/50 hover:border-gold/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {icon}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground group-hover:text-gold transition-colors">
                        {displayName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {displayName === 'MetaMask' && 'Connect using browser extension'}
                        {displayName === 'WalletConnect' && 'Scan with mobile wallet'}
                      </p>
                    </div>
                    {isPending && (
                      <Loader2 className="w-5 h-5 animate-spin text-gold" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
              >
                {error.message || 'Failed to connect wallet'}
              </motion.div>
            )}

            {/* Footer */}
            <p className="text-xs text-center text-muted-foreground">
              By connecting, you agree to the{' '}
              <a href="#" className="text-gold hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-gold hover:underline">Privacy Policy</a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
