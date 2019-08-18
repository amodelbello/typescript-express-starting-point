import util from 'util'

import {
  messageLogger as message,
  requestLogger as request,
  responseLogger as response,
  consoleLogger,
} from './winstonSetup'
import { IncomingHttpHeaders } from 'http'

const truncate = (str: string, limit?: number): string => {
  /* istanbul ignore next */
  const logLengthLimit = limit || process.env.LOG_LENGTH_LIMIT || 1000
  if (str.length > logLengthLimit) {
    str = str.substring(0, limit) + '\n ...output truncated\n'
  }
  return str
}

const stripColor = (str: string): string => {
  const patterns = [/[\\]{1}u00[\w\d]+\[[\d]+m/g]
  patterns.forEach((regex): void => {
    str = str.replace(regex, '')
  })

  return str
}

const formatMessage = (data: string | IncomingHttpHeaders): string => {
  const message = truncate(util.inspect(data, { depth: 8 }))
  return message
}

const formatError = (data: string): string => {
  return stripColor(util.inspect(data, { depth: 8 }))
}

const consoleOverrides = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log: (...args: [any?, ...any[]]): void => {
    args.forEach((msg): void => {
      consoleLogger.info(msg)
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (...args: [any?, ...any[]]): void => {
    args.forEach((msg): void => {
      consoleLogger.error(msg)
    })
  },
}

export { message, request, response, consoleLogger, consoleOverrides, truncate, stripColor, formatMessage, formatError }
