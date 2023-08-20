import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import RecipesCard from '../components/RecipesListing'
import Loader from '../components/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useAuth from '../hooks/useAuth'

const RECIPE_URL = '/recipes/user'

const UserRecipes = () =>{
  const { id } = useParams() // in next, user router from navigation/router to get userId
  const { auth } = useAuth()

  const [owner, setOwner] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const token = auth.access_token

  useDocumentTitle(loading ? 'Loading...': `${owner}'s Recipes`)

  const getUserRecipes = async () => {
    try {
      const response = await axios.get(`${RECIPE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}`}})
      const results = await response?.data
      setRecipes(results.recipes)
      setOwner(results.full_name)
    } catch (error) {
      console.error(`An error occured: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserRecipes()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content 

  if (loading) {
    content = (
      <div className='max-w-full px-[4%] border flex justify-center items-center h-[90vh]'>
        <Loader />
      </div>
    )
  }

  else content = (
    <div className='max-w-full px-[4%]'>
      <h1 className=''>user recipes</h1>
      <p className='capitalize text-center pt-7'>more recipes by {owner}</p>
      <RecipesCard recipes={recipes} />
    </div>
  )
    
  return content
}

export default UserRecipes