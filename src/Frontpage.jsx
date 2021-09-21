import React from "react"
import {useHistory} from "react-router-dom"
import "./Front.css"


let Frontpage = (props)=>{
    let history = useHistory();
    return (
        <>
       
        <div class="front">
        
        <button className="btn" onClick = {()=>{history.push("/login")}}>login</button>
        <button className= "btn" onClick = {()=>{history.push("/signup")}}>signup</button>
        </div>
        </>
    )
}
export default Frontpage;