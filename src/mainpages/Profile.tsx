import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Header from '@/components/Inputs/Header'
import Loader from '@/components/Loaders/Loader'
import RecipeCard from '@/components/RecipeCard'
import EmptyState from '@/components/EmptyState'
import Content from '@/components/Wrappers/Content'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import PageLayout from '@/components/Wrappers/PageLayout'
// import axios from '@/api/axios'
import axios from 'axios'

const Profile = () => {
  useDocumentTitle('My Profile')

  const { id } = useParams()
  const { auth } = useAuth()

  const [recipes, setRecipes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

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
  
  const onDelete = async (id: string | number) => {
    try {
      await axios.delete(`/recipes/${id}`)
      toast.success('Deleted')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.error(errorMessage)
      toast.error('Failed to delete')
    }
  }

  let content: React.ReactElement 

  if (loading) {
    content = (
      <div className='h-[100vh] grid place-items-center'>
        <Loader />
      </div>
    )
  }

  else if (recipes.length === 0) {
    content = (
      <EmptyState 
        getStarted
        title='No recipes' 
        subtitle={`You haven't added any recipes yet.`} 
      />
    )
  }
  
  else content = (
    <Content>
      <Header
        title='my recipes'
        subtitle='Recipes you created'
      />
      <PageLayout>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            data={recipe}
            key={recipe.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            actionId={recipe.id}
            primaryAction={onDelete}
            primaryActionLabel='Delete'
          />
        ))}
      </PageLayout>
    </Content>
  )

  return content
}

export default Profile 