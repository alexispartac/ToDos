
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import "./login.css"


const LOGIN_URL = 'http://localhost:8080/users/'

function LoginPage({ onLogin }) {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(true);

  useEffect( () => {
      usernameRef.current.focus();
  }, []);

  useEffect( () => {
      setErrMsg('');
  }, [username, password])

  async function verifyCredentials(){

    try{
      const response = await axios.post(LOGIN_URL,
          {username: username, password: password}
      )
          
      if(response.status === 200)
          return response.data.accessToken;
        
    }catch(error){
          console.log("Error-FE: ", error)
          return false;
    }

  }
        
  async function handleSubmit(event) {
    event.preventDefault();

    const accessToken = await verifyCredentials()


    if(!accessToken){
      setErrMsg("Username or password is wrong");
      errRef.current.focus();
      return setSuccess(false);
    }
    else
      onLogin(accessToken)

    setUsername('');
    setPassword('');
  }

  return (
    <div className='continer'>
      <p ref={errRef} className={!success ? 'errmess' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
            Username:
        </label>
        <br />
        <input 
            type="text" 
            id="username"
            value={username}
            ref={usernameRef}
            required
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)} 
        />
        <br /><br />
        <label htmlFor='password'>
          Password:
        </label>
        <br />
        <input 
            type="password" 
            id='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input 
            type="submit" 
            value="Submit" 
            style={{padding:'10px'}}
        />
      </form>
      <div>
      <p>
          <a href="/SignIn.html" className='button-signin'> 
                Sign In
          </a>
      </p>
    </div>
  </div>
  )
}

export default LoginPage