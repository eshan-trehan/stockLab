import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userId: String,
    stockSymbols: [String], 
    commodity: [String], 
    newsCountry: [String]
})

const User = mongoose.model('User', userSchema)

export default User