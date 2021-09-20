const express = require("express");
const mongoose = require("mongoose");
const user = require("./model/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

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

async function hash(password)
{
    let saltround = Math.floor(Math.random()*20)+1;
    console.log(saltround);
    let hashpassword = await bcrypt.hash(password , saltround);
    return {hashpassword , saltround};
}

app.get('/user/signup', checkuser , async(req , res)=>{
    try{

        let obj = JSON.parse(req.query.body);
        const myUser = new user();
        myUser.email = obj.email;
        myUser.username = obj.username;
        myUser.name = obj.name;
        let hashObject =await hash(obj.password);
        myUser.password = hashObject.hashpassword;
        myUser.saltround = hashObject.saltround;
        
        console.log(hashObject.hashpassword);
        await myUser.save();
        res.send(myUser.username);
    }
    catch(err)
    {
        console.log(err);
    }
})



mongoose.connect("mongodb+srv://admin:admin1234@cluster0.m4dtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
app.listen(process.env.port , ()=>{console.log(`auth server running in ${process.env.port}`)})