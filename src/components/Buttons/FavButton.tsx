import useBookmark from '../../hooks/useBookmark'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface FavButton {
  id: string
  auth: Auth
}

const FavButton = ({id, auth}: FavButton) => {
  const {bookmarked, toggleBookmark} = useBookmark({id, auth})

  return (
    <div 
      onClick={toggleBookmark}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart
        className='fill-white absolute -top-[2px] -right-[2px] text-5xl md:text-4xl'
      />
      <AiFillHeart
        className={bookmarked ? 'fill-[#38D6C4]' : 'fill-neutral-500/70 text-[42px] md:text-[32px]'}
      />
    </div>
  )
}

export default FavButton  