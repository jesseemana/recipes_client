import FavButton from './FavButton'
import { Link } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'

const RecipeCard = ({data, user}) => {
  return (
    <Link
      to={`/recipe/${data?.id}`}
      className='cols-span-1 group'
    >
      <div className='flex flex-col gap-2 w-full text-gray-600 text-xl lg:text-md'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl border'>
          <img 
            src={data?.image || './cake.jpg'} 
            alt={data?.description || 'a chocolate cake'} 
            className='h-full w-full group-hover:scale-110 transition'
            loading='lazy'
          />
          <div className='absolute top-3 right-3'>
            {<FavButton id={data?._id} />}
          </div>
        </div>
        <p className='capitalize font-semibold'>{data?.name || 'chocolate cake'}</p>
        <div className='flex items-center gap-1 lg:text-[15px]'>
          <BsClock />
          <p>{data?.time}min.</p>
        </div>
        <p className='font-nomal text-neutral-500 text-lg'>#snack</p>
      </div>
    </Link>
  )
}

export default RecipeCard 