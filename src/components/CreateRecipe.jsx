import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Dropzone from 'react-dropzone'

import axios from '../api/axios'
const RECIPE_URL = '/recipes'

const CreateRecipe = () => {
    const [time, setTime] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('')
    const [procedure, setProcedure] = useState('')
    const [ingridients, setIngridients] = useState('')

    const navigate = useNavigate()
    
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.access_token)

    const handleDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0])
    }
    
    const createRecipe = async (e) => {
        e.preventDefault()
        
        try {
            const formData = new FormData()    

            formData.append('user', user._id)
            formData.append('name', name)
            formData.append('ingridients', ingridients)
            formData.append('procedure', procedure)
            formData.append('category', category)
            formData.append('time', time);
            formData.append('picture', image)
            formData.append('picturepath', image.name)
            
            await axios.post(RECIPE_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true 
            })

        } catch (error) {
            console.log(`An error occurred ${error}`)
        }
        
        navigate('/')  
    }
    
    useEffect(() => {
        document.title = 'Create Recipe'
    })

    return (
        <div className='max-w-full px-[8%] py-7 flex justify-center'>
            <div className='bg-white p-4 rounded-md shadow-lg w-[800px]'>
                <h1 className='py-4 text-center text-gray-700 font-semibold text-3xl uppercase'>add a recipe</h1>
                <form onSubmit={createRecipe} encType='multipart/form-data' className='flex flex-col gap-y-3'>
                    <label htmlFor="name" className='text-gray-600 capitalize'>name:</label>
                    <input
                        type='text'
                        value={name}
                        placeholder='name'
                        autoComplete='false'
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-200 p-2 rounded-sm outline-none'
                        required
                    />

                    <label htmlFor="name" className='text-gray-600 capitalize'>ingridients:</label>
                    <input
                        type='text'
                        value={ingridients}
                        placeholder='ingridients'
                        onChange={(e) => setIngridients(e.target.value)}
                        className='border border-gray-200 p-2 rounded-sm outline-none'
                        required
                    />

                    <label htmlFor="name" className='text-gray-600 capitalize'>category:</label>
                    <input
                        type='text'
                        value={category}
                        placeholder='breakfast, main course, snack, desert'
                        onChange={(e) => setCategory(e.target.value)}
                        className='border border-gray-200 p-2 rounded-sm outline-none'
                        required
                    />

                    <label htmlFor="name" className='text-gray-600 capitalize'>time to prepare:</label>
                    <input
                        type='text'
                        value={time}
                        placeholder='(minutes e.g. 10, 20, 30)'
                        onChange={(e) => setTime(e.target.value)}
                        className='border border-gray-200 p-2 rounded-sm outline-none'
                        required
                    />

                    <label htmlFor="name" className='text-gray-600 capitalize'>attach image:</label> 
                    <div className='border border-dashed rounded-sm px-1 py-5 bg-white cursor-pointer'>
                        <Dropzone onDrop={handleDrop}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {image ? (
                                    <p>{image.name}</p>
                                    ) : (
                                    <p className='text-gray-400'>Drag and drop/click to select a picture</p>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>

                    <label htmlFor="name" className='text-gray-600 capitalize'>how to prepare:</label> 
                    <textarea
                        type='text'
                        rows='9'
                        value={procedure}
                        placeholder='procedure'
                        onChange={(e) => setProcedure(e.target.value)}
                        className='border border-gray-200 p-2 rounded-sm outline-none resize-none'
                        required
                    />
                
                    <button
                        type='submit'
                        className='p-2 bg-blue-500 text-gray-900 capitalize rounded-sm'
                    >
                        let's cook
                    </button> 
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe