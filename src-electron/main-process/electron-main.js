import { app, BrowserWindow, ipcMain, Menu } from 'electron'
var AutoLaunch = require('auto-launch');

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 2000,
    height: 900,
    useContentSize: false,
    frame : true,
    // fullscreen : true,
    webPreferences: {
      // keep in sync with /quasar.conf.js > electron > nodeIntegration
      // (where its default value is "true")
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.setMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});


require('update-electron-app')({
  repo: 'Schneidershades/parkit-frontend',
  updateInterval: '1 hour',
  logger: require('electron-log')
})

// var parkitAutoLauncher = new AutoLaunch({
//     name: 'Parkit App',
//     path: require('electron').app.getAppPath(),
// });
 
// parkitAutoLauncher.enable();
 
// //parkitAutoLauncher.disable();
 
// parkitAutoLauncher.isEnabled()
// .then(function(isEnabled){
//     if(isEnabled){
//         return;
//     }
//     parkitAutoLauncher.enable();
// })
// .catch(function(err){
//     // handle error
// });