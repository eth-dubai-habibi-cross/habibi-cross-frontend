'use client';
import Big from 'big.js';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { formatUnits } from 'viem';
import { baseSepolia, morphSepolia } from 'viem/chains';

import useBiconomy from '@/hooks/useBiconomy';
import useClaimMutation from '@/hooks/useClaimMutation';
import useClaimRewards from '@/hooks/useClaimRewards';
import useGetAddress from '@/hooks/useGetAddress';
import useGetRewardDetails from '@/hooks/useGetRewardDetails';
import useIsUserWhiteListed from '@/hooks/useIsUserWhitelisted';
import { cn } from '@/lib/utils';

import About from '@/components/About';
import { CardBody, CardContainer, CardItem } from '@/components/AnimatedCard';
import { Tab } from '@/components/AnimatedTabs';
import ChainSelector from '@/components/chain/ChainSelector';
import ClaimButton from '@/components/ClaimButton';
import FAQ from '@/components/FAQ';
import ArrowLink from '@/components/links/ArrowLink';
import RewardBalance from '@/components/RewardBalance';
import { FloatingNav } from '@/components/ui/floating-nav';
import { useToast } from '@/components/ui/use-toast';

import useGlobalStore from '@/store/store';
const getButtonCta = ({
  reward,
  isLoading,
  isUserWhitelisted,
  isClaimed,
  isConnected,
}: {
  reward: string;
  isConnected: boolean;
  isLoading: boolean;
  isClaimed: boolean;
  isUserWhitelisted: boolean;
}) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ImSpinner2 className='animate-spin' />
      </span>
    );
  }
  if (!isConnected) {
    return 'Connect wallet';
  }
  if (!isUserWhitelisted) {
    return 'You are not whitelisted';
  }
  // if (isClaimed) {
  //   return "You have successfully claimed the reward"
  // }
  if (reward === '' || reward === '0') {
    return "You have successfully claimed the reward";
  }
  return 'Claim rewards';
};

const tabs = [
  {
    title: 'Portal',
    value: 'portal',
  },
  {
    title: 'About',
    value: 'about',
  },
  {
    title: 'FAQ',
    value: 'faq',
  },
];

const Homepage = () => {
  const [active, setActive] = useState<Tab>(tabs[0]);
  const [selectedChain, setSelectedChain] = useState<{
    id: number;
    name: string;
  }>({
    name: morphSepolia.name,
    id: morphSepolia.id,
  });

  const { data: smartAccountAddy, isLoading: isAddressLoading } =
    useGetAddress();

  const { data: claimedReward, refetch: refetchClaim, error } = useClaimRewards({
    chainId: selectedChain.id,
  });



  const [txHash, setTxHash] = useState('')
  const { smartAccount } = useGlobalStore();
  const { mutateAsync, isPending: isConnectPending } = useBiconomy();
  const {
    data: rewardDetails,
    isLoading,
    refetch,
  } = useGetRewardDetails({
    selectedChain: selectedChain.id,
  });

  console.log(claimedReward, "claimedReward", error, rewardDetails);

  const { isPending, mutateAsync: claimRewards } = useClaimMutation({
    selectedChain,
  });
  const { data: isUserWhitelisted, isLoading: isUserWhitelistedLoading } =
    useIsUserWhiteListed();
  const { toast } = useToast();

  const reward = rewardDetails
    ? formatUnits(BigInt(Big(rewardDetails[0].result?.toString() as string).toString()), 18)
    : '';


  const getButtonCTA = ({
    isLoading,
    text,
  }: {
    isLoading: boolean;
    text: string;
  }) => {
    if (isLoading) {
      return (
        <span
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </span>
      );
    }
    return text;
  };


  const copyToClipboard = () => {
    if (smartAccountAddy) {
      navigator.clipboard
        .writeText(smartAccountAddy as string)
        .then(() => {
          toast({
            title: 'Address was successfully copied!',
          });
        })
        .catch(() => {
          toast({
            title: 'Could not copy the address',
          });
        });
    }
  };

  return (
    <div className='w-full min-h-screen h-full bg-cover_bg bg-cover relative'>
      <Image
        src='/images/dottednew.webp'
        className='aspect-[1792/1024]'
        fill
        alt=''
      />
      <div className='flex items-center justify-end pt-8 h-[100px] px-4'>
        {/* <Link href="/" className='text-white z-30 flex items-center justify-start'>
          <div className='w-[100px] h-[100px] hover:scale-110 transition-all relative  overflow-hidden rounded-full'>
            <Image src="/favicon/apple-touch-icon.png" alt='Habibi' fill />
          </div>
        </Link> */}
        <FloatingNav navItems={tabs} active={active} setActive={setActive} />
        <div>
          {smartAccount && smartAccountAddy ? (
            <button
              onClick={() => {
                copyToClipboard();
              }}
              className='z-30 relative bg-white w-[150px] font-bold rounded-md text-black  py-2'
            >
              {getButtonCTA({
                isLoading: isConnectPending || isAddressLoading,
                text:
                  smartAccountAddy.slice(0, 4) +
                  '...' +
                  smartAccountAddy.slice(4, 7),
              })}
            </button>
          ) : (
            <button
              onClick={async () => mutateAsync()}
              className='z-30 relative bg-white w-[150px] h-[40px] font-bold rounded-md text-black  py-2'
            >
              {getButtonCTA({
                isLoading: isConnectPending || isAddressLoading,
                text: 'Connect wallet',
              })}
            </button>
          )}
        </div>
      </div>
      <Link href="/" className='text-white absolute top-1/2 -translate-y-1/2 left-[10%] z-30 flex items-center justify-start'>
        <div className='w-[200px] h-[200px] hover:scale-110 transition-all relative  overflow-hidden rounded-full'>
          <Image src="/favicon/apple-touch-icon.png" alt='Habibi' fill />
        </div>
      </Link>
      <Link href="/" className='text-white absolute top-1/2 -translate-y-1/2 right-[10%] z-30 flex items-center justify-start'>
        <div className='w-[200px] h-[200px] hover:scale-110 transition-all relative  overflow-hidden rounded-full'>
          <Image src="/favicon/apple-touch-icon.png" alt='Habibi' fill />
        </div>
      </Link>
      <AnimatePresence initial={false} mode='popLayout'>
        {active.value === 'portal' && (
          <motion.div
            key={active.title}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 40,
            }}
            transition={{
              ease: 'easeInOut',
              delay: 0.1,
              duration: 1,
            }}
            className='w-full relative overflow-hidden '
          >
            <CardContainer className='h-full '>
              <CardBody className='max-w-[500px] z-20 h-full relative mt-5 mx-auto w-full'>
                <div className='rounded-xl border bg-card text-card-foreground h-full pb-2 px-2 shadow-sm'>
                  <div className='flex flex-col p-6 space-y-1'>
                    <div className='flex items-center justify-center spacex-x-2'>
                      <h3 className='font-semibold tracking-tight mb-2  text-center text-3xl'>
                        🌊&nbsp;HabibiCross
                      </h3>
                      <div className='w-[40px] relative h-[40px] ml-1 -mt-2'>
                        <Image src="/favicon/apple-touch-icon.png" alt='Habibi' fill />
                      </div>
                    </div>
                    <p className='text-sm text-muted-foreground text-center'>
                      Unlock your achievements 🎉. Connect your wallet 🎮,
                      view your achievements 🏅, and claim your USDC rewards 💵
                      on your preferred chain—no gas fees, just your skills
                      rewarded. 👾
                    </p>
                  </div>
                  <ChainSelector
                    chain={selectedChain}
                    setSelectedChain={setSelectedChain}
                  />
                  {reward && reward !== '0' && (
                    <RewardBalance reward={reward} />
                  )}
                  <CardItem className='w-full'>
                    {smartAccountAddy ? (
                      <ClaimButton
                        disabled={
                          reward === '' ||
                          reward === '0' ||
                          !isUserWhitelisted ||
                          isUserWhitelistedLoading ||
                          isPending ||
                          isLoading
                        }
                        onClick={async () => {
                          if (!smartAccountAddy) {
                            await mutateAsync();
                            return;
                          }
                          const rewardtx = await claimRewards({ chainId: selectedChain.id });
                          if (rewardtx) {
                            setTxHash(rewardtx)
                          }
                          await refetch();
                          await refetchClaim();
                        }}
                      >
                        {getButtonCta({
                          reward,
                          isLoading:
                            isLoading || isUserWhitelistedLoading || isPending,
                          isUserWhitelisted: isUserWhitelisted as boolean,
                          isConnected: !!smartAccountAddy,
                          isClaimed: claimedReward ? Big(claimedReward.toString()).eq(0) ? false : true : false
                        })}
                      </ClaimButton>
                    ) : (
                      <ClaimButton
                        disabled={isAddressLoading || isConnectPending}
                        onClick={async () => {
                          if (!smartAccountAddy) {
                            await mutateAsync();
                            return;
                          }
                          await claimRewards({ chainId: selectedChain.id });
                          await refetch();
                          await refetchClaim();
                        }}
                      >
                        {getButtonCta({
                          reward,
                          isLoading: isAddressLoading || isConnectPending,
                          isUserWhitelisted: isUserWhitelisted as boolean,
                          isConnected: !!smartAccountAddy,
                          isClaimed: claimedReward && Big(claimRewards.toString()).eq(0) ? true : false
                        })}
                      </ClaimButton>
                    )}
                  </CardItem>
                  {claimedReward &&
                    isUserWhitelisted ? (
                    <div className='p-6 pt-0 grid gap-4'>
                      <div className='grid gap-2'>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          htmlFor='email'
                        >
                          You have claimed on{' '}
                          <strong>{selectedChain.name}</strong>
                        </label>
                        <input
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                          placeholder='-'
                          value={
                            formatUnits(BigInt(claimedReward), 18).toString() +
                            ' USDC'
                          }
                          disabled
                        />
                      </div>
                    </div>
                  ) : null}
                  {(txHash !== "" || (claimedReward && Big(claimedReward.toString()).gt(0))) ?
                    <div className='p-6 pt-0 grid gap-4'>
                      {selectedChain.id === baseSepolia.id && (
                        <div className='flex items-center pt-4 justify-between'>
                          {txHash &&
                            <ArrowLink
                              href={'https://ccip.chain.link/tx/' + txHash}
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              Transaction on Chainlink
                            </ArrowLink>
                          }
                          <ArrowLink
                            href='https://sepolia.basescan.org/token/0x54d562b3a8b680f8a21d721d22f0bb58a3787555'
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            Transaction on {selectedChain.name}
                          </ArrowLink>
                        </div>
                      )}
                    </div> : ''
                  }
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        )}
      </AnimatePresence>
      {active.value === 'about' && (
        <About />
      )}
      {active.value === 'faq' && (
        <FAQ />
      )}
    </div>
  );
};

export default Homepage;
