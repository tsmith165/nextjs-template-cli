import fs from 'fs';
import path from 'path';

async function fetchSvgIcon(url: string): Promise<string | null> {
    console.log('Fetching SVG icon from:', url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgData = await response.text();
        const lines = svgData.split('\n');
        const filteredLines = lines.filter((line) => !line.startsWith('<?xml') && !line.startsWith('<!--'));
        const filteredSvgData = filteredLines.join('\n');
        return filteredSvgData;
    } catch (error) {
        console.error('Error fetching SVG icon:', error);
        return null;
    }
}

function updateFaviconSvg(svgData: string, colorScheme: Record<string, string>, colorSchemeOrder: string[], projectDir: string): void {
    const faviconPath = path.join(projectDir, 'public', 'favicon.svg');

    let updatedSvgData = mapColorsToThemeColors(svgData, colorScheme, colorSchemeOrder);
    updatedSvgData = updatedSvgData.replace(/width="\d+px"/, 'width="16"').replace(/height="\d+px"/, 'height="16"');

    // Update stroke-related attributes to camelCase for the favicon
    updatedSvgData = updatedSvgData.replace(/stroke-width/g, 'strokeWidth');
    updatedSvgData = updatedSvgData.replace(/stroke-linecap/g, 'strokeLinecap');
    updatedSvgData = updatedSvgData.replace(/stroke-linejoin/g, 'strokeLinejoin');

    fs.writeFileSync(faviconPath, updatedSvgData, 'utf-8');
    console.log('Favicon updated in /public/favicon.svg');
}

function updateLogoComponent(svgData: string, colorScheme: Record<string, string>, colorSchemeOrder: string[], projectDir: string): void {
    const logoComponentPath = path.join(projectDir, 'components', 'icons', 'generic_company_logo.tsx');
    const logoComponentDir = path.dirname(logoComponentPath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(logoComponentDir)) {
        fs.mkdirSync(logoComponentDir, { recursive: true });
    }

    let updatedSvgData = mapColorsToThemeColors(svgData, colorScheme, colorSchemeOrder);
    updatedSvgData = updatedSvgData.replace(/width="\d+px"/, 'width="55"').replace(/height="\d+px"/, 'height="55"');

    // Update stroke-related attributes to camelCase for the logo component
    updatedSvgData = updatedSvgData.replace(/stroke-width/g, 'strokeWidth');
    updatedSvgData = updatedSvgData.replace(/stroke-linecap/g, 'strokeLinecap');
    updatedSvgData = updatedSvgData.replace(/stroke-linejoin/g, 'strokeLinejoin');

    const logoComponentContent = `import React from 'react';

const GenericCompanyLogo = ({ className }: { className?: string }) => (
    <div className="flex items-center justify-center w-full h-full">
        ${updatedSvgData.replace(/class="/g, 'className="')}
    </div>
);

export default GenericCompanyLogo;
`;
    fs.writeFileSync(logoComponentPath, logoComponentContent);
    console.log('Logo component updated in /components/icons/generic_company_logo.tsx');
}

function mapColorsToThemeColors(svgData: string, colorScheme: Record<string, string>, colorSchemeOrder: string[]): string {
    let updatedSvgData = svgData;

    // Check if the SVG has only one color
    const fillColors = svgData.match(/fill="([^"]+)"/g);
    const strokeColors = svgData.match(/stroke="([^"]+)"/g);
    const hasOneColor = (fillColors === null || fillColors.length === 1) && (strokeColors === null || strokeColors.length === 1);

    if (hasOneColor) {
        // Update the stroke color with the first color in the color scheme order
        updatedSvgData = updatedSvgData.replace(/stroke="([^"]+)"/g, `stroke="${colorScheme[colorSchemeOrder[0]]}"`);
    } else {
        // Create a map to store the frequency of each color fill
        const colorFrequency: Record<string, number> = {};

        // Find all the path elements and count the frequency of each color fill
        const pathRegex = /<path[^>]+fill="([^"]+)"[^>]*>/g;
        let match;
        while ((match = pathRegex.exec(updatedSvgData)) !== null) {
            const color = match[1];
            colorFrequency[color] = (colorFrequency[color] || 0) + 1;
        }

        // Sort the colors based on their frequency in descending order
        const sortedColors = Object.keys(colorFrequency).sort((a, b) => colorFrequency[b] - colorFrequency[a]);

        // Map the sorted colors to the corresponding theme colors based on the user's color scheme order
        const colorMap: Record<string, string> = {};
        colorSchemeOrder.forEach((colorKey, index) => {
            colorMap[sortedColors[index]] = colorScheme[colorKey];
        });

        // Replace the colors in the SVG data with the theme colors
        Object.entries(colorMap).forEach(([originalColor, themeColor]) => {
            updatedSvgData = updatedSvgData.replace(new RegExp(`fill="${originalColor}"`, 'g'), `fill="${themeColor}"`);
        });
    }

    return updatedSvgData;
}

export { fetchSvgIcon, updateFaviconSvg, updateLogoComponent, mapColorsToThemeColors };
