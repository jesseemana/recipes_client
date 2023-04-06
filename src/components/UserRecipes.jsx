import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import Recipes from '../pages/Recipes'
import Loader from './Loader/Loader'

const RECIPE_URL = '/recipes/user'

const UserRecipes = () =>{
    const {id} = useParams()
    const [recipes, setRecipes] = useState([])
    const [owner, setOwner] = useState('')
    const [loading, setLoading] = useState(true)

    const token = useSelector(state => state.access_token)

    const getUserRecipes = async () => {
        try {
            const response = await axios.get(`${RECIPE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` }})
            const results = await response?.data
            setRecipes(results.recipes)
            setOwner(results.fullName)
            setLoading(false)
        } catch (error) {
            console.log(`An error occured ${error}`)
        }
    }
    

    useEffect(() => {
        getUserRecipes()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        loading ? document.title = 'Loading...': document.title = `${owner}'s Recipes`
    })
  
    let content 
    if(loading) content = <div className='max-w-full px-[8%] border flex justify-center items-center h-[90vh]'><Loader /></div>
    else content = <>
            <div>
                <div className='capitalize text-center pt-7'>more recipes by {owner}</div>
                <Recipes recipes={recipes} />
            </div>
        </>
    
    return content
}

export default UserRecipes