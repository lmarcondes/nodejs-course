const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// geocode('whistler', (error, data) => {
//   console.log(data)
// })

// forecast('37', '-122', (error, response) => {
//   console.log(response)
// })

const forecast_place = (address, callback) => {
  if (address) {
    geocode(address, (error, geocodeData) => {
      if (error) {
        console.log(error)
      } else {
        console.log(geocodeData.location)
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecasData) => {
          callback(error, forecasData)
        })
      }
    })
  } else {
    console.log('Please provide a valid address')
  }
}

// const args = {
//   run: process.argv[0],
//   file : process.argv[1],
//   command : process.argv[2]
// }

module.exports = forecast_place
