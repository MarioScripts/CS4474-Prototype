
# CS4474 Assignment Prototype

This project uses React + Electron. It requires that you have node installed on your computer. You can get the latest [LTS version of node here.](https://nodejs.org/en/download/)

You can get the latest .EXE release [here.](https://github.com/MarioScripts/CS4474-Prototype/releases)

Once you have node installed, clone the repo and run `npm install` to install all dependencies. After dependencies have been installed, you can run any of the available scripts:

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in development mode.\
An electron window should popup with the app running.
You can also open go to [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run clean`

Cleans the app's distribution folder.

### `npm run build`

Builds the app for production to the `dist` folder.\
Installers for the distributable version of the app are available in the `dist` folder once building is complete.
Building should make the appropriate installer based on your current OS.
