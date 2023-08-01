import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import axios from '../api/axios'
const RESET_URL = '/reset'

const ResetPwd = () => {  
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
      }, 3000 )
    })
  }


  function toggleReset(e) {
    e.preventDefault()
    toast.promise(resetPwd(), {
      loading: 'loading...',
      success: 'email sent',
      error: `couldn't reset password` 
    })
  }


  return (
    <>
      <div className='max-w-full px-[4%] py-5'>
        <div className='flex items-center justify-center h-[76vh] flex-col'>
          <h1 className='text-center capitalize text-2xl font-semibold text-[#38D6C4] py-5'>reset your password</h1>
          <form type='submit' className='flex flex-col w-[320px] gap-y-5 py-2 px-1'>
            <div className='flex flex-col gap-y-1 '>
              <label htmlFor="email" className='text-gray-700 capitalize'>email:</label>
              <input 
                type="text" 
                placeholder='enter your email' 
                className='py-1 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]' 
              />
            </div>
            <button 
              onClick={toggleReset} 
              className='bg-[#38D6C4] rounded-sm py-1 text-white uppercase text-md text-center'>
              reset password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPwd     