function ErrorFallback({ error, resetErrorBoundary }) {
   return (
     <div role="alert" className="h-[100vh] flex flex-col items-center justify-center ">
      <p className="font-bold text-2xl">Something went wrong:</p>
      <p className="text-red-500 text-xl">{error.message}</p>
    </div>
  )
}

export default ErrorFallback