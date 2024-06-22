import typography from '@tailwindcss/typography';

const colors = {
    primary: '{{PRIMARY}}',
    primary_dark: '{{PRIMARY_DARK}}',
    secondary_light: '{{SECONDARY_LIGHT}}',
    secondary: '{{SECONDARY}}',
    secondary_dark: '{{SECONDARY_DARK}}',
    accent_color: '{{ACCENT_COLOR}}',
    grey: '#D3D3D3',
};

export default {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors,
        },
        project_name: '{{PROJECT_NAME}}',
    },
    plugins: [typography],
    mode: 'jit',
};
