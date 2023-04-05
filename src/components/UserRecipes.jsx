import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImSpinner3 } from "react-icons/im"
import axios from '../api/axios';
import Recipes from '../pages/Recipes';

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
        document.title = `${owner}'s Recipes`
    })
  
    let content 
    if(loading) content = <div className="flex justify-center mt-[50%] lg:mt-[15%]"><ImSpinner3 className="animate-spin text-[60px] text-blue-400" /></div>
    else content = <>
            <div className='max-w-full px-[8%] py-5 flex flex-col gap-y-5'>
                <div className='capitalize text-center'>more recipes by {owner}</div>
                <Recipes recipes={recipes} />
            </div>
        </>
    
    return content
}

export default UserRecipes