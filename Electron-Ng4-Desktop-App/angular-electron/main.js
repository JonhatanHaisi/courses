const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file//${__dirname}/dist/assets/logo.png`
    });

    win.loadURL(`file://${__dirname}/dist/index.html`);

    //// uncomment below to open the DevTools
    // win.webContents.openDevTools();

    // Event when the window is closed
    win.on('closed', () => win = null);
};

// create window on electron initialization
app.on('ready', createWindow);

// quit when all windws are closed
app.on('window-all-closed', () => {

    // On macOs specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }

});

app.on('activate', () => {
    // macOs specific close process
    if (win === null) {
        createWindow
    }
});
