import { useRef } from 'react'
import Alert from './Alert'
import FavButton from './Buttons/FavButton'
import { FiEdit } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'


const RecipeCard = ({
  user,
  data,
  isOpen,
  actionId= '',
  disabled,
  setIsOpen,
  primaryAction,
  primaryActionLabel,
}: RecipeCard) => {
  const menuRef = useRef()

  const navigate = useNavigate()

  const handleDelete = () => {
    if (disabled) return
    primaryAction?.(actionId)
    // refresh page
  }

  const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(`/edit/${data.id}`)
  }

  // const toggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
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
            alt={`a picture of ${data.name}`} 
            className='object-cover h-full w-full group-hover:scale-110 transition '
            loading='lazy'
          />
          <div className='absolute top-3 right-3'>
            {user && <FavButton id={data.id} />}
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
              // ref={menuRef}
              // onClick={toggleOpen}
              className='relative hover:cursor-pointer flex gap-2 text-gray-600'
            >
              <div onClick={handleEdit}>
                <FiEdit size={20} />
              </div>
              <div onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}>
                <Alert onClick={handleDelete}>
                  <AiOutlineDelete 
                    size={22} 
                    className='text-rose-500' 
                  />
                </Alert>
              </div>
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