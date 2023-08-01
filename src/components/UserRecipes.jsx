import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import Recipes from '../ui/Recipes'
import Loader from '../ui/Loader'

const RECIPE_URL = '/recipes/user'

const UserRecipes = () =>{
  const {id} = useParams()

  const [owner, setOwner] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const token = useSelector(state => state.access_token)

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

  useEffect(() => {
    loading ? document.title = 'Loading...': document.title = `${owner}'s Recipes`
  })
  
  let content 

  if (loading) {
    content = (
      <div className='max-w-full px-[4%] border flex justify-center items-center h-[90vh]'>
        <Loader />
      </div>
    )
  }

  content = (
    <>
      <div className='max-w-full px-[4%]'>
        <div className='capitalize text-center pt-7'>more recipes by {owner}</div>
        <Recipes recipes={recipes} />
      </div>
    </>
  )
    
  return content
}

export default UserRecipes