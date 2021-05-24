import News from '../models/news.js'

export const getNews = async (req, res) => {
    const country = req.query.country
    
    try {
        const data = await News.findOne({ country: country }).exec()
        res.status(200).json(data.newsObj)
    } 
    catch {
        res.send("Not Ok Report")
    }
}