import './login.css'

export default function Login(){
    return(
        <div className="login-container">
        <form action="/">
            <label htmlFor="username">Username : </label>
            <input type="text" id='username'/>
            <label htmlFor="password">Password : </label>
            <input type="password" id='password'/>
            <button className='btn'>Login</button>
        </form>
        </div>
    );
}