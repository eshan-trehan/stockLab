import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import toadPkg from 'toad-scheduler'
import schedule from 'node-schedule'

import newsRoutes from './routes/news.js'
import userRoutes from './routes/user.js'
import newsUpdater from './scripts/newsUpdater.js'
import { updateStock, updateStocks } from './scripts/stockUpdater.js'
const { ToadScheduler, SimpleIntervalJob, AsyncTask } = toadPkg

const app = express()

app.use('/user', userRoutes)
app.use('/news', newsRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))   
app.use(cors())

const CONNECTION_URL = 'mongodb+srv://eshan:R6lXUMEXPEKfOhJL@cluster0.0cf3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT  = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))
    })
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)

// Update news every 10 minutes using toad-scheduler
const scheduler = new ToadScheduler()
const newsUpdaterTask = new AsyncTask('simple task', newsUpdater)
const newsUpdaterJob = new SimpleIntervalJob({hours: 3}, newsUpdaterTask)
scheduler.addSimpleIntervalJob(newsUpdaterJob)

// Update Stock Data every day at 0:00 5:00 11:00 17:00
var event = schedule.scheduleJob("0 0 0,5,11,17 * * *", () => updateStocks())
