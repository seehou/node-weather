const request = require('request')
require('dotenv').config()


const forecast = (lat, long, cb) => {
  const baseUrl = 'https://api.darksky.net/forecast/'
  const accessToken = process.env.DARKSKY_ACCESS_TOKEN
  const url = `${baseUrl}${accessToken}/${lat},${long}`

  request( {url, json: true }, (error, response) => {
    const { currently = undefined } = response.body
    if (currently) {
      const { temperature, precipProbability, summary, windSpeed, visibility } = currently;
      cb(error, `${summary}. It is currently ${temperature} degrees out. WindSpeed is ${windSpeed} and Visibility is ${visibility} .There is a ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast

