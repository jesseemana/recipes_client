import { Link } from 'react-router-dom'
import InputField from '../components/InputField'

const Form = ({
  errMsg,
  isLogin,
  isRegister, 
  handleSubmit, 
  firstName, 
  lastName, 
  email, 
  password, 
  password2, 
  setPageType, 
  setFirstName, 
  setLastName, 
  setEmail, 
  setPassword, 
  setPassword2, 
}) => {
  return (
    <div className='flex justify-center items-center py bg-gray-50 h-[96vh]'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-y-4 transition-all w-[300px] md:w-auto px-5 py-4 rounded-sm shadow-lg bg-white'
      >
        {isRegister 
          ? <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>register</h1> 
          : <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>login</h1>
        }
        {isRegister && (
          <div className='flex flex-col gap-y-4 items-start md:flex-row gap-x-4'>
            <div className='flex flex-col w-full'>
              <InputField 
                htmlFor={firstName}
                label={'first name:'}
                type='text'
                value={firstName}
                placeholder='first name'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
                    
            <div className='flex flex-col w-full'>
              <InputField 
                htmlFor={lastName}
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
          htmlFor={email}
          label={'email:'}
          type='text'
          value={email}
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
            
        <InputField 
          htmlFor={password}
          label={'password:'}
          type='password'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField 
          htmlFor={password2}
          label={'confirm password:'}
          type='password'
          value={password2}
          placeholder='confirm password'
          onChange={(e) => setPassword2(e.target.value)}
        />
                
        <p className='text-red-500 text-center text-lg font-normal'>{errMsg}</p>

        <Link to={'/reset'}>
          {isLogin && <p className='text-[#38D6C4] text-center underline capitalize'>forgot password?</p>}
        </Link>
                
        <button
          // disabled={!canSend}
          type='submit'
          className={'bg-[#38D6C4] rounded-sm px-10 py-2 text-white uppercase text-md text-center'}>
          {isLogin ? 'login' : 'create account'}
        </button>
        <div className='flex gap-1'>
          <div className='text-gray-500 text-sm md:text-[17px]'>
            {isLogin ? `Don't have an account?`: 'Already have an account?'}
          </div>
          <button
            onClick={() => {setPageType(isLogin ? 'register' : 'login')}}
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