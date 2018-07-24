const mongoose = require('mongoose')

if(process.env.NODE_ENV === 'production') {
    const url = process.env.MONGO_DB_URL
    const options = {
        useNewUrlParser: true,
        dbName: 'Encode0',
        promiseLibrary: global.Promise
    }

    mongoose.connect(url, options)
    .then(() => {
        console.info(
            'MongoDB ATLAS Connection Established!'
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
            'MongoDB LOCAL Connection Established!'
        )
    })
    .catch(err => {
        console.error(
            `MongoDB Failure: ${err.message}`
        )
    })
}



module.exports = mongoose


