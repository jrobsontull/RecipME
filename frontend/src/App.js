import React from "react"
import { Routes, Route, Link } from "react-router-dom"

import "./assets/css/global.css"

import Home from "./components/home"
import Login from "./components/login"
import Register from "./components/register"
import About from "./components/about"

function App() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="header">
          <div className="brand">
            <Link to={"/"}>
              RecipME
            </Link>
          </div>
          <div className="nav-ham" onClick={(e) => {
            e.preventDefault()
            e.currentTarget.classList.toggle("change-state")

          }}>
            <div className="ham1"></div>
            <div className="ham2"></div>
            <div className="ham3"></div>
          </div>
        </div>
        <ul className="nav">
          <li className="item">
            <Link to={"/login"}>
              Sign In
            </Link>
          </li>
          <li className="item">
            <Link to={"/register"}>
              Register
            </Link>
          </li>
          <li className="item">
            <Link to={"/about"}>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="content">
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/about"} element={<About/>}/>
        </Routes>
      </div>
    </div>
  );
}

class NavState extends React.Component {
  
}

export default App;
