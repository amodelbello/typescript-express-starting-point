import { Request, Response, NextFunction } from 'express'
import mung from 'express-mung'

import * as logger from '../logging'

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  const headers = logger.formatMessage(req.headers)
  const body = logger.formatMessage(req.body)
  logger.request.verbose(`f=${req.id} Headers: ${headers}`)
  logger.request.info(`f=${req.id} ${req.method} ${res.statusCode}\nBody: ${body}`)
  next()
}

export const logResponse = mung.json((body, req) => {
  const content = logger.formatMessage(body)
  logger.response.info(`f=${req.id}\n Body: ${content}`)
  return body
})

export const logError = (err: string, req: Request, res: Response): void => {
  const error = logger.formatError(err)
  logger.response.error(`f=${req.id}\n ${error}`)
  res.status(500).send(error)
}
