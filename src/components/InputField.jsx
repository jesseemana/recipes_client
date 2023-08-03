const InputField = ({type, value, placeholder, onChange, htmlFor, label,}) => {
  return (
    <>
      <label htmlFor={htmlFor} className='text-gray-700 text-sm md:text-[15px] capitalize'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange} 
        placeholder={placeholder}
        autoComplete='off'
        className='py-2 px-1 text-gray-600 border border-gray-200 rounded-sm outline-[#38D6C4]'
        required
      />
    </>
  )
}

export default InputField