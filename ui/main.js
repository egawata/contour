const {
    app,
    BrowserWindow,
    dialog,
} = require('electron')
const path = require('node:path')

var mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

async function openInfileDialog() {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile']
    }).then(result => {
        console.log(result.filePaths)
    }).catch(err => {
        console.log(err)
    })
}
