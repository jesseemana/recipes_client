import { useSelector } from 'react-redux'
import RecipesCard from '../components/RecipesListing'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useAuth from '../hooks/useAuth'

const Profile = () => {
  const { auth } = useAuth()

  useDocumentTitle('My Profile')
  
  return (
    <div className='max-w-full px-[8%]'>
      <h1>my profile</h1>
    </div>
  )
}

export default Profile