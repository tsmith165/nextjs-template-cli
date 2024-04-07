'use client';
import { motion } from 'framer-motion';
import { volunteering } from '../../lib/portfolio_data';

export default function Volunteering() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
            }}
            viewport={{ once: false }}
            className="w-4/5 mx-auto overflow-hidden">
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-secondary_light via-secondary via-30% to-primary to-65% underline text-transparent bg-clip-text">
                    Volunteering
                </span>
            </motion.h2>
            <div className="space-y-8">
                {volunteering.map((vol, index) => (
                    <motion.div
                        key={vol.organization}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="w-full md:w-1/3 md:text-right md:pr-8">
                            <h3 className="text-xl font-bold ">
                                <span className="bg-gradient-to-r from-secondary_dark to-secondary_light text-transparent bg-clip-text">
                                    {vol.organization}
                                </span>
                            </h3>
                            <p className="text-lg text-secondary md:mt-2">{vol.duration}</p>
                        </div>
                        <div className="w-full md:w-2/3 mt-2 md:mt-0">
                            <p className="text-lg font-bold text-secondary">{vol.position}</p>
                            <p className="mt-2 text-secondary">{vol.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
