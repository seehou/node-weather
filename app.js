const getGeoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

getGeoCode('Kuala Lumpur', (err, data) => {
  const { latitude, longitude } = data;
  forecast(latitude, longitude, (error, response) => {
    console.log(error, response)
  })
})
