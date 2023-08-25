import axios from '../api/axios'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'

const useBookmark = ({id, auth}: UseBookmarkProps) => {
  const userId = auth?.user._id
  const token = auth?.access_token

  const bookmarked = useMemo(() => {
    return auth?.user.bookmarks.includes(id)
  }, [id, auth])

  const toggleBookmark = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    try {
      if (bookmarked) {
        await axios.delete(`/bookmarks/${id}/${userId}`, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        toast.success('Bookmark removed')
      } else {
        await axios.post(`/bookmarks/${id}/${userId}`, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        toast.success('Bookmarked')
      }
      // refresh page here
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(error)
      toast.error('Failed' )
    }
  }

  return {
    bookmarked,
    toggleBookmark
  }
}

export default useBookmark  