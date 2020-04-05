const path = require('path')
const express = require('express')
const forecast_place = require('../../weather-app/app')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('/help', (req, res) => {
  res.send({
    name:'lucas marcondes',
    age:25
  })
})

app.get('/about', (req, res) => {
  res.send('this is the about page')
})

app.get('/weather', (req, res) => {
  forecast_place('Sao Paulo', (error, forecasData) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send(forecasData)
    }
  })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
