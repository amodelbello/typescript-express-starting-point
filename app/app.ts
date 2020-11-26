import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import { Application } from 'express-serve-static-core'
import { Server } from 'http'

import * as logger from './logging'
import { addFingerprintToRequest, logRequest, logResponse, logError } from './middleware'
import itemsRouter from './routes/items'
import { Port } from './types'
dotenv.config()

// We override console.log/error and send it to winston instead
console.log = logger.consoleOverrides.log
console.error = logger.consoleOverrides.error

export default class ExpressServer {
  /* istanbul ignore next */
  public static defaultPort = process.env.DEFAULT_PORT || 3000

  public app: Application
  private port: Port = ExpressServer.defaultPort
  private httpServer!: Server

  public constructor(port: Port = '') {
    this.determinePort(port)
    this.app = express()

    this.app.use(bodyParser.json())
    this.app.use(addFingerprintToRequest)
    this.app.use(logRequest)
    this.app.use(logResponse)

    this.addRoutes()

    this.app.use(logError)
  }

  private determinePort(port: Port): void {
    /* istanbul ignore else */
    if (port) {
      this.port = port
    } else if (process.env.NODE_ENV === 'testing') {
      this.port = process.env.TESTING_PORT || 4001
    } else {
      this.port = ExpressServer.defaultPort
    }
  }

  private addRoutes(): void {
    this.app.get('/', (req, res, next): void => {
      res.json({ hello: 'Hello from the server' })
      next()
    })

    this.app.get('/error', (): void => {
      throw new Error('Error')
    })

    this.app.use('/items', itemsRouter)
  }

  public run(silent = false): void {
    this.startServer(this.port, silent)
  }

  public stop(): void {
    this.httpServer.close()
  }

  private async startServer(port: number | string, silent: boolean): Promise<void> {
    this.httpServer = this.app.listen({ port }, (): void => {
      if (!silent) {
        logger.message.info(`⚡ Server ready @ //localhost:${port}`)
      }
    })
  }
}
