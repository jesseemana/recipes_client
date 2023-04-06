import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Recipes from '../pages/Recipes'

import axios from './axios';
import Loader from '../components/Loader/Loader';


const GetRecipes = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.access_token)

  const [recipes, setRecipes] = useState([]) 
  const [loading, setLoading] = useState(true)

  const getRecipes = async () => {
    try {
      const response = await axios.get('/recipes', {headers: {Authorization: `Bearer ${token}`}})
      const results = await response?.data
      console.log(results)
      setRecipes(results)
      setLoading(false)
    } catch (error) {
      console.log(`An error occured ${error}`)
    }
  }
  
  
  useEffect(() => {
    getRecipes()
  }, []) // eslint-disable-line react-hooks/exhaustive-
  

  if(loading) return <div className='max-w-full px-[8%] border flex justify-center items-center h-[90vh]'><Loader /></div>
  return <Recipes recipes={recipes} />
}

export default GetRecipes