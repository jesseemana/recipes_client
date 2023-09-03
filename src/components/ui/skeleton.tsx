import { cn } from '@/lib/utils'

function SkeletonLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[3px] bg-gray-100 dark:bg-gray-300', className)}
      {...props}
    />
  )
}

export { SkeletonLoader } 