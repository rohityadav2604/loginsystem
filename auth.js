const express = require("express");
const mongoose = require("mongoose");
const user = require("./model/user");

const app = express();
app.use(express.json());
app.get('/' , (req , res)=>{
    res.send("hi i am auth server")
});
let checkuser = async(req , res , next) => {
    try {
        let obj = JSON.parse(req.query.body);
       let alluser = await user.find();
       let f =0;
       alluser.forEach((user)=>{
           if(obj.email == user.email)
           {
               f=1;
               res.send("user already exist");
           }
       })
       if(f==0)
       next();
    }
    catch(err)
    {
        console.log(err);
    }
   
}
app.get('/user/signup', async(req , res , next)=>{checkuser(req ,res , next)}, async(req , res)=>{
    try{

        let obj = JSON.parse(req.query.body);
        const myUser = new user();
        myUser.email = obj.email;
        myUser.password = obj.password;
        await myUser.save();
        res.send(myUser);
    }
    catch(err)
    {
        console.log(err);
    }
})



mongoose.connect("mongodb+srv://admin:admin1234@cluster0.m4dtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
app.listen("3002" , ()=>{console.log("auth server running in 3002")})