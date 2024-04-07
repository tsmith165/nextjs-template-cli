import { program } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { templates } from './scripts/utils/templates.js';
import { getTemplate, getProjectName, getOutputDir, getColorPalette, getAccentColor, getIconChoice, confirmOverwrite, getColorSchemeOrder, shouldRegenerateSVG, getAttributeToChange, } from './scripts/utils/questions.js';
import { fetchSvgIcon, updateFaviconSvg, updateLogoComponent, mapColorsToThemeColors } from './scripts/utils/svg_utils.js';
const OUTPUT_DIR_DEFAULT = 'C:/DEV/next_js';
const ACCENT_COLOR_DEFAULT = '#44403c';
program
    .command('init')
    .description('Initialize a new project with the custom setup')
    .action(async () => {
    var _a;
    const template = await getTemplate(templates);
    const selectedTemplate = templates.find((t) => t.name === template);
    if (!selectedTemplate) {
        console.log(`Template "${template}" not found.`);
        process.exit(1);
    }
    const projectName = await getProjectName();
    const sanitizedProjectName = projectName.replace(/ /g, '-');
    const outputDir = await getOutputDir(OUTPUT_DIR_DEFAULT);
    let colorScheme = {
        primary: '#606c38',
        primary_dark: `#283618`,
        secondary_light: '#fefae0',
        secondary: '#dda15e',
        secondary_dark: '#bc6c25',
        accent_color: '#44403c',
    };
    let svgData = null;
    let projectDir;
    let coolorsUrl = await getColorPalette();
    let accentColor = await getAccentColor(ACCENT_COLOR_DEFAULT);
    let iconUrl = await getIconChoice();
    let colorSchemeOrder = await getColorSchemeOrder();
    while (true) {
        if (coolorsUrl) {
            const colorCodes = (_a = coolorsUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('-');
            if (colorCodes && colorCodes.length >= 5) {
                colorScheme = {
                    primary: `#${colorCodes[0]}`,
                    primary_dark: `#${colorCodes[1]}`,
                    secondary_light: `#${colorCodes[2]}`,
                    secondary: `#${colorCodes[3]}`,
                    secondary_dark: `#${colorCodes[4]}`,
                    accent_color: accentColor,
                };
            }
            else {
                console.log('Invalid Coolors.co URL. Using default color scheme.');
            }
        }
        // Fetch SVG icon and generate image preview
        console.log('Fetching SVG icon...');
        svgData = await fetchSvgIcon(iconUrl);
        if (svgData) {
            console.log('Generating image preview...');
            const updatedSvgData = mapColorsToThemeColors(svgData, colorScheme, colorSchemeOrder);
            const previewFilePath = path.join(__dirname, '..', 'icon-preview.svg');
            fs.writeFileSync(previewFilePath, updatedSvgData);
            console.log(`Image preview saved to: ${previewFilePath}`);
            console.log('Opening image preview in the default web browser...');
            await open(previewFilePath);
        }
        else {
            console.error('Failed to fetch SVG icon. Skipping image preview.');
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
                accentColor = await getAccentColor(ACCENT_COLOR_DEFAULT);
                break;
            case 'Color Order':
                colorSchemeOrder = await getColorSchemeOrder();
                break;
            case 'All Good!':
                console.log('All good! Proceeding with project creation.');
                break;
            default:
                console.log('Project creation cancelled.');
                process.exit(0);
        }
    }
    console.log(`Starting project ${sanitizedProjectName} creation with outputDir: `, outputDir);
    projectDir = path.resolve(outputDir, sanitizedProjectName);
    if (!fs.existsSync(projectDir)) {
        // Create the project directory if it doesn't exist
        fs.mkdirSync(projectDir, { recursive: true });
    }
    else {
        // If the project directory already exists, ask the user if they want to overwrite it
        const overwrite = await confirmOverwrite();
        if (!overwrite) {
            console.log('Project creation cancelled.');
            process.exit(1);
        }
    }
    const templateDir = path.resolve(process.cwd(), 'templates', selectedTemplate.name);
    // Copy template files to the project directory, excluding tailwind.config.cjs
    const ignorePaths = ['tailwind.config.cjs'];
    fs.copySync(templateDir, projectDir, { filter: (src, dest) => !ignorePaths.includes(path.basename(dest)) });
    // Check if .vscode/settings.json file exists in the template
    const vsCodeSettingsPath = path.join(templateDir, '.vscode', 'settings.json');
    if (fs.existsSync(vsCodeSettingsPath)) {
        // Read the existing settings.json file
        const vsCodeSettings = fs.readJsonSync(vsCodeSettingsPath);
        // Update the "window.title" to the project name
        vsCodeSettings['window.title'] = sanitizedProjectName;
        // Write the updated settings.json file to the project directory
        const projectVsCodeSettingsPath = path.join(projectDir, '.vscode', 'settings.json');
        fs.writeJsonSync(projectVsCodeSettingsPath, vsCodeSettings, { spaces: 2 });
    }
    // Copy the scripts folder to the project directory
    const scriptsDir = path.join(__dirname, '..', 'src', 'scripts');
    fs.copySync(scriptsDir, path.join(projectDir, 'scripts'));
    // Navigate to the project directory
    process.chdir(projectDir);
    // Set the PROJECT_NAME environment variable
    process.env.PROJECT_NAME = sanitizedProjectName.replace('-', ' ');
    // Read the content of the tailwind.config.template.ts file
    const tailwindConfigTemplatePath = path.join(__dirname, '..', 'src', 'tailwind.config.template.ts');
    const tailwindConfigTemplate = fs.readFileSync(tailwindConfigTemplatePath, 'utf-8');
    // Generate the tailwind.config.cjs content by replacing placeholders with color values
    const tailwindConfigContent = tailwindConfigTemplate
        .replace('{{PRIMARY}}', colorScheme.primary)
        .replace('{{PRIMARY_DARK}}', colorScheme.primary_dark)
        .replace('{{SECONDARY_LIGHT}}', colorScheme.secondary_light)
        .replace('{{SECONDARY}}', colorScheme.secondary)
        .replace('{{SECONDARY_DARK}}', colorScheme.secondary_dark)
        .replace('{{ACCENT_COLOR}}', colorScheme.accent_color)
        .replace('{{PROJECT_NAME}}', sanitizedProjectName);
    // Write the tailwind.config.cjs file to the project directory
    const tailwindConfigPath = path.join(projectDir, 'tailwind.config.cjs');
    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
    // Read the content of the gitignore_template file
    const gitignoreTemplatePath = path.join(__dirname, '..', 'gitignore_template');
    const gitignoreContent = fs.readFileSync(gitignoreTemplatePath, 'utf-8');
    // Create .gitignore file
    fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent.trim());
    // Create the public directory if it doesn't exist
    const publicDir = path.join(projectDir, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    if (svgData) {
        console.log('Updating favicon...');
        updateFaviconSvg(svgData, colorScheme, colorSchemeOrder, projectDir);
        console.log('Updating logo component...');
        updateLogoComponent(svgData, colorScheme, colorSchemeOrder, projectDir);
    }
    else {
        console.error('Failed to fetch SVG icon. Skipping favicon and logo updates.');
    }
    // Create .env file with the project name
    console.log('Creating .env file...');
    const envContent = `PROJECT_NAME=${sanitizedProjectName}\nNODE_OPTIONS="--experimental-specifier-resolution=node --no-warnings=ExperimentalWarning"`;
    fs.writeFileSync(path.join(projectDir, '.env'), envContent);
    // Initialize a new yarn project and install dependencies
    console.log('Initializing yarn project with all dependencies...');
    execSync('yarn add next react react-dom tailwindcss @tailwindcss/typography postcss autoprefixer @types/react @types/react-dom open');
    // Update the package.json file with the project name and update-theme script
    console.log('Updating package.json...');
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = sanitizedProjectName.toLowerCase().replace(/ /g, '-');
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    console.log(`Project "${sanitizedProjectName}" initialized successfully with the "${selectedTemplate.name}" template!`);
    console.log(`Project directory: ${projectDir}`);
    execSync(`code "${projectDir}"`);
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map