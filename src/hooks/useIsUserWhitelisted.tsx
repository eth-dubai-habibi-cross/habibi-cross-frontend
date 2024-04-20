import { bscTestnet } from 'viem/chains';
import { useReadContract } from 'wagmi';

import useGetAddress from '@/hooks/useGetAddress';

import { REWARD_MANAGER_ABI } from '@/constant/abi';
import { REWARD_MANAGER } from '@/constant/addresses';

const useIsUserWhiteListed = () => {
  const { data: address } = useGetAddress();
  return useReadContract({
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
    chainId: bscTestnet.id,
    abi: REWARD_MANAGER_ABI,
    account: address,
    address: REWARD_MANAGER,
    functionName: 'isWhitelisted',
  });
};

export default useIsUserWhiteListed;
