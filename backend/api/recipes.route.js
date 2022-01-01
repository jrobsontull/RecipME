import express from "express"
import RecipesCtrl from "./recipes.controller.js" 

const router = express.Router()

router.route("/").get(RecipesCtrl.apiGetRecipes)
router.route("/tags").get(RecipesCtrl.apiGetRecipeTags)

router
    .route("/recipe")
    .post(RecipesCtrl.apiPostRecipe)
    .put(RecipesCtrl.apiEditRecipe)
    .delete(RecipesCtrl.apiDeleteRecipe)

export default router