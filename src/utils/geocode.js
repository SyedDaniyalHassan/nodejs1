const chalk =require('chalk')
const request =require('request')

const geocode = (address,callback)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZGFuaXlhbDExIiwiYSI6ImNrN2tzYWhiMjAwaTIzZXFpbWFjODlndm0ifQ.rGDRqQYzr6V5fByZzdmuKg'
    request({url:url, json:true},(error,response)=>{
        if(error)
        {
            callback("Uable to connect with internet",undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('Unable to find the Location ',undefined)
        }else{
            console.log(chalk.underline(response.body.features[0].place_name))
            callback(undefined,response.body.features[0].center)
        }
    })
}


module.exports = geocode