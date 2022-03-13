import http from './http-common';

export default class RecipesAPI {
  static async getUserRecipes(user, urlParams = null) {
    const url =
      'api/v1/recipes?user_id=' + user._id + '&' + urlParams ||
      'api/v1/recipes?user_id=' + user._id;
    console.log(url);
    const response = await getRequest(url);
    if (response) {
      const recipes = response.data;
      return recipes;
    }
  }

  static async getFavourites(user) {
    const response = await getRequest(
      'api/v1/recipes?favourite=true&user_id=' + user._id
    );
    if (response) {
      const favourites = response.data.recipes;
      return favourites;
    }
  }

  static async getRecipe(id) {
    const response = await getRequest('api/v1/recipes/recipe/id/' + id);
    if (response) {
      const recipe = response.data.recipe;
      return recipe;
    }
  }

  static async editRecipe(recipe) {
    const response = await putRequest(recipe, 'api/v1/recipes/recipe/');
    if (response) {
      return response;
    }
  }

  static async newRecipe(recipe) {
    const response = await postRequest(recipe, 'api/v1/recipes/recipe/');
    if (response) {
      return response;
    }
  }

  static async deleteRecipe(id, user) {
    const body = {
      recipe_id: id,
      user_id: user,
    };
    const response = await deleteRequest(body, 'api/v1/recipes/recipe/');
    if (response) {
      return response;
    }
  }

  static async getDistinctTags(id) {
    const user_id = id;
    const response = await getRequest('api/v1/recipes/tags?user_id=' + user_id);
    if (response) {
      return response.data;
    }
  }
}

async function postRequest(body, url) {
  try {
    const payload = body;
    const response = await http.post(url, payload);

    if (response.status === 200) {
      //console.log('Posted: ' + body + ' to ' + url + ' and got good response.');
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}

async function putRequest(body, url) {
  try {
    const payload = body;
    const response = await http.put(url, payload);

    if (response.status === 200) {
      //console.log('Put: ' + body + ' to ' + url + ' and got good response.');
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}

async function getRequest(url) {
  try {
    const response = await http.get(url);

    if (response.status === 200) {
      //console.log('Get request to ' + url + ' successful.');
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}

async function deleteRequest(body, url) {
  try {
    const payload = body;
    const response = await http.delete(url, { data: payload });

    if (response.status === 200) {
      //console.log('Delete: ' + body + ' to ' + url + ' and got good response.');
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}
