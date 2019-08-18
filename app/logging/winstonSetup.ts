import { createLogger } from 'winston'

import { messageConfig, requestConfig, responseConfig, consoleConfig } from './config'

/*
Log level reference:
error: 0, 
warn: 1, 
info: 2, 
verbose: 3, 
debug: 4, 
silly: 5 
*/

const messageLogger = createLogger(messageConfig)
const requestLogger = createLogger(requestConfig)
const responseLogger = createLogger(responseConfig)
const consoleLogger = createLogger(consoleConfig)

export { messageLogger, requestLogger, responseLogger, consoleLogger }
