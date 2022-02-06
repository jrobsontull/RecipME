import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoLight from '../assets/img/pie_logo_light.svg';

import AuthContext from '../services/auth.context';

function Navbar() {
    const { user } = useContext(AuthContext);
    const [hamburgerOpen, setHamburgerOpen] = React.useState(false);
    const navigate = useNavigate();

    function toggleHamburger (ham) {
        ham.classList.toggle("change-state");
        setHamburgerOpen(!hamburgerOpen);
    }

    function logout () {
        localStorage.removeItem('user');
        navigate('/');
        toggleHamburger();
    }

    return (
        <div className="navbar">
            <div className="header">
            <div className="brand">
                <img src={ LogoLight } alt="Logo"/>
                <Link to={"/"} onClick={toggleHamburger}>
                RecipME
                </Link>
            </div>
            <div className="nav-ham" onClick={(e) => {
                /*e.preventDefault()
                e.currentTarget.classList.toggle("change-state")*/
                toggleHamburger(e.currentTarget);
            }}>
                <div className="ham1"></div>
                <div className="ham2"></div>
                <div className="ham3"></div>
            </div>
            </div>
            {
            user.verified ? (
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
                <li className="item" onClick={logout}>
                    <Link to={"/"}>
                    Logout
                    </Link>
                </li>
                </ul>
            ) : (
                <ul className={hamburgerOpen ? "nav clicked" : "nav"}>
                <li className="item">
                    <Link to={"/login"} onClick={toggleHamburger}>
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
    );
}

export default Navbar;