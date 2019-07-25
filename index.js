var express=require('express')
var datastore=require('data-store')
var expressLayouts=require('express-ejs-layouts')
var port = process.env.PORT || 3000
var bodyparser=require('body-parser')
var app=express()

//configure middlewares

app.use(bodyparser.urlencoded({extended:false}))

//@get /

app.get('/',(req,res)=>{
    res.json({
        "Welcome":"freshworks"
    })
})

app.listen(3000,()=>{
    console.log('app is running at '+port)    
})