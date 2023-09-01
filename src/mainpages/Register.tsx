import axios from '@/api/axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { RegisterFields, RegisterForm } from '@/components/RegisterForm'


const Register = () => {
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)

  const create = async (data: RegisterFields) => {
    console.log(data)
    setSubmitting(true)
    try {
      await axios.post('/auth/register', 
        JSON.stringify({
          first_name: data.first_name, 
          last_name: data.last_name, 
          email: data.email, 
          password: data.password
        }), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      navigate('/login')
      toast.success('user created, please login')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
      toast.error('Error creating user')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <RegisterForm 
      onSubmit={create} 
      submitting={submitting} 
    />
  )
}

export default Register 