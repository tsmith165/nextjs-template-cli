import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type PageLayoutProps = {
    children: ReactNode;
    page: string;
};

export default function PageLayout({ children, page }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar page={page} />
            <main className="h-[calc(100vh-97px)]">{children}</main>
        </div>
    );
}
