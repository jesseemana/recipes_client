import { useState } from 'react'
import Recipes from '../ui/Recipes'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Loader from '../ui/Loader'

const BOOKMARKS_URL = '/bookmarks'

const Bookmarks = () => {
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([])

  const token = useSelector(state => state.access_token )

  const getBookmarks = async () => {
    try {
      setLoading(true)
      const results = await axios.get(BOOKMARKS_URL, { headers: { 'Authorization' : `Bearer ${token}`}})
      setBookmarks(results?.data.bookmarks)
      setLoading(false)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content
  if(loading) content = <Loader />
  else content = <>
    <div className="max-w-full px-[4%]">
      <h1 className='capitalize text-gray-600 text-2xl pt-4 font-semibold text-center'>your saved recipes</h1>
      <Recipes recipes={bookmarks} />
    </div>
  </>
  
  return content
}

export default Bookmarks