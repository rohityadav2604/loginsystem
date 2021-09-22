const express = require("express");
const axios = require("axios");
const { json } = require("express");
const validator = require('validator');
 

const app = express();
app.use(express.json());
app.get('/' ,(req , res)=>{res.send("hello from server 1")});


let checkEmail = ( req , res , next)=>{

     let resValidate = validator.isEmail(req.body.email);
     if(resValidate)
     {
       next();
     }
     else
     {
      res.send("email is invalid");
     }

    
}


app.post('/user/signup' , checkEmail , async (req , res)=>{
   
 try{
       
      let email = req.body.email;
      let password = req.body.password;
      let name  = req.body.name;
      let username  = req.body.username
      let authres =   await axios.get('http://localhost:3003/user/signup/auth' , {
      params:{"body" : {
        "email" : email,
        "password" : password,
        "name" : name,
        "username": username
      }}
    })
     
     res.send(authres.data);

  }
  catch(err)
  {
    console.log(err);
  }
     
     
     
})


app.listen("3001" , ()=>{console.log("flam server 1 running on port 3001")});