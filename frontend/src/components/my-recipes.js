import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';
import RecipesAPI from '../utils/recipes-api';

import Logo from '../assets/img/pie_logo_orange.svg';
import { Link } from 'react-router-dom';

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    RecipesAPI.getUserRecipes(user.user).then((response) => {
      setRecipes(response);
    });
    RecipesAPI.getDistinctTags(user.user._id).then((response) => {
      setTags(response);
    });
    RecipesAPI.getFavourites(user.user).then((response) => {
      setFavourites(response);
    });
  }, []);

  return (
    <div className="react-container">
      <div className="intro-text">
        Welcome back <strong>{user.user.name}</strong>!
      </div>
      <div className="line-br"></div>
      <div className="my-recipes-list-title" id="first-child">
        <p className="list-box-info">My recipes</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box">
        <ul>
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <li key={recipe._id}>
                <Link to={'/recipe/' + recipe._id}>{recipe.name}</Link>
              </li>
            ))
          ) : (
            <li id="none" key={'0'}>
              You have no recipes yet!
            </li>
          )}
        </ul>
      </div>
      <button className="general" onClick={() => navigate('/add-recipe')}>
        Add recipe
      </button>
      <div className="my-recipes-list-title">
        <p className="list-box-info">Tags</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box" id="tag-box">
        <ul>
          {tags.length > 0 ? (
            tags.map((tag) => <li key={tag.id}>{tag.name}</li>)
          ) : (
            <li key={'0'}>No tags yet.</li>
          )}
        </ul>
      </div>
      <div className="my-recipes-list-title">
        <p className="list-box-info">Favourites</p>
        <div className="arrow right"></div>
      </div>
      <div className="list-box">
        <ul>
          {favourites.length > 0 ? (
            favourites.map((recipe, index) => (
              <li key={recipe._id}>
                <Link to={'/recipe/' + recipe._id}>{recipe.name}</Link>
              </li>
            ))
          ) : (
            <li id="none" key={'0'}>
              You have no favourites yet.
            </li>
          )}
        </ul>
      </div>
      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default MyRecipes;
