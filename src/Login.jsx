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

       
        <label>Email</label>
        <input
         onChange = {(e)=>{setemail(e.currentTarget.value)}}
         className="input-container Email" type="text" required/>
        <label>password</label>
        <input 
        onChange = {(e)=>{setpassword(e.currentTarget.value)}}
        className="input-container password" type="password" required/>
        <button
        className = "btn-log"
        onClick = {async()=>{
            let user = {email , password};
            console.log(user);
            if(user.email == "" || user.password=="")
            {
                alert("input and password is mandatory");
                history.push("/login");
                return;
            }
            let res = await axios.post("/user/login" , user);
            if(res.data == "signup first")
            {
                alert("signup first");
                history.push("/signup");
            }
            else if(res.data == "email is invalid")
            {
                alert("email is invalid")
                history.push("/login");
            }
            else if(res.data == "password is incorrect")
            {
                alert("password is incorrect");
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