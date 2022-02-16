import express from "express";
import RecipesCtrl from "../controllers/recipes.controller.js";

const router = express.Router();

router.route('/').get(RecipesCtrl.apiGetRecipes);
router.route('/tags').get(RecipesCtrl.apiGetRecipeTags);

router.route('/recipe/id/:id').get(RecipesCtrl.apiGetRecipeByID);

router
    .route('/recipe')
    .post(RecipesCtrl.apiPostRecipe)
    .put(RecipesCtrl.apiEditRecipe)
    .delete(RecipesCtrl.apiDeleteRecipe);

export default router;