import React, { useState } from "react";
import RecipesAPI from "../utils/recipes-api";
import AuthContext from "../utils/auth.context";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuid } from "uuid";

import Logo from "../assets/img/pie_logo_orange.svg";

function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState();

  return (
    <div className="react-container">
      
      <img className="pie-logo" src={Logo} alt="logo" />
      <div className="line-br"></div>
    </div>
  );
}

export default AddRecipe;