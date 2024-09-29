
import React, { useState } from 'react'
import axios from 'axios';
import "./login.css"


const LOGIN_URL = 'http://localhost:8080/users/'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(true);

  async function verifyCredentials(){

    try{
      const response = await axios.post(LOGIN_URL,
          {username: username, password: password}
      )
          
      if(response.status === 200)
          return response.data.xuserId;
        
    }catch(error){
          console.log("Error-FE: ", error)
          return false;
    }

  }
        
  async function handleSubmit(event) {
    event.preventDefault();

    const xuserId = await verifyCredentials()

    if(!xuserId)
      setSuccess(false);
    else
      onLogin(xuserId)

    setUsername('');
    setPassword('');
  }

  return (
    <>
      <p className={!success ? 'errmess' : 'offscreen'}>Username or password is wrong!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
      <p>
          <a href="/SignIn.html">Sign In</a>
      </p>
    </div>
  </>
  )
}

export default LoginPage