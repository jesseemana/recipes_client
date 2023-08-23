import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Content from '../components/Content'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loaders/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
// import axios from '../api/axios'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from 'axios'

const Bookmarks = () => {
  const { auth } = useAuth()

  useDocumentTitle('Bookmarks')

  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])

  // const axiosPrivate = useAxiosPrivate()

  // const userId = auth?.user._id
  // const token = auth?.access_token

  useEffect(() => {
    // const isMounted = true
    // const controller = new AbortController()

    const getBookmarks = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3030/recipes')
        const results = await response?.data
        if (results)
          setBookmarks(results)
        // const results = await axios.get(`/bookmarks/${userId}`, { 
        //   headers: { 'Authorization' : `Bearer ${token}`},
        //   signal: controller.signal()
        // })
        // console.log(results.data)
        // isMounted && setBookmarks(results?.data)
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

    // return () => {
    //   isMounted = false
    //   controller.abort()
    // }
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