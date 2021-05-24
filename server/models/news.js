import mongoose from 'mongoose'

const newsSchema = mongoose.Schema({
    country: String,
    newsObj: Object
})

const News = mongoose.model('', newsSchema)

export default News