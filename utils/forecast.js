const request = require('request')

const forecast = (lat, long, cb) => {
  const baseUrl = 'https://api.darksky.net/forecast/'
  const accessToken = 'c5d561cac97bfca28afa7341ea050441'
  const url = `${baseUrl}${accessToken}/${lat},${long}`;

  request( {url, json: true }, (error, response) => {
    const { currently = undefined } = response.body
    if (currently) {
      const { temperature, precipProbability, summary } = currently;
      cb(error, `${summary}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast

