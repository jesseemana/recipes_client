import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import Feed from '../pages/Feed'

// import axios from '../api/axios'
import axios from 'axios'
import useSWR from 'swr'

const url = 'http://localhost:8080'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])

    const token = useSelector(state => state.access_token)

    // const fetchRecipes = async (URL, token) => {
    //     try {
    //         const response = await axios.get('http://localhost:8080', {headers: {Authorization: `Bearer ${token}`}})
    //         console.log(response?.data)
    //     } catch (error) {
    //         console.log(`An error occurred: ${error}`)
    //     }
    // }

    const fetcher = (url, token) =>
        fetch(url, {headers: {'Authorization': `Bearer ${token}`}}).then(res => res.json());

    const {isLoading, data, error} = useSWR('http://localhost:8080/recipes', (url) => fetcher(url, token))

    console.log(data)

    // console.log(recipes)


    return <div>Recipes</div>
}

export default Recipes;

    // useEffect(() => {
    //     const getRecipes = async () => {
    //         const response = await axios.get('/recipes', {headers: {Authorization: `Bearer ${token}`}})
    //         const results = await response?.data
    //         setRecipes(results)
    //     }

    //     getRecipes()
    // }, [])
