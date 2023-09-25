import { Link } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

interface RecipeUI {
  recipe: Recipe
  owner: string
  token: string
  bookmarked: boolean
  toggleBookmark: () => void
}

const RecipeUI = ({ recipe, owner, token, bookmarked, toggleBookmark }: RecipeUI) => {
  return (
    <div className='max-w-full px-[4%] grid grid-rows-1 lg:grid-cols-2 lg:grid-rows-none py-20'>
      <div className='flex flex-col gap-y-4'>
        <div className='w-full relative overflow-hidden rounded-xl border aspect-square lg:h-[390px] lg:w-[500px]'>
          <img 
            src={recipe.picture_path} 
            alt={recipe.name}
            className='object-cover h-full w-full lg:h-[390px] lg:w-[500px] shadow-lg rounded-md'
          />
        </div>
        <h1 className='capitalize font-semibold text-xl'>
          {recipe.name}
        </h1>
        <div className='flex gap-x-5'>
          <p className='flex items-center gap-x-2 text-gray-700'>
            <span><BsClock  className='text-xl text-[#38D6C4]'/></span>
            {recipe.time}
          </p>
          {!token ?
            <div className='flex items-center gap-x-2 text-gray-700'>
              <span><BsBookmark className='text-xl text-[#38D6C4]' /></span>
              login to save
            </div> : 
            <>
              {!bookmarked ? 
                <button
                  onClick={toggleBookmark}
                  className='flex items-center gap-x-2 text-gray-700'
                >
                  <span><BsBookmark className='text-xl text-[#38D6C4]' /></span>
                  save recipe
                </button> : 
                <button
                  onClick={toggleBookmark}
                  className='flex items-center gap-x-2 text-gray-700'
                >
                  <span><BsBookmarkFill className='text-xl fill-[#38D6C4]' /></span>
                  saved
                </button>
              }
            </>
          }
        </div>
        <Link 
          to={`/user/${recipe.user}`} 
          className='text-md font-extralight text-gray-500'
        >
          view more by <span className='text-[#38D6C4] font-normal'>{owner}</span>
        </Link>
        <div className='border border-l-0 border-r-0 border-b-0 py-3 font-normal'>
          <h1 className='uppercase text-lg font-medium text-gray-900'>ingridients</h1>
          <p className='max-w-[400px] text-gray-600'>
            {recipe.ingridients}
          </p>
        </div>
      </div>
      <div>
        <h1 className='uppercase text-lg font-medium text-gray-900 py-3 border-t border-b'>procedure</h1>
        <p className='max-w-[400px] text-gray-600 font-normal'>
          {recipe.procedure}
        </p>
      </div>
    </div>
  )
}

export default RecipeUI   