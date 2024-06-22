import React from 'react';
import type { Metadata } from 'next';
import PageLayout from '../components/layout/PageLayout';
import MainView from './main_view';

export const metadata: Metadata = {
    title: 'Example Site Title',
    description:
        'Example Site Description. This is an example site description. It is a description of the example site. It is an example site description.',
    keywords: 'example, site, keywords, comma, separated',
    applicationName: 'Example Site Name',
    icons: {
        icon: '/logo/example-site-icon.png',
        shortcut: '/logo/example-site-shortcut.png',
        apple: '/ico/example-site-apple-touch-icon.png',
    },
    openGraph: {
        title: 'Example Site Title',
        description:
            'Example Site Description. This is an example site description. It is a description of the example site. It is an example site description.',
        siteName: 'Example Site Name',
        url: 'https://www.example.com',
        images: [
            {
                url: '/ico/example-site-open-graph-image.png',
                width: 1200,
                height: 630,
                alt: 'Example Site Open Graph Image',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    metadataBase: new URL('https://www.example.com'),
};

export default async function Home() {
    return (
        <PageLayout page="home">
            <MainView />
        </PageLayout>
    );
}
