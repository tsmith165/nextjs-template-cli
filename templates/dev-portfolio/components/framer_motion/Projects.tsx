'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { portfolioData } from '../../lib/portfolio_data';

export default function Projects() {
    if (!portfolioData.projects || portfolioData.projects.length === 0) {
        return null; // Don't render the component if no projects data is provided
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
                    Projects
                </span>
            </motion.h2>
            <div className="space-y-8 max-w-full overflow-hidden">
                {portfolioData.projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-4 md:mb-0">
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <div className="relative h-fit w-fit rounded-lg overflow-hidden bg-secondary_dark">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover object-center w-full h-full p-1.5"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="md:w-1/2 md:ml-8">
                            <h3 className="text-xl font-bold">
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <span className="bg-gradient-to-r from-secondary_dark to-secondary_light text-transparent bg-clip-text">
                                        {project.title}
                                    </span>
                                </Link>
                            </h3>
                            <p className="mt-2 text-secondary_light">{project.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
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
