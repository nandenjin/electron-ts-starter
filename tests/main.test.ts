/* eslint-env jest */

import { Application } from 'spectron'
import * as path from 'path'

const isWindows = process.platform === 'win32'
const ext = isWindows ? '.cmd' : ''

/** Path for electron executable */
const electronPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron' + ext
)

/** Path for app entry directory */
const appPath = path.join(__dirname, '..')

const getApp = () =>
  new Application({
    path: electronPath,
    args: [appPath],
  })

describe('App launch', () => {
  let app: Application
  beforeAll(() => {
    app = getApp()
    return app.start()
  }, 20 * 1000)

  afterAll(async () => {
    if (app && app.isRunning()) {
      await app.stop()
    }
  })

  test('shows initial window', async () =>
    expect(await app.client.getWindowCount()).toBe(1))
})
