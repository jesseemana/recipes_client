interface Menu {
  label: string
  onClick: () => void
  icon: React.ReactElement
} 

const NavItem = ({ onClick, icon, label }: Menu) => {
  return (
    <div
      onClick={onClick} 
      className='text-lg md:text-3xl text-gray-500 flex flex-col justify-center items-center capitalize'
    >
      {icon}
      <p className='text-[13px]'>{label}</p>
    </div>
  )
}

export default NavItem 