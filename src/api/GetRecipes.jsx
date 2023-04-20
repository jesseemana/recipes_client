import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Recipes from '../components/Recipes'
import Loader from '../components/Loader'

import axios from './axios'

const GetRecipes = () => {
  const [recipes, setRecipes] = useState([]) 
  const [totalPages, setTotalPages] = useState(null) 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true) 
  
  const token = useSelector(state => state.access_token)

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/recipes?page=${currentPage}`, {headers: {Authorization: `Bearer ${token}`}})
      const results = await response?.data
      setRecipes(results.data)
      setTotalPages(results.totalPages)
      setLoading(false)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if(loading) return <Loader />
  return <Recipes recipes={recipes} pages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
}

export default GetRecipes