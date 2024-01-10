const mongoose = require('mongoose'),
    { logEvents } = require('../middleware/logger')

module.exports ={
    connect: async() =>{
        const url = process.env.NODE_ENV === 'production' ? process.env.DB_URI_O : process.env.DB_URI_L
        try {
            mongoose.set('strictQuery', true)

            await mongoose.connect(url)
        } catch (err) {
            console.log(`An error occured while connecting to the database: ${err}`)
            logEvents(`An error occured while connecting to the database: ${err}`, 'mongoErrLog.log')
        }
    }
}