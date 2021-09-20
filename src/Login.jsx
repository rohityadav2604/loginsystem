import axios from 'axios';
import { useState } from 'react'
import {useHistory} from 'react-router-dom';
import './Signup.css'
let Login = ()=>{
    let history = useHistory();
    let [email , setemail] = useState("");
    let [password , setpassword] = useState("");
    return (
        <div className="Signup-container">

        <h1>Welcome to Flam</h1>
        <label>Email</label>
        <input
         onChange = {(e)=>{setemail(e.currentTarget.value)}}
         className="input-container Email" type="text"/>
        <label>password</label>
        <input 
        onChange = {(e)=>{setpassword(e.currentTarget.value)}}
        className="input-container password" type="password"/>
        <button
        onClick = {async()=>{
            let user = {email , password};
            let res = await axios.post("/user/login" , user);
            if(res.data == "signup first")
            {
                history.push("/signup");
            }
            else if(res.data == "password is incorrect")
            {
                history.push("/login");
            }
            else{
                history.push("/home");
            }
            

        }
            
        }
        >Login</button>
        
     </div>
    )
}
export default Login