import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';

import logo from '../assets/img/pie_logo_orange.svg';
import Google from '../assets/img/google.svg';

function Register() {
  const { user, authUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Navigate away if logged in
  useEffect(() => {
    if (!user.isVerifying && user.verified) {
      navigate('/my-recipes');
    }
  })
  
  async function registerHandler (e) {
    e.preventDefault();
    
    // Validation
    function validateEmail() {
      // do something

    }

    function validatePass() {
      // do something

    }

    // Register user
    try {
      setError(false);
      const header = {
        headers: {
          "Content-type": "application/json",
        }
      };
      const payload = {
        "name": name,
        "email": email,
        "password": password,
      };
  
      setIsLoading(true);
  
      const response = await axios.post('http://localhost:5000/api/v1/user/register',
        payload,
        header
      );
  
      localStorage.setItem('user', JSON.stringify(response.data))
      authUser();

      setIsLoading(false)
      navigate('/dashboard');
    } catch (e) {
      setError(e.response.data.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Please input your details below to sign up for an account.</p>
      </div>
      <div className="line-br"></div>
      <form className="general-form" onSubmit={registerHandler}>
        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" value={confirmPassword} placeholder="Repeat Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit" disabled>Sign Up</button>
      </form>
      <div className="google-auth">
        <div className="google-logo">
          <img src={ Google } alt="Google Logo"/>
        </div>
        <p>Sign up with Google</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>You have an error: { error }</p>}
      <img className="pie-logo" src={ logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default Register;