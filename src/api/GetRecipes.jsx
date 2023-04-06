import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import { setRecipes, setUsers } from '../state/appSlice'

import axios from './axios';


const GetRecipes = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.access_token)
   
  // const fetcher = (url, token) =>
  //   fetch(url, {headers: {'Authorization': `Bearer ${token}`}}).then(res => res.json());
    
  // const {isLoading, data, error} = useSWR('http://localhost:8080/recipes', (url) => fetcher(url, token))

  // if(isLoading) return <div>Loading...</div>
  // if(error) return <div>Couldn't get data, refresh page</div>
  // dispatch(setRecipes({recipes: data}))

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
  

  if(loading) return <div className='max-w-full px-[8%]'>Loading...</div>
  
  return <Recipes recipes={recipes} />
  
}

export default GetRecipes