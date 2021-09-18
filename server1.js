const express = require("express");
const axios = require("axios");
const { json } = require("express");
const app = express();
app.use(express.json());
app.get('/' ,(req , res)=>{res.send("hello from server 1")});
let checkEmail = ( req , res , next ,user)=>{

     let email = user.email;
     let containsymbol = false;
     
     let containcom = false; 
     if(email[0]=== '@')
     {
       res.send("email is invalid");
     }
     for(let i =0;i<email.length;i++)
     {
        if(email[i] == '@')
        {
          containsymbol=true;
        }
        if(email.includes(".com"))
        {
           containcom=  true;
        }
     }
     if(containcom && containsymbol)
     {
       next();
     }
     else{
       res.send("email is incorect");
     }
}
app.post('/user' , async (req , res , next)=>{checkEmail(req , res , next , req.body)} , async (req , res)=>{
   
 try{
       
      let email = req.body.email;
      let password = req.body.password;
    let authres =   await axios.get('http://localhost:3002/user/signup' , {
      params:{"body" : {
        "email" : email,
        "password" : password
      }}
    })
     //let obj = JSON.parse(authres);
     //console.log(authres.data)
     res.send(authres.data);

  }
  catch(err)
  {
    console.log(err);
  }
     
     
     
})
app.listen("3000" , ()=>{console.log("flam server 1 running on port 3000")});