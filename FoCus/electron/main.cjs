const { app, BrowserWindow } = require('electron');
const path = require('path');

// import { app, BrowserWindow } from 'electron';
// import path from 'node:path';
// import 'bootstrap/dist/css/bootstrap.min.css';


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, '../public/logo.png') // Change the icon path here

    });

    win.loadFile(path.join(__dirname, '../dist/index.html')); // Loads the React build
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
