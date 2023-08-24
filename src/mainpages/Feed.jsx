import RecipeCard from '../components/RecipeCard'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Pagination from '../components/Buttons/Pagination'
import PageLayout from '../components/Wrappers/PageLayout'
import Loader from '../components/Loaders/Loader'
import SkeletonCard from '../components/Loaders/Skeleton/SkeletonCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = ({user, pages, currentPage, setCurrentPage}) => {
  useDocumentTitle('Feed')

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3030/recipes')
        if (response.data)
          setRecipes(response.data)
      } catch (error) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(errorMessage)
      }  finally {
        setLoading(false)
      }
    }

    // fetchRecipes()
  }, [])

  // if (loading) {
  //   return [...Array(10).keys()].map(i => (
  //     <SkeletonCard key={i} />
  //   ))
  // }

  if (loading) return <Loader />

  return (
    <PageLayout>
      {recipes.map(recipe => (
        <RecipeCard
          user={user}
          data={recipe}
          key={recipe.id}
        />
      ))}
      {recipes?.length > 16 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PageLayout>
  )
}

export default Feed 