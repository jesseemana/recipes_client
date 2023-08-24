import { useRef } from 'react'
import FavButton from './Buttons/FavButton'
import { FiEdit } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({
  user,
  data,
  isOpen,
  setIsOpen,
  primaryActionLabel,
  primaryAction,
  actionId,
  disabled
}) => {
  const menuRef = useRef()

  const navigate = useNavigate()

  const handleDelete = (e) => {
    e.stopPropagation()
    if (disabled) return
    primaryAction(actionId)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit/${data.id}`)
  }

  // const toggleOpen = (e) => {
  //   e.stopPropagation()
  //   setIsOpen((prev) => !prev)
  // }

  return (
    <div
      onClick={() => navigate(`/recipe/${data.id}`)}
      className='group'
    >
      <div className='flex flex-col gap-2 text-xl md:text-lg lg:text-md'>
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
              // id={data.id}
              // ref={menuRef}
              // onClick={toggleOpen}
              className='relative hover:cursor-pointer flex gap-2 text-gray-600'
            >
              <FiEdit 
                size={20} 
                onClick={handleEdit}
              />
              {/* USE REACT SWEET ALERT TO PROMPT DELETE QUESTION */}
              <AiOutlineDelete 
                size={22} 
                onClick={handleDelete}
              />
              {/* 
              *****OPENS UP ON EVERY RECIPE COMPONENT ON THE PAGE INSTEAD OF THE SINGLE COMPONENT THAT WAS TRIGERRED*****
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
              */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard 