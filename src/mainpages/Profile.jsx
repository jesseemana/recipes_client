import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Content from '../components/Content'
import RecipeCard from '../components/RecipeCard'
import useDocumentTitle from '../hooks/useDocumentTitle'
// import axios from '../api/axios'
import axios from 'axios'

const Profile = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()

  useDocumentTitle('My Profile')

  const [recipes, setRecipes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3030/recipes')
        const results = await response?.data
        if (results)
          setRecipes(results)
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const onDelete = async (id) => {
    try {
      await axios.delete(`/recipes/${id}`)
      toast.success('Deleted')
    } catch (error) {
      toast.error('Failed to delete')
    }
  }
  
  return (
    <Content>
      <Header 
        title='my recipes' 
        subtitle='Recipes you created'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {recipes.map(recipe => (
          <RecipeCard
            data={recipe}
            key={recipe.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            actionId={recipe.id}
            primaryAction={onDelete}
            primaryActionLabel={'Delete'}
          />
        ))}
      </div>
    </Content>
  )
}

export default Profile 