import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { BsClock } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import cake from '../assets/cake.jpg'

const RecipeUI = ({token, recipe, owner, bookmarked, toggleBookmark}) => {
  return (
    <>
        <div className="max-w-full px-[8%] flex flex-col justify-center gap-y-5 gap-x-20 md:flex-row py-4 ">
            <div className="flex flex-col gap-y-2">
                <img 
                    src={cake} 
                    alt="a beautiful delicious chockolate cake" 
                    className="w-[300px] h-[250px] lg:h-[430px] lg:w-[500px] shadow-lg rounded-md" 
                />
                <h1 className='capitalize font-semibold text-xl'>{recipe.name}</h1>
                <div className='flex gap-x-5'>
                    <p className="flex items-center gap-x-2 text-gray-700">
                        <span><BsClock  className="text-xl text-[#38D6C4]"/></span>
                        {recipe.time}min
                    </p>
                    {!token ? 
                    <div
                        onClick={toggleBookmark}
                        className="flex items-center gap-x-2 text-gray-700"
                    >
                        <span><BsBookmark className="text-xl text-[#38D6C4]" /></span>
                        login to save
                    </div> : <>
                    {!bookmarked ? 
                    <button
                        onClick={toggleBookmark}
                        className="flex items-center gap-x-2 text-gray-700"
                    >
                        <span><BsBookmark className="text-xl text-[#38D6C4]" /></span>
                        save recipe
                    </button> : 
                    <button
                        onClick={toggleBookmark}
                        className="flex items-center gap-x-2 text-gray-700"
                    >
                        <span><BsBookmarkFill className="text-xl text-[#38D6C4]" /></span>
                        saved
                    </button>}
                    </>}
                </div>
                <Link 
                    to={`${'/user/'}${recipe.user}`} 
                    className='text-md font-extralight w-[190px] text-gray-500'
                >
                    view more by {owner}
                </Link>
                <div className='border border-l-0 border-r-0 border-b-0 pt-3 '>
                    <h1 className="uppercase text-lg font-medium text-gray-900">ingridients</h1>
                    <p className="max-w-[400px] text-gray-600">{recipe.ingridients}</p>
                </div>
            </div>
            <div className=''>
                <h1 className="uppercase text-lg font-medium text-gray-900 border py-3 border-l-0 border-r-0">procedure</h1>
                <p className="max-w-[400px] text-gray-600">{recipe.procedure}</p>
            </div>
        </div>
    </>
  )
}

export default RecipeUI     