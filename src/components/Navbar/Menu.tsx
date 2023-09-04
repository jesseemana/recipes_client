interface Menu {
  label: string
  onClick: () => void
  icon: React.ReactElement
}

const Menu = ({onClick, icon, label}: Menu) => {
  return (
    <div
      onClick={onClick} 
      className='text-lg md:text-3xl text-gray-500 flex flex-col justify-center items-center capitalize'
    >
      {icon}
      <p className='text-sm'>{label}</p>
    </div>
  )
}

export default Menu 