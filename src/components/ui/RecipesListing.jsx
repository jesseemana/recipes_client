import { BsClock } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'


const RecipesListing = ({ recipes, pages, currentPage, setCurrentPage, totalPages, }) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='grid justify-center gap-x-3 lg:gap-x-10 grid-cols-2 md:grid-cols-4 xl:grid-cols-5 lg:grid-cols-4 gap-y-5 py-7'>
          {recipes.map(recipe => {
            return (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <div className='w-[160px] lg:w-[240px] relative bg-white shadow-md rounded-md'>
                  <img 
                    src={recipe.picture_path || './cake.jpg'} 
                    alt={recipe.name || 'a nicely baked delicious chockolate cake'}
                    className='w-full h-[140px] lg:h-[200px] rounded-md'
                  /> 
                  <div className='px-1 flex flex-col py-2 gap-y-1'>
                    <p className='absolute top-1 rounded-full px-2 py-0.5 mt-1 flex flex-row-reverse gap-x-1 items-center text-gray-900 bg-white'>
                      {recipe.time}min
                      <span><BsClock /></span>
                    </p>
                    <h1 className='font-semibold text-gray-800 capitalize'>{recipe.name}</h1>
                    <p className='text-gray-700 font-small capitalize'>{recipe.category}</p>
                  </div>
                </div>
              </Link>
          )})}
        </div>
        <Pagination 
          pages={pages} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </>
  )
}

export default RecipesListing   