const request = require('postman-request') 

const forecast = (lat, long, callback) =>{

    const url = `http://api.weatherstack.com/current?access_key=087eaf23183ff696bb0eae1ba8abac5d&query=${lat},${long}&units=f`
    
    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to network!!!!', undefined)
        }
        else if (body.error){
            callback('unable to find location!!!.Try another location')
        }
        else{
            // console.log(response)
            callback(undefined, {
                temperature: `${body.current.weather_descriptions} in the morning. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}.`,
                desc: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports =  forecast