import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ImSpinner8 } from "react-icons/im"
import { Link } from "react-router-dom"

import cake from '../assets/cake.jpg'

import axios from "../api/axios"
import Loader from "./Loader/Loader";
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
      console.log(`An error occured ${error}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    loading ?  document.title = 'loading...' : document.title = recipe.name
  })


  let content
  if(loading) content = <div className='max-w-full px-[8%] border flex justify-center items-center h-[90vh]'><Loader /></div>
  else content = <>
    <div className="max-w-full px-[8%] flex flex-col justify-center gap-x-20 md:flex-row py-4 ">
      <div className="flex flex-col gap-y-3">
        <h1>{recipe.name} by <span><Link to={`${'/user/'}${recipe.user}`}>{owner}</Link></span></h1>
        <img src={cake} alt="a beautiful delicious chockolate cake" className="w-[300px] h-[250px] shadow-lg rounded-md" />
        <p className="text-gray-700">Cooking time: {recipe.time}min.</p>
        <div>
          <h1 className="capitalize text-lg font-medium text-gray-900 underline">ingridients</h1>
          <p className="max-w-[400px] before:content-['•'] text-gray-700">{recipe.ingridients}</p>
        </div>
      </div>
      <div className="mt-8">
        <div>
          <h1 className="capitalize text-lg font-medium text-gray-900 underline">procedure</h1>
          <p className="max-w-[400px] before:content-['•'] text-gray-700">{recipe.procedure}</p>
        </div>
      </div>
    </div>
  </>

  
  return content
}

export default Recipe