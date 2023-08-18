import { useMemo } from 'react'
import axios from '../api/axios'
import useAuth from './useAuth'

const useBookmark = (id) => {
  const { auth } = useAuth()

  const token = auth.token
  const userId = auth.user._id

  const bookmarked = useMemo(() => {
    return auth.user.Bookmarks.includes(id)
  }, [])

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await axios.delete(`/bookmarks/${id}/${userId}`, {
          headers: {'Authorization': `Bearer ${token}`}
        })
      } else {
        await axios.post(`/bookmarks/${id}/${userId}`, {
          headers: {'Authorization': `Bearer ${token}`}
        })
      }
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(error)
    }
  }

  return {
    bookmarked,
    handleBookmark
  }
}

export default useBookmark  