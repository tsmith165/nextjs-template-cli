export interface Template {
    name: string;
    description: string;
}

export const templates: Template[] = [
    {
        name: 'dev-portfolio',
        description: 'A Portfolio project using Next.js, Tailwind CSS, and Framer Motion',
    },
    {
        name: 'nextjs-tailwind-navbar',
        description: 'A Next.js project with Tailwind CSS and a custom navbar component',
    },
    {
        name: 'nextjs-tailwind-navbar-hamburger',
        description: 'A Next.js project with Tailwind CSS and a custom navbar component with a hamburger menu',
    },
    {
        name: 'nextjs-tailwind-social-links-only',
        description: 'A Next.js project with Tailwind CSS and social links only (no navbar)',
    },
];
