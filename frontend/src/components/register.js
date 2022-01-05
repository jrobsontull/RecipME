import React from "react"
import logo from "../assets/img/pie_logo_orange.svg"

function Register() {
  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign up for an account.</p>
      </div>
      <div className="line-br"></div>
      <form className="loginout-form">
        <input type="text" placeholder="Name"></input>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <input type="password" placeholder="Repeat Password"></input>
        <input type="submit" value="Sign Up"></input>
      </form>
      <img className="pie-logo" src={ logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Register;