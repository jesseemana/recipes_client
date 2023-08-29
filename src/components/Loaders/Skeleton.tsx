import { SkeletonLoader } from "@/components/ui/skeleton"

const Skeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonLoader className="h-12 w-12 rounded-full" />
      <SkeletonLoader className="h-4 w-[250px]" />
      <SkeletonLoader className="h-4 w-[200px]" />
    </div>
  )
}

export default Skeleton