import express from 'express'
import { postUser, getStocks, postStocks, customNews, getStockInfo } from '../controllers/user.js'

const router = express.Router()

router.get('/stocks', getStocks)
router.get('/customNews', customNews)
router.post('/stocks', postStocks)
router.post('/createUser', postUser)
router.get('/stockInfo', getStockInfo)

export default router