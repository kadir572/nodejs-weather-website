const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3510c248ffeede114457d3e99af8dbe&query=' + latitude +',' + longitude + '&units=m';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined, undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined, undefined);
        } else {
            callback(undefined, `Weather is ${body.current.weather_descriptions[0]}`, `Temperature is ${body.current.temperature} degrees`)
        }
    })
}

module.exports = forecast;