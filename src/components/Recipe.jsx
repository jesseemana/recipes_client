import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loader from '../ui/Loader'
import axios from '../api/axios'
import RecipeUI from '../ui/RecipeUI'

const RECIPE_URL = '/recipes'
const BOOKMARK_URL = '/recipes/bookmark'

const Recipe = () => { 
  const { id } = useParams()
  
  const [recipe, setRecipe] = useState({})
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const [bookmarked, setBookmarked] = useState(false)

  const userId = useSelector(state => state.user_id)
  const token = useSelector(state => state.access_token)

  const getRecipe = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${RECIPE_URL}/${id}/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const results = await response?.data
      setLoading(false)
      setRecipe(results.recipe)
      setOwner(results.fullName)
      setBookmarks(results.bookmarks)
    } catch(error) {
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const addBookamrk = async () => {
    try {
      const response = await axios.post(`${BOOKMARK_URL}/${id}/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const results = await response?.data
      setBookmarked(true)
      setBookmarks(results.bookmarks)
    } catch(error) {
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }

  const removeBookamrk = async () => {
    try {
      const response = await axios.delete(`${BOOKMARK_URL}/${id}/${userId}`, { 
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const results = await response?.data
      setBookmarked(false)
      setBookmarks(results.bookmarks)
    } catch(error) {
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }

  
  // MANTAINING STATE OF BOOKMARK ICON 
  useEffect(() => {
    function hasMatchingId(bookmarks, id) {
      if (bookmarks.some(bookmark => bookmark._id  === id)) {
        setBookmarked(true)
      } else {
        setBookmarked(false)
      }
    }

    hasMatchingId(bookmarks, id)
  }) 

  const toggleBookmark = () => {
    if(bookmarked) {
      toast.promise(removeBookamrk(), {
        loading: 'removing...',
        success: 'Recipe removed',
        error: `couldn't remove recipe` 
      })
    } else {
      toast.promise(addBookamrk(), {
        loading: 'saving...',
        success: 'Recipe added',
        error: `couldn't save recipe`
      })
    } 
  }

  useEffect(() => {
    loading ?  document.title = 'loading...' : document.title = recipe.name
  })

  let content
  if(loading) content = <Loader />
  else content = (
    <RecipeUI 
      token={token} 
      owner={owner} 
      recipe={recipe} 
      bookmarks={bookmarks} 
      bookmarked={bookmarked} 
      toggleBookmark={toggleBookmark} 
    />
  )

  return content
}

export default Recipe     