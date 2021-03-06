import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

import Logo from '../assets/img/pie_logo_orange.svg';
import Edit from '../assets/img/edit_icon.svg';
import EditActive from '../assets/img/edit_icon_active.svg';
import UnFav from '../assets/img/star_light.svg';
import Fav from '../assets/img/star_dark.svg';
import Delete from '../assets/img/delete.svg';

function Recipe() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({});
  const [origRecipe, setOrigRecipe] = useState({});
  const [editMode, isEditing] = useState(false);
  const [favourite, setIsFavourite] = useState(false);

  function editRecipe(e) {
    //e.preventDefault();
    if (editMode) {
      // Dsiable edit mode
      const clone = structuredClone(origRecipe);
      setRecipe(clone);
    } else {
      // Enter edit mode
      const clone = structuredClone(recipe);
      setOrigRecipe(clone);
    }
    isEditing((setInverse) => !setInverse);
  }

  function updateRecipeObj(target, property) {
    setRecipe((prevRecipe) => ({ ...prevRecipe, [property]: target.value }));
  }

  function updateRecipeObjIngred(parent, id) {
    const children = parent.children;
    const ingredient = {
      id: id,
      quantity: parseInt(children[0].value),
      unit: children[1].value,
      name: children[2].value,
    };
    const updatedIngredients = recipe.ingredients;
    const originalIngred = updatedIngredients.find(
      (element) => element.id === id
    );
    const originalIndex = updatedIngredients.indexOf(originalIngred);
    updatedIngredients[originalIndex] = ingredient;

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  }

  function deleteIngredient(ingredient) {
    const currentIngredients = recipe.ingredients;
    const ingredDelIndex = currentIngredients.indexOf(ingredient);
    currentIngredients.splice(ingredDelIndex, 1);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: currentIngredients,
    }));
  }

  function addIngredient() {
    let currentIngredients = recipe.ingredients;
    const newIngred = {
      id: uuid(),
      quantity: null,
      unit: '',
      name: '',
    };
    currentIngredients
      ? currentIngredients.push(newIngred)
      : (currentIngredients = newIngred);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: currentIngredients,
    }));
  }

  function updateSteps(step, id) {
    const newStep = {
      id: id,
      description: step.value,
    };
    const updatedSteps = recipe.steps;
    const originalStep = updatedSteps.find((element) => element.id === id);
    const originalIndex = updatedSteps.indexOf(originalStep);
    updatedSteps[originalIndex] = newStep;

    setRecipe((prevRecipe) => ({ ...prevRecipe, steps: updatedSteps }));
  }

  function deleteStep(step) {
    const currentSteps = recipe.steps;
    const stepDelIndex = currentSteps.indexOf(step);
    currentSteps.splice(stepDelIndex, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, steps: currentSteps }));
  }

  function addStep() {
    const currentSteps = recipe.steps;
    currentSteps.push({
      id: uuid(),
      description: '',
    });
    setRecipe((prevRecipe) => ({ ...prevRecipe, steps: currentSteps }));
  }

  function addTag(target) {
    const currentTags = recipe.tags;
    const newTagParent = target.parentElement.children[0];
    const newTag = newTagParent.value;
    currentTags.push({
      id: uuid(),
      name: newTag,
    });
    setRecipe((prevRecipe) => ({ ...prevRecipe, tags: currentTags }));
    newTagParent.value = ''; // set to empty for new input
  }

  function deleteTag(tag) {
    const currentTags = recipe.tags;
    const tagDelIndex = currentTags.indexOf(tag);
    currentTags.splice(tagDelIndex, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, tags: currentTags }));
  }

  function saveChanges() {
    // Put changes to db
    console.log('Saving changes...');
    const response = RecipesAPI.editRecipe(recipe);
    if (response) {
      const clone = structuredClone(recipe);
      setOrigRecipe(clone);
    } else {
      const clone = structuredClone(origRecipe);
      setRecipe(clone);
    }
    isEditing((setInverse) => !setInverse);
  }

  function deleteRecipe() {
    // Delete recipe
    console.log('Deleting recipe: ' + recipe._id);
    const response = RecipesAPI.deleteRecipe(recipe._id, user.user._id);
    if (response) {
      navigate('/my-recipes');
    }
  }

  function setFav() {
    // Set recipe favourite
    setRecipe((prevRecipe) => ({ ...prevRecipe, favourite: !favourite }));
    setIsFavourite((setInverse) => !setInverse);
  }

  // Strikethrough ingredient/step text on click
  function setIngredStepChecked(target) {
    const currentStyle = target.style.textDecoration;
    if (currentStyle === 'none') {
      target.style.textDecoration = 'line-through';
    } else {
      target.style.textDecoration = 'none';
    }
  }

  // Strikethrough ingredient if line clicked on

  useEffect(() => {
    RecipesAPI.getRecipe(params.id).then((response) => {
      setRecipe(response);
      setIsFavourite(response.favourite || false);
    });
  }, []);

  return !editMode ? (
    // Edit mode disabled
    <div className="react-container">
      <div className="recipe-title">
        <div className="name">
          <Link to={'/my-recipes'}>
            <div className="arrow left" />
          </Link>
          <h3>{recipe.name}</h3>
        </div>
        <div className="recipe-edit fav-btn no-edit">
          {favourite ? (
            <img src={Fav} alt="fav-btn"></img>
          ) : (
            <img src={UnFav} alt="fav-btn"></img>
          )}
        </div>
        <div className="recipe-edit">
          <img src={Edit} alt="edit-btn" onClick={(e) => editRecipe(e)}></img>
        </div>
      </div>

      <div className="line-br"></div>

      <div className="recipe-stats">
        <div className="serves">
          <img src={Edit} alt="edit-btn"></img>
          <p>Serves {recipe.serves}</p>
        </div>
        <div className="cook-time">{recipe.cook_time} mins</div>
      </div>

      <div className="recipe-list-title" id="first-child">
        <p className="list-box-info">Ingredients:</p>
      </div>
      <div className="list-box recipe">
        <ul>
          {recipe.ingredients ? (
            recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                onClick={(e) => setIngredStepChecked(e.target)}
              >
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))
          ) : (
            <li key="0">No ingredients yet.</li>
          )}
        </ul>
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Method:</p>
      </div>
      <div className="list-box recipe">
        {recipe.steps ? (
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id} onClick={(e) => setIngredStepChecked(e.target)}>
                {step.description}
              </li>
            ))}
          </ol>
        ) : (
          <ul>
            <li key="0">No steps added yet.</li>
          </ul>
        )}
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Photos:</p>
      </div>
      <div className="list-box recipe photo">
        <ul>
          {recipe.photos ? (
            recipe.photos.map((photo) => (
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
        <p>{recipe.notes ? recipe.notes : 'No notes added.'}</p>
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Tags:</p>
      </div>
      <div className="list-box recipe" id="tag-box">
        <ul>
          {recipe.tags ? (
            recipe.tags.map((tag, index) => <li key={index}>{tag.name}</li>)
          ) : (
            <li key="0">Add tags here.</li>
          )}
        </ul>
      </div>
      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  ) : (
    // Edit mode enabled
    <div className="react-container">
      <div className="recipe-title">
        <div className="name">
          <TextareaAutosize
            name="name"
            defaultValue={recipe.name}
            onChange={(e) => updateRecipeObj(e.target, 'name')}
          ></TextareaAutosize>
        </div>
        <div className="recipe-edit fav-btn">
          {favourite ? (
            <img src={Fav} alt="fav-btn" onClick={() => setFav()}></img>
          ) : (
            <img src={UnFav} alt="fav-btn" onClick={() => setFav()}></img>
          )}
        </div>
        <div className="recipe-edit">
          <img
            src={EditActive}
            alt="edit-btn"
            onClick={(e) => editRecipe(e)}
          ></img>
        </div>
      </div>

      <div className="line-br"></div>

      <div className="recipe-stats">
        <div className="serves editing">
          <p>Serves</p>
          <TextareaAutosize
            defaultValue={recipe.serves}
            placeholder="#"
            onChange={(e) => updateRecipeObj(e.target, 'serves')}
          />
        </div>
        <div className="cook-time editing">
          <TextareaAutosize
            defaultValue={recipe.cook_time}
            placeholder="#"
            onChange={(e) => updateRecipeObj(e.target, 'cook_time')}
          />
          <p>mins</p>
        </div>
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
          {recipe.ingredients ? (
            recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <TextareaAutosize
                  id="first-child"
                  defaultValue={ingredient.quantity}
                  onChange={(e) => {
                    updateRecipeObjIngred(
                      e.currentTarget.parentElement,
                      ingredient.id
                    );
                  }}
                />
                <TextareaAutosize
                  defaultValue={ingredient.unit}
                  onChange={(e) => {
                    updateRecipeObjIngred(
                      e.currentTarget.parentElement,
                      ingredient.id
                    );
                  }}
                />
                <TextareaAutosize
                  id="last-child"
                  defaultValue={ingredient.name}
                  onChange={(e) => {
                    updateRecipeObjIngred(
                      e.currentTarget.parentElement,
                      ingredient.id
                    );
                  }}
                />
                <img
                  className="delete-item"
                  src={Delete}
                  onClick={() => deleteIngredient(ingredient)}
                />
              </li>
            ))
          ) : (
            <li key="0">No ingredients yet.</li>
          )}
        </ul>
      </div>
      <button className="general recipe" onClick={() => addIngredient()}>
        Add ingredient
      </button>

      <div className="recipe-list-title">
        <p className="list-box-info">Method:</p>
      </div>
      <div className="list-box recipe edit-steps">
        {recipe.steps ? (
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>
                <TextareaAutosize
                  defaultValue={step.description}
                  onChange={(e) => updateSteps(e.target, step.id)}
                ></TextareaAutosize>
                <img
                  className="delete-item"
                  src={Delete}
                  onClick={() => deleteStep(step)}
                />
              </li>
            ))}
          </ol>
        ) : (
          <ul>
            <li key="0">No steps added yet.</li>
          </ul>
        )}
      </div>
      <button className="general recipe" onClick={() => addStep()}>
        Add step
      </button>

      <div className="recipe-list-title">
        <p className="list-box-info">Photos:</p>
      </div>
      <div className="list-box recipe photo">
        <ul>
          {recipe.photos ? (
            recipe.photos.map((photo) => (
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
      <div className="list-box recipe edit-notes">
        <ul>
          <li>
            {recipe.notes ? (
              <TextareaAutosize
                defaultValue={recipe.notes}
                placeholder="Add recipe notes here."
                onChange={(e) => updateRecipeObj(e.target, 'notes')}
              />
            ) : (
              <TextareaAutosize
                placeholder="Add recipe notes here."
                onChange={(e) => updateRecipeObj(e.target, 'notes')}
              />
            )}
          </li>
        </ul>
      </div>

      <div className="recipe-list-title">
        <p className="list-box-info">Tags:</p>
      </div>
      <div className="list-box recipe edit-tags" id="tag-box">
        <ul>
          {recipe.tags ? (
            recipe.tags.map((tag) => (
              <li key={tag.id}>
                {tag.name}
                <img
                  src={Delete}
                  className="delete-item"
                  onClick={() => deleteTag(tag)}
                />
              </li>
            ))
          ) : (
            <li key="0">Add tags here.</li>
          )}
        </ul>
      </div>
      <div className="add-tag-btn-in">
        <input className="add-tag-input" placeholder="Tag name"></input>
        <button className="add-tag-btn" onClick={(e) => addTag(e.target)}>
          Add tag
        </button>
      </div>

      <div className="line-br"></div>

      <div className="db-btns">
        <button className="general" onClick={() => saveChanges()}>
          Save changes
        </button>
        <button className="general" onClick={() => deleteRecipe()}>
          Delete recipe
        </button>
      </div>
      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default Recipe;
