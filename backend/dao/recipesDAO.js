import mongodb from 'mongodb';
import { UUID } from 'bson';

const ObjectId = mongodb.ObjectId;

let recipes;

export default class RecipesDAO {
  static async injectRecipesDB(conn) {
    if (recipes) {
      return;
    }
    try {
      // Check if production environment
      let db_uri = process.env.RESTRECIPES_NS_DEV;
      if (process.env.NODE_ENV === 'production') {
        console.log('Enabling recipesDAO production mode.');
        db_uri = process.env.RESTRECIPES_NS_PRODUCTION;
      }

      recipes = await conn.db(db_uri).collection('recipes');
    } catch (e) {
      console.error(
        'Unable to establish a connection handle in recipesDAO: ' + e
      );
    }
  }

  static async getRecipes({
    filters = null,
    page = 0,
    recipesPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        /* queries database to see if any of the text matches, this is set in mongodb atlas */
        query = { $text: { $search: filters['name'] } };
      } else if ('tags' in filters) {
        console.log('Search for user-specific tags');
        if (filters['tags'][0].toLowerCase() === 'all') {
          // Get all recipe tags
          query = {};
        } else {
          // Get recipes by tag
          query = {
            'tags.name': { $eq: filters.tags[0] },
            user_id: filters['user_id'],
          };
        }
      } else if ('user_id' in filters) {
        if ('favourite' in filters) {
          console.log('Search for favourites');
          query = {
            user_id: filters['user_id'],
            favourite: filters['favourite'],
          };
        } else {
          console.log('Search by user_id');
          query = { user_id: filters['user_id'] };
        }
      }
    }
    console.log(query);
    let cursor;

    try {
      cursor = await recipes.find(query);
    } catch (e) {
      console.log('Unable to issue find command, ' + e);
      return { recipesList: [], totalNumRecipes: 0 };
    }

    const displayCursor = cursor
      .limit(recipesPerPage)
      .skip(recipesPerPage * page);

    try {
      const recipesList = await displayCursor.toArray();
      const totalNumRecipes = await recipes.countDocuments(query);

      return { recipesList, totalNumRecipes };
    } catch (e) {
      console.log(
        'Unable to convert cursor to array or problem counting documents.\n' + e
      );
      return { recipesList: [], totalNumRecipes: 0 };
    }
  }

  static async getRecipeByID(id) {
    try {
      const query = { _id: ObjectId(id) };
      let cursor;

      try {
        cursor = await recipes.find(query);
      } catch (e) {
        console.log('Unable to issue find command, ' + e.message);
        return { error: e };
      }

      const recipeList = await cursor.toArray();
      return { recipe: recipeList[0] };
    } catch (e) {
      console.log('Error getting recipe by ID: ' + e.message);
      return { error: e };
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
    tags,
    favourite
  ) {
    try {
      /* Generate unique ID for all arrays */
      const UUIDIngredients = generateUUIDArray(ingredients);
      const UUIDSteps = generateUUIDArray(steps);
      const UUIDphotos = generateUUIDArray(photos);
      const UUIDtags = generateUUIDArray(tags);

      /* ObjectID generated by default on POST */
      const recipeDoc = {
        user_id: userId,
        date_created: date,
        name: name,
        serves: serves,
        cook_time: cookTime,
        ingredients: UUIDIngredients,
        steps: UUIDSteps,
        photos: UUIDphotos,
        notes: notes,
        tags: UUIDtags,
        favourite: favourite,
      };

      return await recipes.insertOne(recipeDoc);
    } catch (e) {
      console.log('Unable to post recipe: ' + e);
      return { error: e };
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
    tags,
    favourite
  ) {
    try {
      const updateResponse = await recipes.findOneAndUpdate(
        { user_id: userId, _id: ObjectId(recipeId) },
        {
          $set: {
            name: name,
            serves: serves,
            cook_time: cookTime,
            ingredients: ingredients,
            steps: steps,
            photos: photos,
            notes: notes,
            tags: tags,
            favourite: favourite,
          },
        },
        { returnNewDocument: true }
      );

      return updateResponse;
    } catch (e) {
      console.log('Unable to update the recipe: ' + e);
      return { error: e };
    }
  }

  static async deleteRecipe(recipeId, userId) {
    try {
      const deleteResponse = await recipes.deleteOne({
        _id: ObjectId(recipeId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.log('Unable to delete the recipe: ' + e);
      return { error: e };
    }
  }

  // Get distinct user tags and filter out null elements before return
  static async getTags(filters = null) {
    let query = {
      'tags.name': { $nin: ['', null] },
    };
    if (filters) {
      if ('user_id' in filters) {
        query.user_id = filters['user_id'];
      }
    }

    let tags = [];
    try {
      tags = await recipes.distinct('tags', query);
      return tags;
    } catch (e) {
      console.log('Unable to get tags: ' + e);
      return tags;
    }
  }
}

// Generate unique IDs for all elements of an array containing JSON objects
function generateUUIDArray(inArray) {
  const result = [];
  if (inArray) {
    inArray.forEach((element) => {
      const UUIDelem = element;
      UUIDelem['id'] = new UUID().toString();
      result.push(UUIDelem);
    });
    return result;
  } else {
    return null;
  }
}
