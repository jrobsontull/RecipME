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
        });
    }, [])
    return (
        <p>Recipes Page</p>
    );
}

export default Recipe;