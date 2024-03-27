import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TW_CONFIG_COLOR_KEYS = ['primary', 'primary_dark', 'secondary_light', 'secondary', 'secondary_dark', 'accent_color', 'grey'];

function updateTailwindConfig(colors: Record<string, string>) {
    const tailwindConfigPath = path.join(__dirname, '..', '..', 'tailwind.config.cjs');
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
    console.log('Colors written in tailwind.config.cjs');
}

function updateNextConfig(colors: Record<string, string>) {
    const nextConfigPath = path.join(__dirname, '..', '..', 'next.config.js');
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');

    const updatedNextConfigContent = nextConfigContent.replace(
        /colorScheme:\s*{[\s\S]*?},/,
        `colorScheme: ${JSON.stringify(colors, null, 2)},`
    );

    fs.writeFileSync(nextConfigPath, updatedNextConfigContent, 'utf-8');
    console.log('Colors written in next.config.js');
}

function extractColorCodes(url: string) {
    return url.split('/').pop()?.split('-');
}

function mapColorCodes(coolors_url_color_codes: string[]) {
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

export { updateTailwindConfig, updateNextConfig, extractColorCodes, mapColorCodes };
