const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 3000

// routers
const candidatesRouter = require('./candidates/candidatesRouter')
const searchRouter = require('./search/searchRouter')

const app = express()
app.use(bodyParser.json())

app.use(cors({
    credentials: true,
    origin: process.env.FRONT_END_URL
}))

app.use('/candidates', candidatesRouter)
app.use('/search', searchRouter)

app.use((err, req, res, next) => {
    res.json({error: err.message})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

