import { useState } from 'react'
import { toast } from 'react-hot-toast'
import InputField from '../components/InputField'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'

const ResetPwd = () => {  
  const [email, setEmail] = useState('')
  
  useDocumentTitle('Reset Password')

  async function sendEmail() {
    try {
      await axios.post(`/reset`)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  function toggleSendEmail(e) {
    e.preventDefault()
    toast.promise(sendEmail(), {
      loading: 'sending...',
      success: 'email sent',
      error: `couldn't send email` 
    })
  }

  return (
    <div className='max-w-full px-[4%] bg-gray-50 flex items-center justify-center h-[100vh]'>
      <div className='bg-white px-2 py-4 shadow-md rounded-md'>
        <h1 className='text-center capitalize text-lg md:text-2xl font-semibold text-[#38D6C4] py-1'>reset your password</h1>
        <form type='submit' className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField 
            htmlFor={'email'}
            label={'email:'}
            type='text' 
            value={email}
            placeholder='enter your email' 
            onChange={(e) => setEmail(e.target.value)}
          />
          {email ? 
            <button 
              onClick={toggleSendEmail} 
              className='bg-[#38D6C4] rounded-sm py-1 text-white uppercase text-sm md:text-[17px] text-center font-medium'
            >
              send email
            </button> : 
            <button 
              disabled 
              className='bg-[#8feee3] rounded-sm py-1 text-white uppercase text-sm md:text-[17px] text-center font-medium cursor-not-allowed'
            >
              send email
            </button>
          }
        </form>
      </div>
    </div>
  )
}

export default ResetPwd     