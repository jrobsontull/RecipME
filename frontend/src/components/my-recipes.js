import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../utils/auth.context';
import RecipesAPI from '../utils/recipes-api';

import Logo from '../assets/img/pie_logo_orange.svg';
import { Link } from 'react-router-dom';

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    RecipesAPI.getUserRecipes(user.user).then((response) => {
      setRecipes(response);
    })
  }, [])

  return (
    <div className="react-container">
      <div className="intro-text">
        Welcome back <strong>{ user.user.name }</strong>!
      </div>
      <div className="line-br"></div>
      <div className="my-recipes-list-title" id="first-child">
        <p className="list-box-info">My recipes</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box">
        <ul>
          { recipes.length > 0 ?
            recipes.map((recipe, index) => (
              <li key={ index }><Link to={'/recipe/' + recipe._id}>{ recipe.name }</Link></li>
            )) : <li id="none">You have no recipes yet!</li> }
        </ul>
      </div>
      <button className="general">Add recipe</button>
      <div className="my-recipes-list-title">
        <p className="list-box-info">Tags</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box" id="tag-box">
        <ul>
          <li>#Tag1</li>
          <li>#Tag2</li>
          <li>#Tag3</li>
          <li>#Tag4</li>
          <li>#Tag5</li>
          <li>#Tag6</li>
          <li>#Tag7</li>
          <li>#Tag8</li>
          <li>#Tag9</li>
          <li>#Tag10</li>
          <li>#Tag11</li>
          <li>#Tag12</li>
        </ul>
      </div>
      <div className="my-recipes-list-title">
        <p className="list-box-info">Favourites</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box">
        <ul>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
          <li>Something recipe here</li>
        </ul>
      </div>
      <img className="pie-logo" src={ Logo } alt="logo"/>
      <div className="line-br"></div>
    </div>
  );
}

export default MyRecipes;