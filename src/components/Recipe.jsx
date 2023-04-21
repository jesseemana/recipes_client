import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { BsClock } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loader from './Loader'

import cake from '../assets/cake.jpg'

import axios from '../api/axios'
const RECIPE_URL = '/recipes'
const BOOKMARK_URL = '/recipes/bookmark'

const Recipe = () => { 
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(true)
  const [bookmark, setBookmark] = useState(false)

  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.access_token)

  console.log(token)
  console.log(user._id)

  const getRecipe = async () => {
    try {
      const response = await axios.get(`${RECIPE_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = response?.data
      setOwner(data.owner)
      setRecipe(data.recipe)
      setLoading(false)
    } catch(error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  const addBookamrk = async () => {
    try {
      const response = await axios.post(`${BOOKMARK_URL}/${id}/${user._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const results = response?.data
      console.log(results)
      setBookmark(true)
      setLoading(false)
    } catch(error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  const removeBookamrk = async () => {
    try {
      const response = await axios.delete(`${BOOKMARK_URL}/${id}/${user._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const results = response?.data
      console.log(results)
      setBookmark(false)
      setLoading(false)
    } catch(error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }


  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  // function saveRecipe() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('Recipe saved')
  //     }, 1000 )
  //   })
  // }

  
  function toggleBookmark() {
    if(!bookmark) {
      setBookmark(true)
      toast.promise(addBookamrk(), {
        loading: 'saving...',
        success: 'Recipe saved',
        error: `couldn't save recipe` 
      })
    } else {
      setBookmark(false);
      toast.promise(removeBookamrk(), {
        loading: 'removing...',
        success: 'Recipe removed',
        error: `couldn't remove recipe`
      })
    }
  }

  
  useEffect(() => {
    loading ?  document.title = 'loading...' : document.title = recipe.name
  })


  let content
  if(loading) content = <Loader />
  else content = <>
    <div className="max-w-full px-[8%] flex flex-col justify-center gap-y-5 gap-x-20 md:flex-row py-4 ">
      {/* <button onCklick={() => navigate(-1)}>back</button> */}
      <div className="flex flex-col gap-y-3">
        <img src={cake} alt="a beautiful delicious chockolate cake" className="w-[300px] h-[250px] shadow-lg rounded-md" />
        <h1 className='capitalize font-semibold text-xl'>{recipe.name}</h1>
        <div className='flex gap-x-5'>
          <p className="flex items-center gap-x-2 text-gray-700"><span><BsClock  className="text-xl text-[#38D6C4]"/></span>{recipe.time}min</p>
          {!bookmark ? <button
            onClick={toggleBookmark}
            className="flex items-center gap-x-2 text-gray-700"
          >
            <span><BsBookmark className="text-xl text-[#38D6C4]" /></span>
            save recipe
          </button> : <button
            onClick={toggleBookmark}
            className="flex items-center gap-x-2 text-gray-700"
          >
            <span><BsBookmarkFill className="text-xl text-[#38D6C4]" /></span>
            saved
          </button>}
        </div>
        <Link to={`${'/user/'}${recipe.user}`} className='text-md font-extralight w-[190px] text-gray-500'>view more by {owner}</Link>
        <div>
          <h1 className="uppercase text-lg font-medium text-gray-900 ">ingridients</h1>
          <p className="max-w-[400px] text-gray-600">{recipe.ingridients}</p>
        </div>
      </div>
      <div>
        <div>
          <h1 className="uppercase text-lg font-medium text-gray-900 ">procedure</h1>
          <p className="max-w-[400px] text-gray-600">{recipe.procedure}</p>
        </div>
      </div>
    </div>
  </>

  return content
}

export default Recipe