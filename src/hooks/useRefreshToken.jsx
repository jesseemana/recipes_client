import useAuth from './useAuth'
import axios from '../api/axios'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  async function refresh() {
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    
    setAuth(prev => {
      console.log(prev)
      response.data?.access_token
      return {...prev, access_token: response.data.access_token}
    })

    return response.data.access_token
  }

  return refresh
}

export default useRefreshToken