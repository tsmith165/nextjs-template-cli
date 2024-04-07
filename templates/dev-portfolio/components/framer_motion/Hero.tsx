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
            className="flex flex-col md:flex-row items-center justify-center w-4/5 mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4 text-secondary_dark">{portfolio.name}</h1>
                <p className="text-2xl mb-4">
                    <span className="bg-gradient-to-r from-secondary_light via-secondary via-30% to-primary_dark to-55% underline text-transparent bg-clip-text font-bold">
                        {portfolio.title}
                    </span>
                </p>
                <p className="text-secondary">{portfolio.bio}</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-1/2 flex justify-center">
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
        </motion.div>
    );
}
