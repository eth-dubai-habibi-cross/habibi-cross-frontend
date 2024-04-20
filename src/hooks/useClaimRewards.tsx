import { Address, erc20Abi } from 'viem';
import { baseSepolia, sepolia } from 'viem/chains';
import { useReadContract } from 'wagmi';

import useGetAddress from '@/hooks/useGetAddress';

import { USDC_SEPOLIA_BASE, USDC_SEPOLIA_ETH } from '@/constant/constants';

const useClaimRewards = ({ chainId }: { chainId: number }) => {
  const { data: address } = useGetAddress();
  let contractAddress = '';
  if (chainId === baseSepolia.id) {
    contractAddress = USDC_SEPOLIA_BASE;
  }
  if (chainId === sepolia.id) {
    contractAddress = USDC_SEPOLIA_ETH;
  }
  return useReadContract({
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
    account: address as Address,
    abi: erc20Abi,
    chainId: chainId,
    address: contractAddress as Address,
    functionName: 'balanceOf',
    args: [address as Address],
  });
};

export default useClaimRewards;
