'use client';
import Big from 'big.js';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { formatUnits } from 'viem';
import { baseSepolia, bscTestnet } from 'viem/chains';

import useBiconomy from '@/hooks/useBiconomy';
import useClaimMutation from '@/hooks/useClaimMutation';
import useClaimRewards from '@/hooks/useClaimRewards';
import useGetAddress from '@/hooks/useGetAddress';
import useGetRewardDetails from '@/hooks/useGetRewardDetails';
import useIsUserWhiteListed from '@/hooks/useIsUserWhitelisted';
import { cn } from '@/lib/utils';

import { CardBody, CardContainer, CardItem } from '@/components/AnimatedCard';
import { Tab } from '@/components/AnimatedTabs';
import ChainSelector from '@/components/chain/ChainSelector';
import ClaimButton from '@/components/ClaimButton';
import ArrowLink from '@/components/links/ArrowLink';
import RewardBalance from '@/components/RewardBalance';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FloatingNav } from '@/components/ui/floating-nav';
import { useToast } from '@/components/ui/use-toast';

import useGlobalStore from '@/store/store';
const getButtonCta = ({
  reward,
  isLoading,
  isUserWhitelisted,
  isConnected,
}: {
  reward: string;
  isConnected: boolean;
  isLoading: boolean;
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
  if (reward === '' || reward === '0') {
    return 'You have successfully claimed the reward';
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
    name: baseSepolia.name,
    id: baseSepolia.id,
  });

  const { data: smartAccountAddy, isLoading: isAddressLoading } =
    useGetAddress();

  const { data: claimedReward, refetch: refetchClaim } = useClaimRewards({
    chainId: selectedChain.id,
  });

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

  const { smartAccount } = useGlobalStore();
  const { mutateAsync, isPending: isConnectPending } = useBiconomy();
  const {
    data: rewardDetails,
    isLoading,
    refetch,
  } = useGetRewardDetails({
    selectedChain: selectedChain.id,
  });

  const { isPending, mutateAsync: claimRewards } = useClaimMutation({
    selectedChain,
  });

  const reward = rewardDetails
    ? formatUnits(BigInt(Big(rewardDetails[0].result as string).toString()), 18)
    : '';

  const { data: isUserWhitelisted, isLoading: isUserWhitelistedLoading } =
    useIsUserWhiteListed();

  const { toast } = useToast();

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
                          await claimRewards({ chainId: selectedChain.id });
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
                        })}
                      </ClaimButton>
                    )}
                  </CardItem>
                  {claimedReward &&
                    claimedReward &&
                    (reward === '0' || reward === '') &&
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
                        {selectedChain.id === bscTestnet.id && (
                          <div className='flex items-center pt-4  justify-center'>
                            <ArrowLink
                              href='https://ccip.chain.link/msg/0x0f88c417c71cb7f19d2bfee769eb392846d45f73eca1a6d1a208ea62a17323aa'
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              Transaction on {selectedChain.name}
                            </ArrowLink>
                          </div>
                        )}
                        {selectedChain.id === baseSepolia.id && (
                          <div className='flex items-center pt-4 justify-between'>
                            <ArrowLink
                              href='https://ccip.chain.link/msg/0x0f88c417c71cb7f19d2bfee769eb392846d45f73eca1a6d1a208ea62a17323aa'
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              Transaction on Chainlink
                            </ArrowLink>
                            <ArrowLink
                              href='https://sepolia.basescan.org/token/0x54d562b3a8b680f8a21d721d22f0bb58a3787555'
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              Transaction on {selectedChain.name}
                            </ArrowLink>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='popLayout'>
        {active.value === 'about' && (
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
            className='w-full'
          >
            <div className='h-full mt-20'>
              <div className='max-w-[800px] z-20 h-full relative mt-5 mx-auto w-full'>
                <div className='rounded-xl border bg-card text-card-foreground h-full pb-2 px-2 shadow-sm'>
                  <div className='flex flex-col p-6 space-y-1'>
                    <h3 className='font-semibold tracking-tight text-2xl'>
                      About
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      The HabibiCross platform is designed to enrich user experiences by connecting digital achievements with real-world rewards. By leveraging blockchain technology, we enable users to claim their earnings in USDC directly through their preferred blockchain networks without the hassle of transaction fees. Our user-friendly interface provides a straightforward process for users to connect their wallet, view their achievements, and claim their rewards, empowering them to capitalize on their skills and dedication.
                      <h3 className='font-semibold tracking-tight text-xl text-white pt-5 pb-2'>
                        Why &nbsp;HabibiCross?
                      </h3>
                      <span className='font-bold'>
                        Rewarding your Excellence:
                      </span>{' '}
                      We believe that your skills should offer more than just digital achievements.
                      <br />
                      <span className='font-bold'>Accessibility:</span> No complicated processes here! Our straightforward interface makes it easy for anyone to start claiming their rewards immediately after connecting their wallet.
                      <br />
                      <span className='font-bold'>Gasless Txn:</span> With Biconomy-powered meta-transactions, you can claim rewards without worrying about blockchain network fees, making the process cost-effective and smooth.
                      <br />
                      <span className='font-bold'>
                        Cross-Chain Compatibility:
                      </span>{' '}
                      Choose from multiple supported blockchains to receive your rewards, giving you the flexibility to use your rewards in various crypto ecosystems.
                      <br />
                      <br />
                      <h3 className='font-semibold tracking-tight text-xl text-white'>
                        Features at a Glance:
                      </h3>
                      <br />
                      <div className='pl-3'>
                        <ul className='list-disc'>
                          <li>
                            <span className='text-white text-lg font-semibold tracking-tight'>
                              Wallet Integration:
                            </span>{' '}
                            <br />
                            Quick and secure connection with popular wallets like MetaMask, Trust Wallet, and Coinbase Wallet.

                          </li>
                        </ul>
                        <ul className='list-disc pt-2'>
                          <li>
                            <span className='text-white text-lg font-semibold tracking-tight'>
                              Dynamic Rewards Dashboard:
                            </span>{' '}
                            <br />
                            View detailed lists of your achievements and rankings across multiple events and platforms.
                          </li>
                        </ul>
                        <ul className='list-disc pt-2'>
                          <li>
                            <span className='text-white text-lg font-semibold tracking-tight'>
                              Instant Reward Claims:
                            </span>{' '}
                            <br />
                            Claim your rewards in USDC instantly on your chosen blockchain network at the click of a button.
                          </li>
                        </ul>
                        <ul className='list-disc pt-2'>
                          <li>
                            <span className='text-white text-lg font-semibold tracking-tight'>
                              Zero Transaction Fees:
                            </span>{' '}
                            <br />
                            Enjoy the benefits of blockchain technology without any of the costs, thanks to our integration with Biconomy.
                          </li>
                        </ul>
                        <ul className='list-disc pt-2'>
                          <li>
                            <span className='text-white text-lg font-semibold tracking-tight'>
                              Multi-Chain Compatibility through Chainlink CCIP:
                            </span>{' '}
                            <br />
                            Select from a variety of blockchain networks for receiving your rewards. Thanks to the integration with Chainlink's CCIP, we offer secure, reliable cross-chain functionality that broadens your options and enhances the flexibility of your reward claims.
                          </li>
                        </ul>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='popLayout'>
        {active.value === 'faq' && (
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
              duration: 0.5,
            }}
            className='w-full'
          >
            <CardContainer className='h-full'>
              <CardBody className='max-w-[500px] z-20 h-full relative mt-5 mx-auto w-full'>
                <div className='rounded-xl border bg-card text-card-foreground h-full pb-2 px-2 shadow-sm'>
                  <div className='flex flex-col p-6 space-y-1'>
                    <h3 className='font-semibold tracking-tight text-center text-2xl'>
                      FAQ&nbsp;🎮&nbsp;🏆
                    </h3>
                    <p className='text-sm text-muted-foreground text-center'>
                      Unlock your rewards 🎉. Connect your wallet 🎮,
                      view your achievements 🏅, and claim your USDC rewards 💵
                      on your preferred chain—no gas fees, just your skills
                      rewarded. 👾
                    </p>
                    <div className='h-[30px]'></div>
                    <Accordion type='single' collapsible className='w-full'>
                      <AccordionItem value='item-1'>
                        <AccordionTrigger>
                          How do I start using HabibiCross?
                        </AccordionTrigger>
                        <AccordionContent>
                          Begin by connecting your blockchain wallet to the
                          portal. Once linked, the portal will automatically
                          fetch and display your achievements and
                          available rewards.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-2'>
                        <AccordionTrigger>
                          {' '}
                          Which wallets are supported?
                        </AccordionTrigger>
                        <AccordionContent>
                          We support major wallets like MetaMask, Trust Wallet,
                          and Coinbase Wallet. Ensure your wallet is compatible
                          with Web3 for a smooth experience.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-3'>
                        <AccordionTrigger>
                          What rewards can I claim?
                        </AccordionTrigger>
                        <AccordionContent>
                          You can claim rewards in USDC based on your
                          achievements and rankings in various games and events
                          that you’ve participated in.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-4'>
                        <AccordionTrigger>
                          How do I choose the blockchain to receive my rewards?
                        </AccordionTrigger>
                        <AccordionContent>
                          After viewing your rewards, you can select your
                          preferred blockchain from the menu before confirming
                          your claim. We currently support Base, Binance Smart
                          Chain, and Polygon.{' '}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-5'>
                        <AccordionTrigger>
                          Are there any fees involved?
                        </AccordionTrigger>
                        <AccordionContent>
                          No, there are no transaction fees for claiming
                          rewards. All gas fees are covered by our integration
                          with Biconomy, ensuring a cost-free claiming process
                          for you.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-6'>
                        <AccordionTrigger>
                          How often can I claim my rewards?
                        </AccordionTrigger>
                        <AccordionContent>
                          Rewards are typically calculated and made available
                          for claim at the end of each event or
                          competitions. You can claim your rewards as soon as
                          they appear in your dashboard.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-7'>
                        <AccordionTrigger>
                          What if my rewards don’t show up?
                        </AccordionTrigger>
                        <AccordionContent>
                          Ensure your wallet is correctly connected and that you
                          are looking at the right account. If issues persist,
                          please contact our support team through the help
                          section of the portal.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='item-8'>
                        <AccordionTrigger>Is my data secure?</AccordionTrigger>
                        <AccordionContent>
                          Yes, data security is a top priority for us. We use
                          the latest encryption and security practices to ensure
                          that all your data remains private and secure.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
