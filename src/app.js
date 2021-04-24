const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicPathDirectory))

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index', {
        title: 'Home Page!!',
        name: 'Shravani Vallurupalli'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        msg: 'Please contact to the below number!!!',
        title: 'Help Page!!!',
        name: 'Shravani Vallurupalli'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Shravani Vallurupalli'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
     {
    return res.send({
        error: 'Please provide a address to get the forecast'
    })
     }    
     geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {

        if(error){
          return res.send({ error })
        }
        
          forecast(latitude, longitude, (error, {temperature}) => {
            if(error){
              return res.send({ error })
            }
            res.send({ location, temperature })
            //res.send({ temperature })
            // console.log(location);
            // console.log(temperature)
          })
      })
      
    //    res.send({
    //     location: req.query.address,
    //     forecast: 40
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404-Error',{
        errorMsg: 'Help article not found!!',
        title: 'Help Error Page',
        name: 'Shravani Vallurupalli'
    })
})

app.get('*', (req, res) => {
    res.render('404-Error',{
        errorMsg: '404',
        title: 'Page Not Found',
        name: 'Shravani Vallurupalli'
    })
})

app.listen(3000, () => {
console.log('Listening to port 3000!!')
})

