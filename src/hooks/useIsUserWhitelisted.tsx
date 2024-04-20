import { Address } from 'viem';
import { sepolia } from 'viem/chains';
import { createConfig, http, useReadContract } from 'wagmi';

import useGetAddress from '@/hooks/useGetAddress';

import { RewardManagerABI } from '@/constant/abi';
import { REWARD_MANAGER } from '@/constant/addresses';

export const sepoliaConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://rpc.sepolia.org"),
  },
})

const useIsUserWhiteListed = () => {
  const { data: address } = useGetAddress();

  return useReadContract({
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
    chainId: sepolia.id,
    config: sepoliaConfig,
    abi: RewardManagerABI,
    account: address as Address,
    address: REWARD_MANAGER,
    functionName: 'isWhitelisted',
  });
};

export default useIsUserWhiteListed;
