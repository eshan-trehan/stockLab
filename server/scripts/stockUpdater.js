import fetch from 'node-fetch'
import Stock from '../models/stock.js'
import { dateToday } from '../scripts/currentDate.js'

export const updateStock = async (symbol, exchange) => {
    const date = dateToday()
    const newsUrl = `https://newsapi.org/v2/everything?q=${symbol}&from=${date}&sortBy=publishedAt&apiKey=8dcc1fd42ebe44059f29c56f2acca96b`
    
    var newsData = []
    await fetch(newsUrl).then((res) => {
        return res.json()
    }).then((data) => {
        Stock.updateOne({symbol : symbol}, {symbol:symbol, exchange:exchange ,news: data.articles}, {upsert: true}, (err, res) => {console.log('Data Fetched and Updated')})
    })

    var val = symbol
    if (exchange !== 'NASDAQ') val += '.' + exchange
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${val}&outputsize=compact&apikey=4WR0DAY9N0ATDEKZ`

    await fetch(stockUrl).then((res) => {
        return res.json()
    }).then((data) => {
        var dateList = [], current = {}, previous = {}
        for(const quote in data["Time Series (Daily)"])
            dateList.push(quote)

        current = data["Time Series (Daily)"][dateList[0]]
        previous =  data["Time Series (Daily)"][dateList[1]]
        Stock.updateOne({symbol : symbol}, {
            symbol:symbol, 
            exchange:exchange, 
            current: {open: current['1. open'], high: current['2. high'], low: current['3. low'], close: current['4. close']}, 
            previous: {open: previous['1. open'], high: previous['2. high'], low: previous['3. low'], close: previous['4. close']}}, 
            {upsert : true}, 
            (err, res) => {console.log('Data Fetched and Updated')})
    })
}

export const checkAndUpdateStock = async (symbol, exchange) => {
    const val = await Stock.find({symbol: symbol, exchange: exchange}, {_id: 1}).limit(1)
    if (val.length === 0) {
        await updateStock(symbol, exchange)
    }
}

export const updateStocks = async () => {
    const data = await Stock.find({})
    for (var stock of data){
        await updateStock(stock.symbol, stock.exchange)
    }

    console.log("Stocks Updated")
}
