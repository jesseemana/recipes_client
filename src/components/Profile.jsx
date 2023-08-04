import { useSelector } from 'react-redux'
import RecipesCard from './ui/RecipesListing'

const Profile = () => {
  const user = useSelector(state => state.user)
  
  return (
    <div className='max-w-full px-[8%]'>
      <h1>my profile</h1>
    </div>
  )
}

export default Profile