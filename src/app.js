const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Steven Lee'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Steven Lee',
    title: 'About',
  })
})

app.get('/weather', (req, res) => {

  const { address = undefined } = req.query
  if (!address) {
    throw 'Please provide an address'
  } else {

    geocode(address, (error, { latitude, longitude, location }) => {
      forecast(latitude, longitude, (forecastError, data) => {
        res.send({
          forecast: data,
          location,
          address
        })
      })
    })
  }
})

app.get('*', (req, res) => {
  res.render('error404', {
    name: 'Steven Lee'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
