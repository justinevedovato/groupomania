const db = require('./config/db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')

const app = express()
const port = process.env.API_PORT
app.use(cors())

// Pour créer la base de données si elle n'existe pas
db.sync()

app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
