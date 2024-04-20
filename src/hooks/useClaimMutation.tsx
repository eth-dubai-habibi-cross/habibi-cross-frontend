'use client';
import { PaymasterMode } from '@biconomy/account';
import { useMutation } from '@tanstack/react-query';
import { Contract, ethers } from 'ethers';
import { useCallback } from 'react';
import { baseSepolia, morphSepolia, sepolia, xdcTestnet } from 'viem/chains';

import useClaimRewards from '@/hooks/useClaimRewards';
import useGetRewardDetails from '@/hooks/useGetRewardDetails';

import { useToast } from '@/components/ui/use-toast';

import useGlobalStore from '@/store/store';

import { RewardManagerABI } from '@/constant/abi';
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
    selectedChain: selectedChain.id,
  });

  const { refetch: refetchClaim } = useClaimRewards({
    chainId: selectedChain.id,
  });

  const claimRewards = useCallback(
    async ({ chainId }: { chainId: number }) => {
      try {
        toast({
          title: 'Awaiting transaction',
        });
        return "sasas"
        const provider = new ethers.providers.JsonRpcProvider(
          'https://rpc.sepolia.org'
        );
        const address = await smartAccount?.getAccountAddress();
        const contractInstance = new Contract(
          REWARD_MANAGER,
          RewardManagerABI,
          provider
        );
        const txParams = {
          to: REWARD_MANAGER,
          from: address,
          signatureType: 'EIP712_SIGN',
        };
        if (chainId === sepolia.id) {
          const { data } =
            await contractInstance.populateTransaction.claimRewardSource();
          txParams.data = data;
        } else if (chainId === baseSepolia.id) {
          const { data } =
            await contractInstance.populateTransaction.claimRewards(
              DESTINATION_CHAIN_SELECTOR,
              DESTINATION_CONTRACT_ADDRESS
            );
          txParams.data = data;
        } else if (chainId === morphSepolia.id) {
          const contractInstance = new Contract(
            REWARD_MANAGER,
            RewardManagerABI,
            provider.getSigner(address)
          );
          console.log(address, "Addre");
          debugger
          const s = await contractInstance.transferToMorph(address, BigInt(1))
          debugger
          const { data } =
            await contractInstance.populateTransaction.claimRewards(
              DESTINATION_CHAIN_SELECTOR,
              DESTINATION_CONTRACT_ADDRESS
            );
          txParams.data = data;
        } else if (chainId === xdcTestnet.id) {
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
        debugger
        await refetch();
        await refetchClaim();
        // console.info("Transaction Hash", transactionHash);
        setTimeout(() => {
          toast({
            title: 'Transaction successful',
          });
        }, 20000);
        return tx.transactionHash
      } catch (error) {
        debugger
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
