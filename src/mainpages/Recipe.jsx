import axios from '../api/axios'
import Loading from '@/components/Loading'
import useAuth from '../hooks/useAuth'
import useBookmark from '../hooks/useBookmark'
import useDocumentTitle from '../hooks/useDocumentTitle'
import RecipeUI from '@/components/RecipeUI'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Recipe = () => {
  const { id } = useParams()
  const { auth } = useAuth()

  const token = auth.token

  const [owner, setOwner] = useState('')
  const [recipe, setRecipe] = useState({})
  const [pageName, setPageName] = useState('')
  const [loading, setLoading] = useState(false)

  useDocumentTitle(loading ? 'loading...' : pageName.toUpperCase())

  if (token) {
    var { bookmarked, toggleBookmark } = useBookmark({id, auth})
  }

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`recipes/${id}`)
        if (response.data)
          setRecipe(response.data.recipe)
          setOwner(response.data.owner)
          setPageName(response.data.recipe.name)
      } catch(error) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  console.log(bookmarked)

  let content

  if (loading) {
    content = (
      <Loading />
    )
  }

  else content = (
    <RecipeUI
      recipe={recipe}
      owner={owner}
      bookmarked={bookmarked}
      toggleBookmark={toggleBookmark}
    />
  )

  return content
}

export default Recipe  