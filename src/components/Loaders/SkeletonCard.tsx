import { SkeletonLoader } from "@/components/ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className='flex flex-col mb-2 gap-2'>
      <SkeletonLoader className='h-[320px] md:h-[200px] w-full' />
      <SkeletonLoader className='h-4 w-[200px]' />
      <SkeletonLoader className='h-4 w-[100px]' />
      <SkeletonLoader className='h-4 w-[170px]' />
    </div>
  )
}

export default SkeletonCard  