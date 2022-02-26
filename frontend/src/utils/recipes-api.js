import http from './http-common';

export default class RecipesAPI {
  static async getUserRecipes(user) {
    const response = await getRequest('?user_id=' + user._id);
    if (response) {
      const recipes = response.data.recipes;
      return recipes;
    }
  }

  static async getRecipe(id) {
    const response = await getRequest('recipe/id/' + id);
    if (response) {
      const recipe = response.data.recipe;
      return recipe;
    }
  }

  static async editRecipe(recipe) {
    const response = await putRequest(recipe, 'recipe/');
    if (response) {
      return response;
    }
  }
}

async function postRequest(body, url) {
  try {
    const payload = body;
    const response = await http.post(url, payload);

    if (response.status === 200) {
      console.log('Posted: ' + body + ' to ' + url + ' and got good response.');
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
      console.log('Put: ' + body + ' to ' + url + ' and got good response.');
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
      console.log('Get request to ' + url + ' successful.');
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}
