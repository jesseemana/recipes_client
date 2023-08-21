import RecipeCard from './RecipeCard'
import Pagination from './Pagination'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Feed = ({user, pages, currentPage, setCurrentPage}) => {
  const [recipes, setRecipes] = useState([])

  useDocumentTitle('Feed')

  useEffect(() => {
    async function fetchRecipes() {
      const response = await axios.get('http://localhost:3030/recipes')
      const results = await response.data
      setRecipes(results)
      console.log(results)
    }
    fetchRecipes()
  }, [])

  return (
    <div className='py-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
      {recipes.map(recipe => (
        <RecipeCard 
          data={recipe}
          user={user}
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
    </div>
  )
}

export default Feed 