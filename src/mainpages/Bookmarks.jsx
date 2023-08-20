import { useState, useEffect } from 'react'
import RecipesCard from '../components/RecipesListing'
import Loader from '../components/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Bookmarks = () => {
  const { auth } = useAuth()

  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])

  const axiosPrivate = useAxiosPrivate()

  console.log(auth)
  const userId = auth.user._id
  const token = auth.access_token

  useDocumentTitle('Bookmarks')

  useEffect(() => {
    // const isMounted = true
    // const controller = new AbortController()

    const getBookmarks = async () => {
      try {
        setLoading(true)
        const results = await axios.get(`/bookmarks/${userId}`, { 
          headers: { 'Authorization' : `Bearer ${token}`},
          signal: controller.signal()
        })
        console.log(results.data)
        isMounted && setBookmarks(results?.data)
      } catch (error) {
        console.error(`AN ERROR OCCURED: ${error.message}`)
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

  if (loading) {
    content = <Loader />
  }

  content = (
    <div className='max-w-full px-[4%]'>
      <h1 className=''>bookmarks</h1>
      <h2 className='capitalize text-gray-600 text-xl md:text-2xl pt-4 font-semibold text-start'>your saved recipes</h2>
      <RecipesCard recipes={bookmarks} />
    </div>
  )

  return content
}

export default Bookmarks