import './navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
return(
<>
<div className="nav">
    <div className='innerDiv '>
    <div className="logo"></div>
    <div className="name"><h2>Aura AI</h2></div>
    </div>
    <div className='innerDiv'>
    <Link to="/signup">
    <button className='sign-up btn'>Sign Up</button>
    </Link>
    <Link to="/login">
    <button className='login btn'>Login</button>
    </Link>
    </div>
</div>
</>
);
}