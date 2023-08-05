import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import InputField from '../components/InputField'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'


const ChangePassword = () => {
  const {id, token} = useParams()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useDocumentTitle('Change Password')

  async function resetPwd() {
    try {
      await axios.patch(`reset/:${id}/:${token}`)
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  function toggleChangePassword(e) {
    e.preventDefault()
    toast.promise(resetPwd(), {
      loading: 'updating...',
      success: 'password updated',
      error: `couldn't update password` 
    })
  }
  
  return (
    <div className='max-w-full px-[4%] bg-gray-50 flex items-center justify-center h-[100vh]'>
      <div className='bg-white px-2 py-4 shadow-md rounded-md'>
        <h1 className='text-center capitalize text-lg md:text-2xl font-semibold text-[#38D6C4] py-1'>enter new password</h1>
        <form type='submit' className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField
            htmlFor={'password'}
            label={'password:'}
            type='password' 
            value={password}
            placeholder='password' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            htmlFor={'confirm password'}
            label={'confirm password:'}
            type='password' 
            value={confirmPassword}
            placeholder='confirm password' 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button 
            onClick={toggleChangePassword} 
            className='bg-[#38D6C4] rounded-sm py-1 text-white uppercase text-sm md:text-[17px] text-center font-medium'
          >
            reset password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword 