// /components/framer_motion/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { portfolio } from '../../lib/portfolio_data';

export default function Hero() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
            }}
            className="flex flex-col md:flex-row items-center justify-center w-3/5 mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-auto md:flex-shrink-0 md:pr-8">
                <div className="relative w-full max-w-64 h-auto rounded-xl overflow-hidden bg-secondary_dark">
                    <Image
                        src={portfolio.bioImage}
                        alt={portfolio.name}
                        width={500}
                        height={500}
                        className="object-cover p-1.5 rounded-xl"
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:flex-1 mt-8 md:mt-0 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4 text-secondary_light">{portfolio.name}</h1>
                <p className="text-2xl mb-4">
                    <span className="bg-gradient-to-r from-secondary_light via-secondary via-30% to-primary_dark to-55% underline text-transparent bg-clip-text font-bold">
                        {portfolio.title}
                    </span>
                </p>
                <p className="text-secondary_light">{portfolio.bio}</p>
            </motion.div>
        </motion.div>
    );
}
