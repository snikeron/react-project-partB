const mongoose = require('mongoose')

const url = 'mongodb+srv://encode0-5yxng.mongodb.net/'
const options = {
    user: 'admin',
    pass: process.env.MONGODB_USER_PASSWORD,
    dbName: 'Encode0',
    promiseLibrary: global.Promise
}

mongoose.connect(url, options)
    .then(() => {
        console.info(
            'MongoDB Connection Established!'
        )
    })
    .catch(err => {
        console.error(
            `MongoDB Failure: ${err.message}`
        )
    })

module.exports = mongoose