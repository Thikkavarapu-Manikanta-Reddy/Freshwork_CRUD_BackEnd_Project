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
    });
});

var storedata;
//create
//To create a file to store the data(key-value)
app.get('/:filename',(req,res)=>{
    storedata=new datastore({path:`./databox/${req.params.filename}.json`})
    // res.json(`Currently ,You are in ${req.params.filename} file`)
    res.json(JSON.parse(storedata.json(null,2)))
});

//update and create
//For creating a data and also for updating a data with key as reference
app.post('/:filename/update',(req,res)=>{
    
    storedata=new datastore({path:`./databox/${req.params.filename}.json`})
    
    Object.entries(req.body).forEach(entry=>{
        if(!storedata.hasOwn(entry[0])){
            
            storedata.set(entry[0],entry[1])
        }      
    });
    res.json(JSON.parse(storedata.json(null,2))) 
});

//getvalue
//To retrieve the all key-value pairs data
app.get('/:filename/getvalue',(req,res)=>{

    storedata=new datastore({path:`./databox/${req.params.filename}.json`}) 
    var array=[]
    Object.entries(req.body).forEach(entry=>{
        if(storedata.hasOwn(entry[0])){
            
         array.push(storedata.get(entry[0]))
        }       
    });
    res.json({Values :array})
});

//delete    
//To delete the particular key-value pair
app.delete('/:filename/delete',(req,res)=>{
    storedata=new datastore({path:`./databox/${req.params.filename}.json`})
    var number=0
    Object.entries(req.body).forEach(entry=>{
        if(storedata.hasOwn(entry[0])){
            number++;
            storedata.del(entry[0])      
        }
        else{
            res.json({error:`${entry[0]} does not exist`})
        }      
    });
    if(number==0){
        res.json({
            status:"No such key or no key selected"
        });
    }
    res.json({status:"requested keys are deleted"})
});

app.listen(3000,()=>{
    console.log('app is running at '+port)    
});