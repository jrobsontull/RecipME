import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesAPI from '../utils/recipes-api';
import AuthContext from '../utils/auth.context';

function Recipe() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [ recipe, setRecipe ] = useState({});

    useEffect(() => {
        RecipesAPI.getRecipe(params.id).then((response) => {
            setRecipe(response);
            console.log(response.ingredients)
        });
    }, [])

    return (
        <div className="react-container">
            <div className="recipe-title">
                <h3>{ recipe.name }</h3>
            </div>
            <div className="line-br"></div>
            <button>Serves { recipe.serves }</button>
            <div className="cook-time">{ recipe.cook_time } mins</div>
            
            
            <div className="list-box">
                <ul>
                    { recipe.ingredients ?
                        recipe.ingredients.map((ingredient, index) => (
                            <li key={ index }>
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                            </li>
                        )) : <li>No ingredients yet!</li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Recipe;