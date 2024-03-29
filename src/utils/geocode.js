const request = require('request')
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2hpaHlpbmc3NTA5IiwiYSI6ImNrMWcyMGVvcjEwMGQzaW1tZXl2MngzanMifQ.oIupprTl8Q1947WwIC9F2g&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to local services.', undefined)
        } else if (body.features.length === 0) {
            callback('There is no match result', undefined)
        } else {
            callback(undefined , {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

