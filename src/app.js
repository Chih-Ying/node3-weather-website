const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


// Dynamic rendering page with hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ChihYing Chang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'ChihYing Chang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        titleText: 'This is help text.',
        name: 'ChihYing Chang'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: "Help Article not found.",
        name: 'ChihYing Chang'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found.',
        name: 'ChihYing Chang'
    })
})

// start express server
app.listen(port, ()=> {
    console.log('start express ' + port)
})