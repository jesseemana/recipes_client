import { useEffect, useState } from 'react'
import axios from '@/api/axios'
import Feed from '@/mainpages/Feed'
import useAuth from '@/hooks/useAuth'
import SkeletonCard from '@/components/Loaders/SkeletonCard'
import PageLayout from '@/components/Wrappers/PageLayout'

const GetRecipes = () => {
  const { auth } = useAuth()

  const user = auth?.user

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
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
  
  let content
  
  let myArray = new Array(15).fill(0)

  if (loading) content = (
    <PageLayout>
      {myArray.map((item, index) => (
        <SkeletonCard key={index} />
      ))}
    </PageLayout>
  )

  else content = (
    <Feed
      user={user}
      recipes={recipes}
      pages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )

  return content
}

export default GetRecipes  