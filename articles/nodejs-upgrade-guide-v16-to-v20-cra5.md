---
title: "Step-by-Step Guide to Upgrading Node.js: From Version 16 to 20 (Including CRA 5 Fixes)"
date: "2025-01-14"
cover: "node-upgrade-20.webp"
keywords: "Node.js upgrade, CRA 5 upgrade, create-react-app fixes, Node.js v20, dependency management, upgrading Node.js, react-scripts 5 issues, javascript, react, ERR_OSSL_EVP_UNSUPPORTED, "
author: "Bharat Sahu"
description: "A comprehensive guide to upgrading your Node.js version from 16 to 20, addressing common issues and fixes with CRA 5 and dependencies."
---


# Upgrade: Node.js and Dependencies

This document outlines the steps taken to upgrade the project from Node.js **v16.16.0** to **v20.9.0** and address related issues for a smooth migration.

# Stack

React, Typescript, SASS, Apollo-client, CRA (create-react-app)

## Why Upgrade Node.js First?
Upgrading Node.js first ensures compatibility with other dependencies. If dependencies are upgraded prior to the Node.js upgrade, potential conflicts could arise, requiring additional fixes later.

---

## Steps Taken

### 1. Node.js Upgrade
- Upgraded Node.js to **v20.9.0 LTS** from **v16.16.0**.
- Removed `node_modules` and reinstalled dependencies after the upgrade.
- Kept npm version at **9.6.5** as `npm@11.0.0` requires a Node.js version higher than v20 LTS.

### 2. Workaround for Initial Issues
- Resolved `Node.js ERR_OSSL_EVP_UNSUPPORTED` using in windows:
  ```bash
  set NODE_OPTIONS=--openssl-legacy-provider
  ```
For Linux or Mac users can use `export` keyword instead of `set` before start start the app.
However, avoided this workaround by updating dependencies.

### 3. Dependency Updates
Ran the following command to address dependency issues:
```bash
npm audit fix --dev
```

Once the command executed, multiple dependencies updated along with `react-scripts` which was `v4.0.3`, now it is `^5.0.1`. Changed multiple codes related to my listed dependencies in `package.json`, this will be different in case of your application.

---

## Errors and Fixes
1. **Warning on Startup**:
   ```
   One of your dependencies, babel-preset-react-app, is importing the "@babel/plugin-proposal-private-property-in-object" package without declaring it in its dependencies. This is currently working because "@babel/plugin-proposal-private-property-in-object" is already in your node_modules folder for unrelated reasons, but it may break at any time.
   
   babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore. It is thus unlikely that this bug will ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to your devDependencies to work around this error. This will make this message go away.
   ```
   <img name="@babel/plugin-proposal-private-property-in-object" alt="babel-preset-react-app" src="https://firebasestorage.googleapis.com/v0/b/bhar4t-app.appspot.com/o/babel-warning.png?alt=media&token=7876ae3c-e356-4bb3-93a1-6b917b08f282"></img>
   - **Fix**: Added `@babel/plugin-proposal-private-property-in-object` to devDependencies.
   - **Result**: Warning resolved.

2. **SVG Style Issue** And **Redundant Code**:
   - Removed unsupported styles (`/**/`) in `gba_gray.svg`.
   - Removed unnecessary `return` statements. earlier these was not throwing any error.
     
3. **TinyMCE Plugin Errors**:
   - Errors for plugins: `"hr"`, `"spellchecker"`, `"template"`, `"print"`, `"paste"`, as the package has upgraded after npm audit fix command.
   - **Fix**: Removed explicit imports from the file the editor has initialised, in my case it was in file `WYSIWYGEditor/index.tsx`.
   - Reference: [TinyMCE Docs][TinyMCE]

4. **SCSS Warnings** / **SASS Path Configuration**:
   - Added environment variables:
     ```env
      REACT_APP_SASS_PATH=./src/styles
      SASS_PATH=./src/styles
     ```
   - Replaced relative paths in **265** SCSS files, which was quite easy as it appearing in terminal directly in warning message, what we need to do.
     ```scss
      @import 'includes';
     ```
     With:
     ```scss
      @import 'src/styles/includes';
     ```

5. **Buffer Issue** / **Polyfill Issue**:
   - Imported `Buffer` explicitly after installation due to `react-scripts` v5 doesn't support some core modules. listed other important dependencies for polyfills for you it may help.
    ```json
      "buffer": "npm:buffer@^6.0.3",
      "crypto": "npm:crypto-browserify@^3.12.0",
      "http": "npm:stream-http@^3.2.0",
      "https": "npm:https-browserify@^1.0.0",
      "stream": "npm:stream-browserify@^3.0.0",
      "util": "npm:util@^0.12.5",
      "zlib": "npm:browserify-zlib@^0.2.0"
    ```

6. **ESLint Rule Update**:
   - Added rule in `.eslintrc.js`:
     ```json
     '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
     ```
    - Updated the multiple pacakages related to eslint/prettier as react-scripts 5 includes eslint under the hood and to utilize in-built eslint and also to get rid of below issue:
      ```bash
        ERROR in [eslint] Failed to load config "prettier" to extend from.
        Referenced from: C:\Users\path\to\.eslintrc.js
      ```
      <img name="@babel/plugin-proposal-private-property-in-object" alt="babel-preset-react-app" src="https://firebasestorage.googleapis.com/v0/b/bhar4t-app.appspot.com/o/prettier.png?alt=media&token=1bd1df03-fd91-4273-8e3e-77c7dbea39af"></img>

      Removed:
        - `eslint-config-standard`: `^16.0.3`
        - `eslint-plugin-import`: `^2.23.4`
        - `eslint-plugin-promise`: `^5.1.0 `
        - `eslint-plugin-react`: `^7.24.0`

      Updated:
        - `prettier`: `2.1.1` to `^3.0.3`
        - `eslint-plugin-prettier`: `3.3.0` to `^5.2.2`             // Enforced using resolution/override
        - `eslint-config-prettier`: `^8.3.0` to `^10.0.1`           // Added in devDependencies
        - `pretty-quick`: `^3.1.1` to `^4.0.0`                      // Added in devDependencies
        - `@typescript-eslint/eslint-plugin`: `4.28.3` to `^5.6.0`  // Added in devDependencies
        - `@typescript-eslint/parser`: `4.28.3` to `^5.6.0`         // Added in devDependencies

        ```js
          // package.json (Included)
          "resolutions": {
            "eslint": "^8.3.0",
            "eslint-plugin-prettier": "^5.2.2",
            "prettier": "^3.0.3"
          }

          // .eslintrc.js
          extends: [ 'eslint:recommended' ],  // Added along with other existing value
          plugins: ['react-hooks'],           // Added along with other existing value
        ```

7. **Replaced `mime-types` with `mime`**:
    - The `mime-types` is not getting updates, ref: [Mime types docs][mime_types], as it throwing error due to one of core module not existing and it also saves to add @types/mime-types explicitly.
    - Reference: [Mime-Types Issue][mime_types_issue].

8. **Optional Chaining in Environment Variables**:
    - Fixed `process?.env?.REACT_APP_MA_BASE_DEAL` to `process.env.REACT_APP_MA_BASE_DEAL`, we should avoid optional channing while using environment variable.
    - Reference: [Create React App Issue][optional_chain].

9. **Enforced Specific Package Version**:
    - To resolve white screen issue, Added `overrides` in `package.json` for `react-error-overlay`, some dependent packages using different version so here we need to enforce while writing in package.json:
      ```json
      "overrides": {
        "react-error-overlay": "6.0.9"
      }
      ```
    if you're using `yarn`, need to pass same object with `"resolutions"` instead of `"overrides"`.

10. **React-Refresh Issue**:
    - Added `FAST_REFRESH=false` in `.env` to resolve intermittent blank-page issue.
    
      ```
      > Uncaught RangeError: Maximum call stack size      at react-refresh-runtime.development.js
       exeeded.
          at WeakMap.get(<anonymous>)
          at computeFullKey (react-refresh-devel...js)
          at ...
      ```
      <img name="pinch" src="https://firebasestorage.googleapis.com/v0/b/bhar4t-app.appspot.com/o/react-refresh.png?alt=media&token=a98b84a4-86d6-426a-9eae-908038a81b2a" width="100%"></img>

11. **Engine Specification**:
    - Added the following in `package.json`:
      ```json
      "engine": {
        "node": ">=20.9.0"
      }
      ```

12. **Webpack Deprecation Warning**:
    - Warning:  
      ```
        [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DecprecationWarning: 'OnAfterSetupMiddleWare', 'onBeforeSetupMiddleware',... Please use the 'setupMiddlewares' option...
      ```
      As of now fixing this issue. the two solutions found in internet, both we cannot apply in current project as it not recommended way, one is talking about file changes inside node_modules as below:
        ```js
        // react-scripts\config\webpackDevServer.config.js
        setupMiddlewares: (middlewares, devServer) => {
          if (!devServer) {
            throw new Error('webpack-dev-server is not defined')
          }
          if (fs.existsSync(paths.proxySetup)) {
            require(paths.proxySetup)(devServer.app)
          }
          middlewares.push(
            evalSourceMapMiddleware(devServer),
            redirectServedPath(paths.publicUrlOrPath),
            noopServiceWorkerMiddleware(paths.publicUrlOrPath)
          )
        return middlewares;
        }
      ```
      Second solution talks about ejecting packages. one additional way we can fix above warning is after modify webpack configs and can also add polyfills, using `react-app-rewired` or `craco` both works fine we can include `node-polyfill-webpack-plugin` we can refer below links in future if we need it. Not using it as of now.
      - [Polyfill Node Modules][codersblog],
      - [StackOverflow Reference 1][stackoverflow1]
      - [StackOverflow Reference 2][stackoverflow2]
      - [StackOverflow Reference 3][stackoverflow3].

      <img name="pinch" width="100%" src="https://firebasestorage.googleapis.com/v0/b/bhar4t-app.appspot.com/o/middleware.png?alt=media&token=f5019dcc-5c60-4e9b-a54c-9841d0de1592"></img>
      

<!-- Links -->
[codersblog]: https://thecodersblog.com/polyfill-node-core-modules-webpack-5
[stackoverflow1]: https://stackoverflow.com/a/74984204/7242575
[stackoverflow2]: https://stackoverflow.com/a/71280203/7242575
[stackoverflow3]: https://stackoverflow.com/a/70485253/7242575
[optional_chain]: https://github.com/facebook/create-react-app/issues/12374
[mime_types]: https://github.com/jshttp/mime-types/issues/50#issuecomment-442916069
[mime_types_issue]: https://github.com/jshttp/mime-types/issues/50#issuecomment-442916069
[TinyMCE]: https://www.tiny.cloud/blog/fixing-plugin-errors/