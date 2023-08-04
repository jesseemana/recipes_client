import { useState, useEffect } from 'react'
import RecipesCard from './ui/RecipesListing'
import { useSelector } from 'react-redux'
import Loader from './ui/Loader'
import axios from '../api/axios'

const BOOKMARKS_URL = '/bookmarks'

const Bookmarks = () => {
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])

  const userId = useSelector(state => state.user_id)
  const token = useSelector(state => state.access_token)

  const getBookmarks = async () => {
    try {
      setLoading(true)
      const results = await axios.get(`${BOOKMARKS_URL}/${userId}`, { headers: { 'Authorization' : `Bearer ${token}`}})
      console.log(results.data)
      setBookmarks(results?.data)
    } catch (error) {
      console.error(`AN ERROR OCCURED: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content

  if (loading) {
    content = <Loader />
  }

  content = (
    <div className='max-w-full px-[4%]'>
      <h1 className=''>bookmarks</h1>
      <h1 className='capitalize text-gray-600 text-xl md:text-2xl pt-4 font-semibold text-start'>your saved recipes</h1>
      <RecipesCard recipes={bookmarks} />
    </div>
  )

  return content
}

export default Bookmarks