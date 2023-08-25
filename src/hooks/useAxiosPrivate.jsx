import { useEffect } from 'react'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'
import { axiosPrivate } from '../api/axios'


const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.access_token}`
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async function(error) {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const new_access_token = refresh()
          prevRequest.headers['Authorization'] = `Bearer ${new_access_token}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return function() {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate  