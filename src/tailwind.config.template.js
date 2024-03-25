const colors = {
    primary: '{{PRIMARY}}',
    primary_dark: '{{PRIMARY_DARK}}',
    secondary_light: '{{SECONDARY_LIGHT}}',
    secondary: '{{SECONDARY}}',
    secondary_dark: '{{SECONDARY_DARK}}',
    accent_color: '{{ACCENT_COLOR}}',
    grey: '#D3D3D3',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors,
        },
    },
    plugins: [require('@tailwindcss/typography')],
    mode: 'jit',
};
