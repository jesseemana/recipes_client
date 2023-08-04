import axios from '../api/axios'

const BOOKMARKS_URL = '/bookmarks'
const RECIPE_URL = '/recipes/user'

const token = 'access token here'
const user = 'get user'
const userId = user.userId

export default async function getRecipes() {
  try {
    const response = await axios.get(`/recipes?page=${currentPage}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data
    return results
  } catch (error) {
    console.log(`AN ERROR OCCURED: ${error}`)
  }
}

export default async function getBookmarks() {
  try {
    const response = await axios.get(`${BOOKMARKS_URL}/${userId}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response.data 
    return results
  } catch (error) {
    console.log(`AN ERROR OCCURED: ${error}`)
  }
}

export default async function myRecipes() {
  try {
    const response = await axios.get('user_profile_url', {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response.data
    return results
  } catch (error) {
    console.log(`AN ERROR OCCURED: ${error}`)
  }
} 

export default async function userRecipes({id}) {
  try {
    const response = await axios.get(`${RECIPE_URL}/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data
    return results
  } catch (error) {
    console.log(`AN ERROR OCCURED: ${error}`)
  }
} 