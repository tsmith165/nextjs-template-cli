// /components/layout/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { menu_list } from '../../lib/menu_list';
import LogoComponent from './LogoComponent';

export default function Navbar({ page }: { page: string }) {
    console.log('Navbar: page=', page);

    const generateNavbar = () => {
        return menu_list.map(([menuItemClass, menuItemString, , tabUrlEndpoint], i) => {
            // console.log(`Page: ${page} | Tab: ${tabUrlEndpoint}`);
            const isActive = tabUrlEndpoint === page;
            return (
                <Link key={i} href={tabUrlEndpoint} passHref>
                    <div
                        className={`inline-block rounded-b-lg px-4 py-1 font-bold md-nav:rounded-b-none md-nav:rounded-t-lg md-nav:py-3 ${
                            isActive
                                ? 'bg-gradient-to-t from-secondary to-primary text-secondary_light'
                                : 'bg-gradient-to-t from-secondary_light to-secondary text-black hover:from-secondary hover:to-primary hover:text-secondary_light'
                        }`}>
                        {menuItemString}
                    </div>
                </Link>
            );
        });
    };

    return (
        <nav className="bg-secondary_dark p-0">
            <div className="flex flex-col-reverse items-center p-0 md-nav:flex-row md-nav:items-end">
                <div className="flex h-full w-full justify-center md-nav:w-[35%] md-nav:justify-end">
                    <Link href="/" passHref>
                        <div className="flex justify-center md-nav:justify-start">
                            <LogoComponent />
                        </div>
                    </Link>
                </div>
                <div className="flex h-full w-full justify-center md-nav:w-[60%] md-nav:justify-start">{generateNavbar()}</div>
            </div>
        </nav>
    );
}
