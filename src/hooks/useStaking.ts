import { useReadContract, useWriteContract, useChainId, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { STAKING_ABI, getStakingAddress } from '@/lib/staking-contract';
import { RGLM_TOKEN } from '@/lib/tokens';

// ERC20 approve ABI
const approveAbi = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export function useStakingData() {
  const chainId = useChainId();
  const { address } = useAccount();
  const stakingAddress = getStakingAddress(chainId);
  const isValidContract = stakingAddress && stakingAddress !== '0x0000000000000000000000000000000000000000';

  // Read staked balance (stakedBalances mapping)
  const { data: stakedBalance, isLoading: isLoadingStaked, refetch: refetchStaked } = useReadContract({
    abi: STAKING_ABI,
    address: stakingAddress,
    functionName: 'stakedBalances',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isValidContract },
  });

  // Read earned rewards (calculateReward function)
  const { data: earnedRewards, isLoading: isLoadingEarned, refetch: refetchEarned } = useReadContract({
    abi: STAKING_ABI,
    address: stakingAddress,
    functionName: 'calculateReward',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isValidContract },
  });

  // Read stake timestamp
  const { data: stakeTimestamp, refetch: refetchTimestamp } = useReadContract({
    abi: STAKING_ABI,
    address: stakingAddress,
    functionName: 'stakeTimestamps',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isValidContract },
  });

  // Read reward rate per second
  const { data: rewardRatePerSecond } = useReadContract({
    abi: STAKING_ABI,
    address: stakingAddress,
    functionName: 'rewardRatePerSecond',
    query: { enabled: isValidContract },
  });

  // Read token address from contract
  const { data: tokenAddress } = useReadContract({
    abi: STAKING_ABI,
    address: stakingAddress,
    functionName: 'token',
    query: { enabled: isValidContract },
  });

  // Format values
  const formatBalance = (value: bigint | undefined) => {
    if (!value) return '0.00';
    return (Number(value) / Math.pow(10, RGLM_TOKEN.decimals)).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  const rawStakedBalance = stakedBalance ? Number(stakedBalance) / Math.pow(10, RGLM_TOKEN.decimals) : 0;
  const rawEarnedRewards = earnedRewards ? Number(earnedRewards) / Math.pow(10, RGLM_TOKEN.decimals) : 0;
  
  // Calculate APY from reward rate (rewardRatePerSecond is in wei per second per 1e18 staked)
  // APY = (rewardRatePerSecond * 31536000) / 1e18 * 100
  const apy = rewardRatePerSecond 
    ? (Number(rewardRatePerSecond) * 31536000) / 1e18 * 100 
    : 0;

  const refetchAll = () => {
    refetchStaked();
    refetchEarned();
    refetchTimestamp();
  };

  return {
    stakedBalance: formatBalance(stakedBalance as bigint | undefined),
    rawStakedBalance,
    earnedRewards: formatBalance(earnedRewards as bigint | undefined),
    rawEarnedRewards,
    stakeTimestamp: stakeTimestamp ? Number(stakeTimestamp) : 0,
    rewardRatePerSecond: rewardRatePerSecond ? Number(rewardRatePerSecond) : 0,
    apy,
    tokenAddress: tokenAddress as `0x${string}` | undefined,
    isLoading: isLoadingStaked || isLoadingEarned,
    isValidContract,
    refetch: refetchAll,
  };
}

export function useStakeTokens() {
  const chainId = useChainId();
  const { address } = useAccount();
  const stakingAddress = getStakingAddress(chainId);
  const tokenAddress = RGLM_TOKEN.addresses[chainId as keyof typeof RGLM_TOKEN.addresses];

  const { writeContractAsync: writeApprove, isPending: isApproving } = useWriteContract();
  const { writeContractAsync: writeStake, isPending: isStaking } = useWriteContract();

  // Check allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: approveAbi,
    address: tokenAddress,
    functionName: 'allowance',
    args: address && stakingAddress ? [address, stakingAddress] : undefined,
    query: { enabled: !!address && !!stakingAddress },
  });

  const approve = async (amount: string) => {
    if (!stakingAddress || !tokenAddress) return;
    const amountWei = parseUnits(amount, RGLM_TOKEN.decimals);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return writeApprove({
      abi: approveAbi,
      address: tokenAddress,
      functionName: 'approve',
      args: [stakingAddress, amountWei],
    } as any);
  };

  const stake = async (amount: string) => {
    if (!stakingAddress) return;
    const amountWei = parseUnits(amount, RGLM_TOKEN.decimals);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return writeStake({
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: 'stake',
      args: [amountWei],
    } as any);
  };

  const needsApproval = (amount: string) => {
    if (!allowance) return true;
    try {
      const amountWei = parseUnits(amount, RGLM_TOKEN.decimals);
      return (allowance as bigint) < amountWei;
    } catch {
      return true;
    }
  };

  return {
    approve,
    stake,
    needsApproval,
    isApproving,
    isStaking,
    refetchAllowance,
  };
}

export function useUnstakeTokens() {
  const chainId = useChainId();
  const stakingAddress = getStakingAddress(chainId);

  const { writeContractAsync: writeUnstake, isPending: isUnstaking } = useWriteContract();
  const { writeContractAsync: writeClaim, isPending: isClaiming } = useWriteContract();

  const unstake = async (amount: string) => {
    if (!stakingAddress) return;
    const amountWei = parseUnits(amount, RGLM_TOKEN.decimals);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return writeUnstake({
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: 'unstake',
      args: [amountWei],
    } as any);
  };

  const claimReward = async () => {
    if (!stakingAddress) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return writeClaim({
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: 'claimReward',
    } as any);
  };

  return {
    unstake,
    claimReward,
    isUnstaking,
    isClaiming,
  };
}
