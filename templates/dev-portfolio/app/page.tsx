import { Metadata } from 'next';
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Hero from '../components/framer_motion/Hero';
import Technologies from '../components/framer_motion/Technologies';
import Experience from '../components/framer_motion/Experience';
import Projects from '../components/framer_motion/Projects';
import Volunteering from '../components/framer_motion/Volunteering';
import Contact from '../components/framer_motion/Contact';

export const metadata: Metadata = {
    title: 'Torrey Smith - Portfolio',
    description: 'Development Lead and Full Stack Developer',
    icons: {
        icon: {
            url: '/favicon.svg',
            type: 'image/svg+xml',
        },
    },
    openGraph: {
        title: 'Torrey Smith - Portfolio',
        description: 'Development Lead and Full Stack Developer',
        url: 'https://www.torreysmith.dev',
        siteName: 'Torrey Smith - Portfolio',
        images: [
            {
                url: 'https://www.torreysmith.dev/torrey_smith_dev_screenshot.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
};

export default function Home() {
    return (
        <PageLayout page="/">
            <div className="w-full bg-gradient-to-b from-primary to-primary_dark to-20%">
                <div className="w-full py-12 space-y-10">
                    <Hero />
                    <Technologies />
                    <Experience />
                    <Projects />
                    <Volunteering />
                    <Contact />
                </div>
            </div>
        </PageLayout>
    );
}
