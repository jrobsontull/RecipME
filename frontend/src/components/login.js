import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import Logo from "../assets/img/pie_logo_orange.svg"
import Google from "../assets/img/google.svg"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading, error] = useAuthState(auth)
  const history = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) history.replace("/dashboard")
  }, [user, loading])

  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign into your account.</p>
      </div>
      <div className="line-br"></div>
      <form className="general-form">
        <input type="email" placeholder="Email" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
        <input type="password" placeholder="Password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        <button type="submit" onClick={ () => signInWithEmailAndPassword(email, password) }>Log In</button>
      </form>
      <div className="google-auth" onClick={ signInWithGoogle }>
        <div className="google-logo">
          <img src={ Google } alt="Google Logo"/>
        </div>
        <p>Sign in with Google</p>
      </div>
      <img className="pie-logo" src={ Logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Login;
