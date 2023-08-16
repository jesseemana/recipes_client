import { useState } from 'react'
import InputField from '../components/InputField'
import Upload from '../components/Upload'
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
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [procedure, setProcedure] = useState('')
  const [ingridients, setIngridients] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [snack, setSnack] = useState('snack')
  const [breakFast, setBreakFast] = useState('breakfast')
  const [mainCourse, setMainCourse] = useState('main course')
    
  const [picturePath, setPicturePath] = useState('')
  const [source, setSource] = useState('')
  const [uploading, setUploading] = useState(false)
  // console.log(auth)
  const user = auth.user
  const token = auth.access_token

  useDocumentTitle('Create Recipe')
    
  const createRecipe = async (e) => {
    e.preventDefault()
    setSubmitting(true)
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
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  function handleImg(e) {
    const file = e.target?.files[0]
    setImage(file)

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => setSource(reader.result)
    }

    previewFile(file)
  }

  async function uploadImage(base64EncodedImage) {
    setUploading(true)
    try {
      const response = await axios.post('/upload', JSON.stringify({data: base64EncodedImage}), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const results = await response?.data
      if (results)
        setPicturePath(results.cloudinaryurl)
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  async function handleImgUpld(e) {
    const file = e.target?.files[0]
    
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => setSource(reader.result)
    }

    previewFile(file)

    if (!source) return
    uploadImage(source)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
            placeholder='e.g. rice, water, sugar'
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
            label={'time to prepare(minutes):'}
            type='text'
            value={time}
            placeholder='e.g. 10, 20, 60'
            onChange={(e) => setTime(e.target.value)}
            className='border border-gray-200 p-2 rounded-sm outline-none'
          />

          {/* PART OF FORM DATA */}
          <label htmlFor='choose file' className='text-sm md:text-[15px] capitalize  text-gray-500'>attach image:</label>
          <input type='file' className='border-0 cursor-pointer' onChange={handleImg} required />
          {source && (
            <img src={source} alt='selected image for upload' className='w-24 h-24' />
          )}

          {/* SEPARATE API ENDPOINT */}
          {/* <Upload
            uploading={uploading}
            picturePath={picturePath}
            handleImgUpld={handleImgUpld}
           /> */}

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