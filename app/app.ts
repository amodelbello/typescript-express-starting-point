import express from 'express'
import { Application } from 'express-serve-static-core'
import { Server } from 'http'

export default class ExpressServer {
  public static defaultPort = 7080

  public app: Application
  private port: number | string
  private httpServer!: Server

  public constructor(port: number | string = '') {
    this.port = port || ExpressServer.defaultPort
    this.app = express()

    this.addRoutes()
  }

  private addRoutes(): void {
    this.app.get('/', (req, res): void => res.end('Hello from the server'))
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
