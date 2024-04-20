'use client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { baseSepolia, bscTestnet, morphSepolia, xdcTestnet } from 'wagmi/chains';

import { cn } from '@/lib/utils';

import { useToast } from '@/components/ui/use-toast';

const ChainSelector = ({
  chain,
  setSelectedChain,
}: {
  chain: {
    id: number;
    name: string;
  };
  setSelectedChain: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
    }>
  >;
}) => {
  const { toast } = useToast();

  return (
    <div className='p-6 pt-0 grid gap-4 mt-2'>
      <label
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        htmlFor='email'
      >
        Select chain for reward
      </label>
      <div className='grid grid-cols-2 gap-6'>
        <button
          onClick={() => {
            setSelectedChain({ id: baseSepolia.id, name: baseSepolia.name });
          }}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:text-accent-foreground h-10 px-4 py-2',
            chain.id === baseSepolia.id && 'bg-[#0455FF]',
            'hover:bg-[#0455FF]'
          )}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_1_276)'>
              <path
                d='M11.9789 24C18.6182 24 24 18.6278 24 12C24 5.37216 18.6182 0 11.9789 0C5.68032 0 0.5136 4.83648 0 10.991H15.889V13.009H0C0.5136 19.1635 5.68032 24 11.9789 24Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_1_276'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          &nbsp; Base
        </button>
        <button
          onClick={() => {
            setSelectedChain({ id: bscTestnet.id, name: bscTestnet.name });
          }}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:text-accent-foreground h-10 px-4 py-2',
            chain.id === bscTestnet.id && 'bg-[#F0B90B]',
            'hover:bg-[#F0B90B]'
          )}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_6_309)'>
              <path
                d='M5.424 12L2.736 14.688L0 12L2.736 9.264L5.424 12ZM12 5.424L16.656 10.08L19.392 7.344L12 0L4.656 7.344L7.392 10.08L12 5.424ZM21.264 9.264L18.576 12L21.312 14.736L24 12L21.264 9.264ZM12 18.576L7.344 13.92L4.608 16.656L12 24L19.344 16.656L16.656 13.92L12 18.576ZM12 14.688L14.736 11.952L12 9.264L9.264 12L12 14.688Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_6_309'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          &nbsp; Binance
        </button>
        <button
          onClick={() => {
            setSelectedChain({ id: morphSepolia.id, name: morphSepolia.name });
          }}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:text-accent-foreground h-10 px-4 py-2',
            chain.id === morphSepolia.id && 'bg-[#A5FE5B]/70',
            'hover:bg-[#A5FE5B]/80'
          )}
        >
          <Image src="/images/morph.png" alt='Morph' width={20} height={10} />&nbsp;
          Morph Sepolia
        </button>
        <button
          onClick={() => {
            setSelectedChain({ id: xdcTestnet.id, name: xdcTestnet.name });
          }}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:text-accent-foreground h-10 px-4 py-2',
            chain.id === xdcTestnet.id && 'bg-[#9FF3FF]/80',
            'hover:bg-[#9FF3FF]/80'
          )}
        >
          <Image src="/images/xdc.png" alt='XDC' width={30} height={10} />&nbsp;
          XDC network
        </button>
      </div>
    </div>
  );
};

export default ChainSelector;
