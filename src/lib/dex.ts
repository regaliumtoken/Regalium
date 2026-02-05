// DEX integrations for token swaps
// Uniswap and 1inch URL builders and utilities

import { polygon, mainnet } from 'wagmi/chains';
import { RGLM_TOKEN, COMMON_TOKENS } from './tokens';

export interface SwapConfig {
  inputToken?: string; // Token address or symbol
  outputToken?: string; // Token address or symbol
  inputAmount?: string;
  chainId?: number;
  slippage?: number; // Percentage (e.g., 0.5 for 0.5%)
}

// Uniswap configuration
const UNISWAP_CONFIG = {
  appUrl: 'https://app.uniswap.org',
  // Uniswap uses chain-specific URLs
  swapPath: '/swap',
};

// 1inch configuration
const ONEINCH_CONFIG = {
  appUrl: 'https://app.1inch.io',
  apiUrl: 'https://api.1inch.dev',
};

// Chain ID to URL path mapping
const CHAIN_PATHS: Record<number, string> = {
  [polygon.id]: 'polygon',
  [mainnet.id]: 'ethereum',
};

/**
 * Generate Uniswap swap URL
 */
export function getUniswapUrl(config: SwapConfig): string {
  const chainId = config.chainId || polygon.id;
  const chainPath = CHAIN_PATHS[chainId] || 'polygon';
  
  const params = new URLSearchParams();
  
  // Input token (use native token symbol or address)
  if (config.inputToken) {
    params.set('inputCurrency', config.inputToken);
  } else {
    params.set('inputCurrency', 'NATIVE'); // Default to native token (MATIC/ETH)
  }
  
  // Output token (default to RGLM)
  if (config.outputToken) {
    params.set('outputCurrency', config.outputToken);
  } else {
    const rglmAddress = RGLM_TOKEN.addresses[chainId as keyof typeof RGLM_TOKEN.addresses];
    if (rglmAddress && rglmAddress !== '0x0000000000000000000000000000000000000000') {
      params.set('outputCurrency', rglmAddress);
    }
  }
  
  // Input amount
  if (config.inputAmount) {
    params.set('exactAmount', config.inputAmount);
    params.set('exactField', 'input');
  }
  
  // Chain selection
  params.set('chain', chainPath);

  return `${UNISWAP_CONFIG.appUrl}${UNISWAP_CONFIG.swapPath}?${params.toString()}`;
}

/**
 * Generate 1inch swap URL
 */
export function get1inchUrl(config: SwapConfig): string {
  const chainId = config.chainId || polygon.id;
  
  // 1inch uses chain IDs directly in the URL
  let url = `${ONEINCH_CONFIG.appUrl}/#/${chainId}/simple/swap`;
  
  // Add token addresses
  const inputToken = config.inputToken || 'MATIC';
  const outputToken = config.outputToken || 
    RGLM_TOKEN.addresses[chainId as keyof typeof RGLM_TOKEN.addresses] || 
    'USDC';
  
  url += `/${inputToken}/${outputToken}`;
  
  return url;
}

/**
 * Open Uniswap in a new tab
 */
export function openUniswap(config: SwapConfig): void {
  const url = getUniswapUrl(config);
  window.open(url, '_blank');
}

/**
 * Open 1inch in a new tab
 */
export function open1inch(config: SwapConfig): void {
  const url = get1inchUrl(config);
  window.open(url, '_blank');
}

// DEX provider type
export interface DexProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  supportedChains: number[];
  features: string[];
  openSwap: (config: SwapConfig) => void;
  getUrl: (config: SwapConfig) => string;
}

// DEX providers metadata
export const DEX_PROVIDERS: DexProvider[] = [
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'The largest decentralized exchange by volume',
    logo: '🦄',
    supportedChains: [polygon.id, mainnet.id],
    features: ['AMM', 'Liquidity Pools', 'NFTs'],
    openSwap: openUniswap,
    getUrl: getUniswapUrl,
  },
  {
    id: '1inch',
    name: '1inch',
    description: 'DEX aggregator for best swap rates across protocols',
    logo: '🔄',
    supportedChains: [polygon.id, mainnet.id],
    features: ['Aggregation', 'Limit Orders', 'Fusion'],
    openSwap: open1inch,
    getUrl: get1inchUrl,
  },
];

// Get RGLM liquidity pool links
export function getRGLMLiquidityLinks(chainId: number) {
  const rglmAddress = RGLM_TOKEN.addresses[chainId as keyof typeof RGLM_TOKEN.addresses];
  const chainPath = CHAIN_PATHS[chainId] || 'polygon';
  
  if (!rglmAddress || rglmAddress === '0x0000000000000000000000000000000000000000') {
    return null;
  }
  
  return {
    uniswapPool: `https://app.uniswap.org/explore/tokens/${chainPath}/${rglmAddress}`,
    dexScreener: `https://dexscreener.com/${chainPath}/${rglmAddress}`,
    dexTools: `https://www.dextools.io/app/en/${chainPath}/pair-explorer/${rglmAddress}`,
  };
}
