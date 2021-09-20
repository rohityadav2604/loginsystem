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

        <h1>Welcome to Flam</h1>
        <label>Name</label>
        <input
        onChange = {(e)=>{
            setname(e.currentTarget.value)
        }}
         className="input-container Name" type="text"/>
        <label>UserName</label>
        <input
        onChange = {(e)=>{
            setusername(e.currentTarget.value);
        }}
         className="input-container username" type="text"/>
        <label>Email</label>
        <input 
        onChange = {(e)=>{
            setemail(e.currentTarget.value);
        }}
        className="input-container Email" type="text"/>
        <label>password</label>
        <input 
        onChange = {(e)=>{
            setpassword(e.currentTarget.value);
        }}
        className="input-container password" type="password"/>
        <button 

        onClick = {async()=>{
            let user = {name , email , password , username};
           let res = await axios.post("/user" , user);
            console.log(res);
            history.push('/login')
        }}
        >Signup</button>

     </div>
    )
}
export default Signup