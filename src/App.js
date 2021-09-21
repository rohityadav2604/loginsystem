import {BrowserRouter as Router , Switch , Route} from "react-router-dom"
import Signup from "./Signup"
import Login  from "./Login"
import FrontPage from "./Frontpage"
import Home from "./Home"
import "./App.css"
let App= ()=>{
  return (
    <div>
     <h1 className="header">Welcome to Flam</h1>
     
     <Router>
       <Switch>
         <Route exact path = "/home"> <Home /></Route>
         <Route exact path = "/signup"> <Signup /> </Route>
         <Route  exact path = "/login"> <Login /> </Route>
         <Route exact path = "/"> <FrontPage /> </Route>
       </Switch>
     </Router>

     
    </div>

    
  );
}

export default App;
