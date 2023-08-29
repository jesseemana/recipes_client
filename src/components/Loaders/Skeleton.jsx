import { Skeleton } from '@/components/ui/skeleton'

const Skeleton = () => {
  return (
    <div className='flex flex-col'>
      <Skeleton className='h-20 w-20 rounded-full' />
      <Skeleton className='h-12 w-12 rounded-full' />
      <Skeleton className='h-12 w-12 rounded-full' />
      <Skeleton className='h-12 w-12 rounded-full' />
    </div>
  )
}

export default Skeleton 