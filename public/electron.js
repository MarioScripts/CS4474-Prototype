const { app, BrowserWindow, globalShortcut, protocol } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');

contextMenu({
    prepend: (defaultActions, params, browserWindow) => [
        {
            label: 'Rainbow',
            // Only show it when right-clicking images
            visible: params.mediaType === 'image'
        },
        {
            label: 'Search Google for “{selection}”',
            // Only show it when right-clicking text
            visible: params.selectionText.trim().length > 0,
            click: () => {
                shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
            }
        }
    ]
});

function createWindow () {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webSecurity: false,
            devTools: isDev,
        }
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`
    );

    // Disable menu. We might want to re-enable it at some point
    if (!isDev) {
        win.setMenu(null);
    }
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

app.whenReady().then(() => {
    // Disable some shortcuts if we're not in dev
    if (!isDev) {
        globalShortcut.register('CommandOrControl+R', () => {})
    }
    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = decodeURI(request.url.replace('file:///', ''));
        callback(pathname);
    });
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