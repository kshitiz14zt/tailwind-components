
# Tailwind Template V1.0.1

## Project Overview

This is tailwind template V1.0.1. The project involves modernizing the website's design and functionality, implementing responsive design, and integrating the latest web technologies using tailwindcss.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Gulp Tasks](#gulp-tasks)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone <github code link>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd tailwind-template
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   pnpm install
   ```

## Usage

### Running the Project

To start the development server with live reloading and open the project in your browser, use the following command:

```bash
pnpm gulp
```

This will:

- Clean the `dist` directory
- Process Tailwind CSS
- Render HTML files using Nunjucks
- Copy JavaScript and image files
- Start a local development server on localhost link.

### Building the Project

To create a production build of the project:

```bash
pnpm gulp build
```

This command will create a minified and optimized version of the project in the `dist` directory.

## Gulp Tasks

Here are the key Gulp tasks defined in this project:

- **`clean`**: Removes the `dist` directory to ensure a fresh build.
- **`css`**: Processes the CSS using Tailwind and Autoprefixer, then outputs it to `dist/css`.
- **`html`**: Renders Nunjucks templates to HTML, minifies them, and outputs them to `dist`.
- **`js`**: Copies JavaScript files (including jQuery) to `dist/js`.
- **`images`**: Copies images to `dist/images`.
- **`watch`**: Watches for changes in source files and reruns the relevant tasks.
- **`serve`**: Starts a local development server with live reloading.
- **`open`**: Automatically opens the project in the default browser.

## Tailwind CSS Configuration

This project uses a custom Tailwind CSS configuration with a prefix (`sy_`) added to all generated classes to avoid conflicts. The configuration can be found in `tailwind.config.js` and includes custom screen sizes, spacing, colors, fonts, and more.

```javascript
module.exports = {
  prefix: 'sy_',
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      // Customizations here
    },
  },
  plugins: [],
};
```

## File Structure

Here’s an overview of the project’s file structure:

```
lubecker-psychotherapietage-V1.0.1/
├── dist/                  # Output directory for built files
├── src/                   # Source files
│   ├── css/               # Tailwind CSS and other styles
    ├── fonts/             # Fonts
│   ├── images/            # Images
│   ├── js/                # JavaScript files
    ├── html/              # Tailwind CSS and other styles
│     ├── partials/        # Nunjucks partials (components, layouts)
│     └── pages/           # Main HTML pages
├── gulpfile.js            # Gulp configuration file
├── package.json           # Project metadata and dependencies
├── postcss.config.js      # PostCSS configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository, create a new branch, and submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Description of changes"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## © [2025] [FZTPL]. All rights reserved
# tailwind-components
# tailwind-components
# tailwind-components
