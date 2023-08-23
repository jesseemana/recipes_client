import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api/axios'
import Button from '../components/Button'
import Heading from '../components/Heading'
import InputField from '../components/InputField'
import useDocumentTitle from '../hooks/useDocumentTitle'

const ChangePassword = () => {
  const {id, token} = useParams()
  const navigate = useNavigate()
  
  useDocumentTitle('Change Password')

  const [submitting, setSubmitting] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function resetPwd() {
    setSubmitting(true)
    try {
      await axios.patch(`reset/:${id}/:${token}`, JSON.stringify({password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      navigate('/auth')
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
    } finally {
      setSubmitting(false)
      setPassword('')
      setConfirmPassword('')
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
        <Heading label='enter new password' />
        <form type='submit' className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField
            htmlFor='password'
            label='password:'
            type='password' 
            value={password}
            placeholder='password' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            htmlFor='confirm password'
            label='confirm password:'
            type='password' 
            value={confirmPassword}
            placeholder='confirm password' 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button 
            disabled={submitting}
            type='submit'
            label='change password'
            onClick={toggleChangePassword}
          />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword 