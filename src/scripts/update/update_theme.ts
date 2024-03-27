import { updateTailwindConfig, extractColorCodes, mapColorCodes } from '../utils/utils.js';
import { fetchSvgIcon, updateFaviconSvg, updateLogoComponent, mapColorsToThemeColors } from '../utils/svg_utils.js';
import { getColorPalette, getIconChoice, getColorSchemeOrder, shouldRegenerateSVG, getAttributeToChange } from '../utils/questions.js';
import { runTests } from './tests.js';
import fs from 'fs';
import path from 'path';
import open from 'open';

async function main() {
    let coolorsUrl = await getColorPalette();
    let iconUrl = await getIconChoice();
    let colorSchemeOrder = await getColorSchemeOrder();

    while (true) {
        const coolors_url_color_codes = extractColorCodes(coolorsUrl);

        console.log('Captured following color codes from URL:', coolors_url_color_codes);

        if (!coolors_url_color_codes || coolors_url_color_codes.length < 5) {
            console.error('Invalid Coolors.co URL format. Please provide a URL with 5 colors. Exiting...');
            process.exit(1);
        }

        const colors = mapColorCodes(coolors_url_color_codes);

        console.log('Setting tailwind colors...');
        updateTailwindConfig(colors);

        console.log('Running tests...');
        runTests(colors);

        console.log('Fetching SVG icon...');
        const svgData = await fetchSvgIcon(iconUrl);

        if (svgData) {
            console.log('Updating favicon...');
            updateFaviconSvg(svgData, colors, colorSchemeOrder, process.cwd());

            console.log('Updating logo component...');
            updateLogoComponent(svgData, colors, colorSchemeOrder, process.cwd());

            console.log('Generating image preview...');
            const updatedSvgData = mapColorsToThemeColors(svgData, colors, colorSchemeOrder);
            const previewFilePath = path.join(process.cwd(), 'public', 'theme-preview.svg');
            fs.writeFileSync(previewFilePath, updatedSvgData);

            console.log(`Image preview saved to: ${previewFilePath}`);
            console.log('Opening image preview in the default web browser...');
            await open(previewFilePath);
        } else {
            console.error('Failed to fetch SVG icon. Skipping favicon, logo, and image preview updates.');
        }

        const should_regenerate = await shouldRegenerateSVG();
        if (should_regenerate == false) {
            break;
        }

        const changeChoice = await getAttributeToChange();

        switch (changeChoice.change) {
            case 'SVG Image':
                iconUrl = await getIconChoice();
                break;
            case 'Color Scheme':
                coolorsUrl = await getColorPalette();
                break;
            case 'Color Order':
                colorSchemeOrder = await getColorSchemeOrder();
                break;
            default:
                console.log('Theme update cancelled.');
                process.exit(0);
        }
    }
    console.log('Theme update completed. Run `yarn dev` to see the changes.');
}

main();
