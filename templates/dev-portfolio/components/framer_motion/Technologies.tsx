'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { technologies } from '../../lib/portfolio_data';

export default function Technologies() {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.2 },
        }),
        hover: {
            scale: 1.1,
            transition: { duration: 0.3, type: 'spring', stiffness: 400, damping: 10 },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
            }}
            viewport={{ once: false }}
            className="w-4/5 mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-secondary_light via-secondary via-30% to-primary to-65% underline text-transparent bg-clip-text">
                    Technologies
                </span>
            </motion.h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-4">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: false }}
                            variants={itemVariants}
                            className="flex flex-col items-center">
                            <div className="relative h-20 w-20 bg-secondary_dark shadow-md rounded-lg p-4">
                                <Image src={tech.logo} alt={tech.name} fill className="p-1.5" />
                            </div>
                            <p className="text-md font-bold text-secondary mt-2">{tech.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
