const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/827d88a1a012ca255447d7e3da23c031/' + latitude + ',' + longitude +'?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!');
        } else if (body.error) {
            callback('Unable find location!');
        } else {
            console.log(body.daily)

            callback(undefined, body.daily.data[0].summary + ' It is currently ' +
             body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' +
             ' Today\'s high temp is ' + body.daily.data[0].temperatureHigh + ' degrees, and low temp is ' +
              body.daily.data[0].temperatureLow + ' degrees.')
        }
    })
}

module.exports = forecast;
