import { Request, Response, NextFunction } from 'express'
import uuidv4 from 'uuid/v4'

export const addFingerprintToRequest = (req: Request, res: Response, next: NextFunction): void => {
  req.id = uuidv4()
  next()
}
