import useDocumentTitle from '../hooks/useDocumentTitle'

const NotFound = () => {
  useDocumentTitle('404 | Page Not Found')
  
  return (
    <div className='flex items-center justify-center flex-col h-[100vh] capitalize text-gray-900 text-md md:text-2xl'>
      <p>404.</p>
      <p className='text-center'>we couldn't find the page you're looking for.</p>
    </div>
  )
}

export default NotFound   