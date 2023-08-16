import { Link } from 'react-router-dom'

const Menu = ({ route, onClick, icon }) => {
  return (
    <>
      <Link to={route} onClick={onClick}>
        <div className='text-2xl text-gray-600'>{icon}</div>
      </Link>
    </>
  )
}

export default Menu 