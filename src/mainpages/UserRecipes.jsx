import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import Header from '../components/Inputs/Header'
import Content from '../components/Wrappers/Content'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loaders/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageLayout from '../components/Wrappers/PageLayout'

const UserRecipes = () =>{
  const { id } = useParams() // in next, user router from navigation/router to get userId
  const { auth } = useAuth()

  const [owner, setOwner] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const token = auth?.access_token

  useDocumentTitle(loading ? 'Loading...': `${owner}'s Recipes`)

  useEffect(() => {
    const getUserRecipes = async () => {
      try {
        const response = await axios.get(`/recipes/user/${id}`, { 
          headers: { 'Authorization': `Bearer ${token}`}
        })
        if (response?.data)
          setRecipes(response.data.recipes)
          setOwner(response.data.full_name)
      } catch (error) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    getUserRecipes()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content 

  if (loading) {
    content = (
      <Loader />
    )
  }

  content = (
    <Content>
      <Header 
        title='more recipes' 
        subtitle={`View more recipes by ${'this user'}`}
      />
      <PageLayout>
        {recipes.map(recipe =>(
          <RecipeCard 
            data={recipe} 
            key={recipe.id} 
          />
        ))}
      </PageLayout>
    </Content>
  )
    
  return content
}

export default UserRecipes  