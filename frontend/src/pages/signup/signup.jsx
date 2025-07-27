import './signup.css'

export default function Signup(){
    return(
        <div className="signup-container">
        <form action="/">
            <label htmlFor="email">Email : </label>
            <input type="email" id='email'/>
            <label htmlFor="username">Username : </label>
            <input type="text" id='username'/>
            <label htmlFor="password">Password : </label>
            <input type="password" id='password'/>
            <button className='btn'>Login</button>
        </form>
        </div>
    );
}