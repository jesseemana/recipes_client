import { useState } from 'react'
import { toast } from 'react-hot-toast'
import InputField from './InputField'
import axios from '../api/axios'

const RESET_URL = '/reset'

const ResetPwd = () => {  
  const [email, setEmail] = useState('')

  async function resetPwd() {
    // try {
    //   const results = await axios.post(`${RESET_URL}`)
    //   console.log(results.data)
    // } catch (error) {
    //   console.log(`AN ERROR OCCURED: ${error}`)
    // }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('email sent')
        setEmail('')
      }, 3000 )
    })
  }


  function toggleReset(e) {
    e.preventDefault()
    toast.promise(resetPwd(), {
      loading: 'sending...',
      success: 'email sent',
      error: `couldn't send email` 
    })
  }

  return (
    <div className='max-w-full px-[4%] py-5 bg-gray-50 flex items-center justify-center h-[90vh]'>
      <div className='bg-white px-2 py-4 shadow-md'>
        <h1 className='text-center capitalize text-lg md:text-2xl font-semibold text-[#38D6C4] py-1'>reset your password</h1>
        <form type='submit' className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField 
            htmlFor={'email'}
            label={'email:'}
            type='text' 
            value={email}
            autoComplete='off'
            placeholder='enter your email' 
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            onClick={toggleReset} 
            className='bg-[#38D6C4] rounded-sm py-1 text-white uppercase text-sm md:text-[17px] text-center font-semibold'
          >
            reset password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPwd     