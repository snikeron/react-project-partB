const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = 3000
const app = express()

// routers
const authRouter = require('./auth/authRouter')
const candidatesRouter = require('./candidates/candidatesRouter')
const searchRouter = require('./search/searchRouter')
const uploadRouter = require('./upload/uploadRouter')

app.use(express.json());
app.use(cookieParser())
const app = express()

app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: [process.env.FRONT_END_URL, process.env.FRONT_END_URL_DEV],
}))

app.use('/auth', authRouter);
app.use('/candidates', candidatesRouter)
app.use('/search', searchRouter)
app.use('/upload', uploadRouter)

// app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {

    // catch all in case forget to add negative status
    if(res.statusCode === 200) {
        res.status(500)
    }
    res.json({error: err.message})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

