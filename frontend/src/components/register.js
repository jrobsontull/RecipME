import React from "react"
import logo from "../assets/img/pie_logo_orange.svg"
import Google from "../assets/img/google.svg"

function Register() {
  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign up for an account.</p>
      </div>
      <div className="line-br"></div>
      <form className="general-form">
        <input type="text" placeholder="Name"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <input type="password" placeholder="Repeat Password"/>
        <button type="submit">Sign Up</button>
      </form>
      <div className="google-auth">
        <div className="google-logo">
          <img src={ Google } alt="Google Logo"/>
        </div>
        <p>Sign up with Google</p>
      </div>
      <img className="pie-logo" src={ logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Register;