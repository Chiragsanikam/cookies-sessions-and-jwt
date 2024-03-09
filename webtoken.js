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



 let todos= readFromFile();



 function readFromFile(){
    try{ 
    const data = fs.readFileSync('db.json', 'utf8', )
    return JSON.parse(data)||[];
    }
    catch(err){
    return []
}

 }

function pushDetails(){
    fs.writeFileSync('db.json', JSON.stringify(todos))
}



app.post('/signup', (req, res) => {
        const details={
            name: req.body.name,
            pass: req.body.pass
        }
        todos.push(details)
        pushDetails()

        res.json(todos)
        })

app.post('/login', (req, res) => {
            const details={
                name: req.body.name,
                pass: req.body.pass
            }
           let condition=false;
                for(i=0;i<todos.length;i++){
                    if(details.name==todos[i].name && details.pass==todos[i].pass){
                        res.json({message:"login succesfully"})
                        condition=true
                        break;
                    }
                    
                }
                if(!condition){
                    res.json({message:"login unsuccessful"})
                    return;
                 }
            })
        


  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })