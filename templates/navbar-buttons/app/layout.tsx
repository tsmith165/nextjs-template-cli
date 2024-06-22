// /templates/nextjs-tailwind-navbar/app/layout.tsx
import React, { ReactNode } from 'react';
import '../styles/globals.css';

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className="w-full h-full">
                <main>{children}</main>
            </body>
        </html>
    );
}
