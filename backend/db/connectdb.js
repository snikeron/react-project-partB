const mongoose = require('mongoose')

if(process.env.NODE_ENV === 'production') {
    const url = process.env.MONGO_DB_URL
    const options = {
        user: 'admin',
        pass: process.env.MONGODB_USER_PASSWORD,
        dbName: 'Encode0',
        useNewUrlParser: true,
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

} else {
    const url = process.env.MONGO_DB_URL_DEV
    mongoose.connect(url, {useNewUrlParser: true })
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
}



module.exports = mongoose


