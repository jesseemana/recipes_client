import GridLoader from 'react-spinners/GridLoader'

const Loader = () => {
  return (
    <div className='grid place-items-center h-[79vh]'>
      <GridLoader 
        size={24}
        color='#38D6C4'
        aria-label='Loading Spinner' 
      />
    </div>
  )
}

export default Loader 