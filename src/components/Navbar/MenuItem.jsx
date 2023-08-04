const MenuItem = ({onClick, label, icon}) => {
  return (
    <div 
      onClick={onClick} 
      className='px-4 py-3 hover:bg-neutral-100 transition font-normal flex items-center gap-1 text-gray-600'
    >
      <div className='text-lg'>{icon}</div>
      <p className='text-md'>{label}</p>
    </div>
  )
}

export default MenuItem