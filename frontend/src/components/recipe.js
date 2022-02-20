import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';
import TextareaAutosize from 'react-textarea-autosize';

import Logo from '../assets/img/pie_logo_orange.svg';
import Edit from '../assets/img/edit_icon.svg';

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

    function updateRecipeObjIngred(parent, key) {
        const children = parent.children;
        const ingredient = {
            "quantity": children[0].value,
            "unit": children[1].value,
            "name": children[2].value
        }
        const updatedIngredients = recipe.ingredients;
        updatedIngredients[key] = ingredient;
        setRecipe(prevRecipe => (
            {...prevRecipe, "ingredients": updatedIngredients}
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
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={ index }>
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
                            {recipe.steps.map((step, index) => (
                                <li key={ index }>
                                    { step }
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
                        <li key="0">Photo 1</li>
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
                                    { tag }
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
        <form>
            <div className="react-container">   
                <div className="recipe-title">
                    <div className="name">
                        <TextareaAutosize name="name" defaultValue={ recipe.name } onChange={(e) => updateRecipeObj(e.target, 'name')}></TextareaAutosize>
                    </div>
                    <div className="recipe-edit">
                        <img src={ Edit } alt="edit-btn" onClick={(e) => editRecipe(e)}></img>
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
                <div className="list-box recipe">
                    <ul>
                        { recipe.ingredients ?
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={ index }>
                                    <input defaultValue={ ingredient.quantity } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, index);
                                        }
                                    }/>
                                    <input defaultValue={ ingredient.unit } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, index);
                                        }
                                    }/>
                                    <input defaultValue={ ingredient.name } onChange={ (e) => {
                                            updateRecipeObjIngred(e.currentTarget.parentElement, index);
                                        }
                                    }/>
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
                            {recipe.steps.map((step, index) => (
                                <li key={ index }>
                                    { step }
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
                        <li key="0">Photo 1</li>
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
                                    { tag }
                                </li>
                            )) : <li key="0">Add tags here.</li>
                        }
                    </ul>
                </div>
                <img className="pie-logo" src={ Logo } alt="logo"/>
                <div className="line-br"></div>
            </div>
        </form>
    );
}

export default Recipe;