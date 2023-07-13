const express = require('express')
const routes = require('./routes')
const app = express()
const db = require('./models')
const port = process.env.PORT || 3000
app.use(routes)


app.listen(port, (req, res) => {
    console.log(`Serve is running on http://localhost:${port}`)
})