import { Request, Response, NextFunction } from 'express'
import mung from 'express-mung'

import * as logger from '../logging'

function methodHasBody(req: Request): boolean {
  return req.method === 'POST' || req.method === 'PUT'
}

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  const headers = logger.formatMessage(req.headers)
  const query = logger.formatMessage(req.query)
  const body = logger.formatMessage(req.body)

  let message = `
f=${req.id}
${req.method} ${req.url} ${res.statusCode}
Query: ${query}
`
  message = methodHasBody(req) ? message + `Body: ${body}` : message

  logger.request.verbose(`f=${req.id} Headers: ${headers}`)
  logger.request.info(message)
  next()
}

export const logResponse = mung.json((body, req) => {
  const content = logger.formatMessage(body)
  logger.response.info(`
f=${req.id}
Body: ${content}
`)
  return body
})

export const logError = (err: Error, req: Request, res: Response): void => {
  if (err.message) {
    const error = logger.formatError(err.message)
    logger.response.error(`f=${req.id}\n Error: ${error}`)
  }
}
