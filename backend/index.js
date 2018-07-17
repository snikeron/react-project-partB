const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 3000

// routers
const candidatesRouter = require('./candidates/candidatesRouter')

const app = express()
app.use(cors())
app.use(bodyParser.json())



app.use('/candidates', candidatesRouter)

app.use((err, req, res, next) => {
    res.json({error: err.message})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

