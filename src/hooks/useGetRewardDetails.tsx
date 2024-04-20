import { bscTestnet } from 'viem/chains';
import { useReadContracts } from 'wagmi';

import useGetAddress from '@/hooks/useGetAddress';

import { REWARD_MANAGER_ABI } from '@/constant/abi';
import { REWARD_MANAGER } from '@/constant/addresses';

// const useGetRewardDetails = ({ chainId }: { chainId: number }) => {
const useGetRewardDetails = ({ selectedChain }: { selectedChain: number }) => {
  const { data: address } = useGetAddress();
  // let contractAddress = '';
  // if (chainId === base.id) {
  //   contractAddress = USDC_SEPOLIA_BASE;
  // }
  // if (chainId === bscTestnet.id) {
  //   contractAddress = USDC_BINANCE;
  //   console.log("contractAddress", contractAddress);
  // }

  return useReadContracts({
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
    contracts: [
      // {
      //   abi: erc20Abi,
      //   address: contractAddress as Address,
      //   functionName: 'balanceOf',
      //   args: [address as Address],
      // },
      {
        abi: REWARD_MANAGER_ABI,
        address: REWARD_MANAGER,
        chainId: bscTestnet.id,
        functionName: 'rewardBalances',
        args: [address],
      },
      // {
      //   abi: REWARD_MANAGER_ABI,
      //   address: REWARD_MANAGER,
      //   functionName: 'isWhitelisted',
      //   args: [address],
      // },
    ],
  });
};

export default useGetRewardDetails;
