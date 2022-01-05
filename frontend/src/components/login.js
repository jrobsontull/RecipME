import React from "react"
import logo from "../assets/img/pie_logo_orange.svg"

function Login() {
  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign into your account.</p>
      </div>
      <div className="line-br"></div>
      <form className="loginout-form">
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <input type="submit" value="Log In"></input>
      </form>
      <img className="pie-logo" src={ logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Login;
