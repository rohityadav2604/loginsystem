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
       console.log(alluser);
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
    //    let f =0;
    //    console.log(obj);
       
    //    alluser.forEach((user)=>{
        
    //        if(obj.email === user.email)
    //        {
    //               f=1;
    //               console.log("inside if block");
    //               let pass = bcrypt.compareSync(obj.password , user.password);
    //               if(pass)
    //               {
    //                   res.send("user exist");
    //               }
    //               else
    //               {
    //                   res.send("password is incorrect");
    //               }
    //               return;
                  
    //         }   
           
    //    })
    //    if(f==0)
    //    next();
    // }
    catch(err)
    {
        console.log(err);
    }
   
}

async function hash(password)
{
   // let saltround = Math.floor(Math.random()*20)+1;
    let hashpassword = await bcrypt.hash(password , saltround);
    return {hashpassword , saltround};
}

app.get('/user/signup/auth', checkuser , async(req , res)=>{
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



mongoose.connect("mongodb+srv://admin:admin1234@cluster0.m4dtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
app.listen(process.env.port , ()=>{console.log(`auth server running in ${process.env.port}`)})