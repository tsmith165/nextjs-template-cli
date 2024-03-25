// /components/icons/generic_company_logo.tsx
import React from 'react';

const GenericCompanyLogo = ({ color, className }: { color: string; className?: string }) => (
    <svg width="65" height="65" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className={className} fill={color}>
        <path
            d="m40.5 26l8.5 8.5 4.5-4.3c2.5-2.3 5.3-4.2 6.2-4.2 1 0 7.2 5.4 25.8 24l-24 24h-18l3.5-3.5c3-3 4.2-3.5 8-3.5 4.3 0 4.8-0.3 21.5-17l-17-17-6 6 11 11-24 24-13-0.2c-12.1-0.3-13-0.4-13.3-2.3-0.3-1.5 3.7-6.1 30.3-32.4l-3-3.1c-2.7-2.8-3.6-3-16-3l11 11-4.5 4.5-9-9c-5-5-9.1-9.7-9.2-10.6-0.1-0.9 0.2-1.9 0.7-2.2 0.5-0.4 6.5-0.7 26-0.7zm-15 41h13l17-17c-4.6-4.7-6.2-6-6.5-6-0.3 0-5.7 5.2-12 11.5z"
            transform="translate(0, 0)"
        />
    </svg>
);

export default GenericCompanyLogo;
