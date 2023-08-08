import { Link } from 'react-router-dom'
import Button from '../Button'
import Heading from '../Heading'
import InputField from '../InputField'


const Form = ({
  email, 
  errMsg,
  errorRef,
  isLogin,
  firstName, 
  lastName, 
  password, 
  confirmPassword, 
  handleChange, 
  handleSubmit, 
  submitting,
  setEmail, 
  setFirstName, 
  setLastName, 
  setPassword, 
  setConfirmPassword, 
}) => {
  return (
    <div className='flex justify-center items-center bg-gray-50 h-[100vh]'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-y-3 transition-all w-[300px] md:w-auto px-5 py-4 rounded-sm shadow-lg bg-white'
      >
        {isLogin ? <> <Heading label={'login'} /> </> : <> <Heading label={'create account'} /> </>}
    
        {!isLogin && (
          <div className='flex flex-col gap-y-4 items-start md:flex-row gap-x-4'>
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                htmlFor={'first name'}
                label={'first name:'}
                id={'first name'}
                type='text'
                value={firstName}
                placeholder='first name'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
                    
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                htmlFor={'last name'}
                label={'last name:'}
                id={'last name'}
                type='text'
                value={lastName}
                placeholder='last name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        )}

        <InputField 
          htmlFor={'email'}
          label={'email:'}
          id={'email'}
          type='text'
          value={email}
          placeholder='email@example.com'
          onChange={(e) => setEmail(e.target.value)}
        />
            
        <InputField 
          htmlFor={'password'}
          label={'password:'}
          id={'password'}
          type='password'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField 
          htmlFor={'confirm password'}
          label={'confirm password:'}
          id={'confirm password'}
          type='password'
          value={confirmPassword}
          placeholder='confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
                
        <Link to={'/reset'}>
          {isLogin && <p className='text-[#38D6C4] text-center underline capitalize'>forgot password?</p>}
        </Link>

        <Button 
          type={'submit'}
          disabled={submitting}
          label={isLogin ? 'login' : 'register'}
        />

        <p ref={errorRef} aria-live='assertive' className='text-white text-center text-sm font-normal bg-red-500'>{errMsg}</p>

        <div className='flex gap-1'>
          <div className='text-gray-500 text-sm md:text-[17px]'>
            {isLogin ? `Don't have an account?`: 'Already have an account?'}
          </div>
          <Button 
            type={'button'}
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