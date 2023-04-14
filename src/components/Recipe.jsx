import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import cake from '../assets/cake.jpg'

import axios from '../api/axios'
const RECIPE_URL = '/recipes'

const Recipe = () => { 
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(true)

  const token = useSelector((state) => state.access_token)

  const getRecipe = async () => {
    try {
      const response = await axios.get(`${RECIPE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      const data = response?.data
      setOwner(data.owner)
      setRecipe(data.recipe)
      setLoading(false)
    } catch(error) {
      console.log(`An error occured: ${error}`)
    }
  }


  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    loading ?  document.title = 'loading...' : document.title = recipe.name
  })


  return (
    <>
      <div className="max-w-full px-[8%] flex flex-col justify-center gap-x-20 md:flex-row py-4 ">
        <div className="flex flex-col gap-y-3">
          <h1 className='capitalize'>{recipe.name}</h1>
          <img src={cake} alt="a beautiful delicious chockolate cake" className="w-[300px] h-[250px] shadow-lg rounded-md" />
          <p className="text-gray-700">Cooking time: {recipe.time}min.</p>
          <p>view more by <span><Link to={`${'/user/'}${recipe.user}`}>{owner}</Link></span></p>
          <div>
            <h1 className="uppercase text-lg font-medium text-gray-900 underline">ingridients</h1>
            <p className="max-w-[400px] text-gray-700">{recipe.ingridients}</p>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h1 className="uppercase text-lg font-medium text-gray-900 underline">procedure</h1>
            <p className="max-w-[400px] text-gray-700">{recipe.procedure}</p>
          </div>
        </div>
      </div>
    </>
  )

  
  // return content
}

export default Recipe