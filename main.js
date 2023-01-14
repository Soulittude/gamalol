const { app, BrowserWindow } = require('electron');

function createWindow() {
  win = new BrowserWindow({autoHideMenuBar: true, width: 800, height: 800});
  win.loadFile('dist/gamalol/index.html');
}
app.whenReady().then(() => {
  createWindow()
})
