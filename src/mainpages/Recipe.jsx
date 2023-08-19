import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import axios from '../api/axios'
import Loader from '../components/ui/Loader'
import useAuth from '../hooks/useAuth'
import useBookmark from '../hooks/useBookmark'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Recipe = () => {
  const { id } = useParams()
  const { auth } = useAuth()
  
  const [owner, setOwner] = useState('')
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(false)

  const token = auth.token
  const userId = auth.user._id

  useDocumentTitle(loading ? 'loading...' : recipe.name)

  const { bookmarked, toggleBookmark } = useBookmark({id, auth})

  const getRecipe = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`recipes/${id}/${userId}`, { 
        headers: {'Authorization': `Bearer ${token}`}
      })
      const results = await response?.data
      setRecipe(results.recipe)
      setOwner(results.full_name)
    } catch(error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let content

  if (loading) {
    content = (
      <Loader />
    )
  }

  content = (
    <div className='max-w-full px-[8%] flex flex-col justify-center gap-y-5 gap-x-20 md:flex-row py-4'>
      <div className='flex flex-col gap-y-4'>
        <img 
          src={recipe.picture_path} 
          alt={recipe.name}
          className='w-[300px] h-[250px] lg:h-[390px] lg:w-[500px] shadow-lg rounded-md'
        />
        <h1 className='capitalize font-semibold text-xl'>{recipe.name}</h1>
        <div className='flex gap-x-5'>
          <p className='flex items-center gap-x-2 text-gray-700'>
            <span><BsClock  className="text-xl text-[#38D6C4]"/></span>
            {recipe.time}min
          </p>
          {!token ? 
            <div className='flex items-center gap-x-2 text-gray-700'>
              <span><BsBookmark className="text-xl text-[#38D6C4]" /></span>
              login to save
            </div> : 
            <>
              {!bookmarked ? 
                <button
                  onClick={toggleBookmark}
                  className='flex items-center gap-x-2 text-gray-700'
                >
                  <span><BsBookmark className="text-xl text-[#38D6C4]" /></span>
                  save recipe
                </button> : 
                <button
                  onClick={toggleBookmark}
                  className='flex items-center gap-x-2 text-gray-700'
                >
                  <span><BsBookmarkFill className='text-xl text-[#38D6C4]' /></span>
                  saved
                </button>
              }
            </>
          }
        </div>
        <Link 
          to={`${'/user/'}${recipe.user}`} 
          className='text-md font-extralight w-[190px] text-gray-500'
        >
          view more by <span className='text-[#38D6C4] font-normal underline'>{owner}</span>
        </Link>
        <div className='border border-l-0 border-r-0 border-b-0 pt-3 '>
          <h1 className='uppercase text-lg font-medium text-gray-900'>ingridients</h1>
          <p className='max-w-[400px] text-gray-600'>{recipe.ingridients}</p>
        </div>
      </div>
      <div>
        <h1 className='uppercase text-lg font-medium text-gray-900 border py-3 border-l-0 border-r-0'>procedure</h1>
        <p className='max-w-[400px] text-gray-600'>{recipe.procedure}</p>
      </div>
    </div>
  )

  return content
}

export default Recipe  