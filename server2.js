const express = require("express");
const app = express();





app.get('/' ,(req , res)=>{res.send("hello from server 2")});

app.listen("3001" , ()=>{console.log("flam server 2 running on port 3001")});