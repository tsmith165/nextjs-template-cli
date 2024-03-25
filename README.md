# NextJS Template CLI

NextJS Template CLI is a powerful starter booster project designed to help you kickstart your new web application ideas quickly and efficiently. With a robust set of features and optimizations, this CLI tool provides a solid foundation for building modern, high-performance websites using NextJS 14, TypeScript, and Tailwind CSS.

![NextJs Template CLI Banner](assets/next_ts_tailwind_coolors_template_cli.png)

## Core Features

🚀 **NextJS 14 with App Directory, Server Components, and Layout Optimizations**
Harness the full potential of NextJS 14 with its cutting-edge features. The App Directory architecture enables better organization and performance, while Server Components allow for seamless server-side rendering. Enjoy optimized layouts for a smooth and efficient development experience.

🎨 **Tailwind CSS for Streamlined Styling**
Leverage the power of Tailwind CSS to rapidly build beautiful and responsive user interfaces. With its utility-first approach, you can create custom designs effortlessly, saving time and ensuring consistency across your application.

🌈 **Coolors.co Integration for Effortless Color Scheme Customization**
Easily personalize your application's color scheme using the Coolors.co integration. Simply provide a Coolors.co link, and watch as your chosen palette is seamlessly applied throughout your project, including the tailwind configuration, next configuration, and even the favicon.

🧩 **TypeScript for Enhanced Code Quality and Scalability**
Embrace the benefits of TypeScript to write type-safe and maintainable code. Catch potential errors early in the development process and enjoy improved code intelligence and refactoring capabilities.

🍬 **Fully Functional Navbar and Site Menu Options**
Choose from two meticulously crafted navbar and site menu configurations that are ready to use right out of the box. These fully functional components provide a professional and intuitive navigation experience for your users.

🎭 **SVG Logo and Favicon Support**
Make your application truly yours by easily incorporating your own branding assets. The CLI supports SVG logos and favicons, ensuring that your application reflects your unique identity across all devices and platforms.

🏗️ **Automated Configuration and Setup**
Save time and focus on what matters most—building your application. The NextJS Template CLI takes care of the initial configuration for essential files such as `tailwind.config.js`, `next.config.js`, `package.json`, `.vscode`, `postcss.config.js`, and `next-env.d.ts`. It also installs the necessary packages using Yarn, providing a hassle-free setup process.

🎨 **Convenient Color Scheme Updates**
Changing your application's color scheme is a breeze with the built-in `yarn update-colors` script. Simply provide a Coolors.co link, and watch as your chosen color palette is seamlessly applied throughout your project.

## Getting Started

1. Clone the repository into your current working directory

```
git clone https://github.com/your-username/nextjs-template-cli.git
```

2. Navigate to cloned project directory

```
cd nextjs-template-cli
```

3. Install dependencies

```
yarn install
```

4. Build the project

```
yarn build
```

5. Create a new project using the CLI:

```
yarn start init my-awesome-project
```

![CLI Inquirer Questions](assets/template_cli_screenshot.png) 6. Follow the prompts to customize your project's configuration, such as choosing a color scheme and navbar style. 7. Once the project is generated, navigate to the project directory:

```
cd my-awesome-project
```

8. Start the development server:

```
yarn dev
```

9. Open your browser and visit http://localhost:3000 to see your new NextJS application in action!

![Development Server Screenshot](assets/site_screenshot.png)

## Customization and Development

The NextJS Template CLI provides a solid foundation for your project, but the real magic happens when you start customizing and building upon it. Dive into the codebase and explore the various components, pages, and configurations. Modify the styles, add new features, and make the application truly yours.

Remember to leverage the power of TypeScript and Tailwind CSS to create maintainable, efficient, and visually stunning code. The CLI sets you up for success, but the rest is up to you!

## 🎨 Updating Color Scheme

NextJS Template CLI makes it easy to update the color scheme of your generated project. The `update_colors` script allows you to change the colors by providing a Coolors.co URL.

To update the color scheme:

1. Make sure you are in the root directory of your generated project.

2. Run the following command:

```
yarn update-colors
```

3. You will be prompted to select a color palette from a list of predefined options or enter a custom Coolors.co URL.

-   If you choose a predefined color palette, simply select it from the list.
-   If you want to use a custom color palette, select "Enter custom Coolors.co URL" and provide a valid Coolors.co URL when prompted.

4. The script will extract the color codes from the selected color palette and update the following files:

-   tailwind.config.js: The color constants in the Tailwind CSS configuration file will be updated with the new color values.
-   next.config.js: The publicRuntimeConfig.colorScheme object will be updated with the new color values.
-   public/favicon.svg: The fill color of the favicon SVG will be updated to match the new primary color.

5. The script will also run tests to ensure that the color updates were applied correctly. If the tests pass, you will see success messages indicating that the colors were updated successfully.

That's it! Your project's color scheme will now reflect the selected color palette. You can run the development server to see the updated colors in action.

## Contributing

We welcome contributions from the community! If you have any ideas, suggestions, or bug reports, please open an issue on the GitHub repository. If you'd like to contribute code, feel free to submit a pull request.

## License

This project is licensed under the MIT License.

Happy coding, and may your web application ideas come to life with NextJS Template CLI! 🌟
