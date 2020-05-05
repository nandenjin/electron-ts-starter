import * as path from 'path'
import { BrowserWindow, app } from 'electron'

let win: BrowserWindow | null

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  require('electron-reload')(path.resolve(__dirname, 'dist/main'), {
    electron: path.resolve(__dirname, '../../node_modules/.bin/electron'),
  })
}

function onReady() {
  win = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })
  if (isDev) {
    win.webContents.openDevTools()
    win.loadURL('http://localhost:3030')
  } else {
    win.loadFile('index.html')
  }

  win.on('close', () => (win = null))
}

app.on('ready', onReady)
app.on('window-all-closed', () => app.quit())
