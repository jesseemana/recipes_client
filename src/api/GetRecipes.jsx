import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Recipes from '../ui/Recipes'
import Loader from '../ui/Loader'

import axios from './axios'

const GetRecipes = () => {
  const [recipes, setRecipes] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null) 
  
  const token = useSelector(state => state.access_token)

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/recipes?page=${currentPage}`,
        { headers: { 'Authorization': `Bearer ${token}` }}
      )
      const results = await response?.data
      setLoading(false)
      setRecipes(results.data)
      setTotalPages(results.totalPages)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if(loading) return <Loader />
  return (
    <Recipes
      recipes={recipes}
      pages={totalPages}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default GetRecipes