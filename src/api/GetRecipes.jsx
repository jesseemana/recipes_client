import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Recipes from '../components/Recipes'
import Loader from '../components/Loader'

import axios from './axios'

const GetRecipes = () => {
  const [recipes, setRecipes] = useState([]) 
  const [loading, setLoading] = useState(true) 
  
  const token = useSelector(state => state.access_token)

  const getRecipes = async () => {
    try {
      const response = await axios.get('/recipes', {headers: {Authorization: `Bearer ${token}`}})
      const results = await response?.data
      setRecipes(results)
      setLoading(false)
    } catch (error) {
      console.log(`An error occured ${error}`)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  if(loading) return <Loader />
  return <Recipes recipes={recipes} />
}

export default GetRecipes