import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ImSpinner3 } from "react-icons/im"
import { Link } from "react-router-dom"

import cake from '../assets/cake.jpg'

import axios from "../api/axios"
const RECIPE_URL = '/recipes'

const Recipe = () => { 
  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(true)
  const [ingridients, setIngridients] = useState([])

  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)

  const getRecipe = async () => {
    try {
      const response = await axios.get(`${RECIPE_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`}})
      const data = response?.data
      setOwner(data.owner)
      setRecipe(data.recipe)
      setIngridients(data.recipe.ingridients)
      setLoading(false)
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getRecipe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(recipe)
  // console.log(ingridients)

  useEffect(() => {
    loading ?  document.title = 'loading...' : document.title = recipe.name
  })


  let content
  if(loading) content = <div className="flex justify-center mt-[50%] lg:mt-[15%]"><ImSpinner3 className="animate-spin text-[80px] text-blue-400" /></div>
  else content = <>
    <div className="max-w-full px-[8%] flex flex-col gap-y-3">
      <h1 className="mt-5">{recipe.name} by <span><Link to={`${'/user/'}${user._id}`}>{owner}</Link></span></h1>
      <img src={cake} alt="a beautiful delicious chockolate cake" className="w-[300px] h-[250px] shadow-lg rounded-md" />
      <p className="text-gray-700">Cooking time: {recipe.time}min.</p>
      <div>
        <h1 className="capitalize text-lg font-medium text-gray-900 underline">ingridients</h1>
        {ingridients.map((ingridient, index) =>
        {
          return (
            <ul key={index} className='pl-1'>
              <li className="text-gray-700 before:content-['•']">{ingridient}</li>
            </ul>
          )
        })}
      </div>
      <div>
        <h1 className="capitalize text-lg font-medium text-gray-900 underline">procedure</h1>
        <p className="max-w-[400px] before:content-['•'] text-gray-700">{recipe.procedure}</p>
      </div>
    </div>
  </>

  
  return content
}

export default Recipe