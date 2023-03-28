import {useDispatch, useSelector} from 'react-redux'
import useSWR from 'swr'
import {setRecipes} from '../state/appSlice';


const Recipes = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.access_token)
   
    const fetcher = (url, token) =>
        fetch(url, {headers: {'Authorization': `Bearer ${token}`}}).then(res => res.json());
    
    const {isLoading, data, error} = useSWR('http://localhost:8080/recipes', (url) => fetcher(url, token))

    console.log(data)
    dispatch(setRecipes({recipes: data}))

    // if(isLoading) return <div>Loading...</div>
    // else if(error) return <div>An error occurred...</div>
    // else return <div>data</div>

}

export default Recipes