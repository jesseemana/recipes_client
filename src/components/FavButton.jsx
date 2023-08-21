import useBookmark from '../hooks/useBookmark'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavButton = ({id}) => {
  const {bookmarked, toggleBookmark} = useBookmark({id})

  return (
    <div 
      onClick={toggleBookmark}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart 
        size={31} 
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart 
        size={28} 
        className={bookmarked ? 'fill-[#38D6C4]' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default FavButton  