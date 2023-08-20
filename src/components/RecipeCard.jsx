import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai' 
import { BsClock } from 'react-icons/bs'

const RecipeCard = ({data}) => {
  return (
    <Link
      to={`/recipe/${data?._id}`}
      className='cols-span-1'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl border'>
          <img 
            src={data?.image || './cake.jpg'} 
            alt={data?.description || 'a chocolate cake'} 
            className='h-full w-full'
          />
          <div className='absolute top-3 right-3'>
            <AiOutlineHeart size={38} className=' text-[#38D6C4]' />
          </div>
        </div>
        <p className='capitalize font-semibold text-gray-700'>{data?.name || 'chocolate cake'}</p>
        <div className='flex items-center gap-1 text-gray-700'>
          <BsClock />
          <p>10min</p>
        </div>
        <p className='font-nomal text-gray-700 text-md'>#snack</p>
      </div>
    </Link>
  )
}

export default RecipeCard 
// w-[300px] h-[300px]