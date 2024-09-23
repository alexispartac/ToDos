
import React, { useState } from 'react'
import axios from 'axios';
import "./login.css"
// cautarea x-userID cu headers

const LOGIN_URL = 'http://localhost:8080/users/user/one'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(true);

  async function verifyCredentials(){

    try{
      const user = await axios.get(LOGIN_URL,{
        params: {username: username, password: password}
      })

      if(user.status === 200)
          return user.data.user;
      else
          return false;
    }catch(error){
        console.log('Error: user don t find!')
    }
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const user = await verifyCredentials()
    if(user)
      onLogin({ username: username, password: password, id: user._id })
    else
        setSuccess(false);
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