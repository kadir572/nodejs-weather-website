const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kadir Karadavut'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kadir Karadavut'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some help text',
        title: 'Help',
        name: 'Kadir Karadavut'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress'
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

    /* geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData
            })
        })
    }) */
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'Help article not found',
        title: '404',
        name: 'Kadir Karadavut'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'Page not found',
        title: '404',
        name: 'Kadir Karadavut'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})