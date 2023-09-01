import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../components/Buttons/Button'
import Heading from '../components/Inputs/Heading'
import InputField from '../components/Inputs/InputField.tsx'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'

const ResetPwd = () => {  
  
  useDocumentTitle('Reset Password')

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // SEND SERVER ERRROS FOR INVALID EMAILS

  async function sendEmail(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`/reset`, JSON.stringify({email}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      toast.success('Email sent')
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.error(errorMessage)
      toast.error('Email not sent')
    } finally {
      setEmail('')
      setSubmitting(false)
    }
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
          <Button 
            disabled={!email || submitting} 
            type={'submit'}
            label={submitting ? 'sending...' : 'send email'}
            onClick={sendEmail} 
          /> 
        </form>
      </div>
    </div>
  )
}

export default ResetPwd  