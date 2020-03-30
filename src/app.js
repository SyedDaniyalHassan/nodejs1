const express =require('express')
const path =require('path')
const hbs = require('hbs')
const forecast = require('./utils/darksky.js')
const geocode = require('./utils/geocode.js')


const app = express()
const port = process.env.PORT || 3000
//Defines the paths 
const publicDirectory = path.join(__dirname,'../public/')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath =path.join(__dirname,'../templates/partials')

//set the handlebars for the engine
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)
//defines the directory for the static pages
app.use(express.static(publicDirectory))



app.get('',(req,res)=>
{
    res.render('index',{
        title:"Weather App",
        name :"Daniyal "
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title : 'About Me ',
        name:"Daniyal Hassan"
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title:"Help!",
        msg:"We don't help any one .Do it on your own.",
        name:"Daniyal"
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
    {
       return res.send({
            error : "Address is Undefined!"
        })
    }
    
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error: error,
                data:data,
            })
        }else {
            forecast(data[1],data[0],(error,data)=>
            {
                if(error)
               {
                   return  req.send({
                    error:error,
                    data:data
                })
               }
               else{
                   res.send({
                    address :req.query.address,   
                    Api:data

                   })
               }
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helperror',{
        title:"Help Docs not found!"
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title:"404 Page"
    })
})

app.listen(port,()=>
{
    console.log("working perfectly at port "+port)
})