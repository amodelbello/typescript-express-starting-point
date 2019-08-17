import express from 'express'
import bodyParser from 'body-parser'
import uuidv4 from 'uuid/v4'
import morgan from 'morgan'
// import pretty from 'express-prettify'
// const pretty = require('express-prettify')

import { Application } from 'express-serve-static-core'
import { Server } from 'http'

import * as logger from './logger'

export default class ExpressServer {
  public static defaultPort = 7080

  public app: Application
  private port: number | string
  private httpServer!: Server
  private morgan = morgan
  private loggerFormat = ':id [:date[web]]" :method :url" :status :response-time ms'

  public constructor(port: number | string = '') {
    this.app = express()

    // Body Parser?
    this.app.use(bodyParser.json())
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    )

    // this.app.use(pretty({ query: 'pretty' }))

    this.app.use((req, res, next) => {
      req.id = uuidv4()
      next()
    })

    this.morgan.token('id', function getId(req) {
      return req.id || ''
    })

    this.app.use(
      morgan(this.loggerFormat, {
        skip: function(req, res) {
          return res.statusCode < 400
        },
        stream: process.stderr,
      }),
    )
    this.app.use(
      morgan(this.loggerFormat, {
        skip: function(req, res) {
          return res.statusCode >= 400
        },
        stream: process.stdout,
      }),
    )

    this.app.use(function(req, res, next) {
      const log = logger.loggerInstance.child(
        {
          id: req.id,
          body: req.body,
        },
        true,
      )
      log.info({ req })
      next()
    })

    this.app.use(function(req, res, next) {
      function afterResponse(): void {
        res.removeListener('finish', afterResponse)
        res.removeListener('close', afterResponse)
        const log = logger.loggerInstance.child(
          {
            id: req.id,
          },
          true,
        )
        log.info({ res }, 'response')
      }
      res.on('finish', afterResponse)
      res.on('close', afterResponse)
      next()
    })
    this.port = port || ExpressServer.defaultPort

    this.addRoutes()
  }

  private addRoutes(): void {
    this.app.get('/', (req, res): void => {
      const response = JSON.stringify({ message: 'Hello from the server' })
      logger.logResponse(req.id || '', response, 200)
      res.json(response)
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
        console.log(`⚡ Server ready @ //localhost:${port}`)
      }
    })
  }
}
