import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

const useFetchRecipes = () => {
  const { auth } = useAuth()
  const user = auth?.user

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/recipes?page=${currentPage}`)
        if (response.data)
          setRecipes(response.data.recipes)
          setTotalPages(response.data.total_pages)
      } catch (error) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    getRecipes()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return { recipes, loading, totalPages, currentPage, setCurrentPage }
}

export default useFetchRecipes  