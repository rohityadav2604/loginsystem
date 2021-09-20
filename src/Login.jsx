import './Signup.css'
let Login = ()=>{
    return (
        <div className="Signup-container">

        <h1>Welcome to Flam</h1>
        <label>Email</label>
        <input className="input-container Email" type="text"/>
        <label>password</label>
        <input className="input-container password" type="password"/>
        <button
        >Login</button>
        
     </div>
    )
}
export default Login