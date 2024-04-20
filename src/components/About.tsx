import { motion } from 'framer-motion'


const About = () => {
    return (
        <motion.div
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
    )
}

export default About