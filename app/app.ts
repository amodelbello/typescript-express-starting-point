import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import { Application } from 'express-serve-static-core'
import { Server } from 'http'

import * as logger from './logging'
import { addFingerprintToRequest, logRequest, logResponse, logError } from './middleware'
dotenv.config()

// We override console.log/error and send it to winston instead
console.log = logger.consoleOverrides.log
console.error = logger.consoleOverrides.error

export default class ExpressServer {
  /* istanbul ignore next */
  public static defaultPort = process.env.DEFAULT_PORT || 3000

  public app: Application
  private port: number | string
  private httpServer!: Server

  public constructor(port: number | string = '') {
    this.port = port || ExpressServer.defaultPort
    this.app = express()

    this.app.use(bodyParser.json())
    this.app.use(addFingerprintToRequest)
    this.app.use(logRequest)
    this.app.use(logResponse)

    this.addRoutes()

    this.app.use(logError)
  }

  private addRoutes(): void {
    this.app.get('/', (req, res, next): void => {
      // throw new Error('hello error')
      res.json({ hello: 'Hello from the server' })
      next()
    })

    this.app.get('/error', (): void => {
      throw new Error('Error')
    })
  }

  public run(silent = false): void {
    this.startServer(this.port, silent)
  }

  public stop(): void {
    this.httpServer.close()
  }

  private async startServer(port: number | string, silent: boolean): Promise<void> {
    this.httpServer = await this.app.listen({ port }, (): void => {
      if (!silent) {
        logger.message.info(`⚡ Server ready @ //localhost:${port}`)
      }
    })
  }
}
