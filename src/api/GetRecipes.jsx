import axios from './axios'
import Feed from '../components/Feed'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'
import { useEffect, useState } from 'react'

const GetRecipes = () => {
  const { auth } = useAuth()

  const token = auth?.access_token

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const getRecipes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/recipes?page=${currentPage}`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      const results = await response?.data
      setRecipes(results.recipes)
      setTotalPages(results.total_pages)
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (loading) return <Loader />

  return (
    <>
      <Feed
        recipes={recipes}
        pages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default GetRecipes  