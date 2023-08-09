import { useState } from 'react'
import InputField from '../components/InputField'
import axios from '../api/axios'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Heading from '../components/Heading'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

const RECIPE_URL = '/recipes'

const CreateRecipe = () => {
  const { auth } = useAuth()

  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState({})
  const [category, setCategory] = useState('')
  const [procedure, setProcedure] = useState('')
  const [ingridients, setIngridients] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [snack, setSnack] = useState('snack/appetiser')
  const [breakFast, setBreakFast] = useState('breakfast')
  const [mainCourse, setMainCourse] = useState('main course')
    
  // console.log(auth)
  const user = auth.user
  const token = auth.access_token

  useDocumentTitle('Create Recipe')
    
  const createRecipe = async (e) => {
    setSubmitting(true)
    e.preventDefault()
    try {
      const formData = new FormData() 

      formData.append('user', user._id)
      formData.append('name', name)
      formData.append('ingridients', ingridients)
      formData.append('category', category)
      formData.append('time', time)
      formData.append('file', image) // FOR MULTER
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
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  function handleImg(e) {
    const files = e.target?.files

    if (files.length > 0) {
      const data = new FormData()
      
      for (const file of files) {
        console.log(file)
        // data.append('file', image)
      }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(image)
    // createRecipe()
  }

  return (
    <div className='max-w-full px-[8%] flex justify-center items-center bg-gray-50 h-auto pt-[100px] pb-[50px]'>
      <div className='bg-white p-4 rounded-md shadow-lg w-[540px] border'>
        <Heading label={'add a recipe'} />
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-y-2'>
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
            className='border p-2 capitalize text-gray-500 outline-none text-sm'
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
              snack / appetiser
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

          <InputField 
            htmlFor={'image'}
            label={'attach image:'}
            type='file'
            placeholder='choose image to attach'
            // onChange={(e) => setImage(e.target.files)}
            onChange={handleImg}
          />

          <label 
            htmlFor='procedure' 
            className='text-sm md:text-[15px] capitalize text-gray-500'
          >
            how to prepare
          </label>
          <textarea 
            name='procedure' 
            id='procedure' 
            rows='10' 
            value={procedure}
            placeholder='how to prepare'
            onChange={(e) => setProcedure(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm resize-none outline-[#38D6C4]' 
          />
                
          <Button 
            type='submit'
            disabled={submitting}
            label={`let's cook`}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe     