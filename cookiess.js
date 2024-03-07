const express= require('express')
const cookieParser=require('cookie-parser')
const app=express()
const port=3000

//browser stores cookies even if you delete them from the server.
//browser sends back the cookies to server on each reload.
//to see cookies sent back use cookie parser package.
// use httponly true so client side js cannot access cookies
//use maxage to set when cookies should expire


app.use(cookieParser())

app.get("/", (req,res)=>{
    res.cookie('sky', 'blue',{httpOnly:true,  maxAge:12000})
    console.log(req.cookies)
    res.send("listening to server")
})


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
