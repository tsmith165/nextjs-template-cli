export const portfolioData = {
    personal: {
        name: 'Torrey Smith',
        title: 'Full Stack Developer',
        bio: 'Energetic and driven development professional with over 7 years of experience in SSD test automation and validation. Proven track record of leading teams to success, achieving 100% test coverage and 15% improvement in product quality. Passionate about continuous learning and leveraging strong programming skills to quickly adapt to new technologies.',
        bioImage: '/bio_image.png',
        email: 'torreysmith165@gmail.com',
        linkedin: 'linkedin.com/in/torrey-smith',
        github: 'github.com/tsmith165',
    },
    technologies: [
        { name: 'Python', logo: '/img/technologies/python_logo.png' },
        { name: 'Node.js', logo: '/img/technologies/nodejs_logo.png' },
        { name: 'Next.js', logo: '/img/technologies/nextjs_logo.png' },
        { name: 'TypeScript', logo: '/img/technologies/typescript_logo.png' },
        { name: 'Tailwind', logo: '/img/technologies/tailwind_logo.png' },
        { name: 'PostgreSQL', logo: '/img/technologies/postgres_logo.png' },
    ],
    experience: [
        {
            company: 'Solidigm (HCL Contract)',
            position: 'Lead SSD Validation Developer',
            duration: '06/2021 - Present',
            description:
                'Led the successful recruitment, training, and development of a 6-member team, achieving full productivity within 2 months. Resulted in a highly skilled and productive team that has ensured efficient and accurate test content creation.',
            techStack: ['Python', 'Powershell', 'Bash', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SQL'],
            logo: '/img/employers/solidigm_logo.png',
        },
        {
            company: 'Intel (Kelly Contract)',
            position: 'SSD Validation Developer',
            duration: '03/2018 - 06/2021',
            description:
                'Collaborated with Intel and customers to create automated test content that ensured 100% product compliance with specifications.',
            techStack: ['Python', 'Powershell', 'Bash', 'SQL'],
            logo: '/img/employers/intel_logo.png',
        },
        {
            company: 'Orange Coast College',
            position: 'Data Entry Specialist',
            duration: '08/2014 - 10/2017',
            description: 'Performed data entry tasks and assisted with various administrative duties.',
            techStack: ['Microsoft Office'],
            logo: '/img/employers/orange_coast_college_logo.jpg',
        },
    ],
    projects: [
        {
            title: 'JWS Fine Art',
            description: 'Art gallery sales site that fully handles web orders, payment processing, shipping, and support.',
            image: '/img/projects/jws_fine_art-gallery_screenshot.png',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQl', 'Stripe', 'AWS S3'],
        },
        {
            title: 'Rust Wipes',
            description:
                'Pulls raw data from the BattleMetrics API and processes it in order to output upcoming data that no other competitor has tracked.',
            image: '/img/projects/rust_wipes-homepage_screenshot.png',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'API Scraping'],
        },
    ],
    volunteering: [
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
    ],
    openSourceContributions: [
        {
            title: 'LazyVim Ubuntu Installer',
            description:
                'A comprehensive setup script to automate the setup of WSL and install/configure Ubuntu with a GUI environment, RDP access, graphics-accelerated terminal, fonts/themes/icons, pre-configured Neovim (LazyVim), and various development tools for a quick dev environment startup.',
            link: 'https://github.com/tsmith165/lazyvim-ubuntu-installer',
            techStack: ['Bash', 'WSL', 'Ubuntu', 'Neovim', 'LazyVim'],
            image: '/img/open_source/lazyvim_ubuntu_installer.png',
        },
        {
            title: 'NextJS Template CLI',
            description:
                'A powerful starter booster project designed to help kickstart new web application ideas quickly and efficiently. It provides a solid foundation for building modern, high-performance websites using NextJS 14, TypeScript, and Tailwind CSS.',
            link: 'https://github.com/tsmith165/nextjs-template-cli',
            techStack: ['NextJS', 'TypeScript', 'Tailwind CSS', 'CLI'],
            image: '/img/open_source/template-cli-reel.gif',
        },
        {
            title: 'Copy File Path and Contents (VSCode Extension)',
            description:
                'A Visual Studio Code extension that provides a convenient way to copy the file path and its content to the clipboard. It allows easily sharing code snippets, file paths, or entire file contents with others, directly from the VS Code editor.',
            link: 'https://github.com/tsmith165/copy_file_path_and_contents',
            techStack: ['TypeScript', 'Visual Studio Code', 'Extension'],
            image: '/img/open_source/copy_file_path_and_contents.png',
        },
    ],
};
