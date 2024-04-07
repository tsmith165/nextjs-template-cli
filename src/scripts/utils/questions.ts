// /scripts/utils/questions.ts
import * as p from '@clack/prompts';
import { Template } from './templates.js';
import { colorPalettes, svgIcons } from './constants.js';

async function getTemplate(templates: Template[]): Promise<string> {
    const template = await p.select({
        message: 'Select a project template:',
        options: templates.map((t) => ({
            label: `${t.name} - ${t.description}`,
            value: t.name,
        })),
    });
    return template as string;
}

async function getProjectName(): Promise<string> {
    const projectName = await p.text({
        message: 'Enter the project name:',
        validate: (value: string) => {
            if (value.trim().length === 0) {
                return 'Please enter a valid project name.';
            }
        },
        initialValue: 'Gnarly Project',
    });
    return projectName as string;
}

async function getOutputDir(defaultOutputDir: string): Promise<string> {
    const outputDir = await p.text({
        message: 'Enter the output directory:',
        initialValue: defaultOutputDir,
    });
    return outputDir as string;
}

async function getColorPalette(): Promise<string> {
    const colorPalette = await p.select({
        message: 'Select a color palette or enter a custom Coolors.co URL:',
        options: [
            ...Object.keys(colorPalettes).map((key) => ({
                label: `${key} (${colorPalettes[key]})`,
                value: colorPalettes[key],
            })),
            {
                label: 'Enter custom Coolors.co URL',
                value: 'custom',
            },
        ],
    });

    if (colorPalette === 'custom') {
        const customUrl = await p.text({
            message: 'Enter a custom Coolors.co URL:',
        });
        return customUrl as string;
    }

    return colorPalette as string;
}

async function getAccentColor(defaultAccentColor: string): Promise<string> {
    const accentColor = await p.text({
        message: 'Enter the accent color (leave empty to use default color):',
        initialValue: defaultAccentColor,
    });
    return accentColor as string;
}

async function getIconChoice(): Promise<string> {
    const iconChoice = await p.select({
        message: 'Select an SVG icon or enter a custom svgrepo.com URL:',
        options: [
            ...Object.keys(svgIcons).map((key) => ({
                label: `${key} - (www.svgrepo.com/svg/${svgIcons[key]})`,
                value: `https://www.svgrepo.com/download/${svgIcons[key]}.svg`,
            })),
            {
                label: 'Enter custom svgrepo.com URL',
                value: 'custom',
            },
        ],
    });

    if (iconChoice === 'custom') {
        const customIconUrl = await p.text({
            message: 'Enter a custom svgrepo.com URL:',
        });
        return customIconUrl as string;
    }

    return iconChoice as string;
}

async function confirmOverwrite(): Promise<boolean> {
    const overwrite = await p.confirm({
        message: 'A project already exists at the specified directory. Do you want to overwrite it?',
    });
    console.log('confirming overwrite?: ' + String(overwrite));
    return overwrite as boolean;
}

async function getColorSchemeOrder(): Promise<string[]> {
    const colorSchemeOrder: string[] = [];
    const availableColors = ['secondary', 'secondary_light', 'primary', 'secondary_dark', 'primary_dark'];
    console.log('Suggested default color order is: ' + availableColors.join(' > '));
    console.log('Press enter 5 times to select the default color order, or set your own order for accuracy.');

    for (let i = 0; i < 5; i++) {
        const colorChoice = await p.select({
            message: `Select color ${i + 1} for the logo:`,
            options: availableColors.map((color) => ({
                label: color,
                value: color,
            })),
        });

        colorSchemeOrder.push(colorChoice as string);
        const selectedColorIndex = availableColors.indexOf(colorChoice as string);
        availableColors.splice(selectedColorIndex, 1);
    }

    return colorSchemeOrder;
}

async function shouldRegenerateSVG(): Promise<boolean> {
    const make_changes = await p.confirm({
        message: 'Should we make changes to the color scheme or logo attributes?',
    });
    return make_changes as boolean;
}

async function getAttributeToChange(): Promise<{ change: string }> {
    const change = await p.select({
        message: 'What do you want to change?',
        options: [
            { label: 'SVG Image', value: 'SVG Image' },
            { label: 'Color Scheme', value: 'Color Scheme' },
            { label: 'Color Order', value: 'Color Order' },
            { label: 'All Good!', value: 'All Good!' },
        ],
    });
    return { change: change as string };
}

export {
    getTemplate,
    getProjectName,
    getOutputDir,
    getColorPalette,
    getAccentColor,
    getIconChoice,
    confirmOverwrite,
    getColorSchemeOrder,
    shouldRegenerateSVG,
    getAttributeToChange,
};
