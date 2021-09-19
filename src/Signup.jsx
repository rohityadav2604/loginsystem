import ``'./Signup.css'
let Signup = ()=>{
    return (
        <div className="Signup-container">

        <h1>Welcome to Flam</h1>
        <label>Name</label>
        <input className="input-container Name" type="text"/>
        <label>UserName</label>
        <input className="input-container username" type="text"/>
        <label>Email</label>
        <input className="input-container Email" type="text"/>
        <label>password</label>
        <input className="input-container password" type="password"/>

     </div>
    )
}
export default Signup