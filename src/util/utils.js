import axios from '../api/axios'

export default async function getRecipes(token) {
  try {
    const response = await axios.get(`/recipes?page=${currentPage}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data
    return results
  } catch (error) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error)
      errorMessage += error
    console.log(errorMessage)
  }
}

export default async function getBookmarks(token, userId) {
  try {
    const response = await axios.get(`/bookmarks/${userId}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data 
    return results
  } catch (error) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error)
      errorMessage += error
    console.log(errorMessage)
  }
}

export default async function myRecipes(id, token) {
  try {
    const response = await axios.get(`/profile/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data
    return results
  } catch (error) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error)
      errorMessage += error
    console.log(errorMessage)
  }
} 

export default async function userRecipes(id, token) {
  try {
    const response = await axios.get(`/recipes/user/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    const results = await response?.data
    return results
  } catch (error) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error)
      errorMessage += error
    console.log(errorMessage)
  }
}   