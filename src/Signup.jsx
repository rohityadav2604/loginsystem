import './Signup.css'
import React from 'react';
import axios  from "axios";
import { useState } from 'react';

import {useHistory} from 'react-router-dom';

let Signup = ()=>{
    const history = useHistory();
    let [name , setname] = useState("");
    let [username , setusername] = useState("");
    let [email , setemail] = useState("");
    let [password , setpassword] = useState("");
    
    return (
        <div className="Signup-container">

        
        <label>Name</label>
        <input
        onChange = {(e)=>{
            setname(e.currentTarget.value)
        }}
         className="input-container Name" type="text" required="true"/>
        <label>Username</label>
        <input
        onChange = {(e)=>{
            setusername(e.currentTarget.value);
        }}
         className="input-container username" type="text" required="true"/>
        <label>Email</label>
        <input 
        onChange = {(e)=>{
            setemail(e.currentTarget.value);
        }}
        className="input-container Email" type="text" required="true"/>
        <label>Password</label>
        <input 
        onChange = {(e)=>{
            setpassword(e.currentTarget.value);
        }}
        className="input-container password" type="password" required="true"/>
        <button 
         className="btn-log"
        onClick = {async()=>{
            let user = {name , email , password , username};
            if(user.name == "" || user.email == "" || user.password == "" || user.username=="")
            {
                alert("all field are mandatory");
                return;
            }
           let res = await axios.post("/user/signup" , user);
           console.log(res.data);
           if(res.data == "email is invalid")
           {
               alert("email is invalid");
               history.push("/signup");
           }
           else if(res.data == "user exist")
           {
               alert("user exist already");
               history.push("/login");
           }
           else if(res.data == "password is incorrect")
           {
                alert("password is incorrect");
                history.push("/login");
           }
           else
           {
               history.push('/login')
           }
           
        }}
        >Signup</button>

     </div>
    )
}
export default Signup;