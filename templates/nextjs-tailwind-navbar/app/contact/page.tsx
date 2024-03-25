import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact us!',
    icons: {
        icon: {
            url: '/favicon.svg',
            type: 'image/svg+xml',
        },
    },
};

import React from 'react';
import PageLayout from '../../components/layout/PageLayout';

export default function Contact() {
    return (
        <PageLayout page="/contact">
            <div className="flex items-center justify-center h-full bg-primary">
                <div className="max-w-3xl mx-auto p-8">
                    <h1 className="text-4xl font-bold text-secondary_dark mb-4">Contact Us</h1>
                    <div className="prose text-secondary_light">
                        <p className="text-xl">
                            We'd love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to reach
                            out to us.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at velit eu ligula bibendum tempor. Sed euismod,
                            urna eu tincidunt consectetur, nisl nunc aliquam nisl, eget aliquam nisl nunc eu augue.
                        </p>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
                            quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
