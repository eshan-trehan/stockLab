import User from '../models/user.js'
import Stock from '../models/stock.js'
import { updateStock, checkAndUpdateStock } from '../scripts/stockUpdater.js'
import fetch from 'node-fetch'


export const postUser = async (req, res) => {
    const userId = req.query.userId
    try{
        await User.create({userId: userId})
        res.status(200).send("User Created using postUser")
    }
    catch {res.status(500).send("Cannot Make User using postUser")}
} 

export const getStocks = async (req, res) => {
    const userId = req.query.userId

    const data = await User.findOne( { userId: userId } )
    res.status(200).send(data.stockSymbols)
}

export const postStocks = async (req, res) => {
    const userId = req.query.userId
    const exchange = req.query.exchange
    const symbol = req.query.symbol
    var del = (req.query.del === 'true') || false

    const stockSymbol = exchange + ":" + symbol
    await checkAndUpdateStock(symbol, exchange)
    
    if (del) await User.updateOne( { userId: userId }, { userId: userId, $pull: { stockSymbols: stockSymbol} }, {upsert: true}, (err, res) => {console.log(res)} )
    else  await User.updateOne( { userId: userId }, { userId: userId, $addToSet: { stockSymbols: stockSymbol} }, {upsert: true}, (err, res) => {console.log(res)} )

    res.status(200).send("Stock List Updated using postStocks")
}

export const customNews = async (req, res) => {
    const userId = req.query.userId
    const data = await User.findOne( { userId: userId } )
    var news = [], stockSymbolList = []
    for (const stock of data.stockSymbols){
        const stockInfo = stock.split(':')
        stockSymbolList.push(stockInfo[1])
    }
    const stockData = await Stock.find( {symbol: stockSymbolList}, (err, res) => {console.log("News Fetched")})
    for (const stock of stockData){
        for (const article of stock.news){
            news.push(article)
        }
    }
    res.status(200).send(news)
}

export const getStockInfo = async (req, res) => {
    const userId = req.query.userId
    const data = await User.findOne( { userId: userId } )
    const stockList = data.stockSymbols
    const stockSymbolList = []
    for (const stock of stockList){
        const splitStock = stock.split(':')
        stockSymbolList.push(splitStock[1])
    }
    
    const stockData = await Stock.find( {symbol: stockSymbolList}, (err, res) => {console.log("News Fetched")})
    var stockInfo = []
    for (const stock of stockData){
        stockInfo.push({
            symbol: stock.symbol, 
            exchange: stock.exchange, 
            current: stock.current, 
            previous: stock.previous
        })           
    }

    res.send(stockInfo)
}