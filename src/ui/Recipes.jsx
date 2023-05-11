import { BsClock } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

import cake from '../assets/cake.jpg'

const Recipes = ({ recipes, pages, currentPage, totalPages, setCurrentPage }) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='grid gap-x-7 lg:gap-x-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-4 py-7'>
          {recipes.map(recipe => {
            return (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <div className='rounded-md shadow-md w-[160px] lg:w-[240px] relative bg-white'>
                  <img 
                    src={cake} 
                    alt='a nicely baked delicious chockolate cake' 
                    className='w-full h-[140px] lg:h-[200px] rounded-md'
                  /> 
                  <div className='px-1 flex flex-col py-2 gap-y-1'>
                    <p className='absolute top-1 rounded-full px-2 py-0.5 mt-1 flex flex-row-reverse gap-x-1 items-center text-gray-900 bg-white'>
                      {recipe.time}min
                    <span><BsClock /></span>
                    </p>
                    {/* <div className='flex justify-between'> */}
                    <h1 className='font-semibold text-gray-700 capitalize'>{recipe.name}</h1>
                    {/* </div> */}
                    <p className='text-gray-500 font-medium'>#{recipe.category}</p>
                    <p className='text-gray-600 font-extralight'>{recipe.username}</p>
                  </div>
                </div>
              </Link>
          )})}
        </div>
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* <p className='text-gray-900 mt-1'>viewing {currentPage} of {totalPages}</p> */}
      </div>
    </>
  )
}

export default Recipes