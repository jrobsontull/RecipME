import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';

import logo from '../assets/img/pie_logo_orange.svg';
import Tutorial01 from '../assets/img/tutorial_01.PNG';
import Tutorial02 from '../assets/img/tutorial_02.PNG';
import Tutorial03 from '../assets/img/tutorial_03.PNG';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.verified === true) {
      navigate('/my-recipes');
    }
  });

  return (
    <div className="react-container">
      <div className="intro-text">
        <p>Welcome! This is a web-based recipie manager.</p>
        <p>
          To start using, please <Link to={'/login'}>sign in</Link> or{' '}
          <Link to={'/register'}>register</Link> for an account.
        </p>
      </div>
      <div className="line-br"></div>
      <div className="how-to">
        <h3>How to use:</h3>
        <ul>
          <li>
            Start by regiestering for an account. This account will be used to
            save your recipes to so that you can come back to it later.
          </li>
          <li>
            Once logged in, you will see that you have no recipes. Start by
            creating a new recipe.
          </li>
        </ul>
        <img src={Tutorial01} alt="tutorial-01"></img>
        <ul>
          <li>
            Click the empty boxes to fill out recipe information like the recipe
            name, ingredients, steps for creating your recipe and so on. A lot
            of the boxes are optional for now so don't worry if you don't have
            all the information yet.
          </li>
          <li>
            Once you're done filling in information, click the Save Changes
            button to save the recipe.
          </li>
        </ul>
        <img src={Tutorial02} alt="tutorial-02"></img>
        <ul>
          <li>
            To edit a recipe, click the edit icon and make changes. You can save
            these by clicking the Save Changes button. You can also delete a
            recipe in the edit mode.
          </li>
        </ul>
        <img src={Tutorial03} alt="tutorial-03"></img>
        <ul>
          <li>
            To add recipe favourites, open a recipe, click the edit button and
            now you can click the star icon to mark a recipe as favourite.
            Remember to click Save Changes when done.
          </li>
        </ul>
      </div>
      <img className="pie-logo" src={logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default Home;
