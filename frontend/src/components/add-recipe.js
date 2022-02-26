import React, { useState } from 'react';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

import Edit from '../assets/img/edit_icon.svg';
import Delete from '../assets/img/delete.svg';
import Logo from '../assets/img/pie_logo_orange.svg';

function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({});

  function updateRecipeObj(target, prop) {
    setNewRecipe((current) => ({ ...current, [prop]: target.value }));
  }

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

      <div className="recipe-stats">
        <div className="serves editing">
          <img src={Edit} alt="edit-btn"></img>
          <p>Serves {''}</p>
        </div>
        <div className="cook-time editing">{''} mins</div>
      </div>

      <div className="recipe-list-title" id="first-child">
        <p className="list-box-info">Ingredients:</p>
      </div>
      <div className="ingredients-header">
        <div className="element" id="first-child">
          Quantity
        </div>
        <div className="element" id="second-child">
          Unit
        </div>
        <div className="element" id="third-child">
          Description
        </div>
      </div>
      <div className="list-box recipe edit-ingredients">
        <ul>
          {newRecipe.ingredients ? (
            newRecipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <TextareaAutosize
                  id="first-child"
                  defaultValue={ingredient.quantity}
                  onChange={(e) => {
                    '';
                  }}
                />
                <TextareaAutosize
                  defaultValue={ingredient.unit}
                  onChange={(e) => {
                    '';
                  }}
                />
                <TextareaAutosize
                  id="last-child"
                  defaultValue={ingredient.name}
                  onChange={(e) => {
                    '';
                  }}
                />
                <img className="delete-item" src={Delete} onClick={''} />
              </li>
            ))
          ) : (
            <li key="0">No ingredients yet.</li>
          )}
        </ul>
      </div>
      <button className="general recipe" onClick={() => ''}>
        Add ingredient
      </button>

      <div className="recipe-list-title">
        <p className="list-box-info">Method:</p>
      </div>
      <div className="list-box recipe edit-steps">
        {newRecipe.steps ? (
          <ol>
            {newRecipe.steps.map((step) => (
              <li key={step.id}>
                <TextareaAutosize
                  defaultValue={step.description}
                  onChange={(e) => ''}
                ></TextareaAutosize>
                <img className="delete-item" src={Delete} onClick={() => ''} />
              </li>
            ))}
          </ol>
        ) : (
          <ul>
            <li key="0">No steps added yet.</li>
          </ul>
        )}
      </div>
      <button className="general recipe" onClick={() => ''}>
        Add step
      </button>

      <div className="recipe-list-title">
        <p className="list-box-info">Photos:</p>
      </div>
      <div className="list-box recipe photo">
        <ul>
          {newRecipe.photos ? (
            newRecipe.photos.map((photo) => (
              <li key={photo.id}>
                <img src="" alt="Photo"></img>
              </li>
            ))
          ) : (
            <li key="0">No photos added yet.</li>
          )}
        </ul>
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Notes:</p>
      </div>
      <div className="list-box recipe">
        <p>{newRecipe.notes ? newRecipe.notes : 'Write any notes here.'}</p>
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Tags:</p>
      </div>
      <div className="list-box recipe" id="tag-box">
        <ul>
          {newRecipe.tags ? (
            newRecipe.tags.map((tag) => <li key={tag.id}>{tag.name}</li>)
          ) : (
            <li key="0">Add tags here.</li>
          )}
        </ul>
      </div>
      <div className="line-br"></div>
      <div className="db-btns">
        <button className="general" onClick={() => ''}>
          Save recipe
        </button>
      </div>

      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default AddRecipe;
