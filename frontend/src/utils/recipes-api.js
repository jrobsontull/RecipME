import axios from "axios";

export default class RecipesAPI {
    static async getUserRecipes(user) {
        const url = 'http://localhost:5000/api/v1/recipes?user_id=' + user._id;
        const response = await getRequest(url);
        const recipes = response.data.recipes;
        return recipes;
    }
}

async function postRequest(body, url) {
    try {
        const header = {
            headers: {
                "Content-type": "application/json",
            }
        };

        const payload = body;

        const response = await axios.post(url, payload, header);

        if (response.status === 200) {
            console.log('Posted: ' + body + ' to ' + url + ' and got good response.');
            return response;
        } else {
            return null;
        }
    } catch (e) {
        console.log('Error: ' + e);
        return null;
    }
}

async function getRequest(url) {
    try {
        const header = {
            headers: {
                "Content-type": "application/json",
            }
        };

        const response = await axios.get(url);
        
        if (response.status === 200) {
            console.log('Get request to ' + url + " successful.");
            return response;
        } else {
            return null;
        }

    } catch (e) {
        console.log('Error: ' + e);
        return null;
    }
}