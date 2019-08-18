import express from 'express'
import { getItems, getItem, addItem, updateItem, deleteItem } from '../controllers/items'

const router = express.Router()
router
  .route('/')
  .get(getItems)
  .post(addItem)

router
  .route('/:itemId')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem)

export default router
