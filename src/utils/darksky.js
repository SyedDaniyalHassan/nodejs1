const request = require ('request')

const darksky = (lat,long,callback)=>
{
    url ='https://api.darksky.net/forecast/a9539f7512452d2cfcba6a4469b00620/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=auto'
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect with internet')
        }else if(response.body.error)
        {
            callback('unable to find the forecast try another one !',undefined)
        }
        else{
            callback(undefined,response.body.currently)
        }
    })
}

module.exports = darksky
