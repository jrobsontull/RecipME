import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';
import RecipesAPI from '../utils/recipes-api';

import Logo from '../assets/img/pie_logo_orange.svg';
import { Link } from 'react-router-dom';

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesData, setRecipesData] = useState({
    totalRecipes: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const [tags, setTags] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  function calculateTotalPageNums(numPerPage, entries) {
    let count = 1;
    let tracker = entries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  function nextPage() {
    if (
      recipesData.totalPages > 1 &&
      recipesData.totalPages - 1 !== recipesData.currentPage
    ) {
      const pageToScrollTo = recipesData.currentPage + 1;
      RecipesAPI.getUserRecipes(user.user, 'page=' + pageToScrollTo).then(
        (response) => {
          setRecipes(response.recipes);
          setRecipesData((prevData) => ({
            ...prevData,
            currentPage: pageToScrollTo,
          }));
        }
      );

      if (pageToScrollTo === recipesData.totalPages) {
        // set style of button to disabled
      }
    }
  }

  function prevPage() {
    if (recipesData.currentPage > 0) {
      const pageToScrollTo = recipesData.currentPage - 1;
      RecipesAPI.getUserRecipes(user.user, 'page=' + pageToScrollTo).then(
        (response) => {
          setRecipes(response.recipes);
          setRecipesData((prevData) => ({
            ...prevData,
            currentPage: pageToScrollTo,
          }));
        }
      );
    }
  }

  useEffect(() => {
    RecipesAPI.getUserRecipes(user.user).then((response) => {
      setRecipes(response.recipes);
      setRecipesData({
        totalRecipes: response.total_results,
        currentPage: 0,
        totalPages: calculateTotalPageNums(10, response.total_results),
      });
    });
    RecipesAPI.getDistinctTags(user.user._id).then((response) => {
      setTags(response);
    });
    RecipesAPI.getFavourites(user.user).then((response) => {
      setFavourites(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="react-container">
      <div className="intro-text">
        Welcome back <strong>{user.user.name}</strong>!
      </div>
      <div className="line-br"></div>

      <Link
        to={'/my-recipes/list'}
        state={{
          searchParamTitle: 'All my recipes',
          searchParam: 'api/v1/recipes?user_id=' + user.user._id,
        }}
        className="my-recipes-link"
      >
        <div className="my-recipes-list-title" id="first-child">
          <p className="list-box-info">My recipes</p>
          <div className="arrow right"></div>
        </div>
      </Link>

      <div className="list-box my-recipes">
        <ul>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
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

      {recipesData.totalRecipes > 10 ? (
        <div className="page-nav">
          {recipesData.currentPage === 0 ? (
            <div className="arrow-btn disabled" onClick={() => prevPage()}>
              <div className="arrow left"></div>
            </div>
          ) : (
            <div className="arrow-btn" onClick={() => prevPage()}>
              <div className="arrow left"></div>
            </div>
          )}

          <div className="current-page">{recipesData.currentPage + 1}</div>
          <div className="out-pages">out of {recipesData.totalPages}</div>

          {recipesData.currentPage === recipesData.totalPages - 1 ? (
            <div className="arrow-btn disabled" onClick={() => nextPage()}>
              <div className="arrow right"></div>
            </div>
          ) : (
            <div className="arrow-btn right" onClick={() => nextPage()}>
              <div className="arrow right"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="page-nav">
          <div className="arrow-btn disabled">
            <div className="arrow left"></div>
          </div>
          <div className="current-page">1</div>
          <div className="out-pages">out of 1</div>
          <div className="arrow-btn right disabled">
            <div className="arrow right"></div>
          </div>
        </div>
      )}

      <br></br>
      <div className="search-recipe-btn">
        <input placeholder="Recipe name"></input>
        <button>Search</button>
      </div>

      <button className="general" onClick={() => navigate('/add-recipe')}>
        Add recipe
      </button>
      <Link
        to={'/my-recipes/list'}
        state={{ searchParamTitle: 'All my tags' }}
        className="my-recipes-link"
      >
        <div className="my-recipes-list-title">
          <p className="list-box-info">Tags</p>
          <div className="arrow right"></div>
        </div>
      </Link>
      <div className="list-box" id="tag-box">
        <ul>
          {tags.length > 0 ? (
            tags.map((tag) => <li key={tag.id}>{tag.name}</li>)
          ) : (
            <li key={'0'}>No tags yet.</li>
          )}
        </ul>
      </div>
      <Link
        to={'/my-recipes/list'}
        state={{ searchParamTitle: 'All my favourites' }}
        className="my-recipes-link"
      >
        <div className="my-recipes-list-title">
          <p className="list-box-info">Favourites</p>
          <div className="arrow right"></div>
        </div>
      </Link>
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
