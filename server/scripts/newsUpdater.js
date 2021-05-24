import fetch from 'node-fetch'
import News from '../models/news.js'

const newsFetchAndUpdate = async (url, country) => {
    fetch(url).then((res) => {
        return res.json();    
    }).then((data) => {
        News.updateOne({country:country}, {newsObj: data}, {upsert: true, setDefaultsOnInsert: true},(err, res) =>{console.log('Data Fetched and Updated')})
    }).catch(() => console.log('Cannot Fetch Data'))
}

const newsUpdater = async () => {
    const businessNewsIndia = "https://newsapi.org/v2/top-headlines?country=in&category=business&sortBy=popularity&apiKey=8dcc1fd42ebe44059f29c56f2acca96b"
    const businessNewsWorld = "https://newsapi.org/v2/top-headlines?category=business&sortBy=popularity&apiKey=8dcc1fd42ebe44059f29c56f2acca96b"
    await newsFetchAndUpdate(businessNewsIndia, "India")
    await newsFetchAndUpdate(businessNewsWorld, "World")
} 

export default newsUpdater