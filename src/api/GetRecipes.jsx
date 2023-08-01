import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Recipes from '../ui/Recipes'
import Loader from '../ui/Loader'

import axios from './axios'

const GetRecipes = () => {
  const [recipes, setRecipes] = useState([]) 
  const [loading, setLoading] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null) 

  const [category, setCategory] = useState('all')
  const [snack, setSnack] = useState('snack/appetiser')
  const [breakfast, setBreakFast] = useState('breakfast')
  const [maincourse, setMainCourse] = useState('main course')
  
  const token = useSelector(state => state.access_token)

  const getRecipes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/recipes?page=${currentPage}`, { headers: { 'Authorization': `Bearer ${token}` }})
      const results = await response?.data
      setRecipes(results.data)
      setTotalPages(results.totalPages)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(category)
  
  if(loading) return <Loader />
  return (
    <>
      <div className='flex pt-4 gap-x-2'>
        <p className='font-normal text-gray-500 text-lg'>view by category</p>
        <select 
          name='' 
          onChange={(e)=> setCategory(e.target.value)} 
          className='border text-gray-500 rounded-sm outline-none'
        >
          <option value={breakfast}>breakfast</option>
          <option value={maincourse}>main course</option>
          <option value={snack}>snack/appetiser</option>
        </select>
      </div>
      <Recipes
        recipes={recipes}
        pages={totalPages}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default GetRecipes   