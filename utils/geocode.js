const request = require('request')
require('dotenv').config()

const geoCode = (search, cb) => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN
  const url = `${baseUrl}${encodeURIComponent(search)}.json?access_token=${accessToken}&limit=1`
  const data = request({url, json:true}, (error, response) => {
    let errorMessage, responseData
    if (error) {
      errorMessage = 'Unable to connect to weather service!'
      responseData = undefined
    } else if (response.body.error) {
      errorMessage = 'Unable to find location'
      responseData = undefined
    } else {
      errorMessage = undefined
      responseData = {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location:  response.body.features[0].place_name,
      }
    }
    cb(errorMessage, responseData)
  })

}

module.exports = geoCode
