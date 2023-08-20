import GridLoader from 'react-spinners/GridLoader'

const Loader = () => {
  return <div className='flex items-center justify-center h-[90vh]'>
    <GridLoader color={'#38D6C4'} aria-label='Loading Spinner' />
  </div>
}

export default Loader