import { Link } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai' 

const RecipeCard = ({data}) => {
  return (
    <Link
      to={`/recipe/${data?._id}`}
      className='cols-span-1'
    >
      <div className='flex flex-col gap-2 w-full text-gray-600 text-xl'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl border'>
          <img 
            src={data?.image || './cake.jpg'} 
            alt={data?.description || 'a chocolate cake'} 
            className='h-full w-full'
            loading='lazy'
          />
          <div className='absolute top-3 right-3'>
            <AiOutlineHeart 
              size={38} 
              className='text-[#38D6C4]' 
            />
          </div>
        </div>
        <p className='capitalize font-semibold'>{data?.name || 'chocolate cake'}</p>
        <div className='flex items-center gap-1'>
          <BsClock />
          <p>10min</p>
        </div>
        <p className='font-nomal text-gray-600 text-lg'>#snack</p>
      </div>
    </Link>
  )
}

export default RecipeCard 
// w-[300px] h-[300px]