const Heading = ({label}: {label: string}) => {
  return (
    <h1 className='text-center capitalize text-lg md:text-2xl font-semibold text-[#38D6C4] py-1'>
      {label}
    </h1>
  )
}

export default Heading 