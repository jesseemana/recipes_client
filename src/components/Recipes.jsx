import { BsClock } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import cake from '../assets/cake.jpg'

const Recipes = ({ recipes }) => {
  return (
    <>
      <div className='max-w-full px-[4%] py-10 flex justify-center'>
        <div className='grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 lg:gap-x-20 gap-y-4'>
          {recipes.map(recipe => {
            return (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <div className=' rounded-md shadow-md w-[160px] lg:w-[200px] relative bg-white'>
                  <img src={cake} alt='a nicely baked delicious chockolate cake' className='w-full h-[140px] lg:h-[180px] rounded-md'/> 
                  <div className='px-1 flex flex-col py-2 gap-y-1'>
                    <p className='absolute top-1 rounded-full px-2 py-0.5 flex flex-row-reverse gap-x-1 items-center text-gray-900 bg-white'>
                      {recipe.time}min
                      <span><BsClock /></span>
                    </p>
                    <div className='flex justify-between'>
                      <h1 className='font-semibold text-gray-900 capitalize'>{recipe.name}</h1>
                      <p className='bg-gray-100 text-gray-700 px-3 rounded-full'>{recipe.category}</p>
                    </div>
                    <p className='text-gray-600 font-extralight'>{recipe.username}</p>
                  </div>
                </div>
              </Link>
          )})}
        </div>
      </div>
    </>
  )
}

export default Recipes