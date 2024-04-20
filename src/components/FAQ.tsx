import { motion } from "framer-motion"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const FAQ = () => {
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
                duration: 0.5,
            }}
            className='w-full'
        >
            <div className='h-full mt-20'>
                <div className='max-w-[500px] z-20 h-full relative mt-5 mx-auto w-full'>
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
                </div>
            </div>
        </motion.div>
    )
}

export default FAQ