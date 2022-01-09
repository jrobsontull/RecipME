import React, { useState, useEffect } from "react"
import axios from "axios"

import Logo from "../assets/img/pie_logo_orange.svg"
import Google from "../assets/img/google.svg"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function loginHandler(e) {
    e.preventDefault()
    setError(false)

    try {
      const header = {
        headers: {
            'Content-type': 'application/json',
        }
      }
      const payload = {
        'email': email,
        'password': password,
      }

      setIsLoading(true)

      const response = await axios.post('http://localhost:5000/api/v1/user/login',
        payload,
        header
      )

      localStorage.setItem('user', JSON.stringify(response.data))
      setIsLoading(false)
    } catch (e) {
      setError(e.response.data.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign into your account.</p>
      </div>
      <div className="line-br"></div>
      <form className="general-form" onSubmit={loginHandler}>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Log In</button>
      </form>
      <div className="google-auth">
        <div className="google-logo">
          <img src={ Google } alt="Google Logo"/>
        </div>
        <p>Sign in with Google</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>You have an error: { error }</p>}
      <img className="pie-logo" src={ Logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Login;
