import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Inputs/Header'
import Content from '../components/Content'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loaders/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from '../api/axios'


const Bookmarks = () => {
  const { auth } = useAuth()

  useDocumentTitle('Bookmarks')

  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])

  const userId = auth?.user._id
  const token = auth?.access_token
  // const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const isMounted = true
    // const controller = new AbortController()

    const getBookmarks = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/bookmarks/${userId}`, { 
          headers: { 'Authorization' : `Bearer ${token}`},
          signal: controller.signal()
        })
        console.log(response.data.bookmarks)
        if (response?.data)
          isMounted && setBookmarks(response.data.bookmarks)
      } catch (error) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    getBookmarks()

    return function() {
      isMounted = false
    //   controller.abort()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content

  if (loading) content = <Loader />

  content = (
    <Content>
      <Header
        title='my bookmarks'
        subtitle='Recipes that you saved'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {bookmarks.map(bookmark => (
          <RecipeCard
            data={bookmark}
            key={bookmark.id}
          />
        ))}
      </div>
    </Content>
  )

  return content
}

export default Bookmarks  