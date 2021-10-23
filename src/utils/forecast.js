const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3510c248ffeede114457d3e99af8dbe&query=' + latitude +',' + longitude + '&units=m';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `It's currently ${body.current.temperature} degrees out. The humidity is ${body.current.humidity}%.`);
        }
    })
}

module.exports = forecast;