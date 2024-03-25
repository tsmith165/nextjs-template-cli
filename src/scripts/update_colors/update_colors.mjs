import { updateTailwindConfig, updateNextConfig, updateFaviconSvg, extractColorCodes, mapColorCodes, getColorPalette } from './utils.mjs';
import { runTests } from './tests.mjs';

async function main() {
    const coolorsUrl = await getColorPalette();

    const coolors_url_color_codes = extractColorCodes(coolorsUrl);

    console.log('Captured following color codes from URL:', coolors_url_color_codes);

    if (coolors_url_color_codes && coolors_url_color_codes.length < 5) {
        console.error('Invalid Coolors.co URL format. Please provide a URL with 5 colors. Exiting...');
        process.exit(1);
    }
    const colors = mapColorCodes(coolors_url_color_codes);

    console.log('Setting tailwind colors...');
    updateTailwindConfig(colors);

    console.log('Setting publicRuntimeConfig...');
    updateNextConfig(colors);

    console.log('Updating favicon color...');
    updateFaviconSvg(colors.primary);

    console.log('Running tests...');
    runTests(colors);
}

main();
