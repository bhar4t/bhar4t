---
title: "How to publish a React component to npm?"
date: "2021-08-06"
cover: "npm.webp"
keywords: "javascript, React, component, publish, how, own"
author: "Bharat Sahu"
description: "Learn how to publish your own React component to npm in a few simple steps. This guide covers everything from setting up your project to publishing your component for others to use."
---


# Publish a React Component to npm

## Steps to Publish Your React Component

### 1. Create a React Application

Use Create React App to set up your project:

```bash
npx create-react-app your-component-name
```

### 2. Add Development Dependencies

Install Babel CLI and the React preset:

```bash
npm install --save-dev @babel/cli @babel/preset-react
```

Or, if using yarn:

```bash
yarn add --dev @babel/cli @babel/preset-react
```

### 3. Configure Babel

Add the Babel React preset to your `package.json`:

```json
"babel": {
  "presets": [
    "@babel/preset-react"
  ]
}
```

### 4. Set Package Visibility

Change the `private` field in `package.json` to `false`:

```json
"private": false
```

### 5. Add Build Script

Include a script to transpile your component and copy it to the `dist` directory. Add the following to the `scripts` section of your `package.json`:

For Windows:

```json
"publish:npm": "rmdir /s /q dist && mkdir dist && babel .\src\component -d dist --copy-files"
```

For Linux:

```json
"publish:npm": "rm -rf dist && mkdir dist && babel src/component -d dist --copy-files"
```

### 6. Create Your Component

Inside the `src` directory, create a folder named `component` (or any name you prefer) and add your component file, e.g., `index.js`:

```jsx
import React from 'react';

function ReusableComponent() {
  return (
    <div>
      Hello, World!
    </div>
  );
}

export default ReusableComponent;
```

### 7. Specify the Entry Point

In `package.json`, set the `main` field to point to your compiled component:

```json
"main": "./dist/index.js"
```

### 8. Define Peer Dependencies

Move React-related dependencies to `peerDependencies` in `package.json` to avoid duplication in projects that install your component:

```json
"peerDependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2"
}
```

### 9. Build Your Component

Run the build script to generate the `dist` directory:

```bash
npm run publish:npm
```

Or, if using yarn:

```bash
yarn publish:npm
```

### 10. Publish to npm

Ensure you're logged in to npm and publish your package:

```bash
npm login
npm publish
```

Remember to update the version number in `package.json` before each publish.

---

By following these steps, you can share your React components via npm for reuse in other projects.

[Published NPM React Component](https://www.npmjs.com/package/reuse-react-component)
