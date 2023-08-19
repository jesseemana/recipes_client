import useDocumentTitle from '../hooks/useDocumentTitle'

const NotFound = () => {
  useDocumentTitle('404 | Page Not Found')
  
  return (
    <div className='max-w-full px-[8%]'>
      <div className='flex items-center justify-center flex-col h-[100vh]'>
        <p className='capitalize text-gray-900 text-md md:text-2xl'>404.</p>
        <p className='capitalize text-gray-900 text-md md:text-2xl text-center'>we couldn't find the page you're looking for.</p>
      </div>
    </div>
  )
}

export default NotFound     