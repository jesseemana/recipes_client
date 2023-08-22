import Skeleton from './Skeleton'

const SkeletonCard = () => {
  return (
    <div className='py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
      <div className=''>
        <Skeleton classes='image' />
        <Skeleton classes='text width-50' />
        <Skeleton classes='text width-30' />
        <Skeleton classes='text width-50' />
      </div>
    </div>
  )
}

export default SkeletonCard 