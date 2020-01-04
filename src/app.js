const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDir))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Noa Kaplan'
        })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Noa Kaplan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Noa Kaplan',
        text: 'Help me to make Shai Lev happy!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.search

    if (!address) {
        res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } 

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                } 

                res.send({
                    forecast: forecastData,
                    location,
                    address: address
                })
            })
        })
    }
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
    res.render('page-not-found', {
        title: '404 - Not Found',
        errorMsg: 'Help article was not found',
        name: 'Noa Kaplan'
    })
})

app.get('*', (req, res) => {
    res.render('page-not-found', {
        title: '404 - Not Found',
        errorMsg: 'Page not found',
        name: 'Noa Kaplan'
    })
})

// app.com
// app.com/help
// app.com/about

// port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})