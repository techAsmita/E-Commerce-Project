//we have developed a small api (application programming interface)

import express from "express";
import bodyParser from "body-parser";
var app = express(); // create express app

app.use(bodyParser) //read the data from frontend and add it to the request body
app.post("/signup",(req,res)=>
{
    console.log("Request Body=",req.body);
})

//now how to verify it? we have to listen to a port
app.listen(3000)

//instead of refreshing it repeatedly we are running it continuously so that it can 
//run as a live server.