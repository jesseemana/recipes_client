import { Link } from 'react-router-dom'

const Menu = ({route, onClick, icon}) => {
  return (
    <>
      <Link 
        to={route} 
        onClick={onClick} 
        className='text-2xl md:text-3xl text-gray-500'
      >
        <>{icon}</>
      </Link>
    </>
  )
}

export default Menu 