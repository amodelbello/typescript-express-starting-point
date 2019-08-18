import dotenv from 'dotenv'
import * as colors from '../../logging/colors'
dotenv.config()
import { consoleLogger, consoleOverrides, truncate } from '../../logging'

describe('Logging Colors', () => {
  it('Tests all the colors', () => {
    const testString = 'This is a test string'
    const functions = Object.values(colors)
    functions.forEach(colorFunction => {
      const coloredString = colorFunction(testString)
      expect(coloredString).toContain(testString)
    })
  })
})

describe('Logging', () => {
  it('Truncates a long log message', () => {
    const content = `${'hello'}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium augue ligula, pulvinar interdum nisi vestibulum vel. Proin tristique vel nisl eu vestibulum. Vestibulum at orci semper, lobortis turpis sed, venenatis ex. Aenean mollis orci non eleifend pretium. Quisque pulvinar, dui sed elementum efficitur, arcu nisi elementum nunc, vitae euismod urna turpis in magna. Sed id dolor nulla. Quisque suscipit, libero in eleifend convallis, erat nisl semper ante, a accumsan lorem eros ac massa. Morbi pellentesque iaculis massa, consequat commodo magna consectetur congue. In laoreet cursus metus. Vivamus sed ligula in tortor varius porttitor. Curabitur quis mi viverra, pulvinar tellus eget, placerat orci.`

    const message = truncate(content, 10)
    expect(message).toContain('...output truncated')
    expect(message.length).toBe(32)
  })
})

describe('Console Overrides', () => {
  it('Overrides console.log', () => {
    console.log = consoleOverrides.log
    const logSpy = jest.spyOn(consoleLogger, 'info')
    const message1 = 'this is the first message'
    const message2 = 'this is the second message'
    console.log(message1, message2)
    expect(logSpy).toHaveBeenCalledTimes(2)
    logSpy.mockClear()
  })
  it('Overrides console.error', () => {
    console.error = consoleOverrides.error
    const errorSpy = jest.spyOn(consoleLogger, 'error')
    const message1 = 'this is the first error'
    const message2 = 'this is the second error'
    const message3 = 'this is the third error'
    console.error(message1, message2, message3)
    expect(errorSpy).toHaveBeenCalledTimes(3)
    errorSpy.mockClear()
  })
})
