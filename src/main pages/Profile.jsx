import { useSelector } from 'react-redux'
import RecipesCard from '../components/ui/RecipesListing'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Profile = () => {
  const user = useSelector(state => state.user)

  useDocumentTitle('My Profile')
  
  return (
    <div className='max-w-full px-[8%]'>
      <h1>my profile</h1>
    </div>
  )
}

export default Profile