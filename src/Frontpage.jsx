import React from "react"
import {Link} from "react-router-dom"


let Frontpage = (props)=>{
    return (
        <>
        <div>
        <button><Link to="/login">login</Link></button>
        <button><Link to="/signup">signup</Link></button>
        </div>
        </>
    )
}
export default Frontpage;