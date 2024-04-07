'use client';
import { motion } from 'framer-motion';
import { portfolioData } from '../../lib/portfolio_data';

export default function Experience() {
    if (!portfolioData.experience || portfolioData.experience.length === 0) {
        return null; // Don't render the component if no experience data is provided
    }

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
                    Experience
                </span>
            </motion.h2>
            <div className="space-y-8 max-w-full overflow-hidden">
                {portfolioData.experience.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="w-full md:w-1/3 md:text-right md:pr-8">
                            <h3 className="text-xl font-bold">
                                <span className="bg-gradient-to-r from-secondary_dark to-secondary_light text-transparent bg-clip-text">
                                    {exp.company}
                                </span>
                            </h3>
                            <p className="text-lg text-secondary_light md:mt-2">{exp.duration}</p>
                        </div>
                        <div className="w-full md:w-2/3 mt-2 md:mt-0">
                            <p className="text-lg font-bold text-secondary">{exp.position}</p>
                            <p className="mt-2 text-secondary">{exp.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {exp.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="inline-block bg-secondary_dark text-secondary_light hover:text-secondary_dark hover:bg-secondary rounded-full px-3 py-1 text-sm font-semibold">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
