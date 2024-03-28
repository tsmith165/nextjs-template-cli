import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TESTS_TO_RUN = ['testTailwindConfig'];
const TW_CONFIG_COLOR_KEYS = ['primary', 'primary_dark', 'secondary_light', 'secondary', 'secondary_dark', 'accent_color', 'grey'];

function runTests(colors: Record<string, string>) {
    console.log('\n--- Running Tests ---');
    TESTS_TO_RUN.forEach((testName) => {
        console.log(`\nRunning test: ${testName}`);
        switch (testName) {
            case 'testTailwindConfig':
                testTailwindConfig(colors);
                break;
            default:
                console.log(`Test '${testName}' not found.`);
        }
    });
    console.log('--- Tests Completed ---\n');
}

function testTailwindConfig(colors: Record<string, string>) {
    const tailwindConfigPath = path.join(__dirname, '..', '..', 'tailwind.config.cjs');
    const tailwindConfigFile = fs.readFileSync(tailwindConfigPath, 'utf-8').split('\n');

    let updatedColors: Record<string, string> = {};
    let isInColorConstant = false;

    tailwindConfigFile.forEach((line) => {
        if (line.includes('const colors = {')) {
            isInColorConstant = true;
        }

        if (isInColorConstant) {
            if (line.includes('}')) {
                isInColorConstant = false;
            }

            const colorKey = TW_CONFIG_COLOR_KEYS.find((key) => line.trim().startsWith(`${key}:`));
            if (colorKey) {
                const colorValue = line.trim().split(':')[1].trim().replace(/'/g, '').replace(',', '');
                updatedColors[colorKey] = colorValue;
            }
        }
    });

    const isColorsEqual = TW_CONFIG_COLOR_KEYS.every((key) => colors[key] === updatedColors[key]);

    if (isColorsEqual) {
        console.log('\x1b[32m%s\x1b[0m', 'Test passed: Colors in tailwind.config.cjs match the expected values.');
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Test failed: Colors in tailwind.config.cjs do not match the expected values.');
        console.log('Expected colors:', colors);
        console.log('Actual colors:', updatedColors);
    }
}

export { runTests };
