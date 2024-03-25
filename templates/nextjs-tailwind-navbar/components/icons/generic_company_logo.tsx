// /components/icons/generic_company_logo.tsx
import React from 'react';

const GenericCompanyLogo = ({ color, className }: { color: string; className?: string }) => (
    <svg width="65" height="65" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className={className} fill={color}>
        <path
            d="M40.5 26L49 34.5L53.5 30.2C56 27.9 58.8 26 59.7 26C60.7 26 66.9 31.4 85.5 50L61.5 74H43.5L47 70.5C50 67.5 51.2 67 55 67C59.3 67 59.8 66.7 76.5 50L59.5 33L53.5 39L64.5 50L40.5 74L27.5 73.8C15.4 73.5 14.5 73.4 14.2 71.5C13.9 70 17.9 65.4 44.5 39.1L41.5 36C38.8 33.2 37.9 33 25.5 33L36.5 44L32 48.5L23 39.5C18 34.5 13.9 29.8 13.8 28.9C13.7 28 14 27 14.5 26.7C15 26.3 21 26 40.5 26ZM25.5 67H38.5L55.5 50C50.9 45.3 49.3 44 49 44C48.7 44 43.3 49.2 37 55.5Z"
            transform="translate(0, 0)"
        />
    </svg>
);

export default GenericCompanyLogo;
