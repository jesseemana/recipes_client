import React from 'react'
import { Link } from 'react-router-dom'

const Form = ({
    errMsg,
    formRef,
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
    <div className="flex justify-center items-center py bg-gray-50 h-[96vh]">
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-y-4 transition-all w-[300px] md:w-auto px-5 py-4 rounded-sm shadow-lg bg-white'
      >
        {isRegister 
          ? <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>register</h1> 
          : <h1 className='text-center text-[#38D6C4] text-xl font-bold uppercase'>login</h1>
        }
        {isRegister && (
          <div className="flex flex-col gap-y-4 items-start md:flex-row gap-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="text-gray-700 px-1 capitalize">first name:</label>
                <input
                  ref={isRegister ? formRef : null}
                  type="text"
                  value={firstName}
                  placeholder="first name"
                  className="py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
            </div>
                    
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="text-gray-700 px-1 capitalize">last name:</label>
              <input
                type="text"
                value={lastName}
                placeholder="last name"
                className="py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <label htmlFor="email" className="text-gray-700 px-1 capitalize">email:</label>
        <input
          ref={isLogin ? formRef : null}
          type="text"
          value={email}
          autoComplete="off"
          placeholder="email"
          className="py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
            
        <label htmlFor="password" className="text-gray-700 px-1 capitalize">password:</label>
        <input
          type="password"
          value={password}
          placeholder="password"
          className="py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
            
        <label htmlFor="password2" className="text-gray-700 px-1 capitalize">confirm password:</label>
        <input
          type="password"
          value={password2}
          placeholder="confirm password"
          className="py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
                
        <p className='text-red-500 text-center text-lg font-normal'>{errMsg}</p>

        <Link to={'/reset'}>
          {isLogin && <p className='text-[#38D6C4] text-center underline capitalize'>forgot password?</p>}
        </Link>
                
        <button
          // disabled={!canSend}
          type="submit"
          className={"bg-[#38D6C4] rounded-sm px-10 py-2 text-white uppercase text-md text-center"}>
          {isLogin ? 'login' : 'create account'}
        </button>
        <div className="flex gap-1">
          <div className="text-gray-500 text-sm md:text-[17px]">
            {isLogin? `Don't have an account?`: 'Already have an account?'}
          </div>
          <button
            onClick={() => {setPageType(isLogin ? "register" : "login")}}
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