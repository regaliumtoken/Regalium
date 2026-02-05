import { http, createConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect project ID - users should replace with their own
// Get one at https://cloud.walletconnect.com
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

export const config = createConfig({
  chains: [polygon, mainnet, polygonMumbai],
  connectors: [
    injected(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'Regalium',
        description: 'Royal Web3 Gaming Token',
        url: 'https://regalium.io',
        icons: ['https://regalium.io/favicon.ico'],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [polygon.id]: http(),
    [mainnet.id]: http(),
    [polygonMumbai.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
