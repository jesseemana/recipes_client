import { useState, useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import Header from '@/components/Inputs/Header'
import Loader from '@/components/Loaders/Loader'
import RecipeCard from '@/components/RecipeCard'
import EmptyState from '@/components/EmptyState'
import Content from '@/components/Wrappers/Content'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import PageLayout from '@/components/Wrappers/PageLayout'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from '../api/axios'


const Bookmarks = () => {
  const { auth } = useAuth()

  useDocumentTitle('Bookmarks')

  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState([])

  const userId = auth?.user._id
  const token = auth?.access_token
  // const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    // const isMounted = true
    // const controller = new AbortController()
    const getBookmarks = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/bookmarks/${userId}`, { 
          headers: { 'Authorization' : `Bearer ${token}`},
          // signal: controller.signal()
        })
        console.log(response.data.bookmarks)
        if (response?.data)
          setBookmarks(response.data.bookmarks)
          // isMounted && setBookmarks(response.data.bookmarks)
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
    // return function() {
    //   isMounted = false
    //   controller.abort()
    // }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content

  if (loading) {
    content = (
      <div className='h-[100vh] grid place-items-center'>
        <Loader />
      </div>
    )
  }

  else if (bookmarks.length === 0) {
    content = (
      <EmptyState 
        title='No bookmarks' 
        subtitle={`You don't have any recipes bookmarked.`} 
      />
    )
  }

  else content = (
    <Content>
      <Header
        title='my bookmarks'
        subtitle='Recipes that you saved'
      />
      <PageLayout>
        {bookmarks.map(bookmark => (
          <RecipeCard
            data={bookmark}
            key={bookmark.id}
          />
        ))}
      </PageLayout>
    </Content>
  )

  return content
}

export default Bookmarks  