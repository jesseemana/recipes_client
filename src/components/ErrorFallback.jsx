import Content from './Content'

function ErrorFallback({ error, resetErrorBoundary }) {
   return (
    <Content>
      <div role='alert' className='h-[100vh] flex flex-col items-center justify-center text-center'>
        <p className='font-bold text-2xl'>Something went wrong:</p>
        <p className='text-red-500 text-xl'>{error.message}</p>
      </div>
    </Content>
  )
}

export default ErrorFallback  