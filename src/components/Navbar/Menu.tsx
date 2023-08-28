const Menu = ({onClick, icon}: Menu) => {
  return (
    <div
      onClick={onClick} 
      className='text-2xl md:text-3xl text-gray-500'
    >
      {icon}
    </div>
  )
}

export default Menu 