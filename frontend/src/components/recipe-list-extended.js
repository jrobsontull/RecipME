import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../utils/auth.context';

function RecipeListExtended() {
  const { user } = useContext(AuthContext);
  const [recipesSearch, setRecipesSearch] = useState([]);

  return (
    <div className="react-container">
      <div className="name">
        <Link to={'/my-recipes'}>
          <div className="arrow left" />
        </Link>
        <h3>Search param name here</h3>
      </div>
      <div className="list-box">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>
  );
}

export default RecipeListExtended;
