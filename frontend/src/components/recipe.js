import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams, useResolvedPath } from 'react-router-dom';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

import Logo from '../assets/img/pie_logo_orange.svg';
import Edit from '../assets/img/edit_icon.svg';
import EditActive from '../assets/img/edit_icon_active.svg';
import Delete from '../assets/img/delete.svg';

function Recipe() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [ recipe, setRecipe ] = useState({});
    const [ editMode, isEditing ] = useState(false);

    function editRecipe(e) {
        //e.preventDefault();
        isEditing(setInverse => !setInverse);
    }

    function updateRecipeObj(target, property) {
        console.log(target.value, [property])
        setRecipe(prevRecipe => (
            {...prevRecipe, [property]: target.value}
        ));
    }

    function updateRecipeObjIngred(parent, id) {
        const children = parent.children;
        const ingredient = {
            "id": id,
            "quantity": parseInt(children[0].value),
            "unit": children[1].value,
            "name": children[2].value
        }
        const updatedIngredients = recipe.ingredients;
        const originalIngred = updatedIngredients.find(
            element => element.id === id
        );
        const originalIndex = updatedIngredients.indexOf(originalIngred);
        updatedIngredients[originalIndex] = ingredient;
        
        setRecipe(prevRecipe => (
            {...prevRecipe, "ingredients": updatedIngredients}
        ));
    }

    function deleteIngredient(ingredient) {
        const currentIngredients = recipe.ingredients;
        const ingredDelIndex = currentIngredients.indexOf(ingredient);
        currentIngredients.splice(ingredDelIndex, 1)
        setRecipe(prevRecipe => (
            {...prevRecipe, "ingredients": currentIngredients}
        ));
    }

    function addIngredient() {
        const currentIngredients = recipe.ingredients;
        currentIngredients.push({ 
            "id": uuid(),
            "quantity": null,
            "unit": "",
            "name": ""
        });
        setRecipe(prevRecipe => (
            {...prevRecipe, "ingredients": currentIngredients}
        ));
    }

    function updateSteps(step, id) {
        const newStep = {
            "id": id,
            "description": step.value
        }
        const updatedSteps = recipe.steps;
        const originalStep = updatedSteps.find(
            element => element.id === id
        );
        const originalIndex = updatedSteps.indexOf(originalStep);
        updatedSteps[originalIndex] = newStep;
        
        setRecipe(prevRecipe => (
            {...prevRecipe, "steps": updatedSteps}
        ));
    }

    function deleteStep(step) {
        const currentSteps = recipe.steps;
        const stepDelIndex = currentSteps.indexOf(step);
        currentSteps.splice(stepDelIndex, 1);
        setRecipe(prevRecipe => (
            {...prevRecipe, "steps": currentSteps}
        ));
    }

    function addStep() {
        const currentSteps = recipe.steps;
        currentSteps.push({
            "id": uuid(),
            "description": ""
        })
        setRecipe(prevRecipe => (
            {...prevRecipe, "steps": currentSteps}
        ));
    }

    useEffect(() => {
        RecipesAPI.getRecipe(params.id).then((response) => {
            setRecipe(response);
        });
    }, [])

    return (
        !editMode ? (
            // Edit mode disabled
            <div className="react-container">
                <div className="recipe-title">
                    <div className="name">
                        <Link to={"/my-recipes"}>
                            <div className="arrow left"/>
                        </Link>
                        <h3>{ recipe.name }</h3>
                    </div>
                    <div className="recipe-edit">
                        <img src={ Edit } alt="edit-btn" onClick={(e) => editRecipe(e)}></img>
                    </div>
                </div>
                
                <div className="line-br"></div>

                <div className="recipe-stats">
                    <div className="serves">
                        <img src={ Edit } alt="edit-btn"></img>
                        <p>Serves { recipe.serves }</p>
                    </div>
                    <div className="cook-time">{ recipe.cook_time } mins</div>
                </div>
                
                <div className="recipe-list-title" id="first-child">
                    <p className="list-box-info">Ingredients:</p>
                </div>
                <div className="list-box recipe">
                    <ul>
                        { recipe.ingredients ?
                            recipe.ingredients.map((ingredient) => (
                                <li key={ ingredient.id }>
                                    { ingredient.quantity } { ingredient.unit } { ingredient.name }
                                </li>
                            )) : <li key="0">No ingredients yet.</li>
                        }
                    </ul>
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Method:</p>
                </div>
                <div className="list-box recipe">
                    { recipe.steps ? 
                        <ol>
                            {recipe.steps.map((step) => (
                                <li key={ step.id }>
                                    { step.description }
                                </li>
                            ))} 
                        </ol> : <ul>
                            <li key="0">No steps added yet.</li>
                        </ul>
                    }
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Photos:</p>
                </div>
                <div className="list-box recipe">
                    <ul>
                        {
                            recipe.photos ?
                                recipe.photos.map((photo) => (
                                    <li key={ photo.id }>
                                        <Link to={ photo.link }>Photo</Link>
                                    </li>
                                )) : <li key="0">No photos added yet.</li>
                        }
                    </ul>
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Notes:</p>
                </div>
                <div className="list-box recipe">
                    <p>{ recipe.notes ? recipe.notes : "Write any notes here." }</p>
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Tags:</p>
                </div>
                <div className="list-box recipe" id="tag-box">
                    <ul>
                        { recipe.tags ?
                            recipe.tags.map((tag, index) => (
                                <li key={ index }>
                                    { tag.name }
                                </li>
                            )) : <li key="0">Add tags here.</li>
                        }
                    </ul>
                </div>
                <img className="pie-logo" src={ Logo } alt="logo"/>
                <div className="line-br"></div>
            </div>
        ) : 
        // Edit mode enabled
            <div className="react-container">   
                <div className="recipe-title">
                    <div className="name">
                        <TextareaAutosize name="name" defaultValue={ recipe.name } onChange={(e) => updateRecipeObj(e.target, 'name')}></TextareaAutosize>
                    </div>
                    <div className="recipe-edit">
                        <img src={ EditActive } alt="edit-btn" onClick={(e) => editRecipe(e)}></img>
                    </div>
                </div>
                
                <div className="line-br"></div>

                <div className="recipe-stats">
                    <div className="serves editing">
                        <img src={ Edit } alt="edit-btn"></img>
                        <p>Serves { recipe.serves }</p>
                    </div>
                    <div className="cook-time editing">{ recipe.cook_time } mins</div>
                </div>
                
                <div className="recipe-list-title" id="first-child">
                    <p className="list-box-info">Ingredients:</p>
                </div>
                <div className="ingredients-header">
                    <div className="element" id="first-child">Quantity</div>
                    <div className="element" id="second-child">Unit</div>
                    <div className="element" id="third-child">Description</div>
                </div>
                <div className="list-box recipe edit-ingredients">
                    <ul>
                        { recipe.ingredients ?
                            recipe.ingredients.map((ingredient) => (
                                <li key={ ingredient.id }>
                                    <TextareaAutosize id="first-child" defaultValue={ ingredient.quantity } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, ingredient.id);
                                        }
                                    }/>
                                    <TextareaAutosize defaultValue={ ingredient.unit } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, ingredient.id);
                                        }
                                    }/>
                                    <TextareaAutosize id="last-child" defaultValue={ ingredient.name } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, ingredient.id);
                                        }
                                    }/>
                                    <img className="delete-item" src={ Delete } onClick={ () => deleteIngredient(ingredient) } />
                                </li>
                            )) : <li key="0">No ingredients yet.</li>
                        }
                    </ul>
                </div>
                <button className="general recipe" onClick={ () => addIngredient() }>Add ingredient</button>

                <div className="recipe-list-title">
                    <p className="list-box-info">Method:</p>
                </div>
                <div className="list-box recipe edit-steps">
                    { recipe.steps ? 
                        <ol>
                            {recipe.steps.map((step) => (
                                <li key={ step.id }>
                                    <TextareaAutosize defaultValue={ step.description } onChange={ (e) => updateSteps(e.target, step.id) }></TextareaAutosize>
                                    <img className="delete-item" src={ Delete } onClick={ () => deleteStep(step) } />
                                </li>
                            ))} 
                        </ol> : <ul>
                            <li key="0">No steps added yet.</li>
                        </ul>
                    }
                </div>
                <button className="general recipe" onClick={ () => addStep() }>Add step</button>

                <div className="recipe-list-title">
                    <p className="list-box-info">Photos:</p>
                </div>
                <div className="list-box recipe">
                    <ul>
                    {
                        recipe.photos ?
                            recipe.photos.map((photo) => (
                                <li key={ photo.id }>
                                    <Link to={ photo.link }>Photo</Link>
                                </li>
                            )) : <li key="0">No photos added yet.</li>
                    }
                    </ul>
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Notes:</p>
                </div>
                <div className="list-box recipe">
                    <p>{ recipe.notes ? recipe.notes : "Write any notes here." }</p>
                </div>

                <div className="recipe-list-title">
                    <p className="list-box-info">Tags:</p>
                </div>
                <div className="list-box recipe" id="tag-box">
                    <ul>
                        { recipe.tags ?
                            recipe.tags.map((tag) => (
                                <li key={ tag.id }>
                                    { tag.name }
                                </li>
                            )) : <li key="0">Add tags here.</li>
                        }
                    </ul>
                </div>
                <div className="line-br"></div>
                <div className="db-btns">
                    <button className="general">Save changes</button>
                    <button className="general">Delete recipe</button>
                </div>
                <img className="pie-logo" src={ Logo } alt="logo"/>
                <div className="line-br"></div>
            </div>
    );
}

export default Recipe;