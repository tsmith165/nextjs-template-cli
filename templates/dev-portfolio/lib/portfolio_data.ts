export const portfolio = {
    name: 'Torrey Smith',
    title: 'Full Stack Developer',
    bio: 'Energetic and driven development professional with over 7 years of experience in SSD test automation and validation. Proven track record of leading teams to success, achieving 100% test coverage and 15% improvement in product quality. Passionate about continuous learning and leveraging strong programming skills to quickly adapt to new technologies.',
    bioImage: '/bio_image.png',
    email: 'torreysmith165@gmail.com',
    linkedin: 'linkedin.com/in/torrey-smith',
    github: 'github.com/tsmith165',
};

export const technologies = [
    { name: 'Python', logo: '/python_logo.png' },
    { name: 'Node.js', logo: '/nodejs_logo.png' },
    { name: 'Next.js', logo: '/nextjs_logo.png' },
    { name: 'TypeScript', logo: '/typescript_logo.png' },
    { name: 'Tailwind', logo: '/tailwind_logo.png' },
    { name: 'PostgreSQL', logo: '/postgres_logo.png' },
];

export const experience = [
    {
        company: 'Solidigm (HCL Contract)',
        position: 'Lead Solidigm SSD Validation Development',
        duration: '06/2021 - Present',
        description:
            'Led the successful recruitment, training, and development of a 6-member team, achieving full productivity within 2 months. Resulted in a highly skilled and productive team that has ensured efficient and accurate test content creation.',
        techStack: ['Python', 'Powershell', 'Bash', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SQL'],
    },
    {
        company: 'Intel (Kelly Contract)',
        position: 'Intel SSD Validation Development',
        duration: '03/2018 - 06/2021',
        description:
            'Collaborated with Intel and customers to create automated test content that ensured 100% product compliance with specifications.',
        techStack: ['Python', 'Powershell', 'Bash', 'SQL'],
    },
    {
        company: 'Orange Coast College',
        position: 'Data Entry Specialist',
        duration: '08/2014 - 10/2017',
        description: 'Performed data entry tasks and assisted with various administrative duties.',
        techStack: ['Microsoft Office'],
    },
];

export const projects = [
    {
        title: 'JWS Fine Art',
        description: 'Art gallery sales site that fully handles web orders, payment processing, shipping, and support.',
        image: '/jws_fine_art-gallery_screenshot.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQl', 'Stripe', 'AWS S3'],
    },
    {
        title: 'Rust Wipes',
        description:
            'Pulls raw data from the BattleMetrics API and processes it in order to output upcoming data that no other competitor has tracked.',
        image: '/rust_wipes-homepage_screenshot.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'API Scraping'],
    },
];

export const volunteering = [
    {
        organization: 'Elk Grove HS Volleyball',
        position: 'Assistant Coach',
        duration: '01/2017 - 01/2019',
        description:
            "As a volunteer Assistant Coach for a high school volleyball team, I actively contributed to player development, teamwork, and performance. Through training sessions and strategic planning, I helped enhance the team's competitive edge while honing my leadership, communication, and organizational skills. This experience showcased my dedication to youth development and community engagement through sports.",
    },
    {
        organization: 'HCL Mentor Program',
        position: 'Mentor',
        duration: '08/2021 - Present',
        description:
            'As a mentor in the HCL Mentor Program, I helped multiple freshers ramp up their skills and knowledge, enabling them to secure full-time positions within the company. Through one-on-one guidance, training sessions, and project collaborations, I actively contributed to their professional growth and success.',
    },
];
