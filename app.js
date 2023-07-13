if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const routes = require('./routes')
const app = express()
const methodOverride = require('method-override')
const passport = require('passport')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(passport.initialize())

app.use(routes)


app.listen(port, (req, res) => {
    console.log(`Serve is running on http://localhost:${port}`)
})