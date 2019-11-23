import {globalShortcut} from 'electron';

export default function registerGlobalShortcuts(mainWindow) {
  globalShortcut.register('CommandOrControl+!', () => {
    mainWindow.webContents.send('snippet-added');
  })
}