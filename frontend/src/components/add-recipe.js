import { useContext, useState } from 'react';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

import Delete from '../assets/img/delete.svg';
import Logo from '../assets/img/pie_logo_orange.svg';
import Fav from '../assets/img/star_dark.svg';
import UnFav from '../assets/img/star_light.svg';

function AddRecipe() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newRecipe, setNewRecipe] = useState({
    name: null,
    user_id: user.user._id,
    serves: null,
    cook_time: null,
    ingredients: null,
    steps: null,
    photos: null,
    notes: null,
    tags: null,
    favourite: false,
  });
  const [favourite, setIsFavourite] = useState(false);

  function updateRecipeObj(target, prop) {
    setNewRecipe((current) => ({ ...current, [prop]: target.value }));
  }

  function updateRecipeObjIngred(parent, id) {
    const children = parent.children;
    const ingredient = {
      id: id,
      quantity: parseInt(children[0].value),
      unit: children[1].value,
      name: children[2].value,
    };
    const updatedIngredients = newRecipe.ingredients;
    const originalIngred = updatedIngredients.find(
      (element) => element.id === id
    );
    const originalIndex = updatedIngredients.indexOf(originalIngred);
    updatedIngredients[originalIndex] = ingredient;

    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  }

  function deleteIngredient(ingredient) {
    const currentIngredients = newRecipe.ingredients;
    const ingredDelIndex = currentIngredients.indexOf(ingredient);
    currentIngredients.splice(ingredDelIndex, 1);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: currentIngredients,
    }));
  }

  function addIngredient() {
    let currentIngredients = [];
    if (newRecipe.ingredients) {
      currentIngredients = newRecipe.ingredients;
    }
    const newIngred = {
      id: uuid(),
      quantity: null,
      unit: '',
      name: '',
    };
    currentIngredients
      ? currentIngredients.push(newIngred)
      : (currentIngredients = newIngred);
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: currentIngredients,
    }));
  }

  function updateSteps(step, id) {
    const newStep = {
      id: id,
      description: step.value,
    };
    const updatedSteps = newRecipe.steps;
    const originalStep = updatedSteps.find((element) => element.id === id);
    const originalIndex = updatedSteps.indexOf(originalStep);
    updatedSteps[originalIndex] = newStep;

    setNewRecipe((prevRecipe) => ({ ...prevRecipe, steps: updatedSteps }));
  }

  function deleteStep(step) {
    const currentSteps = newRecipe.steps;
    const stepDelIndex = currentSteps.indexOf(step);
    currentSteps.splice(stepDelIndex, 1);
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, steps: currentSteps }));
  }

  function addStep() {
    let currentSteps = [];
    if (newRecipe.steps) {
      currentSteps = newRecipe.steps;
    }
    currentSteps.push({
      id: uuid(),
      description: '',
    });
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, steps: currentSteps }));
  }

  function addTag(target) {
    let currentTags = [];
    if (newRecipe.tags) {
      currentTags = newRecipe.tags;
    }
    const newTagParent = target.parentElement.children[0];
    const newTag = newTagParent.value;
    currentTags.push({
      id: uuid(),
      name: newTag,
    });
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, tags: currentTags }));
    newTagParent.value = ''; // set to empty for new input
  }

  function deleteTag(tag) {
    const currentTags = newRecipe.tags;
    const tagDelIndex = currentTags.indexOf(tag);
    currentTags.splice(tagDelIndex, 1);
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, tags: currentTags }));
  }

  function setFav() {
    // Set recipe favourite
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, favourite: !favourite }));
    setIsFavourite((setInverse) => !setInverse);
  }

  function saveRecipe() {
    // Put changes to db
    console.log('Saving recipe...');
    RecipesAPI.newRecipe(newRecipe).then((response) => {
      if (response) {
        const newID = response.data.insertedId;
        navigate('/recipe/' + newID);
      }
    });
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
        <div className="recipe-edit fav-btn new-recipe">
          {favourite ? (
            <img src={Fav} alt="fav-btn" onClick={() => setFav()}></img>
          ) : (
            <img src={UnFav} alt="fav-btn" onClick={() => setFav()}></img>
          )}
        </div>
      </div>

      <div className="line-br"></div>

      <div className="recipe-stats">
        <div className="serves editing">
          <p>Serves</p>
          <TextareaAutosize
            defaultValue={newRecipe.serves}
            placeholder="#"
            onChange={(e) => updateRecipeObj(e.target, 'serves')}
          />
        </div>
        <div className="cook-time editing">
          <TextareaAutosize
            defaultValue={newRecipe.cook_time}
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
          {newRecipe.ingredients ? (
            newRecipe.ingredients.map((ingredient) => (
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
        {newRecipe.steps ? (
          <ol>
            {newRecipe.steps.map((step) => (
              <li key={step.id}>
                <TextareaAutosize
                  defaultValue={step.description}
                  onChange={(e) => updateSteps(e.target, step.id)}
                ></TextareaAutosize>
                <img
                  className="delete-item"
                  src={Delete}
                  onClick={(e) => deleteStep(step)}
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
      <div className="list-box recipe edit-notes">
        <ul>
          <li>
            {newRecipe.notes ? (
              <TextareaAutosize
                defaultValue={newRecipe.notes}
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
          {newRecipe.tags ? (
            newRecipe.tags.map((tag) => (
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

      <div className="db-btns">
        <button className="general" onClick={() => saveRecipe()}>
          Save changes
        </button>
      </div>

      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default AddRecipe;
