const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: isDev,
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`
    );
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

app.whenReady().then(() => {
    // Disable some shortcuts if we're not in dev
    if (!isDev) {
        globalShortcut.register('CommandOrControl+R', () => {})
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});