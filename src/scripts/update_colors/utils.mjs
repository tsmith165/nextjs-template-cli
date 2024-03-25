import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colorPalettes = {
    'sunny-days': 'https://coolors.co/fdc500-ffd500-00296b-003f88-00509d',
    'violet-beauregarde': 'https://coolors.co/9b5de5-8b008b-89cff0-6050dc-00009c',
    'cool-blue': 'https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8',
    'warm-sunset': 'https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c',
    'neon-vibes': 'https://coolors.co/fb3640-39c7c7-65f0d5-9ff7c7-f7ff37',
    'retro-wave': 'https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4',
};

const TW_CONFIG_COLOR_KEYS = ['primary', 'primary_dark', 'secondary_light', 'secondary', 'secondary_dark', 'accent_color', 'grey'];

async function getColorPalette() {
    const { colorPalette } = await inquirer.prompt([
        {
            type: 'list',
            name: 'colorPalette',
            message: 'Select a color palette or enter a custom Coolors.co URL:',
            choices: [
                ...Object.keys(colorPalettes).map((key) => ({
                    name: `${key} (${colorPalettes[key]})`,
                    value: colorPalettes[key],
                })),
                new inquirer.Separator(),
                {
                    name: 'Enter custom Coolors.co URL',
                    value: 'custom',
                },
            ],
        },
    ]);

    if (colorPalette === 'custom') {
        const { customUrl } = await inquirer.prompt([
            {
                type: 'input',
                name: 'customUrl',
                message: 'Enter a custom Coolors.co URL:',
            },
        ]);
        return customUrl;
    }

    return colorPalette;
}

function updateTailwindConfig(colors) {
    const tailwindConfigPath = path.join(__dirname, '..', '..', 'tailwind.config.js');
    const tailwindConfigLines = fs.readFileSync(tailwindConfigPath, 'utf-8').split('\n');

    let isInColorConstant = false;
    for (let i = 0; i < tailwindConfigLines.length; i++) {
        const line = tailwindConfigLines[i];
        if (line.includes('const colors = {')) {
            isInColorConstant = true;
        }

        if (isInColorConstant) {
            if (line.includes('}')) {
                isInColorConstant = false;
            }

            for (const color_key of TW_CONFIG_COLOR_KEYS) {
                if (line.trim().startsWith(`${color_key}:`)) {
                    tailwindConfigLines[i] = `        ${color_key}: '${colors[color_key]}',`;
                }
            }
        }
    }

    const updatedTailwindConfig = tailwindConfigLines.join('\n');
    fs.writeFileSync(tailwindConfigPath, updatedTailwindConfig, 'utf-8');
    console.log('Colors written in tailwind.config.js');
}

function updateNextConfig(colors) {
    const nextConfigPath = path.join(__dirname, '..', '..', 'next.config.js');
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');

    const updatedNextConfigContent = nextConfigContent.replace(
        /colorScheme:\s*{[\s\S]*?},/,
        `colorScheme: ${JSON.stringify(colors, null, 2)},`
    );

    fs.writeFileSync(nextConfigPath, updatedNextConfigContent, 'utf-8');
    console.log('Colors written in next.config.js');
}

function updateFaviconSvg(primaryColor) {
    const faviconPath = path.join(__dirname, '..', '..', 'public', 'favicon.svg');
    const faviconContent = fs.readFileSync(faviconPath, 'utf-8');

    const updatedFaviconContent = faviconContent.replace(/fill="(#[0-9a-fA-F]+)"/, `fill="${primaryColor}"`);

    fs.writeFileSync(faviconPath, updatedFaviconContent, 'utf-8');
    console.log('Favicon color updated in /public/favicon.svg');
}

function extractColorCodes(url) {
    return url.split('/').pop()?.split('-');
}

function mapColorCodes(coolors_url_color_codes) {
    return {
        primary: `#${coolors_url_color_codes[0]}`,
        primary_dark: `#${coolors_url_color_codes[1]}`,
        secondary_light: `#${coolors_url_color_codes[2]}`,
        secondary: `#${coolors_url_color_codes[3]}`,
        secondary_dark: `#${coolors_url_color_codes[4]}`,
        accent_color: '#44403c',
        grey: '#D3D3D3',
    };
}

export { updateTailwindConfig, updateNextConfig, updateFaviconSvg, extractColorCodes, mapColorCodes, getColorPalette };
