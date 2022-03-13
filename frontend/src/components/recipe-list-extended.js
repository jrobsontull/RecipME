import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../utils/auth.context';

import Logo from '../assets/img/pie_logo_orange.svg';

function RecipeListExtended() {
  const location = useLocation();
  const listBoxTitle = location.state.searchParamTitle;
  const { user } = useContext(AuthContext);
  const [recipesSearch, setRecipesSearch] = useState([]);
  console.log(location.state.searchParam);

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
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </div>
      <div className="page-nav">
        <div className="arrow-btn">
          <div className="arrow left"></div>
        </div>
        <div className="current-page">1</div>
        <div className="out-pages">out of 2</div>
        <div className="arrow-btn">
          <div className="arrow right"></div>
        </div>
      </div>
      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default RecipeListExtended;
