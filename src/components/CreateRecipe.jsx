import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from '../api/axios'
const POST_URL = '/recipes'

const CreateRecipe = () => {
    const[time, setTime] = useState('')
    const[name, setName] = useState('')
    const[owner, setOwner] = useState('')
    const[picture, setPicture] = useState('')
    const[category, setCategory] = useState('')
    const[procedure, setProcedure] = useState('')
    const[ingridients, setIngridients] = useState('')
    

    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.access_token)

    console.log(user._id)

    useEffect(() => {
        setOwner(user._id)
    }, [user])

    console.log(owner)

    // INSTALL REACT DROPZONE FOR PICTURE POSTING ---- (MULTER) GRIDFS FOR UPLOADING PICTURES TO MONGO DB
    const handleCreateRecipe= async () => {
        try {
            const response = await axios.post(POST_URL,
                JSON.stringify({owner, name, ingridients, procedure, category, time}), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            console.log(response?.data)
        
        } catch (error) {
            console.log(`An error occurred ${error}`)
        }
    }


    return (
        <>
            <div className="max-w-full px-[8%] py-4 text-center text-gray-700 font-semibold text-2xl uppercase">add a recipe</div>
            <form onSubmit={handleCreateRecipe} className='flex flex-col gap-y-3'>
                <input
                    type="text"
                    value={name}
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                    className=''
                    required
                />
                <input
                    type="text"
                    value={ingridients}
                    placeholder='ingridients'
                    onChange={(e) => setIngridients(e.target.value)}
                    className=''
                    required
                />
                <input
                    type="text"
                    value={category}
                    placeholder='breakfast, lunch/supper, snack, desert'
                    onChange={(e) => setCategory(e.target.value)}
                    className=''
                    required
                />
                <input
                    type="text"
                    value={time}
                    placeholder='time to prepare'
                    onChange={(e) => setTime(e.target.value)}
                    className=''
                    required
                />
                <textarea
                    type="text"
                    value={procedure}
                    placeholder='procedure'
                    onChange={(e) => setProcedure(e.target.value)}
                    className=''
                    required
                />
                <button type='submit' className='p-2 bg-blue-300 text-gray-600 capitalize'>
                    add recipe
                </button>
            </form>
        </>
    )
}

export default CreateRecipe