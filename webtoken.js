const express = require('express')
const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser')
const app = express()
const port = 4000
const fs=require("fs");
const { stringify } = require('querystring');
app.use(bodyParser.json())
JWT_SECRET="12345"


//jwt has header, payload, signature---------IMP
//jwt is stateless meaning server doesnt store the session information, it just verifies using signature
//jwt functions=> jwt.sign()=> token creation
//             => jwt.verify()=> verifies token =>> takes in 3 parameters: token, secretKey, options(optional): addidtional options



//JWT FLOW
//user enter username and password (POST request sent to server)===>>> server creates jwt with a secret key and returns it====>>>
//==>>>>now user is authenticated, the token is stored in web browser====>>>> if user requests access to any protected routes===>> request is sent with JWT in authorization header==>>>
//===>>> server checks signature and gets user info from jwt==>> sends response to browser==>> user authorised



const generateToken=(userData)=>{

    //generate a new jwt token using user data;
    return jwt.sign(userData,JWT_SECRET)
}

//function to verify jwt token
const jwtAuthMiddleware= (req,res,next)=>{
    
    //extract jwt token from headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message:"unathorized"})

    try{
        //verify jwt token
        const decoded=jwt.verify(token,JWT_SECRET)
        req.user=decoded
        console.log(req.user)
        next()
    }
    catch(err){
        console.log(err)
        res.json({message:err})
    }
}



 let todos= readFromFile();



 function readFromFile(){
    try{ 
    const data = fs.readFileSync('db.json', 'utf8')
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
        const token=generateToken(details)

        res.json(token)
        })

app.post('/login', jwtAuthMiddleware,(req, res) => {
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

app.post('/protected', jwtAuthMiddleware,(req,res)=>{
        let impData=req.user
    let condition=false;
    for(i=0;i<todos.length;i++){
        if(impData.name==todos[i].name && impData.pass==todos[i].pass){
            res.json({message:"login succesfully"})
            condition=true
            break;
        }
        
    }
    if(!condition){
        res.send("unsuccessful", todos)
        return;
     }
})


        


  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })