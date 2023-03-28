import {useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import GetUsers from './GetUsers'

const User = () => {
  const { id } = useParams()
  const [userIds, setUserIds] = useState()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  console.log(users);

  const allUsers = () => {
    users.map(user =>
    {
      setUserIds(user._id)
    })
  }

  useEffect(() => {
   allUsers() 
  }, [])

  console.log(id)
  console.log(userIds)

  useEffect(() => {
    document.title = 'Profile'
  })


  let content
  if(id === user._id) content = <div className="p-3 max-w-full px-[8%]">My Profile</div>
  else content = <div className="p-3 max-w-full px-[8%]">User Profile</div>

  return content
}

export default User