import React, { useState } from 'react';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

import Logo from '../assets/img/pie_logo_orange.svg';

function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({});

  function updateRecipeObj(target, prop) {
    setNewRecipe((current) => ({ ...current, [prop]: target.value }));
  }

  const test = 1;

  return (
    <div className="react-container">
      <div className="recipe-title">
        <div className="name">
          <TextareaAutosize
            name="name"
            placeholder="Type title here"
            onChange={(e) => updateRecipeObj(e.target, 'name')}
          ></TextareaAutosize>
        </div>
      </div>

      <div className="line-br"></div>

      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default AddRecipe;
