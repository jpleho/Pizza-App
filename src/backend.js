const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sendEmail = require('./mailer')

const port = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/order-email', (req, res) => {
    const { body } = req

    sendEmail({ body, res })
})

app.listen(port, () => {
    console.log('Server started', `http://localhost:${port}`)
})