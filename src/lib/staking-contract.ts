import { polygonMumbai, polygon } from 'wagmi/chains';

// Staking contract addresses
export const STAKING_CONTRACT = {
  addresses: {
    [polygonMumbai.id]: '0xd61994a5528197c1def33799549556501f227c97' as `0x${string}`,
    [polygon.id]: '0xd61994a5528197c1def33799549556501f227c97' as `0x${string}`, // Update when mainnet deployed
  },
} as const;

// Actual staking contract ABI from deployment
export const STAKING_ABI = [
  // Constructor (for reference)
  {
    type: 'constructor',
    inputs: [{ name: '_token', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  // Read functions
  {
    name: 'stakedBalances',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    name: 'stakeTimestamps',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    name: 'calculateReward',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    name: 'rewardRatePerSecond',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    name: 'token',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IERC20' }],
  },
  // Write functions
  {
    name: 'stake',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
  },
  {
    name: 'unstake',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
  },
  {
    name: 'claimReward',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Error
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
  },
] as const;

// Get staking contract address for current chain
export function getStakingAddress(chainId: number): `0x${string}` | undefined {
  return STAKING_CONTRACT.addresses[chainId as keyof typeof STAKING_CONTRACT.addresses];
}
