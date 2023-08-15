import { BounceLoader } from 'react-spinners';

const Upload = ({picturePath, uploading, handleImgUpld}) => {
  return (
    <>
      <label htmlFor='upload' className='text-sm md:text-[15px] capitalize text-gray-500'>attach image:</label>
      <div className='mb-2 flex flex-wrap gap-1 items-center'>
        {picturePath && (
          <img src={picturePath} alt='selected image for upload' className='w-24 h-24' />
        )}
        {uploading && (
          <div className='h-24 flex items-center'>
            <BounceLoader color={'#1E3A8A'} speedMultiplier={2} />
          </div>
        )}
        <label className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-gray-500'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' />
          </svg>
          <p className='text-gray-500'>Add Image</p>
          <input type='file' onChange={handleImgUpld} className='hidden'/>
        </label>
      </div>
    </>
  )
}

export default Upload