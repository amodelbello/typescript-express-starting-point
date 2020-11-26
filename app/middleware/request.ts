import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const addFingerprintToRequest = (req: Request, res: Response, next: NextFunction): void => {
  req.id = uuidv4()
  next()
}
