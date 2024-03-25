import React from 'react';
import Link from 'next/link';
import LogoComponent from './LogoComponent';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar({ page }: { page: string }) {
    return (
        <nav className="min-h-[65px] overflow-hidden bg-secondary_dark p-0">
            <div className="flex flex-row">
                <Link href="/">
                    <LogoComponent />
                </Link>
                <div className="absolute right-0 top-[25px] flex h-[40px] w-fit flex-row">
                    <HamburgerMenu page={page} />
                </div>
            </div>
        </nav>
    );
}
