import React, { useState, useEffect } from "react"

import Logo from "../assets/img/pie_logo_orange.svg"
import Google from "../assets/img/google.svg"

function Login() {
  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign into your account.</p>
      </div>
      <div className="line-br"></div>
      <form className="general-form">
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button type="submit">Log In</button>
      </form>
      <div className="google-auth">
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
