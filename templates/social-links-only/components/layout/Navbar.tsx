import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="fixed top-0 right-0 z-50 p-2">
            <div className="flex items-center justify-center space-x-4 bg-secondary_dark rounded-full p-2 shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-secondary">
                <Link href="https://www.linkedin.com/in/torrey-smith" passHref>
                    <FaLinkedin className="h-6 w-6 text-primary hover:text-secondary_dark transition-colors duration-300 ease-in-out" />
                </Link>
                <Link href="https://github.com/tsmith165" passHref>
                    <FaGithub className="h-6 w-6 text-primary hover:text-secondary_dark transition-colors duration-300 ease-in-out" />
                </Link>
            </div>
        </nav>
    );
}
