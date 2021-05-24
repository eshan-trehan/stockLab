import mongoose from 'mongoose'

const stockSchema = mongoose.Schema({
    symbol: String,
    exchange: String,
    current: {
        open: Number, 
        high: Number, 
        low: Number, 
        close: Number
    },
    previous: {
        open: Number, 
        high: Number, 
        low: Number, 
        close: Number
    },
    news: [Object]
})

const Stock = mongoose.model('Stock', stockSchema)

export default Stock