import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../utils/auth.context';
import RecipesAPI from '../utils/recipes-api';

import Logo from '../assets/img/pie_logo_orange.svg';

function RecipeListExtended() {
  // Set up search params
  const location = useLocation();
  const numPerPage = 15; // num of recipes per page to display
  let listBoxTitle = 'All my recipes';
  let searchParam = null;
  if (location.state) {
    listBoxTitle = location.state.searchParamTitle;
    searchParam = location.state.searchParam;
  }

  // Set up other globals
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesData, setRecipesData] = useState({
    totalRecipes: 0,
    currentPage: 0,
    totalPages: 0,
  });

  // Nav functions
  function nextPage() {}

  function prevPage() {}

  function calculateTotalPageNums(numPerPage, entries) {
    let count = 1;
    let tracker = entries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  // Initial page state
  useEffect(() => {
    if (searchParam) {
      RecipesAPI.getUserRecipes(
        user.user,
        searchParam + '&recipesPerPage=15'
      ).then((response) => {
        setRecipes(response.recipes);
        setRecipesData({
          totalRecipes: response.total_results,
          currentPage: 0,
          totalPages: calculateTotalPageNums(15, response.total_results),
        });
      });
    } else {
      RecipesAPI.getUserRecipes(user.user, '&recipesPerPage=15').then(
        (response) => {
          setRecipes(response.recipes);
          setRecipesData({
            totalRecipes: response.total_results,
            currentPage: 0,
            totalPages: calculateTotalPageNums(15, response.total_results),
          });
        }
      );
    }
  }, []);

  return (
    <div className="react-container">
      <div className="list-extended-name">
        <Link to={'/my-recipes'}>
          <div className="arrow left" />
        </Link>
        <h3>{listBoxTitle ? listBoxTitle : 'Generic recipe search'}</h3>
      </div>
      <div className="list-box extended">
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

      {recipesData.totalRecipes > 15 ? (
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

      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default RecipeListExtended;
