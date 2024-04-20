'use client';
import { PaymasterMode } from '@biconomy/account';
import { useMutation } from '@tanstack/react-query';
import { Contract, ethers } from 'ethers';
import { useCallback } from 'react';
import { bscTestnet } from 'viem/chains';

import useClaimRewards from '@/hooks/useClaimRewards';
import useGetRewardDetails from '@/hooks/useGetRewardDetails';

import { useToast } from '@/components/ui/use-toast';

import useGlobalStore from '@/store/store';

import { REWARD_MANAGER_ABI } from '@/constant/abi';
import {
  DESTINATION_CONTRACT_ADDRESS,
  REWARD_MANAGER,
} from '@/constant/addresses';
import { DESTINATION_CHAIN_SELECTOR } from '@/constant/constants';

const useClaimMutation = ({
  selectedChain,
}: {
  selectedChain: {
    id: number;
    name: string;
  };
}) => {
  const { smartAccount } = useGlobalStore();
  const { toast } = useToast();
  const { refetch } = useGetRewardDetails({
    selectedChain: bscTestnet.id,
  });

  const { refetch: refetchClaim } = useClaimRewards({
    chainId: bscTestnet.id,
  });

  const claimRewards = useCallback(
    async ({ chainId }: { chainId: number }) => {
      try {
        toast({
          title: 'Awaiting transaction',
        });
        const provider = new ethers.providers.JsonRpcProvider(
          'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
        );
        const address = await smartAccount?.getAccountAddress();
        const contractInstance = new Contract(
          REWARD_MANAGER,
          REWARD_MANAGER_ABI,
          provider
        );
        const txParams = {
          to: REWARD_MANAGER,
          from: address,
          signatureType: 'EIP712_SIGN',
        };
        if (chainId === bscTestnet.id) {
          const { data } =
            await contractInstance.populateTransaction.claimRewardSource();
          txParams.data = data;
        } else {
          const { data } =
            await contractInstance.populateTransaction.claimRewards(
              DESTINATION_CHAIN_SELECTOR,
              DESTINATION_CONTRACT_ADDRESS
            );
          txParams.data = data;
        }

        const userOpResponse = await smartAccount?.sendTransaction(txParams, {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        const tx = await userOpResponse.waitForTxHash();
        console.log(tx, "tx");
        await refetch();
        await refetchClaim();
        // console.info("Transaction Hash", transactionHash);
        setTimeout(() => {
          toast({
            title: 'Transaction successful',
          });
        }, 20000);
      } catch (error) {
        toast({
          title: 'Transaction failed',
        });
      }
    },
    [smartAccount, toast]
  );

  return useMutation({
    mutationKey: ['claimmutation'],
    mutationFn: async ({ chainId }: { chainId: number }) =>
      claimRewards({ chainId: chainId }),
  });
};

export default useClaimMutation;
