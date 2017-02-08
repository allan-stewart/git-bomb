const electron = require('electron')
const { app, ipcMain: ipc } = electron
const executor = require('./executor')
const Git = require('./git')
const Timer = require('./timer')

let window
let config = {}
let git = new Git(executor)

let timer = new Timer(time => {
  if (window) {
    window.webContents.send('tick', time)
  }
  if (time <= 0) {
    timer.reset(config.seconds)
    git.resetHard(config.dir, (wasSuccessful, message) => {
      let event = wasSuccessful ? 'boom' : 'error'
      if (window) {
        window.webContents.send(event, message)
      }
    })
  }
})

app.on('ready', () => {
  console.log('git bomb started')
  createWindow();
})

const createWindow = () => {
  if (window) {
    return
  }

  window = new electron.BrowserWindow({
    width: 200,
    height: 50,
    resizable: true,
    alwaysOnTop: true,
    frame: false
  })

  window.loadURL(`file://${__dirname}/window/index.html`)
  window.on('closed', _ => window = null)
}

ipc.on('setDirectory', (event, dir) => config.dir = dir)
ipc.on('start', (event, seconds) => {
  config.seconds = seconds
  timer.start(config.seconds)
})

app.on('window-all-closed', function () {
  app.quit()
})
