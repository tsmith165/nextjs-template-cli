import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TESTS_TO_RUN = ['testTailwindConfig', 'testNextConfig'];
const TW_CONFIG_COLOR_KEYS = ['primary', 'primary_dark', 'secondary_light', 'secondary', 'secondary_dark', 'accent_color', 'grey'];

function runTests(colors) {
    console.log('\n--- Running Tests ---');
    TESTS_TO_RUN.forEach((testName) => {
        console.log(`\nRunning test: ${testName}`);
        switch (testName) {
            case 'testTailwindConfig':
                testTailwindConfig(colors);
                break;
            case 'testNextConfig':
                testNextConfig(colors);
                break;
            default:
                console.log(`Test '${testName}' not found.`);
        }
    });
    console.log('--- Tests Completed ---\n');
}

function testTailwindConfig(colors) {
    const tailwindConfigPath = path.join(__dirname, '..', '..', 'tailwind.config.js');
    const tailwindConfigFile = fs.readFileSync(tailwindConfigPath, 'utf-8').split('\n');

    let updatedColors = {};
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
        console.log('\x1b[32m%s\x1b[0m', 'Test passed: Colors in tailwind.config.js match the expected values.');
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Test failed: Colors in tailwind.config.js do not match the expected values.');
        console.log('Expected colors:', colors);
        console.log('Actual colors:', updatedColors);
    }
}

function testNextConfig(colors) {
    const nextConfigPath = path.join(__dirname, '..', '..', 'next.config.js');
    const nextConfigFile = fs.readFileSync(nextConfigPath, 'utf-8');

    let updatedNextConfigColors = {};
    const publicRuntimeConfigRegex = /publicRuntimeConfig:\s*{[\s\S]*?colorScheme:\s*({[\s\S]*?}),[\s\S]*?},/;
    const publicRuntimeConfigMatch = nextConfigFile.match(publicRuntimeConfigRegex);

    if (publicRuntimeConfigMatch) {
        const colorSchemeMatch = publicRuntimeConfigMatch[1];
        updatedNextConfigColors = JSON.parse(colorSchemeMatch);
    }

    const isNextConfigColorsEqual = TW_CONFIG_COLOR_KEYS.every((key) => colors[key] === updatedNextConfigColors[key]);

    if (isNextConfigColorsEqual) {
        console.log('\x1b[32m%s\x1b[0m', 'Test passed: Colors in next.config.js match the expected values.');
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Test failed: Colors in next.config.js do not match the expected values.');
        console.log('Expected colors:', colors);
        console.log('Actual colors:', updatedNextConfigColors);
    }
}

export { runTests };
