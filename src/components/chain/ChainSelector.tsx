'use client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { baseSepolia, morphSepolia, sepolia, xdcTestnet } from 'wagmi/chains';

import { cn } from '@/lib/utils';


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
            setSelectedChain({ id: sepolia.id, name: sepolia.name });
          }}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:text-accent-foreground h-10 px-4 py-2',
            chain.id === sepolia.id && 'bg-[#8C8C8C]',
            'hover:bg-[#8C8C8C]'
          )}
        >
          <Image src="/images/sepolia.png" alt='Sepolia' width={12} height={10} />
          &nbsp; Sepolia
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
