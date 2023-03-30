import { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => { 
        document.title = '404 | Page Not Found'
    })
  
    return (
        <div className='p-3 max-w-full px-[8%]'>
            <div className='flex items-center justify-center mt-[80%] lg:mt-[23%] flex-col'>
                <p className='capitalize text-gray-900 text-md md:text-2xl'>404</p>
                <p className='capitalize text-gray-900 text-md md:text-2xl text-center'>we couldn't find the page you're looking for.</p>
            </div>
        </div>
    )
}

export default NotFound