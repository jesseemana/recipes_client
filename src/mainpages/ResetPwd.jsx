import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../components/Button'
import Heading from '../components/Inputs/Heading'
import InputField from '../components/Inputs/InputField'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'

const ResetPwd = () => {  
  useDocumentTitle('Reset Password')

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function sendEmail() {
    setSubmitting(true)
    try {
      await axios.post(`/reset`, JSON.stringify({email}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.log(errorMessage)
    } finally {
      setEmail('')
      setSubmitting(false)
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
        <Heading label='reset your password' />
        <form type='submit' className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField 
            htmlFor='email'
            label='email:'
            type='text' 
            value={email}
            placeholder='enter your email' 
            onChange={(e) => setEmail(e.target.value)}
          />
          {email ? (
            <Button 
              disabled={submitting} 
              type='submit'
              label='send email'
              onClick={toggleSendEmail} 
            /> 
            ):(
            <Button 
              disabled  
              type='button'
              label='send email'
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default ResetPwd  