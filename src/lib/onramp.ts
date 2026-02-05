// On-ramp integrations for fiat-to-crypto purchases
// MoonPay and Transak widget URL builders

import { RGLM_TOKEN } from './tokens';

export interface OnRampConfig {
  walletAddress: string;
  fiatCurrency?: string;
  fiatAmount?: number;
  cryptoCurrency?: string;
  network?: string;
}

// MoonPay configuration
// NOTE: MoonPay API keys are PUBLISHABLE keys (pk_...) meant for frontend use
// Get your API key at: https://dashboard.moonpay.com/
const MOONPAY_CONFIG = {
  // Replace with your MoonPay publishable API key
  // Test key format: pk_test_xxxxx | Live key format: pk_live_xxxxx
  apiKey: 'pk_test_key',
  baseUrl: 'https://buy.moonpay.com',
  productionUrl: 'https://buy.moonpay.com',
  sandboxUrl: 'https://buy-sandbox.moonpay.com',
  // Set to true when using production API key
  isProduction: false,
};

// Transak configuration  
// NOTE: Transak API keys are PUBLISHABLE keys meant for frontend use
// Get your API key at: https://partners.transak.com/
const TRANSAK_CONFIG = {
  // Replace with your Transak API key
  apiKey: 'your-transak-api-key',
  baseUrl: 'https://global.transak.com',
  sandboxUrl: 'https://global-stg.transak.com',
  // Set to true when using production API key
  isProduction: false,
};

/**
 * Generate MoonPay widget URL for buying crypto
 */
export function getMoonPayUrl(config: OnRampConfig): string {
  const params = new URLSearchParams({
    apiKey: MOONPAY_CONFIG.apiKey,
    walletAddress: config.walletAddress,
    currencyCode: config.cryptoCurrency || 'matic',
    baseCurrencyCode: config.fiatCurrency || 'usd',
    baseCurrencyAmount: String(config.fiatAmount || 100),
    // Pre-select Polygon network
    defaultCryptoCurrency: 'matic_polygon',
    showWalletAddressForm: 'false',
    colorCode: '#d4af37', // Gold accent color
  });
  const baseUrl = MOONPAY_CONFIG.isProduction ? MOONPAY_CONFIG.productionUrl : MOONPAY_CONFIG.sandboxUrl;
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate Transak widget URL for buying crypto
 */
export function getTransakUrl(config: OnRampConfig): string {
  const params = new URLSearchParams({
    apiKey: TRANSAK_CONFIG.apiKey,
    walletAddress: config.walletAddress,
    fiatCurrency: config.fiatCurrency || 'USD',
    fiatAmount: String(config.fiatAmount || 100),
    cryptoCurrencyCode: config.cryptoCurrency || 'MATIC',
    network: config.network || 'polygon',
    themeColor: 'd4af37', // Gold accent color
    hideMenu: 'true',
    disableWalletAddressForm: 'true',
  });
  const baseUrl = TRANSAK_CONFIG.isProduction ? TRANSAK_CONFIG.baseUrl : TRANSAK_CONFIG.sandboxUrl;
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Open MoonPay widget in a new window
 */
export function openMoonPay(config: OnRampConfig): void {
  const url = getMoonPayUrl(config);
  window.open(url, '_blank', 'width=500,height=700,toolbar=no,location=no');
}

/**
 * Open Transak widget in a new window
 */
export function openTransak(config: OnRampConfig): void {
  const url = getTransakUrl(config);
  window.open(url, '_blank', 'width=500,height=700,toolbar=no,location=no');
}

// On-ramp provider type
export interface OnRampProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  supportedMethods: string[];
  fees: string;
  openWidget: (config: OnRampConfig) => void;
}

// On-ramp providers metadata
export const ON_RAMP_PROVIDERS: OnRampProvider[] = [
  {
    id: 'moonpay',
    name: 'MoonPay',
    description: 'Buy crypto with card, bank transfer, or Apple Pay',
    logo: '🌙',
    supportedMethods: ['card', 'bank', 'apple_pay', 'google_pay'],
    fees: '1-4.5%',
    openWidget: openMoonPay,
  },
  {
    id: 'transak',
    name: 'Transak',
    description: 'Global fiat-to-crypto gateway with 100+ currencies',
    logo: '💳',
    supportedMethods: ['card', 'bank', 'sepa', 'upi'],
    fees: '1-5%',
    openWidget: openTransak,
  },
];
