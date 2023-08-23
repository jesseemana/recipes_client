import { useState } from 'react'
import InputField from '../components/Inputs/InputField'
import Upload from '../components/Inputs/Upload'
import axios from '../api/axios'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Heading from '../components/Inputs/Heading'
import Button from '../components/Buttons/Button'
import useAuth from '../hooks/useAuth'

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
    
  const [source, setSource] = useState('')
  const [picturePath, setPicturePath] = useState('')
  const [pictureId, setPictureId] = useState('')
  // console.log(auth)
  const user = auth.user
  const token = auth.access_token

  useDocumentTitle('Create Recipe')

  const handleChange = (e) => setCategory(e.target.value)
    
  // UPLOAD FUNCTIONALITY ONE START
  const createRecipe = async () => {
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
      
      await axios.post('/recipes', formData, {
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
  
  const handleImg = (e) => {
    const file = e.target?.files[0]
    setImage(file)

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => setSource(reader.result)
    }
    
    previewFile(file)
  }
  // UPLOAD FUNCTIONALITY ONE END

  // UPLOAD FUNCTIONALITY TWO START 
  // const uploadImage = async (base64EncodedImage) => {
  //   setUploading(true)
  //   try {
  //     const response = await axios.post('/upload', JSON.stringify({data: base64EncodedImage}), {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     const results = await response?.data
  //     if (results) {
  //       setPictureId(results.public_url)
  //       setPicturePath(results.secure_url)
  //     }
  //   } catch (error) {
  //     let errorMessage = 'Something went wrong: '
  //     if (error instanceof Error)
  //       errorMessage += error
  //     console.log(errorMessage)
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  // const handleImgUpld = async (e) => {
  //   const file = e.target?.files[0]
    
  //   const previewFile = (file) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onloadend = () => setSource(reader.result)
  //   }

  //   previewFile(file)

  //   if (!source) return
  //   uploadImage(source)
  // }
  // UPLOAD FUNCTIONALITY TWO END 

  const handleSubmit = (e) => {
    e.preventDefault()
    // createRecipe()
  }

  return (
    <div className='max-w-full px-[4%] flex justify-center items-center bg-gray-50 height'>
      <div className='bg-white rounded-md shadow-lg border w-[600px] xl:w-[740px]'>
        <Heading label={'add a recipe'} />
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col p-4 gap-y-2 h'>
          <InputField 
            htmlFor={'name'}
            label={'name:'}
            id={'name'}
            type='text'
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />

          <InputField 
            htmlFor={'ingridients'}
            label={'ingridients:'}
            id={'ingridients'}
            type='text'
            value={ingridients}
            placeholder='e.g. rice, water, sugar'
            onChange={(e) => setIngridients(e.target.value)}
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
              snack
            </option>
          </select>

          <InputField 
            htmlFor={'time'}
            label={'time to prepare(minutes):'}
            id={'time'}
            type='text'
            value={time}
            placeholder='e.g. 10, 20, 60'
            onChange={(e) => setTime(e.target.value)}
          />

          {/* PART OF FORM DATA */}
          <label htmlFor='choose file' className='text-sm md:text-[15px] capitalize text-gray-500'>attach image:</label>
          <input type='file' className='border-0 cursor-pointer' onChange={handleImg} required />
          {source && (
            <img src={source} alt='selected image for upload' className='w-24 h-24' />
          )}

          {/* SEPARATE API ENDPOINT */}
          {/* <Upload
            uploading={submitting}
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
            id='procedure'
            name='procedure'
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