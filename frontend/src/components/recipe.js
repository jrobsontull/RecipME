import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';

import Logo from '../assets/img/pie_logo_orange.svg';
import Edit from '../assets/img/edit_icon.svg';

function Recipe() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [ recipe, setRecipe ] = useState({});

    useEffect(() => {
        RecipesAPI.getRecipe(params.id).then((response) => {
            setRecipe(response);
        });
    }, [])

    return (
        <div className="react-container">
            <div className="recipe-title">
                <div className="name">
                    <Link to={"/my-recipes"}>
                        <div className="arrow left"/>
                    </Link>
                    <h3>{ recipe.name }</h3>
                </div>
                <div className="recipe-edit">
                    <img src={ Edit } alt="edit-btn"></img>
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
            
            <div className="my-recipes-list-title">
                <p className="list-box-info">Ingredients:</p>
            </div>
            <div className="list-box">
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

            <div className="my-recipes-list-title">
                <p className="list-box-info">Method:</p>
            </div>
            <div className="list-box">
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

            <div className="my-recipes-list-title">
                <p className="list-box-info">Photos:</p>
            </div>
            <div className="list-box">
                <ul>
                    <li key="0">Photo 1</li>
                </ul>
            </div>

            <div className="my-recipes-list-title">
                <p className="list-box-info">Notes:</p>
            </div>
            <div className="list-box">
                <p>{ recipe.notes ? recipe.notes : "Write any notes here." }</p>
            </div>

            <div className="my-recipes-list-title">
                <p className="list-box-info">Tags:</p>
            </div>
            <div className="list-box">
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
    );
}

export default Recipe;