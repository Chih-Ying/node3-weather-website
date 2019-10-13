const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/9ed508d9bf44f2789f1cd16a6c01973f/' + lat + ',' + lon + '?lang=zh-tw';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather services.', undefined)
        } else if (body.error) {
            callback('Poorly formatted request.', undefined)
        } else {
            callback(undefined, body.daily.summary + 
                'It\'s currently ' + body.currently.temperature + 
                ' degree out. There is a ' +  body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast