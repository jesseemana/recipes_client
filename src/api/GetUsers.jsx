import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { setUsers } from '../state/appSlice'

const GetUsers = () => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.access_token)
   
    const fetcher = (url, token) =>
        fetch(url, {headers: { 'Authorization': `Bearer ${token}` }}).then(res => res.json())
    
    const {isLoading, data, error} = useSWR('http://localhost:8080/api/v1/users', (url) => fetcher(url, token))

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Couldn't get data, refresh page</div>
    dispatch(setUsers({user: data}))
}

export default GetUsers