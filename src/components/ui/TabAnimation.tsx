"use client"
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

interface TabAnimationProps {
    tabs: { name: string; href: string }[];
}

export const TabAnimation = ({
    tabs
}: TabAnimationProps) => {

const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <nav>
        <ul className='flex flex-1 justify-center items-center gap-4'>
            {tabs.map((item) => (
                <Link href={item.href} key={item.name}>
                    <motion.li 
                        initial={false}
                        className='relative px-3 py-[5px]'
                        onClick={() => setSelectedTab(item)}
                    >
                        <p className='text-sm text-background'>{item.name}</p>
                        {item === selectedTab && (
                            <motion.div
                                className='absolute -bottom-1 left-0 right-0 h-[2px] bg-primary'
                                layoutId="underline"
                                id="underline"
                            />
                        )}
                    </motion.li>
                </Link>
            ))}
        </ul>
    </nav>
  )
}
