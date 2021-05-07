const express =require('express')
const{createSecretKey}=require('crypto')
const app = express()
app.use(express.json())
var car =
[
    {name:'Corola',color:'white',price:230000},
    {name:'Bolan',color:'grey',price:13000},
    {name:'City',color:'grey',price:3050000},
    {name:'Fortuner',color:'white',price:430000}
]

app.get('/',(req,res)=> res.send("Welcome to my shop"))
//Display price of car when is passed through url name
app.get('/api/cars/:name',(req,res)=>
{   var findthecar=car.find(ftc=>ftc.name === req.params.name)
    if(!findthecar) res.status(400).send("Not Found in the current list")
    let displayprice=findthecar.price;
    
    res.json({price:displayprice})
})
//Display all cars present in a current list
app.get('/api/cars',(req,res)=>
{
    return res.send(car)
}
)
//Display all cars having price greater than the amount passes through Url
app.get('/api/cars/compare/:num',(req,res)=>
{
   var greaterpricecar= car.filter(function(gpc)
   {
       return gpc.price > Number(req.params.num)
   })
   res.send(greaterpricecar)
})
//Update the price of the car (name of car and updated price will be passed through url)

app.put('/api/cars/:name&:price',(req,res)=>{
    var findthecar=car.find(c=>c.name === req.params.name)
    if(!findthecar) res.status(400).send("Not Found againts the given name")
    findthecar.price=req.params.price;
    res.send(car)
})
//Delete a car by its name given through url
app.delete('/api/cars/:name',(req,res)=>{
     let getname=car.find(gname=>gname.name === req.params.name)
    if(!getname) res.status(400).send("Not Found againts the given name")
    var indexofcar =car.indexOf(getname)
    car.splice(indexofcar,1)
    res.send(getname)
})
//Insert new car data

app.post('/api/cars',(req,res)=>{
    var newcar=req.body
    if(!newcar) res.status(400).send("No New data inserted")
    car.push(newcar)
    res.send(car)
})
app.listen(3000)