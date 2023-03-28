import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080'
});


const recipesAPI = axios.create({
    baseURL: 'http://localhost:8080'
});

export const RECIPE_URL = '/recipes'


export const addRecipe = async ({ userId, title, completed }) => {
    const response = await recipesAPI.post(RECIPE_URL, { userId, title, completed })
    return response.data
}

export const updateRecipe = async ({id, name, ingridients, procedure, category, time}) => {
    const response = await recipesAPI.patch(RECIPE_URL, {id, name, ingridients, procedure, category, time})
    return response.data
}

export const deleteRecipe = async ({id}) => {
    return await todosApi.delete(`${RECIPE_URL}/${id}`, id)
}
