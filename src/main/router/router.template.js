import EventRoute from './EventRoute'
const routers = new Array()
import path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

/**
 *  关闭窗口
 */
routers.push(
  new EventRoute('close-window', 'event', (api, data = {}) => {
    api.app.quit()
  })
)
/**
 * 最大化
 */
routers.push(
  new EventRoute('max-window', 'event', (api, data = {}) => {
    api.window.maximize()
  })
)
/**
 * 最小化
 */
routers.push(
  new EventRoute('min-window', 'event', (api, data = {}) => {
    api.window.minimize()
  })
)

/**
 * 异步下载任务
 */
routers.push(
  new EventRoute('open-window-down', 'event', (api, data = {}) => {
    // 创建一个窗口实例
    const taskWindow = new api.BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux'
        ? {
            icon: path.join(__dirname, '../../build/icon.png')
          }
        : {}),
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    taskWindow.on('ready-to-show', () => {
      taskWindow.show()
    })
    //判断有没有url
    if (process.env['ELECTRON_RENDERER_URL']) {
      taskWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      taskWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
      //__dirname表示当前文件所在的目录的绝对路径
    }
  })
)

export default routers
