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

let whitelist = [process.env.FORM_URL, process.env.ADMIN_URL, process.env.FRONT_END_URL_DEV]
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
}))
// app.use(cors())

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

