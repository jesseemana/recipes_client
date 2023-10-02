import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { RecipeSchema } from '@/model/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import TextArea from '@/components/Inputs/TextArea'
import InputField from '@/components/Inputs/InputField'
import useDocumentTitle from '@/hooks/useDocumentTitle'
// import Upload from '@/components/Inputs/Upload'

type RecipeFields = z.infer<typeof RecipeSchema> 

const CreateRecipe = () => {
  const { auth } = useAuth()

  useDocumentTitle('Add Recipe')

  const [image, setImage] = useState('')
  const [source, setSource] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const user = auth.user
  const token = auth.access_token

  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFields>({
    resolver: zodResolver(RecipeSchema)
  })
 
  const createRecipe: SubmitHandler<RecipeFields> = async (data) => {
    setSubmitting(true)
    try {
      const formData = new FormData() 

      formData.append('user', user._id)
      formData.append('name', data.name)
      formData.append('time', data.time)
      formData.append('file', source)
      formData.append('category', data.category)
      formData.append('procedure', data.procedure)
      formData.append('ingridients', data.ingridients)
      
      await axios.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true 
      })
      toast.success('We cooked 👩🏾‍🍳')
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.error(errorMessage)
      toast.error('Failed to cook 😭')
    } finally {
      setSubmitting(false)
    }
  }
  
  const handleImage = (e) => {
    const file = e.target?.files[0]
    setImage(file)

    const previewFile = (file: Blob) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => setSource(reader.result)
    }

    previewFile(file)
  }

  return (
    <div className='flex justify-center items-center bg-gray-50 form_height'>
      <div className='bg-white rounded-md shadow-lg border max-w-full xl:w-[740px]'>
        <Heading label='add a recipe' />
        <form 
          onSubmit={handleSubmit(createRecipe)} 
          encType='multipart/form-data' 
          className='flex flex-col p-4 gap-y-2 h'
        >
          <InputField 
            htmlFor='name'
            label='name:'
            id='name'
            type='text'
            placeholder='name'
            inputProps={register('name')}
            error={errors.name?.message as string}
          />

          <InputField 
            id='ingridients'
            type='text'
            htmlFor='ingridients'
            label='ingridients:'
            placeholder='e.g. rice, water, sugar'
            inputProps={register('ingridients')}
            error={errors.ingridients?.message as string}
          />

          <label htmlFor='category' className='text-gray-600 capitalize'>category:</label>
          <select 
            id='category' 
            {...register('category')}
            className='border p-2 text-gray-500 outline-none text-sm'
          >
            <option value='snack'>snack</option>
            <option value='breakfast'>breakfast</option>
            <option value='appetiser'>appetiser</option>
            <option value='side dish'>side dish</option>
            <option value='main course'>main course</option>
          </select>

          <InputField 
            id='time'
            type='text'
            htmlFor='time'
            label='time to prepare:'
            placeholder='e.g. 10 minutes, 2 hours'
            inputProps={register('time')}
            error={errors.time?.message as string}
          />

          <label htmlFor='choose file' className='text-sm md:text-[15px] capitalize text-gray-500'>
            attach image:
          </label>
          <input  
            type='file' 
            className='border-0 cursor-pointer' 
            onChange={handleImage}
          />

          {source && (<img src={source} alt='selected image for upload' className='w-24 h-24' />)}

          <TextArea
            id='procedure'
            htmlFor='procedure'
            label='how to prepare:'
            rows={10}
            placeholder='how to prepare'
            inputProps={register('procedure')}
            error={errors.procedure?.message as string}
          />

          <Button 
            type='submit'
            disabled={submitting}
            label={submitting ? 'cooking... 🍲' : `let's cook 👩🏾‍🍳`}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe   

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
//     console.error(errorMessage)
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