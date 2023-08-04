import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import RecipesCard from '../components/ui/RecipesListing'
import Loader from '../components/ui/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle';

const RECIPE_URL = '/recipes/user'

const UserRecipes = () =>{
  const {id} = useParams() // in next, user router from navigation/router to get userId

  const [owner, setOwner] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const token = useSelector(state => state.access_token)

  useDocumentTitle(loading ? 'Loading...': `${owner}'s Recipes`)

  const getUserRecipes = async () => {
    try {
      const response = await axios.get(`${RECIPE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}`}})
      const results = await response?.data
      setRecipes(results.recipes)
      setOwner(results.fullName)
    } catch (error) {
      console.log(`An error occured: ${error.message}`)
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
      <h1 className=''>recipes</h1>
      <p className='capitalize text-center pt-7'>more recipes by {owner}</p>
      <RecipesCard recipes={recipes} />
    </div>
  )
    
  return content
}

export default UserRecipes