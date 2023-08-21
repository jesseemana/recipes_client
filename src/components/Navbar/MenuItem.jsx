import { Link } from 'react-router-dom'

const MenuItem = ({onClick, route, label, icon}) => {
  return (
    <Link
      to={route}
      onClick={onClick} 
      className='px-4 py-3 hover:bg-neutral-100 hover:rounded-md transition font-normal flex items-center gap-1 text-gray-600 text-md'
    >
      <>{icon}</>
      <p>{label}</p>
    </Link>
  )
}

export default MenuItem 