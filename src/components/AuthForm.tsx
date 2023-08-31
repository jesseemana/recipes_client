import { Link } from 'react-router-dom'
import Button from './Buttons/Button'
import Heading from './Inputs/Heading'
import InputField from './Inputs/InputField'
import { Dispatch, SetStateAction } from 'react'

interface AuthForm {
  email: string 
  isLogin: boolean
  submitting: boolean
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  register?: unknown
  error?: string
  handleChange: () => void
  submitForm: (e: React.FormEvent) => void
  // handleSubmit: (e: React.FormEvent) => void
  setEmail: Dispatch<SetStateAction<string>>
  setFirstName: Dispatch<SetStateAction<string>>
  setLastName: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setConfirmPassword: Dispatch<SetStateAction<string>>
}

const Form = ({
  email, 
  isLogin,
  firstName, 
  lastName, 
  password, 
  confirmPassword, 
  submitting,
  error,
  register,
  handleChange,  
  submitForm, 
  // handleSubmit,
  setEmail, 
  setFirstName, 
  setLastName, 
  setPassword, 
  setConfirmPassword, 
}: AuthForm) => {
  return (
    <div className='flex justify-center items-center bg-gray-50 h-[100vh]'>
      <form 
        onSubmit={submitForm}
        className='flex flex-col gap-y-3 transition-all w-[300px] md:w-auto px-5 py-4 rounded-sm shadow-lg bg-white'
      >
        {isLogin ? <><Heading label='login' /></> : <><Heading label='create account' /></>}
    
        {!isLogin && (
          <div className='flex flex-col gap-y-4 items-start md:flex-row gap-x-4'>
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                htmlFor='first name'
                label='first name:'
                id='first name'
                type='text'
                placeholder='first name'
                // inputProps={...register(firstName)}
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
                    
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                htmlFor='last name'
                label='last name:'
                id='last name'
                type='text'
                placeholder='last name' 
                // inputProps={inputProps}
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        )}

        <InputField 
          htmlFor='email'
          label='email:'
          id='email'
          type='text'
          placeholder='email@example.com'
          // inputProps={inputProps}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
            
        <InputField 
          htmlFor='password'
          label='password:'
          id='password'
          type='password'
          placeholder='password'
          // inputProps={inputProps}
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
        />

        <InputField 
          htmlFor='confirm password'
          label='confirm password:'
          id='confirm password'
          type='password'
          placeholder='confirm password'
          // inputProps={inputProps}
          // value={confirmPassword}
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
                
        <Link to={'/reset'}>
          {isLogin && <p className='text-[#38D6C4] text-center underline capitalize'>forgot password?</p>}
        </Link>

        <Button
          type='submit'
          disabled={submitting}
          label={isLogin ? 'login' : 'register'}
        />

        <div className='flex gap-1'>
          <p className='text-gray-500 text-sm md:text-[17px]'>
            {isLogin ? `Don't have an account?`: 'Already have an account?'}
          </p>
          <Button
            type='button'
            disabled={submitting}
            onClick={handleChange}
            label={isLogin ? 'create account.' : 'login.'}
          />
        </div>
      </form>
    </div>
  )
}

export default Form    