#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { templates } from './templates.js';

const OUTPUT_DIR_DEFAULT = 'C:/DEV/next_js';
const ACCENT_COLOR_DEFAULT = '#44403c';

type ColorPalettes = { [key: string]: string };

const colorPalettes: ColorPalettes = {
    'sunny-days': 'https://coolors.co/fdc500-ffd500-00296b-003f88-00509d',
    'violet-beauregarde': 'https://coolors.co/9b5de5-8b008b-89cff0-6050dc-00009c',
    'cool-blue': 'https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8',
    'neon-vibes': 'https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c',
    'warm-sunset': 'https://coolors.co/fb3640-39c7c7-65f0d5-9ff7c7-f7ff37',
    'retro-wave': 'https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4',
};

program
    .command('init')
    .description('Initialize a new project with the custom setup')
    .action(async () => {
        const { template } = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Select a project template:',
                choices: templates.map((t) => ({
                    name: `${t.name} - ${t.description}`,
                    value: t.name,
                })),
            },
        ]);

        const selectedTemplate = templates.find((t) => t.name === template);

        if (!selectedTemplate) {
            console.log(`Template "${template}" not found.`);
            process.exit(1);
        }

        const { projectName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter the project name:',
                validate: (value) => {
                    if (value.trim().length === 0) {
                        return 'Please enter a valid project name.';
                    }
                    return true;
                },
            },
        ]);

        const sanitizedProjectName = projectName.replace(' ', '-');

        const { outputDir } = await inquirer.prompt([
            {
                type: 'input',
                name: 'outputDir',
                message: 'Enter the output directory:',
                default: OUTPUT_DIR_DEFAULT,
            },
        ]);

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

        let coolorsUrl;
        if (colorPalette === 'custom') {
            const { customUrl } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'customUrl',
                    message: 'Enter a custom Coolors.co URL:',
                },
            ]);
            coolorsUrl = customUrl;
        } else {
            coolorsUrl = colorPalette;
        }

        const { accentColor } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accentColor',
                message: 'Enter the accent color (leave empty to use default color):',
                default: ACCENT_COLOR_DEFAULT,
            },
        ]);

        let colorScheme = {
            primary: '#606c38',
            primary_dark: `#283618`,
            secondary_light: '#fefae0',
            secondary: '#dda15e',
            secondary_dark: '#bc6c25',
            accent_color: '#44403c',
        };

        if (coolorsUrl) {
            const colorCodes = coolorsUrl.split('/').pop()?.split('-');
            if (colorCodes && colorCodes.length >= 5) {
                colorScheme = {
                    primary: `#${colorCodes[0]}`,
                    primary_dark: `#${colorCodes[1]}`,
                    secondary_light: `#${colorCodes[2]}`,
                    secondary: `#${colorCodes[3]}`,
                    secondary_dark: `#${colorCodes[4]}`,
                    accent_color: accentColor,
                };
            } else {
                console.log('Invalid Coolors.co URL. Using default color scheme.');
            }
        }

        console.log(`Starting project ${sanitizedProjectName} creation with outputDir: `, outputDir);
        const projectDir = path.resolve(outputDir, sanitizedProjectName);

        if (!fs.existsSync(projectDir)) {
            // Create the project directory if it doesn't exist
            fs.mkdirSync(projectDir, { recursive: true });
        } else {
            // If the project directory already exists, ask the user if they want to overwrite it
            const { overwrite } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: 'A project already exists at the specified directory. Do you want to overwrite it?',
                    default: false,
                },
            ]);

            if (overwrite) {
                fs.removeSync(projectDir);
            } else {
                console.log('Project creation cancelled.');
                process.exit(1);
            }
        }

        const templateDir = path.resolve(process.cwd(), 'templates', selectedTemplate.name);

        // Copy template files to the project directory, excluding tailwind.config.js
        const ignorePaths = ['tailwind.config.js'];
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

        // Read the content of the tailwind.config.template.js file
        const tailwindConfigTemplatePath = path.join(__dirname, '..', 'src', 'tailwind.config.template.js');
        const tailwindConfigTemplate = fs.readFileSync(tailwindConfigTemplatePath, 'utf-8');

        // Generate the tailwind.config.js content by replacing placeholders with color values
        const tailwindConfigContent = tailwindConfigTemplate
            .replace('{{PRIMARY}}', colorScheme.primary)
            .replace('{{PRIMARY_DARK}}', colorScheme.primary_dark)
            .replace('{{SECONDARY_LIGHT}}', colorScheme.secondary_light)
            .replace('{{SECONDARY}}', colorScheme.secondary)
            .replace('{{SECONDARY_DARK}}', colorScheme.secondary_dark)
            .replace('{{ACCENT_COLOR}}', colorScheme.accent_color);

        // Write the tailwind.config.js file to the project directory
        const tailwindConfigPath = path.join(projectDir, 'tailwind.config.js');
        fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

        // Read the content of the gitignore_template file
        const gitignoreTemplatePath = path.join(__dirname, '..', 'gitignore_template');
        const gitignoreContent = fs.readFileSync(gitignoreTemplatePath, 'utf-8');

        // Create .gitignore file
        fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent.trim());

        // Create next.config.js file
        const nextConfigContent = `module.exports = {
            publicRuntimeConfig: {
                projectName: process.env.PROJECT_NAME || 'company-name',
                colorScheme: {
                    primary: '${colorScheme.primary}',
                    primary_dark: '${colorScheme.primary_dark}',
                    secondary: '${colorScheme.secondary}',
                    secondary_light: '${colorScheme.secondary_light}',
                    secondary_dark: '${colorScheme.secondary_dark}',
                    accent_color: '${colorScheme.accent_color}',
                },
            },
        };`;
        fs.writeFileSync(path.join(projectDir, 'next.config.js'), nextConfigContent.trim());

        // Create the public directory if it doesn't exist
        const publicDir = path.join(projectDir, 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        // Create the favicon.svg file
        const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" fill="${colorScheme.primary}">
    <path d="M40.5 26L49 34.5L53.5 30.2C56 27.9 58.8 26 59.7 26C60.7 26 66.9 31.4 85.5 50L61.5 74H43.5L47 70.5C50 67.5 51.2 67 55 67C59.3 67 59.8 66.7 76.5 50L59.5 33L53.5 39L64.5 50L40.5 74L27.5 73.8C15.4 73.5 14.5 73.4 14.2 71.5C13.9 70 17.9 65.4 44.5 39.1L41.5 36C38.8 33.2 37.9 33 25.5 33L36.5 44L32 48.5L23 39.5C18 34.5 13.9 29.8 13.8 28.9C13.7 28 14 27 14.5 26.7C15 26.3 21 26 40.5 26ZM25.5 67H38.5L55.5 50C50.9 45.3 49.3 44 49 44C48.7 44 43.3 49.2 37 55.5Z"/>
</svg>`;
        fs.writeFileSync(path.join(projectDir, 'public', 'favicon.svg'), faviconSvg.trim());

        // Initialize a new yarn project and install dependencies
        execSync(
            'yarn add next react react-dom tailwindcss @tailwindcss/typography postcss autoprefixer @types/react @types/react-dom inquirer'
        );

        // Update the package.json file with the project name and update-colors script
        const packageJsonPath = path.join(projectDir, 'package.json');
        const packageJson = fs.readJsonSync(packageJsonPath);

        packageJson.name = sanitizedProjectName;

        packageJson.scripts = {
            ...packageJson.scripts,
            'update-colors': 'node scripts/update_colors/update_colors.mjs',
        };

        fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

        console.log(`Project "${sanitizedProjectName}" initialized successfully with the "${selectedTemplate.name}" template!`);
        console.log(`Project directory: ${projectDir}`);

        execSync(`code "${projectDir}"`);
    });

program.parse(process.argv);
