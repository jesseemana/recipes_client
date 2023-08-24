import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Content from '../components/Wrappers/Content'
import Header from '../components/Inputs/Header'
import RecipeCard from '../components/RecipeCard'
import PageLayout from '../components/Wrappers/PageLayout'
import useDocumentTitle from '../hooks/useDocumentTitle'
// import axios from '../api/axios'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()
  const { auth } = useAuth()

  useDocumentTitle('My Profile')

  const [recipes, setRecipes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:3030/recipes/`)
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
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
      toast.error('Failed to delete')
    }
  }
  
  return (
    <Content>
      <Header 
        title='my recipes' 
        subtitle='Recipes you created'
      />
      <PageLayout>
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
      </PageLayout>
    </Content>
  )
}

export default Profile 