import { useState, useEffect } from 'react'
import Recipes from '../ui/Recipes'
import { useSelector } from 'react-redux'
import Loader from '../ui/Loader'

import axios from '../api/axios'
const BOOKMARKS_URL = '/bookmarks'

const Bookmarks = () => {
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState([])

  const userId = useSelector(state => state.user_id)
  const token = useSelector(state => state.access_token)


  const getBookmarks = async () => {
    try {
      const results = await axios.get(`${BOOKMARKS_URL}/${userId}`, { headers: { 'Authorization' : `Bearer ${token}`}})
      console.log(results.data)
      setSaved(results?.data)
      setLoading(false)
    } catch (error) {
      console.error(`AN ERROR OCCURED: ${error.message}`)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content
  if(loading) content = <Loader />
  else content = <>
    <div className="max-w-full px-[4%]">
      <h1 className='capitalize text-gray-600 text-xl md:text-2xl pt-4 font-semibold text-start'>your saved recipes</h1>
      <Recipes recipes={saved} />
    </div>
  </>

  return content
}

export default Bookmarks