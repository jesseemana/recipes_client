const Header = ({title, subtitle, center}) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'} pb-5`}>
      <div className='text-2xl font-bold capitalize'>
        {title}
      </div>
      <div className='font-normal text-neutral-500 mt-2 text-lg'>
        {subtitle}
      </div>
    </div>
  )
}

export default Header  