'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { menu_list } from '../../lib/menu_list';

export default function HamburgerMenu({ page }: { page: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const generateMenuItem = ([menuItemClass, menuItemString, , tabUrlEndpoint]: [string, string, boolean, string], index: number) => {
        // console.log(`Page: ${page} | Tab: ${tabUrlEndpoint}`);
        const isActive = tabUrlEndpoint === page;
        const isLastItem = index === menu_list.length - 1; // Check if the current item is the last item
        return (
            <Link key={index} href={tabUrlEndpoint}>
                <div
                    className={`block px-4 py-2 font-bold border-l-2 border-l-secondary ${
                        isActive
                            ? 'bg-gradient-to-r from-secondary to-primary text-secondary_light'
                            : 'text-primary bg-secondary_light hover:bg-secondary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-secondary_light'
                    } ${isLastItem ? 'rounded-bl-md border-b-2 border-b-secondary' : ''}`}>
                    {menuItemString}
                </div>
            </Link>
        );
    };

    return (
        <div className="flex w-fit flex-row" onMouseLeave={() => setIsOpen(false)}>
            <div className="p-0">
                <div className="h-full w-full cursor-pointer" onClick={handleMenuToggle}>
                    <svg
                        className={`h-[40px] w-[40px] rounded-tl-md p-[2.5px] ${
                            isOpen ? 'bg-secondary_light fill-primary' : 'bg-primary fill-secondary_light'
                        } hover:bg-secondary hover:fill-secondary_light`}
                        viewBox="0 0 24 24">
                        {
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H5z"
                            />
                        }
                    </svg>
                </div>

                {isOpen && <div className="absolute right-0 z-50 h-fit w-[200px]">{menu_list.map(generateMenuItem)}</div>}
            </div>
        </div>
    );
}
