import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type PageLayoutProps = {
    children: ReactNode;
    page: string;
};

export default function PageLayout({ children, page }: PageLayoutProps) {
    return (
        <div className="h-[100dvh] bg-neutral-900">
            <Navbar page={page} />
            <main className="h-[calc(100dvh-50px)]">{children}</main>
        </div>
    );
}
