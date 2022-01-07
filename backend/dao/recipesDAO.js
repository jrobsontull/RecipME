import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let recipes

export default class RecipesDAO {
    static async injectRecipesDB(conn) {
        if (recipes) {
            return
        }
        try {
            recipes = await conn.db(process.env.RESTRECIPES_NS).collection("recipes")
        } catch(e) {
            console.error(
                'Unable to establish a connection handle in recipesDAO: ' + e,
            )
        }
    }

    static async getRecipes({
        filters = null,
        page = 0,
        recipesPerPage = 10,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                /* queries database to see if any of the text matches, this is set in mongodb atlas */
                query = { $text: { $search: filters["name"]} }
            } else if ("tags" in filters) {
                console.log("Search tags")
            }
        }

        let cursor

        try {
            cursor = await recipes
                .find(query)
        } catch (e) {
            console.log('Unable to issue find command, ' + e)
            return { recipesList: [], totalNumRecipes: 0}
        }

        const displayCursor = cursor.limit(recipesPerPage).skip(recipesPerPage * page)

        try {
            const recipesList = await displayCursor.toArray()
            const totalNumRecipes = await recipes.countDocuments(query)

            return { recipesList, totalNumRecipes }
        } catch (e) {
            console.log(
                'Unable to convert cursor to array or problem counting documents.\n' + e
            )
            return { recipesList: [], totalNumRecipes: 0}
        }
    }

    static async addRecipe(
        userId,
        date,
        name,
        serves,
        cookTime,
        ingredients,
        steps,
        photos,
        notes,
        tags) {
            try {
                /* ObjectID generated by default on POST */
                const recipeDoc = {
                    "user_id": userId,
                    "date_created": date,
                    "name": name,
                    "serves": serves,
                    "cook-time": cookTime,
                    "ingredients": ingredients,
                    "steps": steps,
                    "photos": photos,
                    "notes": notes,
                    "tags": tags
                }

                return await recipes.insertOne(recipeDoc)
            } catch (e) {
                console.log('Unable to post recipe: ' + e)
                return { error: e }
            }
        }

    static async editRecipe(
        /* need to check id later on */
        recipeId,
        userId,
        name,
        serves,
        cookTime,
        ingredients,
        steps,
        photos,
        notes,
        tags
    ) {
        try {
            const updateResponse = await recipes.updateOne(
                { "user_id": userId, "_id": ObjectId(recipeId) },
                { $set: {
                    "name": name,
                    "serves": serves,
                    "cook_time": cookTime,
                    "ingredients": ingredients,
                    "steps": steps,
                    "photos": photos,
                    "notes": notes,
                    "tags": tags
                }}
            )
            
            return updateResponse
        } catch (e) {
            console.log('Unable to update the recipe: ' + e)
            return { error: e }
        }
    }

    static async deleteRecipe(
        recipeId,
        userId
    ) {
        try {
            const deleteResponse = await recipes.deleteOne({
                "_id": ObjectId(recipeId),
                "user_id": userId
            })

            return deleteResponse
        } catch (e) {
            console.log('Unable to delete the recipe: ' + e)
            return { error: e }
        }
    }

    static async getTags() {
        let tags = []
        try {
            tags = await recipes.distinct("tags")
            return tags
        } catch (e) {
            console.log('Unable to get tags: ' + e)
            return tags
        }
    }
}