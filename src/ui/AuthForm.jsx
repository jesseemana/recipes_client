import { Link } from 'react-router-dom'
import InputField from '../components/InputField'

const Form = ({
  email, 
  errMsg,
  isLogin,
  firstName, 
  lastName, 
  password, 
  password2, 
  handleChange, 
  handleSubmit, 
  setEmail, 
  setFirstName, 
  setLastName, 
  setPassword, 
  setPassword2, 
}) => {
  return (
    <div className='flex justify-center items-center py bg-gray-50 h-[96vh]'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-y-3 transition-all w-[300px] md:w-auto px-5 py-4 rounded-sm shadow-lg bg-white'
      >
        {isLogin 
          ? <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>login</h1> 
          : <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>create account</h1>
        }
        {!isLogin && (
          <div className='flex flex-col gap-y-4 items-start md:flex-row gap-x-4'>
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                htmlFor={'first name'}
                label={'first name:'}
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
          type='text'
          value={email}
          placeholder='email@example.com'
          onChange={(e) => setEmail(e.target.value)}
        />
            
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
          value={password2}
          placeholder='confirm password'
          onChange={(e) => setPassword2(e.target.value)}
        />
                
        {isLogin && <p className='text-red-500 text-center text-lg font-normal'>{errMsg}</p>}

        <Link to={'/reset'}>
          {isLogin && <p className='text-[#38D6C4] text-center underline capitalize'>forgot password?</p>}
        </Link>
                
        <button
          // disabled={!canSend}
          type='submit'
          className={'bg-[#38D6C4] rounded-sm px-10 py-2 text-white uppercase text-md text-center'}
        >
          {isLogin ? 'login' : 'register'}
        </button>
        <div className='flex gap-1'>
          <div className='text-gray-500 text-sm md:text-[17px]'>
            {isLogin ? `Don't have an account?`: 'Already have an account?'}
          </div>
          <button
            onClick={handleChange}
            className='text-[#38D6C4] text-sm md:text-[17px] underline capitalize'
          >
            {isLogin ? 'create account.' : 'login.'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form     