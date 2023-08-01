import { useRef } from 'react'

const InputField = ({ref, type, text, autoComplete, placeholder, onChange, htmlFor, label,}) => {
  return (
    <>
      <label htmlFor={htmlFor} className='text-gray-700 px-1 capitalize'>{label}</label>
      <input
        ref={ref} 
        type={type} 
        text={text}
        onChange={onChange} 
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='py-3 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]'
        required
      />
    </>
  )
}

export default InputField