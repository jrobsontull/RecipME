import React from "react"
import { Routes, Route, Link } from "react-router-dom"

import "./assets/css/global.css"

import Home from "./components/home"
import Login from "./components/login"
import Register from "./components/register"
import About from "./components/about"
import Dashoard from "./components/dashboard"
import MyRecipes from "./components/my-recipes"
import Settings from "./components/settings"

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  async function login() {
    setIsLoggedIn(true)
    toggleHamburger()
  }

  async function logout() {
    setIsLoggedIn(false)
    toggleHamburger()
  }

  const [hamburgerOpen, setHamburgerOpen] = React.useState(false)
  function toggleHamburger(ham) {
    ham.classList.toggle("change-state")
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <div className="container">
      <div className="navbar">
        <div className="header">
          <div className="brand">
            <Link to={"/"} onClick={toggleHamburger}>
              RecipME
            </Link>
          </div>
          <div className="nav-ham" onClick={(e) => {
            /*e.preventDefault()
            e.currentTarget.classList.toggle("change-state")*/
            toggleHamburger(e.currentTarget)
          }}>
            <div className="ham1"></div>
            <div className="ham2"></div>
            <div className="ham3"></div>
          </div>
        </div>
        {
          isLoggedIn ? (
            <ul className={hamburgerOpen ? "nav clicked" : "nav"}>
              <li className="item">
                <Link to={"/dashboard"} onClick={toggleHamburger}>
                  Dashboard
                </Link>
              </li>
              <li className="item">
                <Link to={"/my-recipes"} onClick={toggleHamburger}>
                  My Recipes
                </Link>
              </li>
              <li className="item">
                <Link to={"/settings"} onClick={toggleHamburger}>
                  Settings
                </Link>
              </li>
              <li className="item">
                <Link to={"/"} onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={hamburgerOpen ? "nav clicked" : "nav"}>
              <li className="item">
                <Link to={"/login"} onClick={login}>
                  Sign In
                </Link>
              </li>
              <li className="item">
                <Link to={"/register"} onClick={toggleHamburger}>
                  Register
                </Link>
              </li>
              <li className="item">
                <Link to={"/about"} onClick={toggleHamburger}>
                  About
                </Link>
              </li>
            </ul>
          )
        }
      </div>
      <div className="content">
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/about"} element={<About/>}/>
          <Route path={"/dashboard"} element={<Dashoard/>}/>
          <Route path={"/my-recipes"} element={<MyRecipes/>}/>
          <Route path={"/settings"} element={<Settings/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
