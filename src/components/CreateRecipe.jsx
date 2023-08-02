import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import InputField from './InputField'
import axios from '../api/axios'

const RECIPE_URL = '/recipes'

const CreateRecipe = () => {
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')
  const [procedure, setProcedure] = useState('')
  const [ingridients, setIngridients] = useState('')

  const [snack, setSnack] = useState('snack/appetiser')
  const [breakFast, setBreakFast] = useState('breakfast')
  const [mainCourse, setMainCourse] = useState('main course')
    
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.access_token)

  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0])
  }
    
  const createRecipe = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()    
      console.log(image)
      formData.append('user', user._id)
      formData.append('name', name)
      formData.append('ingridients', ingridients)
      formData.append('category', category)
      formData.append('time', time)
      formData.append('file', image) // FOR MULTER
      formData.append('picture_path', image.name)  // FOR SCHEMA
      formData.append('procedure', procedure)
      
      await axios.post(RECIPE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true 
      })
    } catch (error) {
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = () => {
    createRecipe()
    setTime('')
    setName('')
    setImage(null)
    setCategory('')
    setProcedure('')
    setIngridients('')
  }
    
  useEffect(() => {
    document.title = 'Create Recipe'
  })

  return (
    <div className='max-w-full px-[8%] py-7 flex justify-center bg-gray-50'>
      <div className='bg-white p-4 rounded-md shadow-lg w-[500px] border'>
        <h1 className='py-4 text-center text-[#38D6C4] font-bold text-3xl uppercase'>add a recipe</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-y-3'>
          <InputField 
            htmlFor={'name'}
            label={'name:'}
            type='text'
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm outline-none'
          />

          <InputField 
            htmlFor={'ingridients'}
            label={'ingridients:'}
            type='text'
            value={ingridients}
            placeholder='ingridients'
            onChange={(e) => setIngridients(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm outline-none'
          />

          <label htmlFor='category' className='text-gray-600 capitalize'>category:</label>
          <select 
            name='category dropdown' 
            onChange={handleChange} 
            className='border p-2 capitalize text-gray-500 outline-none'
          >
            <option 
              value={breakFast} 
              className='capitalize'
            >
              breakfast
            </option>
            <option 
              value={mainCourse} 
              className='capitalize'
            >
              main course
            </option>
            <option 
              value={snack} 
              className='capitalize'
            >
              snack/appetiser
            </option>
          </select>

          <InputField 
            htmlFor={'time'}
            label={'time to prepare:'}
            type='text'
            value={time}
            placeholder='(minutes e.g. 10, 20, 30)'
            onChange={(e) => setTime(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm outline-none'
          />

          <label htmlFor='image' className='text-gray-700 capitalize'>attach image:</label> 
          <div className='border border-dashed py-4 rounded-sm px-1 bg-white cursor-pointer'>
            <Dropzone onDrop={handleDrop}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {image ? (
                  <p>{image.name}</p>
                    ) : (
                    <p className='text-gray-500'>Drag and drop/click to select a picture</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>

          {/* input field changed from textarea */}
          <InputField 
            htmlFor={'procedure'}
            label={'how to prepare:'}
            type='text'
            rows='9'
            value={procedure}
            placeholder='procedure'
            onChange={(e) => setProcedure(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm outline-none resize-none'
          />
                
          <button
            type='submit'
            className='p-2 bg-[#38D6C4] text-white font-semibold text-xl capitalize rounded-sm'
          >
            let's cook
          </button> 
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe     