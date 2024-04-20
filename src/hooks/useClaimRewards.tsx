import { Address, erc20Abi } from 'viem';
import { baseSepolia, bscTestnet } from 'viem/chains';
import { useReadContract } from 'wagmi';

import useGetAddress from '@/hooks/useGetAddress';

import { USDC_BINANCE, USDC_SEPOLIA_BASE } from '@/constant/constants';

const useClaimRewards = ({ chainId }: { chainId: number }) => {
  const { data: address } = useGetAddress();
  let contractAddress = '';
  if (chainId === baseSepolia.id) {
    contractAddress = USDC_SEPOLIA_BASE;
  }
  if (chainId === bscTestnet.id) {
    contractAddress = USDC_BINANCE;
  }
  return useReadContract({
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
    account: address,
    abi: erc20Abi,
    chainId: chainId,
    address: contractAddress as Address,
    functionName: 'balanceOf',
    args: [address as Address],
  });
};

export default useClaimRewards;
