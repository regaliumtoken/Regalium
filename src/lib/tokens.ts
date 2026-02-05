import { polygon, mainnet, polygonMumbai } from 'wagmi/chains';

// RGLM Token addresses on different chains
// Note: These are placeholder addresses - replace with actual deployed contract addresses
export const RGLM_TOKEN = {
  name: 'Regalium',
  symbol: 'RGLM',
  decimals: 18,
  addresses: {
    [polygon.id]: '0x3772127acbd138f86fabcb2341860956b9190346' as `0x${string}`,
    [mainnet.id]: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Not deployed yet
    [polygonMumbai.id]: '0x3772127acbd138f86fabcb2341860956b9190346' as `0x${string}`, // Using same for testnet
  },
  // Logo/icon for the token
  logoURI: '/favicon.ico',
} as const;

// Common tokens for swap functionality
export const COMMON_TOKENS = [
  {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    addresses: {
      [polygon.id]: '0x0000000000000000000000000000000000001010' as `0x${string}`,
    },
    isNative: true,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    addresses: {
      [mainnet.id]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as `0x${string}`,
    },
    isNative: true,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    addresses: {
      [polygon.id]: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as `0x${string}`,
      [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
    },
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    addresses: {
      [polygon.id]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as `0x${string}`,
      [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`,
    },
  },
  RGLM_TOKEN,
] as const;

// Get token address for current chain
export function getTokenAddress(token: typeof COMMON_TOKENS[number], chainId: number): `0x${string}` | undefined {
  if ('addresses' in token && token.addresses) {
    return token.addresses[chainId as keyof typeof token.addresses];
  }
  return undefined;
}
