import { useReadContract, useChainId } from 'wagmi';
import { RGLM_TOKEN } from '@/lib/tokens';

// ERC20 ABI for balanceOf
const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const;

export function useRGLMBalance(address?: `0x${string}`) {
  const chainId = useChainId();
  const tokenAddress = RGLM_TOKEN.addresses[chainId as keyof typeof RGLM_TOKEN.addresses];
  
  const isValidToken = tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000';

  const { data, isLoading, error, refetch } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isValidToken,
    },
  });

  // Format the balance for display
  const formattedBalance = data
    ? (Number(data) / Math.pow(10, RGLM_TOKEN.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00';

  // Raw balance as number
  const rawBalance = data ? Number(data) / Math.pow(10, RGLM_TOKEN.decimals) : 0;

  return {
    balance: data,
    rawBalance,
    formattedBalance,
    isLoading,
    error,
    refetch,
    symbol: RGLM_TOKEN.symbol,
    decimals: RGLM_TOKEN.decimals,
    isValidToken,
  };
}

interface UseTokenBalanceProps {
  address?: `0x${string}`;
  tokenAddress?: `0x${string}`;
  decimals?: number;
}

export function useTokenBalance({ address, tokenAddress, decimals = 18 }: UseTokenBalanceProps) {
  const isValidToken = tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000';

  const { data, isLoading, error, refetch } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isValidToken,
    },
  });

  const formattedBalance = data
    ? (Number(data) / Math.pow(10, decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      })
    : '0.00';

  const rawBalance = data ? Number(data) / Math.pow(10, decimals) : 0;

  return {
    balance: data,
    rawBalance,
    formattedBalance,
    isLoading,
    error,
    refetch,
  };
}
