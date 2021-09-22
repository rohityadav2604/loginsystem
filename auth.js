const express = require("express");
const mongoose = require("mongoose");
const user = require("./model/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const saltround = 10;
dotenv.config();

const app = express();
app.use(express.json());


app.get('/' , (req , res)=>{
    res.send("hi i am auth server")
});


let checkuser = async(req , res , next) => {
    try {
        let obj = JSON.parse(req.query.body);
       let alluser = await user.find({email : obj.email});
       
       if(alluser.length === 0 )
       {
           next();
       }
       else if(bcrypt.compareSync(obj.password , alluser[0].password))
       {
           res.send("user exist");
       }
       else
       {
           res.send("password is incorrect");
       }
    }
   
    catch(err)
    {
        console.log(err);
    }
   
}

let checkusersignup = async(req , res , next) => {
    try {
        let obj = JSON.parse(req.query.body);
       let alluser = await user.find({email : obj.email});
       
       if(alluser.length === 0 )
       {
           next();
       }
       else
       {
           res.send("user exist")
       }
    }
   
    catch(err)
    {
        console.log(err);
    }
   
}

async function hash(password)
{
   
    let hashpassword = await bcrypt.hash(password , saltround);
    return {hashpassword , saltround};
}

app.get('/user/signup/auth', checkusersignup , async(req , res)=>{
    try{

        let obj = JSON.parse(req.query.body);
        const myUser = new user();
        myUser.email = obj.email;
        myUser.username = obj.username;
        myUser.name = obj.name;
        let hashObject =await hash(obj.password);
        myUser.password = hashObject.hashpassword;
        myUser.saltround = hashObject.saltround;
        
        
        await myUser.save();
        res.send(myUser.username);
    }
    catch(err)
    {
        console.log(err);
    }
})

app.get("/user/login/auth" , checkuser , async(req , res)=>{
     res.send("signup first");
})



mongoose.connect(process.env.db);
app.listen(process.env.port , ()=>{console.log(`auth server running in ${process.env.port}`)})