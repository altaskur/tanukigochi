const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))

  win.webContents.openDevTools()
  // win.removeMenu()
  win.setResizable(true)
}

function showNotification (title, body) {
  console.log('showNoti')
  new Notification({ title, body }).show()
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.on('showNotification', (e, msg) => {
    showNotification(msg.title, msg.body)
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
