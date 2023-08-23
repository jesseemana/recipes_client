import { useRef } from 'react'
import FavButton from './Buttons/FavButton'
import { BsClock, } from 'react-icons/bs'
import { CgOptions  } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({
  user,
  data,
  isOpen,
  setIsOpen,
  actionId,
  primaryAction,
  primaryActionLabel,
  disabled
}) => {
  const navigate = useNavigate()

  const menuRef = useRef()

  const handleDelete = (e) => {
    e.stopPropagation()
    if (disabled) return
    primaryAction(actionId)
  }

  const toggleOpen = (e) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      onClick={() => navigate(`/recipe/${data.id}`)}
      className='group'
    >
      <div  className='flex flex-col gap-2 w-full text-xl md:text-lg lg:text-md'>
        <div className='w-full relative overflow-hidden rounded-xl border aspect-square'>
          <img 
            src={data.image} 
            alt={data.description} 
            className='object-cover h-full w-full group-hover:scale-110 transition '
            loading='lazy'
          />
          <div className='absolute top-3 right-3'>
            { user && <FavButton id={data.id} /> }
          </div>
        </div>
        <p className='capitalize font-semibold text-gray-700'>{data.name}</p>
        <div className='flex items-center gap-1 text-gray-600 lg:text-[15px]'>
          <BsClock />
          <p className='font-normal'>{data.time}min</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='font-medium text-neutral-700 text-lg'>#{data.category}</p>
          {primaryAction && (
            <div
              id={data.id}
              ref={menuRef}
              onClick={toggleOpen}
              className='relative hover:cursor-pointer'
            >
              <CgOptions className='text-gray-700' />
              {isOpen ? (
                <div className='absolute bg-white rounded-md shadow-md w-[120px] right-0 bottom-10 md:bottom-6 text-md'>
                  <p
                    onClick={() => navigate(`/edit/${data.id}`)} 
                    className='px-2 py-2 md:py-1 capitalize text-gray-700 hover:bg-neutral-100 hover:rounded-sm transition'
                  >
                    Edit
                  </p>
                  <p
                    onClick={handleDelete} 
                    className='px-2 py-2 md:py-1 capitalize text-gray-700 hover:bg-neutral-100 hover:rounded-sm transition'
                  >
                    {primaryActionLabel}
                  </p>
                </div>
                ):(
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard 