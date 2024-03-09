const express = require('express')
const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser')
const app = express()
const port = 4000
const fs=require("fs");
const { stringify } = require('querystring');
app.use(bodyParser.json())


//jwt has header, payload, signature---------IMP
//jwt is stateless meaning server doesnt store the session information, it just verifies using signature
//jwt functions=> jwt.sign()=> token creation
//             => jwt.verify()=> verifies token =>> takes in 3 parameters: token, secretKey, options(optional): addidtional options



 let todos=readFromFile()

 function readFromFile(){
    try{    fs.readFileSync('db.json', 'utf8', )
    return JSON.parse(data)||[]
    }
    catch(err){
    return []
}

 }


function pushDetails(data){
    fs.writeFile('db.json', JSON.stringify(data), (data,err)=>{
        if(err){
            console.log('err')
        }else{
            console.log("file written")
        }
    })
}



app.post('/signup', (req, res) => {
        const details={
            name: req.body.name,
            pass: req.body.pass
        }
        todos.push(details)
        pushDetails(todos)

        res.json(todos)
        })
        

  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })