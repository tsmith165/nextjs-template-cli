import '../styles/globals.css';

import React, { ReactNode } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

import { PHProvider } from './providers'

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <PHProvider>
                <body className="w-full h-full">
                    <main>{children}</main>
                </body>
            </PHProvider>
        </html>
    );
}
