import { Request, Response } from 'express'
import { Item } from '../types'

export const getItems = (req: Request, res: Response): void => {
  const item: Item = {
    id: 'id-123',
    name: 'Name of the item',
    description: 'Description of the item',
  }
  res.send([item])
}

export const getItem = (req: Request, res: Response): void => {
  const itemId = req.params.itemId
  const item: Item = {
    id: itemId,
    name: `Name of item: ${itemId}`,
    description: `Description of item: ${itemId}`,
  }
  res.send(item)
}

export const addItem = (req: Request, res: Response): void => {
  const item: Item = {
    id: 'added-item-123',
    ...req.body,
  }
  res.send(item)
}

export const updateItem = (req: Request, res: Response): void => {
  const itemId = req.params.itemId
  const item: Item = {
    id: itemId,
    ...req.body,
  }
  res.send(item)
}

export const deleteItem = (req: Request, res: Response): void => {
  const itemId = req.params.itemId
  const item: Item = {
    id: itemId,
    name: `Name of deleted item: ${itemId}`,
    description: `Description of deleted item: ${itemId}`,
  }
  res.send(item)
}
