import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Recipes from '../pages/Recipes'

import axios from './axios'


const GetRecipes = () => {
  const [recipes, setRecipes] = useState([]) 
  
  const token = useSelector(state => state.access_token)

  const getRecipes = async () => {
    try {
      const response = await axios.get('/recipes', {headers: {Authorization: `Bearer ${token}`}})
      const results = await response?.data
      setRecipes(results);
      console.log(results)
    } catch (error) {
      console.log(`An error occured ${error}`)
    }
  }
  
  
  useEffect(() => {
    getRecipes()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  

  return <Recipes recipes={recipes} />
}

export default GetRecipes