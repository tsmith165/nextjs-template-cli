#!/usr/bin/env node
import { program } from 'commander';
import { copySync } from 'fs-extra';
import { execSync } from 'child_process';
import * as path from 'path';
import { templates } from './templates.js';
import inquirer from 'inquirer';
import os from 'os';
import fs from 'fs';
program
    .command('init <projectName>')
    .description('Initialize a new project with the custom setup')
    .option('-d, --dir <directory>', 'Specify the directory where the project will be created')
    .action(async (projectName, { dir }) => {
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
    const defaultDir = os.platform() === 'win32' ? 'C:/NEXT_JS' : '/root/NEXT_JS';
    const projectDir = dir ? path.resolve(dir, projectName) : path.resolve(defaultDir, projectName);
    // Create the project directory if it doesn't exist
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }
    const templateDir = path.resolve(process.cwd(), 'templates', selectedTemplate.name);
    // Copy template files to the project directory
    copySync(templateDir, projectDir);
    // Navigate to the project directory
    process.chdir(projectDir);
    // Initialize a new yarn project and install dependencies
    execSync('yarn init -y');
    execSync('yarn add next react react-dom tailwindcss postcss autoprefixer @types/react @types/react-dom');
    console.log(`Project "${projectName}" initialized successfully with the "${selectedTemplate.name}" template!`);
    console.log(`Project directory: ${projectDir}`);
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map