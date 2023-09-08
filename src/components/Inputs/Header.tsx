interface HeaderProps {
  center?: boolean
  title: string
  subtitle: string
}

const Header = ({title, subtitle, center}: HeaderProps) => {
  return (
    <div className={center ? 'text-center pb-5'  : 'text-start pb-5'}>
      <h1 className='text-2xl text-neutral-800 font-bold capitalize'>{title}</h1>
      <p className='font-light text-neutral-500 mt-2 text-lg'>{subtitle}</p>
    </div>
  )
}

export default Header 