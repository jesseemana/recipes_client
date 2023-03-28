import { useState } from 'react'
import { useSelector } from 'react-redux'

import axios from '../api/axios'

const POST_URL = '/recipes'

const CreateRecipe = () => {
    const[name, setName] = useState('')
    const[ingridients, setIngridients] = useState([])
    const[procedure, setProcedure] = useState('')
    const[category, setCategory] = useState('')
    const[picture, setPicture] = useState('')
    const[time, setTime] = useState(0)
    

    const token = useSelector((state) => state.access_token)


    console.log(ingridients)

    const handleRegister = async () => {
        try {
            const response = await axios.post(POST_URL,
                JSON.stringify({name, ingridients, procedure, category, time}), {
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

    const addIngridients = (e) => {
        ingridients.push(e.target.value)
    }

    return (
        <>
            <div className="max-w-full px-[8%] py-4 text-center text-gray-700 font-semibold text-2xl uppercase">add a recipe</div>
            <form onSubmit={handleRegister} className='flex flex-col gap-y-3'>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder='name' />
                <input type="text" onChange={addIngridients} placeholder='ingridients' />
                <input type="text" onChange={(e) => setProcedure(e.target.value)} placeholder='procedure' />
                <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder='category: breakfast, lunch/supper snack, desert' />
                <input type="text" onChange={(e) => setTime(e.target.value)} placeholder='time' />
                <button type='submit' className='p-2 bg-blue-300 text-gray-600 capitalize'>add recipe</button>
            </form>
        </>
    )
}

export default CreateRecipe