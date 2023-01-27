const { app, BrowserWindow, Notification, ipcMain, Tray, Menu, webContents } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(path.join(__dirname, '/assets/img/logos/tanuki_logo.png')),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: false,
      contextIsolation: false,
      setAppDetails: {
        appId: 'tanukigochi'
      }
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))

  win.webContents.openDevTools()
  // win.removeMenu()
  win.setResizable(true)

  win.on('minimize', function (event) {
    event.preventDefault()
    win.hide()
  })

  const tray = new Tray(path.join(__dirname, '/assets/img/logos/tanuki_logo.png'))
  tray.on('double-click', (event) => {
    win.show()
  })
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: function () {
        win.show()
      }
    },
    { type: 'separator' },
    {
      label: 'Salir',
      click: function () {
        app.quit()
      }
    }
  ])
  tray.setToolTip('TanukiGochi center')
  tray.setContextMenu(contextMenu)

  function showNotification (title, body) {
    const tanukiNotification = new Notification({ title, body })
    tanukiNotification.show()

    tanukiNotification.on('click', (event) => {
      win.show()
    })
  }
  ipcMain.on('showNotification', (e, msg) => {
    showNotification(msg.title, msg.body)
  })
}

app.whenReady().then(() => {
  createWindow()

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
